import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

function findHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // Skip admin routes from public SEO assertions
      if (entry.name === 'admin' || entry.name === 'assets') continue
      findHtmlFiles(fullPath, fileList)
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      if (entry.name === '_styleguide.html') continue
      fileList.push(fullPath)
    }
  }
  return fileList
}

function hasEmptyProperty(obj) {
  if (obj === null || obj === undefined || obj === '') return true
  if (Array.isArray(obj)) {
    if (obj.length === 0) return true
    return obj.some(hasEmptyProperty)
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj)
    if (keys.length === 0) return true
    return keys.some((k) => hasEmptyProperty(obj[k]))
  }
  return false
}

async function verifySeo() {
  console.log('--- Verifying Built HTML SEO Signals ---')

  const htmlFiles = findHtmlFiles(distDir)
  if (htmlFiles.length === 0) {
    console.error(`[FAIL] No built HTML files found in ${distDir}. Run npm run build first.`)
    process.exit(1)
  }

  console.log(`Found ${htmlFiles.length} public HTML pages to verify.`)

  let passed = 0
  let failed = 0
  const titles = new Map()
  const descriptions = new Map()

  function assert(condition, message, file) {
    const relFile = path.relative(distDir, file)
    if (condition) {
      passed++
    } else {
      console.error(`[FAIL] [${relFile}]: ${message}`)
      failed++
    }
  }

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, 'utf8')
    const relFile = path.relative(distDir, filePath)
    const dom = new JSDOM(html)
    const document = dom.window.document

    // 1. Exactly one <h1>
    const h1Elements = document.querySelectorAll('h1')
    assert(
      h1Elements.length === 1,
      `Expected exactly 1 <h1>, found ${h1Elements.length}`,
      filePath,
    )

    // 2. Title tag exists and has reasonable length
    const title = document.querySelector('title')?.textContent?.trim() || ''
    assert(title.length > 5, `Title missing or too short ("${title}")`, filePath)
    assert(
      title.length <= 75,
      `Title exceeds 75 chars ("${title}", length: ${title.length})`,
      filePath,
    )

    // Check duplicate titles across distinct pages
    if (titles.has(title)) {
      assert(
        false,
        `Duplicate title detected: "${title}" also in ${titles.get(title)}`,
        filePath,
      )
    } else {
      titles.set(title, relFile)
    }

    // 3. Meta description exists and has reasonable length
    const metaDesc =
      document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || ''
    assert(
      metaDesc.length >= 80,
      `Meta description missing or under 80 chars (length: ${metaDesc.length})`,
      filePath,
    )
    assert(
      metaDesc.length <= 200,
      `Meta description exceeds 200 chars (length: ${metaDesc.length})`,
      filePath,
    )

    // Check duplicate descriptions
    if (descriptions.has(metaDesc)) {
      assert(
        false,
        `Duplicate meta description detected with ${descriptions.get(metaDesc)}`,
        filePath,
      )
    } else {
      descriptions.set(metaDesc, relFile)
    }

    // 4. Canonical link tag exists, is absolute, normalized
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
    assert(
      canonical.startsWith('https://almubtakirah.com'),
      `Canonical must start with https://almubtakirah.com, got "${canonical}"`,
      filePath,
    )
    assert(
      !canonical.includes('?'),
      `Canonical must not contain query parameters: "${canonical}"`,
      filePath,
    )
    if (canonical !== 'https://almubtakirah.com' && canonical !== 'https://almubtakirah.com/') {
      assert(
        !canonical.endsWith('/'),
        `Canonical must not have trailing slash: "${canonical}"`,
        filePath,
      )
    }

    // 5. OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
    const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content')
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')

    assert(Boolean(ogTitle), 'og:title missing', filePath)
    assert(Boolean(ogDesc), 'og:description missing', filePath)
    assert(Boolean(ogUrl), 'og:url missing', filePath)
    assert(Boolean(ogImage), 'og:image missing', filePath)

    // 6. JSON-LD structured data validation
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]')
    assert(
      jsonLdScripts.length >= 1,
      `Expected at least one JSON-LD block, found ${jsonLdScripts.length}`,
      filePath,
    )

    for (let i = 0; i < jsonLdScripts.length; i++) {
      const scriptContent = jsonLdScripts[i].textContent || ''
      try {
        const parsed = JSON.parse(scriptContent)
        const items = Array.isArray(parsed) ? parsed : [parsed]

        for (const item of items) {
          assert(
            item['@context'] === 'https://schema.org',
            `JSON-LD block ${i + 1} invalid @context: ${item['@context']}`,
            filePath,
          )
          assert(
            Boolean(item['@type']),
            `JSON-LD block ${i + 1} missing @type`,
            filePath,
          )
          assert(
            !hasEmptyProperty(item),
            `JSON-LD block ${i + 1} contains empty/null properties`,
            filePath,
          )
        }
      } catch (err) {
        assert(
          false,
          `JSON-LD block ${i + 1} failed JSON parse: ${err.message}`,
          filePath,
        )
      }
    }
  }

  // 7. Check sitemap.xml and robots.txt in dist/
  const sitemapDist = path.join(distDir, 'sitemap.xml')
  const robotsDist = path.join(distDir, 'robots.txt')

  if (fs.existsSync(sitemapDist)) {
    const sitemapContent = fs.readFileSync(sitemapDist, 'utf8')
    assert(
      sitemapContent.includes('<urlset') && sitemapContent.includes('https://almubtakirah.com'),
      'dist/sitemap.xml is valid urlset',
      sitemapDist,
    )
    assert(
      !sitemapContent.includes('/admin'),
      'dist/sitemap.xml does not contain /admin routes',
      sitemapDist,
    )
  } else {
    assert(false, 'dist/sitemap.xml missing', sitemapDist)
  }

  if (fs.existsSync(robotsDist)) {
    const robotsContent = fs.readFileSync(robotsDist, 'utf8')
    assert(
      robotsContent.includes('Disallow: /admin') && robotsContent.includes('Sitemap: https://almubtakirah.com/sitemap.xml'),
      'dist/robots.txt contains Disallow /admin and Sitemap link',
      robotsDist,
    )
  } else {
    assert(false, 'dist/robots.txt missing', robotsDist)
  }

  console.log(`\n=== Verification Results ===`)
  console.log(`Assertions Passed: ${passed}`)
  console.log(`Assertions Failed: ${failed}`)

  if (failed > 0) {
    console.error(`\n[ERROR] SEO Verification failed with ${failed} issues.`)
    process.exit(1)
  } else {
    console.log(`\n[SUCCESS] All SEO signals verified successfully across ${htmlFiles.length} pages!`)
  }
}

verifySeo()

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

let passed = 0
let failed = 0
const reportDetails = []

function assert(condition, message) {
  if (condition) {
    passed++
    console.log(`  [PASS] ${message}`)
    reportDetails.push({ status: 'PASS', message })
  } else {
    failed++
    console.error(`  [FAIL] ${message}`)
    reportDetails.push({ status: 'FAIL', message })
  }
}

async function runPhase12Qa() {
  console.log('\n=== Starting Phase 12 Quality Assurance & Performance Audit ===\n')

  // 1. Verify dist existence
  assert(fs.existsSync(distDir), 'Distribution directory (dist/) exists')

  // 2. Collect all HTML files in dist/
  const htmlFiles = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) htmlFiles.push(full)
    }
  }
  walk(distDir)

  assert(htmlFiles.length >= 34, `Prerendered HTML pages count: ${htmlFiles.length} (expected >= 34)`)

  // 3. Performance & Font Preload verification across all HTML files
  console.log('\n--- Checking Font Preloads & LCP Optimizations ---')
  let fontPreloadCount = 0
  let noTipTapLeaked = 0
  let singleH1Count = 0
  let validLangDirCount = 0
  let hasSkipLinkCount = 0

  for (const file of htmlFiles) {
    const relPath = path.relative(distDir, file)
    const content = fs.readFileSync(file, 'utf8')

    // Check font preloads
    const has400 = content.includes('tajawal-arabic-400') && content.includes('rel="preload" as="font"')
    const has700 = content.includes('tajawal-arabic-700') && content.includes('rel="preload" as="font"')
    if (has400 && has700) fontPreloadCount++

    // Check TipTap/Admin bundle isolation from public preload
    const hasTipTapPreload = content.includes('vendor-tiptap') && content.includes('rel="modulepreload"')
    const hasPostEditPreload = content.includes('PostEditPage') && content.includes('rel="modulepreload"')
    if (!hasTipTapPreload && !hasPostEditPreload) noTipTapLeaked++

    // Check single H1 per page
    const h1Matches = content.match(/<h1[\s>]/g) || []
    if (h1Matches.length === 1) singleH1Count++

    // Check lang and dir
    const isEn = relPath.startsWith('en')
    const hasExpectedLang = isEn ? content.includes('lang="en"') : content.includes('lang="ar"')
    const hasExpectedDir = isEn ? content.includes('dir="ltr"') : content.includes('dir="rtl"')
    if (hasExpectedLang && hasExpectedDir) validLangDirCount++

    // Check skip to content link
    if (content.includes('href="#main-content"')) hasSkipLinkCount++
  }

  assert(fontPreloadCount === htmlFiles.length, `Tajawal font preloads present in ${fontPreloadCount}/${htmlFiles.length} HTML files`)
  assert(noTipTapLeaked === htmlFiles.length, `Admin/TipTap chunks isolated from preloads in ${noTipTapLeaked}/${htmlFiles.length} HTML files`)
  assert(singleH1Count === htmlFiles.length, `Strict single <h1> hierarchy verified in ${singleH1Count}/${htmlFiles.length} HTML files`)
  assert(validLangDirCount === htmlFiles.length, `Valid lang and dir attributes verified in ${validLangDirCount}/${htmlFiles.length} HTML files`)
  assert(hasSkipLinkCount === htmlFiles.length, `SkipToContent navigation link present in ${hasSkipLinkCount}/${htmlFiles.length} HTML files`)

  // 4. Bundle Asset Size Budget Verification
  console.log('\n--- Checking Asset Size Budgets ---')
  const assetsDir = path.join(distDir, 'assets')
  const assetFiles = fs.readdirSync(assetsDir)

  const cssFiles = assetFiles.filter((f) => f.endsWith('.css'))
  assert(cssFiles.length > 0, `CSS bundle found: ${cssFiles.join(', ')}`)
  for (const css of cssFiles) {
    const sizeKb = fs.statSync(path.join(assetsDir, css)).size / 1024
    assert(sizeKb < 90, `CSS file ${css} is ${sizeKb.toFixed(2)} KB (budget < 90 KB raw)`)
  }

  // 5. Accessibility & Design System Rule Check
  console.log('\n--- Checking Accessibility & Reduced Motion in CSS ---')
  const mainCssContent = fs.readFileSync(path.join(assetsDir, cssFiles[0]), 'utf8')
  assert(mainCssContent.includes('prefers-reduced-motion'), 'CSS contains prefers-reduced-motion query')
  assert(mainCssContent.includes('focus-visible'), 'CSS contains focus-visible styling')
  assert(mainCssContent.includes('scroll-behavior'), 'CSS defines smooth / auto scroll-behavior')

  // 6. Security Header and vercel.json Verification
  console.log('\n--- Checking Security Headers & Configuration ---')
  const vercelPath = path.join(distDir, 'vercel.json')
  assert(fs.existsSync(vercelPath), 'dist/vercel.json exists')
  const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'))

  const globalHeaderRule = vercelConfig.headers?.find((h) => h.source === '/(.*)')
  const cspHeader = globalHeaderRule?.headers?.find((h) => h.key === 'Content-Security-Policy-Report-Only')
  const xfoHeader = globalHeaderRule?.headers?.find((h) => h.key === 'X-Frame-Options')
  const xctoHeader = globalHeaderRule?.headers?.find((h) => h.key === 'X-Content-Type-Options')

  assert(!!cspHeader, 'Content-Security-Policy-Report-Only header configured')
  assert(xfoHeader?.value === 'SAMEORIGIN', 'X-Frame-Options header configured as SAMEORIGIN')
  assert(xctoHeader?.value === 'nosniff', 'X-Content-Type-Options header configured as nosniff')

  // 7. Security Grep Pass: No Secrets in Dist
  console.log('\n--- Checking for Leaked Secrets in Distribution Bundle ---')
  let leakedSecretFound = false
  function scanForSecrets(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) scanForSecrets(full)
      else if (entry.name.endsWith('.js') || entry.name.endsWith('.html') || entry.name.endsWith('.json')) {
        const text = fs.readFileSync(full, 'utf8')
        if (text.includes('service_role') || text.includes('sbp_') || text.includes('SUPABASE_SERVICE_ROLE_KEY')) {
          console.error(`[LEAK] Secret found in ${full}`)
          leakedSecretFound = true
        }
      }
    }
  }
  scanForSecrets(distDir)
  assert(!leakedSecretFound, 'Zero service_role keys or secrets found in dist bundle')

  // 8. Natural-look & Content QA
  console.log('\n--- Checking Content Hygiene & No Placeholders ---')
  let placeholderFound = false
  for (const file of htmlFiles) {
    const text = fs.readFileSync(file, 'utf8')
    if (text.includes('lorem ipsum') || text.includes('Lorem ipsum') || text.includes('TODO:') || text.includes('FIXME:')) {
      console.error(`[PLACEHOLDER] Found in ${file}`)
      placeholderFound = true
    }
  }
  assert(!placeholderFound, 'Zero placeholder text (lorem ipsum, TODO, FIXME) found in built HTML')

  // 9. Sitemap & Robots
  console.log('\n--- Checking Sitemap & Robots.txt ---')
  const sitemapPath = path.join(distDir, 'sitemap.xml')
  const robotsPath = path.join(distDir, 'robots.txt')
  assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists')
  assert(fs.existsSync(robotsPath), 'dist/robots.txt exists')

  const robotsContent = fs.readFileSync(robotsPath, 'utf8')
  assert(robotsContent.includes('Disallow: /admin'), 'robots.txt disallows /admin')
  assert(robotsContent.includes('Sitemap: https://almubtakirah.com/sitemap.xml'), 'robots.txt points to sitemap.xml')

  // Summary
  console.log(`\n=================================================`)
  console.log(`Phase 12 QA Summary: ${passed} assertions passed, ${failed} failed`)
  console.log(`=================================================\n`)

  if (failed > 0) {
    process.exit(1)
  }
}

runPhase12Qa().catch((err) => {
  console.error('Phase 12 QA script encountered error:', err)
  process.exit(1)
})

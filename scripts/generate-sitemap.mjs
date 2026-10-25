import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

function loadEnv() {
  const envPath = path.join(rootDir, '.env')
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [k, ...v] = trimmed.split('=')
        if (k && v.length) {
          process.env[k.trim()] = v.join('=').trim()
        }
      }
    }
  }
}

loadEnv()

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://flkydlhewzezfomfjrvi.supabase.co'
const ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i'

const SITE_URL = 'https://almubtakirah.com'
const supabase = createClient(SUPABASE_URL, ANON_KEY)

async function generateSitemapAndRobots() {
  console.log('--- Generating Sitemap, Robots, and Redirects ---')

  const today = new Date().toISOString().split('T')[0]

  // 1. Static pages definition
  const staticPages = [
    { path: '', enPath: 'en', changefreq: 'weekly', priority: '1.0' },
    { path: 'about', enPath: 'en/about', changefreq: 'monthly', priority: '0.8' },
    { path: 'services', enPath: 'en/services', changefreq: 'weekly', priority: '0.9' },
    { path: 'services/elevator-maintenance', enPath: 'en/services/elevator-maintenance', changefreq: 'weekly', priority: '0.9' },
    { path: 'services/elevator-modernization', enPath: 'en/services/elevator-modernization', changefreq: 'weekly', priority: '0.9' },
    { path: 'services/elevator-installation', enPath: 'en/services/elevator-installation', changefreq: 'weekly', priority: '0.9' },
    { path: 'services/elevator-spare-parts', enPath: 'en/services/elevator-spare-parts', changefreq: 'weekly', priority: '0.9' },
    { path: 'services/escalators-moving-walkways', enPath: 'en/services/escalators-moving-walkways', changefreq: 'weekly', priority: '0.9' },
    { path: 'works', enPath: 'en/works', changefreq: 'weekly', priority: '0.8' },
    { path: 'blog', enPath: 'en/blog', changefreq: 'daily', priority: '0.8' },
    { path: 'contact', enPath: 'en/contact', changefreq: 'monthly', priority: '0.7' },
    { path: 'privacy', enPath: 'en/privacy', changefreq: 'yearly', priority: '0.3' },
  ]

  // 2. Fetch categories with fallback
  let categories = []
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, updated_at')
    if (!error && data && data.length > 0) {
      categories = data
    }
  } catch (err) {
    console.warn('[Sitemap] Warning fetching categories:', err.message)
  }

  if (categories.length === 0) {
    categories = [
      { id: 'c1', slug: 'elevator-maintenance', updated_at: today },
      { id: 'c2', slug: 'elevator-modernization', updated_at: today },
      { id: 'c3', slug: 'elevator-safety', updated_at: today },
      { id: 'c4', slug: 'spare-parts', updated_at: today },
      { id: 'c5', slug: 'company-news', updated_at: today },
    ]
  }

  // 3. Fetch published posts with fallback
  let posts = []
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, lang, translation_key, updated_at, published_at, robots_noindex')
      .eq('status', 'published')
    if (!error && data && data.length > 0) {
      posts = data
    }
  } catch (err) {
    console.warn('[Sitemap] Warning fetching posts:', err.message)
  }

  if (posts.length === 0) {
    posts = [
      { id: 'p1', slug: 'dalil-seyana-dawriah-masaid-jeddah', lang: 'ar', translation_key: 'post-1', updated_at: today, published_at: today },
      { id: 'p2', slug: 'periodic-elevator-maintenance-guide-jeddah', lang: 'en', translation_key: 'post-1', updated_at: today, published_at: today },
      { id: 'p3', slug: 'alamat-tahdeeth-al-masaid-al-qadeemah', lang: 'ar', translation_key: 'post-2', updated_at: today, published_at: today },
      { id: 'p4', slug: 'signs-your-legacy-elevator-needs-modernization', lang: 'en', translation_key: 'post-2', updated_at: today, published_at: today },
      { id: 'p5', slug: 'eshtiratat-al-difaa-al-madani-lil-masaid', lang: 'ar', translation_key: 'post-3', updated_at: today, published_at: today },
      { id: 'p6', slug: 'civil-defense-safety-standards-elevators-saudi-arabia', lang: 'en', translation_key: 'post-3', updated_at: today, published_at: today },
      { id: 'p7', slug: 'kayfa-takhtar-qetaa-gheyar-al-masaid-al-asliyah', lang: 'ar', translation_key: 'post-4', updated_at: today, published_at: today },
      { id: 'p8', slug: 'how-to-choose-genuine-elevator-spare-parts', lang: 'en', translation_key: 'post-4', updated_at: today, published_at: today },
    ]
  }

  // 4. Fetch published works (using is_published column) with fallback
  let works = []
  try {
    const { data, error } = await supabase
      .from('works')
      .select('id, slug, updated_at, created_at')
      .eq('is_published', true)
    if (!error && data && data.length > 0) {
      works = data
    }
  } catch (err) {
    console.warn('[Sitemap] Warning fetching works:', err.message)
  }

  if (works.length === 0) {
    works = [
      { slug: 'andalus-commercial-tower', updated_at: today },
      { slug: 'rawdah-residential-complex', updated_at: today },
      { slug: 'tahlia-shopping-center', updated_at: today },
      { slug: 'saraya-hotel-modernization', updated_at: today },
      { slug: 'nokhba-medical-center', updated_at: today },
      { slug: 'united-business-headquarters', updated_at: today },
    ]
  }

  // 5. Fetch redirects
  let redirects = []
  try {
    const { data } = await supabase
      .from('redirects')
      .select('source_path, target_path, status_code')
    if (data) redirects = data
  } catch (err) {
    console.warn('[Sitemap] Warning fetching redirects:', err.message)
  }

  // Build XML items
  const urlEntries = []

  // Add static pages
  for (const p of staticPages) {
    const arUrl = p.path ? `${SITE_URL}/${p.path}` : SITE_URL
    const enUrl = `${SITE_URL}/${p.enPath}`

    // Arabic entry
    urlEntries.push(`  <url>
    <loc>${arUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${arUrl}" />
  </url>`)

    // English entry
    urlEntries.push(`  <url>
    <loc>${enUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${arUrl}" />
  </url>`)
  }

  // Add categories
  if (categories && categories.length > 0) {
    for (const cat of categories) {
      if (!cat.slug) continue
      const arUrl = `${SITE_URL}/blog/category/${cat.slug}`
      const enUrl = `${SITE_URL}/en/blog/category/${cat.slug}`
      const lastmod = (cat.updated_at || today).split('T')[0]

      urlEntries.push(`  <url>
    <loc>${arUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${arUrl}" />
  </url>`)

      urlEntries.push(`  <url>
    <loc>${enUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${arUrl}" />
  </url>`)
    }
  }

  // Add works
  if (works && works.length > 0) {
    for (const work of works) {
      if (!work.slug) continue
      const arUrl = `${SITE_URL}/works/${work.slug}`
      const enUrl = `${SITE_URL}/en/works/${work.slug}`
      const lastmod = (work.updated_at || work.created_at || today).split('T')[0]

      urlEntries.push(`  <url>
    <loc>${arUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${arUrl}" />
  </url>`)

      urlEntries.push(`  <url>
    <loc>${enUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${arUrl}" />
  </url>`)
    }
  }

  // Add blog posts (filtering out robots_noindex)
  const indexablePosts = (posts || []).filter((p) => !p.robots_noindex && p.slug)
  const postsByTranslationKey = new Map()
  for (const post of indexablePosts) {
    if (post.translation_key) {
      if (!postsByTranslationKey.has(post.translation_key)) {
        postsByTranslationKey.set(post.translation_key, [])
      }
      postsByTranslationKey.get(post.translation_key).push(post)
    }
  }

  for (const post of indexablePosts) {
    const isEn = post.lang === 'en'
    const postUrl = isEn ? `${SITE_URL}/en/blog/${post.slug}` : `${SITE_URL}/blog/${post.slug}`
    const lastmod = (post.updated_at || post.published_at || today).split('T')[0]

    // Find twin post if exists
    const twins = (post.translation_key ? postsByTranslationKey.get(post.translation_key) : []) || []
    const twin = twins.find((p) => p.id !== post.id && p.lang !== post.lang)

    let alternatesXml = ''
    if (twin) {
      const arTwinUrl = isEn ? `${SITE_URL}/blog/${twin.slug}` : postUrl
      const enTwinUrl = isEn ? postUrl : `${SITE_URL}/en/blog/${twin.slug}`
      alternatesXml = `
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arTwinUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enTwinUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${arTwinUrl}" />`
    } else {
      alternatesXml = `
    <xhtml:link rel="alternate" hreflang="${isEn ? 'en' : 'ar-SA'}" href="${postUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${postUrl}" />`
    }

    urlEntries.push(`  <url>
    <loc>${postUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${alternatesXml}
  </url>`)
  }

  // Generate sitemap.xml with human-readable XSL stylesheet
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`

  // Output paths: public/ and dist/ (if dist exists)
  const publicDir = path.join(rootDir, 'public')
  const distDir = path.join(rootDir, 'dist')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8')
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8')
  console.log(`[PASS] Wrote sitemap.xml (${urlEntries.length} URLs) and robots.txt to public/`)

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8')
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8')
    const xslPath = path.join(publicDir, 'sitemap.xsl')
    if (fs.existsSync(xslPath)) {
      fs.copyFileSync(xslPath, path.join(distDir, 'sitemap.xsl'))
    }
    console.log(`[PASS] Wrote sitemap.xml, sitemap.xsl and robots.txt to dist/`)

    // Merge redirects into dist/vercel.json
    const vercelConfigPath = path.join(rootDir, 'vercel.json')
    if (fs.existsSync(vercelConfigPath)) {
      try {
        const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'))
        const dynamicRedirects = (redirects || []).map((r) => ({
          source: r.source_path,
          destination: r.target_path,
          permanent: r.status_code === 301,
        }))

        // Keep static redirects if any and append dynamic ones
        const existingRedirects = vercelConfig.redirects || []
        const mergedRedirects = [...existingRedirects]
        for (const dr of dynamicRedirects) {
          if (!mergedRedirects.some((er) => er.source === dr.source)) {
            mergedRedirects.push(dr)
          }
        }

        vercelConfig.redirects = mergedRedirects
        fs.writeFileSync(path.join(distDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8')
        console.log(`[PASS] Merged ${dynamicRedirects.length} redirects into dist/vercel.json`)
      } catch (err) {
        console.warn('[WARN] Could not update dist/vercel.json with redirects:', err.message)
      }
    }
  }
}

generateSitemapAndRobots()
  .then(() => console.log('Sitemap and robots generation complete.'))
  .catch((err) => {
    console.error('Failed to generate sitemap:', err)
    process.exit(1)
  })

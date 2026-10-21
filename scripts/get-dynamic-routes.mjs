import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Helper to parse .env file if environment variables are not set
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

const supabase = createClient(SUPABASE_URL, ANON_KEY)

/**
 * Fetches all dynamic route paths that need prerendering:
 * - /works/:slug & /en/works/:slug
 * - /blog/:slug & /en/blog/:slug
 * - /blog/category/:slug & /en/blog/category/:slug
 * - /blog/page/:page & /en/blog/page/:page
 */
export async function getDynamicRoutes() {
  const routes = []

  try {
    // 1. Categories
    const { data: categories } = await supabase
      .from('categories')
      .select('slug')

    if (categories && categories.length > 0) {
      for (const cat of categories) {
        if (cat.slug) {
          routes.push(`/blog/category/${cat.slug}`)
          routes.push(`/en/blog/category/${cat.slug}`)
        }
      }
    }

    // 2. Published Blog Posts
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, lang, status')
      .eq('status', 'published')

    if (posts && posts.length > 0) {
      for (const post of posts) {
        if (post.slug) {
          if (post.lang === 'en') {
            routes.push(`/en/blog/${post.slug}`)
          } else {
            routes.push(`/blog/${post.slug}`)
          }
        }
      }

      // Check for pagination pages
      const POSTS_PER_PAGE = 9
      const arPosts = posts.filter((p) => p.lang === 'ar')
      const enPosts = posts.filter((p) => p.lang === 'en')

      const totalArPages = Math.ceil(arPosts.length / POSTS_PER_PAGE)
      for (let p = 2; p <= totalArPages; p++) {
        routes.push(`/blog/page/${p}`)
      }

      const totalEnPages = Math.ceil(enPosts.length / POSTS_PER_PAGE)
      for (let p = 2; p <= totalEnPages; p++) {
        routes.push(`/en/blog/page/${p}`)
      }
    }

    // 3. Published Works
    const { data: works } = await supabase
      .from('works')
      .select('slug, is_published')
      .eq('is_published', true)

    if (works && works.length > 0) {
      for (const work of works) {
        if (work.slug) {
          routes.push(`/works/${work.slug}`)
          routes.push(`/en/works/${work.slug}`)
        }
      }
    } else {
      // Fallback seed works routes
      const fallbackWorkSlugs = [
        'andalus-commercial-tower',
        'rawdah-residential-complex',
        'tahlia-shopping-center',
        'saraya-hotel-modernization',
        'nokhba-medical-center',
        'united-business-headquarters',
      ]
      for (const slug of fallbackWorkSlugs) {
        routes.push(`/works/${slug}`)
        routes.push(`/en/works/${slug}`)
      }
    }

    // Fallback seed blog routes if remote has 0 posts
    if (!posts || posts.length === 0) {
      const fallbackPostRoutes = [
        '/blog/dalil-seyana-dawriah-masaid-jeddah',
        '/en/blog/periodic-elevator-maintenance-guide-jeddah',
        '/blog/alamat-tahdeeth-al-masaid-al-qadeemah',
        '/en/blog/signs-your-legacy-elevator-needs-modernization',
        '/blog/eshtiratat-al-difaa-al-madani-lil-masaid',
        '/en/blog/civil-defense-safety-standards-elevators-saudi-arabia',
        '/blog/kayfa-takhtar-qetaa-gheyar-al-masaid-al-asliyah',
        '/en/blog/how-to-choose-genuine-elevator-spare-parts',
      ]
      routes.push(...fallbackPostRoutes)
    }
  } catch (err) {
    console.warn('[Prerender] Error fetching dynamic routes from Supabase, using fallback:', err.message)
  }

  return routes
}

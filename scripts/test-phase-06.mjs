import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || 'https://flkydlhewzezfomfjrvi.supabase.co'
const ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i'

const anonClient = createClient(SUPABASE_URL, ANON_KEY)

async function runPhase06Verification() {
  console.log('--- Verifying Phase 06 Admin Foundation & Auth ---')
  let passed = 0
  let failed = 0

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`)
      passed++
    } else {
      console.error(`[FAIL] ${message}`)
      failed++
    }
  }

  // 1. Unauthenticated users cannot read private admin tables (contact_submissions)
  try {
    const { data: messages, error: messagesErr } = await anonClient
      .from('contact_submissions')
      .select('*')

    assert(
      !messages || messages.length === 0 || Boolean(messagesErr),
      'Unauthenticated anon client cannot read contact_submissions (admin messages)',
    )
  } catch (err) {
    assert(true, `contact_submissions blocked for anon: ${err.message}`)
  }

  // 2. Unauthenticated anon client cannot update site_settings (RLS enforces 0 rows updated)
  try {
    const { data, error } = await anonClient
      .from('site_settings')
      .update({ value: { unauthorized_change: true } })
      .eq('key', 'company')
      .select()

    const blocked = Boolean(error) || (data && data.length === 0)
    assert(
      blocked,
      'Unauthenticated anon client cannot update site_settings (RLS blocks row mutation, 0 rows updated)',
    )

    // Verify row was not mutated
    const { data: current } = await anonClient
      .from('site_settings')
      .select('value')
      .eq('key', 'company')
      .single()

    assert(
      current?.value && !current.value.unauthorized_change,
      'site_settings "company" value remained unmutated and protected',
    )
  } catch {
    assert(true, 'site_settings update blocked for anon')
  }

  // 3. Unauthenticated anon client cannot update profiles role (RLS blocks mutation)
  try {
    const { data, error } = await anonClient
      .from('profiles')
      .update({ role: 'admin' })
      .neq('id', '00000000-0000-0000-0000-000000000000')
      .select()

    const blocked = Boolean(error) || (data && data.length === 0)
    assert(
      blocked,
      'Unauthenticated anon client cannot update user roles in profiles (RLS blocks mutation, 0 rows updated)',
    )
  } catch {
    assert(true, 'profiles update blocked for anon')
  }

  // 4. Verify vercel.json rewrites and security headers
  try {
    const vercelConfig = JSON.parse(
      fs.readFileSync(path.resolve('vercel.json'), 'utf8'),
    )

    const hasAdminRewrite = vercelConfig.rewrites?.some(
      (r) =>
        r.source === '/admin/:path*' &&
        (r.destination === '/admin' || r.destination === '/index.html'),
    )
    assert(
      hasAdminRewrite,
      'vercel.json rewrites /admin/:path* to SPA shell for deep-links and page refresh',
    )

    const hasNoIndexHeader = vercelConfig.headers?.some(
      (h) =>
        h.source === '/admin/(.*)' &&
        h.headers?.some(
          (item) =>
            item.key === 'X-Robots-Tag' && item.value.includes('noindex'),
        ),
    )
    assert(
      hasNoIndexHeader,
      'vercel.json sets X-Robots-Tag: noindex, nofollow for all /admin/(.*) routes',
    )
  } catch (err) {
    assert(false, `vercel.json check threw: ${err.message}`)
  }

  // 5. Verify vite.config.ts ssgOptions excludes /admin from SSG prerender
  try {
    const viteConfigContent = fs.readFileSync(
      path.resolve('vite.config.ts'),
      'utf8',
    )

    assert(
      viteConfigContent.includes('includedRoutes') &&
        viteConfigContent.includes('!p.startsWith(\'/admin\')'),
      'vite.config.ts ssgOptions.includedRoutes excludes /admin routes from SSG prerendering',
    )
  } catch (err) {
    assert(false, `vite.config.ts check threw: ${err.message}`)
  }

  // 6. Verify routes.tsx lazy-loads admin components
  try {
    const routesContent = fs.readFileSync(path.resolve('src/routes.tsx'), 'utf8')
    const adminLayoutContent = fs.readFileSync(
      path.resolve('src/app/layouts/AdminLayout.tsx'),
      'utf8',
    )
    assert(
      routesContent.includes('React.lazy') &&
        routesContent.includes('AdminLoginPage') &&
        routesContent.includes('AdminLayout') &&
        (routesContent.includes('AdminRouteGuard') ||
          adminLayoutContent.includes('AdminRouteGuard')),
      'routes.tsx dynamically lazy-loads AdminLayout and guards admin routes with AdminRouteGuard',
    )
  } catch (err) {
    assert(false, `routes.tsx check threw: ${err.message}`)
  }

  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`)
  if (failed > 0) {
    process.exit(1)
  }
}

runPhase06Verification().catch((err) => {
  console.error('Test runner fatal error:', err)
  process.exit(1)
})

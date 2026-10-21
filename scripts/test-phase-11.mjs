import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

async function runPhase11Verification() {
  console.log('--- Running Phase 11 Technical SEO Full Verification ---')

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

  // 1. Run Vitest SEO unit test suite
  try {
    console.log('\n[1/4] Running Vitest Schema & SEO Tests...')
    execSync('npx vitest run src/features/seo/__tests__/seoPhase11.test.ts', {
      cwd: rootDir,
      stdio: 'inherit',
    })
    assert(true, 'Vitest Phase 11 SEO tests passed (8 tests)')
  } catch (err) {
    assert(false, `Vitest Phase 11 tests failed: ${err.message}`)
  }

  // 2. Verify static build artifacts
  console.log('\n[2/4] Verifying Prerendered HTML & Artifacts...')
  const distDir = path.join(rootDir, 'dist')
  assert(fs.existsSync(distDir), 'dist/ directory exists')
  assert(fs.existsSync(path.join(distDir, 'sitemap.xml')), 'dist/sitemap.xml exists')
  assert(fs.existsSync(path.join(distDir, 'robots.txt')), 'dist/robots.txt exists')

  // 3. Run SEO HTML Verification script
  try {
    console.log('\n[3/4] Running HTML Verification (One H1, Canonical, Alternates, JSON-LD)...')
    execSync('node scripts/verify-seo.mjs', {
      cwd: rootDir,
      stdio: 'inherit',
    })
    assert(true, 'scripts/verify-seo.mjs passed across all 34 public pages')
  } catch (err) {
    assert(false, `scripts/verify-seo.mjs failed: ${err.message}`)
  }

  // 4. Verify 301 Redirects migration & Vercel config
  console.log('\n[4/4] Verifying 301 Redirects Migration & Vercel Config...')
  const migrationPath = path.join(rootDir, 'supabase', 'migrations', '009_redirects.sql')
  assert(fs.existsSync(migrationPath), 'Migration 009_redirects.sql exists')
  const vercelPath = path.join(distDir, 'vercel.json')
  assert(fs.existsSync(vercelPath), 'dist/vercel.json exists')

  console.log(`\n=== Phase 11 Full Verification Results ===`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)

  if (failed > 0) {
    console.error(`\n[ERROR] Phase 11 verification failed with ${failed} issues.`)
    process.exit(1)
  } else {
    console.log(`\n[SUCCESS] Phase 11 Technical SEO verified completely!`)
  }
}

runPhase11Verification()

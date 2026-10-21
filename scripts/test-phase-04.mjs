import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://flkydlhewzezfomfjrvi.supabase.co'
const ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i'

const anonClient = createClient(SUPABASE_URL, ANON_KEY)

async function runPhase04Verification() {
  console.log('--- Verifying Phase 04 Database Policies & Data Access ---')
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

  // Test 1: site_settings public read
  try {
    const { data, error } = await anonClient.from('site_settings').select('key, value')
    assert(!error && data !== null, 'Public anon client can select site_settings')
    if (data) {
      const keys = data.map((d) => d.key)
      assert(keys.includes('company') && keys.includes('contact'), 'site_settings contains company and contact rows')
    }
  } catch (err) {
    assert(false, `site_settings query threw: ${err.message}`)
  }

  // Test 2: works public read (published only)
  try {
    const { data, error } = await anonClient.from('works').select('*')
    assert(!error, 'Public anon client can query works table')
    if (data && data.length > 0) {
      const allPublished = data.every((w) => w.is_published === true)
      assert(allPublished, 'All returned works have is_published = true (RLS enforced)')
    } else {
      console.log('[INFO] Works table is currently empty in database (empty state testable)')
    }
  } catch (err) {
    assert(false, `works query threw: ${err.message}`)
  }

  // Test 3: partners public read (published only)
  try {
    const { data, error } = await anonClient.from('partners').select('*')
    assert(!error, 'Public anon client can query partners table')
    if (data && data.length > 0) {
      const allPublished = data.every((p) => p.is_published === true)
      assert(allPublished, 'All returned partners have is_published = true (RLS enforced)')
    } else {
      console.log('[INFO] Partners table is currently empty in database (empty state testable)')
    }
  } catch (err) {
    assert(false, `partners query threw: ${err.message}`)
  }

  // Test 4: contact_submissions security (anon CANNOT select leads)
  try {
    const { data, error } = await anonClient.from('contact_submissions').select('*')
    assert(
      error !== null || (data && data.length === 0),
      'Public anon client CANNOT select or read contact_submissions (RLS blocked)',
    )
  } catch (err) {
    assert(true, 'contact_submissions select failed as expected for anon')
  }

  // Test 5: contact_submissions valid insertion
  try {
    const testSubmission = {
      name: 'Verification Bot',
      phone: '+966559557459',
      email: 'test@almubtakirah.com',
      service_interest: 'maintenance',
      message: 'Automated test message for Phase 04 lead validation.',
      source_page: '/contact',
      status: 'new',
    }
    const { error } = await anonClient
      .from('contact_submissions')
      .insert(testSubmission)

    if (error) {
      console.error('Insert error details:', error)
    }
    assert(!error, 'Public anon client CAN insert valid contact lead into contact_submissions')
  } catch (err) {
    assert(false, `contact_submissions insertion threw: ${err.message}`)
  }

  // Test 6: contact_submissions invalid insertion (name too short, char_length < 2)
  try {
    const invalidSubmission = {
      name: 'x', // Check constraint: char_length(name) between 2 and 100
      phone: '+966559557459',
      message: 'Short name test',
      status: 'new',
    }
    const { error } = await anonClient.from('contact_submissions').insert(invalidSubmission)
    assert(error !== null, 'Invalid payload (name too short) is rejected by DB constraint')
  } catch (err) {
    assert(true, 'Invalid insertion rejected as expected')
  }

  console.log(`\nVerification finished: ${passed} passed, ${failed} failed.`)
  if (failed > 0) {
    process.exit(1)
  }
}

runPhase04Verification()

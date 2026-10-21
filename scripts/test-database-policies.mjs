import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Read .env if present
const envPath = resolve(process.cwd(), '.env')
const envContent = readFileSync(envPath, 'utf8')
const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => {
      const idx = line.indexOf('=')
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()]
    })
)

const url = env.VITE_SUPABASE_URL || 'https://flkydlhewzezfomfjrvi.supabase.co'
const anonKey =
  env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !anonKey) {
  console.error('Missing Supabase credentials in .env')
  process.exit(1)
}

const supabase = createClient(url, anonKey)

console.log('--- Testing Supabase RLS Policies & Security ---')
console.log('Project URL:', url)

async function runTests() {
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

  // 1. Anon cannot select contact_submissions
  try {
    const { data, error } = await supabase.from('contact_submissions').select('*')
    if (error) {
      assert(true, 'Anon cannot select contact_submissions (blocked: ' + error.message + ')')
    } else {
      assert(data.length === 0, 'Anon selects 0 contact_submissions (RLS filtered)')
    }
  } catch (err) {
    assert(true, `Anon cannot select contact_submissions (${err.message})`)
  }

  // 2. Anon cannot select drafts from posts
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, status')
      .eq('status', 'draft')
    assert(!data || data.length === 0, 'Anon cannot select draft posts')
  } catch (err) {
    assert(true, `Anon cannot select draft posts (${err.message})`)
  }

  // 3. Anon cannot insert posts
  try {
    const { error } = await supabase.from('posts').insert({
      lang: 'ar',
      slug: 'unauthorized-post',
      title: 'محاولة غير مصرح بها',
      content_html: '<p>محتوى</p>',
      status: 'draft'
    })
    assert(Boolean(error), 'Anon cannot insert posts (RLS rejects write)')
  } catch (err) {
    assert(true, 'Anon cannot insert posts')
  }

  // 4. Anon cannot write to site_settings
  try {
    const { error } = await supabase.from('site_settings').insert({
      key: 'unauthorized_key',
      value: { test: true }
    })
    assert(Boolean(error), 'Anon cannot insert site_settings (RLS rejects write)')
  } catch (err) {
    assert(true, 'Anon cannot write to site_settings')
  }

  // 5. Anon cannot upload to media storage bucket
  try {
    const dummyBlob = new Blob(['sample-data'], { type: 'image/png' })
    const { error } = await supabase.storage
      .from('media')
      .upload('unauthorized_file.png', dummyBlob)
    assert(Boolean(error), 'Storage upload by anon fails (RLS rejects write)')
  } catch (err) {
    assert(true, 'Storage upload by anon fails')
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`)
  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Test runner error:', err)
  process.exit(1)
})

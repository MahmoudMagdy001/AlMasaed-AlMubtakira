import { createClient } from '@supabase/supabase-js'
import { processArticleHtml, slugifyHeading, stripHtml } from '../src/lib/blogContent.ts'

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || 'https://flkydlhewzezfomfjrvi.supabase.co'
const ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i'

const anonClient = createClient(SUPABASE_URL, ANON_KEY)

async function runPhase05Verification() {
  console.log('--- Verifying Phase 05 Public Blog Requirements ---')
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

  // 1. Categories query via anon key
  try {
    const { data: categories, error } = await anonClient
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    assert(!error && categories !== null, 'Public anon client can select categories')
    if (categories) {
      assert(
        categories.length >= 5,
        `Categories seeded properly (found ${categories.length} categories: ${categories.map((c) => c.slug).join(', ')})`,
      )
    }
  } catch (err) {
    assert(false, `Categories query threw: ${err.message}`)
  }

  // 2. Posts RLS enforcement via anon key: Only status='published' and published_at <= now()
  try {
    const { data: posts, error } = await anonClient
      .from('posts')
      .select('id, slug, status, published_at')

    assert(!error, 'Public anon client can query posts table without error')

    if (posts && posts.length > 0) {
      const allPublished = posts.every((p) => p.status === 'published')
      assert(allPublished, 'All returned posts have status = "published" (RLS enforced)')

      const now = new Date()
      const allPastOrNow = posts.every(
        (p) => p.published_at && new Date(p.published_at) <= now,
      )
      assert(allPastOrNow, 'All returned posts have published_at <= now() (RLS enforced)')
    } else {
      console.log('[INFO] Posts table currently contains 0 published posts (empty state tested)')
    }

    // Verify anon cannot select draft posts explicitly
    const { data: draftPosts } = await anonClient
      .from('posts')
      .select('id, slug, status')
      .eq('status', 'draft')

    assert(
      !draftPosts || draftPosts.length === 0,
      'Public anon client cannot access draft posts (RLS strictly enforced)',
    )
  } catch (err) {
    assert(false, `Posts RLS query threw: ${err.message}`)
  }

  // 3. Sanitizer unit checks (Allow-list HTML sanitization & XSS prevention)
  try {
    const dirtyHtml = `
      <p>مرحباً بكم في <script>alert("xss")</script>موقع شركة المصاعد المبتكرة.</p>
      <img src="valid.webp" onerror="alert('hack')" alt="صورة توضيحية" />
      <a href="javascript:alert(1)">رابط مشبوه</a>
      <iframe src="https://evil.com/phish"></iframe>
      <iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe>
      <table><tr><th>العنصر</th><th>المعيار</th></tr><tr><td>السرعة</td><td>1.6 م/ث</td></tr></table>
      <h2>أهمية الصيانة الدورية للمصاعد</h2>
      <p>تفاصيل الصيانة الوقائية واشتراطات الدفاع المدني.</p>
      <h3>معايير الأمان والسلامة في جدة</h3>
      <p>المعايير المعتمدة في المملكة.</p>
    `

    const result = processArticleHtml(dirtyHtml)

    assert(!result.sanitizedHtml.includes('<script>'), 'Sanitizer strips <script> tags')
    assert(!result.sanitizedHtml.includes('alert('), 'Sanitizer strips script execution payloads')
    assert(!result.sanitizedHtml.includes('onerror'), 'Sanitizer strips on* event handlers')
    assert(!result.sanitizedHtml.includes('javascript:'), 'Sanitizer strips javascript: protocol in href')
    assert(!result.sanitizedHtml.includes('https://evil.com'), 'Sanitizer discards untrusted iframes')
    assert(
      result.sanitizedHtml.includes('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'),
      'Sanitizer preserves valid YouTube embed iframes',
    )
    assert(
      result.sanitizedHtml.includes('class="table-wrapper overflow-x-auto'),
      'Sanitizer wraps tables in horizontal scroll containers',
    )
    assert(result.toc.length === 2, `Sanitizer extracted TOC correctly (found ${result.toc.length} items)`)
    assert(
      result.toc[0].text === 'أهمية الصيانة الدورية للمصاعد' && result.toc[0].level === 2,
      'First TOC item matches H2 Arabic heading',
    )
    assert(
      result.sanitizedHtml.includes(`id="${result.toc[0].id}"`),
      'H2 tag in HTML contains generated anchor ID matching TOC item',
    )
    assert(
      result.toc[1].text === 'معايير الأمان والسلامة في جدة' && result.toc[1].level === 3,
      'Second TOC item matches H3 heading',
    )
  } catch (err) {
    assert(false, `Sanitizer test threw: ${err.message}`)
  }

  // 4. Heading slugification check for Arabic text
  try {
    const slug1 = slugifyHeading('صيانة وتحديث المصاعد في جدة 2026')
    assert(
      slug1 === 'صيانة-وتحديث-المصاعد-في-جدة-2026',
      `slugifyHeading preserves Arabic text and hyphens correctly (${slug1})`,
    )

    const slug2 = slugifyHeading('Elevator Modernization & Safety 101')
    assert(
      slug2 === 'elevator-modernization-safety-101',
      `slugifyHeading handles English alphanumeric headings correctly (${slug2})`,
    )
  } catch (err) {
    assert(false, `slugifyHeading test threw: ${err.message}`)
  }

  // 5. StripHtml check
  try {
    const plain = stripHtml('<p>شركة <strong>المصاعد المبتكرة</strong> المعتمدة</p>')
    assert(
      plain === 'شركة المصاعد المبتكرة المعتمدة',
      'stripHtml strips tags leaving clean text',
    )
  } catch (err) {
    assert(false, `stripHtml test threw: ${err.message}`)
  }

  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`)
  if (failed > 0) {
    process.exit(1)
  }
}

runPhase05Verification().catch((err) => {
  console.error('Test runner fatal error:', err)
  process.exit(1)
})

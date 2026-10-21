import { JSDOM } from 'jsdom'
import {
  processArticleHtml,
  stripHtml,
  slugifyHeading,
} from '../src/lib/blogContent.ts'
import {
  generateSlug,
  calculateReadingTime,
  deriveFaqFromContent,
  postFormSchema,
} from '../src/features/blog/blogAdminService.ts'
import {
  categoryFormSchema,
  tagFormSchema,
} from '../src/features/blog/blogTaxonomyService.ts'

async function runPhase09Verification() {
  console.log('--- Verifying Phase 09 Blog Admin & TipTap Editor ---')
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

  // Set up mock DOM
  const dom = new JSDOM('<!doctype html><html><body></body></html>')
  global.window = dom.window
  global.document = dom.window.document
  global.DOMParser = dom.window.DOMParser
  global.HTMLElement = dom.window.HTMLElement

  try {
    // 1. HTML Sanitization allow-list
    const dirty = `
      <p>مرحباً بكم في <script>alert("hacked")</script> مصاعد جدة</p>
      <img src="https://example.com/img.jpg" onerror="alert(1)" alt="مصعد" />
      <a href="javascript:alert(2)" onclick="malicious()">رابط ضار</a>
    `
    const { sanitizedHtml: clean1 } = processArticleHtml(dirty)
    assert(!clean1.includes('<script>'), 'Strips script tags')
    assert(!clean1.includes('onerror'), 'Strips inline onerror handlers')
    assert(!clean1.includes('onclick'), 'Strips inline onclick handlers')
    assert(!clean1.includes('javascript:'), 'Strips javascript: protocol in href/src')
    assert(clean1.includes('مصاعد جدة'), 'Preserves safe Arabic text')
    assert(clean1.includes('alt="مصعد"'), 'Preserves safe img attributes')

    // 2. YouTube embed protection
    const embedHtml = `
      <p>فيديو توضيحي:</p>
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315"></iframe>
      <iframe src="https://evil-site.com/steal-data"></iframe>
    `
    const { sanitizedHtml: cleanEmbed } = processArticleHtml(embedHtml)
    assert(cleanEmbed.includes('youtube.com/embed/'), 'Allows legitimate YouTube embeds')
    assert(!cleanEmbed.includes('evil-site.com'), 'Blocks unauthorized iframe sources')

    // 3. Responsive table wrapper
    const tableHtml = `
      <table>
        <thead><tr><th>نوع المصعد</th><th>الحمولة</th></tr></thead>
        <tbody><tr><td>بانوراما</td><td>630 كجم</td></tr></tbody>
      </table>
    `
    const { sanitizedHtml: cleanTable } = processArticleHtml(tableHtml)
    assert(cleanTable.includes('class="table-wrapper'), 'Wraps tables in responsive .table-wrapper')
    assert(cleanTable.includes('بانوراما'), 'Preserves table cell contents')

    // 4. Headings & Table of Contents extraction
    const headingsHtml = `
      <h2>أهمية الصيانة الدورية للمصاعد</h2>
      <p>محتوى الفقرة...</p>
      <h3>جدول الزيارات المعتمد</h3>
    `
    const { sanitizedHtml: cleanHeadings, toc } = processArticleHtml(headingsHtml)
    assert(toc.length === 2, `Extracts 2 headings for TOC (found ${toc.length})`)
    assert(cleanHeadings.includes('id="'), 'Injected anchor id attributes into headings')
    assert(toc[0].text.includes('أهمية الصيانة'), 'Preserved heading text in TOC')

    // 5. Arabic Transliteration & Slug Generation
    const arabicSlug = generateSlug('تكلفة صيانة وتحديث المصاعد في جدة 2026')
    assert(
      arabicSlug === 'tklfh-syanh-wthdyth-almsaad-fy-jdh-2026',
      `generateSlug transliterates Arabic correctly: "${arabicSlug}"`,
    )
    const englishSlug = generateSlug('Elevator Maintenance & Modernization in Jeddah!')
    assert(
      englishSlug === 'elevator-maintenance-modernization-in-jeddah',
      `generateSlug cleans English text: "${englishSlug}"`,
    )
    assert(generateSlug('') === '', 'generateSlug handles empty string')
    assert(generateSlug('!@#$%^&*()') === '', 'generateSlug handles special characters only')

    // 6. Reading Time Calculation
    const words400 = new Array(400).fill('كلمة').join(' ')
    assert(calculateReadingTime(words400) === 2, 'Calculates 400 words = 2 min')
    const words50 = new Array(50).fill('word').join(' ')
    assert(calculateReadingTime(words50) === 1, 'Calculates 50 words = 1 min (min bound)')
    const words850 = new Array(850).fill('مصعد').join(' ')
    assert(calculateReadingTime(words850) === 5, 'Calculates 850 words = 5 min (ceiling)')

    // 7. FAQ Derivation from Editor Blocks
    const articleWithFaq = `
      <h2>تفاصيل الأسعار</h2>
      <div data-faq-item="true" class="faq-item">
        <div data-faq-question="true">ما هي المدة اللازمة لتركيب مصعد جديد؟</div>
        <div data-faq-answer="true">تستغرق عملية التركيب عادة بين 3 إلى 6 أسابيع حسب عدد الطوابق.</div>
      </div>
      <div data-faq-item="true" class="faq-item">
        <div data-faq-question="true">هل تقدمون ضماناً معتمداً على قطع الغيار؟</div>
        <div data-faq-answer="true">نعم، جميع قطع الغيار أصلية ومشمولة بضمان استبدال معتمد.</div>
      </div>
    `
    const faqs = deriveFaqFromContent(articleWithFaq)
    assert(faqs.length === 2, `Extracted 2 FAQ pairs from content (found ${faqs.length})`)
    assert(faqs[0].q === 'ما هي المدة اللازمة لتركيب مصعد جديد؟', 'Extracted first question text')
    assert(faqs[0].a.includes('3 إلى 6 أسابيع'), 'Extracted first answer text')
    assert(faqs[1].q === 'هل تقدمون ضماناً معتمداً على قطع الغيار؟', 'Extracted second question text')

    const emptyFaqs = deriveFaqFromContent('<p>نص عادي بدون أسئلة</p>')
    assert(emptyFaqs.length === 0, 'Returns empty array when no FAQ blocks exist')

    // 8. Post Form Zod Schema
    const validPost = {
      title: 'دليل اختيار مصاعد الفلل السكنية',
      slug: 'villa-elevators-guide-jeddah',
      lang: 'ar',
      excerpt: 'تعرف على أفضل أنواع المصاعد المنزلية والفلل في جدة.',
      content_html: '<p>محتوى المقال الكامل...</p>',
      status: 'draft',
      schema_type: 'BlogPosting',
      secondary_keywords: ['مصاعد فلل', 'مصاعد منزلية'],
      tag_ids: ['a0000000-0000-0000-0000-000000000001'],
      faq: [],
    }
    const postValidation = postFormSchema.safeParse(validPost)
    assert(postValidation.success, 'postFormSchema accepts valid post')

    const invalidPost = {
      title: 'أ', // too short (< 3)
      slug: 'INVALID SLUG WITH SPACES & CAPS!',
      lang: 'ar',
    }
    const invalidValidation = postFormSchema.safeParse(invalidPost)
    assert(!invalidValidation.success, 'postFormSchema rejects invalid slug and short title')

    // 9. Category & Tag Schemas
    const validCategory = {
      name_ar: 'تحديث المصاعد',
      name_en: 'Elevator Modernization',
      slug: 'elevator-modernization',
      sort_order: 1,
    }
    assert(categoryFormSchema.safeParse(validCategory).success, 'categoryFormSchema validates correct category')

    const validTag = {
      name_ar: 'أمان المصاعد',
      slug: 'elevator-safety',
    }
    assert(tagFormSchema.safeParse(validTag).success, 'tagFormSchema validates correct tag')

    // 10. Direction and custom callout round-trip preservation
    const originalHtml = `
      <div data-callout="safety" class="callout callout-safety">
        <p dir="rtl">تنبيه سلامة مهم: يجب فصل التيار قبل بدء الصيانة.</p>
      </div>
      <p dir="ltr">Mixed technical note: EN-81 elevator standard compliance.</p>
    `
    const { sanitizedHtml: cleanRoundTrip } = processArticleHtml(originalHtml)
    assert(cleanRoundTrip.includes('data-callout="safety"'), 'Preserves data-callout block attribute')
    assert(cleanRoundTrip.includes('dir="rtl"'), 'Preserves RTL block direction')
    assert(cleanRoundTrip.includes('dir="ltr"'), 'Preserves LTR block direction')
  } catch (err) {
    assert(false, `Unexpected test exception: ${err.message}`)
  } finally {
    dom.window.close()
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.\n`)
  if (failed > 0) {
    process.exit(1)
  }
}

runPhase09Verification()

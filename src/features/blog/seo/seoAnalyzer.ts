import {
  normalizeArabic,
  extractPlainText,
  countWords,
  calculateKeywordDensity,
  findKeywordMatches,
  analyzeSentences,
  analyzeParagraphs,
} from './arabicUtils'
import type {
  SeoAnalyzerInput,
  SeoAnalyzerOutput,
  SeoCheckResult,
  SeoMetrics,
  LinkAnalysisItem,
} from './types'
import { generateSlug } from '../blogAdminService'

/**
 * Extracts links from HTML content.
 */
function extractLinks(
  html: string,
  siteDomain = 'almubtakirah.com',
): {
  internalCount: number
  externalCount: number
  linksList: LinkAnalysisItem[]
} {
  const linkRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi
  const linksList: LinkAnalysisItem[] = []
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = match[1]
    const text = extractPlainText(match[2])
    const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i)
    const relMatch = attrs.match(/rel\s*=\s*["']([^"']+)["']/i)

    if (hrefMatch) {
      const href = hrefMatch[1].trim()
      const rel = relMatch ? relMatch[1].toLowerCase() : ''
      const isNofollow = rel.includes('nofollow')

      // Determine if internal
      const isInternal =
        href.startsWith('/') ||
        href.startsWith('#') ||
        href.includes(siteDomain) ||
        href.startsWith('./')

      linksList.push({
        href,
        text: text || href,
        isInternal,
        isNofollow,
      })
    }
  }

  const internalCount = linksList.filter((l) => l.isInternal).length
  const externalCount = linksList.filter((l) => !l.isInternal).length

  return {
    internalCount,
    externalCount,
    linksList,
  }
}

/**
 * Extracts headings outline from HTML content.
 */
function extractHeadings(html: string): {
  outline: Array<{ level: 2 | 3 | 4; text: string }>
  counts: { h2: number; h3: number; h4: number }
  hasSkippedLevels: boolean
} {
  const headingRegex = /<(h[2-4])\b[^>]*>([\s\S]*?)<\/\1>/gi
  const outline: Array<{ level: 2 | 3 | 4; text: string }> = []
  const counts = { h2: 0, h3: 0, h4: 0 }
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase()
    const text = extractPlainText(match[2])
    const level = Number(tag.charAt(1)) as 2 | 3 | 4

    if (level === 2) counts.h2++
    if (level === 3) counts.h3++
    if (level === 4) counts.h4++

    outline.push({ level, text })
  }

  // Check skipped levels (e.g. H4 without H3, or H3 without H2)
  let hasSkippedLevels = false
  for (let i = 0; i < outline.length; i++) {
    const current = outline[i].level
    const prev = i > 0 ? outline[i - 1].level : 1
    if (current - prev > 1) {
      hasSkippedLevels = true
      break
    }
  }

  return {
    outline,
    counts,
    hasSkippedLevels,
  }
}

/**
 * Extracts images and evaluates their alt attributes.
 */
function extractImages(html: string): {
  total: number
  withAlt: number
  missingAlt: number
  altsList: string[]
} {
  const imgRegex = /<img\b([^>]*)>/gi
  let total = 0
  let withAlt = 0
  const altsList: string[] = []
  let match: RegExpExecArray | null

  while ((match = imgRegex.exec(html)) !== null) {
    total++
    const attrs = match[1]
    const altMatch = attrs.match(/alt\s*=\s*["']([^"']*)["']/i)
    if (altMatch && altMatch[1].trim().length > 0) {
      withAlt++
      altsList.push(altMatch[1].trim())
    }
  }

  return {
    total,
    withAlt,
    missingAlt: total - withAlt,
    altsList,
  }
}

/**
 * Main Pure SEO Analyzer Engine
 * Evaluates 22 checks, aggregates scores, and provides actionable Arabic tips.
 */
export function analyzePostSeo(input: SeoAnalyzerInput): SeoAnalyzerOutput {
  const siteDomain = input.siteDomain || 'almubtakirah.com'
  const focusKeyword = (input.focusKeyword || '').trim()
  const normKeyword = normalizeArabic(focusKeyword)
  const keywordWordsCount = normKeyword ? normKeyword.split(/\s+/).filter(Boolean).length : 0

  const contentHtml = input.contentHtml || ''
  const plainContent = extractPlainText(contentHtml)
  const totalWords = countWords(plainContent)

  // Metrics extraction
  const sentenceAnalysis = analyzeSentences(plainContent)
  const paragraphAnalysis = analyzeParagraphs(contentHtml)
  const headingsData = extractHeadings(contentHtml)
  const linksData = extractLinks(contentHtml, siteDomain)
  const imagesData = extractImages(contentHtml)

  // Keyword matches in content
  const keywordMatchResult = normKeyword
    ? findKeywordMatches(plainContent, focusKeyword)
    : { count: 0, matches: [] }
  const keywordOccurrences = keywordMatchResult.count
  const keywordDensity = calculateKeywordDensity(keywordOccurrences, keywordWordsCount, totalWords)

  // Reading time (200 wpm)
  const readingTimeMin = Math.max(1, Math.ceil(totalWords / 200))

  // FAQ count
  const faqCount = input.faq ? input.faq.length : 0

  const checks: SeoCheckResult[] = []

  // =========================================================================
  // CATEGORY 1: BASIC SEO (50 Points)
  // =========================================================================

  // 1. Focus keyword set (5 pts)
  if (focusKeyword.length > 0) {
    checks.push({
      id: 'focus-keyword-set',
      titleAr: 'تحديد الكلمة المفتاحية المستهدفة',
      status: 'pass',
      score: 5,
      maxScore: 5,
      messageAr: `تم تحديد الكلمة المفتاحية: "${focusKeyword}"`,
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'focus-keyword-set',
      titleAr: 'تحديد الكلمة المفتاحية المستهدفة',
      status: 'fail',
      score: 0,
      maxScore: 5,
      messageAr: 'لم يتم تحديد كلمة مفتاحية رئيسية للمقال.',
      fixTipAr: 'حدد الكلمة المفتاحية الأساسية التي يبحث عنها العملاء (مثال: صيانة مصاعد جدة).',
      category: 'basic',
    })
  }

  // 2. Keyword in SEO title (8 pts)
  const effectiveTitle = (input.seoTitle || input.title || '').trim()
  const titleMatches = normKeyword ? findKeywordMatches(effectiveTitle, focusKeyword) : { count: 0 }
  if (!normKeyword) {
    checks.push({
      id: 'keyword-in-title',
      titleAr: 'الكلمة المفتاحية في عنوان المقال',
      status: 'fail',
      score: 0,
      maxScore: 8,
      messageAr: 'حدد الكلمة المفتاحية أولاً لفحص وجودها في العنوان.',
      fixTipAr: 'أدرج الكلمة المفتاحية في عنوان الـ SEO.',
      category: 'basic',
    })
  } else if (titleMatches.count > 0) {
    const isAtStart = normalizeArabic(effectiveTitle).startsWith(normKeyword)
    checks.push({
      id: 'keyword-in-title',
      titleAr: 'الكلمة المفتاحية في عنوان المقال',
      status: 'pass',
      score: 8,
      maxScore: 8,
      messageAr: isAtStart
        ? 'الكلمة المفتاحية موجودة في بداية العنوان (موضع مثالي لجذب النقرات).'
        : 'الكلمة المفتاحية متضمنة في عنوان المقال.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'keyword-in-title',
      titleAr: 'الكلمة المفتاحية في عنوان المقال',
      status: 'fail',
      score: 0,
      maxScore: 8,
      messageAr: 'العنوان لا يحتوي على الكلمة المفتاحية المستهدفة.',
      fixTipAr: 'أضف الكلمة المفتاحية إلى عنوان المقال (ويفضل أن تكون في البداية).',
      category: 'basic',
    })
  }

  // 3. Keyword in meta description (6 pts)
  const effectiveDesc = (input.seoDescription || input.excerpt || '').trim()
  const descMatches = normKeyword ? findKeywordMatches(effectiveDesc, focusKeyword) : { count: 0 }
  if (!normKeyword) {
    checks.push({
      id: 'keyword-in-desc',
      titleAr: 'الكلمة المفتاحية في الوصف التعريفي',
      status: 'fail',
      score: 0,
      maxScore: 6,
      messageAr: 'حدد الكلمة المفتاحية أولاً لفحص الوصف.',
      fixTipAr: 'أضف الكلمة المفتاحية في الوصف التعريفي للـ SEO.',
      category: 'basic',
    })
  } else if (descMatches.count > 0) {
    checks.push({
      id: 'keyword-in-desc',
      titleAr: 'الكلمة المفتاحية في الوصف التعريفي',
      status: 'pass',
      score: 6,
      maxScore: 6,
      messageAr: 'الكلمة المفتاحية متضمنة في الوصف التعريفي لمحركات البحث.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'keyword-in-desc',
      titleAr: 'الكلمة المفتاحية في الوصف التعريفي',
      status: 'fail',
      score: 0,
      maxScore: 6,
      messageAr: 'الوصف التعريفي (أو المقتطف) لا يحتوي على الكلمة المفتاحية.',
      fixTipAr: 'صغ وصفاً جذاباً يتضمن الكلمة المفتاحية لحث الزوار على النقر.',
      category: 'basic',
    })
  }

  // 4. Keyword in slug (5 pts)
  const slug = (input.slug || '').trim().toLowerCase()
  const transliteratedKeywordSlug = normKeyword ? generateSlug(focusKeyword) : ''
  const isKeywordInSlug =
    Boolean(slug && transliteratedKeywordSlug && slug.includes(transliteratedKeywordSlug)) ||
    (normKeyword && slug.includes(normKeyword.replace(/\s+/g, '-')))

  if (!normKeyword) {
    checks.push({
      id: 'keyword-in-slug',
      titleAr: 'الكلمة المفتاحية في الرابط اللطيف (Slug)',
      status: 'fail',
      score: 0,
      maxScore: 5,
      messageAr: 'حدد الكلمة المفتاحية لفحص الرابط.',
      category: 'basic',
    })
  } else if (isKeywordInSlug) {
    checks.push({
      id: 'keyword-in-slug',
      titleAr: 'الكلمة المفتاحية في الرابط اللطيف (Slug)',
      status: 'pass',
      score: 5,
      maxScore: 5,
      messageAr: 'الرابط اللطيف يحتوي على الكلمة المفتاحية بشكل سليم.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'keyword-in-slug',
      titleAr: 'الكلمة المفتاحية في الرابط اللطيف (Slug)',
      status: 'fail',
      score: 0,
      maxScore: 5,
      messageAr: 'الرابط اللطيف للمقال لا يتضمن الكلمة المفتاحية.',
      fixTipAr: `ضمّن صياغة الكلمة المفتاحية في الرابط (مثال: /${transliteratedKeywordSlug || 'keyword'}).`,
      category: 'basic',
    })
  }

  // 5. Keyword in first 100 words (7 pts)
  const first100Words = plainContent.split(/\s+/).slice(0, 100).join(' ')
  const first100Matches = normKeyword ? findKeywordMatches(first100Words, focusKeyword) : { count: 0 }
  if (!normKeyword) {
    checks.push({
      id: 'keyword-in-intro',
      titleAr: 'الكلمة المفتاحية في المقدمة (أول 100 كلمة)',
      status: 'fail',
      score: 0,
      maxScore: 7,
      messageAr: 'حدد الكلمة المفتاحية لفحص مقدمة المقال.',
      category: 'basic',
    })
  } else if (first100Matches.count > 0) {
    checks.push({
      id: 'keyword-in-intro',
      titleAr: 'الكلمة المفتاحية في المقدمة (أول 100 كلمة)',
      status: 'pass',
      score: 7,
      maxScore: 7,
      messageAr: 'الكلمة المفتاحية مذكورة في الفقرة الافتتاحية الأولى للمقال.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'keyword-in-intro',
      titleAr: 'الكلمة المفتاحية في المقدمة (أول 100 كلمة)',
      status: 'fail',
      score: 0,
      maxScore: 7,
      messageAr: 'الكلمة المفتاحية لم تذكر في أول 100 كلمة من المقال.',
      fixTipAr: 'اذكر موضوع المقال والكلمة المفتاحية في السطور الأولى لتأكيد صلة المحتوى لمحركات البحث.',
      category: 'basic',
    })
  }

  // 6. Keyword in a subheading H2/H3 (5 pts)
  const subheadingsText = headingsData.outline.map((h) => h.text).join(' ')
  const subheadingsMatches = normKeyword
    ? findKeywordMatches(subheadingsText, focusKeyword)
    : { count: 0 }
  if (!normKeyword) {
    checks.push({
      id: 'keyword-in-subheading',
      titleAr: 'الكلمة المفتاحية في العناوين الفرعية (H2/H3)',
      status: 'fail',
      score: 0,
      maxScore: 5,
      messageAr: 'حدد الكلمة المفتاحية لفحص العناوين الفرعية.',
      category: 'basic',
    })
  } else if (subheadingsMatches.count > 0) {
    checks.push({
      id: 'keyword-in-subheading',
      titleAr: 'الكلمة المفتاحية في العناوين الفرعية (H2/H3)',
      status: 'pass',
      score: 5,
      maxScore: 5,
      messageAr: 'الكلمة المفتاحية مستخدمة في عنوان فرعي واحد على الأقل.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'keyword-in-subheading',
      titleAr: 'الكلمة المفتاحية في العناوين الفرعية (H2/H3)',
      status: 'fail',
      score: 0,
      maxScore: 5,
      messageAr: 'لا يوجد أي عنوان فرعي (H2 أو H3) يتضمن الكلمة المفتاحية.',
      fixTipAr: 'استخدم الكلمة المفتاحية في عنوان H2 رئيسي لتوضيح أقسام المقال.',
      category: 'basic',
    })
  }

  // 7. Keyword density (6 pts)
  // Pass: 0.5% - 2.5% (6 pts)
  // Warn: < 0.5% or 2.5% - 3.5% (3 pts)
  // Fail: > 3.5% (0 pts - stuffing) or 0 matches
  if (!normKeyword || keywordOccurrences === 0) {
    checks.push({
      id: 'keyword-density',
      titleAr: 'كثافة الكلمة المفتاحية (Keyword Density)',
      status: 'fail',
      score: 0,
      maxScore: 6,
      messageAr: 'الكلمة المفتاحية لم تذكر في محتوى المقال (0%).',
      fixTipAr: 'استخدم الكلمة المفتاحية بمعدل متوازن (من 0.5% إلى 2.5%).',
      category: 'basic',
    })
  } else if (keywordDensity >= 0.5 && keywordDensity <= 2.5) {
    checks.push({
      id: 'keyword-density',
      titleAr: 'كثافة الكلمة المفتاحية (Keyword Density)',
      status: 'pass',
      score: 6,
      maxScore: 6,
      messageAr: `كثافة الكلمة المفتاحية ممتازة وطبيعية: ${keywordDensity}% (${keywordOccurrences} مرات).`,
      category: 'basic',
    })
  } else if (keywordDensity < 0.5) {
    checks.push({
      id: 'keyword-density',
      titleAr: 'كثافة الكلمة المفتاحية (Keyword Density)',
      status: 'warn',
      score: 3,
      maxScore: 6,
      messageAr: `كثافة الكلمة المفتاحية منخفضة نوعاً ما: ${keywordDensity}% (${keywordOccurrences} مرات).`,
      fixTipAr: 'أعد ذكر الكلمة المفتاحية في مواضع مناسبة لرفع الكثافة فوق 0.5%.',
      category: 'basic',
    })
  } else if (keywordDensity <= 3.5) {
    checks.push({
      id: 'keyword-density',
      titleAr: 'كثافة الكلمة المفتاحية (Keyword Density)',
      status: 'warn',
      score: 3,
      maxScore: 6,
      messageAr: `كثافة الكلمة المفتاحية مرتفعة: ${keywordDensity}% (${keywordOccurrences} مرات).`,
      fixTipAr: 'استبدل بعض التكرارات بمرادفات لتجنب عقوبات التكرار المفرط.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'keyword-density',
      titleAr: 'كثافة الكلمة المفتاحية (Keyword Density)',
      status: 'fail',
      score: 0,
      maxScore: 6,
      messageAr: `تنبيه: حشو كلمات مفتاحية ضار (Keyword Stuffing): ${keywordDensity}% (${keywordOccurrences} مرات).`,
      fixTipAr: 'قلل من تكرار الكلمة المفتاحية فوراً حتى لا يعتبرها محرك البحث تلاعباً.',
      category: 'basic',
    })
  }

  // 8. SEO title length (4 pts)
  // Recommended: 30 to 60 chars
  const titleLen = effectiveTitle.length
  if (titleLen >= 30 && titleLen <= 60) {
    checks.push({
      id: 'title-length',
      titleAr: 'طول عنوان المقال',
      status: 'pass',
      score: 4,
      maxScore: 4,
      messageAr: `طول العنوان مثالي لمحركات البحث: ${titleLen} حرفاً (النطاق 30-60).`,
      category: 'basic',
    })
  } else if (titleLen > 0 && titleLen < 30) {
    checks.push({
      id: 'title-length',
      titleAr: 'طول عنوان المقال',
      status: 'warn',
      score: 2,
      maxScore: 4,
      messageAr: `عنوان المقال قصير نسبياً: ${titleLen} حرفاً.`,
      fixTipAr: 'اجعل العنوان أكثر شمولاً وتفصيلاً بين 30 و 60 حرفاً.',
      category: 'basic',
    })
  } else if (titleLen > 60) {
    checks.push({
      id: 'title-length',
      titleAr: 'طول عنوان المقال',
      status: 'warn',
      score: 2,
      maxScore: 4,
      messageAr: `عنوان المقال طويل: ${titleLen} حرفاً (قد يتم اقتطاعه في نتائج بحث جوجل).`,
      fixTipAr: 'اختصر العنوان بحيث لا يتجاوز 60 حرفاً.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'title-length',
      titleAr: 'طول عنوان المقال',
      status: 'fail',
      score: 0,
      maxScore: 4,
      messageAr: 'عنوان المقال فارغ.',
      fixTipAr: 'أدخل عنواناً واضحاً للمقال.',
      category: 'basic',
    })
  }

  // 9. Meta description length (4 pts)
  // Recommended: 120 to 160 chars
  const descLen = effectiveDesc.length
  if (descLen >= 120 && descLen <= 160) {
    checks.push({
      id: 'meta-desc-length',
      titleAr: 'طول الوصف التعريفي (Meta Description)',
      status: 'pass',
      score: 4,
      maxScore: 4,
      messageAr: `طول الوصف التعريفي ممتاز: ${descLen} حرفاً (النطاق 120-160).`,
      category: 'basic',
    })
  } else if ((descLen >= 80 && descLen < 120) || (descLen > 160 && descLen <= 180)) {
    checks.push({
      id: 'meta-desc-length',
      titleAr: 'طول الوصف التعريفي (Meta Description)',
      status: 'warn',
      score: 2,
      maxScore: 4,
      messageAr:
        descLen < 120
          ? `الوصف التعريفي قصير نوعاً ما: ${descLen} حرفاً.`
          : `الوصف التعريفي أطول قليلاً من الموصى به: ${descLen} حرفاً.`,
      fixTipAr: 'اضبط طول الوصف ليكون بين 120 و 160 حرفاً لظهور مثالي.',
      category: 'basic',
    })
  } else {
    checks.push({
      id: 'meta-desc-length',
      titleAr: 'طول الوصف التعريفي (Meta Description)',
      status: 'fail',
      score: 0,
      maxScore: 4,
      messageAr:
        descLen === 0
          ? 'الوصف التعريفي فارغ.'
          : descLen < 80
            ? `الوصف التعريفي قصير جداً: ${descLen} حرفاً.`
            : `الوصف التعريفي طويل جداً: ${descLen} حرفاً وسيتم اقتطاعه بالتأكيد.`,
      fixTipAr: 'اكتب وصفاً جذاباً بين 120 و 160 حرفاً يلخص فائدة المقال.',
      category: 'basic',
    })
  }

  // =========================================================================
  // CATEGORY 2: CONTENT QUALITY (30 Points)
  // =========================================================================

  // 10. Word count (8 pts)
  // Pass >= 800 (8 pts) | Warn 400 - 799 (4 pts) | Fail < 400 (0 pts)
  if (totalWords >= 800) {
    checks.push({
      id: 'word-count',
      titleAr: 'طول المحتوى وعدد الكلمات',
      status: 'pass',
      score: 8,
      maxScore: 8,
      messageAr: `المقال شامل وغني بالمعلومات: ${totalWords} كلمة (الموصى به 800+).`,
      category: 'content',
    })
  } else if (totalWords >= 400) {
    checks.push({
      id: 'word-count',
      titleAr: 'طول المحتوى وعدد الكلمات',
      status: 'warn',
      score: 4,
      maxScore: 8,
      messageAr: `المقال متوسط الطول: ${totalWords} كلمة.`,
      fixTipAr: 'أضف المزيد من الشروحات أو دراسات الحالة ليتجاوز 800 كلمة للمنافسة بقوة.',
      category: 'content',
    })
  } else {
    checks.push({
      id: 'word-count',
      titleAr: 'طول المحتوى وعدد الكلمات',
      status: 'fail',
      score: 0,
      maxScore: 8,
      messageAr: `محتوى ضعيف وقصير جداً (Thin Content): ${totalWords} كلمة فقط.`,
      fixTipAr: 'المقالات التي تقل عن 400 كلمة نادراً ما تتصدر نتائج البحث. قم بتوسيع المحتوى.',
      category: 'content',
    })
  }

  // 11. Heading structure (6 pts)
  // Pass >= 2 H2, no skipped levels (6 pts) | Warn 1 H2 (3 pts) | Fail 0 H2 (0 pts)
  if (headingsData.counts.h2 >= 2 && !headingsData.hasSkippedLevels) {
    checks.push({
      id: 'heading-structure',
      titleAr: 'تسلسل وهيكلية العناوين (H2/H3)',
      status: 'pass',
      score: 6,
      maxScore: 6,
      messageAr: `هيكل العناوين متناسق ومنظم: ${headingsData.counts.h2} عناوين H2 و ${headingsData.counts.h3} عناوين H3.`,
      category: 'content',
    })
  } else if (headingsData.counts.h2 === 1 || headingsData.hasSkippedLevels) {
    checks.push({
      id: 'heading-structure',
      titleAr: 'تسلسل وهيكلية العناوين (H2/H3)',
      status: 'warn',
      score: 3,
      maxScore: 6,
      messageAr: headingsData.hasSkippedLevels
        ? 'تم تخطي أحد مستويات العناوين (مثلاً استخدام H4 دون H3).'
        : `يوجد عنوان H2 رئيسي واحد فقط (${headingsData.counts.h2}).`,
      fixTipAr: 'قسّم المقال إلى قسمين رئيسيين على الأقل بعنوانين H2 مع تدرج سليم للمستويات.',
      category: 'content',
    })
  } else {
    checks.push({
      id: 'heading-structure',
      titleAr: 'تسلسل وهيكلية العناوين (H2/H3)',
      status: 'fail',
      score: 0,
      maxScore: 6,
      messageAr: 'المقال يخلو من العناوين الفرعية (H2).',
      fixTipAr: 'استخدم العناوين الفرعية H2 لتقسيم المقال لتسهيل قراءته على الزائر.',
      category: 'content',
    })
  }

  // 12. Paragraph length (3 pts)
  // Pass: no paragraph > 150 words (3 pts) | Warn: 1-2 (1 pt) | Fail: > 2 (0 pts)
  if (paragraphAnalysis.paragraphsOver150Words === 0) {
    checks.push({
      id: 'paragraph-length',
      titleAr: 'طول الفقرات وسهولة القراءة',
      status: 'pass',
      score: 3,
      maxScore: 3,
      messageAr: `طول الفقرات مريح للقراءة (أطول فقرة: ${paragraphAnalysis.maxParagraphWords} كلمة).`,
      category: 'content',
    })
  } else if (paragraphAnalysis.paragraphsOver150Words <= 2) {
    checks.push({
      id: 'paragraph-length',
      titleAr: 'طول الفقرات وسهولة القراءة',
      status: 'warn',
      score: 1,
      maxScore: 3,
      messageAr: `يوجد ${paragraphAnalysis.paragraphsOver150Words} فقرة يتجاوز طولها 150 كلمة.`,
      fixTipAr: 'قسّم الفقرات الطويلة إلى فقرات أقصر لا تتجاوز 4-5 أسطر لتحسين تجربة المستخدم على الجوال.',
      category: 'content',
    })
  } else {
    checks.push({
      id: 'paragraph-length',
      titleAr: 'طول الفقرات وسهولة القراءة',
      status: 'fail',
      score: 0,
      maxScore: 3,
      messageAr: `يوجد ${paragraphAnalysis.paragraphsOver150Words} فقرات طويلة جداً تفوق 150 كلمة.`,
      fixTipAr: 'أعد صياغة المقال في فقرات قصيرة ومريحة للعين.',
      category: 'content',
    })
  }

  // 13. Sentence length (3 pts)
  // Pass: avg <= 25 words AND <= 25% long sentences (3 pts)
  // Warn: avg <= 32 OR <= 40% long (1 pt)
  // Fail: avg > 32 OR > 40% long (0 pts)
  if (sentenceAnalysis.avgSentenceWords <= 25 && sentenceAnalysis.longSentencePercent <= 25) {
    checks.push({
      id: 'sentence-length',
      titleAr: 'طول الجمل وانسيابية التعبير',
      status: 'pass',
      score: 3,
      maxScore: 3,
      messageAr: `الجمل واضحة ومباشرة (متوسط: ${sentenceAnalysis.avgSentenceWords} كلمة/جملة).`,
      category: 'content',
    })
  } else if (sentenceAnalysis.avgSentenceWords <= 32 || sentenceAnalysis.longSentencePercent <= 40) {
    checks.push({
      id: 'sentence-length',
      titleAr: 'طول الجمل وانسيابية التعبير',
      status: 'warn',
      score: 1,
      maxScore: 3,
      messageAr: `نسبة الجمل الطويلة مرتفعة (${sentenceAnalysis.longSentencePercent}% من الجمل تفوق 30 كلمة).`,
      fixTipAr: 'استخدم علامات الترقيم (، .) لتقسيم الجمل المركبة الطويلة.',
      category: 'content',
    })
  } else {
    checks.push({
      id: 'sentence-length',
      titleAr: 'طول الجمل وانسيابية التعبير',
      status: 'fail',
      score: 0,
      maxScore: 3,
      messageAr: `صياغة الجمل معقدة وطويلة (متوسط: ${sentenceAnalysis.avgSentenceWords} كلمة/جملة).`,
      fixTipAr: 'قسّم الجمل الطويلة واعتمد صيغة المبني للمعلوم المباشرة.',
      category: 'content',
    })
  }

  // 14. Featured image set & alt contains keyword (4 pts)
  const hasFeaturedImage = Boolean(input.featuredImageId)
  const featuredAlt = (input.featuredImageAlt || '').trim()
  const featuredAltMatches = normKeyword && featuredAlt ? findKeywordMatches(featuredAlt, focusKeyword) : { count: 0 }

  if (hasFeaturedImage && featuredAltMatches.count > 0) {
    checks.push({
      id: 'featured-image-alt',
      titleAr: 'الصورة البارزة والنص البديل (Alt)',
      status: 'pass',
      score: 4,
      maxScore: 4,
      messageAr: 'تم تعيين الصورة البارزة والنص البديل يتضمن الكلمة المفتاحية.',
      category: 'content',
    })
  } else if (hasFeaturedImage && featuredAlt.length > 0) {
    checks.push({
      id: 'featured-image-alt',
      titleAr: 'الصورة البارزة والنص البديل (Alt)',
      status: 'warn',
      score: 2,
      maxScore: 4,
      messageAr: 'الصورة البارزة موجودة ولها نص بديل، لكنها لا تحتوي على الكلمة المفتاحية.',
      fixTipAr: 'أضف الكلمة المفتاحية بشكل وصفي في النص البديل للصورة البارزة.',
      category: 'content',
    })
  } else if (hasFeaturedImage) {
    checks.push({
      id: 'featured-image-alt',
      titleAr: 'الصورة البارزة والنص البديل (Alt)',
      status: 'warn',
      score: 2,
      maxScore: 4,
      messageAr: 'الصورة البارزة معينة لكن النص البديل (Alt) فارغ.',
      fixTipAr: 'أدخل نصاً بديلاً دقيقاً للصورة البارزة لتمكين الفهرسة ومساعدة ذوي الاحتياجات الخاصة.',
      category: 'content',
    })
  } else {
    checks.push({
      id: 'featured-image-alt',
      titleAr: 'الصورة البارزة والنص البديل (Alt)',
      status: 'fail',
      score: 0,
      maxScore: 4,
      messageAr: 'لم يتم تعيين صورة بارزة للمقال.',
      fixTipAr: 'اختر صورة رئيسية عالية الجودة للمقال من مكتبة الوسائط.',
      category: 'content',
    })
  }

  // 15. All inline images have alt (3 pts)
  if (imagesData.total === 0) {
    // If no inline images, award full points (not mandatory to have inline images)
    checks.push({
      id: 'inline-images-alt',
      titleAr: 'النصوص البديلة لصور المحتوى',
      status: 'pass',
      score: 3,
      maxScore: 3,
      messageAr: 'لا توجد صور داخلية تفتقر لنص بديل.',
      category: 'content',
    })
  } else if (imagesData.missingAlt === 0) {
    checks.push({
      id: 'inline-images-alt',
      titleAr: 'النصوص البديلة لصور المحتوى',
      status: 'pass',
      score: 3,
      maxScore: 3,
      messageAr: `جميع صور المحتوى (${imagesData.total}) تحتوي على نصوص بديلة (Alt).`,
      category: 'content',
    })
  } else if (imagesData.withAlt > 0) {
    checks.push({
      id: 'inline-images-alt',
      titleAr: 'النصوص البديلة لصور المحتوى',
      status: 'warn',
      score: 1,
      maxScore: 3,
      messageAr: `يوجد ${imagesData.missingAlt} صور من أصل ${imagesData.total} بدون نص بديل.`,
      fixTipAr: 'انقر على كل صورة داخل المحرر وأضف نصاً بديلاً يصف محتواها بدقة.',
      category: 'content',
    })
  } else {
    checks.push({
      id: 'inline-images-alt',
      titleAr: 'النصوص البديلة لصور المحتوى',
      status: 'fail',
      score: 0,
      maxScore: 3,
      messageAr: `جميع الصور الداخلية (${imagesData.total}) تفتقر للنص البديل (Alt).`,
      fixTipAr: 'أضف نصوصاً بديلة لكافة الصور لتفادي خسارة تقييم السيو وإمكانية الوصول.',
      category: 'content',
    })
  }

  // 16. Internal links (3 pts)
  // Pass: >= 2 (3 pts) | Warn: 1 (1 pt) | Fail: 0 (0 pts)
  if (linksData.internalCount >= 2) {
    checks.push({
      id: 'internal-links',
      titleAr: 'الروابط الداخلية (Internal Links)',
      status: 'pass',
      score: 3,
      maxScore: 3,
      messageAr: `تم تضمين ${linksData.internalCount} روابط داخلية لصفحات وخدمات الموقع.`,
      category: 'content',
    })
  } else if (linksData.internalCount === 1) {
    checks.push({
      id: 'internal-links',
      titleAr: 'الروابط الداخلية (Internal Links)',
      status: 'warn',
      score: 1,
      maxScore: 3,
      messageAr: 'تم تضمين رابط داخلي واحد فقط.',
      fixTipAr: 'أضف رابطاً داخلياً ثانياً على الأقل يشير إلى إحدى خدمات المصاعد أو المشاريع السابقة ذات الصلة.',
      category: 'content',
    })
  } else {
    checks.push({
      id: 'internal-links',
      titleAr: 'الروابط الداخلية (Internal Links)',
      status: 'fail',
      score: 0,
      maxScore: 3,
      messageAr: 'المقال لا يحتوي على أي روابط داخلية لأقسام الموقع.',
      fixTipAr: 'اربط المقال بصفحات خدماتنا ذات الصلة (مثل صيانة المصاعد، قطع الغيار، المشاريع).',
      category: 'content',
    })
  }

  // =========================================================================
  // CATEGORY 3: TECHNICAL & SOCIAL (20 Points)
  // =========================================================================

  // 17. External links (4 pts)
  // Pass: >= 1 (4 pts) | Fail: 0 (0 pts)
  if (linksData.externalCount >= 1) {
    checks.push({
      id: 'external-links',
      titleAr: 'الروابط الخارجية والمصادر الموثوقة',
      status: 'pass',
      score: 4,
      maxScore: 4,
      messageAr: `المقال يشير إلى ${linksData.externalCount} مصادر وروابط خارجية موثوقة.`,
      category: 'technical',
    })
  } else {
    checks.push({
      id: 'external-links',
      titleAr: 'الروابط الخارجية والمصادر الموثوقة',
      status: 'fail',
      score: 0,
      maxScore: 4,
      messageAr: 'لا توجد روابط خارجية لمصادر أو مراجع رسمية.',
      fixTipAr: 'أضف رابطاً خارجياً لجهة موثوقة (مثل كود البناء السعودي، مواصفات السلامة EN-81، أو هيئة المواصفات).',
      category: 'technical',
    })
  }

  // 18. Slug quality (3 pts)
  // <= 75 chars, lowercase letters/digits/hyphens only
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  const isSlugFormatValid = slugRegex.test(slug)
  const isSlugLengthValid = slug.length > 0 && slug.length <= 75

  if (isSlugFormatValid && isSlugLengthValid) {
    checks.push({
      id: 'slug-quality',
      titleAr: 'جودة الرابط اللطيف (Slug Quality)',
      status: 'pass',
      score: 3,
      maxScore: 3,
      messageAr: `الرابط نظيف ومطابق للمعايير القياسية (${slug.length} حرفاً).`,
      category: 'technical',
    })
  } else if (!isSlugLengthValid && isSlugFormatValid) {
    checks.push({
      id: 'slug-quality',
      titleAr: 'جودة الرابط اللطيف (Slug Quality)',
      status: 'warn',
      score: 1,
      maxScore: 3,
      messageAr: `الرابط أطول من الموصى به: ${slug.length} حرفاً (الحد الأقصى 75).`,
      fixTipAr: 'اختصر الرابط اللطيف واكتفِ بالكلمات الأساسية.',
      category: 'technical',
    })
  } else {
    checks.push({
      id: 'slug-quality',
      titleAr: 'جودة الرابط اللطيف (Slug Quality)',
      status: 'fail',
      score: 0,
      maxScore: 3,
      messageAr: 'صيغة الرابط غير صحيحة أو يحتوي على حروف غير مدعومة.',
      fixTipAr: 'استخدم فقط الحروف الإنجليزية الصغيرة، الأرقام، والشرطات (-).',
      category: 'technical',
    })
  }

  // 19. Canonical URL (2 pts)
  // Pass: empty OR valid absolute URL on domain
  const canonical = (input.canonicalUrl || '').trim()
  const isCanonicalValid =
    canonical.length === 0 ||
    /^https:\/\/(www\.)?almubtakirah\.com(\/.*)?$/i.test(canonical)

  if (isCanonicalValid) {
    checks.push({
      id: 'canonical-url',
      titleAr: 'الرابط الأساسي المعتمد (Canonical URL)',
      status: 'pass',
      score: 2,
      maxScore: 2,
      messageAr: canonical
        ? 'تم ضبط الرابط الأساسي المعتمد بشكل صحيح.'
        : 'الرابط الأساسي يتبع الرابط الافتراضي للمقال تلقائياً.',
      category: 'technical',
    })
  } else {
    checks.push({
      id: 'canonical-url',
      titleAr: 'الرابط الأساسي المعتمد (Canonical URL)',
      status: 'fail',
      score: 0,
      maxScore: 2,
      messageAr: 'صيغة الرابط الأساسي (Canonical) غير صحيحة.',
      fixTipAr: 'اترك الحقل فارغاً، أو أدخل رابطاً مطلقاً يبدأ بـ https://almubtakirah.com.',
      category: 'technical',
    })
  }

  // 20. Indexable (4 pts)
  // Pass: robotsNoindex !== true
  if (!input.robotsNoindex) {
    checks.push({
      id: 'robots-indexable',
      titleAr: 'قابلية الفهرسة (Indexability)',
      status: 'pass',
      score: 4,
      maxScore: 4,
      messageAr: 'المقال متاح لفهرسة محركات البحث (index, follow).',
      category: 'technical',
    })
  } else {
    checks.push({
      id: 'robots-indexable',
      titleAr: 'قابلية الفهرسة (Indexability)',
      status: 'fail',
      score: 0,
      maxScore: 4,
      messageAr: 'تنبيه: تم تفعيل خيار منع الفهرسة (noindex). لن يظهر هذا المقال في جوجل.',
      fixTipAr: 'عطّل مفتاح noindex إذا كنت ترغب في أن يتصدر المقال نتائج البحث.',
      category: 'technical',
    })
  }

  // 21. OG Image present (4 pts)
  // Pass: ogImageId or featuredImageId present
  const hasOgImage = Boolean(input.ogImageId || input.featuredImageId)
  if (hasOgImage) {
    checks.push({
      id: 'og-image-present',
      titleAr: 'صورة المشاركة الاجتماعية (Open Graph)',
      status: 'pass',
      score: 4,
      maxScore: 4,
      messageAr: 'صورة المشاركة الاجتماعية معينة بنجاح لشبكات التواصل.',
      category: 'technical',
    })
  } else {
    checks.push({
      id: 'og-image-present',
      titleAr: 'صورة المشاركة الاجتماعية (Open Graph)',
      status: 'fail',
      score: 0,
      maxScore: 4,
      messageAr: 'لم يتم تعيين صورة لبطاقات المشاركة على فيسبوك وتويتر.',
      fixTipAr: 'اختر صورة بارزة للمقال أو حدد صورة OG مخصصة بأبعاد 1200×630.',
      category: 'technical',
    })
  }

  // 22. FAQ present (3 pts)
  // Pass: >= 2 (3 pts) | Warn: 1 (1 pt) | Fail: 0 (0 pts)
  if (faqCount >= 2) {
    checks.push({
      id: 'faq-schema-present',
      titleAr: 'الأسئلة الشائعة (FAQ Rich Results)',
      status: 'pass',
      score: 3,
      maxScore: 3,
      messageAr: `المقال يتضمن ${faqCount} أسئلة شائعة مؤهلة لنتائج جوجل المنسقة (FAQPage).`,
      category: 'technical',
    })
  } else if (faqCount === 1) {
    checks.push({
      id: 'faq-schema-present',
      titleAr: 'الأسئلة الشائعة (FAQ Rich Results)',
      status: 'warn',
      score: 1,
      maxScore: 3,
      messageAr: 'يوجد سؤال شائع واحد فقط.',
      fixTipAr: 'أضف سؤالاً ثانياً لتفعيل ميزة نتائج الأسئلة الشائعة في جوجل.',
      category: 'technical',
    })
  } else {
    checks.push({
      id: 'faq-schema-present',
      titleAr: 'الأسئلة الشائعة (FAQ Rich Results)',
      status: 'fail',
      score: 0,
      maxScore: 3,
      messageAr: 'لا توجد أسئلة شائعة داخل المقال.',
      fixTipAr: 'أدرج بلوك أسئلة شائعة (FAQ) من شريط أدوات المحرر لتعزيز الظهور في Google Rich Snippets.',
      category: 'technical',
    })
  }

  // Total Score Calculation (0 - 100)
  const totalScore = Math.min(
    100,
    Math.max(
      0,
      checks.reduce((acc, curr) => acc + curr.score, 0),
    ),
  )

  const grade = totalScore >= 80 ? 'good' : totalScore >= 50 ? 'average' : 'poor'

  const groupedChecks = {
    basic: checks.filter((c) => c.category === 'basic'),
    content: checks.filter((c) => c.category === 'content'),
    technical: checks.filter((c) => c.category === 'technical'),
  }

  const metrics: SeoMetrics = {
    wordCount: totalWords,
    readingTimeMin,
    keywordOccurrences,
    keywordDensity,
    sentenceCount: sentenceAnalysis.sentenceCount,
    avgSentenceWords: sentenceAnalysis.avgSentenceWords,
    longSentencePercent: sentenceAnalysis.longSentencePercent,
    paragraphsCount: paragraphAnalysis.paragraphCount,
    maxParagraphWords: paragraphAnalysis.maxParagraphWords,
    paragraphsOver150Words: paragraphAnalysis.paragraphsOver150Words,
    headingsCount: headingsData.counts,
    headingsOutline: headingsData.outline,
    links: {
      internalCount: linksData.internalCount,
      externalCount: linksData.externalCount,
      linksList: linksData.linksList,
    },
    images: {
      total: imagesData.total,
      withAlt: imagesData.withAlt,
      missingAlt: imagesData.missingAlt,
    },
    faqCount,
  }

  return {
    score: totalScore,
    grade,
    checks,
    groupedChecks,
    metrics,
  }
}

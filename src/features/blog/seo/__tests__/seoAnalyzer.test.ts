import { describe, it, expect } from 'vitest'
import {
  normalizeArabic,
  extractPlainText,
  countWords,
  calculateKeywordDensity,
  findKeywordMatches,
  analyzeSentences,
  analyzeParagraphs,
} from '../arabicUtils'
import { analyzePostSeo } from '../seoAnalyzer'
import type { SeoAnalyzerInput } from '../types'

describe('Arabic SEO Text Handling & Normalization', () => {
  it('removes tashkeel (diacritics) correctly', () => {
    const inputWithTashkeel = 'صِيَانَةُ الْمَصَاعِدِ الْكَهْرَبَائِيَّةِ فِي جِدَّةَ'
    const normalized = normalizeArabic(inputWithTashkeel)
    expect(normalized).toBe('صيانه المصاعد الكهربائيه في جده')
  })

  it('removes tatweel (kashida)', () => {
    const inputWithTatweel = 'صـــــيـــــانـــــة الـــــمـــــصـــــاعـــــد'
    const normalized = normalizeArabic(inputWithTatweel)
    expect(normalized).toBe('صيانه المصاعد')
  })

  it('unifies Alef variants (أ إ آ ٱ -> ا)', () => {
    const alefVariants = 'أحمد إبراهيم آلات ٱستثمار'
    const normalized = normalizeArabic(alefVariants)
    expect(normalized).toBe('احمد ابراهيم الات استثمار')
  })

  it('unifies Yaa and Alif Maqsura (ى -> ي)', () => {
    const yaaVariants = 'مستشفى كبرى علي هدى'
    const normalized = normalizeArabic(yaaVariants)
    expect(normalized).toBe('مستشفي كبري علي هدي')
  })

  it('unifies Taa Marbuta (ة -> ه) for flexible keyword matching', () => {
    const taaMarbuta = 'شركة المساعد المبتكرة للتجارة'
    const normalized = normalizeArabic(taaMarbuta)
    expect(normalized).toBe('شركه المساعد المبتكره للتجاره')
  })

  it('converts Arabic-Indic digits to Latin digits', () => {
    const arabicDigits = 'عام ٢٠٢٥ للميلاد هاتف ٠١٢٦٠٠٠٠٠٠'
    const normalized = normalizeArabic(arabicDigits)
    expect(normalized).toBe('عام 2025 للميلاد هاتف 0126000000')
  })

  it('extracts plain text and counts words accurately from HTML content', () => {
    const htmlSnippet = '<p>شركة <strong>المساعد المبتكرة</strong> للمصاعد في جدة</p>'
    const plain = extractPlainText(htmlSnippet)
    expect(plain).toBe('شركة المساعد المبتكرة للمصاعد في جدة')
    expect(countWords(htmlSnippet)).toBe(6)
  })

  it('handles multi-word Arabic keyword matching with attached prefixes (و، ف، ب، ل، ك، ال)', () => {
    const text = `
      نحن متخصصون في صيانة المصاعد في جدة بأحدث التقنيات.
      كما نقدم عقوداً مميزة لصيانة المصاعد في مدينة مكة.
      وتعتبر خدماتنا بالصيانة للمصاعد من الأكثر اعتمادية في المملكة.
      شركة المبتكرة لصيانة المصاعد في جدة تضمن لك الأمان الدائم.
    `
    const keyword = 'صيانة المصاعد'
    const result = findKeywordMatches(text, keyword)

    // Should match:
    // 1. "صيانة المصاعد"
    // 2. "لصيانة المصاعد"
    // 3. "بالصيانة للمصاعد"
    // 4. "لصيانة المصاعد"
    expect(result.count).toBeGreaterThanOrEqual(3)
  })

  it('calculates keyword density accurately', () => {
    // 4 occurrences of a 2-word keyword in a 200-word text = (4 * 2) / 200 * 100 = 4%
    const density = calculateKeywordDensity(4, 2, 200)
    expect(density).toBe(4)
  })

  it('analyzes Arabic sentence lengths with Arabic punctuation (. ! ? ؟ ۔ …)', () => {
    const sampleText =
      'تعتبر صيانة المصاعد من أهم عناصر السلامة في المباني الحديثة. هل قمت بفحص مصعدك مؤخراً؟ نعم بالتأكيد! نحن نوفر فحصاً دورياً شاملاً لجميع المكونات الميكانيكية والكهربائية… اتصل بنا اليوم للحصول على استشارة مجانية.'
    const analysis = analyzeSentences(sampleText)
    expect(analysis.sentenceCount).toBeGreaterThanOrEqual(4)
    expect(analysis.avgSentenceWords).toBeGreaterThan(0)
    expect(analysis.longSentencePercent).toBe(0)
  })

  it('analyzes paragraph lengths and flags paragraphs exceeding 150 words', () => {
    const shortP = '<p>فقرة قصيرة تضم بضع كلمات فقط للتحليل والمراجعة.</p>'
    const longWords = Array.from({ length: 160 }, (_, i) => `كلمة${i}`).join(' ')
    const longP = `<p>${longWords}</p>`
    const html = `${shortP}${longP}`

    const analysis = analyzeParagraphs(html)
    expect(analysis.paragraphCount).toBe(2)
    expect(analysis.paragraphsOver150Words).toBe(1)
  })
})

describe('SEO Analyzer Engine: Comprehensive Check Scoring', () => {
  it('Sample 1: Well-optimized article reaches score >= 80 (Grade: good)', () => {
    const repeatParagraph = (text: string, count: number) =>
      Array.from({ length: count }, () => `<p>${text}</p>`).join('\n')

    const bodyContent = `
      <p>
        تعتبر خدمات <strong>صيانة المصاعد في جدة</strong> ركيزة أساسية لضمان سلامة السكان والمستخدمين في الأبراج السكنية والمراكز التجارية.
        توفر شركة المساعد المبتكرة منظومة متكاملة من الحلول الهندسية التي تلبي أعلى المعايير العالمية وتواكب كود البناء السعودي بدقة واحترافية.
      </p>

      <h2>أهمية عقود صيانة المصاعد في جدة للمباني السكنية</h2>
      <p>
        تتطلب الأجواء الساحلية في مدينة جدة عناية فائقة بالمكونات الميكانيكية للمصاعد لمنع تآكل الحبال الفولاذية والسكك الحديدية بسبب الرطوبة المرتفعة.
        إن الالتزام بجدول الصيانة الدورية الشهرية يقلل من احتمالية الأعطال المفاجئة بنسبة تصل إلى 90%.
      </p>

      <figure>
        <img src="/media/elevator-inspection.webp" alt="فريق عمل صيانة المصاعد في جدة يفحص لوحة التحكم" />
        <figcaption>فحص لوحة التحكم الإلكترونية والمحرك</figcaption>
      </figure>

      <h2>معايير اختيار أفضل شركة صيانة مصاعد في جدة</h2>
      <p>
        عند البحث عن شركة متخصصة، يجب التأكد من توفر فرق طوارئ جاهزة على مدار الساعة، بالإضافة إلى توفير قطع غيار أصلية من كبرى الشركات العالمية مثل ميتسوبيشي وأوتيس وشندلر.
        يمكنك الاطلاع على تفاصيل <a href="/services/maintenance">خدمات الصيانة الدورية للمصاعد</a> الخاصة بنا للمزيد من المعلومات الفنية.
      </p>

      <p>
        كما نوصي بزيارة <a href="/services/modernization">تحديث وتطوير المصاعد القديمة</a> للاطلاع على باقات الترقية الذكية المتاحة لكافة أنواع المصاعد في المملكة العربية السعودية.
      </p>

      <p>
        وفقاً لإرشادات السلامة الصادرة عن <a href="https://www.saso.gov.sa" rel="noopener noreferrer">الهيئة السعودية للمواصفات والمقاييس SASO</a>، فإن الفحص الدوري لأجهزة الفرامل ومنظم السرعة إلزامي لكافة المنشآت.
      </p>

      <h3>خطوات الفحص الشهري الشامل</h3>
      ${repeatParagraph(
        'تشمل خطة الصيانة تفقد كبينة المصعد وفحص الأبواب الأوتوماتيكية وتشحيم مسارات الحركة والتأكد من عمل أجهزة الإنذار وبطاريات الطوارئ بكفاءة تامة دون أي تأخير.',
        12,
      )}

      <figure>
        <img src="/media/motor-room.webp" alt="محرك المصعد وغرفة التحكم في أحد أبراج جدة" />
        <figcaption>صيانة المحرك الإيطالي في غرفة المصعد العلوية</figcaption>
      </figure>

      <div class="faq-block">
        <div data-faq-question>ما هي تكلفة صيانة المصاعد في جدة سنوياً؟</div>
        <div data-faq-answer>تتراوح تكلفة العقد السكني العادي بين 2500 إلى 4500 ريال سنوياً حسب عدد الوقفات ونوع المصعد.</div>
      </div>
      <div class="faq-block">
        <div data-faq-question>كم مرة يجب إجراء صيانة المصعد دورياً؟</div>
        <div data-faq-answer>يجب إجراء الصيانة الوقائية مرة واحدة شهرياً على الأقل لضمان سلامة الركاب واستمرارية عمل الأجهزة.</div>
      </div>
    `

    const wellOptimizedInput: SeoAnalyzerInput = {
      title: 'دليل صيانة المصاعد في جدة: الأنواع والتكاليف ومعايير السلامة',
      slug: 'elevator-maintenance-guide-jeddah',
      seoTitle: 'صيانة المصاعد في جدة: دليل شامل للتكاليف والشركات المعتمدة',
      seoDescription:
        'دليلك الشامل لخدمات صيانة المصاعد في جدة من شركة المساعد المبتكرة. تعرف على عقود الصيانة الدورية وقطع الغيار الأصلية وأسعار الصيانة المعتمدة.',
      focusKeyword: 'صيانة المصاعد في جدة',
      secondaryKeywords: ['صيانة مصاعد', 'عقود صيانة', 'قطع غيار مصاعد'],
      excerpt:
        'دليل شامل ومفصل حول أفضل ممارسات صيانة المصاعد في مدينة جدة وتكاليف العقود الشهرية والسنوية.',
      featuredImageId: 'b78a9451-0000-4000-8000-000000000001',
      featuredImageAlt: 'مهندس يفحص كابينة المصعد ضمن خدمات صيانة المصاعد في جدة',
      contentHtml: bodyContent,
      canonicalUrl: 'https://almubtakirah.com/ar/blog/elevator-maintenance-guide-jeddah',
      robotsNoindex: false,
      robotsNofollow: false,
      ogImageId: 'b78a9451-0000-4000-8000-000000000001',
      faq: [
        {
          q: 'ما هي تكلفة صيانة المصاعد في جدة سنوياً؟',
          a: 'تتراوح تكلفة العقد السكني العادي بين 2500 إلى 4500 ريال سنوياً.',
        },
        {
          q: 'كم مرة يجب إجراء صيانة المصعد دورياً؟',
          a: 'يجب إجراء الصيانة الوقائية مرة واحدة شهرياً على الأقل.',
        },
      ],
      siteDomain: 'almubtakirah.com',
    }

    const output = analyzePostSeo(wellOptimizedInput)

    // Verify key metrics
    expect(output.metrics.wordCount).toBeGreaterThanOrEqual(400)
    expect(output.metrics.headingsCount.h2).toBeGreaterThanOrEqual(2)
    expect(output.metrics.links.internalCount).toBeGreaterThanOrEqual(2)
    expect(output.metrics.links.externalCount).toBeGreaterThanOrEqual(1)
    expect(output.metrics.images.total).toBeGreaterThanOrEqual(2)
    expect(output.metrics.images.missingAlt).toBe(0)
    expect(output.metrics.faqCount).toBe(2)

    // Score assertion: must reach >= 80 and grade 'good'
    expect(output.score).toBeGreaterThanOrEqual(80)
    expect(output.grade).toBe('good')
  })

  it('Sample 2: Thin article scores < 50 (Grade: poor)', () => {
    const thinArticleInput: SeoAnalyzerInput = {
      title: 'خبر',
      slug: 'news',
      seoTitle: '',
      seoDescription: '',
      focusKeyword: '',
      secondaryKeywords: [],
      excerpt: '',
      featuredImageId: null,
      featuredImageAlt: null,
      contentHtml: '<p>مرحبا بكم في موقعنا الإلكتروني.</p>',
      canonicalUrl: '',
      robotsNoindex: false,
      robotsNofollow: false,
      ogImageId: null,
      faq: [],
      siteDomain: 'almubtakirah.com',
    }

    const output = analyzePostSeo(thinArticleInput)

    // Score assertion: must be < 50 and grade 'poor'
    expect(output.score).toBeLessThan(50)
    expect(output.grade).toBe('poor')

    // Expect multiple critical fails
    const failChecks = output.checks.filter((c) => c.status === 'fail')
    expect(failChecks.length).toBeGreaterThan(5)
  })

  it('Checks noindex penalty (Technical check 20 fails with 0 pts)', () => {
    const inputWithNoindex: SeoAnalyzerInput = {
      title: 'مقال تجريبي غير مفهرس',
      slug: 'test-noindex',
      contentHtml: '<p>محتوى تجريبي</p>',
      robotsNoindex: true,
      siteDomain: 'almubtakirah.com',
    }

    const output = analyzePostSeo(inputWithNoindex)
    const check20 = output.checks.find((c) => c.id === 'robots-indexable')
    expect(check20).toBeDefined()
    expect(check20?.status).toBe('fail')
    expect(check20?.score).toBe(0)
  })

  it('Detects missing alt text in content images', () => {
    const inputWithMissingAlt: SeoAnalyzerInput = {
      title: 'مقال بصور بدون نص بديل',
      slug: 'post-with-missing-alts',
      contentHtml: `
        <p>محتوى</p>
        <img src="/img1.jpg" />
        <img src="/img2.jpg" alt="" />
      `,
      siteDomain: 'almubtakirah.com',
    }

    const output = analyzePostSeo(inputWithMissingAlt)
    const check15 = output.checks.find((c) => c.id === 'inline-images-alt')
    expect(check15).toBeDefined()
    expect(check15?.status).toBe('fail')
    expect(output.metrics.images.missingAlt).toBe(2)
  })
})

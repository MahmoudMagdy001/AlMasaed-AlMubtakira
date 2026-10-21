import { describe, it, expect } from 'vitest'
import { cleanJsonLd } from '@/components/seo'
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getFaqSchema,
  getBlogPostingSchema,
  getCollectionPageSchema,
  getWorkSchema,
  getBreadcrumbsSchema,
} from '@/components/seo/schema'

describe('Phase 11 Technical SEO Suite', () => {
  it('cleanJsonLd strips null, undefined, empty string, empty objects and arrays', () => {
    const dirtySchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'شركة المصاعد المبتكرة',
      telephone: null,
      emptyString: '',
      emptyList: [],
      emptyObj: { a: null, b: '' },
      nested: {
        valid: 'value',
        empty: null,
      },
    }
    const cleaned = cleanJsonLd(dirtySchema) as Record<string, unknown>
    expect(cleaned.name).toBe('شركة المصاعد المبتكرة')
    expect(cleaned.telephone).toBeUndefined()
    expect(cleaned.emptyString).toBeUndefined()
    expect(cleaned.emptyList).toBeUndefined()
    expect(cleaned.emptyObj).toBeUndefined()
    expect((cleaned.nested as Record<string, unknown>).valid).toBe('value')
    expect((cleaned.nested as Record<string, unknown>).empty).toBeUndefined()
  })

  it('generates valid Organization and WebSite schema', () => {
    const org = cleanJsonLd(getOrganizationSchema()) as Record<string, unknown>
    expect(org['@type']).toBe('Organization')
    expect(org.url).toBe('https://almubtakirah.com')
    expect(org.name).toBe('شركة المصاعد المبتكرة')

    const site = cleanJsonLd(getWebSiteSchema('ar')) as Record<string, unknown>
    expect(site['@type']).toBe('WebSite')
    expect(site.url).toBe('https://almubtakirah.com')
  })

  it('generates valid LocalBusiness schema with Jeddah locality and CR number', () => {
    const localBiz = cleanJsonLd(getLocalBusinessSchema('ar')) as Record<string, unknown>
    expect(localBiz['@type']).toBe('HomeAndConstructionBusiness')
    expect((localBiz.address as Record<string, unknown>)?.addressLocality).toBe('Jeddah')
    expect(localBiz.identifier).toBe('4030227058')
  })

  it('generates valid Service and FAQPage schema', () => {
    const service = cleanJsonLd(
      getServiceSchema(
        'صيانة المصاعد',
        'وصف الخدمة الشامل',
        'https://almubtakirah.com/services/elevator-maintenance',
      ),
    ) as Record<string, unknown>
    expect(service['@type']).toBe('Service')
    expect((service.areaServed as Record<string, unknown>)?.name).toBe('Jeddah')

    const faq = cleanJsonLd(
      getFaqSchema([
        { q: 'كم تكلفة الصيانة؟', a: 'تعتمد التكلفة على نوع المصعد وعدد الوقفات.' },
      ]),
    ) as Record<string, unknown>
    expect(faq['@type']).toBe('FAQPage')
    expect(Array.isArray(faq.mainEntity)).toBe(true)
    expect((faq.mainEntity as unknown[]).length).toBe(1)
  })

  it('generates valid BlogPosting schema with ar-SA / en language signals', () => {
    const postAr = cleanJsonLd(
      getBlogPostingSchema({
        title: 'دليل صيانة المصاعد في جدة',
        description: 'دليل شامل حول أفضل ممارسات صيانة المصاعد.',
        url: 'https://almubtakirah.com/blog/elevator-maintenance-guide',
        imageUrl: 'https://almubtakirah.com/images/cover.jpg',
        datePublished: '2026-10-20T10:00:00Z',
        dateModified: '2026-10-21T10:00:00Z',
        lang: 'ar',
      }),
    ) as Record<string, unknown>
    expect(postAr['@type']).toBe('BlogPosting')
    expect(postAr.inLanguage).toBe('ar-SA')

    const postEn = cleanJsonLd(
      getBlogPostingSchema({
        title: 'Elevator Maintenance Guide in Jeddah',
        url: 'https://almubtakirah.com/en/blog/elevator-maintenance-guide',
        lang: 'en',
      }),
    ) as Record<string, unknown>
    expect(postEn['@type']).toBe('BlogPosting')
    expect(postEn.inLanguage).toBe('en')
  })

  it('generates valid CreativeWork and BreadcrumbList schema', () => {
    const work = cleanJsonLd(
      getWorkSchema(
        'مشروع برج الأندلس',
        'تركيب وصيانة 4 مصاعد ذكية',
        'https://almubtakirah.com/works/andalus-tower',
        'https://almubtakirah.com/images/work.jpg',
      ),
    ) as Record<string, unknown>
    expect(work['@type']).toBe('CreativeWork')

    const breadcrumbs = cleanJsonLd(
      getBreadcrumbsSchema([
        { name: 'الرئيسية', url: 'https://almubtakirah.com' },
        { name: 'خدماتنا', url: 'https://almubtakirah.com/services' },
        { name: 'صيانة المصاعد', url: 'https://almubtakirah.com/services/elevator-maintenance' },
      ]),
    ) as Record<string, unknown>
    expect(breadcrumbs['@type']).toBe('BreadcrumbList')
    expect((breadcrumbs.itemListElement as unknown[]).length).toBe(3)
  })

  it('generates valid CollectionPage schema for blog and categories', () => {
    const collection = cleanJsonLd(
      getCollectionPageSchema(
        'المدونة الهندسية',
        'أحدث المقالات والمعلومات التقنية',
        'https://almubtakirah.com/blog',
      ),
    ) as Record<string, unknown>
    expect(collection['@type']).toBe('CollectionPage')
    expect(collection.name).toBe('المدونة الهندسية')
  })
})

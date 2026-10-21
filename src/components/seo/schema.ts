import { siteConfig } from '@/lib/siteConfig'

const SITE_URL = 'https://almubtakirah.com'
const LOGO_URL = `${SITE_URL}/brand/logo-dark-square.webp`
const DEFAULT_IMAGE_URL = `${SITE_URL}/brand/og-default.png`

/**
 * Site-wide Organization schema.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'شركة المصاعد المبتكرة',
    alternateName: siteConfig.company.nameEn,
    url: SITE_URL,
    logo: LOGO_URL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phones[0],
        contactType: 'customer service',
        areaServed: 'SA',
        availableLanguage: ['Arabic', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phones[1],
        contactType: 'emergency',
        areaServed: 'SA',
        availableLanguage: ['Arabic', 'English'],
      },
    ],
  }
}

/**
 * WebSite schema.
 */
export function getWebSiteSchema(lang: 'ar' | 'en' = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: lang === 'en' ? 'Innovative Elevators Co.' : 'شركة المصاعد المبتكرة',
    alternateName: lang === 'en' ? 'Al-Masaed Al-Mubtakirah' : 'المساعد المبتكرة',
    url: SITE_URL,
    inLanguage: lang === 'en' ? 'en' : 'ar-SA',
  }
}

/**
 * LocalBusiness schema for Home, About, and Contact pages.
 */
export function getLocalBusinessSchema(lang: 'ar' | 'en' = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: lang === 'en' ? 'Innovative Elevators Co.' : 'شركة المصاعد المبتكرة',
    alternateName: siteConfig.company.nameEn,
    url: SITE_URL,
    logo: LOGO_URL,
    image: DEFAULT_IMAGE_URL,
    telephone: siteConfig.contact.phones[1] || siteConfig.contact.phones[0],
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressRegion: 'Makkah Province',
      addressCountry: 'SA',
    },
    areaServed: {
      '@type': 'City',
      name: 'Jeddah',
    },
    identifier: siteConfig.company.crNumber,
  }
}

/**
 * Service schema.
 */
export function getServiceSchema(
  title: string,
  description: string,
  serviceUrl: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: 'شركة المصاعد المبتكرة',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Jeddah',
    },
  }
}

/**
 * FAQPage schema.
 */
export function getFaqSchema(faqs: Array<{ q: string; a: string }>) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

export interface BlogPostingSchemaInput {
  schemaType?: 'BlogPosting' | 'Article' | 'NewsArticle'
  title: string
  description?: string | null
  url: string
  imageUrl?: string | null
  datePublished?: string | null
  dateModified?: string | null
  authorName?: string | null
  lang?: 'ar' | 'en'
}

/**
 * BlogPosting schema for single blog post pages.
 */
export function getBlogPostingSchema(input: BlogPostingSchemaInput) {
  const published = input.datePublished || new Date().toISOString()
  const modified = input.dateModified || published

  return {
    '@context': 'https://schema.org',
    '@type': input.schemaType || 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
    headline: input.title,
    description: input.description || undefined,
    image: input.imageUrl || DEFAULT_IMAGE_URL,
    datePublished: published,
    dateModified: modified,
    author: {
      '@type': 'Organization',
      name: input.authorName || 'شركة المصاعد المبتكرة',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'شركة المصاعد المبتكرة',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    inLanguage: input.lang === 'en' ? 'en' : 'ar-SA',
  }
}

/**
 * BreadcrumbList schema for all inner pages.
 */
export function getBreadcrumbsSchema(
  items: Array<{ name: string; url: string }>,
) {
  if (!items || items.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  }
}

/**
 * CollectionPage schema for blog index and categories.
 */
export function getCollectionPageSchema(
  title: string,
  description: string,
  url: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
  }
}

/**
 * CreativeWork schema for Work / Project detail page.
 */
export function getWorkSchema(
  title: string,
  description: string,
  url: string,
  imageUrl?: string | null,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url,
    image: imageUrl || DEFAULT_IMAGE_URL,
    creator: {
      '@type': 'Organization',
      name: 'شركة المصاعد المبتكرة',
      url: SITE_URL,
    },
  }
}

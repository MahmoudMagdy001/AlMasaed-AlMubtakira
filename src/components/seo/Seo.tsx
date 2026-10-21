import React from 'react'
import { Head } from 'vite-react-ssg'
import { cleanJsonLd } from './cleanJsonLd'
import { getBreadcrumbsSchema } from './schema'

export interface SeoArticleMeta {
  publishedTime?: string | null
  modifiedTime?: string | null
  section?: string | null
  tags?: string[]
  author?: string | null
}

export interface SeoHreflang {
  ar?: string
  en?: string
  xDefault?: string
}

export interface SeoProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string | null
  ogType?: 'website' | 'article'
  noindex?: boolean
  lang?: 'ar' | 'en'
  dir?: 'rtl' | 'ltr'
  article?: SeoArticleMeta
  hreflang?: SeoHreflang
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>> | null
  breadcrumbs?: Array<{ name: string; url: string }>
  children?: React.ReactNode
}

const SITE_URL = 'https://almubtakirah.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/og-default.png`

function toAbsoluteUrl(url?: string | null): string {
  if (!url) return SITE_URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const clean = url.startsWith('/') ? url : `/${url}`
  return `${SITE_URL}${clean}`
}

function cleanCanonical(url?: string): string {
  if (!url) return SITE_URL
  const absolute = toAbsoluteUrl(url)
  // Strip query string and hash
  const withoutQuery = absolute.split('?')[0].split('#')[0]
  // Remove trailing slash unless it's root
  if (withoutQuery !== SITE_URL && withoutQuery.endsWith('/')) {
    return withoutQuery.slice(0, -1)
  }
  return withoutQuery
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  lang = 'ar',
  dir = lang === 'ar' ? 'rtl' : 'ltr',
  article,
  hreflang,
  jsonLd,
  breadcrumbs,
  children,
}) => {
  // Title formatting according to spec
  let fullTitle: string
  if (!title) {
    fullTitle =
      lang === 'en'
        ? 'Innovative Elevators Co. | Elevator Installation & Maintenance in Jeddah'
        : 'شركة المصاعد المبتكرة | تركيب وصيانة المصاعد في جدة'
  } else if (title.includes('|')) {
    fullTitle = title
  } else {
    const brandSuffix = lang === 'en' ? 'Innovative Elevators Co.' : 'شركة المصاعد المبتكرة'
    fullTitle = `${title} | ${brandSuffix}`
  }

  // Description formatting
  const fullDescription =
    description ||
    (lang === 'en'
      ? 'Saudi company specialized in elevator installation, maintenance, modernization and escalators in Jeddah. Civil Defense approved with reliable maintenance contracts.'
      : 'شركة سعودية متخصصة في توريد وتركيب وصيانة وتحديث المصاعد والسلالم الكهربائية في جدة. معتمدون من الدفاع المدني ونوفر عقود صيانة دورية موثوقة.')

  const canonicalUrl = cleanCanonical(canonical)
  const resolvedOgImage = ogImage ? toAbsoluteUrl(ogImage) : DEFAULT_OG_IMAGE
  const siteName = lang === 'en' ? 'Innovative Elevators Co.' : 'شركة المصاعد المبتكرة'
  const ogLocale = lang === 'en' ? 'en_US' : 'ar_SA'

  // Combine custom jsonLd and breadcrumbs if provided
  const schemasToRender: Array<Record<string, unknown>> = []
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      schemasToRender.push(...jsonLd)
    } else {
      schemasToRender.push(jsonLd)
    }
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    const bSchema = getBreadcrumbsSchema(breadcrumbs)
    if (bSchema) schemasToRender.push(bSchema)
  }

  return (
    <Head>
      <html lang={lang} dir={dir} />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="theme-color" content="#132454" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* hreflang Alternates */}
      {hreflang?.ar && (
        <link rel="alternate" hrefLang="ar-SA" href={toAbsoluteUrl(hreflang.ar)} />
      )}
      {hreflang?.en && (
        <link rel="alternate" hrefLang="en" href={toAbsoluteUrl(hreflang.en)} />
      )}
      {hreflang?.xDefault && (
        <link rel="alternate" hrefLang="x-default" href={toAbsoluteUrl(hreflang.xDefault)} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={siteName} />

      {/* Article Specific Open Graph */}
      {ogType === 'article' && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {ogType === 'article' && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {ogType === 'article' && article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {ogType === 'article' && article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {ogType === 'article' &&
        article?.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* JSON-LD Structured Data */}
      {schemasToRender.map((schema, index) => {
        const cleaned = cleanJsonLd(schema)
        if (!cleaned) return null
        return (
          <script key={index} type="application/ld+json">
            {JSON.stringify(cleaned)}
          </script>
        )
      })}

      {children}
    </Head>
  )
}

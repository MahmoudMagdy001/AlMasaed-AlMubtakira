import React from 'react'
import { Head } from 'vite-react-ssg'

export interface SeoProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  lang?: 'ar' | 'en'
  dir?: 'rtl' | 'ltr'
  children?: React.ReactNode
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  noindex = false,
  lang = 'ar',
  dir = 'rtl',
  children,
}) => {
  const fullTitle = title
    ? `${title} | شركة المصاعد المبتكرة`
    : 'شركة المصاعد المبتكرة | صيانة وتحديث وتركيب المصاعد في جدة'

  const fullDescription =
    description ||
    'شركة سعودية متخصصة في توريد وتركيب وصيانة وتحديث المصاعد والسلالم الكهربائية في جدة. معتمدون في الدفاع المدني.'

  return (
    <Head>
      <html lang={lang} dir={dir} />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_SA' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </Head>

  )
}

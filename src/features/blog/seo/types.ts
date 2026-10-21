export type CheckStatus = 'pass' | 'warn' | 'fail'

export type CheckCategory = 'basic' | 'content' | 'technical'

export type SeoGrade = 'good' | 'average' | 'poor'

export interface SeoCheckResult {
  id: string
  titleAr: string
  status: CheckStatus
  score: number
  maxScore: number
  messageAr: string
  fixTipAr?: string
  category: CheckCategory
}

export interface SeoAnalyzerInput {
  title: string
  slug: string
  seoTitle?: string | null
  seoDescription?: string | null
  focusKeyword?: string | null
  secondaryKeywords?: string[]
  excerpt?: string | null
  featuredImageId?: string | null
  featuredImageAlt?: string | null
  contentHtml: string
  canonicalUrl?: string | null
  robotsNoindex?: boolean
  robotsNofollow?: boolean
  ogImageId?: string | null
  faq?: Array<{ q: string; a: string }>
  siteDomain?: string
}

export interface LinkAnalysisItem {
  href: string
  text: string
  isInternal: boolean
  isNofollow: boolean
}

export interface SeoMetrics {
  wordCount: number
  readingTimeMin: number
  keywordOccurrences: number
  keywordDensity: number
  sentenceCount: number
  avgSentenceWords: number
  longSentencePercent: number
  paragraphsCount: number
  maxParagraphWords: number
  paragraphsOver150Words: number
  headingsCount: {
    h2: number
    h3: number
    h4: number
  }
  headingsOutline: Array<{
    level: 2 | 3 | 4
    text: string
  }>
  links: {
    internalCount: number
    externalCount: number
    linksList: LinkAnalysisItem[]
  }
  images: {
    total: number
    withAlt: number
    missingAlt: number
  }
  faqCount: number
}

export interface SeoAnalyzerOutput {
  score: number // 0 - 100
  grade: SeoGrade // good >= 80, average 50-79, poor < 50
  checks: SeoCheckResult[]
  groupedChecks: {
    basic: SeoCheckResult[]
    content: SeoCheckResult[]
    technical: SeoCheckResult[]
  }
  metrics: SeoMetrics
}

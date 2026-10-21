import { useState, useEffect, useRef } from 'react'
import { analyzePostSeo } from './seoAnalyzer'
import type { SeoAnalyzerInput, SeoAnalyzerOutput } from './types'

export interface UseSeoAnalyzerOptions {
  debounceMs?: number
}

export function useSeoAnalyzer(
  input: SeoAnalyzerInput,
  options: UseSeoAnalyzerOptions = {},
): {
  result: SeoAnalyzerOutput
  isAnalyzing: boolean
} {
  const debounceMs = options.debounceMs ?? 250

  // Run initial analysis synchronously on mount so first render has immediate score
  const [result, setResult] = useState<SeoAnalyzerOutput>(() => analyzePostSeo(input))
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef(input)
  inputRef.current = input

  useEffect(() => {
    setIsAnalyzing(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      try {
        const nextResult = analyzePostSeo(inputRef.current)
        setResult(nextResult)
      } catch (err) {
        console.error('Failed to run SEO analysis:', err)
      } finally {
        setIsAnalyzing(false)
      }
    }, debounceMs)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [
    input.title,
    input.slug,
    input.seoTitle,
    input.seoDescription,
    input.focusKeyword,
    input.secondaryKeywords,
    input.excerpt,
    input.featuredImageId,
    input.featuredImageAlt,
    input.contentHtml,
    input.canonicalUrl,
    input.robotsNoindex,
    input.robotsNofollow,
    input.ogImageId,
    input.faq,
    input.siteDomain,
    debounceMs,
  ])

  return { result, isAnalyzing }
}

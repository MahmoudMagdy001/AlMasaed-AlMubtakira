/**
 * Normalizes Arabic text for SEO keyword matching:
 * - Removes tashkeel (diacritics U+064B–U+065F, U+0670)
 * - Removes tatweel (kashida U+0640)
 * - Unifies Alef variants (أ, إ, آ, ٱ -> ا)
 * - Unifies Yaa variants (ى -> ي)
 * - Unifies Taa Marbuta (ة -> ه)
 * - Converts Arabic-Indic digits (٠-٩ -> 0-9)
 * - Converts Latin to lowercase
 * - Collapses repeated whitespace
 */
export function normalizeArabic(text: string): string {
  if (!text) return ''

  return text
    // 1. Remove Tashkeel (diacritical marks)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // 2. Remove Tatweel
    .replace(/\u0640/g, '')
    // 3. Unify Alef forms
    .replace(/[أإآٱ]/g, 'ا')
    // 4. Unify Yaa / Alif Maqsura
    .replace(/ى/g, 'ي')
    // 5. Unify Taa Marbuta
    .replace(/ة/g, 'ه')
    // 6. Convert Arabic-Indic digits to Latin
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    // 7. Lowercase Latin characters
    .toLowerCase()
    // 8. Normalize spaces
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Strips HTML tags and collapses whitespace to get clean plain text.
 */
export function extractPlainText(html: string): string {
  if (!html) return ''
  return html
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Counts total words in text (splitting on whitespace).
 */
export function countWords(text: string): number {
  if (!text) return 0
  const plain = extractPlainText(text)
  const words = plain.split(/\s+/).filter(Boolean)
  return words.length
}

/**
 * Calculates keyword density percentage:
 * (keyword occurrences * words in keyword) / total words * 100
 */
export function calculateKeywordDensity(
  occurrences: number,
  keywordWordsCount: number,
  totalWords: number,
): number {
  if (totalWords <= 0 || occurrences <= 0) return 0
  const density = (occurrences * keywordWordsCount) / totalWords * 100
  return Math.round(density * 100) / 100 // 2 decimal places
}

export interface KeywordMatch {
  index: number
  length: number
  matchedText: string
}

/**
 * Finds all occurrences of a keyword in text, supporting Arabic attached prefixes:
 * (و، ف، ب، ل، ك، ال، وال، بال، لل، فال، كال)
 */
export function findKeywordMatches(
  rawText: string,
  rawKeyword: string,
): { count: number; matches: KeywordMatch[] } {
  if (!rawText || !rawKeyword) {
    return { count: 0, matches: [] }
  }

  const normalizedKeyword = normalizeArabic(rawKeyword)
  if (!normalizedKeyword) {
    return { count: 0, matches: [] }
  }

  const keywordWords = normalizedKeyword.split(/\s+/).filter(Boolean)
  if (keywordWords.length === 0) {
    return { count: 0, matches: [] }
  }

  // Escape special regex characters
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Common Arabic prefixes attached to nouns/verbs
  const prefixGroup = '(?:و|ف|ب|ل|ك|ال|وال|بال|لل|فال|كال)?'

  // Build regex pattern matching the keyword with possible prefixes on first and subsequent words
  // First word can have any prefix; subsequent words may also have definite article prefixes (ال/وال/بال)
  const patternParts = keywordWords.map((word, idx) => {
    const escaped = escapeRegExp(word)
    if (idx === 0) {
      return `${prefixGroup}${escaped}`
    }
    return `(?:ال|وال|بال|لل)?${escaped}`
  })

  // Join words with one or more whitespace
  const phrasePattern = patternParts.join('\\s+')

  // Word boundary check: precede by start/whitespace/punctuation, follow by end/whitespace/punctuation
  const boundaryRegex = new RegExp(
    `(^|[^\\p{L}\\p{N}])(${phrasePattern})(?=[^\\p{L}\\p{N}]|$)`,
    'giu',
  )

  const normalizedText = normalizeArabic(rawText)
  const matches: KeywordMatch[] = []
  let match: RegExpExecArray | null

  while ((match = boundaryRegex.exec(normalizedText)) !== null) {
    const matchedKeyword = match[2]
    const offset = match[1].length
    const index = match.index + offset

    matches.push({
      index,
      length: matchedKeyword.length,
      matchedText: matchedKeyword,
    })

    // Advance regex index to prevent infinite loop on empty matches
    if (boundaryRegex.lastIndex === match.index) {
      boundaryRegex.lastIndex++
    }
  }

  return {
    count: matches.length,
    matches,
  }
}

/**
 * Analyzes sentence lengths in text:
 * Splitting on . ! ? ؟ ۔ … and line breaks.
 */
export function analyzeSentences(rawText: string): {
  sentenceCount: number
  avgSentenceWords: number
  longSentencePercent: number
} {
  const plain = extractPlainText(rawText)
  if (!plain) {
    return { sentenceCount: 0, avgSentenceWords: 0, longSentencePercent: 0 }
  }

  // Split on sentence terminators: . ! ? ؟ ۔ … \n
  const rawSentences = plain
    .split(/[.!?؟۔…\n\r]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  if (rawSentences.length === 0) {
    return { sentenceCount: 1, avgSentenceWords: countWords(plain), longSentencePercent: 0 }
  }

  let totalWords = 0
  let longSentences = 0

  for (const s of rawSentences) {
    const wCount = s.split(/\s+/).filter(Boolean).length
    totalWords += wCount
    if (wCount > 30) {
      longSentences++
    }
  }

  const sentenceCount = rawSentences.length
  const avgSentenceWords = Math.round(totalWords / sentenceCount)
  const longSentencePercent = Math.round((longSentences / sentenceCount) * 100)

  return {
    sentenceCount,
    avgSentenceWords,
    longSentencePercent,
  }
}

/**
 * Analyzes paragraphs in HTML content:
 * Checks paragraph count, maximum words in any single paragraph, and count of paragraphs > 150 words.
 */
export function analyzeParagraphs(html: string): {
  paragraphCount: number
  maxParagraphWords: number
  paragraphsOver150Words: number
} {
  if (!html) {
    return { paragraphCount: 0, maxParagraphWords: 0, paragraphsOver150Words: 0 }
  }

  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi
  const paragraphs: string[] = []
  let match: RegExpExecArray | null

  while ((match = pRegex.exec(html)) !== null) {
    const text = extractPlainText(match[1])
    if (text.length > 0) {
      paragraphs.push(text)
    }
  }

  // If no <p> tags, treat entire text as one block
  if (paragraphs.length === 0) {
    const entireWords = countWords(html)
    return {
      paragraphCount: 1,
      maxParagraphWords: entireWords,
      paragraphsOver150Words: entireWords > 150 ? 1 : 0,
    }
  }

  let maxWords = 0
  let over150 = 0

  for (const p of paragraphs) {
    const words = p.split(/\s+/).filter(Boolean).length
    if (words > maxWords) maxWords = words
    if (words > 150) over150++
  }

  return {
    paragraphCount: paragraphs.length,
    maxParagraphWords: maxWords,
    paragraphsOver150Words: over150,
  }
}

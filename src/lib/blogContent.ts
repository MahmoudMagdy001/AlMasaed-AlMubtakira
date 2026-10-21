export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export interface ProcessedArticleContent {
  sanitizedHtml: string
  toc: TocItem[]
}

/**
 * Creates a clean, URL-safe slug for heading anchor IDs.
 * Preserves Arabic characters, alphanumeric Latin, and hyphens.
 */
export function slugifyHeading(text: string, fallbackIndex = 0): string {
  const cleaned = text
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '') // Keep Arabic, Latin, numbers, spaces, hyphens
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return cleaned || `section-${fallbackIndex}`
}

/**
 * Strips HTML tags and returns plain text content
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

/**
 * Sanitizes HTML content using a strict allow-list and processes headings/tables for public rendering.
 * Works uniformly in both Node.js (SSR build) and browser runtimes.
 */
export function processArticleHtml(rawHtml: string): ProcessedArticleContent {
  if (!rawHtml) {
    return { sanitizedHtml: '', toc: [] }
  }

  let html = rawHtml

  // 1. Strip dangerous tags with their contents entirely
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  html = html.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
  html = html.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
  html = html.replace(/<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi, '')
  html = html.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
  html = html.replace(/<meta\b[^>]*>/gi, '')
  html = html.replace(/<link\b[^>]*>/gi, '')

  // 2. Strip event handlers (on* attributes like onclick, onerror, onload, etc.)
  html = html.replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')

  // 3. Strip javascript: and vbscript: URIs in href and src
  html = html.replace(
    /(href|src)\s*=\s*(?:'javascript:[^']*'|"javascript:[^"]*"|javascript:[^\s>]+)/gi,
    '$1="#"',
  )
  html = html.replace(
    /(href|src)\s*=\s*(?:'vbscript:[^']*'|"vbscript:[^"]*"|vbscript:[^\s>]+)/gi,
    '$1="#"',
  )

  // 4. Validate iframes: ONLY allow YouTube embeds (youtube.com or youtube-nocookie.com)
  html = html.replace(/<iframe\b([^>]*)>(.*?)<\/iframe>/gi, (_match, attrs) => {
    const srcMatch = attrs.match(/src\s*=\s*["']([^"']+)["']/i)

    if (!srcMatch) return ''
    const src = srcMatch[1]

    const isAllowedYoutube =
      /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\/embed\/[a-zA-Z0-9_-]+/i.test(
        src,
      )

    if (isAllowedYoutube) {
      return `<div class="aspect-video w-full my-6 rounded-card overflow-hidden shadow-xs"><iframe src="${src}" class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    }
    // Discard any other iframe host
    return ''
  })

  // 5. Wrap <table> elements in horizontal scroll containers to prevent mobile layout breakage
  html = html.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi, (_match, attrs, content) => {
    return `<div class="table-wrapper overflow-x-auto my-6 border border-surface-border rounded-card"><table ${attrs} class="w-full text-start text-sm border-collapse">${content}</table></div>`
  })

  // 6. Extract Table of Contents and inject anchor IDs into H2 and H3
  const toc: TocItem[] = []
  const usedIds = new Set<string>()
  let headingIndex = 0

  html = html.replace(
    /<(h[23])(\s+[^>]*)?>(.*?)<\/\1>/gi,
    (_match, tag: string, existingAttrs = '', content: string) => {
      headingIndex++
      const level = tag.toLowerCase() === 'h2' ? 2 : 3
      const plainText = stripHtml(content)

      let id = slugifyHeading(plainText, headingIndex)
      if (usedIds.has(id)) {
        id = `${id}-${headingIndex}`
      }
      usedIds.add(id)

      toc.push({ id, text: plainText, level })

      // Remove any existing id in attributes and inject our clean id
      const cleanedAttrs = existingAttrs.replace(/\s+id\s*=\s*["'][^"']*["']/i, '')
      return `<${tag} id="${id}" ${cleanedAttrs.trim()}>${content}</${tag}>`
    },
  )

  return {
    sanitizedHtml: html,
    toc,
  }
}

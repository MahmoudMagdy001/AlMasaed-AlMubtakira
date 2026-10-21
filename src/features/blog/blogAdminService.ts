import { z } from 'zod'
import { supabase } from '../../lib/supabase'
import type { Tables, Json } from '../../types/database.types'
import type { MediaItem } from '../../components/ui'
import { requestRebuild } from '../../lib/rebuild'
import { processArticleHtml, stripHtml } from '../../lib/blogContent'

export type PostStatus = 'draft' | 'published' | 'archived'
export type PostLang = 'ar' | 'en'
export type SchemaType = 'BlogPosting' | 'Article' | 'NewsArticle'

export interface FaqPair {
  q: string
  a: string
}

export interface AdminPostListItem extends Tables<'posts'> {
  category?: Tables<'categories'> | null
  author?: Tables<'profiles'> | null
  featured_image?: MediaItem | null
  tags?: Tables<'tags'>[]
}

export interface AdminPostDetail extends AdminPostListItem {
  twin_post?: {
    id: string
    slug: string
    lang: PostLang
    title: string
    status: PostStatus
  } | null
}

export const postFormSchema = z.object({
  title: z.string().min(3, 'عنوان المقال مطلوب (على الأقل 3 أحرف)'),
  slug: z
    .string()
    .min(2, 'الرابط اللطيف مطلوب')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'الرابط اللطيف يجب أن يتكون من حروف إنجليزية صغيرة وأرقام وشرطات فقط (-)'),
  lang: z.enum(['ar', 'en']).default('ar'),
  translation_key: z.string().uuid().optional(),
  excerpt: z.string().max(350, 'المقتطف يجب ألا يتجاوز 350 حرفاً').optional().nullable(),
  content_html: z.string().default(''),
  content_json: z.any().optional().nullable(),
  category_id: z.string().uuid('يرجى اختيار تصنيف صحيح').optional().nullable(),
  tag_ids: z.array(z.string().uuid()).default([]),
  featured_image_id: z.string().uuid().optional().nullable(),
  featured_image_alt: z.string().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  published_at: z.string().optional().nullable(),
  seo_title: z.string().max(80).optional().nullable(),
  seo_description: z.string().max(200).optional().nullable(),
  focus_keyword: z.string().optional().nullable(),
  secondary_keywords: z.array(z.string()).default([]),
  canonical_url: z.string().url().or(z.literal('')).optional().nullable(),
  robots_noindex: z.boolean().default(false),
  robots_nofollow: z.boolean().default(false),
  og_title: z.string().optional().nullable(),
  og_description: z.string().optional().nullable(),
  og_image_id: z.string().uuid().optional().nullable(),
  schema_type: z.enum(['BlogPosting', 'Article', 'NewsArticle']).default('BlogPosting'),
  seo_score: z.number().int().min(0).max(100).optional().nullable(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
})

export type PostFormData = z.infer<typeof postFormSchema>

/**
 * Calculates reading time in minutes based on word count.
 * Rate: 200 words per minute for Arabic and English.
 */
export function calculateReadingTime(text: string): number {
  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  return Math.max(1, Math.ceil(words.length / 200))
}

/**
 * Derives FAQ question/answer pairs from article HTML content.
 * Looks for elements with data-faq-item, or class faq-block, or dl/dt/dd structures.
 */
export function deriveFaqFromContent(html: string): FaqPair[] {
  if (!html || typeof window === 'undefined') return []
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const faqNodes = doc.querySelectorAll('[data-faq-item], .faq-item, .faq-block')
    const pairs: FaqPair[] = []

    faqNodes.forEach((node) => {
      const qEl =
        node.querySelector('[data-faq-question], .faq-question, h3, h4, dt, strong') ||
        node.firstElementChild
      const aEl =
        node.querySelector('[data-faq-answer], .faq-answer, p, dd') ||
        node.lastElementChild

      const q = qEl?.textContent?.trim() || ''
      const a = aEl?.textContent?.trim() || ''

      if (q && a && q !== a) {
        pairs.push({ q, a })
      }
    })

    return pairs
  } catch {
    return []
  }
}

/**
 * Transliterates Arabic or cleans English text to produce a safe URL slug.
 */
export function generateSlug(text: string): string {
  if (!text) return ''
  const arabicToLatinMap: Record<string, string> = {
    أ: 'a', إ: 'e', آ: 'aa', ا: 'a', ب: 'b', ت: 't', ث: 'th',
    ج: 'j', ح: 'h', خ: 'kh', د: 'd', ذ: 'th', ر: 'r', ز: 'z',
    س: 's', ش: 'sh', ص: 's', ض: 'd', ط: 't', ظ: 'z', ع: 'a',
    غ: 'gh', ف: 'f', ق: 'q', ك: 'k', ل: 'l', م: 'm', ن: 'n',
    ه: 'h', و: 'w', ي: 'y', ى: 'a', ة: 'h', ء: '', ئ: 'e', ؤ: 'o',
  }
  const transliterated = text
    .trim()
    .toLowerCase()
    .split('')
    .map((c) => arabicToLatinMap[c] || c)
    .join('')

  return transliterated
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Checks if a post slug is unique for a given language.
 */
export async function isPostSlugUnique(
  slug: string,
  lang: PostLang,
  excludeId?: string,
): Promise<boolean> {
  let query = supabase
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .eq('lang', lang)

  if (excludeId) {
    query = query.neq('id', excludeId)
  }

  const { data } = await query.maybeSingle()
  return !data
}

/**
 * Checks if a post title already exists for a given language (warning signal).
 */
export async function isPostTitleUnique(
  title: string,
  lang: PostLang,
  excludeId?: string,
): Promise<boolean> {
  if (!title.trim()) return true
  let query = supabase
    .from('posts')
    .select('id')
    .ilike('title', title.trim())
    .eq('lang', lang)

  if (excludeId) {
    query = query.neq('id', excludeId)
  }

  const { data } = await query.maybeSingle()
  return !data
}

export interface GetAdminPostsParams {
  search?: string
  status?: PostStatus | 'all'
  lang?: PostLang | 'all'
  categoryId?: string | 'all'
  page?: number
  limit?: number
}

export async function getAdminPosts(
  params: GetAdminPostsParams = {},
): Promise<{ posts: AdminPostListItem[]; total: number }> {
  const {
    search,
    status = 'all',
    lang = 'all',
    categoryId = 'all',
    page = 1,
    limit = 20,
  } = params

  let query = supabase
    .from('posts')
    .select(
      `
      id,
      lang,
      translation_key,
      slug,
      title,
      excerpt,
      featured_image_id,
      featured_image_alt,
      category_id,
      author_id,
      status,
      published_at,
      reading_time_min,
      seo_score,
      seo_title,
      seo_description,
      focus_keyword,
      secondary_keywords,
      canonical_url,
      robots_noindex,
      robots_nofollow,
      og_title,
      og_description,
      og_image_id,
      schema_type,
      created_at,
      updated_at,
      category:category_id (
        id,
        slug,
        name_ar,
        name_en
      ),
      author:author_id (
        id,
        full_name,
        avatar_url,
        role
      ),
      featured_image:featured_image_id (
        id,
        storage_path,
        width,
        height,
        alt_text,
        variants
      )
    `,
      { count: 'exact' },
    )

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  if (lang && lang !== 'all') {
    query = query.eq('lang', lang)
  }

  if (categoryId && categoryId !== 'all') {
    query = query.eq('category_id', categoryId)
  }

  if (search) {
    const s = `%${search.trim()}%`
    query = query.or(`title.ilike.${s},slug.ilike.${s},excerpt.ilike.${s}`)
  }

  const offset = (page - 1) * limit
  query = query
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, count, error } = await query

  if (error) {
    throw new Error(`فشل تحميل قائمة المقالات: ${error.message}`)
  }

  return {
    posts: (data || []) as unknown as AdminPostListItem[],
    total: count ?? 0,
  }
}

export async function getAdminPostById(id: string): Promise<AdminPostDetail> {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      category:category_id (
        id,
        slug,
        name_ar,
        name_en
      ),
      author:author_id (
        id,
        full_name,
        avatar_url,
        role
      ),
      featured_image:featured_image_id (
        id,
        storage_path,
        width,
        height,
        alt_text,
        variants
      )
    `,
    )
    .eq('id', id)
    .single()

  if (error || !data) {
    throw new Error(`تعذر العثور على المقال: ${error?.message || 'غير موجود'}`)
  }

  const post = data as unknown as AdminPostDetail

  // Fetch linked tags
  const { data: tagJunctions } = await supabase
    .from('post_tags')
    .select('tag:tag_id ( id, slug, name_ar, name_en )')
    .eq('post_id', id)

  post.tags = (tagJunctions || [])
    .map((j) => (j as unknown as { tag: Tables<'tags'> })?.tag)
    .filter(Boolean)

  // Find twin translation post if any
  if (post.translation_key) {
    const { data: twin } = await supabase
      .from('posts')
      .select('id, slug, lang, title, status')
      .eq('translation_key', post.translation_key)
      .neq('id', post.id)
      .maybeSingle()

    post.twin_post = twin || null
  }

  return post
}

export async function createPost(
  payload: PostFormData,
  authorId?: string,
): Promise<AdminPostDetail> {
  const parsed = postFormSchema.parse(payload)

  const sanitized = processArticleHtml(parsed.content_html)
  const plainText = stripHtml(sanitized.sanitizedHtml)
  const readingTime = calculateReadingTime(plainText)

  // Extract FAQ if not manually populated
  const derivedFaq =
    parsed.faq.length > 0 ? parsed.faq : deriveFaqFromContent(sanitized.sanitizedHtml)

  const translationKey = parsed.translation_key || crypto.randomUUID()
  const publishedAt =
    parsed.status === 'published'
      ? parsed.published_at || new Date().toISOString()
      : parsed.published_at || null

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: parsed.title,
      slug: parsed.slug,
      lang: parsed.lang,
      translation_key: translationKey,
      excerpt: parsed.excerpt || null,
      content_html: sanitized.sanitizedHtml,
      content_json: (parsed.content_json as Json) || null,
      category_id: parsed.category_id || null,
      author_id: authorId || null,
      featured_image_id: parsed.featured_image_id || null,
      featured_image_alt: parsed.featured_image_alt || null,
      status: parsed.status,
      published_at: publishedAt,
      reading_time_min: readingTime,
      seo_score: parsed.seo_score ?? null,
      seo_title: parsed.seo_title || null,
      seo_description: parsed.seo_description || null,
      focus_keyword: parsed.focus_keyword || null,
      secondary_keywords: parsed.secondary_keywords,
      canonical_url: parsed.canonical_url || null,
      robots_noindex: parsed.robots_noindex,
      robots_nofollow: parsed.robots_nofollow,
      og_title: parsed.og_title || null,
      og_description: parsed.og_description || null,
      og_image_id: parsed.og_image_id || null,
      schema_type: parsed.schema_type,
      faq: (derivedFaq as unknown as Json) || [],
    })
    .select('id')
    .single()

  if (error || !data) {
    throw new Error(`فشل إنشاء المقال: ${error?.message || 'خطأ غير معروف'}`)
  }

  // Insert post_tags junction
  if (parsed.tag_ids && parsed.tag_ids.length > 0) {
    const junctions = parsed.tag_ids.map((tagId) => ({
      post_id: data.id,
      tag_id: tagId,
    }))
    await supabase.from('post_tags').insert(junctions)
  }

  if (parsed.status === 'published') {
    await requestRebuild('create-post-published')
  }

  return getAdminPostById(data.id)
}

export async function updatePost(
  id: string,
  payload: Partial<PostFormData>,
): Promise<AdminPostDetail> {
  const current = await getAdminPostById(id)

  const contentHtml =
    payload.content_html !== undefined ? payload.content_html : current.content_html
  const sanitized = processArticleHtml(contentHtml)
  const plainText = stripHtml(sanitized.sanitizedHtml)
  const readingTime = calculateReadingTime(plainText)

  const derivedFaq =
    payload.faq !== undefined
      ? payload.faq
      : deriveFaqFromContent(sanitized.sanitizedHtml)

  const newStatus = payload.status || current.status
  let publishedAt =
    payload.published_at !== undefined ? payload.published_at : current.published_at
  if (newStatus === 'published' && !publishedAt) {
    publishedAt = new Date().toISOString()
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title: payload.title ?? current.title,
      slug: payload.slug ?? current.slug,
      lang: payload.lang ?? current.lang,
      excerpt: payload.excerpt !== undefined ? payload.excerpt : current.excerpt,
      content_html: sanitized.sanitizedHtml,
      content_json:
        payload.content_json !== undefined
          ? (payload.content_json as Json)
          : current.content_json,
      category_id:
        payload.category_id !== undefined ? payload.category_id : current.category_id,
      featured_image_id:
        payload.featured_image_id !== undefined
          ? payload.featured_image_id
          : current.featured_image_id,
      featured_image_alt:
        payload.featured_image_alt !== undefined
          ? payload.featured_image_alt
          : current.featured_image_alt,
      status: newStatus,
      published_at: publishedAt,
      reading_time_min: readingTime,
      seo_score: payload.seo_score !== undefined ? payload.seo_score : current.seo_score,
      seo_title: payload.seo_title !== undefined ? payload.seo_title : current.seo_title,
      seo_description:
        payload.seo_description !== undefined
          ? payload.seo_description
          : current.seo_description,
      focus_keyword:
        payload.focus_keyword !== undefined
          ? payload.focus_keyword
          : current.focus_keyword,
      secondary_keywords:
        payload.secondary_keywords ?? current.secondary_keywords,
      canonical_url:
        payload.canonical_url !== undefined
          ? payload.canonical_url
          : current.canonical_url,
      robots_noindex:
        payload.robots_noindex !== undefined
          ? payload.robots_noindex
          : current.robots_noindex,
      robots_nofollow:
        payload.robots_nofollow !== undefined
          ? payload.robots_nofollow
          : current.robots_nofollow,
      og_title: payload.og_title !== undefined ? payload.og_title : current.og_title,
      og_description:
        payload.og_description !== undefined
          ? payload.og_description
          : current.og_description,
      og_image_id:
        payload.og_image_id !== undefined ? payload.og_image_id : current.og_image_id,
      schema_type: payload.schema_type ?? current.schema_type,
      faq: (derivedFaq as unknown as Json) || current.faq,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(`فشل تحديث المقال: ${error.message}`)
  }

  // Sync tags junction if provided
  if (payload.tag_ids !== undefined) {
    await supabase.from('post_tags').delete().eq('post_id', id)
    if (payload.tag_ids.length > 0) {
      const junctions = payload.tag_ids.map((tagId) => ({
        post_id: id,
        tag_id: tagId,
      }))
      await supabase.from('post_tags').insert(junctions)
    }
  }

  if (current.status === 'published' || newStatus === 'published') {
    await requestRebuild('update-post')
  }

  return getAdminPostById(id)
}

export async function duplicatePost(id: string): Promise<AdminPostDetail> {
  const original = await getAdminPostById(id)
  const shortId = crypto.randomUUID().slice(0, 6)

  const newSlug = `${original.slug}-copy-${shortId}`
  const newTitle = `[نسخة] ${original.title}`

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: newTitle,
      slug: newSlug,
      lang: original.lang,
      translation_key: crypto.randomUUID(),
      excerpt: original.excerpt,
      content_html: original.content_html,
      content_json: original.content_json,
      category_id: original.category_id,
      author_id: original.author_id,
      featured_image_id: original.featured_image_id,
      featured_image_alt: original.featured_image_alt,
      status: 'draft',
      published_at: null,
      reading_time_min: original.reading_time_min,
      seo_title: original.seo_title,
      seo_description: original.seo_description,
      focus_keyword: original.focus_keyword,
      secondary_keywords: original.secondary_keywords,
      canonical_url: null,
      robots_noindex: false,
      robots_nofollow: false,
      og_title: original.og_title,
      og_description: original.og_description,
      og_image_id: original.og_image_id,
      schema_type: original.schema_type,
      faq: original.faq,
    })
    .select('id')
    .single()

  if (error || !data) {
    throw new Error(`فشل استنساخ المقال: ${error?.message || 'خطأ غير معروف'}`)
  }

  // Copy tags
  if (original.tags && original.tags.length > 0) {
    const junctions = original.tags.map((t) => ({
      post_id: data.id,
      tag_id: t.id,
    }))
    await supabase.from('post_tags').insert(junctions)
  }

  return getAdminPostById(data.id)
}

export async function createTranslationTwin(originalId: string): Promise<AdminPostDetail> {
  const original = await getAdminPostById(originalId)
  const targetLang: PostLang = original.lang === 'ar' ? 'en' : 'ar'

  // Check if twin already exists
  if (original.twin_post) {
    return getAdminPostById(original.twin_post.id)
  }

  const prefix = targetLang === 'en' ? '[EN Translation] ' : '[ترجمة بالعربية] '
  const translatedTitle = `${prefix}${original.title}`
  const translatedSlug = `${original.slug}-${targetLang}`

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: translatedTitle,
      slug: translatedSlug,
      lang: targetLang,
      translation_key: original.translation_key,
      excerpt: original.excerpt,
      content_html: original.content_html,
      content_json: original.content_json,
      category_id: original.category_id,
      author_id: original.author_id,
      featured_image_id: original.featured_image_id,
      featured_image_alt: original.featured_image_alt,
      status: 'draft',
      published_at: null,
      reading_time_min: original.reading_time_min,
      schema_type: original.schema_type,
      faq: original.faq,
    })
    .select('id')
    .single()

  if (error || !data) {
    throw new Error(`فشل إنشاء النسخة المترجمة: ${error?.message || 'خطأ غير معروف'}`)
  }

  return getAdminPostById(data.id)
}

export async function bulkUpdatePostStatus(
  ids: string[],
  status: PostStatus,
): Promise<void> {
  const updateData: { status: PostStatus; updated_at: string; published_at?: string } = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (status === 'published') {
    updateData.published_at = new Date().toISOString()
  }

  const { error } = await supabase.from('posts').update(updateData).in('id', ids)

  if (error) {
    throw new Error(`فشل تعديل حالة المقالات المحددة: ${error.message}`)
  }

  await requestRebuild('bulk-update-post-status')
}

export async function bulkDeletePosts(ids: string[]): Promise<void> {
  // post_tags cleanup
  await supabase.from('post_tags').delete().in('post_id', ids)

  const { error } = await supabase.from('posts').delete().in('id', ids)

  if (error) {
    throw new Error(`فشل حذف المقالات: ${error.message}`)
  }

  await requestRebuild('bulk-delete-posts')
}

export async function deletePost(id: string): Promise<void> {
  return bulkDeletePosts([id])
}

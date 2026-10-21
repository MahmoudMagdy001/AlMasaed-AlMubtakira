import { supabase } from '@/lib/supabase'
import type { Tables } from '@/types/database.types'
import type { MediaItem } from '@/components/ui'

export interface PostAuthor {
  id: string
  full_name: string | null
  avatar_url: string | null
  role?: string
}

export interface PostCategory {
  id: string
  slug: string
  name_ar: string
  name_en: string | null
  description_ar: string | null
  description_en: string | null
  seo_title?: string | null
  seo_description?: string | null
}

export interface PostListItem {
  id: string
  lang: 'ar' | 'en'
  translation_key: string
  slug: string
  title: string
  excerpt: string | null
  featured_image_id: string | null
  featured_image_alt: string | null
  category_id: string | null
  author_id: string | null
  published_at: string | null
  reading_time_min: number
  created_at: string
  updated_at: string
  category?: PostCategory | null
  featured_image?: MediaItem | null
  author?: PostAuthor | null
}

export interface PostFaqItem {
  q: string
  a: string
}

export interface PostDetail extends Omit<Tables<'posts'>, 'faq'> {
  faq: PostFaqItem[]
  category?: Tables<'categories'> | null
  featured_image?: MediaItem | null
  author?: Tables<'profiles'> | null
  tags?: Tables<'tags'>[]
}

export interface GetBlogPostsParams {
  lang?: 'ar' | 'en'
  categorySlug?: string
  tagSlug?: string
  limit?: number
  offset?: number
}

export interface GetBlogPostsResult {
  posts: PostListItem[]
  total: number
}

export interface PrevNextPost {
  slug: string
  title: string
  lang: 'ar' | 'en'
}

/**
 * Common select fields for list queries (EXPLICITLY excludes content_html and content_json)
 */
const POST_LIST_SELECT = `
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
  published_at,
  reading_time_min,
  created_at,
  updated_at,
  category:category_id (
    id,
    slug,
    name_ar,
    name_en,
    description_ar,
    description_en
  ),
  featured_image:featured_image_id (
    id,
    file_name,
    storage_path,
    mime_type,
    size_bytes,
    width,
    height,
    variants,
    alt_text,
    title,
    folder,
    uploaded_by,
    created_at,
    updated_at
  ),
  author:author_id (
    id,
    full_name,
    avatar_url,
    role
  )
`

/**
 * Retrieves published posts with pagination, category/tag filtering, and language support.
 * Explicitly avoids fetching large content_html.
 */
export async function getPublishedPosts({
  lang,
  categorySlug,
  tagSlug,
  limit = 9,
  offset = 0,
}: GetBlogPostsParams = {}): Promise<GetBlogPostsResult> {
  try {
    const nowIso = new Date().toISOString()
    let categoryId: string | null = null

    if (categorySlug) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .maybeSingle()

      if (!cat) {
        return { posts: [], total: 0 }
      }
      categoryId = cat.id
    }

    let postIdsFromTag: string[] | null = null
    if (tagSlug) {
      const { data: tag } = await supabase
        .from('tags')
        .select('id')
        .eq('slug', tagSlug)
        .maybeSingle()

      if (!tag) {
        return { posts: [], total: 0 }
      }

      const { data: postTagRows } = await supabase
        .from('post_tags')
        .select('post_id')
        .eq('tag_id', tag.id)

      if (!postTagRows || postTagRows.length === 0) {
        return { posts: [], total: 0 }
      }
      postIdsFromTag = postTagRows.map((r) => r.post_id)
    }

    let query = supabase
      .from('posts')
      .select(POST_LIST_SELECT, { count: 'exact' })
      .eq('status', 'published')
      .lte('published_at', nowIso)

    if (lang) {
      query = query.eq('lang', lang)
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (postIdsFromTag) {
      query = query.in('id', postIdsFromTag)
    }

    query = query
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data, count, error } = await query

    if (error) {
      console.warn('Supabase posts fetch warning:', error.message)
    }

    const posts = (data as unknown as PostListItem[]) || []
    if (posts.length === 0) {
      const { fallbackPosts } = await import('@/data/seedData')
      let filtered = fallbackPosts.filter((p) => p.lang === lang)
      if (categorySlug) {
        filtered = filtered.filter((p) => p.category?.slug === categorySlug)
      }
      const totalFallback = filtered.length
      if (typeof limit === 'number') {
        filtered = filtered.slice(offset, offset + limit)
      }
      return {
        posts: filtered as unknown as PostListItem[],
        total: totalFallback,
      }
    }

    return {
      posts,
      total: count ?? 0,
    }
  } catch (err) {
    console.error('Unexpected error in getPublishedPosts:', err)
    const { fallbackPosts } = await import('@/data/seedData')
    let filtered = fallbackPosts.filter((p) => p.lang === lang)
    if (categorySlug) {
      filtered = filtered.filter((p) => p.category?.slug === categorySlug)
    }
    const totalFallback = filtered.length
    if (typeof limit === 'number') {
      filtered = filtered.slice(offset, offset + limit)
    }
    return {
      posts: filtered as unknown as PostListItem[],
      total: totalFallback,
    }
  }
}

/**
 * Retrieves a single published post by language and slug, including its full content_html,
 * category, author, media, and associated tags.
 */
export async function getPostBySlug(
  lang: 'ar' | 'en',
  slug: string,
): Promise<PostDetail | null> {
  try {
    const nowIso = new Date().toISOString()
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        category:category_id (*),
        featured_image:featured_image_id (*),
        author:author_id (*),
        post_tags (
          tag:tag_id (*)
        )
      `,
      )
      .eq('lang', lang)
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', nowIso)
      .maybeSingle()

    if (error || !data) {
      const { fallbackPosts } = await import('@/data/seedData')
      const fallback = fallbackPosts.find(
        (p) => p.lang === lang && p.slug === slug,
      )
      if (fallback) {
        return fallback
      }
      return null
    }

    // Flatten tags array
    type PostTagRow = { tag: Tables<'tags'> | null }
    const rawPostTags = (data.post_tags as unknown as PostTagRow[]) || []
    const tags = rawPostTags
      .map((item) => item.tag)
      .filter((tag): tag is Tables<'tags'> => Boolean(tag))

    // Parse FAQ if stored as string or array
    let faq: PostFaqItem[] = []
    if (Array.isArray(data.faq)) {
      faq = data.faq as unknown as PostFaqItem[]
    } else if (typeof data.faq === 'string') {
      try {
        faq = JSON.parse(data.faq) as PostFaqItem[]
      } catch {
        faq = []
      }
    }

    return {
      ...(data as unknown as Tables<'posts'>),
      faq,
      category: data.category as unknown as Tables<'categories'> | null,
      featured_image: data.featured_image as unknown as MediaItem | null,
      author: data.author as unknown as Tables<'profiles'> | null,
      tags,
    }
  } catch (err) {
    console.error('Unexpected error in getPostBySlug:', err)
    const { fallbackPosts } = await import('@/data/seedData')
    const fallback = fallbackPosts.find(
      (p) => p.lang === lang && p.slug === slug,
    )
    return fallback || null
  }
}

/**
 * Finds the corresponding translation twin of a post given its translation_key and target language.
 */
export async function getPostTranslation(
  translationKey: string,
  targetLang: 'ar' | 'en',
): Promise<PrevNextPost | null> {
  try {
    const nowIso = new Date().toISOString()
    const { data, error } = await supabase
      .from('posts')
      .select('slug, title, lang')
      .eq('translation_key', translationKey)
      .eq('lang', targetLang)
      .eq('status', 'published')
      .lte('published_at', nowIso)
      .maybeSingle()

    if (error || !data) {
      const { fallbackPosts } = await import('@/data/seedData')
      const twin = fallbackPosts.find(
        (p) =>
          p.translation_key === translationKey && p.lang === targetLang,
      )
      return twin ? { slug: twin.slug, title: twin.title, lang: twin.lang } : null
    }

    return data as PrevNextPost
  } catch (err) {
    console.error('Unexpected error in getPostTranslation:', err)
    const { fallbackPosts } = await import('@/data/seedData')
    const twin = fallbackPosts.find(
      (p) =>
        p.translation_key === translationKey && p.lang === targetLang,
    )
    return twin ? { slug: twin.slug, title: twin.title, lang: twin.lang } : null
  }
}

/**
 * Retrieves related posts in the same category and language, excluding the current post.
 * Does not fetch content_html.
 */
export async function getRelatedPosts(
  categoryId: string | null,
  currentPostId: string,
  lang: 'ar' | 'en',
  limit = 3,
): Promise<PostListItem[]> {
  try {
    const nowIso = new Date().toISOString()
    let query = supabase
      .from('posts')
      .select(POST_LIST_SELECT)
      .eq('status', 'published')
      .eq('lang', lang)
      .neq('id', currentPostId)
      .lte('published_at', nowIso)

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    query = query
      .order('published_at', { ascending: false })
      .limit(limit)

    const { data, error } = await query

    if (error || !data || data.length === 0) {
      const { fallbackPosts } = await import('@/data/seedData')
      return fallbackPosts
        .filter(
          (p) =>
            p.lang === lang &&
            p.id !== currentPostId &&
            (!categoryId || p.category_id === categoryId),
        )
        .slice(0, limit) as unknown as PostListItem[]
    }

    // If fewer than limit and categoryId was set, attempt to backfill with general posts
    if (data.length < limit && categoryId) {
      const remaining = limit - data.length
      const existingIds = [currentPostId, ...data.map((p) => p.id)]

      const { data: backfill } = await supabase
        .from('posts')
        .select(POST_LIST_SELECT)
        .eq('status', 'published')
        .eq('lang', lang)
        .lte('published_at', nowIso)
        .not('id', 'in', `(${existingIds.join(',')})`)
        .order('published_at', { ascending: false })
        .limit(remaining)

      if (backfill && backfill.length > 0) {
        return [...(data as unknown as PostListItem[]), ...(backfill as unknown as PostListItem[])]
      }
    }

    return (data as unknown as PostListItem[]) || []
  } catch (err) {
    console.error('Unexpected error in getRelatedPosts:', err)
    const { fallbackPosts } = await import('@/data/seedData')
    return fallbackPosts
      .filter(
        (p) =>
          p.lang === lang &&
          p.id !== currentPostId &&
          (!categoryId || p.category_id === categoryId),
      )
      .slice(0, limit) as unknown as PostListItem[]
  }
}

/**
 * Retrieves previous and next published posts chronologically in the same language.
 */
export async function getPrevNextPosts(
  publishedAt: string | null,
  lang: 'ar' | 'en',
): Promise<{ prev: PrevNextPost | null; next: PrevNextPost | null }> {
  if (!publishedAt) {
    return { prev: null, next: null }
  }

  try {
    const nowIso = new Date().toISOString()

    // Previous post: older than current
    const { data: prevData } = await supabase
      .from('posts')
      .select('slug, title, lang')
      .eq('lang', lang)
      .eq('status', 'published')
      .lte('published_at', nowIso)
      .lt('published_at', publishedAt)
      .order('published_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    // Next post: newer than current
    const { data: nextData } = await supabase
      .from('posts')
      .select('slug, title, lang')
      .eq('lang', lang)
      .eq('status', 'published')
      .lte('published_at', nowIso)
      .gt('published_at', publishedAt)
      .order('published_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (!prevData && !nextData) {
      const { fallbackPosts } = await import('@/data/seedData')
      const sameLang = fallbackPosts.filter((p) => p.lang === lang)
      const currentIndex = sameLang.findIndex((p) => p.published_at === publishedAt)
      if (currentIndex !== -1) {
        const prev = currentIndex < sameLang.length - 1 ? sameLang[currentIndex + 1] : null
        const next = currentIndex > 0 ? sameLang[currentIndex - 1] : null
        return {
          prev: prev ? { slug: prev.slug, title: prev.title, lang: prev.lang } : null,
          next: next ? { slug: next.slug, title: next.title, lang: next.lang } : null,
        }
      }
    }

    return {
      prev: (prevData as PrevNextPost) || null,
      next: (nextData as PrevNextPost) || null,
    }
  } catch (err) {
    console.error('Unexpected error in getPrevNextPosts:', err)
    return { prev: null, next: null }
  }
}

/**
 * Retrieves all blog categories ordered by sort_order.
 */
export async function getBlogCategories(): Promise<PostCategory[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      const { fallbackCategories } = await import('@/data/seedData')
      return fallbackCategories as PostCategory[]
    }

    return data as PostCategory[]
  } catch (err) {
    console.error('Unexpected error in getBlogCategories:', err)
    const { fallbackCategories } = await import('@/data/seedData')
    return fallbackCategories as PostCategory[]
  }
}

/**
 * Retrieves a single category by slug.
 */
export async function getCategoryBySlug(
  slug: string,
): Promise<PostCategory | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error || !data) {
      return null
    }

    return data as PostCategory
  } catch (err) {
    console.error('Unexpected error in getCategoryBySlug:', err)
    return null
  }
}

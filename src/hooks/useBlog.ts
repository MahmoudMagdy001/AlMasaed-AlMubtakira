import { useQuery } from '@tanstack/react-query'
import {
  getPublishedPosts,
  getPostBySlug,
  getBlogCategories,
  getCategoryBySlug,
  getRelatedPosts,
  getPrevNextPosts,
  getPostTranslation,
  type GetBlogPostsParams,
} from '@/services/blogService'

export function useBlogPosts(params: GetBlogPostsParams = {}) {
  return useQuery({
    queryKey: ['blog_posts', params],
    queryFn: () => getPublishedPosts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useBlogPost(lang: 'ar' | 'en', slug: string) {
  return useQuery({
    queryKey: ['blog_post', lang, slug],
    queryFn: () => getPostBySlug(lang, slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog_categories'],
    queryFn: () => getBlogCategories(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

export function useBlogCategory(slug: string) {
  return useQuery({
    queryKey: ['blog_category', slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 15,
  })
}

export function useRelatedPosts(params: {
  categoryId: string | null
  currentPostId: string
  lang: 'ar' | 'en'
  limit?: number
}) {
  return useQuery({
    queryKey: ['related_posts', params],
    queryFn: () =>
      getRelatedPosts(
        params.categoryId,
        params.currentPostId,
        params.lang,
        params.limit,
      ),
    enabled: Boolean(params.currentPostId),
    staleTime: 1000 * 60 * 5,
  })
}

export function usePrevNextPosts(
  publishedAt: string | null,
  lang: 'ar' | 'en',
) {
  return useQuery({
    queryKey: ['prev_next_posts', publishedAt, lang],
    queryFn: () => getPrevNextPosts(publishedAt, lang),
    enabled: Boolean(publishedAt),
    staleTime: 1000 * 60 * 5,
  })
}

export function usePostTranslation(
  translationKey: string | null | undefined,
  targetLang: 'ar' | 'en',
) {
  return useQuery({
    queryKey: ['post_translation', translationKey, targetLang],
    queryFn: () =>
      translationKey ? getPostTranslation(translationKey, targetLang) : null,
    enabled: Boolean(translationKey),
    staleTime: 1000 * 60 * 15,
  })
}

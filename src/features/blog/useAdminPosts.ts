import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAdminPosts,
  getAdminPostById,
  createPost,
  updatePost,
  duplicatePost,
  createTranslationTwin,
  bulkUpdatePostStatus,
  bulkDeletePosts,
  deletePost,
  type GetAdminPostsParams,
  type PostFormData,
  type PostStatus,
} from './blogAdminService'

export function useAdminPosts(params: GetAdminPostsParams = {}) {
  return useQuery({
    queryKey: ['admin_posts', params],
    queryFn: () => getAdminPosts(params),
    staleTime: 1000 * 30,
  })
}

export function useAdminPost(id: string | undefined) {
  return useQuery({
    queryKey: ['admin_post', id],
    queryFn: () => (id ? getAdminPostById(id) : null),
    enabled: Boolean(id && id !== 'new'),
    staleTime: 1000 * 30,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ data, authorId }: { data: PostFormData; authorId?: string }) =>
      createPost(data, authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin_categories'] })
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PostFormData> }) =>
      updatePost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin_posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin_post', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
  })
}

export function useDuplicatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => duplicatePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin_categories'] })
    },
  })
}

export function useCreateTranslationTwin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => createTranslationTwin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_posts'] })
    },
  })
}

export function useBulkUpdatePostStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: PostStatus }) =>
      bulkUpdatePostStatus(ids, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useBulkDeletePosts() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ids: string[]) => bulkDeletePosts(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin_categories'] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['admin_categories'] })
    },
  })
}

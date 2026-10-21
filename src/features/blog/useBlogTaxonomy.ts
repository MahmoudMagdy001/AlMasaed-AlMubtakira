import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAdminTags,
  createTag,
  updateTag,
  deleteTag,
  type CategoryFormData,
  type TagFormData,
} from './blogTaxonomyService'

export function useAdminCategories() {
  return useQuery({
    queryKey: ['admin_categories'],
    queryFn: () => getAdminCategories(),
    staleTime: 1000 * 60,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CategoryFormData) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_categories'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryFormData> }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_categories'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_categories'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

// --- Tags Hooks ---

export function useAdminTags() {
  return useQuery({
    queryKey: ['admin_tags'],
    queryFn: () => getAdminTags(),
    staleTime: 1000 * 60,
  })
}

export function useCreateTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: TagFormData) => createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_tags'] })
    },
  })
}

export function useUpdateTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TagFormData> }) =>
      updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_tags'] })
    },
  })
}

export function useDeleteTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_tags'] })
    },
  })
}

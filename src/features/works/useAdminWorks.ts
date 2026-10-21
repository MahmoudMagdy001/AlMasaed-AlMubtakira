import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAdminWorks,
  getAdminWorkById,
  createWork,
  updateWork,
  toggleWorkPublish,
  reorderWorks,
  deleteWork,
  type GetAdminWorksParams,
  type WorkFormData,
} from './worksAdminService'

export function useAdminWorks(params: GetAdminWorksParams = {}) {
  return useQuery({
    queryKey: ['admin_works', params],
    queryFn: () => getAdminWorks(params),
    staleTime: 1000 * 30, // 30 seconds
  })
}

export function useAdminWork(id: string | undefined) {
  return useQuery({
    queryKey: ['admin_work', id],
    queryFn: () => (id ? getAdminWorkById(id) : null),
    enabled: Boolean(id),
    staleTime: 1000 * 30,
  })
}

export function useCreateWork() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: WorkFormData) => createWork(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_works'] })
      queryClient.invalidateQueries({ queryKey: ['works'] })
    },
  })
}

export function useUpdateWork() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkFormData> }) =>
      updateWork(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin_works'] })
      queryClient.invalidateQueries({ queryKey: ['admin_work', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['works'] })
      queryClient.invalidateQueries({ queryKey: ['work'] })
    },
  })
}

export function useToggleWorkPublish() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) =>
      toggleWorkPublish(id, is_published),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_works'] })
      queryClient.invalidateQueries({ queryKey: ['works'] })
    },
  })
}

export function useReorderWorks() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (orderedIds: string[]) => reorderWorks(orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_works'] })
      queryClient.invalidateQueries({ queryKey: ['works'] })
    },
  })
}

export function useDeleteWork() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteWork(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_works'] })
      queryClient.invalidateQueries({ queryKey: ['works'] })
    },
  })
}

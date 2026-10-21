import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAdminPartners,
  createPartner,
  updatePartner,
  togglePartnerPublish,
  reorderPartners,
  deletePartner,
  type PartnerFormData,
} from './partnersAdminService'

export function useAdminPartners() {
  return useQuery({
    queryKey: ['admin_partners'],
    queryFn: () => getAdminPartners(),
    staleTime: 1000 * 30,
  })
}

export function useCreatePartner() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: PartnerFormData) => createPartner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_partners'] })
      queryClient.invalidateQueries({ queryKey: ['partners'] })
    },
  })
}

export function useUpdatePartner() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PartnerFormData> }) =>
      updatePartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_partners'] })
      queryClient.invalidateQueries({ queryKey: ['partners'] })
    },
  })
}

export function useTogglePartnerPublish() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) =>
      togglePartnerPublish(id, is_published),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_partners'] })
      queryClient.invalidateQueries({ queryKey: ['partners'] })
    },
  })
}

export function useReorderPartners() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (orderedIds: string[]) => reorderPartners(orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_partners'] })
      queryClient.invalidateQueries({ queryKey: ['partners'] })
    },
  })
}

export function useDeletePartner() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deletePartner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_partners'] })
      queryClient.invalidateQueries({ queryKey: ['partners'] })
    },
  })
}

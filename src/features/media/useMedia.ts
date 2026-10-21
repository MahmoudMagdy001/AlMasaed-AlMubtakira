import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMediaList,
  getMediaById,
  detectMediaUsage,
  updateMedia,
  deleteMedia,
  bulkDeleteMedia,
  bulkMoveMedia,
  type GetMediaParams,
} from './mediaService'
import type { MediaFolder } from './types'

export const MEDIA_QUERY_KEY = ['admin-media'] as const

export function useMediaList(params: GetMediaParams = {}) {
  return useQuery({
    queryKey: [...MEDIA_QUERY_KEY, params],
    queryFn: () => getMediaList(params),
    staleTime: 1000 * 30, // 30 seconds
  })
}

export function useMediaDetail(id: string | null) {
  return useQuery({
    queryKey: ['admin-media-detail', id],
    queryFn: () => (id ? getMediaById(id) : null),
    enabled: Boolean(id),
  })
}

export function useMediaUsage(id: string | null, storagePath: string | null) {
  return useQuery({
    queryKey: ['admin-media-usage', id, storagePath],
    queryFn: () => (id && storagePath ? detectMediaUsage(id, storagePath) : null),
    enabled: Boolean(id && storagePath),
  })
}

export function useUpdateMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string
      updates: { alt_text?: string | null; title?: string | null; folder?: MediaFolder }
    }) => updateMedia(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: ['admin-media-detail', variables.id] })
    },
  })
}

export function useDeleteMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, force = false }: { id: string; force?: boolean }) =>
      deleteMedia(id, force),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY })
    },
  })
}

export function useBulkDeleteMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ ids, force = false }: { ids: string[]; force?: boolean }) =>
      bulkDeleteMedia(ids, force),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY })
    },
  })
}

export function useBulkMoveMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ ids, targetFolder }: { ids: string[]; targetFolder: MediaFolder }) =>
      bulkMoveMedia(ids, targetFolder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY })
    },
  })
}

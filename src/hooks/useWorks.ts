import { useQuery } from '@tanstack/react-query'
import {
  getPublishedWorks,
  getWorkBySlug,
  getRelatedWorks,
  type GetWorksParams,
} from '@/services/worksService'

export function useWorks(params: GetWorksParams = {}) {
  return useQuery({
    queryKey: ['works', params],
    queryFn: () => getPublishedWorks(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useWorkDetail(slug: string) {
  return useQuery({
    queryKey: ['work', slug],
    queryFn: () => getWorkBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  })
}

export function useRelatedWorks(params: {
  currentWorkId: string
  serviceType: string
  limit?: number
}) {
  return useQuery({
    queryKey: ['related_works', params],
    queryFn: () => getRelatedWorks(params),
    enabled: Boolean(params.currentWorkId && params.serviceType),
    staleTime: 1000 * 60 * 5,
  })
}

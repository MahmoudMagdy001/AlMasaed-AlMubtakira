import { useQuery } from '@tanstack/react-query'
import { getPublishedPartners } from '@/services/partnersService'

export function usePartners() {
  return useQuery({
    queryKey: ['partners'],
    queryFn: getPublishedPartners,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

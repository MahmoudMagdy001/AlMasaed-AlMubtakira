import { useQuery } from '@tanstack/react-query'
import { fetchSiteSettings, getCachedSiteSettings } from '@/services/settingsService'
import type { SiteConfig } from '@/lib/siteConfig'

export const SITE_SETTINGS_QUERY_KEY = ['site_settings'] as const

export function useSiteSettings(): SiteConfig {
  const { data } = useQuery({
    queryKey: SITE_SETTINGS_QUERY_KEY,
    queryFn: fetchSiteSettings,
    initialData: getCachedSiteSettings(),
    staleTime: 1000 * 60 * 15, // 15 minutes client cache
  })

  return data ?? getCachedSiteSettings()
}

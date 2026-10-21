import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAdminSettings,
  saveAdminSettings,
  type SettingsFormData,
} from './settingsAdminService'

export function useAdminSiteSettings() {
  return useQuery({
    queryKey: ['admin_site_settings'],
    queryFn: () => getAdminSettings(),
    staleTime: 1000 * 60, // 1 minute
  })
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: SettingsFormData) => saveAdminSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_site_settings'] })
      queryClient.invalidateQueries({ queryKey: ['site_settings'] })
    },
  })
}

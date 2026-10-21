import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAdminProfiles,
  updateUserRole,
  type UserRole,
} from './usersAdminService'

export function useAdminProfiles() {
  return useQuery({
    queryKey: ['admin_profiles'],
    queryFn: () => getAdminProfiles(),
    staleTime: 1000 * 30,
  })
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
      updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_profiles'] })
    },
  })
}

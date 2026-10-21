import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAdminMessages,
  getUnreadMessagesCount,
  updateMessageStatus,
  updateMessageNotes,
  deleteMessage,
  type GetMessagesParams,
  type SubmissionStatus,
} from './messagesAdminService'

export function useAdminMessages(params: GetMessagesParams = {}) {
  return useQuery({
    queryKey: ['admin_messages', params],
    queryFn: () => getAdminMessages(params),
    staleTime: 1000 * 30,
  })
}

export function useUnreadMessagesCount() {
  return useQuery({
    queryKey: ['unread_messages_count'],
    queryFn: () => getUnreadMessagesCount(),
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Poll every minute for new customer inquiries
  })
}

export function useUpdateMessageStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: SubmissionStatus }) =>
      updateMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_messages'] })
      queryClient.invalidateQueries({ queryKey: ['unread_messages_count'] })
    },
  })
}

export function useUpdateMessageNotes() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      updateMessageNotes(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_messages'] })
    },
  })
}

export function useDeleteMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_messages'] })
      queryClient.invalidateQueries({ queryKey: ['unread_messages_count'] })
    },
  })
}

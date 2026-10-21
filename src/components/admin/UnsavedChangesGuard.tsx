import React from 'react'
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning'

export interface UnsavedChangesGuardProps {
  isDirty: boolean
  message?: string
}

export const UnsavedChangesGuard: React.FC<UnsavedChangesGuardProps> = ({
  isDirty,
  message,
}) => {
  useUnsavedChangesWarning(isDirty, message)
  return null
}

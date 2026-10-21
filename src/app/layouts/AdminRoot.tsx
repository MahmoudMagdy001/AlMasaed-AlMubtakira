import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppProviders } from '../providers'
import { AuthProvider } from '@/features/auth/AuthContext'
import { ToastProvider } from '@/components/ui'

export const AdminRoot: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <AppProviders>
      <AuthProvider>
        <ToastProvider>
          {children ?? <Outlet />}
        </ToastProvider>
      </AuthProvider>
    </AppProviders>
  )
}

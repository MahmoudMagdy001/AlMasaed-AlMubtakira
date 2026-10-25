import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AppProviders } from '../providers'
import { AuthProvider } from '@/features/auth/AuthContext'
import { ToastProvider } from '@/components/ui'

export const AdminRoot: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <AppProviders>
      <AuthProvider>
        <ToastProvider>
          <Suspense
            fallback={
              <div className="min-h-screen bg-surface-soft flex items-center justify-center p-6">
                <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
              </div>
            }
          >
            {children ?? <Outlet />}
          </Suspense>
        </ToastProvider>
      </AuthProvider>
    </AppProviders>
  )
}

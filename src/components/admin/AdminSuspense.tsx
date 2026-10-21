import React, { Suspense } from 'react'

export interface AdminSuspenseProps {
  children: React.ReactNode
}

export const AdminSuspense: React.FC<AdminSuspenseProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-soft flex items-center justify-center p-6">
          <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

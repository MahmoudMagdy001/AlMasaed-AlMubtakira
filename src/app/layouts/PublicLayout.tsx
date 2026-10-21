import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppProviders } from '../providers'

export const PublicLayout: React.FC = () => {
  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col bg-white text-content-body font-sans">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </AppProviders>
  )
}

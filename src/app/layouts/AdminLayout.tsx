import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppProviders } from '../providers'

export const AdminLayout: React.FC = () => {
  return (
    <AppProviders>
      <div className="min-h-screen bg-surface-soft text-content-body font-sans">
        <Outlet />
      </div>
    </AppProviders>
  )
}

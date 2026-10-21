import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  placement?: 'start' | 'end'
  title?: string
  children: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'start',
  title,
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const placementClasses =
    placement === 'start'
      ? 'start-0 border-e border-surface-border animate-slide-in-start'
      : 'end-0 border-s border-surface-border animate-slide-in-end'

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 ${placementClasses} w-full max-w-xs sm:max-w-sm bg-white shadow-elevated z-10 flex flex-col focus:outline-none`}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-surface-border">
          {title ? (
            <h3
              id="drawer-title"
              className="text-lg font-bold text-content-heading"
            >
              {title}
            </h3>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            className="text-content-muted hover:text-content-heading rounded-control p-1 hover:bg-surface-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">{children}</div>
      </div>
    </div>
  )
}

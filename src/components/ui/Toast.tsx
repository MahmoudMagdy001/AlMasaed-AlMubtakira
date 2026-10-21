import React, { useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { ToastContext, type ToastMessage } from './ToastContext'

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    ({ type, title, message }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9)
      setToasts((prev) => [...prev, { id, type, title, message }])

      setTimeout(() => {
        removeToast(id)
      }, 5000)
    },
    [removeToast],
  )

  const success = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'success', title, message })
    },
    [showToast],
  )

  const error = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'error', title, message })
    },
    [showToast],
  )

  const info = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'info', title, message })
    },
    [showToast],
  )

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}
      <div
        className="fixed bottom-4 end-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-control bg-white shadow-elevated border border-surface-border animate-slide-up"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle2
                  className="w-5 h-5 text-feedback-success"
                  aria-hidden="true"
                />
              )}
              {toast.type === 'error' && (
                <AlertCircle
                  className="w-5 h-5 text-feedback-error"
                  aria-hidden="true"
                />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-brand-600" aria-hidden="true" />
              )}
            </div>
            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-content-heading">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-content-body mt-0.5 text-xs">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-content-muted hover:text-content-heading rounded-control p-0.5 transition-colors focus-visible:outline-none"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

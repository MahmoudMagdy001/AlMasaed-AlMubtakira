import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { ShieldAlert, LogOut, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { useAuth } from './useAuth'


export const AdminRouteGuard: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {

  const { user, session, profile, isLoading, isStaff, signOut } = useAuth()
  const location = useLocation()

  // 1. Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-soft flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin mb-4" />
        <p className="text-sm font-semibold text-content-body">
          جاري التحقق من صلاحيات الدخول...
        </p>
      </div>
    )
  }

  // 2. Unauthenticated -> Redirect to login with return path
  if (!user || !session) {
    const returnTo = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/admin/login?returnTo=${returnTo}`} replace />
  }

  // 3. User with role 'none' or no staff permission -> "No Access" screen
  if (!isStaff) {
    return (
      <div className="min-h-screen bg-surface-soft flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-card border border-surface-border p-8 text-center shadow-card">
          <div className="w-16 h-16 rounded-full bg-feedback-error/10 text-feedback-error flex items-center justify-center mx-auto mb-5">
            <ShieldAlert className="w-8 h-8" aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-black text-content-heading mb-3">
            غير مصرح بالدخول
          </h1>

          <p className="text-sm text-content-body leading-relaxed mb-6">
            تم تسجيل الدخول بنجاح بحساب{' '}
            <strong className="text-content-heading">{user.email}</strong>، ولكن
            هذا الحساب لا يملك صلاحية الوصول إلى لوحة تحكم الإدارة (الصلاحية
            الحالية:{' '}
            <span className="font-bold text-feedback-error">
              {profile?.role === 'none' ? 'بدون صلاحية (قيد الاعتماد)' : 'غير مصرح'}
            </span>
            ).
          </p>

          <div className="p-4 rounded-control bg-surface-soft border border-surface-border text-xs text-content-muted mb-6 text-start">
            يرجى التواصل مع مسؤول النظام في شركة المصاعد المبتكرة لتفعيل حسابك
            وترقية رتبتك إلى محرر أو مسؤول.
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              onClick={() => signOut()}
              leftIcon={<LogOut className="w-4 h-4" />}
              className="w-full"
            >
              تسجيل الخروج والتبديل لحساب آخر
            </Button>

            <Button
              variant="ghost"
              to="/"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-xs text-content-muted"
            >
              العودة إلى موقع الشركة
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 4. Authenticated staff user
  return children ? <>{children}</> : <Outlet />

}

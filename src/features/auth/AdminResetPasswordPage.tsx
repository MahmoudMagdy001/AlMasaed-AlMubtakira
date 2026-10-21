import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { Button, Logo } from '@/components/ui'
import { Seo } from '@/components/seo/Seo'
import { useAuth } from './useAuth'


export const AdminResetPasswordPage: React.FC = () => {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (newPassword.length < 10) {
      setErrorMsg('يجب ألا تقل كلمة المرور عن 10 خانات كمعيار أمان إلزامي.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('كلمتا المرور غير متطابقتين.')
      return
    }

    setIsSubmitting(true)
    const { error } = await updatePassword(newPassword)
    setIsSubmitting(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    setIsSuccess(true)
    setTimeout(() => {
      navigate('/admin', { replace: true })
    }, 2500)
  }

  return (
    <>
      <Seo
        title="تعيين كلمة مرور جديدة"
        noindex={true}
        description="إعادة تعيين كلمة المرور لحساب إدارة موقع شركة المصاعد المبتكرة."
      />

      <div className="min-h-screen bg-surface-soft flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link
            to="/"
            className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-control"
            aria-label="العودة إلى الموقع الرئيسي"
          >
            <Logo theme="light" asLink={false} />
          </Link>

          <h1 className="text-2xl font-black text-content-heading tracking-tight">
            تعيين كلمة المرور الجديدة
          </h1>
          <p className="mt-2 text-xs text-content-muted">
            يرجى إدخال كلمة مرور قوية مكونة من 10 خانات على الأقل
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-card rounded-card border border-surface-border sm:px-10">
            {errorMsg && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-control bg-feedback-error/10 border border-feedback-error/30 text-feedback-error text-xs flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isSuccess ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-feedback-success/10 text-feedback-success flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-content-heading text-sm mb-2">
                  تم تحديث كلمة المرور بنجاح
                </h3>
                <p className="text-xs text-content-body leading-relaxed mb-4">
                  جاري تحويلك إلى لوحة التحكم الآن...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-xs font-bold text-content-heading mb-1.5"
                  >
                    كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type="password"
                      dir="ltr"
                      autoComplete="new-password"
                      required
                      minLength={10}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                      placeholder="10 خانات على الأقل"
                    />
                    <Lock className="w-4 h-4 text-content-muted absolute top-3 start-3" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-xs font-bold text-content-heading mb-1.5"
                  >
                    تأكيد كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type="password"
                      dir="ltr"
                      autoComplete="new-password"
                      required
                      minLength={10}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    />
                    <Lock className="w-4 h-4 text-content-muted absolute top-3 start-3" />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    حفظ وتحديث كلمة المرور
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-brand-600 transition-colors"
            >
              <span>العودة لشاشة تسجيل الدخول</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

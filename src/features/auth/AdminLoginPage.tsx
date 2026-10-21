import React, { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
} from 'lucide-react'
import { Button, Logo } from '@/components/ui'
import { Seo } from '@/components/seo/Seo'
import { useAuth } from './useAuth'


export const AdminLoginPage: React.FC = () => {
  const { signIn, requestPasswordReset, user, isStaff } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnTo = searchParams.get('returnTo') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Forgot password state
  const [isForgotMode, setIsForgotMode] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  // If already authenticated staff member, redirect immediately
  React.useEffect(() => {
    if (user && isStaff) {
      navigate(returnTo, { replace: true })
    }
  }, [user, isStaff, navigate, returnTo])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!email || !password) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني وكلمة المرور.')
      return
    }

    setIsSubmitting(true)
    const { error } = await signIn(email.trim(), password)

    if (error) {
      setIsSubmitting(false)
      // Provide user-friendly Arabic auth error messages
      if (
        error.message.includes('Invalid login credentials') ||
        error.message.includes('invalid_credentials')
      ) {
        setErrorMsg('البريد الإلكتروني أو كلمة المرور غير صحيحة.')
      } else if (error.message.includes('Email not confirmed')) {
        setErrorMsg('يرجى تأكيد بريدك الإلكتروني أولاً قبل تسجيل الدخول.')
      } else if (error.message.includes('Too many requests')) {
        setErrorMsg('تم تجاوز الحد المسموح من المحاولات. يرجى الانتظار قليلاً.')
      } else {
        setErrorMsg(error.message)
      }
      return
    }

    navigate(returnTo, { replace: true })
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!email) {
      setErrorMsg('يرجى إدخال عنوان بريدك الإلكتروني لإرسال رابط الاستعادة.')
      return
    }

    setIsSubmitting(true)
    const { error } = await requestPasswordReset(email.trim())
    setIsSubmitting(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    setResetSuccess(true)
  }

  return (
    <>
      <Seo
        title="تسجيل الدخول إلى لوحة الإدارة"
        noindex={true}
        description="بوابة الإدارة المركزية لشركة المصاعد المبتكرة."
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
            {isForgotMode ? 'استعادة كلمة المرور' : 'لوحة الإدارة المركزية'}
          </h1>
          <p className="mt-2 text-xs text-content-muted">
            {isForgotMode
              ? 'أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة تعيين كلمة المرور'
              : 'يرجى تسجيل الدخول بحساب الموظف المعتمد للوصول إلى أدوات الإدارة'}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-card rounded-card border border-surface-border sm:px-10">
            {/* Error banner */}
            {errorMsg && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-control bg-feedback-error/10 border border-feedback-error/30 text-feedback-error text-xs flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Reset success banner */}
            {resetSuccess ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-feedback-success/10 text-feedback-success flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-content-heading text-sm mb-2">
                  تم إرسال رابط الاستعادة
                </h3>
                <p className="text-xs text-content-body leading-relaxed mb-6">
                  إذا كان البريد الإلكتروني مسجلاً لدينا، فستصلك رسالة تحتوي على
                  رابط إعادة تعيين كلمة المرور في غضون لحظات.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsForgotMode(false)
                    setResetSuccess(false)
                    setErrorMsg(null)
                  }}
                  className="w-full text-xs"
                >
                  العودة لتسجيل الدخول
                </Button>
              </div>
            ) : isForgotMode ? (
              /* Forgot password form */
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label
                    htmlFor="reset-email"
                    className="block text-xs font-bold text-content-heading mb-1.5"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      id="reset-email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@almubtakirah.com"
                      className="w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    />
                    <Mail className="w-4 h-4 text-content-muted absolute top-3 start-3" />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    إرسال رابط استعادة كلمة المرور
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(false)
                      setErrorMsg(null)
                    }}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    العودة إلى شاشة تسجيل الدخول
                  </button>
                </div>
              </form>
            ) : (
              /* Sign in form */
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-content-heading mb-1.5"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@almubtakirah.com"
                      className="w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    />
                    <Mail className="w-4 h-4 text-content-muted absolute top-3 start-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold text-content-heading"
                    >
                      كلمة المرور
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true)
                        setErrorMsg(null)
                      }}
                      className="text-xs text-brand-600 hover:text-brand-700 hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      dir="ltr"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    leftIcon={<KeyRound className="w-4 h-4" />}
                  >
                    تسجيل الدخول
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-brand-600 transition-colors"
            >
              <span>العودة لموقع شركة المصاعد المبتكرة</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

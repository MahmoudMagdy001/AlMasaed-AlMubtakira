import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ShieldCheck } from 'lucide-react'
import { updateConsentState } from '@/lib/analytics'

const CONSENT_STORAGE_KEY = 'almubtakirah_cookie_consent'

interface CookieConsentProps {
  isActive: boolean
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ isActive }) => {
  const { i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const isEn = i18n.language === 'en'

  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) {
      setIsVisible(true)
    } else {
      updateConsentState(stored === 'granted')
    }
  }, [isActive])

  if (!isVisible || !isActive) return null

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted')
    updateConsentState(true)
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'denied')
    updateConsentState(false)
    setIsVisible(false)
  }

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label={isEn ? 'Cookie Consent' : 'إشعار ملفات تعريف الارتباط'}
      className="fixed bottom-4 start-4 end-4 md:start-6 md:end-auto md:max-w-md z-50 bg-white rounded-card shadow-elevated border border-surface-border p-5 text-start animate-fade-in print:hidden"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-brand-50 rounded-control text-brand-600 shrink-0">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-content-heading mb-1">
            {isEn ? 'Privacy & Analytics' : 'الخصوصية وإحصاءات الاستخدام'}
          </h4>
          <p className="text-xs text-content-muted leading-relaxed mb-4">
            {isEn
              ? 'We use analytical cookies to measure site traffic and improve elevator engineering services. No personal data is sold.'
              : 'نستخدم ملفات تعريف الارتباط التحليلية لقياس حركة المرور وتحسين خدماتنا الهندسية. لا يتم بيع أي بيانات شخصية.'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="px-3 py-1.5 rounded-control text-xs font-semibold bg-brand-900 text-white hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              {isEn ? 'Accept' : 'موافق'}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-control text-xs font-semibold bg-surface-soft text-content-muted hover:text-content-heading hover:bg-surface-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              {isEn ? 'Decline' : 'رفض'}
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

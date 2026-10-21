import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const ScrollToTop: React.FC = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility()

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label={t('actions.scrollToTop', 'العودة إلى أعلى الصفحة')}
      title={t('actions.scrollToTop', 'العودة إلى أعلى الصفحة')}
      className={`fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-900 text-brand-400 border border-brand-400/40 shadow-elevated hover:bg-brand-800 hover:text-white hover:border-brand-400 hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-400/50 print:hidden group ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <ArrowUp
        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-1"
        aria-hidden="true"
        strokeWidth={2.5}
      />
    </button>
  )
}

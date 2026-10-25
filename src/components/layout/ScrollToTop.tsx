import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export const ScrollToTop: React.FC = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      if (docHeight > 0) {
        const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100)
        setScrollProgress(progress)
      } else {
        setScrollProgress(0)
      }

      setIsVisible(scrollTop > 60)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const strokeDashoffset = CIRCUMFERENCE - (scrollProgress / 100) * CIRCUMFERENCE

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 print:hidden ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label={t('actions.scrollToTop', 'العودة إلى أعلى الصفحة')}
        title={t('actions.scrollToTop', 'العودة إلى أعلى الصفحة')}
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-900 text-brand-400 shadow-elevated hover:bg-brand-800 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-400/50 group cursor-pointer"
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            className="stroke-brand-400/20 group-hover:stroke-brand-400/30 transition-colors duration-300"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            className="stroke-brand-400 group-hover:stroke-brand-300 transition-[stroke-dashoffset,stroke] duration-150 ease-out"
            strokeWidth="3"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp
          className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-1 relative z-10"
          aria-hidden="true"
          strokeWidth={2.5}
        />
      </button>
    </div>
  )
}



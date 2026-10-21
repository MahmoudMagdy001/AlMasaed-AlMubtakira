import React, { useState, useEffect } from 'react'
import { Phone, MessageSquare } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export const FloatingContact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isVisible) return null

  return (
    <aside
      aria-label="قنوات التواصل السريع"
      className="fixed bottom-6 start-6 z-40 flex flex-col gap-3 print:hidden"
    >
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-whatsapp text-white shadow-elevated hover:bg-whatsapp-hover hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
      >
        <MessageSquare className="w-6 h-6" aria-hidden="true" />
      </a>

      {/* Phone Call Floating Button */}
      <a
        href={`tel:${siteConfig.contact.unifiedNumber}`}
        aria-label="اتصل بنا الآن"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-900 text-white border border-brand-400/50 shadow-elevated hover:bg-brand-800 hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
      >
        <Phone className="w-5 h-5 text-brand-400" aria-hidden="true" />
      </a>
    </aside>
  )
}

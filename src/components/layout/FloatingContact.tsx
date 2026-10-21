import React from 'react'
import { Phone, MessageSquare } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export const FloatingContact: React.FC = () => {
  const settings = useSiteSettings()

  return (
    <aside
      aria-label="قنوات التواصل السريع"
      className="fixed bottom-6 start-6 z-50 flex flex-col gap-3 print:hidden"
    >
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${settings.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
      >
        <span className="absolute -top-1 -end-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
        </span>
        <MessageSquare className="w-7 h-7 text-white fill-white/10" aria-hidden="true" />
      </a>

      {/* Phone Call Floating Button */}
      <a
        href={`tel:${settings.contact.unifiedNumber}`}
        aria-label="اتصل بنا الآن"
        className="group flex items-center justify-center w-14 h-14 rounded-full bg-brand-900 text-white border-2 border-brand-400/60 shadow-xl hover:shadow-2xl hover:bg-brand-800 hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-400/50"
      >
        <Phone className="w-6 h-6 text-brand-400 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
      </a>
    </aside>
  )
}

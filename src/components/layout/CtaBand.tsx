import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Phone, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button, Container, BrandPattern } from '@/components/ui'
import { useSiteSettings } from '@/hooks/useSiteSettings'

interface CtaBandProps {
  title?: string
  subtitle?: string
  className?: string
}

export const CtaBand: React.FC<CtaBandProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const contactPath = isEn ? '/en/contact' : '/contact'

  return (
    <section
      className={`relative overflow-hidden bg-brand-900 text-white py-16 md:py-20 mb-12 sm:mb-16 md:mb-20 border-b border-brand-800 shadow-sm ${className}`}
      aria-label={title || t('home.ctaBandHeading')}
    >
      <BrandPattern opacity={0.07} />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {title || t('home.ctaBandHeading')}
          </h2>

          <p className="text-base sm:text-lg text-brand-100 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            {subtitle || t('home.ctaBandSubtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              to={contactPath}
              className="bg-brand-600 hover:bg-brand-500 shadow-md font-semibold"
              rightIcon={
                isRtl ? (
                  <ArrowLeft className="w-5 h-5" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )
              }
            >
              {t('actions.requestQuote')}
            </Button>

            <Button
              variant="inverse"
              size="lg"
              href={`tel:${settings.contact.unifiedNumber}`}
              leftIcon={<Phone className="w-5 h-5 text-brand-400" />}
              className="font-semibold"
            >
              {t('actions.callNow')}
            </Button>

            <Button
              variant="inverse"
              size="lg"
              href={`https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent(
                isEn
                  ? 'Hello, I would like to inquire about elevator services in Jeddah.'
                  : 'السلام عليكم، أود الاستفسار عن خدمات المصاعد في جدة.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<MessageSquare className="w-5 h-5 text-feedback-success" />}
              className="font-semibold"
            >
              {t('footer.mobilePhoneLabel')}
            </Button>

          </div>
        </div>
      </Container>
    </section>
  )
}

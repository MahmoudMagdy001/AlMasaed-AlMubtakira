import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { Button, Container, BrandPattern } from '@/components/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'

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
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const contactPath = isEn ? '/en/contact' : '/contact'

  const revealRef = useScrollReveal({
    selector: '[data-cta-element]',
    stagger: 0.08,
    distance: 16,
    duration: 0.45,
  })

  return (
    <section
      ref={revealRef}
      className={`relative overflow-hidden bg-brand-900 text-white py-16 md:py-20 mb-12 sm:mb-16 md:mb-20 border-b border-brand-800 shadow-sm ${className}`}
      aria-label={title || t('home.ctaBandHeading')}
    >
      <BrandPattern opacity={0.07} />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            data-cta-element
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4"
          >
            {title || t('home.ctaBandHeading')}
          </h2>

          <p
            data-cta-element
            className="text-base sm:text-lg text-brand-100 max-w-2xl mx-auto mb-8 font-normal leading-relaxed"
          >
            {subtitle || t('home.ctaBandSubtitle')}
          </p>

          <div
            data-cta-element
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              to={contactPath}
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
              to={`${contactPath}?service=consultation`}
              leftIcon={<Calendar className="w-5 h-5 text-brand-300" />}
              className="font-semibold"
            >
              {t('actions.bookConsultation')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

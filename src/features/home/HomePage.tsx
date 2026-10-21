import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  Phone,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import {
  Button,
  Container,
  Section,
  BrandPattern,
  Badge,
} from '@/components/ui'
import { Seo } from '@/components/seo/Seo'
import { siteConfig } from '@/lib/siteConfig'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  return (
    <>
      <Seo
        title={t('brand.name')}
        description={t('footer.aboutText')}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-900 text-white py-24 md:py-36">
        <BrandPattern opacity={0.08} />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge
                variant="brand"
                icon={<ShieldCheck className="w-3.5 h-3.5 text-brand-400" />}
              >
                {t('brand.accreditation')}
              </Badge>
              <span className="text-brand-300 text-xs hidden sm:inline">
                {t('brand.tagline')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white tracking-tight">
              {isEn
                ? siteConfig.company.nameEn
                : 'المصاعد المبتكرة: صيانة وتحديث وتركيب المصاعد في جدة'}
            </h1>

            <p className="text-lg sm:text-xl text-brand-100 font-normal leading-relaxed mb-8 max-w-2xl">
              {t('brand.slogan')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                to={isEn ? '/en/contact' : '/contact'}
                className="bg-brand-600 hover:bg-brand-500 shadow-md"
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
                href={`tel:${siteConfig.contact.unifiedNumber}`}
                leftIcon={<Phone className="w-5 h-5 text-brand-400" />}
              >
                {t('actions.callNow')}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* About Snapshot Section */}
      <Section variant="soft">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs md:text-sm font-semibold text-brand-600 tracking-wider uppercase mb-2 block">
              {t('footer.aboutTitle')}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-content-heading mb-4">
              {t('brand.name')}
            </h2>
            <p className="text-content-body text-base md:text-lg leading-relaxed mb-6">
              {t('footer.aboutText')}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-content-muted pt-4 border-t border-surface-border">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                {t('brand.cr')}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                {t('brand.accreditation')}
              </span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

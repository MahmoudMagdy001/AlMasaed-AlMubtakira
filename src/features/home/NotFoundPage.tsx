import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { Seo } from '@/components/seo/Seo'

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  return (
    <>
      <Seo
        title={t('notFound.pageTitle')}
        description={t('notFound.pageDescription')}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        noindex={true}
      />
      <main className="min-h-[65vh] flex items-center justify-center py-20 bg-surface-soft">
        <Container className="text-center">
          <span className="text-brand-600 font-extrabold text-7xl md:text-9xl tracking-tight block mb-4 font-mono select-none">
            {t('notFound.code')}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-content-heading mb-4">
            {t('notFound.heading')}
          </h1>
          <p className="text-content-body max-w-md mx-auto mb-8 text-base md:text-lg leading-relaxed">
            {t('notFound.description')}
          </p>
          <Button
            variant="primary"
            size="lg"
            to={isEn ? '/en' : '/'}
            className="bg-brand-600 hover:bg-brand-500 font-semibold"
            rightIcon={
              isRtl ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )
            }
          >
            {t('notFound.backHome')}
          </Button>
        </Container>
      </main>
    </>
  )
}

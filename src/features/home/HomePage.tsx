import React from 'react'
import { useTranslation } from 'react-i18next'
import { Head } from 'vite-react-ssg'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <html lang="ar" dir="rtl" />
        <title>{`${t('brand.name')} | ${t('brand.tagline')}`}</title>
        <meta
          name="description"
          content="شركة سعودية متخصصة في توريد وتركيب وصيانة وتحديث المصاعد والسلالم الكهربائية في جدة. معتمدون في الدفاع المدني."
        />
      </Head>

      <section className="relative overflow-hidden bg-brand-900 text-white py-24 md:py-32">
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-brand-400 font-medium text-sm md:text-base mb-4 tracking-wide">
              {t('brand.tagline')}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-white">
              {t('brand.name')}
            </h1>
            <p className="text-lg md:text-xl text-brand-100 font-normal leading-relaxed mb-8">
              {t('brand.slogan')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-control bg-brand-600 hover:bg-brand-500 text-white font-medium transition-colors"
              >
                {t('actions.requestQuote')}
              </a>
              <a
                href="tel:920016876"
                className="inline-flex items-center justify-center px-6 py-3 rounded-control border border-brand-400 text-brand-400 hover:bg-brand-400 hover:text-brand-900 font-medium transition-colors"
              >
                {t('actions.callNow')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface-soft">
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-content-heading mb-4">
              {t('brand.name')}
            </h2>
            <p className="text-content-body text-base md:text-lg leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-content-muted">
              <span>{t('brand.cr')}</span>
              <span>•</span>
              <span>{t('brand.accreditation')}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

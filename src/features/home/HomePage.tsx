import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'
import {
  Phone,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Sparkles,
  Layers,
  Cpu,
  Workflow,
  Clock,
  Award,
  Zap,
  Users,
  Compass,
} from 'lucide-react'
import {
  Button,
  Container,
  Section,
  SectionHeading,
  BrandPattern,
  Badge,
} from '@/components/ui'
import { CtaBand } from '@/components/layout/CtaBand'
import { Seo } from '@/components/seo/Seo'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { useWorks } from '@/hooks/useWorks'
import { usePartners } from '@/hooks/usePartners'
import { useBlogPosts } from '@/hooks/useBlog'
import { WorksSection } from './components/WorksSection'
import { PartnersSection } from './components/PartnersSection'
import { LatestPostsSection } from './components/LatestPostsSection'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const settings = useSiteSettings()
  const { data: worksData } = useWorks({ limit: 6 })
  const { data: partnersData } = usePartners()
  const { data: postsData } = useBlogPosts({
    lang: isEn ? 'en' : 'ar',
    limit: 3,
  })

  const prefix = isEn ? '/en' : ''


  // Why Us icon mapping for the 7 points from docs/02
  const whyUsIcons = [
    <Award key="0" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <ShieldCheck key="1" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <Workflow key="2" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <Zap key="3" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <Sparkles key="4" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <Users key="5" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <Clock key="6" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
  ]

  const servicesData = [
    {
      key: 'maintenance',
      icon: <Wrench className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.maintenance.title'),
      desc: t('services.maintenance.shortDesc'),
      link: `${prefix}/services/elevator-maintenance`,
    },
    {
      key: 'modernization',
      icon: <Sparkles className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.modernization.title'),
      desc: t('services.modernization.shortDesc'),
      link: `${prefix}/services/elevator-modernization`,
    },
    {
      key: 'installation',
      icon: <Layers className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.installation.title'),
      desc: t('services.installation.shortDesc'),
      link: `${prefix}/services/elevator-installation`,
    },
    {
      key: 'spareParts',
      icon: <Cpu className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.spareParts.title'),
      desc: t('services.spareParts.shortDesc'),
      link: `${prefix}/services/elevator-spare-parts`,
    },
    {
      key: 'escalators',
      icon: <Compass className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.escalators.title'),
      desc: t('services.escalators.shortDesc'),
      link: `${prefix}/services/escalators-moving-walkways`,
    },
  ]

  const whyUsPoints = (t('home.whyUsPoints', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>) || []

  const maintenanceIncluded = (t('services.maintenance.included', {
    returnObjects: true,
  }) as string[]) || []

  return (
    <>
      <Seo
        title={t('home.heroTitle')}
        description={t('footer.aboutText')}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-brand-900 text-white py-20 sm:py-28 lg:py-36">
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
              {t('home.heroTitle')}
            </h1>

            <p className="text-lg sm:text-xl text-brand-100 font-normal leading-relaxed mb-8 max-w-2xl">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button
                variant="primary"
                size="lg"
                to={`${prefix}/contact`}
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
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-brand-200">
              <span>{t('home.heroBadges')}</span>
              <span>•</span>
              <span>{t('common.cityJeddah')}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. About Snapshot Section */}
      <Section variant="white" className="border-b border-surface-border">
        <Container>
          <div className="max-w-4xl">
            <span className="text-xs md:text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3 block">
              {t('home.aboutEyebrow')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-content-heading mb-5 leading-snug">
              {t('home.aboutHeading')}
            </h2>
            <p className="text-content-body text-base sm:text-lg leading-relaxed mb-8">
              {t('home.aboutText')}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-surface-border">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-content-muted">
                <span className="inline-flex items-center gap-1.5 font-medium text-content-body">
                  <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                  {t('brand.cr')}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-content-body">
                  <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                  {t('brand.accreditation')}
                </span>
              </div>

              <Link
                to={`${prefix}/about`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <span>{t('home.aboutLink')}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Services Section */}
      <Section variant="soft" className="border-b border-surface-border">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              kicker={t('home.servicesEyebrow')}
              title={t('home.servicesHeading')}
              intro={t('home.servicesSubtitle')}
              className="max-w-2xl"
            />
            <Link
              to={`${prefix}/services`}
              className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-semibold text-sm mt-4 md:mt-0 transition-colors"
            >
              <span>{t('actions.viewAllServices')}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(0, 3).map((item) => (
              <article
                key={item.key}
                className="bg-white p-7 rounded-card border border-surface-border hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-control bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-content-heading mb-3 group-hover:text-brand-600 transition-colors">
                    <Link to={item.link}>{item.title}</Link>
                  </h3>
                  <p className="text-content-body text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700 pt-4 border-t border-surface-border"
                >
                  <span>{t('services.cardLearnMore')}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Link>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {servicesData.slice(3).map((item) => (
              <article
                key={item.key}
                className="bg-white p-7 rounded-card border border-surface-border hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-control bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-content-heading mb-3 group-hover:text-brand-600 transition-colors">
                    <Link to={item.link}>{item.title}</Link>
                  </h3>
                  <p className="text-content-body text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700 pt-4 border-t border-surface-border"
                >
                  <span>{t('services.cardLearnMore')}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Why Choose Us Section */}
      <Section variant="white" className="border-b border-surface-border">
        <Container>
          <SectionHeading
            kicker={t('home.whyUsEyebrow')}
            title={t('home.whyUsHeading')}
            intro={
              isEn
                ? 'Engineering standards and operational practices designed to safeguard your equipment and building occupants.'
                : 'معايير هندسية ومنهجية عمل تضمن أعلى مستويات الجودة والسلامة لتشغيل مصاعد مبناك.'
            }
            align="center"
            className="max-w-2xl mx-auto mb-16"
          />


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsPoints.map((point, index) => (
              <div
                key={index}
                className="p-6 rounded-card border border-surface-border bg-surface-subtle/50 flex flex-col"
              >
                <div className="w-10 h-10 rounded-control bg-white border border-surface-border flex items-center justify-center mb-4 shadow-sm">
                  {whyUsIcons[index % whyUsIcons.length]}
                </div>
                <h3 className="text-base font-bold text-content-heading mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-content-body leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Maintenance & Modernization Details */}
      <Section variant="soft" className="border-b border-surface-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs md:text-sm font-semibold text-brand-600 tracking-wider uppercase mb-2 block">
                {t('home.maintenanceEyebrow')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-content-heading mb-4">
                {t('home.maintenanceHeading')}
              </h2>
              <p className="text-content-body text-base leading-relaxed mb-8">
                {t('home.maintenanceSubtitle')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {maintenanceIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 bg-white rounded-control border border-surface-border text-sm font-medium text-content-body shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-brand-900 text-white p-8 rounded-card relative overflow-hidden shadow-card">
              <BrandPattern opacity={0.08} />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider block mb-2">
                  {t('services.modernization.title')}
                </span>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('home.modernizationBoxTitle')}
                </h3>
                <p className="text-sm text-brand-100 leading-relaxed mb-8">
                  {t('home.modernizationBoxText')}
                </p>
                <Button
                  variant="primary"
                  to={`${prefix}/services/elevator-modernization`}
                  className="bg-brand-500 hover:bg-brand-400 text-white font-semibold"
                  rightIcon={
                    isRtl ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                >
                  {t('home.modernizationBoxCta')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Works Section (hidden when empty) */}
      <WorksSection works={worksData?.works} />

      {/* 7. Partners Section (hidden when empty) */}
      <PartnersSection partners={partnersData} />

      {/* 8. Latest Posts Section (hidden when empty) */}
      <LatestPostsSection posts={postsData?.posts} />


      {/* 9. CTA Band */}
      <CtaBand />
    </>
  )
}

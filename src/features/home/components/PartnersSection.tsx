import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Container, Section, SectionHeading, ResponsiveImage } from '@/components/ui'
import type { PartnerWithLogo } from '@/services/partnersService'

interface PartnersSectionProps {
  partners?: PartnerWithLogo[] | null
  variant?: 'white' | 'soft'
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  partners,
  variant = 'soft',
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')

  // Hidden when empty as mandated in docs/02 and docs/10
  if (!partners || partners.length === 0) {
    return null
  }

  // Duplicate items for continuous uninterrupted infinite marquee loop
  const displayPartners = [...partners, ...partners, ...partners, ...partners]
  const isSoft = variant === 'soft'

  return (
    <Section variant={variant} className="overflow-hidden">
      <Container>
        <SectionHeading
          kicker={t('home.partnersEyebrow')}
          title={t('home.partnersHeading')}
          intro={t('home.partnersSubtitle')}
          align="center"
          className="max-w-2xl mx-auto mb-14"
        />

        {/* Infinite Marquee Track */}
        <div className="relative w-full overflow-hidden py-4" dir="ltr">
          {/* Edge fade gradients for polished studio look */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 ${
              isSoft
                ? 'bg-gradient-to-r from-[#f4f7fb] to-transparent'
                : 'bg-gradient-to-r from-white to-transparent'
            }`}
            aria-hidden="true"
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 ${
              isSoft
                ? 'bg-gradient-to-l from-[#f4f7fb] to-transparent'
                : 'bg-gradient-to-l from-white to-transparent'
            }`}
            aria-hidden="true"
          />

          {/* Scrolling track */}
          <div
            className="flex gap-6 sm:gap-8 animate-marquee w-max py-4 items-center select-none"
            style={{ animation: 'marquee 28s linear infinite' }}
          >
            {displayPartners.map((partner, index) => {
              const name = isEn && partner.name_en ? partner.name_en : partner.name_ar

              const cardContent = (
                <div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-surface-border overflow-hidden flex items-center justify-center shadow-xs transition-all duration-300 transform hover:scale-[1.15] hover:border-brand-500 hover:shadow-card hover:z-20 cursor-pointer group flex-shrink-0 relative"
                  title={name}
                >
                  {partner.logo_media ? (
                    <ResponsiveImage
                      media={partner.logo_media}
                      alt={name}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      sizes="128px"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm font-semibold text-content-body text-center line-clamp-2 px-3 group-hover:text-brand-600 transition-colors">
                      {name}
                    </span>
                  )}
                </div>
              )

              if (partner.website_url) {
                return (
                  <a
                    key={`${partner.id}-${index}`}
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener nofollow"
                    className="block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    {cardContent}
                  </a>
                )
              }

              return (
                <div key={`${partner.id}-${index}`} className="block rounded-full">
                  {cardContent}
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

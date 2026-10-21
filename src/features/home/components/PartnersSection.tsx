import React from 'react'
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
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')

  // Hidden when empty as mandated in docs/02 and docs/10
  if (!partners || partners.length === 0) {
    return null
  }

  return (
    <Section variant={variant}>
      <Container>
        <SectionHeading
          kicker={isEn ? 'Our Partners' : 'شركاء النجاح'}
          title={isEn ? 'Partners in Success' : 'شركاء النجاح'}
          intro={
            isEn
              ? 'They are the foundation upon which we build our excellence at Al-Masaed Al-Mubtakirah — our enduring trust and strength.'
              : 'هم الأساس الذي نبني عليه تميزنا في المصاعد المبتكرة، فهم ثقتنا الممتدة وقوة استمراريتنا.'
          }
          align="center"
          className="max-w-2xl mx-auto mb-12"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner) => {
            const name = isEn && partner.name_en ? partner.name_en : partner.name_ar

            const cardContent = (
              <div
                className="bg-white p-5 rounded-card border border-surface-border flex items-center justify-center h-24 hover:border-brand-400 hover:shadow-xs transition-all duration-300 group"
                title={name}
              >
                {partner.logo_media ? (
                  <ResponsiveImage
                    media={partner.logo_media}
                    alt={name}
                    className="max-h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="160px"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-semibold text-content-body text-center line-clamp-2">
                    {name}
                  </span>
                )}
              </div>
            )

            if (partner.website_url) {
              return (
                <a
                  key={partner.id}
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-card"
                >
                  {cardContent}
                </a>
              )
            }

            return <div key={partner.id}>{cardContent}</div>
          })}
        </div>
      </Container>
    </Section>
  )
}

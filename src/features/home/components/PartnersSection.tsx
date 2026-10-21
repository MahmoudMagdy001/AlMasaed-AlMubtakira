import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Section, SectionHeading } from '@/components/ui'
import type { Tables } from '@/types/database.types'

interface PartnersSectionProps {
  partners?: Tables<'partners'>[] | null
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ partners }) => {
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')

  // Hidden when empty as mandated in docs/02 and docs/10
  if (!partners || partners.length === 0) {
    return null
  }

  return (
    <Section variant="soft">
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
            const name =
              isEn && partner.name_en ? partner.name_en : partner.name_ar

            return (
              <div
                key={partner.id}
                className="bg-white p-6 rounded-card border border-surface-border flex items-center justify-center h-24 hover:border-brand-300 transition-colors"
                title={name}
              >
                <span className="text-sm font-semibold text-content-body text-center">
                  {name}
                </span>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

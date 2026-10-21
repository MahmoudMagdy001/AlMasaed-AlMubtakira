import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container, Section, SectionHeading } from '@/components/ui'
import type { WorkWithCover } from '@/services/worksService'
import { WorkCard } from '@/features/works/components/WorkCard'

interface WorksSectionProps {
  works?: WorkWithCover[] | null
}

export const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  // If no published works, omit the section completely (as mandated in docs/02 and docs/10)
  if (!works || works.length === 0) {
    return null
  }

  const prefix = isEn ? '/en' : ''

  return (
    <Section variant="white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            kicker={t('nav.works')}
            title={isEn ? 'Selected Projects' : 'أعمال ومشاريع مختارة'}
            intro={
              isEn
                ? 'A selection of our elevator installations, modernizations, and maintenance projects in Jeddah.'
                : 'نماذج من مشاريعنا في تركيب وتحديث وصيانة المصاعد والسلالم الكهربائية في مدينة جدة.'
            }
          />
          <Link
            to={`${prefix}/works`}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors"
          >
            <span>{t('actions.viewWorks')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.slice(0, 6).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

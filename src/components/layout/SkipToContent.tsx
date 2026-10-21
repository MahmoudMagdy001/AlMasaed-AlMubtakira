import React from 'react'
import { useTranslation } from 'react-i18next'

export const SkipToContent: React.FC = () => {
  const { t } = useTranslation()

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-900 focus:text-white focus:rounded-control focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-brand-400"
    >
      {t('actions.skipToContent')}
    </a>
  )
}

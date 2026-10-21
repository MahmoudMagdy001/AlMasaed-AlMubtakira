import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './ar.json'
import en from './en.json'

export const defaultNS = 'common'
export const resources = {
  ar: { common: ar },
  en: { common: en },
} as const

i18n.use(initReactI18next).init({
  lng: 'ar',
  fallbackLng: 'ar',
  defaultNS: 'common',
  resources,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

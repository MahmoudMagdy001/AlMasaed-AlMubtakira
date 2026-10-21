import { supabase } from '@/lib/supabase'
import { siteConfig, type SiteConfig } from '@/lib/siteConfig'

// In-memory cache for fast synchronous access
let cachedSettings: SiteConfig = siteConfig

export async function fetchSiteSettings(): Promise<SiteConfig> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')

    if (error || !data || data.length === 0) {
      return cachedSettings
    }

    const settingsMap: Record<string, unknown> = {}
    for (const row of data) {
      settingsMap[row.key] = row.value
    }

    const companyData = (settingsMap['company'] || {}) as Record<string, string | null>
    const contactData = (settingsMap['contact'] || {}) as Record<string, unknown>
    const socialData = (settingsMap['social'] || {}) as Record<string, string | null>
    const taxData = (settingsMap['tax'] || {}) as Record<string, string | null>

    const phones = Array.isArray(contactData.phones)
      ? (contactData.phones as string[])
      : siteConfig.contact.phones

    const unifiedNumber =
      (typeof contactData.unified_number === 'string' && contactData.unified_number) ||
      siteConfig.contact.unifiedNumber

    const whatsapp =
      (typeof contactData.whatsapp === 'string' && contactData.whatsapp) ||
      siteConfig.contact.whatsapp

    const mergedSettings: SiteConfig = {
      company: {
        nameAr: companyData.name_ar || siteConfig.company.nameAr,
        nameEn: companyData.name_en || siteConfig.company.nameEn,
        sloganAr: companyData.slogan_ar || siteConfig.company.sloganAr,
        sloganEn: siteConfig.company.sloganEn,
        taglineAr: siteConfig.company.taglineAr,
        taglineEn: siteConfig.company.taglineEn,
        crNumber: companyData.cr_number || siteConfig.company.crNumber,
        accreditationAr: siteConfig.company.accreditationAr,
        accreditationEn: siteConfig.company.accreditationEn,
        domain: siteConfig.company.domain,
      },
      contact: {
        phones,
        phoneDisplay: phones.map((p) => {
          if (p === '+966124231773') return '+966 12 423 1773'
          if (p === '+966559557459') return '+966 55 955 7459'
          return p
        }),
        whatsapp,
        whatsappDisplay: '+966 55 955 7459',
        unifiedNumber,
        unifiedDisplay:
          unifiedNumber.length === 9
            ? `${unifiedNumber[0]} ${unifiedNumber.slice(1, 5)} ${unifiedNumber.slice(5)}`
            : unifiedNumber,
        email: (typeof contactData.email === 'string' && contactData.email) || siteConfig.contact.email,
        cityAr: companyData.city_ar || siteConfig.contact.cityAr,
        cityEn: companyData.city_en || siteConfig.contact.cityEn,
        addressAr: (contactData.address_ar as string | null) ?? null,
        addressEn: (contactData.address_en as string | null) ?? null,
        workingHoursAr: (contactData.working_hours_ar as string | null) ?? null,
        workingHoursEn: (contactData.working_hours_en as string | null) ?? null,
        mapUrl: (contactData.map_url as string | null) ?? null,
      },
      social: {
        instagram: socialData.instagram ?? null,
        tiktok: socialData.tiktok ?? null,
        x: socialData.x ?? null,
        linkedin: socialData.linkedin ?? null,
        snapchat: socialData.snapchat ?? null,
      },
      tax: {
        vatNumber: taxData.vat_number ?? null,
      },
    }

    cachedSettings = mergedSettings
    return mergedSettings
  } catch {
    // In SSR without network or if remote Supabase is unreachable, return fallback siteConfig
    return cachedSettings
  }
}

export function getCachedSiteSettings(): SiteConfig {
  return cachedSettings
}

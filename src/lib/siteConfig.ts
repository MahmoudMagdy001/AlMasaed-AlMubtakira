export interface SiteConfig {
  company: {
    nameAr: string
    nameEn: string
    sloganAr: string
    sloganEn: string
    taglineAr: string
    taglineEn: string
    crNumber: string
    accreditationAr: string
    accreditationEn: string
    domain: string
  }
  contact: {
    phones: string[]
    phoneDisplay: string[]
    whatsapp: string
    whatsappDisplay: string
    unifiedNumber: string
    unifiedDisplay: string
    email: string
    cityAr: string
    cityEn: string
    addressAr: string | null
    addressEn: string | null
    shortAddress?: string | null
    workingHoursAr: string | null
    workingHoursEn: string | null
    mapUrl: string | null
  }
  social: {
    instagram: string | null
    tiktok: string | null
    x: string | null
    linkedin: string | null
    snapchat: string | null
  }
  tax: {
    vatNumber: string | null
  }
}

export const siteConfig: SiteConfig = {
  company: {
    nameAr: 'شركة المصاعد المبتكرة',
    nameEn: 'Al-Masaed Al-Mubtakirah Company',
    sloganAr: 'ابتكار يرتفع بك',
    sloganEn: 'Innovation that elevates you',
    taglineAr: 'صيانة – تحديث – تركيب – قطع غيار',
    taglineEn: 'Maintenance – Modernization – Installation – Spare Parts',
    crNumber: '4030227058',
    accreditationAr: 'معتمدين في الدفاع المدني',
    accreditationEn: 'Civil Defense Accredited',
    domain: 'almubtakirah.com',
  },
  contact: {
    phones: ['+966124231773', '+966559557459'],
    phoneDisplay: ['+966 12 423 1773', '+966 55 955 7459'],
    whatsapp: '966559557459',
    whatsappDisplay: '+966 55 955 7459',
    unifiedNumber: '920016876',
    unifiedDisplay: '9 2001 6876',
    email: 'info@almubtakirah.com',
    cityAr: 'جدة',
    cityEn: 'Jeddah',
    addressAr: 'جدة - حي السلامة - شارع نهضة الشرق (مبنى 2523)',
    addressEn: 'Nahdah East St., As Salamah Dist., Bldg 2523, Jeddah',
    shortAddress: 'JESA2523',
    workingHoursAr: null,
    workingHoursEn: null,
    mapUrl: null,
  },
  social: {
    instagram: 'https://www.instagram.com/almasaed_almubtakirah',
    tiktok: 'https://www.tiktok.com/@almubtakirah',
    x: null,
    linkedin: null,
    snapchat: 'https://www.snapchat.com/add/almubtakirah4',
  },
  tax: {
    vatNumber: null,
  },
}

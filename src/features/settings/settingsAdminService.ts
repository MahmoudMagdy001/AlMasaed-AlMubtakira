import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import type { MediaItem } from '@/components/ui'
import { requestRebuild } from '@/lib/rebuild'
import { siteConfig } from '@/lib/siteConfig'

/**
 * Normalizes phone numbers to standard E.164 format (+966...).
 */
export function normalizePhoneToE164(phone: string): string {
  const trimmed = phone.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('+')) {
    return '+' + trimmed.replace(/\D/g, '')
  }
  const digits = trimmed.replace(/\D/g, '')
  if (digits.startsWith('966')) {
    return `+${digits}`
  }
  if (digits.startsWith('0')) {
    return `+966${digits.slice(1)}`
  }
  if (digits.length === 9 && digits.startsWith('5')) {
    return `+966${digits}`
  }
  return `+${digits}`
}

export const settingsFormSchema = z.object({
  // Company Information
  company_name_ar: z.string().min(2, 'اسم الشركة بالعربية مطلوب'),
  company_name_en: z.string().optional().nullable(),
  slogan_ar: z.string().optional().nullable(),
  cr_number: z.string().min(5, 'رقم السجل التجاري مطلوب (10 أرقام)').max(15, 'رقم السجل التجاري غير صحيح'),
  vat_number: z.string().max(20, 'الرقم الضريبي غير صحيح').optional().nullable(),
  city_ar: z.string().default('جدة'),
  city_en: z.string().default('Jeddah'),

  // Contact Information
  phones: z.array(z.string()).min(1, 'يجب إدخال رقم هاتف واحد على الأقل'),
  whatsapp: z.string().min(8, 'رقم الواتساب مطلوب'),
  unified_number: z.string().default('920000000'),
  email: z.string().email('صيغة البريد الإلكتروني غير صحيحة'),
  address_ar: z.string().optional().nullable(),
  address_en: z.string().optional().nullable(),
  working_hours_ar: z.string().optional().nullable(),
  working_hours_en: z.string().optional().nullable(),
  map_url: z.string().url('رابط خريطة قوقل غير صحيح').or(z.literal('')).optional().nullable(),

  // Social Media
  instagram_url: z.string().url('الرابط غير صحيح').or(z.literal('')).optional().nullable(),
  tiktok_url: z.string().url('الرابط غير صحيح').or(z.literal('')).optional().nullable(),
  x_url: z.string().url('الرابط غير صحيح').or(z.literal('')).optional().nullable(),
  linkedin_url: z.string().url('الرابط غير صحيح').or(z.literal('')).optional().nullable(),
  snapchat_url: z.string().url('الرابط غير صحيح').or(z.literal('')).optional().nullable(),

  // Default SEO & OG Image
  default_seo_title_ar: z.string().max(80, 'عنوان الصفحة الرئيسي يجب ألا يتجاوز 80 حرفاً').optional().nullable(),
  default_seo_description_ar: z.string().max(200, 'الوصف التعريفي يجب ألا يتجاوز 200 حرفاً').optional().nullable(),
  default_og_media_id: z.string().uuid().optional().nullable(),

  // Analytics (disabled, labeled as coming soon)
  gtm_id: z.string().optional().nullable(),
  ga4_id: z.string().optional().nullable(),
  meta_pixel_id: z.string().optional().nullable(),
})

export type SettingsFormData = z.infer<typeof settingsFormSchema>

export interface AdminSettingsData extends SettingsFormData {
  default_og_media?: MediaItem | null
}

export async function getAdminSettings(): Promise<AdminSettingsData> {
  const { data, error } = await supabase.from('site_settings').select('key, value')

  if (error) {
    throw new Error(`فشل جلب إعدادات الموقع: ${error.message}`)
  }

  const map: Record<string, unknown> = {}
  for (const row of data || []) {
    map[row.key] = row.value
  }

  const company = (map['company'] || {}) as Record<string, string | null>
  const contact = (map['contact'] || {}) as Record<string, unknown>
  const social = (map['social'] || {}) as Record<string, string | null>
  const tax = (map['tax'] || {}) as Record<string, string | null>
  const seo = (map['seo'] || {}) as Record<string, string | null>
  const analytics = (map['analytics'] || {}) as Record<string, string | null>

  const rawPhones = Array.isArray(contact.phones)
    ? (contact.phones as string[])
    : siteConfig.contact.phones

  const defaultOgMediaId = seo.default_og_media_id || null
  let defaultOgMedia: MediaItem | null = null

  if (defaultOgMediaId) {
    const { data: mediaRow } = await supabase
      .from('media')
      .select('id, storage_path, width, height, alt_text, variants')
      .eq('id', defaultOgMediaId)
      .maybeSingle()

    if (mediaRow) {
      defaultOgMedia = mediaRow as unknown as MediaItem
    }
  }

  return {
    company_name_ar: company.name_ar || siteConfig.company.nameAr,
    company_name_en: company.name_en || siteConfig.company.nameEn,
    slogan_ar: company.slogan_ar || siteConfig.company.sloganAr,
    cr_number: company.cr_number || siteConfig.company.crNumber,
    vat_number: tax.vat_number || '310000000000003',
    city_ar: company.city_ar || siteConfig.contact.cityAr,
    city_en: company.city_en || siteConfig.contact.cityEn,

    phones: rawPhones.length > 0 ? rawPhones : siteConfig.contact.phones,
    whatsapp: (contact.whatsapp as string) || siteConfig.contact.whatsapp,
    unified_number: (contact.unified_number as string) || siteConfig.contact.unifiedNumber,
    email: (contact.email as string) || siteConfig.contact.email,
    address_ar: (contact.address_ar as string) || 'جدة، المملكة العربية السعودية',
    address_en: (contact.address_en as string) || 'Jeddah, Kingdom of Saudi Arabia',
    working_hours_ar: (contact.working_hours_ar as string) || 'السبت - الخميس: 8:00 ص - 6:00 م | الطوارئ 24/7',
    working_hours_en: (contact.working_hours_en as string) || 'Sat - Thu: 8:00 AM - 6:00 PM | Emergency 24/7',
    map_url: (contact.map_url as string) || '',

    instagram_url: social.instagram || '',
    tiktok_url: social.tiktok || '',
    x_url: social.x || '',
    linkedin_url: social.linkedin || '',
    snapchat_url: social.snapchat || '',

    default_seo_title_ar: seo.default_title_ar || 'شركة المصاعد المبتكرة | توريد وصيانة وتحديث المصاعد في جدة',
    default_seo_description_ar:
      seo.default_description_ar ||
      'شركة المصاعد المبتكرة بجدة - معتمدة من الدفاع المدني وسابر والمركز السعودي للاعتماد. صيانة دورية، قطع غيار أصلية، وطوارئ 24/7.',
    default_og_media_id: defaultOgMediaId,
    default_og_media: defaultOgMedia,

    gtm_id: analytics.gtm_id || '',
    ga4_id: analytics.ga4_id || '',
    meta_pixel_id: analytics.meta_pixel_id || '',
  }
}

export async function saveAdminSettings(formData: SettingsFormData): Promise<void> {
  const parsed = settingsFormSchema.parse(formData)

  // Normalize phones to E.164
  const normalizedPhones = parsed.phones
    .map((p) => normalizePhoneToE164(p))
    .filter(Boolean)

  const normalizedWhatsapp = normalizePhoneToE164(parsed.whatsapp)

  const updates = [
    {
      key: 'company',
      value: {
        name_ar: parsed.company_name_ar,
        name_en: parsed.company_name_en || null,
        slogan_ar: parsed.slogan_ar || null,
        cr_number: parsed.cr_number,
        city_ar: parsed.city_ar,
        city_en: parsed.city_en,
      },
      updated_at: new Date().toISOString(),
    },
    {
      key: 'contact',
      value: {
        phones: normalizedPhones,
        whatsapp: normalizedWhatsapp,
        unified_number: parsed.unified_number,
        email: parsed.email,
        address_ar: parsed.address_ar || null,
        address_en: parsed.address_en || null,
        working_hours_ar: parsed.working_hours_ar || null,
        working_hours_en: parsed.working_hours_en || null,
        map_url: parsed.map_url || null,
      },
      updated_at: new Date().toISOString(),
    },
    {
      key: 'social',
      value: {
        instagram: parsed.instagram_url || null,
        tiktok: parsed.tiktok_url || null,
        x: parsed.x_url || null,
        linkedin: parsed.linkedin_url || null,
        snapchat: parsed.snapchat_url || null,
      },
      updated_at: new Date().toISOString(),
    },
    {
      key: 'tax',
      value: {
        vat_number: parsed.vat_number || null,
      },
      updated_at: new Date().toISOString(),
    },
    {
      key: 'seo',
      value: {
        default_title_ar: parsed.default_seo_title_ar || null,
        default_description_ar: parsed.default_seo_description_ar || null,
        default_og_media_id: parsed.default_og_media_id || null,
      },
      updated_at: new Date().toISOString(),
    },
    {
      key: 'analytics',
      value: {
        gtm_id: parsed.gtm_id || null,
        ga4_id: parsed.ga4_id || null,
        meta_pixel_id: parsed.meta_pixel_id || null,
        status: 'disabled_until_phase_10',
      },
      updated_at: new Date().toISOString(),
    },
  ]

  const { error } = await supabase.from('site_settings').upsert(updates, { onConflict: 'key' })

  if (error) {
    throw new Error(`فشل حفظ إعدادات الموقع: ${error.message}`)
  }

  await requestRebuild('update-site-settings')
}

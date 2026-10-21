import React, { useState, useEffect } from 'react'
import {
  Building2,
  Phone,
  Share2,
  Search,
  BarChart3,
  Save,
  ShieldAlert,
  Image as ImageIcon,
  Plus,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import { PageHeader, FormField, MediaPicker } from '@/components/admin'
import { Button, useToast } from '@/components/ui'
import { useAuth } from '@/features/auth'
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning'
import {
  useAdminSiteSettings,
  useUpdateSiteSettings,
} from '@/features/settings/useAdminSettings'
import {
  settingsFormSchema,
  normalizePhoneToE164,
  type SettingsFormData,
} from '@/features/settings/settingsAdminService'
import type { MediaRow } from '@/features/media/types'
import { getStoragePublicUrl } from '@/lib/media'
import { REBUILD_NOTICE } from '@/lib/rebuild'

type TabType = 'company' | 'contact' | 'social' | 'seo' | 'analytics'

export const SettingsPage: React.FC = () => {
  const { isAdmin } = useAuth()
  const { success, error: toastError } = useToast()

  const { data: settings, isLoading } = useAdminSiteSettings()
  const updateMutation = useUpdateSiteSettings()

  const [activeTab, setActiveTab] = useState<TabType>('company')
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form Fields
  const [companyNameAr, setCompanyNameAr] = useState('')
  const [companyNameEn, setCompanyNameEn] = useState('')
  const [sloganAr, setSloganAr] = useState('')
  const [crNumber, setCrNumber] = useState('')
  const [vatNumber, setVatNumber] = useState('')
  const [cityAr, setCityAr] = useState('جدة')
  const [cityEn, setCityEn] = useState('Jeddah')

  const [phones, setPhones] = useState<string[]>(['+966124231773'])
  const [newPhoneInput, setNewPhoneInput] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [unifiedNumber, setUnifiedNumber] = useState('')
  const [email, setEmail] = useState('')
  const [addressAr, setAddressAr] = useState('')
  const [addressEn, setAddressEn] = useState('')
  const [workingHoursAr, setWorkingHoursAr] = useState('')
  const [workingHoursEn, setWorkingHoursEn] = useState('')
  const [mapUrl, setMapUrl] = useState('')

  const [instagramUrl, setInstagramUrl] = useState('')
  const [tiktokUrl, setTiktokUrl] = useState('')
  const [xUrl, setXUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [snapchatUrl, setSnapchatUrl] = useState('')

  const [defaultSeoTitleAr, setDefaultSeoTitleAr] = useState('')
  const [defaultSeoDescriptionAr, setDefaultSeoDescriptionAr] = useState('')
  const [defaultOgMediaId, setDefaultOgMediaId] = useState<string | null>(null)
  const [defaultOgMediaUrl, setDefaultOgMediaUrl] = useState<string | null>(null)

  const [gtmId, setGtmId] = useState('')
  const [ga4Id, setGa4Id] = useState('')
  const [metaPixelId, setMetaPixelId] = useState('')

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)

  useUnsavedChangesWarning(isDirty)

  useEffect(() => {
    if (settings) {
      setCompanyNameAr(settings.company_name_ar)
      setCompanyNameEn(settings.company_name_en || '')
      setSloganAr(settings.slogan_ar || '')
      setCrNumber(settings.cr_number)
      setVatNumber(settings.vat_number || '')
      setCityAr(settings.city_ar)
      setCityEn(settings.city_en)

      setPhones(settings.phones)
      setWhatsapp(settings.whatsapp)
      setUnifiedNumber(settings.unified_number)
      setEmail(settings.email)
      setAddressAr(settings.address_ar || '')
      setAddressEn(settings.address_en || '')
      setWorkingHoursAr(settings.working_hours_ar || '')
      setWorkingHoursEn(settings.working_hours_en || '')
      setMapUrl(settings.map_url || '')

      setInstagramUrl(settings.instagram_url || '')
      setTiktokUrl(settings.tiktok_url || '')
      setXUrl(settings.x_url || '')
      setLinkedinUrl(settings.linkedin_url || '')
      setSnapchatUrl(settings.snapchat_url || '')

      setDefaultSeoTitleAr(settings.default_seo_title_ar || '')
      setDefaultSeoDescriptionAr(settings.default_seo_description_ar || '')
      setDefaultOgMediaId(settings.default_og_media_id || null)
      if (settings.default_og_media?.storage_path) {
        setDefaultOgMediaUrl(getStoragePublicUrl(settings.default_og_media.storage_path))
      } else {
        setDefaultOgMediaUrl(null)
      }

      setGtmId(settings.gtm_id || '')
      setGa4Id(settings.ga4_id || '')
      setMetaPixelId(settings.meta_pixel_id || '')
      setIsDirty(false)
    }
  }, [settings])

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-card border border-feedback-error/20 p-12 text-center max-w-xl mx-auto space-y-4">
        <ShieldAlert className="w-12 h-12 text-feedback-error mx-auto" />
        <h2 className="text-base font-bold text-content-heading">
          غير مصرح لك بالوصول إلى هذه الصفحة
        </h2>
        <p className="text-xs text-content-muted leading-relaxed">
          إعدادات الموقع ومعلومات الشركة الحساسة متاحة فقط للمستخدمين بصلاحية مسؤول النظام (Admin).
        </p>
      </div>
    )
  }

  const handleAddPhone = () => {
    if (!newPhoneInput.trim()) return
    const normalized = normalizePhoneToE164(newPhoneInput)
    if (!phones.includes(normalized)) {
      setPhones([...phones, normalized])
      setNewPhoneInput('')
      setIsDirty(true)
    }
  }

  const handleRemovePhone = (index: number) => {
    if (phones.length <= 1) {
      toastError('يجب الإبقاء على رقم هاتف واحد على الأقل')
      return
    }
    setPhones(phones.filter((_, i) => i !== index))
    setIsDirty(true)
  }

  const handleSelectOgMedia = (selected: MediaRow | MediaRow[]) => {
    const item = Array.isArray(selected) ? selected[0] : selected
    if (!item) return
    setDefaultOgMediaId(item.id)
    setDefaultOgMediaUrl(getStoragePublicUrl(item.storage_path))
    setIsMediaPickerOpen(false)
    setIsDirty(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const payload: SettingsFormData = {
      company_name_ar: companyNameAr.trim(),
      company_name_en: companyNameEn.trim() || null,
      slogan_ar: sloganAr.trim() || null,
      cr_number: crNumber.trim(),
      vat_number: vatNumber.trim() || null,
      city_ar: cityAr.trim(),
      city_en: cityEn.trim(),

      phones: phones.map(normalizePhoneToE164).filter(Boolean),
      whatsapp: normalizePhoneToE164(whatsapp),
      unified_number: unifiedNumber.trim(),
      email: email.trim(),
      address_ar: addressAr.trim() || null,
      address_en: addressEn.trim() || null,
      working_hours_ar: workingHoursAr.trim() || null,
      working_hours_en: workingHoursEn.trim() || null,
      map_url: mapUrl.trim() || null,

      instagram_url: instagramUrl.trim() || null,
      tiktok_url: tiktokUrl.trim() || null,
      x_url: xUrl.trim() || null,
      linkedin_url: linkedinUrl.trim() || null,
      snapchat_url: snapchatUrl.trim() || null,

      default_seo_title_ar: defaultSeoTitleAr.trim() || null,
      default_seo_description_ar: defaultSeoDescriptionAr.trim() || null,
      default_og_media_id: defaultOgMediaId || null,

      gtm_id: gtmId.trim() || null,
      ga4_id: ga4Id.trim() || null,
      meta_pixel_id: metaPixelId.trim() || null,
    }

    const validation = settingsFormSchema.safeParse(payload)
    if (!validation.success) {
      const errMap: Record<string, string> = {}
      for (const err of validation.error.errors) {
        if (err.path[0]) {
          errMap[err.path[0] as string] = err.message
        }
      }
      setErrors(errMap)
      toastError('يرجى مراجعة وتصحيح الأخطاء في الإعدادات')
      return
    }

    try {
      await updateMutation.mutateAsync(payload)
      setIsDirty(false)
      success('تم حفظ إعدادات الموقع بنجاح', REBUILD_NOTICE)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ الإعدادات', msg)
    }
  }

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'company', label: 'بيانات الشركة والسجل', icon: Building2 },
    { id: 'contact', label: 'بيانات الاتصال والعنوان', icon: Phone },
    { id: 'social', label: 'حسابات التواصل', icon: Share2 },
    { id: 'seo', label: 'محركات البحث والوسائط', icon: Search },
    { id: 'analytics', label: 'أدوات التحليل', icon: BarChart3 },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PageHeader
        title="إعدادات الموقع العامة"
        description="إدارة معلومات الشركة الرسمية، أرقام التواصل الموحدة، وحسابات التواصل الاجتماعي."
        backTo="/admin"
        backLabel="الرئيسية"
        actions={
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={updateMutation.isPending}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ الإعدادات</span>
          </Button>
        }
      />

      {/* Tabs navigation */}
      <div className="flex border-b border-surface-border bg-white rounded-t-card px-4 pt-2 overflow-x-auto gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-content-muted hover:text-content-heading'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white p-6 rounded-b-card border border-t-0 border-surface-border shadow-xs">
        {isLoading ? (
          <div className="p-12 text-center text-content-muted text-sm">
            جاري تحميل الإعدادات...
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl">
            {/* TAB 1: COMPANY */}
            {activeTab === 'company' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="اسم الشركة الرسمي (بالعربية)"
                    required
                    error={errors.company_name_ar}
                  >
                    <input
                      type="text"
                      value={companyNameAr}
                      onChange={(e) => {
                        setCompanyNameAr(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>

                  <FormField
                    label="اسم الشركة (بالإنجليزية)"
                    optional
                    error={errors.company_name_en}
                  >
                    <input
                      type="text"
                      dir="ltr"
                      value={companyNameEn}
                      onChange={(e) => {
                        setCompanyNameEn(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>
                </div>

                <FormField
                  label="الشعار اللفظي (Slogan بالعربية)"
                  optional
                  error={errors.slogan_ar}
                >
                  <input
                    type="text"
                    value={sloganAr}
                    onChange={(e) => {
                      setSloganAr(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="شريكك الموثوق في عالم المصاعد والسلالم الكهربائية"
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <FormField
                    label="رقم السجل التجاري (CR Number)"
                    required
                    error={errors.cr_number}
                  >
                    <input
                      type="text"
                      dir="ltr"
                      value={crNumber}
                      onChange={(e) => {
                        setCrNumber(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                    />
                  </FormField>

                  <FormField
                    label="الرقم الضريبي (VAT Number)"
                    optional
                    error={errors.vat_number}
                  >
                    <input
                      type="text"
                      dir="ltr"
                      value={vatNumber}
                      onChange={(e) => {
                        setVatNumber(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <FormField label="المدينة والمقر الرئيسي (بالعربية)">
                    <input
                      type="text"
                      value={cityAr}
                      onChange={(e) => {
                        setCityAr(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>

                  <FormField label="المدينة والمقر الرئيسي (بالإنجليزية)">
                    <input
                      type="text"
                      dir="ltr"
                      value={cityEn}
                      onChange={(e) => {
                        setCityEn(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>
                </div>
              </div>
            )}

            {/* TAB 2: CONTACT */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                {/* Phone Numbers List */}
                <FormField
                  label="أرقام هواتف الاتصال المباشر والطوارئ"
                  required
                  hint="يتم توحيد الأرقام تلقائياً بصيغة E.164 الدولية (+966)"
                  error={errors.phones}
                >
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        dir="ltr"
                        value={newPhoneInput}
                        onChange={(e) => setNewPhoneInput(e.target.value)}
                        placeholder="0559557459 أو +966124231773"
                        className="flex-1 text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={handleAddPhone}
                        className="gap-1.5 shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة رقم</span>
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {phones.map((p, idx) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-control bg-surface-soft border border-surface-border text-xs font-mono text-content-heading"
                          dir="ltr"
                        >
                          <span>{p}</span>
                          <button
                            type="button"
                            onClick={() => handleRemovePhone(idx)}
                            className="text-feedback-error hover:text-rose-700 ms-1"
                            title="حذف الرقم"
                            aria-label="حذف"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <FormField
                    label="رقم الواتساب الرسمي (خدمة العملاء)"
                    required
                    error={errors.whatsapp}
                  >
                    <input
                      type="text"
                      dir="ltr"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(e.target.value)
                        setIsDirty(true)
                      }}
                      placeholder="+966559557459"
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                    />
                  </FormField>

                  <FormField
                    label="الرقم الموحد"
                    required
                    error={errors.unified_number}
                  >
                    <input
                      type="text"
                      dir="ltr"
                      value={unifiedNumber}
                      onChange={(e) => {
                        setUnifiedNumber(e.target.value)
                        setIsDirty(true)
                      }}
                      placeholder="920000000"
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                    />
                  </FormField>
                </div>

                <FormField
                  label="البريد الإلكتروني الرسمي"
                  required
                  error={errors.email}
                >
                  <input
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="info@almubtakirah.com"
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <FormField label="العنوان الوطني (بالعربية)" optional>
                    <input
                      type="text"
                      value={addressAr}
                      onChange={(e) => {
                        setAddressAr(e.target.value)
                        setIsDirty(true)
                      }}
                      placeholder="جدة، حي الفيصلية، طريق المدينة المنورة"
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>

                  <FormField label="العنوان الوطني (بالإنجليزية)" optional>
                    <input
                      type="text"
                      dir="ltr"
                      value={addressEn}
                      onChange={(e) => {
                        setAddressEn(e.target.value)
                        setIsDirty(true)
                      }}
                      placeholder="Jeddah, Al-Faisaliyah, Madinah Road"
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <FormField label="ساعات العمل الرسمية (بالعربية)" optional>
                    <input
                      type="text"
                      value={workingHoursAr}
                      onChange={(e) => {
                        setWorkingHoursAr(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>

                  <FormField label="ساعات العمل الرسمية (بالإنجليزية)" optional>
                    <input
                      type="text"
                      dir="ltr"
                      value={workingHoursEn}
                      onChange={(e) => {
                        setWorkingHoursEn(e.target.value)
                        setIsDirty(true)
                      }}
                      className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                    />
                  </FormField>
                </div>

                <FormField
                  label="رابط موقع الشركة على خرائط قوقل (Google Maps URL)"
                  optional
                  error={errors.map_url}
                >
                  <input
                    type="url"
                    dir="ltr"
                    value={mapUrl}
                    onChange={(e) => {
                      setMapUrl(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>
              </div>
            )}

            {/* TAB 3: SOCIAL */}
            {activeTab === 'social' && (
              <div className="space-y-4">
                <FormField label="رابط إنستغرام (Instagram)" optional error={errors.instagram_url}>
                  <input
                    type="url"
                    dir="ltr"
                    value={instagramUrl}
                    onChange={(e) => {
                      setInstagramUrl(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="https://instagram.com/..."
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>

                <FormField label="رابط تيك توك (TikTok)" optional error={errors.tiktok_url}>
                  <input
                    type="url"
                    dir="ltr"
                    value={tiktokUrl}
                    onChange={(e) => {
                      setTiktokUrl(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="https://tiktok.com/@..."
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>

                <FormField label="رابط منصة إكس / تويتر (X / Twitter)" optional error={errors.x_url}>
                  <input
                    type="url"
                    dir="ltr"
                    value={xUrl}
                    onChange={(e) => {
                      setXUrl(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="https://x.com/..."
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>

                <FormField label="رابط لينكد إن (LinkedIn)" optional error={errors.linkedin_url}>
                  <input
                    type="url"
                    dir="ltr"
                    value={linkedinUrl}
                    onChange={(e) => {
                      setLinkedinUrl(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>

                <FormField label="رابط سناب شات (Snapchat)" optional error={errors.snapchat_url}>
                  <input
                    type="url"
                    dir="ltr"
                    value={snapchatUrl}
                    onChange={(e) => {
                      setSnapchatUrl(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="https://snapchat.com/add/..."
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>
              </div>
            )}

            {/* TAB 4: SEO & MEDIA */}
            {activeTab === 'seo' && (
              <div className="space-y-4">
                <FormField
                  label="عنوان الصفحة الرئيسية الافتراضي (SEO Title)"
                  hint="العنوان الذي يظهر في نتائج محركات البحث عند البحث عن الشركة"
                  error={errors.default_seo_title_ar}
                >
                  <input
                    type="text"
                    value={defaultSeoTitleAr}
                    onChange={(e) => {
                      setDefaultSeoTitleAr(e.target.value)
                      setIsDirty(true)
                    }}
                    maxLength={80}
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  />
                </FormField>

                <FormField
                  label="الوصف التعريفي الافتراضي (Meta Description)"
                  hint="الوصف الذي يظهر أسفل العنوان في قوقل وشبكات التواصل"
                  error={errors.default_seo_description_ar}
                >
                  <textarea
                    rows={3}
                    value={defaultSeoDescriptionAr}
                    onChange={(e) => {
                      setDefaultSeoDescriptionAr(e.target.value)
                      setIsDirty(true)
                    }}
                    maxLength={200}
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
                  />
                </FormField>

                {/* Default OG Image */}
                <FormField
                  label="صورة المشاركة الافتراضية للروابط (Default Open Graph Image)"
                  hint="تظهر عند مشاركة رابط الموقع على واتساب أو تويتر أو فيسبوك (يفضل أبعاد 1200x630)"
                >
                  <div className="space-y-3">
                    {defaultOgMediaUrl ? (
                      <div className="w-full max-w-sm aspect-[1.91/1] rounded-control overflow-hidden border border-surface-border bg-surface-soft">
                        <img
                          src={defaultOgMediaUrl}
                          alt="صورة المشاركة الافتراضية"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="w-full max-w-sm aspect-[1.91/1] border-2 border-dashed border-surface-border rounded-control p-6 text-center cursor-pointer hover:border-brand-600/50 hover:bg-surface-soft/40 transition-colors flex flex-col items-center justify-center"
                      >
                        <ImageIcon className="w-8 h-8 text-content-muted mb-2" />
                        <span className="text-xs font-bold text-content-heading">
                          اختيار صورة OG الافتراضية
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="text-xs"
                      >
                        {defaultOgMediaUrl ? 'تغيير الصورة' : 'اختيار من مكتبة الوسائط'}
                      </Button>

                      {defaultOgMediaUrl && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDefaultOgMediaId(null)
                            setDefaultOgMediaUrl(null)
                            setIsDirty(true)
                          }}
                          className="text-feedback-error hover:bg-feedback-error/10 text-xs"
                        >
                          إزالة
                        </Button>
                      )}
                    </div>
                  </div>
                </FormField>
              </div>
            )}

            {/* TAB 5: ANALYTICS (DISABLED WITH NOTICE) */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="p-4 rounded-control bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold">أدوات التتبع والتحليل غير مفعّلة حالياً</p>
                    <p className="text-amber-800 leading-relaxed">
                      الحقول التالية مجهزة في قاعدة البيانات ولكنها معطلة حالياً لمنع تحميل نصوص برمجية خارجية حتى اعتماد سياسة ملفات تعريف الارتباط وتفعيلها رسمياً في المرحلة 10.
                    </p>
                  </div>
                </div>

                <FormField label="معرّف إدارة العلامات من قوقل (Google Tag Manager ID)" optional>
                  <input
                    type="text"
                    dir="ltr"
                    disabled
                    value={gtmId}
                    onChange={(e) => setGtmId(e.target.value)}
                    placeholder="GTM-XXXXXXX (غير مفعّل حالياً)"
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-surface-soft text-content-muted cursor-not-allowed font-mono"
                  />
                </FormField>

                <FormField label="معرّف تحليلات قوقل (GA4 Measurement ID)" optional>
                  <input
                    type="text"
                    dir="ltr"
                    disabled
                    value={ga4Id}
                    onChange={(e) => setGa4Id(e.target.value)}
                    placeholder="G-XXXXXXXXXX (غير مفعّل حالياً)"
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-surface-soft text-content-muted cursor-not-allowed font-mono"
                  />
                </FormField>

                <FormField label="معرّف بكسل ميتا (Meta Pixel ID)" optional>
                  <input
                    type="text"
                    dir="ltr"
                    disabled
                    value={metaPixelId}
                    onChange={(e) => setMetaPixelId(e.target.value)}
                    placeholder="XXXXXXXXXXXXXXX (غير مفعّل حالياً)"
                    className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-surface-soft text-content-muted cursor-not-allowed font-mono"
                  />
                </FormField>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Media Picker for OG Image */}
      <MediaPicker
        open={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleSelectOgMedia}
        mode="single"
        accept="image"
        initialFolder="branding"
        title="اختيار صورة المشاركة الافتراضية للموقع"
      />
    </form>
  )
}

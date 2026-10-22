import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Save,
  ExternalLink,
  Wand2,
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Globe,
  Briefcase,
  FileText,
} from 'lucide-react'
import { PageHeader, FormField, MediaPicker } from '@/components/admin'
import { Button, useToast } from '@/components/ui'
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning'
import {
  useAdminWork,
  useCreateWork,
  useUpdateWork,
} from '@/features/works/useAdminWorks'
import {
  SERVICE_TYPE_OPTIONS,
  generateSlug,
  isWorkSlugUnique,
  workFormSchema,
  type WorkFormData,
  type WorkServiceType,
} from '@/features/works/worksAdminService'
import { useSeoAnalyzer, SeoAnalyzerPanel } from '@/features/blog/seo'
import type { MediaRow } from '@/features/media/types'
import { getStoragePublicUrl } from '@/lib/media'
import { REBUILD_NOTICE } from '@/lib/rebuild'

export const WorkEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const { success, error: toastError } = useToast()

  const { data: existingWork, isLoading: isLoadingWork } = useAdminWork(
    isNew ? undefined : id,
  )

  const createMutation = useCreateWork()
  const updateMutation = useUpdateWork()

  // Form State
  const [titleAr, setTitleAr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [slug, setSlug] = useState('')
  const [serviceType, setServiceType] = useState<WorkServiceType>('installation')
  const [locationAr, setLocationAr] = useState('')
  const [locationEn, setLocationEn] = useState('')
  const [completedYear, setCompletedYear] = useState<string>('')
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [coverMediaId, setCoverMediaId] = useState<string | null>(null)
  const [coverMediaUrl, setCoverMediaUrl] = useState<string | null>(null)
  const [galleryMedia, setGalleryMedia] = useState<Array<{ id: string; url: string; alt?: string }>>([])
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [focusKeyword, setFocusKeyword] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [sortOrder, setSortOrder] = useState(0)

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSlugChecking, setIsSlugChecking] = useState(false)
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const [hasLocalBackup, setHasLocalBackup] = useState(false)
  const [serpDevice, setSerpDevice] = useState<'mobile' | 'desktop'>('desktop')

  // Media Picker modals
  const [isCoverPickerOpen, setIsCoverPickerOpen] = useState(false)
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false)

  useUnsavedChangesWarning(isDirty)

  const localStorageKey = `work_draft_backup_${isNew ? 'new' : id}`

  // Check for local storage backup on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(localStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.titleAr && parsed.savedAt) {
          setHasLocalBackup(true)
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [localStorageKey])

  // Restore local storage backup
  const handleRestoreBackup = () => {
    try {
      const saved = localStorage.getItem(localStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.titleAr) setTitleAr(parsed.titleAr)
        if (parsed.titleEn) setTitleEn(parsed.titleEn)
        if (parsed.slug) setSlug(parsed.slug)
        if (parsed.serviceType) setServiceType(parsed.serviceType)
        if (parsed.locationAr) setLocationAr(parsed.locationAr)
        if (parsed.locationEn) setLocationEn(parsed.locationEn)
        if (parsed.completedYear) setCompletedYear(parsed.completedYear)
        if (parsed.descriptionAr) setDescriptionAr(parsed.descriptionAr)
        if (parsed.descriptionEn) setDescriptionEn(parsed.descriptionEn)
        if (parsed.seoTitle) setSeoTitle(parsed.seoTitle)
        if (parsed.seoDescription) setSeoDescription(parsed.seoDescription)
        if (parsed.focusKeyword) setFocusKeyword(parsed.focusKeyword)
        setIsDirty(true)
        setHasLocalBackup(false)
        success('تم استعادة المسودة المحفوظة محلياً')
      }
    } catch {
      toastError('فشل استعادة المسودة')
    }
  }

  const handleDismissBackup = () => {
    try {
      localStorage.removeItem(localStorageKey)
      setHasLocalBackup(false)
    } catch {
      // Ignore
    }
  }

  // Populate data when editing
  useEffect(() => {
    if (existingWork && !isNew) {
      setTitleAr(existingWork.title_ar || '')
      setTitleEn(existingWork.title_en || '')
      setSlug(existingWork.slug || '')
      setServiceType(existingWork.service_type || 'installation')
      setLocationAr(existingWork.location_ar || '')
      setLocationEn(existingWork.location_en || '')
      setCompletedYear(existingWork.completed_year ? String(existingWork.completed_year) : '')
      setDescriptionAr(existingWork.description_ar || '')
      setDescriptionEn(existingWork.description_en || '')
      setCoverMediaId(existingWork.cover_media_id || null)

      if (existingWork.cover_media?.storage_path) {
        setCoverMediaUrl(getStoragePublicUrl(existingWork.cover_media.storage_path))
      }

      if (existingWork.gallery_media && existingWork.gallery_media.length > 0) {
        setGalleryMedia(
          existingWork.gallery_media
            .filter((m): m is typeof m & { id: string } => Boolean(m && typeof m.id === 'string'))
            .map((m) => ({
              id: m.id,
              url: getStoragePublicUrl(m.storage_path),
              alt: m.alt_text || '',
            })),
        )
      } else {
        setGalleryMedia([])
      }

      setSeoTitle(existingWork.seo_title || '')
      setSeoDescription(existingWork.seo_description || '')
      setIsPublished(existingWork.is_published || false)
      setSortOrder(existingWork.sort_order || 0)
      setIsDirty(false)
    }
  }, [existingWork, isNew])

  // Check slug uniqueness on change with debounce
  useEffect(() => {
    if (!slug || slug.length < 2) {
      setIsSlugAvailable(null)
      return
    }

    const timer = setTimeout(async () => {
      setIsSlugChecking(true)
      try {
        const unique = await isWorkSlugUnique(slug, isNew ? undefined : id)
        setIsSlugAvailable(unique)
      } catch {
        setIsSlugAvailable(null)
      } finally {
        setIsSlugChecking(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [slug, isNew, id])

  const handleAutoSlug = useCallback(() => {
    const candidate = titleEn.trim() || titleAr.trim()
    if (!candidate) return
    const generated = generateSlug(candidate)
    setSlug(generated)
    setIsDirty(true)
  }, [titleEn, titleAr])

  // Autosave draft every 30 seconds when dirty
  useEffect(() => {
    if (!isDirty) return

    const interval = setInterval(() => {
      try {
        const backupData = {
          titleAr,
          titleEn,
          slug,
          serviceType,
          locationAr,
          locationEn,
          completedYear,
          descriptionAr,
          descriptionEn,
          seoTitle,
          seoDescription,
          focusKeyword,
          savedAt: new Date().toISOString(),
        }
        localStorage.setItem(localStorageKey, JSON.stringify(backupData))
        setLastSavedAt(new Date().toLocaleTimeString('ar-SA'))
      } catch {
        // Local storage full or unavailable
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [
    isDirty,
    titleAr,
    titleEn,
    slug,
    serviceType,
    locationAr,
    locationEn,
    completedYear,
    descriptionAr,
    descriptionEn,
    seoTitle,
    seoDescription,
    focusKeyword,
    localStorageKey,
  ])

  // Real-time SEO analysis input
  const seoInput = useMemo(
    () => ({
      title: titleAr,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      secondaryKeywords: [],
      excerpt: descriptionAr,
      featuredImageId: coverMediaId,
      featuredImageAlt: titleAr,
      contentHtml: descriptionAr ? `<p>${descriptionAr}</p>` : '',
      canonicalUrl: null,
      robotsNoindex: !isPublished,
      robotsNofollow: false,
      ogImageId: coverMediaId,
      siteDomain: 'almubtakirah.com',
    }),
    [
      titleAr,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      descriptionAr,
      coverMediaId,
      isPublished,
    ],
  )

  const { result: seoResult, isAnalyzing: isSeoAnalyzing } = useSeoAnalyzer(seoInput)

  // Cover media selection handler
  const handleSelectCover = (selected: MediaRow | MediaRow[]) => {
    const item = Array.isArray(selected) ? selected[0] : selected
    if (!item) return
    setCoverMediaId(item.id)
    setCoverMediaUrl(getStoragePublicUrl(item.storage_path))
    setIsCoverPickerOpen(false)
    setIsDirty(true)
  }

  // Gallery media selection handler
  const handleSelectGallery = (selected: MediaRow | MediaRow[]) => {
    const items = Array.isArray(selected) ? selected : [selected]
    const existingIds = new Set(galleryMedia.map((g) => g.id))
    const newItems = items
      .filter((item) => !existingIds.has(item.id))
      .map((item) => ({
        id: item.id,
        url: getStoragePublicUrl(item.storage_path),
        alt: item.alt_text || item.title || '',
      }))

    setGalleryMedia((prev) => [...prev, ...newItems])
    setIsGalleryPickerOpen(false)
    setIsDirty(true)
  }

  const handleMoveGallery = (index: number, direction: 'left' | 'right') => {
    const target = direction === 'left' ? index - 1 : index + 1
    if (target < 0 || target >= galleryMedia.length) return
    const updated = [...galleryMedia]
    const temp = updated[index]
    updated[index] = updated[target]
    updated[target] = temp
    setGalleryMedia(updated)
    setIsDirty(true)
  }

  const handleRemoveGallery = (index: number) => {
    setGalleryMedia((prev) => prev.filter((_, i) => i !== index))
    setIsDirty(true)
  }

  // Save handler supporting explicit publish state toggle
  const handleSave = async (targetPublishState?: boolean) => {
    setErrors({})
    const nextPublished = targetPublishState !== undefined ? targetPublishState : isPublished

    const payload: WorkFormData = {
      title_ar: titleAr.trim(),
      title_en: titleEn.trim() || null,
      slug: slug.trim(),
      service_type: serviceType,
      location_ar: locationAr.trim() || null,
      location_en: locationEn.trim() || null,
      completed_year: completedYear ? parseInt(completedYear, 10) : null,
      description_ar: descriptionAr.trim() || null,
      description_en: descriptionEn.trim() || null,
      cover_media_id: coverMediaId || null,
      gallery_media_ids: galleryMedia.map((g) => g.id),
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      is_published: nextPublished,
      sort_order: sortOrder,
    }

    const validation = workFormSchema.safeParse(payload)
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      for (const err of validation.error.errors) {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      }
      setErrors(fieldErrors)
      toastError('يرجى تصحيح الأخطاء في النموذج')
      return
    }

    if (isSlugAvailable === false) {
      setErrors((prev) => ({
        ...prev,
        slug: 'هذا الرابط اللطيف (Slug) مستخدم بالفعل في مشروع آخر، يرجى تغييره',
      }))
      toastError('الاسم اللطيف مكرر')
      return
    }

    try {
      if (isNew) {
        const created = await createMutation.mutateAsync(payload)
        try {
          localStorage.removeItem(localStorageKey)
        } catch {
          // Ignore
        }
        setIsDirty(false)
        setIsPublished(nextPublished)
        success(
          nextPublished ? 'تم إنشاء ونشر المشروع بنجاح' : 'تم حفظ مسودة المشروع بنجاح',
          nextPublished ? REBUILD_NOTICE : undefined,
        )
        navigate(`/admin/works/${created.id}`)
      } else {
        await updateMutation.mutateAsync({ id, data: payload })
        try {
          localStorage.removeItem(localStorageKey)
        } catch {
          // Ignore
        }
        setIsDirty(false)
        setIsPublished(nextPublished)
        setLastSavedAt(new Date().toLocaleTimeString('ar-SA'))
        success(
          nextPublished ? 'تم نشر وتحديث المشروع بنجاح' : 'تم حفظ تعديلات المشروع بنجاح',
          nextPublished ? REBUILD_NOTICE : undefined,
        )
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ المشروع', msg)
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending
  const publicUrl = `/works/${slug || 'project'}`

  if (!isNew && isLoadingWork) {
    return (
      <div className="p-12 text-center text-content-muted text-sm">
        جاري تحميل بيانات المشروع...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Page Header */}
      <PageHeader
        title={isNew ? 'إضافة مشروع وسابقة أعمال' : `تحرير: ${titleAr || 'مشروع'}`}
        description="توثيق بيانات المشروع وسابقة الأعمال وصور المعرض وإعدادات النشر وتحسين محركات البحث."
        backTo="/admin/works"
        backLabel="العودة لقائمة المشاريع"
      />

      {/* Local Storage Backup Alert */}
      {hasLocalBackup && (
        <div className="p-4 rounded-card bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 shrink-0 text-amber-600" />
            <span>
              تم العثور على مسودة محلية محفوظة تلقائياً لهذا المشروع. هل ترغب في استعادتها؟
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="secondary" onClick={handleDismissBackup}>
              تجاهل
            </Button>
            <Button
              size="sm"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold"
              onClick={handleRestoreBackup}
            >
              استعادة المسودة
            </Button>
          </div>
        </div>
      )}

      {/* Unified Centered Layout Stream */}
      <div className="space-y-6">
        {/* Section 1: Title & Slug Box */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-border">
            <Briefcase className="w-4 h-4 text-brand-600" />
            <h2 className="text-sm font-bold text-content-heading">
              عنوان المشروع ورابط الصفحة
            </h2>
          </div>

          {/* Primary Arabic Title (H1) */}
          <FormField
            label="عنوان المشروع بالعربية (H1 الرئيسي للصفحة)"
            required
            error={errors.title_ar}
          >
            <input
              type="text"
              value={titleAr}
              onChange={(e) => {
                setTitleAr(e.target.value)
                setIsDirty(true)
                if (!slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              placeholder="اكتب عنواناً جذاباً ومحدداً للمشروع (مثال: برج الروضة التجاري - جدة)..."
              className="w-full px-4 py-3 text-lg font-bold rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
          </FormField>

          {/* English Title */}
          <FormField
            label="عنوان المشروع بالإنجليزية (اختياري)"
            optional
            error={errors.title_en}
          >
            <input
              type="text"
              dir="ltr"
              value={titleEn}
              onChange={(e) => {
                setTitleEn(e.target.value)
                setIsDirty(true)
              }}
              placeholder="e.g. Al-Rawdah Commercial Tower - Jeddah"
              className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
            />
          </FormField>

          {/* Slug Field with auto-generate button and live indicator */}
          <FormField
            label="الرابط اللطيف (Slug)"
            required
            error={errors.slug}
          >
            <div className="flex gap-2">
              <input
                type="text"
                dir="ltr"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                  setIsDirty(true)
                }}
                placeholder="al-rawdah-commercial-tower"
                className="flex-1 px-3 py-2 text-xs font-mono rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAutoSlug}
                title="توليد الرابط تلقائياً من العنوان"
                className="shrink-0 px-3 text-xs"
              >
                <Wand2 className="w-4 h-4 me-1" />
                <span>توليد</span>
              </Button>
            </div>

            {/* Slug Helpers & Validation */}
            <div className="flex items-center justify-between text-xs mt-1.5">
              <span className="text-content-muted font-mono" dir="ltr">
                almubtakirah.com/works/{slug || '...'}
              </span>
              <div>
                {isSlugChecking && (
                  <span className="text-content-muted">جاري التحقق من الرابط...</span>
                )}
                {!isSlugChecking && isSlugAvailable === true && (
                  <span className="text-emerald-600 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    الرابط متاح
                  </span>
                )}
                {!isSlugChecking && isSlugAvailable === false && (
                  <span className="text-feedback-error flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    الرابط مستخدم بالفعل
                  </span>
                )}
              </div>
            </div>

            {slug.length > 75 && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                تنبيه: يُفضل ألا يتجاوز طول الرابط 75 حرفاً لأفضل توافق مع محركات البحث.
              </p>
            )}
          </FormField>
        </div>

        {/* Section 2: Cover Image (Main Featured Image) */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div>
              <h3 className="font-bold text-sm text-content-heading">
                صورة الغلاف الرئيسية للمشروع
              </h3>
              <p className="text-[11px] text-content-muted mt-0.5">
                تظهر كصورة بارزة في رأس صفحة المشروع وفي بطاقات المعرض على الموقع.
              </p>
            </div>
          </div>

          {coverMediaUrl ? (
            <div className="space-y-3">
              <div className="aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-control bg-surface-soft overflow-hidden border border-surface-border relative group max-h-72">
                <img
                  src={coverMediaUrl}
                  alt="غلاف المشروع"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white text-content-heading border-white hover:bg-surface-soft font-bold"
                    onClick={() => setIsCoverPickerOpen(true)}
                  >
                    تغيير الصورة
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white text-feedback-error border-white hover:bg-red-50 font-bold"
                    onClick={() => {
                      setCoverMediaId(null)
                      setCoverMediaUrl(null)
                      setIsDirty(true)
                    }}
                  >
                    إزالة
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-center p-8 border-2 border-dashed border-surface-border rounded-control bg-surface-soft">
              <ImageIcon className="w-12 h-12 text-content-muted mx-auto" />
              <div className="text-xs text-content-muted max-w-sm mx-auto">
                اختر صورة عالية الجودة لتمثيل المشروع في صفحة تفاصيل المشروع وبطاقات سابقة الأعمال.
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsCoverPickerOpen(true)}
                className="gap-1.5 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>اختيار من مكتبة الوسائط</span>
              </Button>
            </div>
          )}
        </div>

        {/* Section 3: Project Specifications */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-sm text-content-heading pb-3 border-b border-surface-border">
            بيانات ومواصفات المشروع الأساسية
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Service Type */}
            <FormField label="نوع الخدمة" required error={errors.service_type}>
              <select
                value={serviceType}
                onChange={(e) => {
                  setServiceType(e.target.value as WorkServiceType)
                  setIsDirty(true)
                }}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              >
                {SERVICE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.labelAr}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Location (AR) */}
            <FormField label="الموقع (بالعربية)" optional error={errors.location_ar}>
              <input
                type="text"
                value={locationAr}
                onChange={(e) => {
                  setLocationAr(e.target.value)
                  setIsDirty(true)
                }}
                placeholder="مثال: جدة، حي الروضة"
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>

            {/* Completed Year */}
            <FormField label="سنة الإنجاز" optional error={errors.completed_year}>
              <input
                type="number"
                min="1990"
                max="2035"
                value={completedYear}
                onChange={(e) => {
                  setCompletedYear(e.target.value)
                  setIsDirty(true)
                }}
                placeholder="2024"
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>
          </div>

          {/* Location (EN) */}
          <div className="pt-1">
            <FormField label="الموقع بالإنجليزية (اختياري)" optional error={errors.location_en}>
              <input
                type="text"
                dir="ltr"
                value={locationEn}
                onChange={(e) => {
                  setLocationEn(e.target.value)
                  setIsDirty(true)
                }}
                placeholder="e.g. Jeddah, Al-Rawdah District"
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
              />
            </FormField>
          </div>
        </div>

        {/* Section 4: Detailed Descriptions */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
            <FileText className="w-4 h-4 text-brand-600" />
            <h3 className="font-bold text-sm text-content-heading">
              نبذة وتفاصيل المشروع
            </h3>
          </div>

          <FormField
            label="تفاصيل المشروع (بالعربية)"
            optional
            error={errors.description_ar}
          >
            <textarea
              rows={5}
              value={descriptionAr}
              onChange={(e) => {
                setDescriptionAr(e.target.value)
                setIsDirty(true)
              }}
              placeholder="تفاصيل عن أعمال التوريد أو التركيب أو الصيانة، وعدد المصاعد والمواصفات الفنية المتميزة للمشروع..."
              className="w-full px-3 py-2.5 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
            />
            <div className="flex justify-between text-xs text-content-muted mt-1">
              <span>تظهر هذه النبذة في قسم الوصف الأساسي لصفحة تفاصيل المشروع</span>
              <span>{descriptionAr.length} حرفاً</span>
            </div>
          </FormField>

          <FormField
            label="تفاصيل المشروع بالإنجليزية (اختياري)"
            optional
            error={errors.description_en}
          >
            <textarea
              rows={4}
              dir="ltr"
              value={descriptionEn}
              onChange={(e) => {
                setDescriptionEn(e.target.value)
                setIsDirty(true)
              }}
              placeholder="Project specifications, number of elevator units, floor levels, architectural finishes..."
              className="w-full px-3 py-2.5 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed text-start"
            />
          </FormField>
        </div>

        {/* Section 5: Gallery Images */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div>
              <h3 className="font-bold text-sm text-content-heading">
                معرض صور المشروع ({galleryMedia.length})
              </h3>
              <p className="text-[11px] text-content-muted mt-0.5">
                يمكنك إضافة عدة صور لمعرض المشروع وإعادة ترتيبها لظهورها في نافذة العرض المكبر (Lightbox).
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsGalleryPickerOpen(true)}
              className="gap-1.5 font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة صور</span>
            </Button>
          </div>

          {galleryMedia.length === 0 ? (
            <div
              onClick={() => setIsGalleryPickerOpen(true)}
              className="border-2 border-dashed border-surface-border rounded-control p-8 text-center cursor-pointer hover:border-brand-600/50 hover:bg-surface-soft/40 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-content-muted mx-auto mb-2" />
              <p className="text-xs font-bold text-content-heading">لا توجد صور في المعرض بعد</p>
              <p className="text-[11px] text-content-muted mt-1">
                اضغط هنا لاختيار صور من مكتبة الوسائط
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {galleryMedia.map((item, index) => (
                <div
                  key={item.id}
                  className="relative group rounded-control overflow-hidden border border-surface-border bg-surface-soft aspect-square"
                >
                  <img
                    src={item.url}
                    alt={item.alt || ''}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay controls */}
                  <div className="absolute inset-0 bg-brand-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                    <button
                      type="button"
                      onClick={() => handleMoveGallery(index, 'left')}
                      disabled={index === 0}
                      className="p-1.5 rounded-control bg-white/90 text-brand-900 disabled:opacity-30 hover:bg-white"
                      title="تحريك للخلف"
                      aria-label="تحريك للخلف"
                    >
                      <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveGallery(index)}
                      className="p-1.5 rounded-control bg-feedback-error/90 text-white hover:bg-feedback-error"
                      title="حذف من المعرض"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveGallery(index, 'right')}
                      disabled={index === galleryMedia.length - 1}
                      className="p-1.5 rounded-control bg-white/90 text-brand-900 disabled:opacity-30 hover:bg-white"
                      title="تحريك للأمام"
                      aria-label="تحريك للأمام"
                    >
                      <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                    </button>
                  </div>

                  <span className="absolute bottom-1.5 start-1.5 px-2 py-0.5 rounded-sm bg-black/70 text-white text-[10px] font-mono">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 6: Publishing & Sorting Settings */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-sm text-content-heading pb-3 border-b border-surface-border">
            إعدادات النشر والترتيب
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Publication Status Selector */}
            <FormField label="حالة نشر المشروع">
              <select
                value={isPublished ? 'published' : 'draft'}
                onChange={(e) => {
                  setIsPublished(e.target.value === 'published')
                  setIsDirty(true)
                }}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              >
                <option value="published">منشور للجمهور (يظهر في سابقة الأعمال والموقع)</option>
                <option value="draft">مسودة خاصة (غير ظاهر للعامة)</option>
              </select>
            </FormField>

            {/* Sort Order */}
            <FormField
              label="الترتيب اليدوي (Sort Order)"
              hint="الأرقام الأقل تظهر أولاً في قائمة المشاريع"
            >
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(parseInt(e.target.value, 10) || 0)
                  setIsDirty(true)
                }}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>
          </div>
        </div>

        {/* Section 7: SEO Settings & Google SERP Snippet Preview */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-sm text-content-heading pb-3 border-b border-surface-border flex items-center justify-between">
            <span>إعدادات تحسين محركات البحث (SEO)</span>
            <Globe className="w-4 h-4 text-brand-600" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SEO Title */}
            <FormField
              label="عنوان الـ SEO المخصص"
              optional
              hint="إذا تُرك فارغاً سيتم استخدام عنوان المشروع تلقائياً"
              error={errors.seo_title}
            >
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => {
                  setSeoTitle(e.target.value)
                  setIsDirty(true)
                }}
                maxLength={80}
                placeholder={titleAr || 'مشروع مصاعد برج الروضة | شركة المصاعد المبتكرة'}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
              <div className="flex justify-between text-[11px] mt-1">
                <span className="text-content-muted">المثالي: 30 إلى 60 حرفاً</span>
                <span
                  className={
                    (seoTitle || titleAr).length >= 30 && (seoTitle || titleAr).length <= 60
                      ? 'text-emerald-600 font-bold'
                      : 'text-amber-600'
                  }
                >
                  {(seoTitle || titleAr).length} / 80 حرفاً
                </span>
              </div>
            </FormField>

            {/* Focus Keyword */}
            <FormField
              label="الكلمة المفتاحية المستهدفة (Focus Keyword)"
              optional
              hint="الكلمة أو العبارة لتحليل السيو (مثال: تركيب مصاعد جدة)"
            >
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => {
                  setFocusKeyword(e.target.value)
                  setIsDirty(true)
                }}
                placeholder="مثال: تركيب مصاعد جدة"
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>
          </div>

          {/* Meta Description */}
          <FormField
            label="الوصف التعريفي (Meta Description)"
            optional
            hint="يظهر في نتائج بحث Google وشبكات التواصل الاجتماعي"
            error={errors.seo_description}
          >
            <textarea
              rows={3}
              value={seoDescription}
              onChange={(e) => {
                setSeoDescription(e.target.value)
                setIsDirty(true)
              }}
              maxLength={200}
              placeholder={
                descriptionAr ||
                'تنفيذ وتوريد مصاعد بانوراما متطورة لبرج الروضة بجدة وفق أعلى معايير السلامة والجودة...'
              }
              className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
            />
            <div className="flex justify-between text-[11px] mt-1">
              <span className="text-content-muted">المثالي: 120 إلى 160 حرفاً</span>
              <span
                className={
                  (seoDescription || descriptionAr).length >= 120 &&
                  (seoDescription || descriptionAr).length <= 160
                    ? 'text-emerald-600 font-bold'
                    : 'text-amber-600'
                }
              >
                {(seoDescription || descriptionAr).length} / 200 حرفاً
              </span>
            </div>
          </FormField>

          {/* Google SERP Snippet Preview */}
          <div className="pt-3 border-t border-surface-border space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-content-heading">
              <span>معاينة نتيجة بحث Google</span>
              <div className="flex items-center gap-1 bg-surface-soft p-0.5 rounded-control border border-surface-border text-[10px]">
                <button
                  type="button"
                  onClick={() => setSerpDevice('desktop')}
                  className={`px-2 py-0.5 rounded ${
                    serpDevice === 'desktop'
                      ? 'bg-white font-bold shadow-xs text-brand-600'
                      : 'text-content-muted'
                  }`}
                >
                  كمبيوتر
                </button>
                <button
                  type="button"
                  onClick={() => setSerpDevice('mobile')}
                  className={`px-2 py-0.5 rounded ${
                    serpDevice === 'mobile'
                      ? 'bg-white font-bold shadow-xs text-brand-600'
                      : 'text-content-muted'
                  }`}
                >
                  هاتف
                </button>
              </div>
            </div>

            {/* SERP Card */}
            <div
              dir="rtl"
              className="p-3.5 bg-surface-soft border border-surface-border rounded-control text-start space-y-1.5"
            >
              <div className="text-[11px] text-content-muted truncate" dir="ltr">
                https://almubtakirah.com › works › {slug || 'project'}
              </div>
              <div className="text-sm font-medium text-blue-700 hover:underline line-clamp-1 cursor-pointer">
                {seoTitle || titleAr || 'عنوان المشروع في محرك بحث Google'} | شركة المصاعد المبتكرة
              </div>
              <div className="text-xs text-content-body line-clamp-2">
                {seoDescription ||
                  descriptionAr ||
                  'تفاصيل المشروع وسابقة الأعمال مع شركة المصاعد المبتكرة في جدة والمملكة العربية السعودية...'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Live SEO Analyzer */}
        <SeoAnalyzerPanel
          seoData={seoResult}
          isAnalyzing={isSeoAnalyzing}
          focusKeyword={focusKeyword}
        />

        {/* Section 9: Bottom Action Bar */}
        <div className="bg-white border border-surface-border rounded-card p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-xs text-content-muted flex items-center gap-2">
              <span>الحفظ التلقائي: مفعّل (كل 30ث)</span>
              {lastSavedAt && <span>• آخر حفظ: {lastSavedAt}</span>}
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                seoResult.score >= 80
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : seoResult.score >= 50
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              سيو المشروع: {seoResult.score}/100
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {!isNew && isPublished && slug && (
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-control border border-surface-border hover:bg-surface-soft text-content-body transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>معاينة المشروع المباشر</span>
              </a>
            )}

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="flex-1 sm:flex-none px-5 font-bold border-surface-border text-content-body hover:bg-surface-soft hover:border-brand-600 hover:text-brand-600"
            >
              حفظ كمسودة
            </Button>

            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex-1 sm:flex-none px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap"
              leftIcon={<Save className="w-4 h-4" aria-hidden="true" />}
            >
              {isPublished ? 'تحديث ونشر المشروع' : 'نشر المشروع الآن'}
            </Button>
          </div>
        </div>
      </div>

      {/* Cover Image MediaPicker Modal */}
      <MediaPicker
        open={isCoverPickerOpen}
        onClose={() => setIsCoverPickerOpen(false)}
        onSelect={handleSelectCover}
        mode="single"
        accept="image"
        initialFolder="works"
        title="اختيار صورة غلاف المشروع الرئيسية"
      />

      {/* Gallery MediaPicker Modal */}
      <MediaPicker
        open={isGalleryPickerOpen}
        onClose={() => setIsGalleryPickerOpen(false)}
        onSelect={handleSelectGallery}
        mode="multi"
        accept="image"
        initialFolder="works"
        title="اختيار صور لمعرض المشروع"
      />
    </div>
  )
}

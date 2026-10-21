import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
  const [isPublished, setIsPublished] = useState(false)
  const [sortOrder, setSortOrder] = useState(0)

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSlugChecking, setIsSlugChecking] = useState(false)
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null)

  // Media Picker modals
  const [isCoverPickerOpen, setIsCoverPickerOpen] = useState(false)
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false)

  useUnsavedChangesWarning(isDirty)

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

  const handleAutoSlug = () => {
    const candidate = titleEn.trim() || titleAr.trim()
    if (!candidate) return
    const generated = generateSlug(candidate)
    setSlug(generated)
    setIsDirty(true)
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

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
      is_published: isPublished,
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
        await createMutation.mutateAsync(payload)
        setIsDirty(false)
        success('تم إنشاء المشروع بنجاح', payload.is_published ? REBUILD_NOTICE : undefined)
        navigate('/admin/works')
      } else {
        await updateMutation.mutateAsync({ id, data: payload })
        setIsDirty(false)
        success('تم تحديث المشروع بنجاح', payload.is_published ? REBUILD_NOTICE : undefined)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ المشروع', msg)
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending

  if (!isNew && isLoadingWork) {
    return (
      <div className="p-12 text-center text-content-muted text-sm">
        جاري تحميل بيانات المشروع...
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PageHeader
        title={isNew ? 'إضافة مشروع جديد' : `تعديل المشروع: ${existingWork?.title_ar || ''}`}
        description="توثيق بيانات المشروع وسابقة الأعمال ونشرها على الموقع الإلكتروني."
        backTo="/admin/works"
        backLabel="الرجوع لقائمة المشاريع"
        actions={
          <div className="flex items-center gap-2">
            {!isNew && existingWork?.slug && (
              <Link
                to={`/works/${existingWork.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
              >
                <span>معاينة عامة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}

            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isNew ? 'إنشاء المشروع' : 'حفظ التعديلات'}</span>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basic Info */}
          <div className="bg-white p-6 rounded-card border border-surface-border shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-heading pb-2 border-b border-surface-border">
              البيانات الأساسية للمشروع
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="عنوان المشروع (بالعربية)"
                required
                error={errors.title_ar}
              >
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => {
                    setTitleAr(e.target.value)
                    setIsDirty(true)
                  }}
                  placeholder="مثال: برج الروضة التجاري - جدة"
                  className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                />
              </FormField>

              <FormField
                label="عنوان المشروع (بالإنجليزية)"
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
                  placeholder="e.g. Al-Rawdah Commercial Tower"
                  className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                />
              </FormField>
            </div>

            {/* Slug field with auto-generate button */}
            <FormField
              label="الرابط اللطيف (Slug)"
              required
              hint="يُستخدم في رابط الصفحة العامة: almubtakirah.com/works/slug"
              error={errors.slug}
            >
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    dir="ltr"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value)
                      setIsDirty(true)
                    }}
                    placeholder="al-rawdah-tower"
                    className="w-full text-xs p-2.5 pe-8 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                  />
                  <div className="absolute end-2.5 top-1/2 -translate-y-1/2">
                    {isSlugChecking ? (
                      <span className="text-[10px] text-content-muted">تحقق...</span>
                    ) : isSlugAvailable === true ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isSlugAvailable === false ? (
                      <AlertCircle className="w-4 h-4 text-feedback-error" />
                    ) : null}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAutoSlug}
                  className="gap-1.5 shrink-0"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>توليد تلقائي</span>
                </Button>
              </div>
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <FormField
                label="نوع الخدمة"
                required
                error={errors.service_type}
              >
                <select
                  value={serviceType}
                  onChange={(e) => {
                    setServiceType(e.target.value as WorkServiceType)
                    setIsDirty(true)
                  }}
                  className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                >
                  {SERVICE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.labelAr}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="الموقع (بالعربية)"
                optional
                error={errors.location_ar}
              >
                <input
                  type="text"
                  value={locationAr}
                  onChange={(e) => {
                    setLocationAr(e.target.value)
                    setIsDirty(true)
                  }}
                  placeholder="مثال: جدة، حي الروضة"
                  className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                />
              </FormField>

              <FormField
                label="سنة الإنجاز"
                optional
                error={errors.completed_year}
              >
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
                  className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                />
              </FormField>
            </div>

            {/* Descriptions */}
            <div className="space-y-4 pt-2">
              <FormField
                label="نبذة وتفاصيل المشروع (بالعربية)"
                optional
                error={errors.description_ar}
              >
                <textarea
                  rows={4}
                  value={descriptionAr}
                  onChange={(e) => {
                    setDescriptionAr(e.target.value)
                    setIsDirty(true)
                  }}
                  placeholder="تفاصيل عن أعمال التوريد أو التركيب أو الصيانة وعدد المصاعد والمواصفات..."
                  className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
                />
              </FormField>

              <FormField
                label="تفاصيل المشروع (بالإنجليزية)"
                optional
                error={errors.description_en}
              >
                <textarea
                  rows={3}
                  dir="ltr"
                  value={descriptionEn}
                  onChange={(e) => {
                    setDescriptionEn(e.target.value)
                    setIsDirty(true)
                  }}
                  placeholder="Project specifications, number of elevator units, floor levels..."
                  className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
                />
              </FormField>
            </div>
          </div>

          {/* Card 2: Gallery Images */}
          <div className="bg-white p-6 rounded-card border border-surface-border shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-border">
              <div>
                <h2 className="text-sm font-bold text-content-heading">معرض صور المشروع</h2>
                <p className="text-[11px] text-content-muted">
                  يمكنك إضافة صور متعددة وإعادة ترتيبها بالسحب أو الأسهم.
                </p>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsGalleryPickerOpen(true)}
                className="gap-1.5"
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
                <p className="text-xs font-bold text-content-heading">لا توجد صور في المعرض</p>
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
                        className="p-1 rounded-control bg-white/90 text-brand-900 disabled:opacity-30 hover:bg-white"
                        title="تحريك للخلف"
                        aria-label="تحريك للخلف"
                      >
                        <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveGallery(index)}
                        className="p-1 rounded-control bg-feedback-error/90 text-white hover:bg-feedback-error"
                        title="حذف من المعرض"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveGallery(index, 'right')}
                        disabled={index === galleryMedia.length - 1}
                        className="p-1 rounded-control bg-white/90 text-brand-900 disabled:opacity-30 hover:bg-white"
                        title="تحريك للأمام"
                        aria-label="تحريك للأمام"
                      >
                        <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    </div>

                    <span className="absolute bottom-1 start-1 px-1.5 py-0.5 rounded-sm bg-black/60 text-white text-[9px] font-mono">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column (1 Col) */}
        <div className="space-y-6">
          {/* Cover Image Card */}
          <div className="bg-white p-6 rounded-card border border-surface-border shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-heading pb-2 border-b border-surface-border">
              صورة الغلاف الرئيسية
            </h2>

            {coverMediaUrl ? (
              <div className="space-y-3">
                <div className="w-full aspect-video rounded-control overflow-hidden border border-surface-border bg-surface-soft">
                  <img
                    src={coverMediaUrl}
                    alt="غلاف المشروع"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsCoverPickerOpen(true)}
                    className="flex-1 text-xs"
                  >
                    تغيير الغلاف
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCoverMediaId(null)
                      setCoverMediaUrl(null)
                      setIsDirty(true)
                    }}
                    className="text-feedback-error hover:bg-feedback-error/10 text-xs"
                  >
                    إزالة
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsCoverPickerOpen(true)}
                className="border-2 border-dashed border-surface-border rounded-control p-6 text-center cursor-pointer hover:border-brand-600/50 hover:bg-surface-soft/40 transition-colors"
              >
                <ImageIcon className="w-8 h-8 text-content-muted mx-auto mb-2" />
                <p className="text-xs font-bold text-content-heading">اختيار صورة الغلاف</p>
                <p className="text-[11px] text-content-muted mt-1">
                  تظهر في بطاقة المشروع ومقدمة الصفحة
                </p>
              </div>
            )}
          </div>

          {/* Publishing & Sorting Card */}
          <div className="bg-white p-6 rounded-card border border-surface-border shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-heading pb-2 border-b border-surface-border">
              النشر والترتيب
            </h2>

            {/* Published Switch */}
            <div className="flex items-center justify-between p-3 rounded-control bg-surface-soft/60 border border-surface-border">
              <div>
                <span className="text-xs font-bold text-content-heading block">
                  نشر المشروع للعامة
                </span>
                <span className="text-[11px] text-content-muted">
                  {isPublished ? 'سيظهر في صفحة المشاريع العامة' : 'محفوظ كمسودة خاصة'}
                </span>
              </div>

              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => {
                  setIsPublished(e.target.checked)
                  setIsDirty(true)
                }}
                className="w-4 h-4 text-brand-600 rounded-control border-surface-border focus:ring-brand-600 cursor-pointer"
              />
            </div>

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
                className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>
          </div>

          {/* SEO Card */}
          <div className="bg-white p-6 rounded-card border border-surface-border shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-heading pb-2 border-b border-surface-border">
              بيانات محركات البحث (SEO)
            </h2>

            <FormField
              label="عنوان الصفحة (SEO Title)"
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
                placeholder="مشروع مصاعد برج الروضة | شركة المصاعد المبتكرة"
                className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
              <span className="text-[10px] text-content-muted block text-end mt-1">
                {seoTitle.length}/80 حرف
              </span>
            </FormField>

            <FormField
              label="الوصف التعريفي (Meta Description)"
              optional
              hint="يظهر في نتائج بحث قوقل وشبكات التواصل"
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
                placeholder="تنفيذ وتوريد مصاعد بانوراما متطورة لبرج الروضة بجدة وفق أعلى معايير السلامة والجودة..."
                className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
              />
              <span className="text-[10px] text-content-muted block text-end mt-1">
                {seoDescription.length}/200 حرف
              </span>
            </FormField>
          </div>
        </div>
      </div>

      {/* Media Picker Dialogs */}
      <MediaPicker
        open={isCoverPickerOpen}
        onClose={() => setIsCoverPickerOpen(false)}
        onSelect={handleSelectCover}
        mode="single"
        accept="image"
        initialFolder="works"
        title="اختيار صورة غلاف المشروع"
      />

      <MediaPicker
        open={isGalleryPickerOpen}
        onClose={() => setIsGalleryPickerOpen(false)}
        onSelect={handleSelectGallery}
        mode="multi"
        accept="image"
        initialFolder="works"
        title="اختيار صور لمعرض المشروع"
      />
    </form>
  )
}

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Save,
  ExternalLink,
  Wand2,
  Image as ImageIcon,
  Plus,
  AlertCircle,
  CheckCircle2,
  Languages,
  Globe,
  Share2,
  HelpCircle,
  FileText,
  RotateCcw,
} from 'lucide-react'
import { PageHeader, FormField, MediaPicker, ConfirmDialog } from '@/components/admin'
import { Button, useToast } from '@/components/ui'
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning'
import {
  useAdminPost,
  useCreatePost,
  useUpdatePost,
  useCreateTranslationTwin,
} from '@/features/blog/useAdminPosts'
import {
  useAdminCategories,
  useAdminTags,
  useCreateTag,
} from '@/features/blog/useBlogTaxonomy'
import {
  postFormSchema,
  generateSlug,
  isPostSlugUnique,
  isPostTitleUnique,
  deriveFaqFromContent,
  calculateReadingTime,
  type PostFormData,
  type PostStatus,
  type PostLang,
  type SchemaType,
} from '@/features/blog/blogAdminService'
import { useSeoAnalyzer, SeoAnalyzerPanel } from '@/features/blog/seo'
import type { MediaRow } from '@/features/media/types'
import { getStoragePublicUrl } from '@/lib/media'
import { REBUILD_NOTICE } from '@/lib/rebuild'

const TipTapEditor = React.lazy(() =>
  import('@/features/blog/editor/TipTapEditor').then((m) => ({
    default: m.TipTapEditor,
  })),
)

export const PostEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const { success, error: toastError, info } = useToast()

  const { data: existingPost, isLoading: isLoadingPost } = useAdminPost(
    isNew ? undefined : id,
  )

  const { data: categories = [] } = useAdminCategories()
  const { data: allTags = [] } = useAdminTags()
  const createTagMutation = useCreateTag()

  const createPostMutation = useCreatePost()
  const updatePostMutation = useUpdatePost()
  const createTwinMutation = useCreateTranslationTwin()

  // Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [lang, setLang] = useState<PostLang>('ar')
  const [excerpt, setExcerpt] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [contentJson, setContentJson] = useState<unknown>(null)
  const [categoryId, setCategoryId] = useState<string>('')
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [featuredImageId, setFeaturedImageId] = useState<string | null>(null)
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null)
  const [featuredImageAlt, setFeaturedImageAlt] = useState('')
  const [status, setStatus] = useState<PostStatus>('draft')
  const [publishedAt, setPublishedAt] = useState<string>('')

  // SEO & Social State
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [focusKeyword, setFocusKeyword] = useState('')
  const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>([])
  const [secondaryInput, setSecondaryInput] = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [robotsNoindex, setRobotsNoindex] = useState(false)
  const [robotsNofollow, setRobotsNofollow] = useState(false)
  const [ogTitle, setOgTitle] = useState('')
  const [ogDescription, setOgDescription] = useState('')
  const [ogImageId, setOgImageId] = useState<string | null>(null)
  const [ogImageUrl, setOgImageUrl] = useState<string | null>(null)
  const [schemaType, setSchemaType] = useState<SchemaType>('BlogPosting')

  // UI & Validation State
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSlugChecking, setIsSlugChecking] = useState(false)
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const [hasLocalBackup, setHasLocalBackup] = useState(false)
  const [serpDevice, setSerpDevice] = useState<'mobile' | 'desktop'>('desktop')
  const [isTitleDuplicate, setIsTitleDuplicate] = useState(false)
  const [isLowSeoConfirmOpen, setIsLowSeoConfirmOpen] = useState(false)

  // Modals state
  const [isFeaturedPickerOpen, setIsFeaturedPickerOpen] = useState(false)
  const [isOgPickerOpen, setIsOgPickerOpen] = useState(false)
  const [newTagInput, setNewTagInput] = useState('')

  useUnsavedChangesWarning(isDirty)

  const localStorageKey = `post_draft_backup_${isNew ? 'new' : id}`

  // Check for local storage backup on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(localStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.title && parsed.savedAt) {
          setHasLocalBackup(true)
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [localStorageKey])

  // Populate data when editing existing post
  useEffect(() => {
    if (existingPost && !isNew) {
      setTitle(existingPost.title || '')
      setSlug(existingPost.slug || '')
      setLang(existingPost.lang || 'ar')
      setExcerpt(existingPost.excerpt || '')
      setContentHtml(existingPost.content_html || '')
      setContentJson(existingPost.content_json || null)
      setCategoryId(existingPost.category_id || '')
      setSelectedTagIds(existingPost.tags?.map((t) => t.id) || [])
      setFeaturedImageId(existingPost.featured_image_id || null)
      setFeaturedImageAlt(existingPost.featured_image_alt || '')
      setStatus(existingPost.status || 'draft')
      setPublishedAt(existingPost.published_at || '')
      setSeoTitle(existingPost.seo_title || '')
      setSeoDescription(existingPost.seo_description || '')
      setFocusKeyword(existingPost.focus_keyword || '')
      setSecondaryKeywords(existingPost.secondary_keywords || [])
      setCanonicalUrl(existingPost.canonical_url || '')
      setRobotsNoindex(existingPost.robots_noindex || false)
      setRobotsNofollow(existingPost.robots_nofollow || false)
      setOgTitle(existingPost.og_title || '')
      setOgDescription(existingPost.og_description || '')
      setOgImageId(existingPost.og_image_id || null)
      setSchemaType(existingPost.schema_type || 'BlogPosting')

      if (existingPost.featured_image?.storage_path) {
        setFeaturedImageUrl(getStoragePublicUrl(existingPost.featured_image.storage_path))
      }

      setIsDirty(false)
    }
  }, [existingPost, isNew])

  // Restore local storage backup
  const handleRestoreBackup = () => {
    try {
      const saved = localStorage.getItem(localStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.title) setTitle(parsed.title)
        if (parsed.slug) setSlug(parsed.slug)
        if (parsed.excerpt) setExcerpt(parsed.excerpt)
        if (parsed.contentHtml) setContentHtml(parsed.contentHtml)
        if (parsed.contentJson) setContentJson(parsed.contentJson)
        if (parsed.categoryId) setCategoryId(parsed.categoryId)
        if (parsed.seoTitle) setSeoTitle(parsed.seoTitle)
        if (parsed.seoDescription) setSeoDescription(parsed.seoDescription)
        setIsDirty(true)
        setHasLocalBackup(false)
        info('تمت استعادة المسودة المحلية بنجاح')
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

  // Auto-slug generator
  const handleAutoSlug = () => {
    if (!title.trim()) return
    const generated = generateSlug(title)
    setSlug(generated)
    setIsDirty(true)
  }

  // Validate slug uniqueness debounced
  useEffect(() => {
    if (!slug.trim()) {
      setIsSlugAvailable(null)
      return
    }

    const timer = setTimeout(async () => {
      setIsSlugChecking(true)
      try {
        const available = await isPostSlugUnique(slug, lang, isNew ? undefined : id)
        setIsSlugAvailable(available)
      } catch {
        setIsSlugAvailable(null)
      } finally {
        setIsSlugChecking(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [slug, lang, id, isNew])

  // Handle TipTap editor change
  const handleEditorChange = useCallback((html: string, json: unknown) => {
    setContentHtml(html)
    setContentJson(json)
    setIsDirty(true)
  }, [])

  // Derived FAQs from TipTap inline blocks
  const derivedFaqs = deriveFaqFromContent(contentHtml)

  // SEO Analyzer live calculations
  const seoInput = useMemo(
    () => ({
      title,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      secondaryKeywords,
      excerpt,
      featuredImageId,
      featuredImageAlt,
      contentHtml,
      canonicalUrl,
      robotsNoindex,
      robotsNofollow,
      ogImageId,
      faq: derivedFaqs,
      siteDomain: 'almubtakirah.com',
    }),
    [
      title,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      secondaryKeywords,
      excerpt,
      featuredImageId,
      featuredImageAlt,
      contentHtml,
      canonicalUrl,
      robotsNoindex,
      robotsNofollow,
      ogImageId,
      derivedFaqs,
    ],
  )
  const { result: seoResult, isAnalyzing: isSeoAnalyzing } = useSeoAnalyzer(seoInput)

  // Title duplicate checking against database (debounced)
  useEffect(() => {
    if (!title.trim() || title.trim().length < 5) {
      setIsTitleDuplicate(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        const isUnique = await isPostTitleUnique(title, lang, isNew ? undefined : id)
        setIsTitleDuplicate(!isUnique)
      } catch {
        // Ignore network failures
      }
    }, 450)

    return () => clearTimeout(timer)
  }, [title, lang, isNew, id])

  // Secondary keywords handling
  const handleAddSecondaryKeyword = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = secondaryInput.trim()
      if (val && !secondaryKeywords.includes(val) && secondaryKeywords.length < 5) {
        setSecondaryKeywords([...secondaryKeywords, val])
        setSecondaryInput('')
        setIsDirty(true)
      }
    }
  }

  const handleRemoveSecondaryKeyword = (keyword: string) => {
    setSecondaryKeywords(secondaryKeywords.filter((k) => k !== keyword))
    setIsDirty(true)
  }

  // Inline tag creation
  const handleCreateNewTag = async () => {
    const tagName = newTagInput.trim()
    if (!tagName) return

    const tagSlug = generateSlug(tagName)
    try {
      const created = await createTagMutation.mutateAsync({
        name_ar: tagName,
        slug: tagSlug,
      })
      setSelectedTagIds((prev) => [...prev, created.id])
      setNewTagInput('')
      setIsDirty(true)
      success(`تمت إضافة الوسم #${tagName}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل إنشاء الوسم', msg)
    }
  }

  // Autosave draft every 30 seconds when dirty
  useEffect(() => {
    if (!isDirty) return

    const interval = setInterval(() => {
      // 1. Save to local storage
      try {
        const backupData = {
          title,
          slug,
          excerpt,
          contentHtml,
          contentJson,
          categoryId,
          seoTitle,
          seoDescription,
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
    title,
    slug,
    excerpt,
    contentHtml,
    contentJson,
    categoryId,
    seoTitle,
    seoDescription,
    localStorageKey,
  ])

  // Save / Publish handler
  const handleSave = async (targetStatus?: PostStatus, skipLowSeoConfirm = false) => {
    setErrors({})
    const postStatus = targetStatus || status

    // If publishing, enforce mandatory fields
    if (postStatus === 'published') {
      const publishErrors: Record<string, string> = {}
      if (!title.trim()) publishErrors.title = 'عنوان المقال مطلوب لنشر المقال'
      if (!slug.trim()) publishErrors.slug = 'الرابط اللطيف مطلوب لنشر المقال'
      if (!excerpt.trim()) publishErrors.excerpt = 'المقتطف التعريفي مطلوب لنشر المقال'
      if (featuredImageId && !featuredImageAlt.trim()) {
        publishErrors.featured_image_alt = 'النص البديل (Alt) مطلوب للصورة الرئيسية لنشر المقال'
      }

      if (Object.keys(publishErrors).length > 0) {
        setErrors(publishErrors)
        toastError('بيانات غير مكتملة', 'يرجى استكمال الحقول الإلزامية قبل النشر')
        return
      }

      // Prompt confirmation if publishing with low SEO score (< 50), never blocking
      if (seoResult.score < 50 && !skipLowSeoConfirm) {
        setIsLowSeoConfirmOpen(true)
        return
      }
    }

    const payload: PostFormData = {
      title: title.trim(),
      slug: slug.trim(),
      lang,
      translation_key: existingPost?.translation_key || undefined,
      excerpt: excerpt.trim() || null,
      content_html: contentHtml,
      content_json: contentJson,
      category_id: categoryId || null,
      tag_ids: selectedTagIds,
      featured_image_id: featuredImageId,
      featured_image_alt: featuredImageAlt.trim() || null,
      status: postStatus,
      published_at:
        postStatus === 'published'
          ? publishedAt || new Date().toISOString()
          : publishedAt || null,
      seo_score: seoResult.score,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      focus_keyword: focusKeyword.trim() || null,
      secondary_keywords: secondaryKeywords,
      canonical_url: canonicalUrl.trim() || null,
      robots_noindex: robotsNoindex,
      robots_nofollow: robotsNofollow,
      og_title: ogTitle.trim() || null,
      og_description: ogDescription.trim() || null,
      og_image_id: ogImageId || featuredImageId,
      schema_type: schemaType,
      faq: derivedFaqs,
    }

    const validation = postFormSchema.safeParse(payload)
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.errors.forEach((err) => {
        const field = String(err.path[0])
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      toastError('خطأ في البيانات', 'يرجى مراجعة الحقول المشار إليها بالأحمر')
      return
    }

    try {
      if (isNew) {
        const created = await createPostMutation.mutateAsync({
          data: payload,
        })
        try {
          localStorage.removeItem(localStorageKey)
        } catch {
          // Ignore
        }
        setIsDirty(false)
        success(
          postStatus === 'published' ? 'تم نشر المقال بنجاح' : 'تم حفظ المسودة بنجاح',
          postStatus === 'published' ? REBUILD_NOTICE : undefined,
        )
        navigate(`/admin/posts/${created.id}`)
      } else {
        await updatePostMutation.mutateAsync({
          id,
          data: payload,
        })
        try {
          localStorage.removeItem(localStorageKey)
        } catch {
          // Ignore
        }
        setIsDirty(false)
        setStatus(postStatus)
        setLastSavedAt(new Date().toLocaleTimeString('ar-SA'))
        success(
          postStatus === 'published' ? 'تم نشر وتحديث المقال' : 'تم حفظ التعديلات بنجاح',
          postStatus === 'published' ? REBUILD_NOTICE : undefined,
        )
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ المقال', msg)
    }
  }

  // Create Translation Twin
  const handleCreateTwin = async () => {
    if (isNew || !id) return
    try {
      const twin = await createTwinMutation.mutateAsync(id)
      const targetName = lang === 'ar' ? 'الإنجليزية' : 'العربية'
      success(`تم إنشاء نسخة المقال المترجمة باللغة ${targetName}`)
      navigate(`/admin/posts/${twin.id}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل إنشاء النسخة المترجمة', msg)
    }
  }

  // Media Pickers
  const handleFeaturedImageSelect = (selected: MediaRow | MediaRow[]) => {
    const item = Array.isArray(selected) ? selected[0] : selected
    if (item) {
      setFeaturedImageId(item.id)
      setFeaturedImageUrl(getStoragePublicUrl(item.storage_path))
      if (!featuredImageAlt && item.alt_text) {
        setFeaturedImageAlt(item.alt_text)
      }
      setIsDirty(true)
    }
    setIsFeaturedPickerOpen(false)
  }

  const handleOgImageSelect = (selected: MediaRow | MediaRow[]) => {
    const item = Array.isArray(selected) ? selected[0] : selected
    if (item) {
      setOgImageId(item.id)
      setOgImageUrl(getStoragePublicUrl(item.storage_path))
      setIsDirty(true)
    }
    setIsOgPickerOpen(false)
  }

  // Calculation helpers
  const wordCount = contentHtml
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const readingTime = calculateReadingTime(contentHtml.replace(/<[^>]*>/g, ' '))

  const publicUrl =
    lang === 'en' ? `/en/blog/${slug || 'post'}` : `/blog/${slug || 'post'}`

  if (isLoadingPost && !isNew) {
    return (
      <div className="p-12 text-center text-slate-500">
        جاري تحميل بيانات المقال...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Page Header */}
      <PageHeader
        title={isNew ? 'كتابة مقال جديد' : `تحرير: ${title || 'مقال'}`}
        description="محرر مقالات متقدم يدعم تنسيقات المصاعد الخاصة وبلوكات الأسئلة التفاعلية والتحسين لمحركات البحث."
        backTo="/admin/posts"
        backLabel="العودة لقائمة المقالات"
      />

      {/* Local Storage Backup Alert */}
      {hasLocalBackup && (
        <div className="p-4 rounded-card bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 shrink-0 text-amber-600" />
            <span>
              تم العثور على مسودة محلية محفوظة تلقائياً لهذا المقال. هل ترغب في استعادتها؟
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="secondary" onClick={handleDismissBackup}>
              تجاهل
            </Button>
            <Button size="sm" className="bg-brand-600 hover:bg-brand-700 text-white font-bold" onClick={handleRestoreBackup}>
              استعادة المسودة
            </Button>
          </div>
        </div>
      )}

      {/* Unified Centered Layout Stream */}
      <div className="space-y-6">
        {/* Section 1: Title & Slug Box */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-4 shadow-xs">
          {/* Title (H1) */}
          <FormField
            label="عنوان المقال (H1 الرئيسي للصفحة)"
            required
            error={errors.title}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setIsDirty(true)
                if (!slug) {
                  setSlug(generateSlug(e.target.value))
                }
              }}
              placeholder="اكتب عنواناً جذاباً ومحدداً للمقال..."
              className="w-full px-4 py-3 text-lg font-bold rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
            {isTitleDuplicate && (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 mt-1.5 bg-amber-50 p-2 rounded-control border border-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  تنبيه: يوجد مقال آخر بنفس العنوان في قاعدة البيانات ({lang === 'ar' ? 'العربية' : 'الإنجليزية'}). يوصى باختيار عنوان فريد لتجنب التنافس في نتائج البحث.
                </span>
              </div>
            )}
          </FormField>

          {/* Slug Field */}
          <FormField label="الرابط اللطيف (Slug)" required error={errors.slug}>
            <div className="flex gap-2">
              <input
                type="text"
                dir="ltr"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                  setIsDirty(true)
                }}
                placeholder="e.g. elevator-maintenance-cost-jeddah"
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
                almubtakirah.com/{lang}/blog/{slug || '...'}
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

          {/* Excerpt */}
          <FormField
            label="المقتطف التعريفي (Excerpt)"
            required
            error={errors.excerpt}
          >
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value)
                setIsDirty(true)
              }}
              maxLength={350}
              placeholder="موجز جذاب للمقال يظهر في بطاقات المدونة ونتائج البحث (حد أقصى 350 حرفاً)..."
              className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
            <div className="flex justify-between text-xs text-content-muted mt-1">
              <span>يستخدم كوصف تلقائي في بطاقات المشاركة وبحث Google</span>
              <span className={excerpt.length > 320 ? 'text-amber-500 font-bold' : ''}>
                {excerpt.length} / 350 حرفاً
              </span>
            </div>
          </FormField>
        </div>

        {/* Section 2: Featured Image */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-sm text-content-heading pb-3 border-b border-surface-border">
            الصورة البارزة للمقال
          </h3>

          {featuredImageUrl ? (
            <div className="space-y-4">
              <div className="aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-control bg-surface-soft overflow-hidden border border-surface-border relative group max-h-72">
                <img
                  src={featuredImageUrl}
                  alt={featuredImageAlt || 'الصورة البارزة'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white text-content-heading border-white hover:bg-surface-soft font-bold"
                    onClick={() => setIsFeaturedPickerOpen(true)}
                  >
                    تغيير الصورة
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white text-feedback-error border-white hover:bg-red-50 font-bold"
                    onClick={() => {
                      setFeaturedImageId(null)
                      setFeaturedImageUrl(null)
                      setIsDirty(true)
                    }}
                  >
                    إزالة
                  </Button>
                </div>
              </div>

              <FormField
                label="النص البديل للصورة (Alt Text)"
                required
                error={errors.featured_image_alt}
              >
                <input
                  type="text"
                  value={featuredImageAlt}
                  onChange={(e) => {
                    setFeaturedImageAlt(e.target.value)
                    setIsDirty(true)
                  }}
                  placeholder="وصف دقيق للصورة لمحركات البحث وضعاف البصر..."
                  className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                />
                <p className="text-[11px] text-content-muted mt-1">
                  إلزامي لنشر المقال وتحسين محركات البحث.
                </p>
              </FormField>
            </div>
          ) : (
            <div className="space-y-3 text-center p-8 border-2 border-dashed border-surface-border rounded-control bg-surface-soft">
              <ImageIcon className="w-12 h-12 text-content-muted mx-auto" />
              <div className="text-xs text-content-muted max-w-sm mx-auto">
                اختر صورة عالية الجودة لتمثيل المقال في رأس الصفحة وقوائم المدونة وبطاقات المشاركة الاجتماعية.
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsFeaturedPickerOpen(true)}
                className="gap-1.5 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>اختيار من مكتبة الوسائط</span>
              </Button>
            </div>
          )}
        </div>

        {/* Section 3: TipTap Rich Text Editor Container */}
        <div className="bg-white border border-surface-border rounded-card overflow-hidden shadow-xs">
          <div className="p-4 border-b border-surface-border flex items-center justify-between bg-surface-soft">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              <span className="font-bold text-sm text-content-heading">
                محتوى المقال الكامل
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-content-muted">
              <span>{wordCount} كلمة</span>
              <span>•</span>
              <span>{readingTime} دقيقة قراءة</span>
            </div>
          </div>

          <div className="p-2 sm:p-4">
            <React.Suspense
              fallback={
                <div className="h-64 flex items-center justify-center text-sm text-content-muted">
                  جارٍ تحميل المحرر...
                </div>
              }
            >
              <TipTapEditor
                contentHtml={contentHtml}
                contentJson={contentJson}
                onChange={handleEditorChange}
                lang={lang}
                placeholder="ابدأ بكتابة المقال هنا... يمكنك إدراج صور، جداول، فيديوهات يوتيوب، وبلوكات الأسئلة المخصصة للمصاعد عبر القائمة."
              />
            </React.Suspense>
          </div>
        </div>

        {/* Section 4: Publishing & Taxonomy Settings */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-sm text-content-heading pb-3 border-b border-surface-border">
            إعدادات النشر والتصنيف واللغة
          </h3>

          {/* Grid of 3 Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Status Select */}
            <FormField label="حالة المقال">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as PostStatus)
                  setIsDirty(true)
                }}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              >
                <option value="draft">مسودة (غير ظاهر للعامة)</option>
                <option value="published">منشور للجمهور</option>
                <option value="archived">مؤرشف</option>
              </select>
            </FormField>

            {/* Language Select */}
            <FormField label="لغة المقال">
              <select
                value={lang}
                onChange={(e) => {
                  setLang(e.target.value as PostLang)
                  setIsDirty(true)
                }}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              >
                <option value="ar">العربية (RTL)</option>
                <option value="en">English (LTR)</option>
              </select>
            </FormField>

            {/* Category Select */}
            <FormField label="تصنيف المقال">
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value)
                  setIsDirty(true)
                }}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              >
                <option value="">بدون تصنيف</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name_ar} {c.name_en ? `(${c.name_en})` : ''}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Translation Twin Pairing */}
          <div className="p-3.5 rounded-control bg-surface-soft border border-surface-border text-xs space-y-2">
            <div className="flex items-center justify-between font-medium text-content-heading">
              <span className="flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-brand-600" />
                <span>النسخة المترجمة المزدوجة</span>
              </span>
              <span className="font-mono text-[10px] text-content-muted">
                {lang === 'ar' ? 'EN Twin' : 'AR Twin'}
              </span>
            </div>

            {existingPost?.twin_post ? (
              <div className="flex items-center justify-between pt-1">
                <span className="text-content-body line-clamp-1">
                  {existingPost.twin_post.title}
                </span>
                <Link
                  to={`/admin/posts/${existingPost.twin_post.id}`}
                  className="text-brand-600 hover:underline shrink-0 ms-2 font-medium"
                >
                  فتح النسخة
                </Link>
              </div>
            ) : !isNew ? (
              <div className="pt-1">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCreateTwin}
                  disabled={createTwinMutation.isPending}
                  className="text-xs h-8 gap-1 font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  <span>
                    {lang === 'ar'
                      ? 'إنشاء نسخة مترجمة بالإنجليزية'
                      : 'إنشاء نسخة مترجمة بالعربية'}
                  </span>
                </Button>
              </div>
            ) : (
              <span className="text-content-muted block pt-1">
                احفظ المقال أولاً لربطه بنسخة مترجمة.
              </span>
            )}
          </div>

          {/* Tags with Inline Creator */}
          <FormField label="الوسوم المرتبطة">
            <div className="space-y-2">
              {/* Selected Tags list */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-surface-soft rounded-control border border-surface-border">
                {selectedTagIds.length === 0 ? (
                  <span className="text-xs text-content-muted self-center">لا توجد وسوم محددة</span>
                ) : (
                  selectedTagIds.map((tagId) => {
                    const tag = allTags.find((t) => t.id === tagId)
                    if (!tag) return null
                    return (
                      <span
                        key={tag.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-brand-50 text-brand-700 border border-brand-200 font-medium"
                      >
                        #{tag.name_ar}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTagIds(selectedTagIds.filter((id) => id !== tag.id))
                            setIsDirty(true)
                          }}
                          className="hover:text-feedback-error ms-1"
                        >
                          ×
                        </button>
                      </span>
                    )
                  })
                )}
              </div>

              {/* Inline New Tag Input */}
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleCreateNewTag()
                    }
                  }}
                  placeholder="إضافة وسم جديد..."
                  className="flex-1 px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCreateNewTag}
                  disabled={!newTagInput.trim() || createTagMutation.isPending}
                  className="h-9 text-xs px-3 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5 me-1" />
                  <span>إضافة</span>
                </Button>
              </div>

              {/* Available tags to click */}
              {allTags.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] text-content-muted block mb-1.5">
                    الوسوم المتوفرة (انقر للإضافة):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {allTags
                      .filter((t) => !selectedTagIds.includes(t.id))
                      .map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => {
                            setSelectedTagIds([...selectedTagIds, tag.id])
                            setIsDirty(true)
                          }}
                          className="text-[11px] px-2.5 py-1 rounded bg-surface-soft hover:bg-brand-50 hover:text-brand-700 border border-surface-border text-content-body transition-colors"
                        >
                          +{tag.name_ar}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </FormField>
        </div>

        {/* Section 5: SEO Settings & SERP Preview */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-sm text-content-heading pb-3 border-b border-surface-border flex items-center justify-between">
            <span>إعدادات تحسين محركات البحث (SEO)</span>
            <Globe className="w-4 h-4 text-brand-600" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SEO Title */}
            <FormField label="عنوان الـ SEO">
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => {
                  setSeoTitle(e.target.value)
                  setIsDirty(true)
                }}
                placeholder={title || 'العنوان لمحركات البحث...'}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
              <div className="flex justify-between text-[11px] mt-1">
                <span className="text-content-muted">المثالي: 30 إلى 60 حرفاً</span>
                <span
                  className={
                    (seoTitle || title).length >= 30 && (seoTitle || title).length <= 60
                      ? 'text-emerald-600 font-bold'
                      : 'text-amber-600'
                  }
                >
                  {(seoTitle || title).length} حرفاً
                </span>
              </div>
            </FormField>

            {/* Focus Keyword */}
            <FormField label="الكلمة المفتاحية المستهدفة (Focus Keyword)">
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => {
                  setFocusKeyword(e.target.value)
                  setIsDirty(true)
                }}
                placeholder="مثال: صيانة مصاعد جدة"
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>
          </div>

          {/* Meta Description */}
          <FormField label="الوصف التعريفي (Meta Description)">
            <textarea
              rows={3}
              value={seoDescription}
              onChange={(e) => {
                setSeoDescription(e.target.value)
                setIsDirty(true)
              }}
              placeholder={excerpt || 'الوصف المختصر في نتائج البحث...'}
              className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
            <div className="flex justify-between text-[11px] mt-1">
              <span className="text-content-muted">المثالي: 120 إلى 160 حرفاً</span>
              <span
                className={
                  (seoDescription || excerpt).length >= 120 &&
                  (seoDescription || excerpt).length <= 160
                    ? 'text-emerald-600 font-bold'
                    : 'text-amber-600'
                }
              >
                {(seoDescription || excerpt).length} حرفاً
              </span>
            </div>
          </FormField>

          {/* Secondary Keywords */}
          <FormField label="الكلمات المفتاحية الثانوية (حد أقصى 5)">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {secondaryKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-surface-soft border border-surface-border text-content-heading font-medium"
                  >
                    {kw}
                    <button
                      type="button"
                      onClick={() => handleRemoveSecondaryKeyword(kw)}
                      className="hover:text-feedback-error ms-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {secondaryKeywords.length < 5 && (
                <input
                  type="text"
                  value={secondaryInput}
                  onChange={(e) => setSecondaryInput(e.target.value)}
                  onKeyDown={handleAddSecondaryKeyword}
                  placeholder="اكتب كلمة مفتاحية ثانوية واضغط Enter..."
                  className="w-full max-w-md px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                />
              )}
            </div>
          </FormField>

          {/* Canonical URL & Schema in 2 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-surface-border">
            {/* Canonical URL */}
            <FormField label="الرابط القانوني المخصص (Canonical URL - اختياري)">
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => {
                  setCanonicalUrl(e.target.value)
                  setIsDirty(true)
                }}
                placeholder="https://almubtakirah.com/ar/blog/..."
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
                dir="ltr"
              />
              <p className="text-[11px] text-content-muted mt-1">
                اتركه فارغاً ليتم استخدام رابط المقال الافتراضي كـ Canonical تلقائياً.
              </p>
            </FormField>

            {/* Schema Type */}
            <FormField label="نوع البيانات المنظمة (Schema)">
              <select
                value={schemaType}
                onChange={(e) => {
                  setSchemaType(e.target.value as SchemaType)
                  setIsDirty(true)
                }}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              >
                <option value="BlogPosting">BlogPosting (مقال مدونة - موصى به)</option>
                <option value="Article">Article (مقال عام)</option>
                <option value="NewsArticle">NewsArticle (خبر صحفي)</option>
              </select>
            </FormField>
          </div>

          {/* Robots Checkboxes */}
          <div className="flex items-center gap-6 text-xs pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={robotsNoindex}
                onChange={(e) => {
                  setRobotsNoindex(e.target.checked)
                  setIsDirty(true)
                }}
                className="rounded border-surface-border text-brand-600 focus:ring-brand-500"
              />
              <span className="text-content-heading font-medium">منع الفهرسة (noindex)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={robotsNofollow}
                onChange={(e) => {
                  setRobotsNofollow(e.target.checked)
                  setIsDirty(true)
                }}
                className="rounded border-surface-border text-brand-600 focus:ring-brand-500"
              />
              <span className="text-content-heading font-medium">منع تتبع الروابط (nofollow)</span>
            </label>
          </div>

          {/* SERP Preview (Google Snippet) */}
          <div className="pt-3 border-t border-surface-border space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-content-heading">
              <span>معاينة نتيجة بحث Google</span>
              <div className="flex items-center gap-1 bg-surface-soft p-0.5 rounded-control border border-surface-border text-[10px]">
                <button
                  type="button"
                  onClick={() => setSerpDevice('desktop')}
                  className={`px-2 py-0.5 rounded ${
                    serpDevice === 'desktop' ? 'bg-white font-bold shadow-xs text-brand-600' : 'text-content-muted'
                  }`}
                >
                  كمبيوتر
                </button>
                <button
                  type="button"
                  onClick={() => setSerpDevice('mobile')}
                  className={`px-2 py-0.5 rounded ${
                    serpDevice === 'mobile' ? 'bg-white font-bold shadow-xs text-brand-600' : 'text-content-muted'
                  }`}
                >
                  هاتف
                </button>
              </div>
            </div>

            {/* SERP Card */}
            <div
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="p-3.5 bg-surface-soft border border-surface-border rounded-control text-start space-y-1.5"
            >
              <div className="text-[11px] text-content-muted truncate" dir="ltr">
                https://almubtakirah.com › {lang} › blog › {slug || 'article'}
              </div>
              <div className="text-sm font-medium text-blue-700 hover:underline line-clamp-1 cursor-pointer">
                {seoTitle || title || 'عنوان المقال التجريبي في محرك البحث'}
              </div>
              <div className="text-xs text-content-body line-clamp-2">
                {seoDescription ||
                  excerpt ||
                  'هنا سيظهر وصف المقال المعروض للزوار في محرك بحث جوجل ومواقع التواصل الاجتماعي...'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Social Sharing (OG Card) */}
        <div className="bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs">
          <h3 className="font-bold text-sm text-content-heading pb-3 border-b border-surface-border flex items-center justify-between">
            <span>بطاقة التواصل الاجتماعي (Open Graph)</span>
            <Share2 className="w-4 h-4 text-brand-600" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="عنوان المشاركة (OG Title)">
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => {
                  setOgTitle(e.target.value)
                  setIsDirty(true)
                }}
                placeholder={seoTitle || title || 'عنوان البطاقة...'}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>

            <FormField label="وصف المشاركة (OG Description)">
              <textarea
                rows={2}
                value={ogDescription}
                onChange={(e) => {
                  setOgDescription(e.target.value)
                  setIsDirty(true)
                }}
                placeholder={seoDescription || excerpt || 'وصف البطاقة...'}
                className="w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-content-heading">
              صورة المشاركة (تستخدم الصورة البارزة افتراضياً)
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsOgPickerOpen(true)}
                className="text-xs font-semibold"
              >
                اختيار صورة مخصصة
              </Button>
              {ogImageUrl && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setOgImageId(null)
                    setOgImageUrl(null)
                    setIsDirty(true)
                  }}
                  className="text-xs text-feedback-error font-semibold"
                >
                  إعادة للافتراضي
                </Button>
              )}
            </div>
          </div>

          {/* Social Card Preview */}
          <div
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="rounded-control border border-surface-border overflow-hidden bg-surface-soft text-start max-w-lg"
          >
            <div className="aspect-[1.91/1] w-full bg-slate-100 overflow-hidden">
              <img
                src={ogImageUrl || featuredImageUrl || '/brand/og-default.png'}
                alt="OG Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="p-3.5 space-y-1">
              <div className="text-[10px] text-content-muted uppercase font-mono">
                almubtakirah.com
              </div>
              <div className="text-xs font-bold text-content-heading line-clamp-1">
                {ogTitle || seoTitle || title || 'عنوان المقال'}
              </div>
              <div className="text-[11px] text-content-muted line-clamp-2">
                {ogDescription || seoDescription || excerpt || 'وصف المقال لمواقع التواصل...'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Live SEO Analyzer */}
        <SeoAnalyzerPanel
          seoData={seoResult}
          isAnalyzing={isSeoAnalyzing}
          focusKeyword={focusKeyword}
        />

        {/* Section 8: Derived FAQ Section Preview */}
        {derivedFaqs.length > 0 && (
          <div className="bg-white border border-surface-border rounded-card p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-content-heading">
                  الأسئلة الشائعة المستخرجة تلقائياً ({derivedFaqs.length})
                </h3>
              </div>
              <span className="text-xs text-content-muted">
                تُدرج تلقائياً في بيانات الـ FAQPage المنسقة للـ Rich Snippets
              </span>
            </div>

            <div className="space-y-2">
              {derivedFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-control bg-surface-soft border border-surface-border text-xs space-y-1"
                >
                  <div className="font-bold text-content-heading">
                    س: {faq.q}
                  </div>
                  <div className="text-content-body">
                    ج: {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 9: Bottom Actions Bar */}
        <div className="bg-white border border-surface-border rounded-card p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-content-muted flex items-center gap-2">
            <span>الحفظ التلقائي: مفعّل (كل 30ث)</span>
            {lastSavedAt && <span>• آخر حفظ: {lastSavedAt}</span>}
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {!isNew && status === 'published' && (
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-control border border-surface-border hover:bg-surface-soft text-content-body transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>معاينة المقال المباشر</span>
              </a>
            )}
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => handleSave('draft')}
              disabled={createPostMutation.isPending || updatePostMutation.isPending}
              className="flex-1 sm:flex-none px-5 font-bold border-surface-border text-content-body hover:bg-surface-soft hover:border-brand-600 hover:text-brand-600"
            >
              حفظ كمسودة
            </Button>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={() => handleSave('published')}
              disabled={createPostMutation.isPending || updatePostMutation.isPending}
              className="flex-1 sm:flex-none px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap"
              leftIcon={<Save className="w-4 h-4" aria-hidden="true" />}
            >
              {status === 'published' ? 'تحديث ونشر المقال' : 'نشر المقال الآن'}
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Image MediaPicker Modal */}
      <MediaPicker
        open={isFeaturedPickerOpen}
        onClose={() => setIsFeaturedPickerOpen(false)}
        onSelect={handleFeaturedImageSelect}
        mode="single"
        accept="image"
        title="اختيار الصورة البارزة للمقال"
      />

      {/* OG Image MediaPicker Modal */}
      <MediaPicker
        open={isOgPickerOpen}
        onClose={() => setIsOgPickerOpen(false)}
        onSelect={handleOgImageSelect}
        mode="single"
        accept="image"
        title="اختيار صورة بطاقة المشاركة الاجتماعية"
      />

      {/* Low SEO Score Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isLowSeoConfirmOpen}
        onClose={() => setIsLowSeoConfirmOpen(false)}
        onConfirm={() => {
          setIsLowSeoConfirmOpen(false)
          handleSave('published', true)
        }}
        title="تنبيه: نتيجة السيو منخفضة"
        description={`نتيجة تحسين محركات البحث الحالية للمقال هي ${seoResult.score}/100 (أقل من 50). يُفضل مراجعة توصيات السيو وتطبيقها لتحسين ترتيب المقال في نتائج بحث جوجل. هل ترغب في الاستمرار ونشر المقال الآن على أي حال؟`}
        confirmText="متابعة النشر على أي حال"
        cancelText="العودة وإصلاح الملاحظات"
        isDestructive={false}
      />
    </div>
  )
}

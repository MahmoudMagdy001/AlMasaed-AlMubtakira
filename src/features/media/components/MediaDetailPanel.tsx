import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  Copy,
  ExternalLink,
  Trash2,
  RefreshCw,
  Save,
  AlertTriangle,
  FileText,
  Check,
  Folder,
  Layers,
  Calendar,
  HardDrive,
  Info,
} from 'lucide-react'
import type { MediaRow, MediaFolder } from '../types'
import { useMediaUsage, useUpdateMedia, useDeleteMedia } from '../useMedia'
import { replaceMediaFile } from '../mediaService'
import { getStoragePublicUrl } from '@/lib/media'
import { useToast } from '@/components/ui'
import { ConfirmDialog } from '@/components/admin'

export interface MediaDetailPanelProps {
  media: MediaRow | null
  onClose: () => void
  onDeleted?: () => void
}

export const MediaDetailPanel: React.FC<MediaDetailPanelProps> = ({
  media,
  onClose,
  onDeleted,
}) => {
  const { success, error } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [altText, setAltText] = useState('')
  const [title, setTitle] = useState('')
  const [folder, setFolder] = useState<MediaFolder>('general')
  const [isCopied, setIsCopied] = useState(false)
  const [isReplacing, setIsReplacing] = useState(false)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)

  const { data: usageReport, isLoading: isCheckingUsage } = useMediaUsage(
    media?.id || null,
    media?.storage_path || null,
  )

  const updateMutation = useUpdateMedia()
  const deleteMutation = useDeleteMedia()

  useEffect(() => {
    if (media) {
      setAltText(media.alt_text || '')
      setTitle(media.title || '')
      setFolder((media.folder as MediaFolder) || 'general')
      setIsCopied(false)
    }
  }, [media])

  if (!media) return null

  const isImage = media.mime_type.startsWith('image/')
  const publicUrl = getStoragePublicUrl(media.storage_path)
  const hasMissingAlt = isImage && !altText.trim()

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setIsCopied(true)
      success('تم نسخ الرابط', 'تم نسخ رابط الملف المباشر إلى الحافظة بنجاح.')
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      error('تعذر النسخ', 'يرجى نسخ الرابط يدوياً.')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateMutation.mutateAsync({
        id: media.id,
        updates: {
          alt_text: altText.trim() || null,
          title: title.trim() || null,
          folder,
        },
      })
      success('تم الحفظ', 'تم تحديث بيانات الملف بنجاح.')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل التحديث'
      error('خطأ', msg)
    }
  }

  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsReplacing(true)
    try {
      await replaceMediaFile(media.id, file)
      success('تم استبدال الملف', 'تم تحديث ملف الوسائط وتوليد الأحجام الجديدة بنجاح.')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل الاستبدال'
      error('فشل الاستبدال', msg)
    } finally {
      setIsReplacing(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        id: media.id,
        force: true, // User confirmed via dialog
      })
      success('تم حذف الملف', 'تم إزالة الملف وكافة أحجامه من التخزين وقاعدة البيانات.')
      setIsConfirmDeleteOpen(false)
      onDeleted?.()
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل الحذف'
      error('تعذر الحذف', msg)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-sand-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 end-0 z-50 w-full max-w-md bg-white shadow-elevated border-s border-sand-200 flex flex-col animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-panel-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand-100 bg-sand-50/50">
          <div className="min-w-0">
            <h2 id="detail-panel-title" className="text-sm font-bold text-sand-900 truncate">
              {title || media.file_name}
            </h2>
            <p className="text-[11px] text-sand-500 font-mono truncate">
              {media.storage_path}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors"
            aria-label="إغلاق اللوحة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Preview Box */}
          <div className="relative rounded-xl border border-sand-200 bg-sand-100/70 p-3 flex items-center justify-center min-h-[200px] max-h-[260px] overflow-hidden">
            {isImage ? (
              <img
                src={publicUrl}
                alt={altText || title || media.file_name}
                className="max-h-[230px] w-auto object-contain rounded-lg shadow-xs"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-sand-500">
                <FileText className="w-14 h-14 text-red-500 mb-2" />
                <span className="text-xs font-bold text-sand-800">مستند PDF</span>
                <span className="text-[11px] text-sand-500">{media.file_name}</span>
              </div>
            )}
          </div>

          {/* Quick Actions (Copy URL, Open in tab) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-800 transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-sand-500" />
                  <span>نسخ الرابط المباشر</span>
                </>
              )}
            </button>
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-700 transition-colors"
              title="فتح في نافذة جديدة"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Metadata Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs p-3.5 rounded-xl bg-sand-50 border border-sand-200">
            <div className="flex items-center gap-2 text-sand-600">
              <HardDrive className="w-3.5 h-3.5 text-sand-400 shrink-0" />
              <span>الحجم:</span>
              <strong className="text-sand-900 font-medium">
                {(media.size_bytes / 1024).toFixed(1)} ك.ب
              </strong>
            </div>

            <div className="flex items-center gap-2 text-sand-600">
              <Layers className="w-3.5 h-3.5 text-sand-400 shrink-0" />
              <span>الأبعاد:</span>
              <strong className="text-sand-900 font-medium">
                {media.width && media.height ? `${media.width} × ${media.height}` : 'غير محدد'}
              </strong>
            </div>

            <div className="flex items-center gap-2 text-sand-600">
              <Calendar className="w-3.5 h-3.5 text-sand-400 shrink-0" />
              <span>تاريخ الرفع:</span>
              <strong className="text-sand-900 font-medium">
                {new Date(media.created_at).toLocaleDateString('ar-SA')}
              </strong>
            </div>

            <div className="flex items-center gap-2 text-sand-600">
              <Folder className="w-3.5 h-3.5 text-sand-400 shrink-0" />
              <span>الامتداد:</span>
              <strong className="text-sand-900 font-medium uppercase">
                {media.mime_type.split('/')[1]}
              </strong>
            </div>
          </div>

          {/* Missing Alt Warning */}
          {hasMissingAlt && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">تنبيه سيو: الصورة تفتقر إلى النص البديل</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  وجود نص بديل معبر أمر ضروري لمحركات البحث ولإمكانية الوصول للمستخدمين ذوي الإعاقة البصرية.
                </p>
              </div>
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            {/* Alt text field */}
            <div>
              <label className="block text-xs font-semibold text-sand-800 mb-1">
                النص البديل (Alt Text) {isImage && <span className="text-red-500">*</span>}
              </label>
              <textarea
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                rows={2}
                placeholder="صف محتوى الصورة بدقة لمساعدة محركات البحث..."
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 ${
                  hasMissingAlt
                    ? 'border-amber-300 focus:ring-amber-400/30'
                    : 'border-sand-300 focus:ring-brand-primary/30 focus:border-brand-primary'
                }`}
              />
            </div>

            {/* Title field */}
            <div>
              <label className="block text-xs font-semibold text-sand-800 mb-1">
                عنوان الملف / التسمية التوضيحية
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان تعريفي للملف..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
              />
            </div>

            {/* Folder field */}
            <div>
              <label className="block text-xs font-semibold text-sand-800 mb-1">
                المجلد
              </label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value as MediaFolder)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
              >
                <option value="general">عام (General)</option>
                <option value="blog">المدونة (Blog)</option>
                <option value="works">المشاريع (Works)</option>
                <option value="partners">الشركاء (Partners)</option>
                <option value="branding">الهوية والعلامة التجارية (Branding)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary/95 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{updateMutation.isPending ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
            </button>
          </form>

          {/* Usage Detection Section */}
          <div className="pt-4 border-t border-sand-200 space-y-2">
            <h3 className="text-xs font-bold text-sand-900 flex items-center justify-between">
              <span>أماكن استخدام الملف (Used in)</span>
              {isCheckingUsage && (
                <span className="text-[10px] text-sand-400 font-normal">جاري الفحص...</span>
              )}
            </h3>

            {usageReport?.isUsed ? (
              <div className="space-y-1.5">
                <div className="p-2.5 rounded-lg bg-sand-50 border border-sand-200 text-xs space-y-1.5">
                  <div className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>مستخدم في {usageReport.items.length} موضع:</span>
                  </div>
                  <ul className="divide-y divide-sand-200/60">
                    {usageReport.items.map((u, i) => (
                      <li key={i} className="py-1.5 flex items-center justify-between gap-2">
                        <div className="truncate">
                          <span className="font-medium text-sand-900">{u.title}</span>
                          <span className="text-[10px] text-sand-500 block">({u.field})</span>
                        </div>
                        {u.url && (
                          <a
                            href={u.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-primary hover:underline text-[11px] shrink-0"
                          >
                            عرض
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-xs text-sand-500 bg-sand-50 p-2.5 rounded-lg border border-sand-200">
                هذا الملف غير مستخدم حالياً في أي مقال أو مشروع أو شريك.
              </p>
            )}
          </div>

          {/* File Operations (Replace / Delete) */}
          <div className="pt-4 border-t border-sand-200 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf"
              onChange={handleReplaceFile}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isReplacing}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-800 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReplacing ? 'animate-spin' : ''}`} />
              <span>{isReplacing ? 'جاري استبدال الملف...' : 'استبدال الملف بملف جديد'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsConfirmDeleteOpen(true)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 hover:bg-red-100/80 text-red-700 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>حذف الملف نهائياً</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        title="تأكيد حذف ملف الوسائط"
        description={
          usageReport?.isUsed
            ? `تحذير هام: هذا الملف مستخدم حالياً في (${usageReport.items.length}) مواضع (مثل: ${usageReport.items[0]?.title}). حذفه سيؤدي إلى ظهور صور مفقودة في الموقع. هل أنت متأكد من الحذف القسري؟`
            : 'هل أنت متأكد من حذف هذا الملف نهائياً؟ سيتم مسح كافة أحجامه المتولدة من مساحة التخزين ولا يمكن التراجع عن هذا الإجراء.'
        }
        confirmText="نعم، احذف الملف"
        cancelText="إلغاء"
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}

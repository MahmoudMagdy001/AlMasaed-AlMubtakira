import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileImage,
  FileText,
  Loader2,
  Save,
  ArrowRight,
} from 'lucide-react'
import { MediaDropzone } from './MediaDropzone'
import { uploadMedia, checkDuplicateMedia, updateMedia } from '../mediaService'
import type { MediaFolder, UploadQueueItem, MediaRow } from '../types'
import { useToast } from '@/components/ui'

export interface MediaUploadModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: (uploadedMedia: MediaRow[]) => void
  initialFolder?: MediaFolder
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  open,
  onClose,
  onSuccess,
  initialFolder = 'general',
}) => {
  const { success, error } = useToast()
  const [targetFolder, setTargetFolder] = useState<MediaFolder>(initialFolder)
  const [queue, setQueue] = useState<UploadQueueItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const abortControllersRef = useRef<Map<string, boolean>>(new Map())

  useEffect(() => {
    if (open) {
      setTargetFolder(initialFolder)
    } else {
      setQueue([])
      setIsProcessing(false)
      abortControllersRef.current.clear()
    }
  }, [open, initialFolder])

  // Handle files selected via dropzone
  const handleFilesSelected = (files: File[]) => {
    const newItems: UploadQueueItem[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      progress: 0,
      status: 'pending',
      altText: '',
      title: file.name.replace(/\.[^/.]+$/, ''),
      folder: targetFolder,
    }))

    setQueue((prev) => [...prev, ...newItems])
  }

  // Trigger processing and upload for pending items
  useEffect(() => {
    const pendingItems = queue.filter((i) => i.status === 'pending')
    if (pendingItems.length === 0 || isProcessing) return

    setIsProcessing(true)

    const processItem = async (item: UploadQueueItem) => {
      // 1. Mark processing
      setQueue((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: 'processing', progress: 15 } : i)),
      )

      // 2. Duplicate check
      try {
        const dupCheck = await checkDuplicateMedia(item.file.name, item.file.size)
        if (dupCheck.isDuplicate) {
          setQueue((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, isDuplicate: true } : i)),
          )
        }
      } catch (err) {
        console.warn('Duplicate check skipped:', err)
      }

      // Check if cancelled
      if (abortControllersRef.current.get(item.id)) {
        setQueue((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: 'cancelled' } : i)),
        )
        return
      }

      // 3. Upload with progress
      try {
        setQueue((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: 'uploading' } : i)),
        )

        const result = await uploadMedia(item.file, {
          folder: item.folder,
          altText: item.altText,
          title: item.title,
          onProgress: (percent) => {
            setQueue((prev) =>
              prev.map((i) => (i.id === item.id ? { ...i, progress: percent } : i)),
            )
          },
        })

        setQueue((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: 'done',
                  progress: 100,
                  result,
                  altText: result.alt_text || '',
                  title: result.title || '',
                }
              : i,
          ),
        )
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'فشل رفع الملف'
        setQueue((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: 'error', progress: 0, errorMessage: errorMsg }
              : i,
          ),
        )
      }
    }

    const runAll = async () => {
      for (const item of pendingItems) {
        await processItem(item)
      }
      setIsProcessing(false)
    }

    runAll()
  }, [queue, isProcessing])

  // Cancel pending/processing item
  const handleCancel = (id: string) => {
    abortControllersRef.current.set(id, true)
    setQueue((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: 'cancelled', errorMessage: 'تم إلغاء الرفع' } : i,
      ),
    )
  }

  // Update alt text / title for an uploaded item
  const handleSaveMetadata = async (item: UploadQueueItem) => {
    if (!item.result?.id) return

    try {
      const updated = await updateMedia(item.result.id, {
        alt_text: item.altText,
        title: item.title,
        folder: item.folder,
      })

      setQueue((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, result: updated } : i)),
      )

      success('تم حفظ البيانات', 'تم تحديث النص البديل وعنوان الملف بنجاح.')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل الحفظ'
      error('خطأ أثناء الحفظ', msg)
    }
  }

  // Complete modal flow
  const handleFinish = () => {
    const doneItems = queue
      .map((i) => i.result)
      .filter((r): r is MediaRow => Boolean(r))

    if (doneItems.length > 0) {
      onSuccess?.(doneItems)
    }
    onClose()
  }

  if (!open) return null

  const hasDoneItems = queue.some((i) => i.status === 'done')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sand-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-elevated w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-sand-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand-100 bg-sand-50/50">
          <div>
            <h2 id="upload-modal-title" className="text-base font-bold text-sand-900">
              رفع ملفات وسائط جديدة
            </h2>
            <p className="text-xs text-sand-500 mt-0.5">
              يتم معالجة الصور وتحويلها تلقائياً إلى صيغة WebP بأحجام متجاوبة وسريعة التحميل
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Target Folder Selector */}
          <div className="flex items-center justify-between gap-4 p-3 bg-sand-50 rounded-xl border border-sand-200 text-xs">
            <span className="font-semibold text-sand-700">مجلد الحفظ الافتراضي:</span>
            <select
              value={targetFolder}
              onChange={(e) => setTargetFolder(e.target.value as MediaFolder)}
              className="bg-white border border-sand-300 rounded-lg py-1.5 px-3 text-xs text-sand-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            >
              <option value="general">عام (General)</option>
              <option value="blog">المدونة (Blog)</option>
              <option value="works">المشاريع (Works)</option>
              <option value="partners">الشركاء (Partners)</option>
              <option value="branding">الهوية والعلامة التجارية (Branding)</option>
            </select>
          </div>

          {/* Dropzone */}
          <MediaDropzone onFilesSelected={handleFilesSelected} disabled={isProcessing} compact />

          {/* Upload Queue */}
          {queue.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-sand-800 uppercase tracking-wider">
                قائمة الملفات ({queue.length})
              </h3>

              <div className="space-y-3">
                {queue.map((item) => {
                  const isImage = item.file.type.startsWith('image/')
                  const isPdf = item.file.type === 'application/pdf'
                  const isDone = item.status === 'done'

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-sand-200 bg-sand-50/30 space-y-3"
                    >
                      {/* Top: File info & status */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center shrink-0 text-brand-primary">
                            {isPdf ? (
                              <FileText className="w-4 h-4" />
                            ) : (
                              <FileImage className="w-4 h-4" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-sand-900 truncate">
                              {item.file.name}
                            </p>
                            <p className="text-[11px] text-sand-500">
                              {(item.file.size / 1024).toFixed(0)} كيلوبايت •{' '}
                              {item.file.type.split('/')[1]?.toUpperCase()}
                            </p>
                          </div>
                        </div>

                        {/* Status / Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {item.status === 'done' && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              اكتمل
                            </span>
                          )}
                          {item.status === 'error' && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                              <AlertCircle className="w-3.5 h-3.5" />
                              فشل
                            </span>
                          )}
                          {(item.status === 'processing' || item.status === 'uploading') && (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-primary">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                {item.status === 'processing' ? 'معالجة...' : 'جاري الرفع...'}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCancel(item.id)}
                                className="text-xs text-sand-400 hover:text-red-500"
                              >
                                إلغاء
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Duplicate Warning */}
                      {item.isDuplicate && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                          <span>تنبيه: يوجد ملف سابق بنفس الاسم والحجم في مكتبة الوسائط.</span>
                        </div>
                      )}

                      {/* Error Message */}
                      {item.errorMessage && (
                        <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                          {item.errorMessage}
                        </p>
                      )}

                      {/* Progress bar */}
                      {(item.status === 'uploading' || item.status === 'processing') && (
                        <div className="w-full bg-sand-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-brand-primary h-1.5 transition-all duration-300 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}

                      {/* Post-Upload Metadata Form (Alt Text + Title Prompt) */}
                      {isDone && isImage && (
                        <div className="pt-2 border-t border-sand-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[11px] font-semibold text-sand-700">
                                النص البديل (Alt Text) <span className="text-red-500">*</span>
                              </label>
                              {!item.altText.trim() && (
                                <span className="text-[10px] text-amber-600 font-medium">
                                  مطلوب للسيو وتسهيل الوصول
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              value={item.altText}
                              onChange={(e) =>
                                setQueue((prev) =>
                                  prev.map((i) =>
                                    i.id === item.id ? { ...i, altText: e.target.value } : i,
                                  ),
                                )
                              }
                              placeholder="وصف دقيق لمحتوى الصورة..."
                              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                                !item.altText.trim()
                                  ? 'border-amber-300 focus:ring-amber-400'
                                  : 'border-sand-300 focus:ring-brand-primary'
                              }`}
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[11px] font-semibold text-sand-700">
                                عنوان الصورة (Title)
                              </label>
                              <button
                                type="button"
                                onClick={() => handleSaveMetadata(item)}
                                className="inline-flex items-center gap-1 text-[11px] text-brand-primary hover:underline font-medium"
                              >
                                <Save className="w-3 h-3" />
                                حفظ التعديل
                              </button>
                            </div>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                setQueue((prev) =>
                                  prev.map((i) =>
                                    i.id === item.id ? { ...i, title: e.target.value } : i,
                                  ),
                                )
                              }
                              placeholder="عنوان الملف..."
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-sand-100 bg-sand-50/50">
          <span className="text-xs text-sand-500">
            {isProcessing ? 'جاري معالجة ورفع الملفات...' : 'جاهز'}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-sand-700 hover:bg-sand-100 rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleFinish}
              disabled={isProcessing && !hasDoneItems}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary/95 rounded-lg transition-colors disabled:opacity-50"
            >
              <span>{hasDoneItems ? 'إتمام وإضافة' : 'إغلاق'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect, useCallback, useId } from 'react'
import {
  X,
  Search,
  Upload,
  Check,
  FileText,
  AlertTriangle,
  Image as ImageIcon,
} from 'lucide-react'
import { useMediaList } from '@/features/media/useMedia'
import { MediaUploadModal } from '@/features/media/components/MediaUploadModal'
import type { MediaRow, MediaFolder, MediaTypeFilter } from '@/features/media/types'
import { getStoragePublicUrl } from '@/lib/media'
import { Button } from '@/components/ui'

export interface MediaPickerProps {
  open: boolean
  onClose: () => void
  onSelect: (selected: MediaRow | MediaRow[]) => void
  mode?: 'single' | 'multi'
  accept?: 'image' | 'pdf' | 'all'
  initialFolder?: MediaFolder
  title?: string
}

export const MediaPicker: React.FC<MediaPickerProps> = ({
  open,
  onClose,
  onSelect,
  mode = 'single',
  accept = 'all',
  initialFolder,
  title = 'اختيار ملف من مكتبة الوسائط',
}) => {
  const dialogId = useId()
  const [search, setSearch] = useState('')
  const [folder, setFolder] = useState<MediaFolder | 'all'>(initialFolder || 'all')
  const [selectedMap, setSelectedMap] = useState<Record<string, MediaRow>>({})
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setSearch('')
      setFolder(initialFolder || 'all')
      setSelectedMap({})
    }
  }, [open, initialFolder])

  // Keyboard navigation: Escape closes dialog
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [open, onClose],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const typeFilter: MediaTypeFilter = accept === 'image' ? 'image' : accept === 'pdf' ? 'pdf' : 'all'

  const { data, isLoading } = useMediaList({
    page: 1,
    pageSize: 60,
    filter: {
      search,
      folder,
      type: typeFilter,
      sort: 'newest',
    },
  })

  const items = data?.items || []

  const handleToggleSelect = (item: MediaRow) => {
    if (mode === 'single') {
      setSelectedMap({ [item.id]: item })
    } else {
      setSelectedMap((prev) => {
        const next = { ...prev }
        if (next[item.id]) {
          delete next[item.id]
        } else {
          next[item.id] = item
        }
        return next
      })
    }
  }

  const handleConfirm = () => {
    const selectedList = Object.values(selectedMap)
    if (selectedList.length === 0) return

    if (mode === 'single') {
      onSelect(selectedList[0])
    } else {
      onSelect(selectedList)
    }
    onClose()
  }

  const handleUploadSuccess = (newMedia: MediaRow[]) => {
    if (newMedia.length > 0) {
      if (mode === 'single') {
        setSelectedMap({ [newMedia[0].id]: newMedia[0] })
      } else {
        const update = { ...selectedMap }
        for (const item of newMedia) {
          update[item.id] = item
        }
        setSelectedMap(update)
      }
    }
    setIsUploadModalOpen(false)
  }

  if (!open) return null

  const selectedCount = Object.keys(selectedMap).length

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sand-900/60 backdrop-blur-sm animate-in fade-in duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-title`}
      >
        <div className="bg-white rounded-2xl shadow-elevated w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-sand-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sand-100 bg-sand-50/50">
            <div>
              <h2 id={`${dialogId}-title`} className="text-base font-bold text-sand-900">
                {title}
              </h2>
              <p className="text-xs text-sand-500 mt-0.5">
                {mode === 'single'
                  ? 'انقر على الصورة لاختيارها'
                  : 'يمكنك اختيار أكثر من صورة بالنقر عليها'}
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

          {/* Search, Folder Filter, and Direct Upload Action */}
          <div className="p-4 border-b border-sand-100 flex flex-wrap items-center justify-between gap-3 bg-white">
            <div className="flex items-center gap-3 flex-1 min-w-[240px]">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="بحث في الوسائط..."
                  className="w-full ps-9 pe-4 py-1.5 border border-sand-300 rounded-lg text-xs bg-sand-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* Folder Selector */}
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value as MediaFolder | 'all')}
                className="bg-sand-50 border border-sand-300 rounded-lg py-1.5 px-2.5 text-xs text-sand-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="all">كل المجلدات</option>
                <option value="general">عام (General)</option>
                <option value="blog">المدونة (Blog)</option>
                <option value="works">المشاريع (Works)</option>
                <option value="partners">الشركاء (Partners)</option>
                <option value="branding">الهوية (Branding)</option>
              </select>
            </div>

            {/* Upload Button inside dialog */}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsUploadModalOpen(true)}
              leftIcon={<Upload className="w-3.5 h-3.5" />}
              className="border-brand-200 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold px-3 py-1.5 text-xs shadow-2xs shrink-0"
            >
              رفع ملف جديد
            </Button>
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-lg bg-sand-100 aspect-square"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="p-12 text-center text-sand-500 space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto text-sand-300" />
                <p className="text-xs font-medium">لا توجد وسائط مطابقة</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {items.map((item) => {
                  const isSelected = Boolean(selectedMap[item.id])
                  const isImage = item.mime_type.startsWith('image/')
                  const publicUrl = getStoragePublicUrl(item.storage_path)

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggleSelect(item)}
                      className={`group relative rounded-xl border overflow-hidden aspect-square flex flex-col items-center justify-center p-1 transition-all ${
                        isSelected
                          ? 'border-brand-600 ring-2 ring-brand-500/30 bg-brand-50/50'
                          : 'border-sand-200 hover:border-sand-300 bg-sand-50/50'
                      }`}
                      aria-pressed={isSelected}
                      title={item.title || item.file_name}
                    >
                      {isImage ? (
                        <img
                          src={publicUrl}
                          alt={item.alt_text || item.title || item.file_name}
                          loading="lazy"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <FileText className="w-8 h-8 text-red-500" />
                      )}

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-1.5 start-1.5 w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Missing Alt Warning */}
                      {isImage && !item.alt_text?.trim() && (
                        <div
                          className="absolute top-1.5 end-1.5 p-1 rounded bg-amber-500/90 text-white"
                          title="بدون نص بديل"
                        >
                          <AlertTriangle className="w-2.5 h-2.5" />
                        </div>
                      )}

                      {/* Folder hint */}
                      <span className="absolute bottom-1 inset-x-1 text-[9px] text-center truncate px-1 py-0.5 rounded bg-sand-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.title || item.file_name}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-sand-100 bg-sand-50/50">
            <span className="text-xs text-sand-600 font-medium">
              تم تحديد: {selectedCount} {selectedCount === 1 ? 'عنصر' : 'عناصر'}
            </span>
            <div className="flex items-center gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onClose}
                className="border-sand-300 text-sand-700 hover:bg-sand-100 font-medium px-4 py-2"
              >
                إلغاء
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleConfirm}
                disabled={selectedCount === 0}
                leftIcon={<Check className="w-4 h-4" />}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs px-5 py-2"
              >
                تأكيد الاختيار {selectedCount > 0 ? `(${selectedCount})` : ''}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded upload modal */}
      <MediaUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
        initialFolder={folder !== 'all' ? folder : 'general'}
      />
    </>
  )
}

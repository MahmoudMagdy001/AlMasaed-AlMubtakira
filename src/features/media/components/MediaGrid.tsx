import React from 'react'
import {
  FileText,
  AlertTriangle,
  Folder,
  Check,
  Plus,
  Image as ImageIcon,
} from 'lucide-react'
import type { MediaRow } from '../types'
import { getStoragePublicUrl } from '@/lib/media'

export interface MediaGridProps {
  items: MediaRow[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onItemClick: (item: MediaRow) => void
  onUploadClick?: () => void
  isLoading?: boolean
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  selectedIds,
  onToggleSelect,
  onItemClick,
  onUploadClick,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-sand-200 bg-sand-100/60 aspect-square flex flex-col justify-between p-3"
          >
            <div className="w-4 h-4 bg-sand-200 rounded" />
            <div className="space-y-2">
              <div className="h-3 bg-sand-200 rounded w-3/4" />
              <div className="h-2 bg-sand-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-sand-300 bg-sand-50/50">
        <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-sand-400 mb-3">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-sand-800">لا توجد ملفات وسائط مطابقة</h3>
        <p className="text-xs text-sand-500 mt-1 max-w-sm mx-auto">
          لم يتم العثور على أي ملفات تناسب الفلاتر المحددة، أو لم يتم رفع أي ملفات وسائط حتى الآن.
        </p>
        {onUploadClick && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onUploadClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-control transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة ملفات جديدة</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => {
        const isSelected = selectedIds.includes(item.id)
        const isImage = item.mime_type.startsWith('image/')
        const hasMissingAlt = isImage && !item.alt_text?.trim()
        const publicUrl = getStoragePublicUrl(item.storage_path)

        return (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`group relative rounded-xl border bg-white overflow-hidden transition-all duration-150 cursor-pointer flex flex-col ${
              isSelected
                ? 'border-brand-600 ring-2 ring-brand-500/20 shadow-sm'
                : 'border-sand-200 hover:border-sand-300 hover:shadow-subtle'
            }`}
          >
            {/* Thumbnail Preview Area */}
            <div className="relative aspect-square w-full bg-sand-100 flex items-center justify-center overflow-hidden border-b border-sand-100">
              {isImage ? (
                <img
                  src={publicUrl}
                  alt={item.alt_text || item.title || item.file_name}
                  loading="lazy"
                  className="w-full h-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-sand-400 p-4">
                  <FileText className="w-10 h-10 text-red-500/80 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sand-600">
                    PDF
                  </span>
                </div>
              )}

              {/* Selection Checkbox */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleSelect(item.id)
                }}
                className={`absolute top-2 start-2 w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-sand-400 border border-sand-300 opacity-0 group-hover:opacity-100 focus:opacity-100'
                }`}
                aria-label={`تحديد ${item.file_name}`}
              >
                {isSelected && <Check className="w-4 h-4 stroke-[2.5]" />}
              </button>

              {/* Missing Alt Warning Badge */}
              {hasMissingAlt && (
                <div
                  className="absolute top-2 end-2 inline-flex items-center gap-1 bg-amber-500/95 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm"
                  title="تحذير سيو: هذه الصورة لا تحتوي على نص بديل (Alt Text)"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span className="hidden sm:inline">بدون Alt</span>
                </div>
              )}

              {/* Folder indicator on hover */}
              <div className="absolute bottom-1.5 start-1.5 inline-flex items-center gap-1 bg-sand-900/70 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <Folder className="w-2.5 h-2.5" />
                <span>{item.folder}</span>
              </div>
            </div>

            {/* Caption / Info Area */}
            <div className="p-2.5 space-y-1">
              <p
                className="text-xs font-semibold text-sand-900 truncate"
                title={item.title || item.file_name}
              >
                {item.title || item.file_name}
              </p>
              <div className="flex items-center justify-between text-[11px] text-sand-500">
                <span>{(item.size_bytes / 1024).toFixed(0)} ك.ب</span>
                {item.width && item.height ? (
                  <span>
                    {item.width}×{item.height}
                  </span>
                ) : (
                  <span className="uppercase text-[10px]">
                    {item.mime_type.split('/')[1]}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

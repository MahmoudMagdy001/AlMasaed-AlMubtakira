import React from 'react'
import { FileText, AlertTriangle, Eye, Check } from 'lucide-react'
import type { MediaRow } from '../types'
import { getStoragePublicUrl } from '@/lib/media'

export interface MediaListProps {
  items: MediaRow[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onSelectAll: () => void
  onItemClick: (item: MediaRow) => void
  isLoading?: boolean
}

export const MediaList: React.FC<MediaListProps> = ({
  items,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onItemClick,
  isLoading = false,
}) => {
  const isAllSelected = items.length > 0 && selectedIds.length === items.length

  if (isLoading) {
    return (
      <div className="bg-white border border-sand-200 rounded-xl overflow-hidden shadow-subtle p-6 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse flex items-center gap-4">
            <div className="w-10 h-10 bg-sand-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-sand-200 rounded w-1/3" />
              <div className="h-2 bg-sand-200 rounded w-1/4" />
            </div>
            <div className="w-16 h-4 bg-sand-200 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-sand-300 bg-sand-50/50">
        <p className="text-sm font-bold text-sand-800">لا توجد ملفات وسائط مطابقة</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-sand-200 rounded-xl overflow-hidden shadow-subtle">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-xs">
          <thead className="bg-sand-50 border-b border-sand-200 text-sand-600 font-semibold">
            <tr>
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className="rounded border-sand-300 text-brand-primary focus:ring-brand-primary/30"
                  aria-label="تحديد الكل"
                />
              </th>
              <th className="py-3 px-3 text-start w-16">المعاينة</th>
              <th className="py-3 px-4 text-start">الاسم والعنوان</th>
              <th className="py-3 px-4 text-start">المجلد</th>
              <th className="py-3 px-4 text-start">الأبعاد</th>
              <th className="py-3 px-4 text-start">الحجم</th>
              <th className="py-3 px-4 text-start">النص البديل</th>
              <th className="py-3 px-4 text-start">تاريخ الرفع</th>
              <th className="py-3 px-4 text-end">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {items.map((item) => {
              const isSelected = selectedIds.includes(item.id)
              const isImage = item.mime_type.startsWith('image/')
              const publicUrl = getStoragePublicUrl(item.storage_path)

              return (
                <tr
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  className={`hover:bg-sand-50/70 transition-colors cursor-pointer ${
                    isSelected ? 'bg-brand-primary/5' : ''
                  }`}
                >
                  {/* Select */}
                  <td
                    className="py-3 px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(item.id)}
                      className="rounded border-sand-300 text-brand-primary focus:ring-brand-primary/30"
                      aria-label={`تحديد ${item.file_name}`}
                    />
                  </td>

                  {/* Thumbnail */}
                  <td className="py-2 px-3">
                    <div className="w-10 h-10 rounded-lg bg-sand-100 border border-sand-200 overflow-hidden flex items-center justify-center shrink-0">
                      {isImage ? (
                        <img
                          src={publicUrl}
                          alt={item.alt_text || item.title || item.file_name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <FileText className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </td>

                  {/* Name and title */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-sand-900 truncate max-w-[220px]">
                      {item.title || item.file_name}
                    </div>
                    <div className="text-[11px] text-sand-500 truncate max-w-[220px]">
                      {item.file_name}
                    </div>
                  </td>

                  {/* Folder */}
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-sand-100 text-sand-700">
                      {item.folder}
                    </span>
                  </td>

                  {/* Dimensions */}
                  <td className="py-3 px-4 text-sand-600 font-mono text-[11px]">
                    {item.width && item.height ? `${item.width} × ${item.height}` : '—'}
                  </td>

                  {/* Size */}
                  <td className="py-3 px-4 text-sand-600">
                    {(item.size_bytes / 1024).toFixed(0)} ك.ب
                  </td>

                  {/* Alt text status */}
                  <td className="py-3 px-4">
                    {isImage ? (
                      item.alt_text?.trim() ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700">
                          <Check className="w-3.5 h-3.5" />
                          متوفر
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          مفقود
                        </span>
                      )
                    ) : (
                      <span className="text-sand-400">—</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-sand-500 text-[11px]">
                    {new Date(item.created_at).toLocaleDateString('ar-SA')}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onItemClick(item)
                      }}
                      className="p-1 rounded-md text-sand-400 hover:text-brand-primary hover:bg-sand-100 transition-colors"
                      title="عرض التفاصيل"
                      aria-label="عرض التفاصيل"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

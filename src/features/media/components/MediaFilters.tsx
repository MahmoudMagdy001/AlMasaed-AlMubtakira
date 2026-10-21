import React from 'react'
import { Search, LayoutGrid, List, Folder, Filter, ArrowUpDown } from 'lucide-react'
import type { MediaFilterState, MediaFolder, MediaTypeFilter, MediaSortOption } from '../types'

export interface MediaFiltersProps {
  filter: MediaFilterState
  onChange: (filter: MediaFilterState) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  totalCount: number
}

const FOLDER_OPTIONS: { value: MediaFolder | 'all'; label: string }[] = [
  { value: 'all', label: 'جميع المجلدات' },
  { value: 'general', label: 'عام (General)' },
  { value: 'blog', label: 'المدونة (Blog)' },
  { value: 'works', label: 'المشاريع (Works)' },
  { value: 'partners', label: 'الشركاء (Partners)' },
  { value: 'branding', label: 'الهوية (Branding)' },
]

const TYPE_OPTIONS: { value: MediaTypeFilter; label: string }[] = [
  { value: 'all', label: 'جميع الأنواع' },
  { value: 'image', label: 'الصور فقط' },
  { value: 'pdf', label: 'المستندات (PDF)' },
]

const SORT_OPTIONS: { value: MediaSortOption; label: string }[] = [
  { value: 'newest', label: 'الأحدث أولاً' },
  { value: 'oldest', label: 'الأقدم أولاً' },
  { value: 'name_asc', label: 'الاسم (أ - ي)' },
  { value: 'name_desc', label: 'الاسم (ي - أ)' },
  { value: 'size_desc', label: 'الأكبر حجماً' },
  { value: 'size_asc', label: 'الأصغر حجماً' },
]

export const MediaFilters: React.FC<MediaFiltersProps> = ({
  filter,
  onChange,
  viewMode,
  onViewModeChange,
  totalCount,
}) => {
  return (
    <div className="bg-white border border-sand-200 rounded-xl p-4 shadow-subtle mb-6 space-y-4">
      {/* Top row: search + view switch + count */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400 pointer-events-none" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => onChange({ ...filter, search: e.target.value })}
            placeholder="بحث بالاسم، العنوان، أو النص البديل..."
            className="w-full ps-9 pe-4 py-2 border border-sand-300 rounded-lg text-sm bg-sand-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
          />
        </div>

        {/* View mode toggle + Counter */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-xs text-sand-500 font-medium">
            {totalCount} عنصر
          </span>
          <div className="inline-flex items-center p-0.5 bg-sand-100 rounded-lg border border-sand-200">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md text-sm transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-sand-900 shadow-sm'
                  : 'text-sand-600 hover:text-sand-900'
              }`}
              title="عرض كشبكة"
              aria-label="عرض كشبكة"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-md text-sm transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-sand-900 shadow-sm'
                  : 'text-sand-600 hover:text-sand-900'
              }`}
              title="عرض كقائمة"
              aria-label="عرض كقائمة"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row: Folders, Types, Sort */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-sand-100 text-xs">
        {/* Folder Select */}
        <div className="flex items-center gap-1.5 min-w-[160px]">
          <Folder className="w-3.5 h-3.5 text-sand-500" />
          <select
            value={filter.folder}
            onChange={(e) =>
              onChange({ ...filter, folder: e.target.value as MediaFolder | 'all' })
            }
            className="w-full bg-white border border-sand-300 rounded-md py-1.5 px-2 text-xs text-sand-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          >
            {FOLDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Select */}
        <div className="flex items-center gap-1.5 min-w-[140px]">
          <Filter className="w-3.5 h-3.5 text-sand-500" />
          <select
            value={filter.type}
            onChange={(e) =>
              onChange({ ...filter, type: e.target.value as MediaTypeFilter })
            }
            className="w-full bg-white border border-sand-300 rounded-md py-1.5 px-2 text-xs text-sand-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-1.5 min-w-[160px]">
          <ArrowUpDown className="w-3.5 h-3.5 text-sand-500" />
          <select
            value={filter.sort}
            onChange={(e) =>
              onChange({ ...filter, sort: e.target.value as MediaSortOption })
            }
            className="w-full bg-white border border-sand-300 rounded-md py-1.5 px-2 text-xs text-sand-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters (if active) */}
        {(filter.search || filter.folder !== 'all' || filter.type !== 'all' || filter.sort !== 'newest') && (
          <button
            type="button"
            onClick={() =>
              onChange({
                search: '',
                folder: 'all',
                type: 'all',
                sort: 'newest',
              })
            }
            className="ms-auto text-brand-primary hover:underline font-medium text-xs py-1"
          >
            إعادة تعيين الفلاتر
          </button>
        )}
      </div>
    </div>
  )
}

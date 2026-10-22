import React, { useState } from 'react'
import {
  Plus,
  Trash2,
  FolderInput,
  CheckSquare,
  Square,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { PageHeader, ConfirmDialog } from '@/components/admin'
import {
  MediaFilters,
  MediaGrid,
  MediaList,
  MediaUploadModal,
  MediaDetailPanel,
} from '@/features/media/components'
import {
  useMediaList,
  useBulkDeleteMedia,
  useBulkMoveMedia,
} from '@/features/media/useMedia'
import type {
  MediaRow,
  MediaFilterState,
  MediaFolder,
} from '@/features/media/types'
import { useToast, Button } from '@/components/ui'

export const MediaPage: React.FC = () => {
  const { success, error, info } = useToast()

  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<MediaFilterState>({
    search: '',
    folder: 'all',
    type: 'all',
    sort: 'newest',
  })

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeMedia, setActiveMedia] = useState<MediaRow | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false)
  const [isBulkMoveOpen, setIsBulkMoveOpen] = useState(false)
  const [targetMoveFolder, setTargetMoveFolder] = useState<MediaFolder>('general')

  const { data, isLoading, refetch } = useMediaList({
    page,
    pageSize: 40,
    filter,
  })

  const bulkDeleteMutation = useBulkDeleteMedia()
  const bulkMoveMutation = useBulkMoveMedia()

  const items = data?.items || []
  const totalCount = data?.totalCount || 0
  const totalPages = data?.totalPages || 1

  const handleFilterChange = (newFilter: MediaFilterState) => {
    setFilter(newFilter)
    setPage(1)
    setSelectedIds([])
  }

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(items.map((i) => i.id))
    }
  }

  const handleBulkDeleteConfirm = async () => {
    try {
      const result = await bulkDeleteMutation.mutateAsync({
        ids: selectedIds,
        force: true,
      })

      if (result.errors.length > 0) {
        info(
          'اكتمل الحذف جزئياً',
          `تم حذف ${result.deletedCount} ملفات، وتعذر حذف ${result.errors.length} ملفات بسبب استخدامها.`,
        )
      } else {
        success('تم الحذف بنجاح', `تم حذف ${result.deletedCount} ملفات نهائياً.`)
      }

      setSelectedIds([])
      setIsBulkDeleteOpen(false)
      refetch()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل الحذف الجماعي'
      error('خطأ', msg)
    }
  }

  const handleBulkMoveConfirm = async () => {
    try {
      await bulkMoveMutation.mutateAsync({
        ids: selectedIds,
        targetFolder: targetMoveFolder,
      })
      success(
        'تم نقل الملفات',
        `تم نقل ${selectedIds.length} ملفات إلى مجلد (${targetMoveFolder}) بنجاح.`,
      )
      setSelectedIds([])
      setIsBulkMoveOpen(false)
      refetch()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل النقل'
      error('خطأ', msg)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <PageHeader
        title="مكتبة الوسائط"
        description="إدارة وتنظيم كافة الصور والملفات المرفوعة، مع تحسين الأبعاد وتوليد صيغ WebP المتجاوبة تلقائياً"
        actions={
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => setIsBulkMoveOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-800 transition-colors shadow-xs"
                >
                  <FolderInput className="w-3.5 h-3.5" />
                  <span>نقل ({selectedIds.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsBulkDeleteOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 hover:bg-red-100/80 text-red-700 transition-colors shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف ({selectedIds.length})</span>
                </button>
              </div>
            )}
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsUploadOpen(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2"
              leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
            >
              إضافة ملفات جديدة
            </Button>
          </div>
        }
      />

      {/* Filter and View Bar */}
      <MediaFilters
        filter={filter}
        onChange={handleFilterChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={totalCount}
      />

      {/* Select All Quick Bar (when in grid mode) */}
      {viewMode === 'grid' && items.length > 0 && (
        <div className="flex items-center justify-between text-xs text-sand-600 px-1 -mt-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="inline-flex items-center gap-1.5 font-medium hover:text-sand-900 transition-colors"
          >
            {selectedIds.length === items.length ? (
              <CheckSquare className="w-4 h-4 text-brand-600" />
            ) : (
              <Square className="w-4 h-4 text-sand-400" />
            )}
            <span>
              {selectedIds.length === items.length
                ? 'إلغاء تحديد الكل'
                : 'تحديد جميع عناصر الصفحة'}
            </span>
          </button>
          {selectedIds.length > 0 && (
            <span className="font-semibold text-brand-600">
              تم تحديد {selectedIds.length} من {items.length}
            </span>
          )}
        </div>
      )}

      {/* Media Grid / List */}
      {viewMode === 'grid' ? (
        <MediaGrid
          items={items}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onItemClick={(item) => setActiveMedia(item)}
          onUploadClick={() => setIsUploadOpen(true)}
          isLoading={isLoading}
        />
      ) : (
        <MediaList
          items={items}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onItemClick={(item) => setActiveMedia(item)}
          isLoading={isLoading}
        />
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-sand-200 text-xs">
          <span className="text-sand-500">
            الصفحة {page} من {totalPages} ({totalCount} ملف إجمالاً)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="الصفحة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                // Show first, last, and window around current
                if (p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2)) {
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`min-w-[28px] h-7 rounded-lg text-xs font-semibold transition-colors ${
                        page === p
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-white border border-sand-300 text-sand-700 hover:bg-sand-50'
                      }`}
                    >
                      {p}
                    </button>
                  )
                }
                if (p === page - 3 || p === page + 3) {
                  return (
                    <span key={p} className="text-sand-400 px-1">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="الصفحة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <MediaUploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => {
          refetch()
        }}
        initialFolder={filter.folder !== 'all' ? filter.folder : 'general'}
      />

      {/* Detail Slide-over Panel */}
      <MediaDetailPanel
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
        onDeleted={() => {
          refetch()
        }}
      />

      {/* Bulk Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="تأكيد حذف الملفات المحددة"
        description={`هل أنت متأكد من حذف ${selectedIds.length} ملفات نهائياً؟ سيتم فحص ارتباطاتها وحذف ملفاتها من التخزين وقاعدة البيانات.`}
        confirmText="نعم، حذف الكل"
        cancelText="إلغاء"
        isDestructive={true}
        isLoading={bulkDeleteMutation.isPending}
      />

      {/* Bulk Move Modal */}
      {isBulkMoveOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sand-900/50 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-elevated w-full max-w-sm p-6 space-y-4 border border-sand-200">
            <h3 className="text-sm font-bold text-sand-900">
              نقل ({selectedIds.length}) ملفات إلى مجلد
            </h3>
            <p className="text-xs text-sand-500">
              اختر المجلد المستهدف الذي ترغب بنقل الملفات المحددة إليه:
            </p>
            <select
              value={targetMoveFolder}
              onChange={(e) => setTargetMoveFolder(e.target.value as MediaFolder)}
              className="w-full bg-white border border-sand-300 rounded-lg py-2 px-3 text-xs text-sand-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="general">عام (General)</option>
              <option value="blog">المدونة (Blog)</option>
              <option value="works">المشاريع (Works)</option>
              <option value="partners">الشركاء (Partners)</option>
              <option value="branding">الهوية والعلامة التجارية (Branding)</option>
            </select>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsBulkMoveOpen(false)}
                className="border-sand-300 text-sand-700 hover:bg-sand-100 font-medium px-4 py-1.5"
              >
                إلغاء
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleBulkMoveConfirm}
                disabled={bulkMoveMutation.isPending}
                isLoading={bulkMoveMutation.isPending}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs px-5 py-1.5"
              >
                تأكيد النقل
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

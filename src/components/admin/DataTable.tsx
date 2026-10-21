import React from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Inbox } from 'lucide-react'
import { Button } from '@/components/ui'

export interface Column<T> {
  key: string
  title: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: string) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  totalItems?: number
  className?: string
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'لا توجد بيانات متاحة حالياً',
  sortBy,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  className = '',
}: DataTableProps<T>) {
  return (
    <div
      className={`bg-white rounded-card border border-surface-border overflow-hidden shadow-xs ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-surface-border text-xs text-content-muted uppercase tracking-wider">
              {columns.map((col) => {
                const isSorted = sortBy === col.key
                return (
                  <th
                    key={col.key}
                    className={`py-3.5 px-4 text-start font-bold ${
                      col.className || ''
                    }`}
                  >
                    {col.sortable && onSort ? (
                      <button
                        type="button"
                        onClick={() => onSort(col.key)}
                        className="inline-flex items-center gap-1.5 hover:text-content-heading focus-visible:outline-none transition-colors"
                      >
                        <span>{col.title}</span>
                        {isSorted ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-brand-600" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-brand-600" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                        )}
                      </button>
                    ) : (
                      <span>{col.title}</span>
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-border-subtle">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={`skeleton-${rIdx}`} className="animate-pulse">
                  {columns.map((_col, cIdx) => (
                    <td key={`scol-${cIdx}`} className="py-4 px-4">

                      <div className="h-4 bg-surface-border rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, rowIdx) => (
                <tr
                  key={item.id ?? rowIdx}
                  className="hover:bg-surface-soft/60 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3.5 px-4 text-content-body align-middle ${
                        col.className || ''
                      }`}
                    >
                      {col.render
                        ? col.render(item)
                        : (item as Record<string, unknown>)[col.key] != null
                          ? String((item as Record<string, unknown>)[col.key])
                          : '-'}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // Empty State
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 px-4 text-center text-content-muted"
                >
                  <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40 text-brand-600" />
                  <p className="text-xs font-semibold">{emptyMessage}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages && totalPages > 1 && onPageChange && currentPage && (
        <div className="p-4 bg-surface-soft/40 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-content-muted">
          <div>
            {totalItems != null && (
              <span>
                إجمالي النتائج: <strong>{totalItems}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading}
              className="text-xs py-1 px-3 h-8"
            >
              السابق
            </Button>

            <span className="px-2 font-semibold text-content-heading">
              صفحة {currentPage} من {totalPages}
            </span>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || isLoading}
              className="text-xs py-1 px-3 h-8"
            >
              التالي
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

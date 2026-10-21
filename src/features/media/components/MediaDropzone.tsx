import React, { useRef, useState, useCallback } from 'react'
import { UploadCloud, FileImage, FileText } from 'lucide-react'

export interface MediaDropzoneProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
  compact?: boolean
}

const ACCEPTED_TYPES =
  'image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf'

export const MediaDropzone: React.FC<MediaDropzoneProps> = ({
  onFilesSelected,
  disabled = false,
  compact = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setIsDragOver(true)
    },
    [disabled],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      if (disabled) return

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        onFilesSelected(files)
      }
    },
    [disabled, onFilesSelected],
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files)
        onFilesSelected(files)
        // Reset input value so re-selecting same file triggers change
        e.target.value = ''
      }
    },
    [onFilesSelected],
  )

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 text-center ${
        compact ? 'p-6' : 'p-10'
      } ${
        isDragOver
          ? 'border-brand-primary bg-brand-primary/5 scale-[1.01]'
          : 'border-sand-300 hover:border-sand-400 bg-sand-50/50 hover:bg-sand-50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label="منطقة رفع ملفات الوسائط"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center text-brand-primary">
          <UploadCloud className="w-6 h-6" />
        </div>

        <div>
          <p className="text-sm font-semibold text-sand-900">
            اسحب الملفات وأفلتها هنا، أو{' '}
            <span className="text-brand-primary underline underline-offset-2">
              تصفح من جهازك
            </span>
          </p>
          <p className="text-xs text-sand-500 mt-1">
            ندعم صور JPG، PNG، WebP، AVIF، SVG ومستندات PDF حتى 10 ميجابايت كحد أقصى
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-sand-500 pt-1">
          <span className="inline-flex items-center gap-1">
            <FileImage className="w-3.5 h-3.5 text-sand-400" />
            تحويل ذكي وتوليد تلقائي لأبعاد WebP
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-sand-400" />
            فحص أمان الحجم والامتداد
          </span>
        </div>
      </div>
    </div>
  )
}

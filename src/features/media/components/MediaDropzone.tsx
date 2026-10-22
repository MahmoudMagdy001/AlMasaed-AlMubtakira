import React, { useRef, useState, useCallback } from 'react'
import { UploadCloud, FileImage, FileText } from 'lucide-react'
import { Button } from '@/components/ui'

export interface MediaDropzoneProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
  compact?: boolean
  inputRef?: React.RefObject<HTMLInputElement>
}

const ACCEPTED_TYPES =
  'image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf'

export const MediaDropzone: React.FC<MediaDropzoneProps> = ({
  onFilesSelected,
  disabled = false,
  compact = false,
  inputRef: externalInputRef,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const internalInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = externalInputRef || internalInputRef

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
          ? 'border-brand-600 bg-brand-50/70 scale-[1.01]'
          : 'border-sand-300 hover:border-brand-400 bg-sand-50/50 hover:bg-brand-50/20'
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
        <div className="w-13 h-13 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-2xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-sand-900">
            اسحب الملفات وأفلتها هنا، أو اضغط للاختيار من جهازك
          </p>
          <p className="text-xs text-sand-500 max-w-md mx-auto">
            ندعم صور JPG، PNG، WebP، AVIF، SVG ومستندات PDF حتى 10 ميجابايت كحد أقصى
          </p>
        </div>

        <div className="pt-1">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
            disabled={disabled}
            leftIcon={<UploadCloud className="w-4 h-4" />}
            className="border-sand-300 bg-white hover:bg-brand-50 hover:border-brand-400 text-brand-700 shadow-xs font-semibold px-4 py-2"
          >
            تصفح واختيار الملفات من جهازك
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-sand-500 pt-2 border-t border-sand-200/60 w-full max-w-lg">
          <span className="inline-flex items-center gap-1.5">
            <FileImage className="w-3.5 h-3.5 text-brand-600" />
            تحويل ذكي وتوليد تلقائي لأبعاد WebP
          </span>
          <span className="text-sand-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-brand-600" />
            فحص أمان الحجم والامتداد
          </span>
        </div>
      </div>
    </div>
  )
}

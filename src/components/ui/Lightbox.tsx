import React, { useEffect, useRef, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface LightboxImage {
  src: string
  alt?: string
  width?: number
  height?: number
}

export interface LightboxProps {
  isOpen: boolean
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const { i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  const currentImage = images[currentIndex]
  const total = images.length

  const handleNext = useCallback(() => {
    if (total <= 1) return
    onNavigate((currentIndex + 1) % total)
  }, [currentIndex, total, onNavigate])

  const handlePrev = useCallback(() => {
    if (total <= 1) return
    onNavigate((currentIndex - 1 + total) % total)
  }, [currentIndex, total, onNavigate])

  // Save previous focused element and restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      // Focus the dialog
      dialogRef.current?.focus()
      // Lock body scroll
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus?.()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (isRtl) {
          handlePrev()
        } else {
          handleNext()
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (isRtl) {
          handleNext()
        } else {
          handlePrev()
        }
      } else if (e.key === 'Tab') {
        // Focus trap inside dialog
        if (!dialogRef.current) return
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isRtl, handleNext, handlePrev, onClose])

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        // swipe right
        if (isRtl) handleNext()
        else handlePrev()
      } else {
        // swipe left
        if (isRtl) handlePrev()
        else handleNext()
      }
    }
  }

  if (!isOpen || !currentImage) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isRtl ? 'معرض الصور' : 'Image gallery'}
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md outline-none"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close Button */}
      <div
        className="absolute top-0 inset-x-0 p-4 flex items-center justify-between text-white/90 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-medium tracking-wide">
          {currentIndex + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={isRtl ? 'إغلاق المعرض' : 'Close gallery'}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt || ''}
          className="max-h-[80vh] max-w-full w-auto h-auto object-contain rounded-card shadow-2xl select-none"
        />

        {currentImage.alt && (
          <p className="mt-3 text-sm text-white/80 text-center max-w-2xl px-4 line-clamp-2">
            {currentImage.alt}
          </p>
        )}
      </div>

      {/* Navigation Buttons (only if > 1 image) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label={isRtl ? 'الصورة السابقة' : 'Previous image'}
            className="absolute start-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 z-10"
          >
            {isRtl ? (
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            ) : (
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label={isRtl ? 'الصورة التالية' : 'Next image'}
            className="absolute end-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 z-10"
          >
            {isRtl ? (
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </>
      )}
    </div>
  )
}

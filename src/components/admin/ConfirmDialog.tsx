import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Dialog, Button } from '@/components/ui'

export interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
  isLoading?: boolean
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'تأكيد الحذف',
  cancelText = 'إلغاء',
  isDestructive = true,
  isLoading = false,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        if (!isLoading) onClose()
      }}
      title={title}
      maxWidth="sm"
    >

      <div className="space-y-4">
        <div className="flex items-start gap-3.5">
          {isDestructive && (
            <div className="w-10 h-10 rounded-full bg-feedback-error/10 text-feedback-error flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            </div>
          )}
          <div className="text-sm text-content-body leading-relaxed">
            {description}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-border">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            size="sm"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={onConfirm}
            isLoading={isLoading}
            size="sm"
            className={
              isDestructive
                ? 'bg-feedback-error hover:bg-rose-700 text-white'
                : undefined
            }
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

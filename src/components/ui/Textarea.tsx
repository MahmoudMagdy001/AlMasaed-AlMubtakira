import React, { forwardRef } from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = '', disabled, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`w-full px-3.5 py-2.5 rounded-control text-base bg-white text-content-body border transition-colors duration-150 placeholder:text-content-muted/60 focus-visible:outline-none focus-visible:ring-2 disabled:bg-surface-soft disabled:text-content-muted disabled:cursor-not-allowed resize-y ${
          error
            ? 'border-feedback-error focus-visible:ring-feedback-error/30'
            : 'border-surface-border hover:border-brand-300 focus-visible:border-brand-600 focus-visible:ring-brand-400/30'
        } ${className}`.trim()}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'

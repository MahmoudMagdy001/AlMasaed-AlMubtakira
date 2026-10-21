import React from 'react'

export interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  optional?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  optional = false,
  hint,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="block text-xs font-bold text-content-heading"
        >
          {label}
          {required && (
            <span className="text-feedback-error ms-1" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {optional && (
          <span className="text-[11px] text-content-muted">اختياري</span>
        )}
      </div>

      <div>{children}</div>

      {hint && !error && (
        <p className="text-[11px] text-content-muted leading-relaxed">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-feedback-error font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

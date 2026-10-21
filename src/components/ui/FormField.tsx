import React from 'react'

export interface FormFieldProps {
  label?: string
  htmlFor?: string
  error?: string
  helperText?: string
  required?: boolean
  optionalLabel?: string
  className?: string
  children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  helperText,
  required = false,
  optionalLabel,
  className = '',
  children,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <label htmlFor={htmlFor} className="font-medium text-content-heading">
            {label}
            {required && <span className="text-feedback-error ms-1">*</span>}
          </label>
          {!required && optionalLabel && (
            <span className="text-xs text-content-muted">{optionalLabel}</span>
          )}
        </div>
      )}
      {children}
      {error ? (
        <p
          className="text-xs text-feedback-error flex items-center gap-1 mt-0.5"
          role="alert"
        >
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-content-muted mt-0.5">{helperText}</p>
      ) : null}
    </div>
  )
}

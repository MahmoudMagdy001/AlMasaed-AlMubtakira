import React from 'react'

export interface FormFieldProps {
  label?: string
  htmlFor?: string
  error?: string
  helperText?: string
  hint?: string
  required?: boolean
  optional?: boolean
  optionalLabel?: string
  className?: string
  children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  helperText,
  hint,
  required = false,
  optional = false,
  optionalLabel,
  className = '',
  children,
}) => {
  const displayHelper = hint || helperText
  const displayOptional = optional ? 'اختياري' : optionalLabel

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <label htmlFor={htmlFor} className="font-medium text-content-heading">
            {label}
            {required && <span className="text-feedback-error ms-1">*</span>}
          </label>
          {!required && displayOptional && (
            <span className="text-xs text-content-muted">{displayOptional}</span>
          )}
        </div>
      )}
      <div>{children}</div>
      {error ? (
        <p
          className="text-xs text-feedback-error flex items-center gap-1 mt-0.5"
          role="alert"
        >
          {error}
        </p>
      ) : displayHelper ? (
        <p className="text-xs text-content-muted mt-0.5 leading-relaxed">{displayHelper}</p>
      ) : null}
    </div>
  )
}

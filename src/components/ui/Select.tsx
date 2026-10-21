import React, { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { options, placeholder, error = false, className = '', disabled, ...props },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={`w-full min-h-[44px] ps-3.5 pe-10 py-2.5 rounded-control text-base bg-white text-content-body border transition-colors duration-150 appearance-none focus-visible:outline-none focus-visible:ring-2 disabled:bg-surface-soft disabled:text-content-muted disabled:cursor-not-allowed ${
            error
              ? 'border-feedback-error focus-visible:ring-feedback-error/30'
              : 'border-surface-border hover:border-brand-300 focus-visible:border-brand-600 focus-visible:ring-brand-400/30'
          } ${className}`.trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-content-muted flex items-center">
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    )
  },
)

Select.displayName = 'Select'

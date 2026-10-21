import React, { forwardRef } from 'react'
import { Check } from 'lucide-react'

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: React.ReactNode
  error?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, className = '', id, disabled, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={`inline-flex items-center gap-2.5 cursor-pointer select-none text-sm text-content-body ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`.trim()}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            ref={ref}
            id={id}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`w-5 h-5 rounded-[4px] border transition-all duration-150 flex items-center justify-center bg-white peer-checked:bg-brand-900 peer-checked:border-brand-900 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400 ${
              error
                ? 'border-feedback-error'
                : 'border-surface-border hover:border-brand-300'
            }`}
          >
            <Check
              className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]"
              aria-hidden="true"
            />
          </div>
        </div>
        {label && (
          <span className="text-content-body font-normal">{label}</span>
        )}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

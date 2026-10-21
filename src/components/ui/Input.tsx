import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { error = false, leftIcon, rightIcon, className = '', disabled, ...props },
    ref,
  ) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute start-3 pointer-events-none text-content-muted flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-control text-base bg-white text-content-body border transition-colors duration-150 placeholder:text-content-muted/60 focus-visible:outline-none focus-visible:ring-2 disabled:bg-surface-soft disabled:text-content-muted disabled:cursor-not-allowed ${
            leftIcon ? 'ps-10' : ''
          } ${rightIcon ? 'pe-10' : ''} ${
            error
              ? 'border-feedback-error focus-visible:ring-feedback-error/30'
              : 'border-surface-border hover:border-brand-300 focus-visible:border-brand-600 focus-visible:ring-brand-400/30'
          } ${className}`.trim()}
          {...props}
        />
        {rightIcon && (
          <div className="absolute end-3 pointer-events-none text-content-muted flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

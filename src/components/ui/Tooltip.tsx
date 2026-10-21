import React, { useState, useId } from 'react'

export interface TooltipProps {
  content: string
  children: React.ReactElement
  position?: 'top' | 'bottom'
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const id = useId()

  const positionClasses =
    position === 'top'
      ? 'bottom-full mb-2 start-1/2 -translate-x-1/2'
      : 'top-full mt-2 start-1/2 -translate-x-1/2'

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {React.cloneElement(children, {
        'aria-describedby': isVisible ? id : undefined,
      })}
      {isVisible && (
        <div
          id={id}
          role="tooltip"
          className={`absolute z-40 px-2.5 py-1 text-xs font-medium text-white bg-brand-900 rounded-control whitespace-nowrap shadow-md pointer-events-none ${positionClasses}`}
        >
          {content}
        </div>
      )}
    </div>
  )
}

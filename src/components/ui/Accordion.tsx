import React, { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  id?: string
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpenIndex?: number
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex,
  className = '',
}) => {
  const baseId = useId()
  const [openIndices, setOpenIndices] = useState<number[]>(() =>
    defaultOpenIndex !== undefined ? [defaultOpenIndex] : [],
  )

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      )
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div
      className={`divide-y divide-surface-border border border-surface-border rounded-card bg-white overflow-hidden shadow-sm ${className}`}
    >
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index)
        const headerId = `${baseId}-header-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.id || index} className="transition-colors">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-start font-semibold text-content-heading hover:text-brand-600 transition-colors focus-visible:outline-none focus-visible:bg-surface-soft"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`w-5 h-5 text-content-muted transition-transform duration-200 shrink-0 ms-2 ${
                    isOpen ? 'rotate-180 text-brand-600' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-5 pb-5 pt-1 text-content-body text-base leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

import React, { useState, useId } from 'react'

export interface TabItem {
  id: string
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultTabId?: string
  onChange?: (id: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTabId,
  onChange,
  className = '',
}) => {
  const baseId = useId()
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || (items[0]?.id ?? ''),
  )

  const handleSelect = (id: string) => {
    setActiveTab(id)
    onChange?.(id)
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex border-b border-surface-border gap-2 overflow-x-auto no-scrollbar"
      >
        {items.map((tab) => {
          const isSelected = activeTab === tab.id
          const tabId = `${baseId}-tab-${tab.id}`
          const panelId = `${baseId}-panel-${tab.id}`

          return (
            <button
              key={tab.id}
              role="tab"
              id={tabId}
              aria-selected={isSelected}
              aria-controls={panelId}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id)}
              className={`px-4 py-2.5 font-medium text-sm sm:text-base border-b-2 -mb-px whitespace-nowrap transition-colors focus-visible:outline-none ${
                isSelected
                  ? 'border-brand-900 text-brand-900 font-bold'
                  : 'border-transparent text-content-muted hover:text-content-heading hover:border-surface-border'
              } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="pt-4">
        {items.map((tab) => {
          const isSelected = activeTab === tab.id
          const tabId = `${baseId}-tab-${tab.id}`
          const panelId = `${baseId}-panel-${tab.id}`

          if (!isSelected) return null

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              {tab.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

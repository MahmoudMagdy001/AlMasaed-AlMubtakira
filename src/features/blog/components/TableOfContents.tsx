import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { List, ChevronDown, ChevronUp } from 'lucide-react'
import type { TocItem } from '@/lib/blogContent'

export interface TableOfContentsProps {
  items: TocItem[]
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string>('')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      },
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
      setIsMobileOpen(false)
      // Update URL hash without abrupt jumping
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <nav
      aria-label={t('blog.tableOfContents')}
      className="bg-surface-soft border border-surface-border rounded-card p-5 lg:sticky lg:top-28"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-content-heading font-bold text-base">
          <List className="w-5 h-5 text-brand-600" aria-hidden="true" />
          <span>{t('blog.tableOfContents')}</span>
        </div>

        {/* Mobile toggle button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="lg:hidden p-1.5 rounded-control text-content-muted hover:text-content-heading hover:bg-surface-border transition-colors focus-visible:outline-none"
          aria-expanded={isMobileOpen}
          aria-label={
            isMobileOpen ? t('actions.close') : t('blog.tableOfContents')
          }
        >
          {isMobileOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      <div
        className={`mt-4 ${
          isMobileOpen ? 'block' : 'hidden lg:block'
        } max-h-[calc(100vh-14rem)] overflow-y-auto space-y-1.5`}
      >
        <ul className="space-y-1 text-sm border-s-2 border-surface-border ps-3">
          {items.map((item) => {
            const isActive = activeId === item.id
            const isSubItem = item.level === 3

            return (
              <li
                key={item.id}
                className={`${isSubItem ? 'ms-3 text-xs' : 'text-sm'}`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`block py-1 px-2 rounded-sm transition-colors leading-snug ${
                    isActive
                      ? 'text-brand-600 font-bold bg-brand-50 -ms-3 ps-3 border-s-2 border-brand-600'
                      : 'text-content-body hover:text-brand-600 hover:bg-white/50'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

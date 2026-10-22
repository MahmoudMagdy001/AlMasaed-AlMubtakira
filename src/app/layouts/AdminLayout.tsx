import React, { useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tag,
  Briefcase,
  Handshake,
  Image,
  Inbox,
  Settings,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react'
import { Logo } from '@/components/ui'

import { Seo } from '@/components/seo/Seo'
import { useAuth, AdminRouteGuard } from '@/features/auth'


import { StatusBadge } from '@/components/admin'
import { useUnreadMessagesCount } from '@/features/contact/useAdminMessages'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  exact?: boolean
  adminOnly?: boolean
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { name: 'الرئيسية والإحصائيات', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'المقالات والأخبار', href: '/admin/posts', icon: FileText },
  { name: 'تصنيفات المدونة', href: '/admin/categories', icon: FolderTree },
  { name: 'الوسوم والكلمات', href: '/admin/tags', icon: Tag },
  { name: 'المشاريع وسابقة الأعمال', href: '/admin/works', icon: Briefcase },
  { name: 'شركاء النجاح', href: '/admin/partners', icon: Handshake },
  { name: 'مكتبة الوسائط والصور', href: '/admin/media', icon: Image },
  { name: 'طلبات عروض الأسعار والرسائل', href: '/admin/messages', icon: Inbox },
  { name: 'إعدادات الموقع ومعلومات التواصل', href: '/admin/settings', icon: Settings, adminOnly: true },
  { name: 'فريق العمل وصلاحيات المستخدمين', href: '/admin/users', icon: Users, adminOnly: true },
]

const AdminLayoutInner: React.FC = () => {
  const { user, profile, isAdmin, signOut } = useAuth()
  const { data: unreadMessagesCount = 0 } = useUnreadMessagesCount()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Filter items based on user role and attach dynamic badge counts
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.adminOnly && !isAdmin) return false
    return true
  }).map((item) => {
    if (item.href === '/admin/messages') {
      return { ...item, badge: unreadMessagesCount }
    }
    return item
  })

  return (
    <>
      <Seo
        title="لوحة الإدارة"
        noindex={true}
        description="نظام إدارة المحتوى الخاص بشركة المصاعد المبتكرة."
      />

      <div className="min-h-screen bg-surface-soft flex flex-col lg:flex-row text-content-body font-sans">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-surface-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <Link to="/admin" className="focus-visible:outline-none">
            <Logo theme="light" asLink={false} />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-control text-content-body hover:bg-surface-soft transition-colors focus-visible:outline-none"
            aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Backdrop for mobile drawer */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-brand-950/40 z-40 lg:hidden backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 start-0 z-50 h-screen w-72 bg-white border-e border-surface-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0 shadow-elevated' : 'max-lg:-translate-x-full'
          }`}
        >
          {/* Top Logo & Title */}
          <div>
            <div className="p-6 border-b border-surface-border flex items-center justify-between">
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="focus-visible:outline-none"
              >
                <Logo theme="light" asLink={false} />
                <span className="text-[11px] font-bold text-brand-600 block mt-1 tracking-wider uppercase">
                  لوحة التحكم المركزية
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-1 rounded-control text-content-muted hover:text-content-heading"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <nav
              className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)]"
              aria-label="أقسام لوحة الإدارة"
            >
              {visibleNavItems.map((item) => {
                const Icon = item.icon
                const isActive = item.exact
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href)

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-control text-xs font-semibold transition-all focus-visible:outline-none ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-xs font-bold'
                        : 'text-content-body hover:bg-surface-soft hover:text-brand-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-white' : 'text-content-muted'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge != null && item.badge > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-white text-brand-600'
                            : 'bg-brand-100 text-brand-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </div>

          {/* User Profile & Sign Out Footer */}
          <div className="p-4 border-t border-surface-border bg-surface-soft/50">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || ''}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-content-heading truncate">
                    {profile?.full_name || user?.email || 'المسؤول'}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StatusBadge status={profile?.role || 'editor'} />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => signOut()}
                className="p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors focus-visible:outline-none"
                title="تسجيل الخروج"
                aria-label="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-control text-xs font-semibold text-content-body hover:bg-white hover:text-brand-600 border border-surface-border transition-colors"
            >
              <span>معاينة الموقع العام</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">


          {/* Page Content View */}
          <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export const AdminLayout: React.FC = () => {
  return (
    <AdminRouteGuard>
      <AdminLayoutInner />
    </AdminRouteGuard>
  )
}



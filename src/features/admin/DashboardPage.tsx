import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  FileText,
  FileEdit,
  Briefcase,
  Handshake,
  Inbox,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Phone,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PageHeader, StatusBadge } from '@/components/admin'
import { useAuth } from '@/features/auth'


export const DashboardPage: React.FC = () => {
  const { profile } = useAuth()

  // 1. Fetch dashboard KPI counts
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['admin_dashboard_stats'],
    queryFn: async () => {
      const [
        { count: publishedPosts },
        { count: draftPosts },
        { count: works },
        { count: partners },
        { count: newMessages },
      ] = await Promise.all([
        supabase
          .from('posts')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'published'),
        supabase
          .from('posts')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'draft'),
        supabase
          .from('works')
          .select('id', { count: 'exact', head: true }),
        supabase
          .from('partners')
          .select('id', { count: 'exact', head: true }),
        supabase
          .from('contact_submissions')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'new'),
      ])

      return {
        publishedPosts: publishedPosts ?? 0,
        draftPosts: draftPosts ?? 0,
        works: works ?? 0,
        partners: partners ?? 0,
        newMessages: newMessages ?? 0,
      }
    },
    staleTime: 1000 * 60 * 2,
  })

  // 2. Fetch last 5 draft posts
  const { data: lastDrafts, isLoading: isDraftsLoading } = useQuery({
    queryKey: ['admin_dashboard_drafts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, slug, title, lang, updated_at')
        .eq('status', 'draft')
        .order('updated_at', { ascending: false })
        .limit(5)

      if (error) return []
      return data || []
    },
    staleTime: 1000 * 60 * 2,
  })

  // 3. Fetch last 5 contact submissions
  const { data: lastMessages, isLoading: isMessagesLoading } = useQuery({
    queryKey: ['admin_dashboard_messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('id, name, phone, service_interest, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) return []
      return data || []
    },
    staleTime: 1000 * 60 * 2,
  })

  // 4. Fetch posts with SEO score < 50
  const { data: lowSeoPosts, isLoading: isSeoLoading } = useQuery({
    queryKey: ['admin_dashboard_low_seo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, slug, title, lang, seo_score, status')
        .lt('seo_score', 50)
        .order('seo_score', { ascending: true })
        .limit(5)

      if (error) return []
      return data || []
    },
    staleTime: 1000 * 60 * 2,
  })

  const statCards = [
    {
      title: 'المقالات المنشورة',
      value: stats?.publishedPosts ?? 0,
      icon: FileText,
      href: '/admin/posts',
      colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'المسودات قيد المراجعة',
      value: stats?.draftPosts ?? 0,
      icon: FileEdit,
      href: '/admin/posts',
      colorClass: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'سابقة الأعمال والمشاريع',
      value: stats?.works ?? 0,
      icon: Briefcase,
      href: '/admin/works',
      colorClass: 'text-brand-600 bg-brand-50 border-brand-100',
    },
    {
      title: 'شركاء النجاح',
      value: stats?.partners ?? 0,
      icon: Handshake,
      href: '/admin/partners',
      colorClass: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      title: 'طلبات الأسعار الجديدة',
      value: stats?.newMessages ?? 0,
      icon: Inbox,
      href: '/admin/messages',
      colorClass:
        (stats?.newMessages ?? 0) > 0
          ? 'text-rose-600 bg-rose-50 border-rose-200'
          : 'text-slate-600 bg-slate-50 border-slate-200',
    },
  ]

  return (
    <div>
      <PageHeader
        title={`مرحباً بك، ${profile?.full_name || 'مسؤول النظام'}`}
        description="نظرة عامة على حالة الموقع والمحتوى والرسائل الواردة."
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              to={card.href}
              className="bg-white p-5 rounded-card border border-surface-border shadow-2xs hover:shadow-card-hover transition-all flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-content-muted leading-tight">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-control flex items-center justify-center border ${card.colorClass}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>

              <div>
                <span className="text-2xl font-black text-content-heading block tracking-tight">
                  {isStatsLoading ? (
                    <span className="inline-block w-8 h-6 bg-surface-border rounded animate-pulse" />
                  ) : (
                    card.value
                  )}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Widget 1: Last 5 Drafts */}
        <div className="bg-white rounded-card border border-surface-border p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-4">
            <div className="flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-content-heading">
                أحدث المسودات قيد الإعداد
              </h2>
            </div>
            <Link
              to="/admin/posts"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>كافة المقالات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1">
            {isDraftsLoading ? (
              <div className="space-y-3 py-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-surface-border/50 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : lastDrafts && lastDrafts.length > 0 ? (
              <div className="divide-y divide-surface-border-subtle">
                {lastDrafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-surface-soft/40 px-2 -mx-2 rounded transition-colors"
                  >
                    <div className="min-w-0">
                      <Link
                        to={`/admin/posts/${draft.id}`}
                        className="font-bold text-xs text-content-heading hover:text-brand-600 truncate block mb-1"
                      >
                        {draft.title || 'مسودة بدون عنوان'}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-content-muted">
                        <StatusBadge status={draft.lang} />
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {draft.updated_at
                              ? new Date(draft.updated_at).toLocaleDateString(
                                  'ar-SA',
                                )
                              : ''}
                          </span>
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/admin/posts/${draft.id}`}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0"
                    >
                      تحرير
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-content-muted">
                لا توجد مسودات حالياً. كافة المقالات منشورة أو يمكنك بدء كتابة مقال جديد.
              </div>
            )}
          </div>
        </div>

        {/* Widget 2: Recent Contact Submissions */}
        <div className="bg-white rounded-card border border-surface-border p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-brand-600" />
              <h2 className="text-base font-bold text-content-heading">
                أحدث طلبات عروض الأسعار
              </h2>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>كافة الطلبات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1">
            {isMessagesLoading ? (
              <div className="space-y-3 py-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-surface-border/50 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : lastMessages && lastMessages.length > 0 ? (
              <div className="divide-y divide-surface-border-subtle">
                {lastMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-surface-soft/40 px-2 -mx-2 rounded transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-content-heading truncate">
                          {msg.name}
                        </span>
                        <StatusBadge status={msg.status} />
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-content-muted">
                        <span className="flex items-center gap-1" dir="ltr">
                          <Phone className="w-3 h-3" />
                          <span>{msg.phone}</span>
                        </span>
                        {msg.service_interest && (
                          <span className="truncate">
                            الخدمة: {msg.service_interest}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to="/admin/messages"
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0"
                    >
                      عرض
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-content-muted">
                لا توجد طلبات واردة حتى الآن.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Widget 3: SEO Improvement Recommendations */}
      <div className="bg-white rounded-card border border-surface-border p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-feedback-warning" />
            <h2 className="text-base font-bold text-content-heading">
              مقالات بحاجة لتحسين محركات البحث (SEO &lt; 50)
            </h2>
          </div>
          <span className="text-xs text-content-muted">
            نظام التحليل التلقائي
          </span>
        </div>

        {isSeoLoading ? (
          <div className="h-12 bg-surface-border/50 rounded animate-pulse" />
        ) : lowSeoPosts && lowSeoPosts.length > 0 ? (
          <div className="divide-y divide-surface-border-subtle">
            {lowSeoPosts.map((post) => (
              <div
                key={post.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <StatusBadge seoScore={post.seo_score} />
                  <span className="text-xs font-bold text-content-heading truncate">
                    {post.title}
                  </span>
                  <StatusBadge status={post.lang} />
                </div>

                <Link
                  to={`/admin/posts/${post.id}`}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0"
                >
                  فحص وتحسين
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-content-muted">
            ممتاز! لا توجد مقالات ذات درجة SEO منخفضة تحتاج إلى تدخل.
          </div>
        )}
      </div>
    </div>
  )
}

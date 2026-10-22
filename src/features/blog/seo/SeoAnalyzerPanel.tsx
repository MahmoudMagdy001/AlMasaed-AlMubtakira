import React, { useState } from 'react'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ListTree,
  Link2,
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Clock,
  Hash,
} from 'lucide-react'
import type { SeoAnalyzerOutput, CheckCategory } from './types'

interface SeoAnalyzerPanelProps {
  seoData: SeoAnalyzerOutput
  isAnalyzing?: boolean
  focusKeyword?: string
}

export const SeoAnalyzerPanel: React.FC<SeoAnalyzerPanelProps> = ({
  seoData,
  isAnalyzing = false,
  focusKeyword = '',
}) => {
  const { score, grade, groupedChecks, metrics } = seoData
  const [activeTab, setActiveTab] = useState<CheckCategory | 'metrics'>('basic')
  const [statusFilter, setStatusFilter] = useState<'all' | 'issues' | 'pass'>('all')
  const [expandedCheckId, setExpandedCheckId] = useState<string | null>(null)

  // Color schemes based on score and grade
  const scoreColors =
    grade === 'good'
      ? {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          gaugeText: 'text-emerald-600',
          progress: 'bg-emerald-500',
          label: 'ممتاز',
        }
      : grade === 'average'
        ? {
            badge: 'bg-amber-50 text-amber-700 border-amber-200',
            gaugeText: 'text-amber-600',
            progress: 'bg-amber-500',
            label: 'متوسط',
          }
        : {
            badge: 'bg-red-50 text-red-700 border-red-200',
            gaugeText: 'text-red-600',
            progress: 'bg-red-500',
            label: 'يحتاج لتحسين',
          }

  // Count issues across all checks
  const passCount = seoData.checks.filter((c) => c.status === 'pass').length
  const warnCount = seoData.checks.filter((c) => c.status === 'warn').length
  const failCount = seoData.checks.filter((c) => c.status === 'fail').length

  const currentTabChecks =
    activeTab !== 'metrics'
      ? groupedChecks[activeTab].filter((c) => {
          if (statusFilter === 'issues') return c.status !== 'pass'
          if (statusFilter === 'pass') return c.status === 'pass'
          return true
        })
      : []

  const toggleExpand = (id: string) => {
    setExpandedCheckId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="bg-white border border-surface-border rounded-card p-5 space-y-4 shadow-xs">
      {/* Header with Circular Score Gauge and Grade Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* SVG circular progress */}
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-soft"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${scoreColors.gaugeText} transition-all duration-500 ease-out`}
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-base font-black ${scoreColors.gaugeText}`}>
                {score}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-content-heading">
                محلل السيو المباشر
              </h3>
              {isAnalyzing && (
                <span className="text-[10px] text-content-muted animate-pulse">
                  جاري الفحص...
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${scoreColors.badge}`}
              >
                {scoreColors.label} ({score}/100)
              </span>
              {focusKeyword && (
                <span className="text-[11px] text-content-muted truncate max-w-[140px]">
                  الكلمة: {focusKeyword}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick summary counters */}
        <div className="text-end text-[11px] space-y-0.5">
          <div className="text-emerald-600 font-semibold">
            {passCount} ناجح
          </div>
          <div className="text-amber-600 font-semibold">
            {warnCount} تنبيه
          </div>
          <div className="text-feedback-error font-semibold">
            {failCount} بحاجة لتعديل
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-surface-border text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'basic'
              ? 'border-brand-600 text-brand-600 font-bold'
              : 'border-transparent text-content-muted hover:text-content-heading'
          }`}
        >
          الأساسي (50)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'content'
              ? 'border-brand-600 text-brand-600 font-bold'
              : 'border-transparent text-content-muted hover:text-content-heading'
          }`}
        >
          المحتوى (30)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'technical'
              ? 'border-brand-600 text-brand-600 font-bold'
              : 'border-transparent text-content-muted hover:text-content-heading'
          }`}
        >
          التقني (20)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('metrics')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'metrics'
              ? 'border-brand-600 text-brand-600 font-bold'
              : 'border-transparent text-content-muted hover:text-content-heading'
          }`}
        >
          إحصائيات
        </button>
      </div>

      {/* Filter by status when in check tabs */}
      {activeTab !== 'metrics' && (
        <div className="flex items-center justify-between text-[11px] pt-1">
          <span className="text-content-muted">تصفية البنود:</span>
          <div className="flex gap-1 bg-surface-soft p-0.5 rounded-control border border-surface-border">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-0.5 rounded ${
                statusFilter === 'all'
                  ? 'bg-white font-bold shadow-xs text-brand-600'
                  : 'text-content-muted'
              }`}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('issues')}
              className={`px-2 py-0.5 rounded ${
                statusFilter === 'issues'
                  ? 'bg-white font-bold shadow-xs text-amber-600'
                  : 'text-content-muted'
              }`}
            >
              الملاحظات ({warnCount + failCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('pass')}
              className={`px-2 py-0.5 rounded ${
                statusFilter === 'pass'
                  ? 'bg-white font-bold shadow-xs text-emerald-600'
                  : 'text-content-muted'
              }`}
            >
              الناجح ({passCount})
            </button>
          </div>
        </div>
      )}

      {/* Checks List */}
      {activeTab !== 'metrics' ? (
        <div className="space-y-2 max-h-[380px] overflow-y-auto pe-1">
          {currentTabChecks.length === 0 ? (
            <div className="text-center py-6 text-xs text-content-muted">
              لا توجد عناصر مطابقة للتصفية الحالية.
            </div>
          ) : (
            currentTabChecks.map((check) => {
              const isExpanded = expandedCheckId === check.id
              return (
                <div
                  key={check.id}
                  className={`border rounded-control p-2.5 text-xs transition-colors ${
                    check.status === 'pass'
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : check.status === 'warn'
                        ? 'border-amber-200 bg-amber-50/40'
                        : 'border-red-200 bg-red-50/40'
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(check.id)}
                    className="flex items-start justify-between gap-2 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 shrink-0">
                        {check.status === 'pass' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : check.status === 'warn' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-content-heading">
                          {check.titleAr}
                        </div>
                        <div className="text-[11px] text-content-body mt-0.5">
                          {check.messageAr}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          check.status === 'pass'
                            ? 'bg-emerald-100 text-emerald-800'
                            : check.status === 'warn'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {check.score}/{check.maxScore}
                      </span>
                      {check.fixTipAr && (
                        <div className="text-content-muted">
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Collapsible Fix Tip */}
                  {isExpanded && check.fixTipAr && (
                    <div className="mt-2.5 pt-2 border-t border-surface-border text-[11px] text-content-body bg-white p-2 rounded-control">
                      <div className="font-semibold text-amber-700 flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>كيفية التحسين:</span>
                      </div>
                      <p>{check.fixTipAr}</p>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      ) : (
        /* Detailed Metrics Tab */
        <div className="space-y-4 max-h-[380px] overflow-y-auto pe-1 text-xs">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1">
              <div className="flex items-center gap-1.5 text-content-muted text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>وقت القراءة المقدر</span>
              </div>
              <div className="font-bold text-content-heading text-sm">
                {metrics.readingTimeMin} دقيقة
              </div>
            </div>

            <div className="p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1">
              <div className="flex items-center gap-1.5 text-content-muted text-[11px]">
                <Hash className="w-3.5 h-3.5" />
                <span>عدد الكلمات الكلي</span>
              </div>
              <div className="font-bold text-content-heading text-sm">
                {metrics.wordCount} كلمة
              </div>
            </div>

            <div className="p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1">
              <div className="flex items-center gap-1.5 text-content-muted text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تكرار الكلمة المفتاحية</span>
              </div>
              <div className="font-bold text-content-heading text-sm">
                {metrics.keywordOccurrences} مرات ({metrics.keywordDensity}%)
              </div>
            </div>

            <div className="p-2.5 rounded-control bg-surface-soft border border-surface-border space-y-1">
              <div className="flex items-center gap-1.5 text-content-muted text-[11px]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>الفقرات والجمل</span>
              </div>
              <div className="font-bold text-content-heading text-xs">
                {metrics.paragraphsCount} فقرة / {metrics.sentenceCount} جملة
              </div>
            </div>
          </div>

          {/* Headings Outline */}
          <div className="space-y-1.5">
            <div className="font-bold text-content-heading flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <ListTree className="w-3.5 h-3.5 text-brand-600" />
                <span>هيكل العناوين ({metrics.headingsOutline.length})</span>
              </span>
              <span className="text-[11px] font-mono text-content-muted">
                H2: {metrics.headingsCount.h2} | H3: {metrics.headingsCount.h3} | H4: {metrics.headingsCount.h4}
              </span>
            </div>
            {metrics.headingsOutline.length === 0 ? (
              <div className="text-content-muted text-[11px] bg-surface-soft p-2 rounded-control border border-surface-border">
                لا توجد ترويسات H2 أو H3 داخل المقال بعد.
              </div>
            ) : (
              <div className="max-h-28 overflow-y-auto space-y-1 bg-surface-soft p-2 rounded-control border border-surface-border text-[11px]">
                {metrics.headingsOutline.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 ${
                      h.level === 3 ? 'ps-4' : h.level === 4 ? 'ps-8' : ''
                    }`}
                  >
                    <span className="font-mono text-[9px] font-bold text-brand-700 px-1 py-0.2 rounded bg-brand-50 border border-brand-200">
                      H{h.level}
                    </span>
                    <span className="truncate text-content-heading">
                      {h.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Links Breakdown */}
          <div className="space-y-1.5">
            <div className="font-bold text-content-heading flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-brand-600" />
                <span>الروابط ({metrics.links.linksList.length})</span>
              </span>
              <span className="text-[11px] text-content-muted">
                داخلية: {metrics.links.internalCount} | خارجية: {metrics.links.externalCount}
              </span>
            </div>
            {metrics.links.linksList.length > 0 && (
              <div className="max-h-24 overflow-y-auto space-y-1 bg-surface-soft p-2 rounded-control border border-surface-border text-[11px]">
                {metrics.links.linksList.map((link, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <span className="truncate text-content-heading">
                      {link.text || link.href}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                        link.isInternal
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {link.isInternal ? 'داخلي' : 'خارجي'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Images Breakdown */}
          <div className="space-y-1.5">
            <div className="font-bold text-content-heading flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-brand-600" />
                <span>الصور داخل المحتوى ({metrics.images.total})</span>
              </span>
              <span className="text-[11px] text-content-muted">
                نص بديل مضاف: {metrics.images.withAlt} / مفقود: {metrics.images.missingAlt}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

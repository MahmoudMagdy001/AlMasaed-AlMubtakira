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
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
          gaugeText: 'text-emerald-600 dark:text-emerald-400',
          progress: 'bg-emerald-500',
          label: 'ممتاز',
        }
      : grade === 'average'
        ? {
            badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
            gaugeText: 'text-amber-600 dark:text-amber-400',
            progress: 'bg-amber-500',
            label: 'متوسط',
          }
        : {
            badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
            gaugeText: 'text-red-600 dark:text-red-400',
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
      {/* Header with Circular Score Gauge and Grade Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* SVG circular progress */}
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
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
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                محلل السيو المباشر
              </h3>
              {isAnalyzing && (
                <span className="text-[10px] text-slate-400 animate-pulse">
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
                <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                  الكلمة: {focusKeyword}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick summary counters */}
        <div className="text-end text-[11px] space-y-0.5">
          <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {passCount} ناجح
          </div>
          <div className="text-amber-500 font-semibold">
            {warnCount} تنبيه
          </div>
          <div className="text-red-500 font-semibold">
            {failCount} بحاجة لتعديل
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'basic'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          الأساسي (50)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'content'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          المحتوى (30)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'technical'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          التقني (20)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('metrics')}
          className={`pb-2 px-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'metrics'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          إحصائيات
        </button>
      </div>

      {/* Filter by status when in check tabs */}
      {activeTab !== 'metrics' && (
        <div className="flex items-center justify-between text-[11px] pt-1">
          <span className="text-slate-400">تصفية البنود:</span>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-0.5 rounded ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 font-bold shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              الكل
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('issues')}
              className={`px-2 py-0.5 rounded ${
                statusFilter === 'issues'
                  ? 'bg-white dark:bg-slate-700 font-bold shadow-xs text-amber-600 dark:text-amber-400'
                  : 'text-slate-500'
              }`}
            >
              الملاحظات ({warnCount + failCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('pass')}
              className={`px-2 py-0.5 rounded ${
                statusFilter === 'pass'
                  ? 'bg-white dark:bg-slate-700 font-bold shadow-xs text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-500'
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
            <div className="text-center py-6 text-xs text-slate-400">
              لا توجد عناصر مطابقة للتصفية الحالية.
            </div>
          ) : (
            currentTabChecks.map((check) => {
              const isExpanded = expandedCheckId === check.id
              return (
                <div
                  key={check.id}
                  className={`border rounded-lg p-2.5 text-xs transition-colors ${
                    check.status === 'pass'
                      ? 'border-emerald-100 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : check.status === 'warn'
                        ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10'
                        : 'border-red-200 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/10'
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
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {check.titleAr}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                          {check.messageAr}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          check.status === 'pass'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : check.status === 'warn'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        }`}
                      >
                        {check.score}/{check.maxScore}
                      </span>
                      {check.fixTipAr && (
                        <div className="text-slate-400">
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
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-800/40 p-2 rounded">
                      <div className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 mb-1">
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
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>وقت القراءة المقدر</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {metrics.readingTimeMin} دقيقة
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Hash className="w-3.5 h-3.5" />
                <span>عدد الكلمات الكلي</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {metrics.wordCount} كلمة
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تكرار الكلمة المفتاحية</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {metrics.keywordOccurrences} مرات ({metrics.keywordDensity}%)
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>الفقرات والجمل</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-xs">
                {metrics.paragraphsCount} فقرة / {metrics.sentenceCount} جملة
              </div>
            </div>
          </div>

          {/* Headings Outline */}
          <div className="space-y-1.5">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <ListTree className="w-3.5 h-3.5 text-primary-500" />
                <span>هيكل العناوين ({metrics.headingsOutline.length})</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                H2: {metrics.headingsCount.h2} | H3: {metrics.headingsCount.h3} | H4: {metrics.headingsCount.h4}
              </span>
            </div>
            {metrics.headingsOutline.length === 0 ? (
              <div className="text-slate-400 text-[11px] bg-slate-50 dark:bg-slate-800/40 p-2 rounded">
                لا توجد ترويسات H2 أو H3 داخل المقال بعد.
              </div>
            ) : (
              <div className="max-h-28 overflow-y-auto space-y-1 bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-700 text-[11px]">
                {metrics.headingsOutline.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 ${
                      h.level === 3 ? 'ps-4' : h.level === 4 ? 'ps-8' : ''
                    }`}
                  >
                    <span className="font-mono text-[9px] font-bold text-primary-600 dark:text-primary-400 px-1 py-0.2 rounded bg-primary-50 dark:bg-primary-950">
                      H{h.level}
                    </span>
                    <span className="truncate text-slate-700 dark:text-slate-300">
                      {h.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Links Breakdown */}
          <div className="space-y-1.5">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-primary-500" />
                <span>الروابط ({metrics.links.linksList.length})</span>
              </span>
              <span className="text-[11px] text-slate-400">
                داخلية: {metrics.links.internalCount} | خارجية: {metrics.links.externalCount}
              </span>
            </div>
            {metrics.links.linksList.length > 0 && (
              <div className="max-h-24 overflow-y-auto space-y-1 bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-700 text-[11px]">
                {metrics.links.linksList.map((link, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <span className="truncate text-slate-700 dark:text-slate-300">
                      {link.text || link.href}
                    </span>
                    <span
                      className={`text-[9px] px-1 rounded shrink-0 ${
                        link.isInternal
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
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
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary-500" />
                <span>الصور داخل المحتوى ({metrics.images.total})</span>
              </span>
              <span className="text-[11px] text-slate-400">
                نص بديل مضاف: {metrics.images.withAlt} / مفقود: {metrics.images.missingAlt}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

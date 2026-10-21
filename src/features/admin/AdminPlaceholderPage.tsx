import React from 'react'
import { PageHeader } from '@/components/admin'
import { Construction } from 'lucide-react'

export interface AdminPlaceholderPageProps {
  title: string
  phaseNumber?: string
}

export const AdminPlaceholderPage: React.FC<AdminPlaceholderPageProps> = ({
  title,
  phaseNumber,
}) => {
  return (
    <div>
      <PageHeader
        title={title}
        description={`هذا القسم سيتم ربطه وتفعيله بالكامل في ${
          phaseNumber || 'المرحلة التالية'
        }.`}
      />

      <div className="bg-white rounded-card border border-surface-border p-12 text-center shadow-xs">
        <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Construction className="w-8 h-8" aria-hidden="true" />
        </div>

        <h2 className="text-lg font-bold text-content-heading mb-2">
          {title} قيد الإعداد
        </h2>
        <p className="text-xs text-content-muted max-w-md mx-auto leading-relaxed">
          تم تجهيز مسار الصفحة ومخطط البيانات الأساسي؛ سيتم تفعيل عمليات الإضافة
          والتعديل وإدارة المحتوى الكاملة لهذا القسم وفق جدول المراحل المعتمد.
        </p>
      </div>
    </div>
  )
}

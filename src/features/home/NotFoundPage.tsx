import React from 'react'
import { Button, Container } from '@/components/ui'
import { Seo } from '@/components/seo/Seo'

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo
        title="الصفحة غير موجودة"
        description="عذراً، الصفحة التي تبحث عنها غير موجودة."
        noindex={true}
      />
      <div className="min-h-[60vh] flex items-center justify-center py-20 bg-surface-soft">
        <Container className="text-center">
          <span className="text-brand-600 font-extrabold text-7xl md:text-9xl tracking-tight block mb-4">
            404
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-content-heading mb-4">
            الصفحة غير موجودة
          </h1>
          <p className="text-content-body max-w-md mx-auto mb-8 text-base md:text-lg">
            عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد يكون الرابط
            خاطئاً أو تم نقل الصفحة.
          </p>
          <Button variant="primary" size="lg" to="/">
            العودة للصفحة الرئيسية
          </Button>
        </Container>
      </div>
    </>
  )
}

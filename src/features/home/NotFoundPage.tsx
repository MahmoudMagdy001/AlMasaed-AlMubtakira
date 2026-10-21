import React from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>الصفحة غير موجودة | شركة المصاعد المبتكرة</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
        <span className="text-brand-600 font-bold text-6xl md:text-8xl mb-4">
          404
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-content-heading mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-content-muted mb-8 max-w-md">
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد يكون الرابط
          خاطئاً أو تم نقل الصفحة.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-control bg-brand-900 hover:bg-brand-800 text-white font-medium transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </>
  )
}

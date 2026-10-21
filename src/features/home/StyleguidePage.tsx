import React, { useState } from 'react'
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  FormField,
  Badge,
  useToast,
  Skeleton,
  Tooltip,
  Pagination,
  Breadcrumbs,
  Accordion,
  Tabs,
  Dialog,
  Drawer,
  Section,
  Container,
  SectionHeading,
  Logo,
  BrandPattern,
} from '@/components/ui'
import { Seo } from '@/components/seo/Seo'
import {
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

export const StyleguidePage: React.FC = () => {
  const toast = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [activeDir, setActiveDir] = useState<'rtl' | 'ltr'>('rtl')

  const isRtl = activeDir === 'rtl'

  return (
    <div dir={activeDir} className="min-h-screen bg-surface-soft pb-24">
      <Seo
        title="دليل الهوية والمكونات (Styleguide)"
        description="صفحة خاصة بمراجعة نظام التصميم والمكونات لموقع شركة المصاعد المبتكرة."
        noindex={true}
        dir={activeDir}
        lang={isRtl ? 'ar' : 'en'}
      />

      {/* Styleguide Header */}
      <header className="bg-brand-900 text-white py-12 border-b border-brand-800 relative overflow-hidden">
        <BrandPattern opacity={0.08} />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-brand-400 font-semibold text-xs tracking-wider uppercase">
                  Al-Masaed Al-Mubtakirah
                </span>
                <span className="text-white/40">•</span>
                <span className="bg-brand-800 text-brand-300 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  Internal Preview (Phase 01)
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                دليل الهوية ومكتبة المكونات
              </h1>
              <p className="text-brand-100 text-base md:text-lg max-w-2xl">
                مرجع لجميع الرموز البصرية، الألوان، الخطوط، والمكونات المعتمدة
                وفقاً لدليل الهوية.
              </p>
            </div>

            {/* RTL / LTR Direction Switcher */}
            <div className="flex items-center gap-2 bg-brand-800/80 p-1.5 rounded-control border border-white/10 shrink-0">
              <span className="text-xs text-brand-200 px-2 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                الاتجاه:
              </span>
              <button
                type="button"
                onClick={() => setActiveDir('rtl')}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-colors ${
                  isRtl
                    ? 'bg-brand-400 text-brand-900'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                RTL (العربية)
              </button>
              <button
                type="button"
                onClick={() => setActiveDir('ltr')}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-colors ${
                  !isRtl
                    ? 'bg-brand-400 text-brand-900'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                LTR (English)
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Breadcrumbs bar */}
      <div className="bg-white border-b border-surface-border py-3">
        <Container>
          <Breadcrumbs
            isRtl={isRtl}
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'دليل الهوية والتصميم' },
            ]}
          />
        </Container>
      </div>

      <Container className="mt-12 space-y-16">
        {/* 1. Color Palette */}
        <section
          aria-labelledby="colors-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="colors-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            1. لوحة الألوان (Brand Color Palette)
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-content-muted uppercase mb-3">
                تدرجات اللون الأساسي (Brand Scale: #132454 → #336ea6 → #5ec1f0)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2.5">
                {[
                  { name: '50', hex: '#f0f6fc', text: 'text-content-heading' },
                  { name: '100', hex: '#e1ecf8', text: 'text-content-heading' },
                  { name: '200', hex: '#c3daf1', text: 'text-content-heading' },
                  { name: '300', hex: '#95c0e6', text: 'text-content-heading' },
                  {
                    name: '400',
                    hex: '#5ec1f0',
                    text: 'text-brand-900',
                    note: 'Cyan Blue',
                  },
                  { name: '500', hex: '#3d94cc', text: 'text-white' },
                  {
                    name: '600',
                    hex: '#336ea6',
                    text: 'text-white',
                    note: 'Blue',
                  },
                  { name: '700', hex: '#234f78', text: 'text-white' },
                  { name: '800', hex: '#1b3b5a', text: 'text-white' },
                  {
                    name: '900',
                    hex: '#132454',
                    text: 'text-white',
                    note: 'Dark Blue',
                  },
                ].map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col rounded-control overflow-hidden border border-surface-border"
                  >
                    <div
                      className={`h-16 p-2 flex flex-col justify-end text-xs font-bold ${color.text}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {color.name}
                    </div>
                    <div className="p-2 bg-white text-[11px] font-mono text-content-muted">
                      {color.hex}
                      {color.note && (
                        <div className="text-[10px] text-brand-600 font-sans mt-0.5">
                          {color.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-content-muted uppercase mb-3">
                الألوان المساعدة والمحايدة (Neutrals & Feedback)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {[
                  {
                    name: 'Surface Soft',
                    hex: '#f4f7fb',
                    bg: 'bg-surface-soft',
                    text: 'text-content-body',
                  },
                  {
                    name: 'Border',
                    hex: '#dde4ef',
                    bg: 'bg-surface-border',
                    text: 'text-content-body',
                  },
                  {
                    name: 'Text Body',
                    hex: '#3a4560',
                    bg: 'bg-content-body',
                    text: 'text-white',
                  },
                  {
                    name: 'Success',
                    hex: '#1f8a5b',
                    bg: 'bg-feedback-success',
                    text: 'text-white',
                  },
                  {
                    name: 'Error',
                    hex: '#c0392b',
                    bg: 'bg-feedback-error',
                    text: 'text-white',
                  },
                  {
                    name: 'WhatsApp',
                    hex: '#25d366',
                    bg: 'bg-whatsapp',
                    text: 'text-white',
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="rounded-control overflow-hidden border border-surface-border"
                  >
                    <div
                      className={`h-14 p-2 flex items-end text-xs font-bold ${item.bg} ${item.text}`}
                    >
                      {item.name}
                    </div>
                    <div className="p-2 bg-white text-xs font-mono text-content-muted">
                      {item.hex}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Brand Logos & Pattern */}
        <section
          aria-labelledby="logos-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="logos-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            2. شعار الشركة والزخرفة البصرية (Logos & Pattern)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dark background logo */}
            <div className="p-8 rounded-card bg-brand-900 relative overflow-hidden flex flex-col items-center justify-center gap-4 text-center">
              <BrandPattern opacity={0.08} />
              <div className="relative z-10 flex flex-col items-center">
                <Logo size="footer" theme="dark" asLink={false} />
                <span className="text-xs text-brand-300 mt-4">
                  الشعار المعكوس للأرضيات الداكنة (Header, Footer, Hero)
                </span>
              </div>
            </div>

            {/* Light background logo */}
            <div className="p-8 rounded-card bg-surface-soft border border-surface-border flex flex-col items-center justify-center gap-4 text-center">
              <Logo size="footer" theme="light" asLink={false} />
              <span className="text-xs text-content-muted mt-4">
                الشعار الملون للأرضيات الفاتحة (Admin, Invoices, Emails)
              </span>
            </div>
          </div>
        </section>

        {/* 3. Typography */}
        <section
          aria-labelledby="type-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="type-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            3. مقياس الخطوط والطباعة (Typography Scale — Tajawal)
          </h2>
          <div className="space-y-6">
            <div>
              <span className="text-xs text-content-muted font-mono">
                H1 / 48px — 56px (Bold 700)
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-content-heading mt-1">
                شركة المصاعد المبتكرة: صيانة وتحديث وتركيب المصاعد في جدة
              </h1>
            </div>
            <div>
              <span className="text-xs text-content-muted font-mono">
                H2 / 32px — 40px (Bold 700)
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-content-heading mt-1">
                حلول هندسية متطورة تلبي أعلى معايير الأمان والسلامة
              </h2>
            </div>
            <div>
              <span className="text-xs text-content-muted font-mono">
                H3 / 24px — 28px (Bold 700)
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-content-heading mt-1">
                صيانة دورية لجميع الموديلات ومصاعد ذوي الاحتياجات الخاصة
              </h3>
            </div>
            <div>
              <span className="text-xs text-content-muted font-mono">
                Body / 18px (Regular 400, Line Height 1.8)
              </span>
              <p className="text-base md:text-lg text-content-body leading-relaxed mt-1 max-w-3xl">
                نقدم خدمات الصيانة الدائمة والاختبار والإصلاح بشكل متسق وفي
                الوقت المناسب لجميع ماركات وموديلات المصاعد والسلالم المتحركة
                والممرات المتحركة بما يتوافق مع رؤية المملكة 2030. نهجنا المخصص
                يركز على الحفاظ على ارتفاع كفاءة وسلامة وأمان عمليات نقل الأشخاص
                لديك.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Buttons */}
        <section
          aria-labelledby="buttons-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="buttons-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            4. الأزرار التفاعلية (Button Variants & Sizes)
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">زر أساسي (Primary)</Button>
              <Button variant="secondary">زر ثانوي (Secondary)</Button>
              <Button variant="ghost">زر شفاف (Ghost)</Button>
              <Button
                variant="whatsapp"
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                واتساب (WhatsApp)
              </Button>
              <div className="p-3 rounded-control bg-brand-900 inline-flex items-center">
                <Button variant="inverse">زر معكوس (Inverse)</Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-surface-border">
              <Button size="sm">حجم صغير (sm)</Button>
              <Button size="md">حجم متوسط (md)</Button>
              <Button size="lg">حجم كبير (lg)</Button>
              <Button isLoading={true}>جاري التحميل...</Button>
              <Button disabled={true}>معطل (Disabled)</Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-surface-border">
              <Button
                variant="primary"
                leftIcon={<Phone className="w-4 h-4" />}
                rightIcon={
                  isRtl ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )
                }
              >
                زر بأيقونات (Left & Right Icons)
              </Button>
            </div>
          </div>
        </section>

        {/* 5. Form Controls */}
        <section
          aria-labelledby="forms-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="forms-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            5. حقول الإدخال والنماذج (Form Controls)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <FormField label="الاسم الكامل" htmlFor="demo-name" required={true}>
              <Input id="demo-name" placeholder="محمد السعيد" />
            </FormField>

            <FormField
              label="رقم الجوال"
              htmlFor="demo-phone"
              required={true}
              helperText="سيتم التواصل معك هاتفياً أو عبر واتساب"
            >
              <Input
                id="demo-phone"
                type="tel"
                placeholder="055 955 7459"
                leftIcon={<Phone className="w-4 h-4" />}
              />
            </FormField>

            <FormField
              label="نوع الخدمة المطلوبة"
              htmlFor="demo-service"
              required={true}
            >
              <Select
                id="demo-service"
                placeholder="اختر الخدمة..."
                options={[
                  { value: 'maintenance', label: 'صيانة مصاعد دورية' },
                  { value: 'modernization', label: 'تحديث وتطوير مصعد قديم' },
                  { value: 'installation', label: 'توريد وتركيب مصعد جديد' },
                  { value: 'spare-parts', label: 'طلب قطع غيار' },
                ]}
              />
            </FormField>

            <FormField
              label="البريد الإلكتروني"
              htmlFor="demo-email"
              optionalLabel="اختياري"
              error="يرجى إدخال عنوان بريد إلكتروني صحيح"
            >
              <Input
                id="demo-email"
                type="email"
                defaultValue="invalid-email"
                error={true}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField
                label="تفاصيل الطلب أو الرسالة"
                htmlFor="demo-message"
                required={true}
              >
                <Textarea
                  id="demo-message"
                  rows={3}
                  placeholder="اكتب مواصفات المبنى أو نوع العطل..."
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <Checkbox
                id="demo-agreement"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                label="أوافق على سياسة الخصوصية واستخدام البيانات للتواصل بشأن عرض السعر"
              />
            </div>
          </div>
        </section>

        {/* 6. Badges & Toasts */}
        <section
          aria-labelledby="badges-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="badges-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            6. الشارات والتنبيهات (Badges & Toasts)
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default">شارة افتراضية</Badge>
              <Badge
                variant="brand"
                icon={<ShieldCheck className="w-3.5 h-3.5" />}
              >
                معتمد دفاع مدني
              </Badge>
              <Badge
                variant="success"
                icon={<CheckCircle2 className="w-3.5 h-3.5" />}
              >
                مكتمل بنجاح
              </Badge>
              <Badge variant="warning">قيد المراجعة</Badge>
              <Badge variant="error">بحاجة لإصلاح</Badge>
              <Badge variant="neutral">مسودة</Badge>
            </div>

            <div className="pt-4 border-t border-surface-border">
              <h3 className="text-sm font-semibold text-content-heading mb-3">
                تجربة رسائل الإشعار التفاعلية (Toast Triggers)
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    toast.success(
                      'تم إرسال الطلب',
                      'سيتواصل معك فريقنا خلال 24 ساعة.',
                    )
                  }
                >
                  إشعار نجاح (Success Toast)
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    toast.error(
                      'خطأ في الاتصال',
                      'تعذر إرسال النموذج، يرجى المحاولة لاحقاً.',
                    )
                  }
                >
                  إشعار خطأ (Error Toast)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.info(
                      'تحديث البيانات',
                      'تم حفظ التعديلات في مسودة النظام.',
                    )
                  }
                >
                  إشعار معلومات (Info Toast)
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-border">
              <h3 className="text-sm font-semibold text-content-heading mb-3">
                عناصر التلميح والهياكل التجريبية (Tooltip & Skeletons)
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <Tooltip content="رقم السجل التجاري المعتمد لدى وزارة التجارة">
                  <span className="text-sm font-semibold text-brand-600 underline cursor-help">
                    مرر الفأرة هنا لرؤية التلميح (Tooltip)
                  </span>
                </Tooltip>

                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="space-y-1.5">
                    <Skeleton width={120} height={12} />
                    <Skeleton width={80} height={10} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Disclosures & Navigation (Accordion, Tabs, Pagination) */}
        <section
          aria-labelledby="disclosure-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="disclosure-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            7. الأكورديون وعلامات التبويب والتنقل (Accordion, Tabs, Pagination)
          </h2>
          <div className="space-y-8 max-w-4xl">
            <div>
              <h3 className="text-base font-bold text-content-heading mb-3">
                أكورديون الأسئلة الشائعة (FAQ Accordion)
              </h3>
              <Accordion
                defaultOpenIndex={0}
                items={[
                  {
                    title: 'كم يستغرق وقت الاستجابة لحالات طوارئ المصاعد؟',
                    content:
                      'نوفر فرق استجابة للطوارئ للحالات الحرجة مع التزام بالاستجابة في نفس اليوم لكافة المباني السكنية والتجارية في مدينة جدة.',
                  },
                  {
                    title: 'هل أنتم معتمدون لدى الدفاع المدني؟',
                    content:
                      'نعم، شركة المصاعد المبتكرة شركة سعودية معتمدة رسمياً لدى الدفاع المدني ومرخصة بموجب السجل التجاري رقم 4030227058.',
                  },
                  {
                    title: 'ما هي أنواع المصاعد التي تشملها عقود الصيانة؟',
                    content:
                      'نقدم خدمات الصيانة لجميع موديلات وماركات المصاعد الهيدروليكية والكهربائية ومصاعد ذوي الاحتياجات الخاصة والسلالم المتحركة.',
                  },
                ]}
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-content-heading mb-3">
                علامات التبويب (Tabs Component)
              </h3>
              <Tabs
                items={[
                  {
                    id: 'tab-1',
                    label: 'صيانة المصاعد',
                    content: (
                      <div className="p-4 bg-surface-soft rounded-control text-sm leading-relaxed">
                        خطط صيانة وقائية شهرية ودورية تشمل فحص أقفال الأبواب،
                        وحدة الطاقة، الأسطوانة الهيدروليكية، واختبار منظومة
                        الأمان.
                      </div>
                    ),
                  },
                  {
                    id: 'tab-2',
                    label: 'تحديث المصاعد',
                    content: (
                      <div className="p-4 bg-surface-soft rounded-control text-sm leading-relaxed">
                        تطوير الكبائن القديمة، استبدال لوحات التحكم بنظم ذكية،
                        وتحسين استهلاك الطاقة وراحة الركاب.
                      </div>
                    ),
                  },
                  {
                    id: 'tab-3',
                    label: 'قطع الغيار الأصلية',
                    content: (
                      <div className="p-4 bg-surface-soft rounded-control text-sm leading-relaxed">
                        توريد مباشر لقطع الغيار الأصلية لجميع الماركات العالمية
                        المعتمدة مع ضمان الجودة.
                      </div>
                    ),
                  },
                ]}
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-content-heading mb-3">
                شريط الصفحات (Pagination)
              </h3>
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={(page) => setCurrentPage(page)}
                isRtl={isRtl}
              />
            </div>
          </div>
        </section>

        {/* 8. Modals: Dialog & Drawer */}
        <section
          aria-labelledby="modals-title"
          className="bg-white p-6 md:p-8 rounded-card border border-surface-border shadow-card"
        >
          <h2
            id="modals-title"
            className="text-2xl font-bold text-content-heading mb-6 border-b border-surface-border pb-3"
          >
            8. النوافذ المنبثقة والقوائم الجانبية (Dialog & Drawer)
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => setIsDialogOpen(true)}>
              فتح النافذة الحوارية (Open Dialog)
            </Button>
            <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
              فتح القائمة الجانبية (Open Drawer)
            </Button>
          </div>

          {/* Sample Dialog */}
          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title="طلب عرض سعر صيانة مصاعد"
            description="الرجاء تأكيد بيانات التواصل لمتابعة الطلب مع المهندس المختص."
          >
            <div className="space-y-4 py-2">
              <p className="text-sm text-content-body">
                سيتم إرسال العرض الفني والمالي بناءً على عدد المصاعد والزيارات
                المطلوبة في عقد الصيانة السنوي.
              </p>
              <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsDialogOpen(false)
                    toast.success(
                      'تم تأكيد الطلب',
                      'سيتواصل معك مندوبنا قريباً.',
                    )
                  }}
                >
                  تأكيد وإرسال
                </Button>
              </div>
            </div>
          </Dialog>

          {/* Sample Drawer */}
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="معاينة القائمة الجانبية"
          >
            <div className="space-y-4">
              <p className="text-sm text-content-body leading-relaxed">
                هذه القائمة تدعم التركيز التلقائي (Focus Trap)، وتغلق بالضغط على
                مفتاح الهروب (Escape) أو النقر على الخلفية المعتمة.
              </p>
              <div className="pt-4 border-t border-surface-border">
                <Button
                  fullWidth={true}
                  variant="primary"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  إغلاق القائمة
                </Button>
              </div>
            </div>
          </Drawer>
        </section>
      </Container>

      {/* 9. Section Variants (White, Soft, Dark) */}
      <div className="mt-16 space-y-2">
        <Section variant="white">
          <Container>
            <SectionHeading
              kicker="قسم فاتح أبيض (White Variant)"
              title="خدمات توريد وتركيب المصاعد"
              intro="نقدم حلول توريد المصاعد للمباني السكنية والتجارية مع الالتزام الصارم بمعايير الجودة والمواصفات السعودية."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'تركيب دقيق',
                  text: 'فريق فني متمرس ومعدات قياس ومعايرة حديثة.',
                },
                {
                  title: 'ضمان شامل',
                  text: 'ضمان كامل على الهيكل والمحركات وقطع الغيار.',
                },
                {
                  title: 'اعتماد رسمي',
                  text: 'إصدار شهادات السلامة المعتمدة لدى الدفاع المدني.',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-card border border-surface-border bg-surface-soft"
                >
                  <Wrench className="w-6 h-6 text-brand-600 mb-3" />
                  <h3 className="font-bold text-content-heading mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-content-body">{c.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section variant="soft">
          <Container>
            <SectionHeading
              align="center"
              kicker="قسم رمادي ناعم (Soft Variant: #f4f7fb)"
              title="لماذا تختار شركة المصاعد المبتكرة؟"
              intro="7 أسباب تجعلنا الشريك الموثوق لإدارة وصيانة مصاعد منشأتك في جدة."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'خدمات إصلاح عالية الجودة',
                'سجل قوي للسلامة ورضا العملاء',
                'شبكة موردين واسعة للتنفيذ',
                'فرق استجابة للطوارئ في نفس اليوم',
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-card bg-white border border-surface-border shadow-sm flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-feedback-success shrink-0 mt-0.5" />
                  <span className="font-medium text-sm text-content-heading">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section variant="dark" withPattern={true}>
          <Container>
            <SectionHeading
              theme="dark"
              kicker="قسم داكن بهوية الشركة (Dark Variant: #132454)"
              title="جاهز للارتقاء بأداء وسلامة مصاعدك؟"
              intro="اتصل بنا اليوم للحصول على استشارة فنية مجانية وعرض سعر مخصص لمنشأتك."
            />
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<MessageSquare className="w-5 h-5" />}
              >
                تواصل عبر واتساب مباشرة
              </Button>
              <Button
                variant="inverse"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                اتصل بالرقم الموحد: 920016876
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  )
}

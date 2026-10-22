import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  PhoneCall,
  Headset,
  Mail,
  Building2,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Send,
  AlertCircle,
} from 'lucide-react'
import {
  Container,
  Section,
  BrandPattern,
  Breadcrumbs,
  Input,
  Textarea,
  Select,
  FormField,
  Button,
} from '@/components/ui'
import { Seo, getLocalBusinessSchema } from '@/components/seo'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { supabase } from '@/lib/supabase'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'nameTooShort' }).max(100),
  phone: z.string().min(7, { message: 'phoneInvalid' }).max(20),
  email: z
    .string()
    .email({ message: 'emailInvalid' })
    .max(255)
    .optional()
    .or(z.literal('')),
  service_interest: z.string().optional(),
  message: z.string().min(5, { message: 'messageTooShort' }).max(2000),
  website: z.string().max(0).optional(), // Honeypot field for bot detection
})

type ContactFormData = z.infer<typeof contactSchema>

export const ContactPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const settings = useSiteSettings()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  // Time tracker for minimum fill time detection (anti-bot)
  const formMountTime = useRef(Date.now())

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: isEn ? '/en' : '/' },
    { label: t('nav.contact') },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: async (values) => {
      const result = contactSchema.safeParse(values)
      if (result.success) {
        return { values: result.data, errors: {} }
      }
      const formErrors: Record<string, { type: string; message: string }> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!formErrors[field]) {
          formErrors[field] = { type: 'manual', message: issue.message }
        }
      }
      return { values: {}, errors: formErrors }
    },
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service_interest: '',
      message: '',
      website: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    // 1. Honeypot check: If filled, silently treat as success without calling DB
    if (data.website) {
      setIsSubmitted(true)
      return
    }

    // 2. Minimum fill time check: If submitted under 2.5 seconds, silently discard bot
    const elapsedMs = Date.now() - formMountTime.current
    if (elapsedMs < 2500) {
      setIsSubmitted(true)
      return
    }

    try {
      setSubmitError(null)

      // 3. Insert into Supabase contact_submissions table (anon key)
      const { error } = await supabase.from('contact_submissions').insert({
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email ? data.email.trim() : null,
        service_interest: data.service_interest || null,
        message: data.message.trim(),
        source_page: location.pathname,
        status: 'new',
      })

      if (error) {
        setSubmitError(
          isEn
            ? 'Failed to send your message. Please try again or call us directly.'
            : 'تعذر إرسال رسالتك حالياً. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة عبر الهاتف.',
        )
        return
      }

      // 4. Push event to GTM dataLayer if available
      if (
        typeof window !== 'undefined' &&
        (window as unknown as { dataLayer?: unknown[] }).dataLayer
      ) {
        ;(window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: 'contact_form_submit',
          service_interest: data.service_interest || 'general',
        })
      }

      setIsSubmitted(true)
      reset()
    } catch {
      setSubmitError(
        isEn
          ? 'An unexpected error occurred. Please call us directly.'
          : 'حدث خطأ غير متوقع. يرجى الاتصال بنا مباشرة.',
      )
    }
  }

  const serviceOptions = [
    { value: '', label: t('contact.serviceSelectPlaceholder') },
    { value: 'maintenance', label: t('services.maintenance.title') },
    { value: 'modernization', label: t('services.modernization.title') },
    { value: 'installation', label: t('services.installation.title') },
    { value: 'spare-parts', label: t('services.spareParts.title') },
    { value: 'escalators', label: t('services.escalators.title') },
  ]

  return (
    <>
      <Seo
        title={t('contact.pageTitle')}
        description={t('contact.pageDescription')}
        canonical={isEn ? '/en/contact' : '/contact'}
        hreflang={{
          ar: 'https://almubtakirah.com/contact',
          en: 'https://almubtakirah.com/en/contact',
          xDefault: 'https://almubtakirah.com/contact',
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        breadcrumbs={[
          { name: t('common.breadcrumbHome'), url: isEn ? '/en' : '/' },
          { name: t('nav.contact'), url: isEn ? '/en/contact' : '/contact' },
        ]}
        jsonLd={[getLocalBusinessSchema()]}
      />

      {/* Header Banner */}
      <section className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden">
        <BrandPattern opacity={0.07} />
        <Container className="relative z-10">
          <Breadcrumbs items={breadcrumbsItems} className="mb-6 text-white/80" />
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2">
              {t('contact.eyebrow')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {t('contact.heading')}
            </h1>
            <p className="text-base sm:text-lg text-brand-100 leading-relaxed font-normal">
              {t('contact.subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content: Form & Details */}
      <Section variant="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-card border border-surface-border shadow-xs">
              <h2 className="text-2xl font-bold text-content-heading mb-2">
                {t('contact.formTitle')}
              </h2>
              <p className="text-sm text-content-muted mb-8 leading-relaxed">
                {t('contact.formSubtitle')}
              </p>

              {isSubmitted ? (
                <div
                  className="p-8 rounded-control bg-feedback-success-light border border-feedback-success/30 text-center"
                  role="status"
                >
                  <CheckCircle2 className="w-12 h-12 text-feedback-success mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-content-heading mb-2">
                    {t('contact.successHeading')}
                  </h3>
                  <p className="text-sm text-content-body max-w-md mx-auto mb-6">
                    {t('contact.successMessage')}
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsSubmitted(false)
                      formMountTime.current = Date.now()
                    }}
                    className="border-feedback-success text-feedback-success hover:bg-feedback-success/10 font-medium"
                  >
                    {t('contact.sendAnother')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('website')}
                    />
                  </div>

                  {submitError && (
                    <div
                      className="p-4 rounded-control bg-feedback-error-light border border-feedback-error/30 text-feedback-error text-sm flex items-center gap-2"
                      role="alert"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      label={t('contact.nameLabel')}
                      required
                      error={
                        errors.name?.message
                          ? t(`contact.validation.${errors.name.message}`)
                          : undefined
                      }
                    >
                      <Input
                        placeholder={t('contact.namePlaceholder')}
                        error={Boolean(errors.name)}
                        {...register('name')}
                      />
                    </FormField>

                    <FormField
                      label={t('contact.phoneLabel')}
                      required
                      error={
                        errors.phone?.message
                          ? t(`contact.validation.${errors.phone.message}`)
                          : undefined
                      }
                    >
                      <Input
                        type="tel"
                        dir="ltr"
                        placeholder={t('contact.phonePlaceholder')}
                        error={Boolean(errors.phone)}
                        {...register('phone')}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      label={t('contact.emailLabel')}
                      optionalLabel={`(${t('common.optional')})`}
                      error={
                        errors.email?.message
                          ? t(`contact.validation.${errors.email.message}`)
                          : undefined
                      }
                    >
                      <Input
                        type="email"
                        dir="ltr"
                        placeholder={t('contact.emailPlaceholder')}
                        error={Boolean(errors.email)}
                        {...register('email')}
                      />
                    </FormField>

                    <FormField label={t('contact.serviceLabel')}>
                      <Select
                        options={serviceOptions}
                        {...register('service_interest')}
                      />
                    </FormField>
                  </div>

                  <FormField
                    label={t('contact.messageLabel')}
                    required
                    error={
                      errors.message?.message
                        ? t(`contact.validation.${errors.message.message}`)
                        : undefined
                    }
                  >
                    <Textarea
                      rows={5}
                      placeholder={t('contact.messagePlaceholder')}
                      error={Boolean(errors.message)}
                      {...register('message')}
                    />
                  </FormField>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 font-semibold"
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? t('contact.submitting') : t('contact.submitButton')}
                  </Button>
                </form>
              )}
            </div>

            {/* Side Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface-subtle p-8 rounded-card border border-surface-border">
                <h3 className="text-xl font-bold text-content-heading mb-6">
                  {t('contact.infoTitle')}
                </h3>

                <div className="space-y-6">
                  {/* Unified Number */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-200/80 text-brand-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <Headset className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-xs text-content-muted font-medium block mb-1">
                        {t('contact.unifiedNumberTitle')}
                      </span>
                      <a
                        href={`tel:${settings.contact.unifiedNumber}`}
                        dir="ltr"
                        className="text-base font-bold text-content-heading hover:text-brand-600 transition-colors inline-block"
                      >
                        {settings.contact.unifiedDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Mobile & WhatsApp */}
                  {settings.contact.phones[1] && (
                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#25D366] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs text-content-muted font-medium block mb-1">
                          {t('contact.mobileWhatsAppTitle')}
                        </span>
                        <div className="flex flex-col gap-1">
                          <a
                            href={`tel:${settings.contact.phones[1]}`}
                            dir="ltr"
                            className="text-sm font-bold text-content-heading hover:text-brand-600 transition-colors inline-block"
                          >
                            {settings.contact.phoneDisplay[1] || settings.contact.phones[1]}
                          </a>
                          <a
                            href={`https://wa.me/${settings.contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#25D366] hover:text-[#20BD5A] inline-flex items-center gap-1.5 transition-colors"
                          >
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Direct Phone */}
                  {settings.contact.phones[0] && (
                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                        <PhoneCall className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-xs text-content-muted font-medium block mb-1">
                          {t('contact.phoneTitle')}
                        </span>
                        <a
                          href={`tel:${settings.contact.phones[0]}`}
                          dir="ltr"
                          className="text-sm font-bold text-content-heading hover:text-brand-600 transition-colors inline-block"
                        >
                          {settings.contact.phoneDisplay[0] || settings.contact.phones[0]}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {settings.contact.email && (
                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-xs text-content-muted font-medium block mb-1">
                          {t('contact.emailTitle')}
                        </span>
                        <a
                          href={`mailto:${settings.contact.email}`}
                          dir="ltr"
                          className="text-sm font-bold text-content-heading hover:text-brand-600 transition-colors inline-block"
                        >
                          {settings.contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location & Coverage */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-xs text-content-muted font-medium block mb-1">
                        {t('contact.locationTitle')}
                      </span>
                      <span className="text-sm font-bold text-content-heading block">
                        {isEn ? settings.contact.cityEn : settings.contact.cityAr}
                      </span>
                      {settings.contact.mapUrl && (
                        <a
                          href={settings.contact.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-brand-600 hover:underline mt-1 inline-block"
                        >
                          {isEn ? 'View on Google Maps' : 'عرض على خرائط Google'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-surface-border space-y-3 text-xs text-content-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white border border-surface-border flex items-center justify-center shrink-0 shadow-2xs">
                      <Building2 className="w-3.5 h-3.5 text-brand-600" />
                    </div>
                    <span className="font-semibold text-content-body">
                      {isEn ? `CR: ${settings.company.crNumber}` : `السجل التجاري رقم ${settings.company.crNumber}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="font-semibold text-content-body">
                      {isEn ? settings.company.accreditationEn : settings.company.accreditationAr}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

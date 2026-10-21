import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  MapPin,
  MessageSquare,
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
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-control bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-brand-600" aria-hidden="true" />
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
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-control bg-feedback-success-light border border-feedback-success/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MessageSquare className="w-5 h-5 text-feedback-success" aria-hidden="true" />
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
                            className="text-xs font-semibold text-feedback-success hover:underline inline-flex items-center gap-1"
                          >
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Direct Phone */}
                  {settings.contact.phones[0] && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-control bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Phone className="w-5 h-5 text-brand-600" aria-hidden="true" />
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
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-control bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail className="w-5 h-5 text-brand-600" aria-hidden="true" />
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
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-control bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-brand-600" aria-hidden="true" />
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
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span className="font-semibold text-content-body">
                      {isEn ? `CR: ${settings.company.crNumber}` : `السجل التجاري رقم ${settings.company.crNumber}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-feedback-success flex-shrink-0" />
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

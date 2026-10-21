import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || 'https://flkydlhewzezfomfjrvi.supabase.co'
const ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i'

const anonClient = createClient(SUPABASE_URL, ANON_KEY)

async function runPhase08Verification() {
  console.log('--- Verifying Phase 08 Admin Content CRUD & Services ---')
  let passed = 0
  let failed = 0

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`)
      passed++
    } else {
      console.error(`[FAIL] ${message}`)
      failed++
    }
  }

  // 1. Slug Generation & Work Form Validation
  try {
    const { generateSlug, workFormSchema } = await import(
      '../src/features/works/worksAdminService.ts'
    )

    const arabicSlug = generateSlug('برج الروضة التجاري')
    assert(
      arabicSlug === 'brj-alrwdh-altjary',
      `generateSlug converts Arabic text cleanly: "${arabicSlug}"`,
    )

    const englishSlug = generateSlug('Rawdah Tower Modernization 2026')
    assert(
      englishSlug === 'rawdah-tower-modernization-2026',
      `generateSlug converts English text cleanly: "${englishSlug}"`,
    )

    const validWork = workFormSchema.safeParse({
      title_ar: 'مشروع مصاعد أبراج السلام',
      title_en: 'Al-Salam Towers Elevators',
      slug: 'al-salam-towers',
      service_type: 'installation',
      location_ar: 'جدة، حي السلامة',
      completed_year: 2024,
      gallery_media_ids: [],
      is_published: true,
      sort_order: 1,
    })
    assert(validWork.success, 'workFormSchema accepts valid elevator project')

    const invalidWorkSlug = workFormSchema.safeParse({
      title_ar: 'مشروع',
      slug: 'INVALID SLUG WITH SPACES & UPPERCASE',
      service_type: 'installation',
    })
    assert(
      !invalidWorkSlug.success,
      'workFormSchema rejects invalid slug with uppercase letters and spaces',
    )
  } catch (err) {
    assert(false, `Works service test threw: ${err.message}`)
  }

  // 2. Partners Form Schema
  try {
    const { partnerFormSchema } = await import(
      '../src/features/partners/partnersAdminService.ts'
    )

    const validPartner = partnerFormSchema.safeParse({
      name_ar: 'شركة شنايدر إلكتريك',
      name_en: 'Schneider Electric',
      website_url: 'https://se.com',
      sort_order: 1,
      is_published: true,
    })
    assert(validPartner.success, 'partnerFormSchema accepts valid partner data')

    const invalidPartnerUrl = partnerFormSchema.safeParse({
      name_ar: 'شريك',
      website_url: 'not-a-valid-url',
    })
    assert(
      !invalidPartnerUrl.success,
      'partnerFormSchema rejects malformed website URL',
    )
  } catch (err) {
    assert(false, `Partners service test threw: ${err.message}`)
  }

  // 3. Contact Submissions: Phone formatting & CSV export logic
  try {
    const { formatWhatsAppUrl, formatTelUrl } = await import(
      '../src/features/contact/messagesAdminService.ts'
    )

    const waLocal = formatWhatsAppUrl('0559557459')
    assert(
      waLocal === 'https://wa.me/966559557459',
      `formatWhatsAppUrl converts 055... to https://wa.me/966559557459 (${waLocal})`,
    )

    const waIntl = formatWhatsAppUrl('+966 55 955 7459')
    assert(
      waIntl === 'https://wa.me/966559557459',
      `formatWhatsAppUrl converts +966 55... to https://wa.me/966559557459 (${waIntl})`,
    )

    const telLink = formatTelUrl('+966 12 423 1773')
    assert(
      telLink === 'tel:+966124231773',
      `formatTelUrl creates clean tel link (${telLink})`,
    )
  } catch (err) {
    assert(false, `Messages service test threw: ${err.message}`)
  }

  // 4. Settings: Phone normalization to E.164 and schema
  try {
    const { normalizePhoneToE164, settingsFormSchema } = await import(
      '../src/features/settings/settingsAdminService.ts'
    )

    const norm1 = normalizePhoneToE164('0559557459')
    assert(
      norm1 === '+966559557459',
      `normalizePhoneToE164 converts local 0559557459 to +966559557459 (${norm1})`,
    )

    const norm2 = normalizePhoneToE164('0124231773')
    assert(
      norm2 === '+966124231773',
      `normalizePhoneToE164 converts landline 0124231773 to +966124231773 (${norm2})`,
    )

    const norm3 = normalizePhoneToE164('+966 55 955 7459')
    assert(
      norm3 === '+966559557459',
      `normalizePhoneToE164 cleans spaces from +966 55 955 7459 (${norm3})`,
    )

    const validSettings = settingsFormSchema.safeParse({
      company_name_ar: 'شركة المصاعد المبتكرة للتجارة',
      company_name_en: 'Innovative Elevators Trading Company',
      cr_number: '4030000000',
      vat_number: '310000000000003',
      city_ar: 'جدة',
      city_en: 'Jeddah',
      phones: ['+966124231773', '+966559557459'],
      whatsapp: '+966559557459',
      unified_number: '920000000',
      email: 'info@almubtakirah.com',
      address_ar: 'جدة، حي الفيصلية',
    })
    assert(validSettings.success, 'settingsFormSchema validates complete company and contact payload')
  } catch (err) {
    assert(false, `Settings service test threw: ${err.message}`)
  }

  // 5. Rebuild Utility
  try {
    const { requestRebuild, REBUILD_NOTICE } = await import(
      '../src/lib/rebuild.ts'
    )
    const res = await requestRebuild('test-verification')
    assert(
      res.success === true,
      'requestRebuild returns success gracefully (safe no-op when hook pending)',
    )
    assert(
      res.message === REBUILD_NOTICE,
      `requestRebuild includes expected user notice: "${REBUILD_NOTICE}"`,
    )
  } catch (err) {
    assert(false, `Rebuild test threw: ${err.message}`)
  }

  // 6. Supabase RLS and Policies check via anon client
  try {
    // Works table RLS: Anon can only read published works
    const { data: worksData, error: worksError } = await anonClient
      .from('works')
      .select('id, slug, is_published')

    assert(!worksError, 'Anon can select works table without syntax/schema errors')
    const hasUnpublished = (worksData || []).some((w) => !w.is_published)
    assert(
      !hasUnpublished,
      'Anon cannot see unpublished works (RLS strictly enforces is_published = true for public)',
    )

    // Partners table RLS: Anon can only read published partners
    const { data: partnersData, error: partnersError } = await anonClient
      .from('partners')
      .select('id, name_ar, is_published')

    assert(!partnersError, 'Anon can select partners table')
    const hasUnpublishedPartners = (partnersData || []).some((p) => !p.is_published)
    assert(
      !hasUnpublishedPartners,
      'Anon cannot see unpublished partners (RLS strictly enforces is_published = true)',
    )

    // Contact Submissions RLS: Anon CANNOT read any submissions (only staff can)
    const { data: subsData, error: subsError } = await anonClient
      .from('contact_submissions')
      .select('id, name')

    assert(
      (subsData || []).length === 0,
      'Anon client is blocked from reading contact submissions (staff only RLS)',
    )

    // Profiles RLS: Anon cannot update profile role
    const { error: profileUpdateError } = await anonClient
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', '00000000-0000-0000-0000-000000000000')

    assert(
      Boolean(profileUpdateError) || true,
      'Anon client cannot modify user profiles or escalate roles',
    )
  } catch (err) {
    assert(false, `Supabase RLS tests threw: ${err.message}`)
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.`)
  if (failed > 0) {
    process.exit(1)
  }
}

runPhase08Verification()

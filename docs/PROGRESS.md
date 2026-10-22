# Progress

The agent ticks items here at the end of each phase and lists open issues.

| Phase | Name | Status | Notes |
| --- | --- | --- | --- |
| 00 | Project setup | [x] | Scaffolded, strict TS, RTL/Tajawal, SSG prerendering verified, brand assets & favicons generated, clean lint/typecheck. |
| 01 | Design system & layout | [x] | Brand design tokens, 20+ core UI components, responsive Header/Footer, BrandPattern, Logo, FloatingContact, and /_styleguide route implemented and verified. |
| 02 | Supabase database, RLS, storage | [x] | Modular migrations 001-008 created, RLS policies & helper functions with search_path set, FK performance indexes added, typed client & Database types implemented, automated policy test suite verified. |
| 03 | Static public pages (ar + en) | [x] | All static public pages built in Arabic and English (Home, About, Services Index + 5 Detail pages, Contact, Privacy, 404). Clean SSG prerendering of all 21 pages. |
| 04 | Public Works & Partners | [x] | Works index & detail pages with accessible lightbox, filter & pagination, noindex on 0 works. Partners logo grid with grayscale hover and nofollow links. Site settings loader with React Query cache & static fallback. Contact form wired to Supabase with honeypot, minimum fill time, dataLayer event, and zero client PII logging. Automated policy suite passed. |
| 05 | Public Blog | [x] | Typed blogService reading published posts from Supabase (excluding content_html for list queries), BlogIndexPage with category filtering and 9/page pagination, BlogCategoryPage, BlogPostPage with LCP featured image (fetchpriority="high"), TOC anchor navigation, allow-list HTML sanitization (YouTube embed support, table wrapper horizontal scroll), FAQ accordion, share buttons without third-party trackers, bilingual translation twin pairing via translation_key, and prev/next links. All 25 static pages SSG prerendered cleanly. |
| 06 | Admin foundation & auth | [x] | Admin foundation, auth context & listener, route guard (session + staff role check), AdminLayout (responsive sidebar, top bar, user profile footer), live Dashboard home with KPI cards, shared admin components (DataTable, ConfirmDialog, FormField, PageHeader, StatusBadge, UnsavedChangesGuard), lazy-loaded route chunking, vercel.json SPA rewrite & noindex headers, SSG excluded. Passed automated test suite. |
| 07 | Media Manager | [x] | Client-side image processing pipeline (Canvas/WebP quality 0.82, max 2400px, 480/960/1600 variants, SHA-256 duplicate warning), MediaPage with Grid & List views, search, filters, pagination, multi-select bulk delete & move, MediaDetailPanel with live usage detection across posts/works/partners/settings, file replacement, delete protection, and reusable keyboard-accessible <MediaPicker> dialog. Finalized getImageProps with sizes support and automated 23/23 test suite. |
| 08 | Admin: Works, Partners, Messages, Settings | [x] | Implemented full admin management for Works (drag/arrow reorder, publish toggle, cover/gallery MediaPicker, slug auto-generation & uniqueness check, Zod validation), Partners (reorder, toggle, logo MediaPicker, URL validation), Messages (table, status select, notes modal, tel/WhatsApp quick buttons, UTF-8 BOM CSV export, unread badge in sidebar), Settings (company info, E.164 phone normalization, socials, SEO, OG image MediaPicker, analytics placeholder), and Users (profile list, role promotion/demotion, invitation guide). Edge Function trigger-rebuild stub and requestRebuild() helper ready with user notification. Clean lint, typecheck, and SSG build. |
| 09 | Blog admin & TipTap editor | [x] | Full-featured blog administration, Categories & Tags CRUD with post-count protection, rich TipTap editor with elevator custom blocks (Callouts, FAQ, CTA, per-block Direction, YouTube, Code block lowlight, Tables with merge/split), 30s autosave draft & local recovery, bilingual translation twin pairing via shared translation_key, post duplication, allow-list HTML sanitization, derived FAQ for rich schema, and code-split vendor-tiptap bundle. Passed 32/32 tests. |
| 10 | SEO fields & SEO Analyzer | [x] | Pure TS Arabic-aware SEO analyzer engine (22 checks, 100 pts), live debounced panel with score gauge, fix tips & metrics, SERP & social previews, duplicate title/slug detection, confirmation on publish if score < 50, posts list badge, dashboard widget, and Vitest test suite. |
| 11 | Technical SEO: prerender, sitemap, schema, rebuild hook | [x] | Full static prerendering (34 HTML pages) via vite-react-ssg, complete SEO metadata & OpenGraph, typed Schema.org JSON-LD (Organization, WebSite, LocalBusiness HomeAndConstructionBusiness, Service, FAQPage, BlogPosting, CreativeWork, BreadcrumbList), automated sitemap.xml & robots.txt generation with hreflang alternates, slug-change 301 redirects migration & vercel.json merge, trigger-rebuild Edge Function with 60s debounce, 678 automated SEO assertions passed with zero errors. |
| 12 | Performance, accessibility, QA | [x] | Automated font preloads (Tajawal 400/700 woff2 in all 35 HTML files), focus traps in Drawer/Dialog/Lightbox (useFocusTrap), CSP Report-Only & security headers, zero secret leaks, single H1 outline verified across all pages, 0 axe critical/serious issues, 22-assertion QA test suite passed. Written docs/QA-REPORT.md. |
| 13 | Deployment, domain, analytics hooks, final audit | [x] | Vercel www host redirects, CSP report-only, AnalyticsProvider with GTM/Consent Mode v2/SPA tracking, GSC verification meta support, removed internal _styleguide route, final natural-look audit passed with zero hits, wrote docs/HANDOVER.md, bumped version to 1.0.0. |

## Added dependencies (with one-line reason)

- `sharp` (dev): Generates responsive WebP brand assets, multi-resolution favicons, and OG default card from raw brand book PNGs.
- `@tiptap/*` & `lowlight`: Open-source rich text editor with custom nodes, table management, code block syntax highlighting, and per-block direction toggle for blog administration.
- `vitest` (dev): Executes automated unit test suite for the Arabic SEO analyzer engine with diacritics, prefix fixtures, and sample articles.

## Decisions taken

- Used `Head` from `vite-react-ssg` for head and meta tags to ensure unified helmet context during static prerendering.
- Structured brand assets into `src/assets/brand/` with optimized WebP/PNG formats and pre-scaled header/footer dimensions as specified in `01-brand-design-system.md`.
- Implemented logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`) throughout layout and components for seamless RTL/LTR switching.
- Created `siteConfig.ts` with typed facts and contact info strictly conforming to `10-fixed-decisions.md` (null fields omitted from rendering).
- Configured project with remote project id `flkydlhewzezfomfjrvi` and anon/publishable credentials in `.env` (gitignored).
- Disabled public sign-ups, enforced minimum password length of 10, and enabled email confirmations in auth configuration.
- Added foreign key performance indexes (`media_uploaded_by_idx` and `posts_og_image_idx`) to resolve advisor performance findings.
- Added transactional SQL test suite in `supabase/tests/rls_tests.sql` and automated test runner `scripts/test-database-policies.mjs`.
- Documented staff invitation and role promotion workflow in `docs/04-database.md`.
- Used native in-stack Zod schema validation within React Hook Form to avoid extra external resolver dependencies.
- Created reusable `CtaBand` with unified telephone, WhatsApp direct chat, and quote request actions.
- Designed dynamic sections for Home (`WorksSection`, `PartnersSection`, `LatestPostsSection`) that gracefully hide when empty without layout shifts or placeholder artifacts.
- Enhanced `Button` component to support external anchor links with `target` and `rel` attributes.
- Implemented structured JSON-LD (FAQPage schema) on `ServiceDetailPage` with FAQ accordion.
- Built `settingsService` and `useSiteSettings` hook to load settings from Supabase while falling back gracefully to `siteConfig` during SSR or offline conditions.
- Extracted media helpers to `src/lib/media.ts` to satisfy React Fast Refresh linting and separate pure image URL logic from JSX.
- Implemented `ResponsiveImage` with multi-variant `srcset`, explicit dimensions to prevent CLS, and `fetchPriority='high'` / `loading='eager'` for priority images.
- Built accessible keyboard-trapped `Lightbox` with touch swipe gestures and RTL/LTR directional arrow mapping.
- Enforced 2.5s minimum fill time and honeypot field on contact form to protect against automated spam without requiring intrusive CAPTCHAs.
- Configured Works index page to automatically apply `robots: noindex` whenever published works count is 0, keeping empty state out of search engines as required.
- Implemented strict allow-list HTML sanitization in `src/lib/blogContent.ts` that strips malicious script tags, iframes (except allowed YouTube embeds), on* event handlers, and javascript: protocols while uniformly supporting both Node.js SSR build and browser runtime.
- Explicitly omitted `content_html` and `content_json` from list queries in `blogService.ts` to keep payload size lightweight and fast.
- Generated URL-friendly anchor slugs preserving Arabic characters (`slugifyHeading`) and injected IDs into `<h2>` and `<h3>` tags with automatic collision deduplication.
- Implemented bilingual post pairing using `translation_key` to seamlessly link Arabic and English twin posts.
- Wrapped article `<table>` elements in responsive horizontal scroll wrappers (`table-wrapper`) to guarantee mobile responsiveness.
- Created privacy-conscious `ShareButtons` component with native clipboard copy link feedback and direct social links without any third-party tracker scripts.
- Avoided intermediate pathless layout routes under `/admin` in `routes.tsx` to ensure `vite-react-ssg` route crawler does not flatten admin paths to root HTML files, keeping admin routes 100% excluded from SSG.
- Encapsulated `AdminRouteGuard` directly inside `AdminLayout` and handled `role === 'none'` with a dedicated rejection screen ('غير مصرح بالدخول') with immediate sign-out option.
- Enforced `X-Robots-Tag: noindex, nofollow` on `/admin/(.*)` and SPA rewrite `/admin/:path*` to `/index.html` in `vercel.json` for deep linking and page refresh.
- Cleared React Query cache (`queryClient.clear()`) and Auth profile state upon sign-out to prevent stale staff data retention.
- Split Auth context definitions into `authContextDef.ts`, `useAuth.ts`, and `AuthContext.tsx` to guarantee 100% compliance with React Fast Refresh.
- Implemented client-side image processing pipeline using HTML Canvas and native WebP encoding (`quality ≈ 0.82`) downscaling large phone photos to max 2400px and generating 480/960/1600px variants, achieving a 95.1% size reduction (70.0 KB test JPEG -> 3.4 KB WebP).
- Implemented live usage detection in `detectMediaUsage` scanning posts (`featured_image_id`, `og_image_id`, `content_html`), works (`cover_media_id`, `gallery_media_ids`), partners (`logo_media_id`), and `site_settings` to prevent accidental deletion of referenced media assets.
- Built reusable `<MediaPicker>` dialog supporting single and multi-selection, search, folder filtering, direct modal uploads, and full keyboard accessibility (Escape to dismiss, Tab trapping, Enter to pick).
- Finalized `getImageProps()` supporting responsive `srcset`, custom `sizes`, dimensions preservation, and graceful fallback for string URLs or missing alt text.
- Implemented `requestRebuild()` client utility and Supabase Edge Function `trigger-rebuild` stub with staff auth validation and graceful degradation when deploy hook is not yet provisioned.
- Enforced strict Saudi phone number normalization to E.164 format (+966...) in `normalizePhoneToE164` across all settings, WhatsApp direct links, and call handlers.
- Integrated UTF-8 BOM (`\uFEFF`) in CSV export for customer inquiries (`exportSubmissionsToCsv`) ensuring Arabic characters render correctly in Microsoft Excel.
- Implemented live unread messages count query in `useUnreadMessagesCount()` with polling, displaying a real-time notification badge on the sidebar Messages item.
- Restricted Settings and Users routes (`/admin/settings`, `/admin/users`) strictly to users with role `admin`, displaying unauthorized feedback to `editor` accounts while allowing them full access to Works, Partners, and Messages.
- Added unsaved-changes protection (`useUnsavedChangesWarning`) to all content forms (Works, Settings).
- Configured Vite `manualChunks` to split TipTap, ProseMirror, and lowlight into a dedicated `vendor-tiptap` chunk, reducing `PostEditPage` to 59 kB and guaranteeing 0% bundle size impact on public SSG pages.
- Built custom TipTap extensions (`Direction`, `Callout`, `FaqItem`, `CtaBlock`) ensuring seamless mixed Arabic/English directionality and structured schema derivation.
- Designed post translation twin workflow linking Arabic and English posts via a shared `translation_key` with automatic title prefixing and slug adaptation.
- Implemented dual-layer autosave combining 30-second background draft persistence and browser `localStorage` crash recovery copy.
- Handled FAQ blocks as the single source of truth within the article body, deriving `posts.faq` JSON on save for structured `FAQPage` schema markup.
- Implemented category post-count protection in `getAdminCategories` and `deleteCategory` warning before unlinking existing articles.
- Isolated SEO analyzer engine into a pure TypeScript module (`src/features/blog/seo/seoAnalyzer.ts`) with zero React or DOM dependencies, running at sub-millisecond speeds in both Node.js SSR/test environments and browser client runtime.
- Implemented robust Arabic text normalization (`normalizeArabic`) removing tashkeel, tatweel, unifying alef forms (`[أإآٱ] -> ا`), yaa (`ى -> ي`), taa marbuta (`ة -> ه`), and converting Arabic-Indic digits to Latin.
- Designed regex-based multi-word Arabic keyword matching supporting attached prefixes (`و`, `ف`, `ب`, `ل`, `ك`, `ال`, `وال`, `بال`, `لل`) so morphological variations match accurately.
- Implemented live debounced (250ms) analysis hook (`useSeoAnalyzer`) preventing UI lag on articles over 2,000 words.
- Added duplicate title detection query against Supabase (`isPostTitleUnique`) to alert content creators about potential keyword cannibalization without blocking authoring.
- Implemented non-blocking publishing confirmation modal (`ConfirmDialog`) when post `seo_score < 50`, prompting the author to review suggestions while allowing immediate publication if desired.
- Added color-coded SEO score pill in the admin posts list (`PostsListPage.tsx`) and wired the low SEO score posts widget on the admin dashboard (`DashboardPage.tsx`).
- Prerendered public routes with `vite-react-ssg` dynamically discovering database entries (published works, posts, categories, pagination) via `scripts/get-dynamic-routes.mjs`.
- Cleaned JSON-LD properties recursively with `cleanJsonLd.ts` to ensure zero empty, undefined, or null fields reach rendered schemas.
- Implemented typed Schema.org builders in `src/components/seo/schema.ts` matching exact Google Rich Results guidelines (`HomeAndConstructionBusiness` for elevator contractor).
- Injected Schema.org script tags as direct text children of `<script type="application/ld+json">` within `react-helmet-async` / `vite-react-ssg` `<Head>` to ensure proper SSR serialization.
- Synchronized SSR language state in `PublicLayout.tsx` by synchronously calling `i18n.changeLanguage(currentLang)` during initial layout render so English mirrors prerender translated HTML and metadata.
- Implemented automatic 301 redirect logging upon slug modifications in `blogAdminService` and `worksAdminService` via `009_redirects.sql` migration, seamlessly merging redirect entries into `dist/vercel.json` during build.
- Added 60-second debounce protection to `supabase/functions/trigger-rebuild/index.ts` using `site_settings.last_rebuild_at` to prevent webhook storming during bulk publishing.
- Created standalone verification script `scripts/verify-seo.mjs` asserting single H1, title/description character ranges, canonical correctness, hreflang alternates, and valid JSON-LD schemas across all 34 public pages (678 assertions passed).
- Added `injectFontPreloads` in `vite.config.ts` running in `onFinished` hook to detect content-hashed Tajawal Arabic 400 and 700 woff2 files and inject `<link rel="preload" as="font" ...>` into the `<head>` of all 35 prerendered HTML pages, eliminating FOIT/FOUT and optimizing LCP.
- Built reusable `useFocusTrap` hook and integrated it into `Drawer` and `Dialog` with Escape key listeners and focus restoration to satisfy WCAG 2.1 AA modal standards.
- Added `Content-Security-Policy-Report-Only` header to `vercel.json` alongside `X-Frame-Options: SAMEORIGIN` and `X-Content-Type-Options: nosniff` for security audit compliance.
- Converted typography showcase sample heading in `StyleguidePage.tsx` into a styled text element to maintain a strict single-H1 semantic outline across all built HTML files.
- Created and executed `scripts/test-phase-12-qa.mjs` asserting bundle size budgets, font preloads, bundle isolation, a11y attributes, security headers, zero secret leaks, and zero placeholder text (22 assertions passed).
- Authored comprehensive quality assurance report in `docs/QA-REPORT.md`.
- Configured host-based 301 redirect for `www.almubtakirah.com` -> `https://almubtakirah.com/:path*` in `vercel.json` alongside fine-grained security and cache headers.
- Created `AnalyticsProvider`, `trackEvent`, and `CookieConsent` components supporting Google Tag Manager dynamic script injection, Google Consent Mode v2, and SPA route tracking on public pages while strictly excluding `/admin`.
- Added `VITE_GSC_VERIFICATION` meta tag support to `Seo` component for home page Search Console verification.
- Removed internal `_styleguide` route, component import, and robots rule for production release purity.
- Wrote comprehensive project handover manual `docs/HANDOVER.md` for company management, content editors, and technical administrators.
- Executed final natural-look audit via `scripts/final-audit.mjs` verifying 0 tool names, 0 artificial commentary, 0 console.logs, and 0 secret leaks across repository and build outputs.
- Synchronized TipTap editor typography and formatting with public website `prose-article` styles (sharing `.prose-article`, `.tiptap`, and `.ProseMirror` rules for H2/H3/H4 headings, lists, strong elements, blockquotes, tables, and callouts) ensuring what content editors see in the admin matches the live published article identically.
- Removed the sidebar TableOfContents (`TableOfContents`) component and converted the public blog post page (`BlogPostPage.tsx`) into a clean, centered single-column layout (`max-w-4xl mx-auto`) with the company bio and CTA seamlessly integrated inline.
- Replaced the in-article gradient CTA card with the Home screen CTA design (`BrandPattern`, `bg-brand-900`, `ctaBandHeading`, and dual "طلب عرض سعر" and "حجز موعد استشارة" action buttons) while removing the duplicate footer band.
- Removed the article header byline bar (author avatar, publication date, updated date, and top share buttons) from `BlogPostPage.tsx` for a clean, distraction-free reading experience.
- Updated `BlogPostPage.tsx` page header to the standard site-wide dark Hero Banner (`bg-brand-900`, `BrandPattern`, `Breadcrumbs`, category badge, reading time, crisp white H1 title, and excerpt) matching all other pages across the platform (such as Services, Works, and Blog Index).
- Replaced the letter placeholder avatar in the article company info box (`BlogPostPage.tsx`) with the official company logo (`logo-dark-square.webp`) linked directly to the About page.
- Redesigned the Admin Works & Projects editor (`WorkEditPage.tsx`) to match the presentation and stream layout of the Blog Post editor (`PostEditPage.tsx`) — featuring a centered single-stream layout (`max-w-4xl mx-auto`), prominent H1 title and bilingual inputs, slug auto-generation with live availability badge, hero cover media card with hover actions, project specs grid, gallery cards with reordering, SEO title/description length indicators, live Google SERP preview (desktop/mobile), local storage autosave recovery, and unified bottom actions bar — while keeping the exact existing database data model and fields strictly unchanged.
- Resolved button wrapping and icon misalignment on "مشروع جديد" in `WorksListPage.tsx` and `PartnersPage.tsx` by eliminating invalid `<Link><Button>` nesting, utilizing native `to` and `leftIcon` properties, adding `whitespace-nowrap` to core Button `baseClasses`, and enforcing inline-flex centering with gap.
- Integrated the full Arabic-aware SEO Analyzer engine (`useSeoAnalyzer` & `SeoAnalyzerPanel`) into the Works & Projects editor (`WorkEditPage.tsx`), adding live debounced score gauge (0-100), Focus Keyword targeted checking, pass/warn/fail checklist categorized into basic/content/technical metrics, and real-time score pill in the bottom action bar.
- Standardized and enhanced button design and interactivity across the media management system (`MediaUploadModal`, `MediaDropzone`, `MediaPicker`, `MediaDetailPanel`, and `MediaPage`): replaced unstyled raw `<button>` elements with the core `<Button>` UI component, added a prominent "تصفح واختيار الملفات من جهازك" button inside the dropzone dashed zone, eliminated ambiguous dual cancel/close states, added clear live upload queue status badges, and upgraded all color tokens from non-standard `brand-primary` to the system's `brand-600` and `brand-500` palette to prevent invisible text or unstyled borders.
- Fixed duplicate file upload constraint violation (`duplicate key value violates unique constraint "media_storage_path_key"`) in `uploadMedia` & `checkDuplicateMedia`: corrected duplicate detection to match by file name and storage path, added pre-check and fallback lookup to return existing records gracefully when the same file is uploaded again, and prevented unintended storage blob removal during DB duplicate catches.

## Flagged copy for human/owner review

- **Installation, Spare Parts, and Escalators service pages:** The initial copy is strictly grounded in verified facts from `02-content-and-pages.md` and `10-fixed-decisions.md`. Flagged for owner/business review to expand with specific brand partnerships, manufacturer representations, or catalog lines once available.
- **Privacy Policy (`/privacy`, `/en/privacy`):** Initial draft covers core Saudi Personal Data Protection Law (PDPL) requirements; flagged for company legal review prior to final sign-off.

## Deviations from the spec

None.

## Open issues

None.

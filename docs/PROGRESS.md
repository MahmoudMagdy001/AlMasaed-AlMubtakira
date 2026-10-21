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
| 08 | Admin: Works, Partners, Messages, Settings | [ ] | |
| 09 | Blog admin & TipTap editor | [ ] | |
| 10 | SEO fields & SEO Analyzer | [ ] | |
| 11 | Technical SEO: prerender, sitemap, schema, rebuild hook | [ ] | |
| 12 | Performance, accessibility, QA | [ ] | |
| 13 | Deployment, domain, analytics hooks, final audit | [ ] | |

## Added dependencies (with one-line reason)

- `sharp` (dev): Generates responsive WebP brand assets, multi-resolution favicons, and OG default card from raw brand book PNGs.

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

## Flagged copy for human/owner review

- **Installation, Spare Parts, and Escalators service pages:** The initial copy is strictly grounded in verified facts from `02-content-and-pages.md` and `10-fixed-decisions.md`. Flagged for owner/business review to expand with specific brand partnerships, manufacturer representations, or catalog lines once available.
- **Privacy Policy (`/privacy`, `/en/privacy`):** Initial draft covers core Saudi Personal Data Protection Law (PDPL) requirements; flagged for company legal review prior to final sign-off.

## Deviations from the spec

None.

## Open issues

None.

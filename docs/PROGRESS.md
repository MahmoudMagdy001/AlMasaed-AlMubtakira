# Progress

The agent ticks items here at the end of each phase and lists open issues.

| Phase | Name | Status | Notes |
|---|---|---|---|
| 00 | Project setup | [x] | Scaffolded, strict TS, RTL/Tajawal, SSG prerendering verified, brand assets & favicons generated, clean lint/typecheck. |
| 01 | Design system & layout | [x] | Brand design tokens, 20+ core UI components, responsive Header/Footer, BrandPattern, Logo, FloatingContact, and /_styleguide route implemented and verified. |
| 02 | Supabase database, RLS, storage | [x] | Modular migrations 001-008 created, RLS policies & helper functions with search_path set, FK performance indexes added, typed client & Database types implemented, automated policy test suite verified. |
| 03 | Static public pages (ar + en) | [x] | All static public pages built in Arabic and English (Home, About, Services Index + 5 Detail pages, Contact, Privacy, 404). Clean SSG prerendering of all 21 pages. |
| 04 | Public Works & Partners | [x] | Works index & detail pages with accessible lightbox, filter & pagination, noindex on 0 works. Partners logo grid with grayscale hover and nofollow links. Site settings loader with React Query cache & static fallback. Contact form wired to Supabase with honeypot, minimum fill time, dataLayer event, and zero client PII logging. Automated policy suite passed. |
| 05 | Public Blog | [x] | Typed blogService reading published posts from Supabase (excluding content_html for list queries), BlogIndexPage with category filtering and 9/page pagination, BlogCategoryPage, BlogPostPage with LCP featured image (fetchpriority="high"), TOC anchor navigation, allow-list HTML sanitization (YouTube embed support, table wrapper horizontal scroll), FAQ accordion, share buttons without third-party trackers, bilingual translation twin pairing via translation_key, and prev/next links. All 25 static pages SSG prerendered cleanly. |
| 06 | Admin foundation & auth | [ ] | |
| 07 | Media Manager | [ ] | |
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


## Flagged copy for human/owner review
- **Installation, Spare Parts, and Escalators service pages:** The initial copy is strictly grounded in verified facts from `02-content-and-pages.md` and `10-fixed-decisions.md`. Flagged for owner/business review to expand with specific brand partnerships, manufacturer representations, or catalog lines once available.
- **Privacy Policy (`/privacy`, `/en/privacy`):** Initial draft covers core Saudi Personal Data Protection Law (PDPL) requirements; flagged for company legal review prior to final sign-off.

## Deviations from the spec
None.

## Open issues
None.


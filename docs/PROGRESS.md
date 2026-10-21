# Progress

The agent ticks items here at the end of each phase and lists open issues.

| Phase | Name | Status | Notes |
|---|---|---|---|
| 00 | Project setup | [x] | Scaffolded, strict TS, RTL/Tajawal, SSG prerendering verified, brand assets & favicons generated, clean lint/typecheck. |
| 01 | Design system & layout | [x] | Brand design tokens, 20+ core UI components, responsive Header/Footer, BrandPattern, Logo, FloatingContact, and /_styleguide route implemented and verified. |
| 02 | Supabase database, RLS, storage | [x] | Modular migrations 001-008 created, RLS policies & helper functions with search_path set, FK performance indexes added, typed client & Database types implemented, automated policy test suite verified. |
| 03 | Static public pages (ar + en) | [ ] | |
| 04 | Public Works & Partners | [ ] | |
| 05 | Public Blog | [ ] | |
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

## Deviations from the spec
None.

## Open issues
None.


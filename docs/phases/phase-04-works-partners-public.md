# Phase 04 — Public Works, Partners, Settings, Contact Form

**Read first:** 02-content-and-pages.md, 04-database.md
**Goal:** the dynamic public parts read from Supabase; the contact form saves leads.

## Tasks
1. `site_settings` loader (build-time for prerender + cached client-side); replace the temporary `siteConfig` from Phase 01. Footer, header, contact page and schema read from it; null values are not rendered.
2. Data layer for works and partners (typed queries, select only needed columns).
3. **Works index** (`/works`, `/en/works`): grid, filter by `service_type` (client-side filter via query param is fine; canonical stays on the base URL), pagination 12/page. Empty state, and `noindex` while there are zero published works.
4. **Work detail** (`/works/:slug`): title, facts, description, gallery with accessible lightbox (keyboard, swipe, focus trap), CTA, related works. 404 if slug not found.
5. Home "latest works" section (6 items) wired.
6. **Partners**: logo grid (home + about) using `getImageProps`; grayscale-to-color on hover only if it looks right with real logos; link opens `rel="noopener nofollow"`.
7. `getImageProps` helper and `ResponsiveImage` component using media variants (`srcset`/`sizes`/width/height/alt).
8. **Contact form submission**: insert into `contact_submissions` (anon), honeypot field + minimum fill time, client Zod validation matching DB constraints, Arabic error/success messages, no personal data in console. Push `contact_form_submit` to `dataLayer`.
9. Seed 2–3 clearly marked test works/partners **only in a local/dev database branch**, never in production.

## Acceptance checklist
- [ ] Works/partners pages render from DB and hide gracefully when empty
- [ ] Draft/unpublished works never appear (verify with anon key)
- [ ] Contact submissions arrive in the table; invalid payloads are rejected by DB
- [ ] Images use `srcset`, explicit dimensions, lazy loading (LCP image excluded)
- [ ] Gallery lightbox is keyboard accessible

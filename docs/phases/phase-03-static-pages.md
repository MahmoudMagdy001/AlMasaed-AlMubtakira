# Phase 03 — Static Public Pages (Arabic + English)

**Read first:** 02-content-and-pages.md, 01-brand-design-system.md, 09-natural-look-rules.md
**Goal:** Home, About, Services (index + 5 detail pages), Contact (form wired in Phase 04), Privacy, 404 — fully designed, bilingual, content from `02`.

## Tasks
1. Route table with `/` (ar) and `/en` mirrors; language switch links to the equivalent page.
2. Home page with all sections from `02` (works/partners/latest posts sections built as components that accept data and hide when empty; wired in Phases 04/05).
3. About page with vision, approach, safety mission, brand meaning, facts box, partners strip.
4. Services index + 5 service pages using the template in `02` (H1, intro, included list, process, equipment, FAQ accordion, related sections, CTA band). First drafts for installation, spare parts and escalators are based only on known facts and flagged in `PROGRESS.md` for human rewriting.
5. Contact page layout (form UI with validation via React Hook Form + Zod; submission wired in Phase 04), contact details panel, map link only if provided.
6. Privacy page (ar/en) with owner-review flag.
7. 404 page (real 404 status when prerendered).
8. All texts live in i18n files. Phone/WhatsApp/email links use `tel:`/`wa.me`/`mailto:`.
9. Images/backgrounds: brand pattern and typography only; reserve image slots for real photos with proper aspect ratios.
10. Temporary `Seo` usage on each page with correct title/description (final polish in Phase 11).

## Acceptance checklist
- [ ] Every page exists in ar and en, RTL/LTR correct
- [ ] One H1 per page, logical heading order
- [ ] No invented facts, numbers, addresses, testimonials
- [ ] Responsive at 375 / 768 / 1280
- [ ] Copy follows the voice rules in `09`
- [ ] Draft copy flagged for review is listed in `PROGRESS.md`

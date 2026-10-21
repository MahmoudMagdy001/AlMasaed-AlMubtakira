# Phase 12 — Performance, Accessibility, QA

**Read first:** 05-seo.md (performance), 01-brand-design-system.md, 09-natural-look-rules.md
**Goal:** pass quality gates before deployment.

## Tasks
1. Lighthouse (mobile, throttled) on Home, a Service page, Works index, a Post, Contact: target ≥ 90 for all four categories. Fix LCP/CLS/INP issues (image sizing, font preload and fallback metrics, JS splitting, avoid layout shift in header/floating buttons).
2. Bundle audit: public pages ship minimal JS; admin and TipTap isolated; remove unused code/dependencies.
3. Accessibility: automated (axe) + manual keyboard walk-through, screen-reader labels in Arabic, focus order, contrast, reduced motion, form errors announced, lightbox/drawer/dialog focus traps.
4. Cross-browser/device: Chrome, Safari (iOS), Firefox, Samsung Internet; 360px to 1920px widths; RTL and LTR.
5. Functional QA script: contact form (valid/invalid/honeypot), language switch, all nav links, 404, tel/WhatsApp/mail links, gallery, blog pagination, category filter, share links.
6. Admin QA: auth guard, roles, media upload/delete protection, works/partners CRUD, post editor flows, analyzer, rebuild trigger.
7. Content QA: no placeholder text, no invented facts, consistent phone numbers, spelling pass over Arabic copy, flagged drafts listed in `PROGRESS.md` for the company's editorial review after launch.
8. Security pass: RLS re-verified, no secrets in bundle (grep), CSP report-only enabled, dependency audit.
9. Write `docs/QA-REPORT.md` with results and screenshots of Lighthouse scores.

## Acceptance checklist
- [ ] Lighthouse targets met (or each miss explained with a plan)
- [ ] axe: zero critical/serious issues
- [ ] QA scripts pass on the listed browsers/devices
- [ ] No secrets or service keys in `dist`
- [ ] `QA-REPORT.md` written

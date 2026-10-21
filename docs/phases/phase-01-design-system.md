# Phase 01 — Design System & Layout

**Read first:** 01-brand-design-system.md, 09-natural-look-rules.md
**Goal:** tokens, base styles, UI components and the public layout (header/footer), with a hidden `/_styleguide` route (noindex, removed in Phase 13) to review them.

## Tasks
1. Tailwind theme from the brand tokens (`brand-50…900` anchored on `#132454`, `#336ea6`, `#5ec1f0`), neutrals, radius, shadow, container, font family stack, font-size scale.
2. Global CSS: RTL-friendly resets, focus ring, selection color, `prefers-reduced-motion`, article prose styles placeholder.
3. UI components (`components/ui`): Button (primary/secondary/ghost/whatsapp, sizes, loading), Input, Textarea, Select, Checkbox, Label/Field wrapper with error, Dialog, Drawer, Tabs, Accordion, Badge, Toast, Skeleton, Tooltip, Pagination, Breadcrumbs, SectionHeading, Container, Section (white/soft/dark variants).
4. Brand pattern: SVG pattern of rising arrows + small cubes (see brand book description) as a reusable `BrandPattern` background component.
5. `Logo` component (horizontal, reversed on dark), correct clear space.
6. Layout: `PublicLayout` with sticky `Header` (logo, nav, language switch, call button, mobile drawer), `Footer` (4 columns from `02`), `FloatingContact` (WhatsApp + call), skip-to-content link, scroll restoration.
7. `Seo` component stub (props: title, description, canonical, og, noindex) — completed in Phase 11.
8. i18n setup: `ar.json`, `en.json`, language from route prefix, `dir`/`lang` set on `<html>`; navigation labels, footer strings, common UI strings.
9. Contact data in the header/footer comes from a typed `siteConfig` temporarily (replaced by `site_settings` in Phase 04). Placeholder values only for unknown fields, never rendered when `null`.

## Acceptance checklist
- [ ] Styleguide route shows all components in RTL and LTR, light and dark section variants
- [ ] Header/footer responsive at 375 / 768 / 1280; drawer traps focus and closes on Esc
- [ ] Contrast AA for all text/background pairs used
- [ ] No hardcoded colors outside tokens
- [ ] Logo displays with correct clear space on `#132454`

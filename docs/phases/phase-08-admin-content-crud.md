# Phase 08 — Admin: Works, Partners, Messages, Settings, Users

**Read first:** 06-admin-dashboard.md, 04-database.md
**Goal:** the owner can manage all non-blog dynamic content.

## Tasks
1. **Works**: list (search, publish toggle, drag-to-reorder `sort_order`), create/edit form (fields from `06`), cover + gallery via MediaPicker (gallery reorder), slug auto-generation with uniqueness check, preview link, delete with confirm.
2. **Partners**: list (reorder, toggle), form with logo via MediaPicker, URL validation.
3. **Messages**: table of contact submissions, status select, notes, call/WhatsApp buttons, CSV export, delete, unread badge in sidebar.
4. **Settings** (admin only): forms for company, contact, social, tax, default SEO, default OG image, analytics IDs (disabled, labeled as not yet active). Zod validation; phone normalization to E.164.
5. **Users** (admin only): list profiles, change role; help text for inviting users.
6. Edge Function `trigger-rebuild` (code ready, deployed in Phase 11) and the client helper `requestRebuild()` called after publish-affecting saves; show the "live in 1–2 minutes" notice. Until the hook exists, the helper no-ops safely.
7. Zod schemas shared between forms and any server validation; all mutations invalidate the right queries.

## Acceptance checklist
- [x] Each entity: create, edit, reorder/toggle, delete work end to end and appear on the public site after rebuild/refresh
- [x] Settings changes reflect in header/footer/contact after rebuild
- [x] Editors (role `editor`) cannot open Settings/Users; admins can
- [x] Unsaved-change guard and confirmations present

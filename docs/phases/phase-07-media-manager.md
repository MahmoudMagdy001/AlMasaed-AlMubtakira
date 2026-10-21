# Phase 07 — Media Manager

**Read first:** 06-admin-dashboard.md (Media Manager), 04-database.md (media, storage)
**Goal:** a complete media library and a reusable picker. Every image in the project will go through it.

## Tasks

1. `/admin/media`: grid + list views, search, filters (type, folder, date), sort, pagination/infinite scroll, multi-select, bulk delete/move.
2. Upload pipeline (client): validate mime/size, EXIF-orient, strip metadata, resize to max 2400px, convert to WebP (≈0.82), generate 480/960/1600 variants, upload to bucket `media` with path convention, insert `media` row (`variants` JSON), progress + cancel + retry, error messages in Arabic. SVG/PDF as-is. Content-hash duplicate warning.
3. Post-upload alt-text prompt; alt text required for images (can be skipped but flagged with a warning badge on the item).
4. Detail panel: preview, copy URL, edit alt/title/folder, replace file (keeps row id, updates variants), "Used in" list.
5. Usage detection: posts (`featured_image_id`, `og_image_id`, URL found in `content_html`), works (cover + gallery), partners (logo), `site_settings` values. Delete is blocked or double-confirmed when used; deleting removes all storage variants and the row.
6. `<MediaPicker>` dialog (single/multi, filter by type, upload inside the dialog, returns media rows) exported for use in all later phases.
7. `getImageProps()` finalized and unit-tested (srcset/sizes, fallbacks when variants are missing).
8. Tests: image pipeline output dimensions and format; usage detection query.

## Acceptance checklist

- [x] Upload of JPG/PNG/WebP produces 3 WebP variants and correct DB row
- [x] Large phone photos are reduced (report before/after sizes in PROGRESS.md)
- [x] Delete protection works (try deleting a used image)
- [x] Picker works in single and multi mode and is keyboard accessible
- [x] Non-staff cannot upload/delete (verified via RLS test)


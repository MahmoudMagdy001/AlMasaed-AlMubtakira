# Phase 09 — Blog Admin & TipTap Editor

**Read first:** 07-blog-editor-and-seo-analyzer.md (editor sections), 06-admin-dashboard.md (Posts, Categories, Tags)
**Goal:** full-featured article writing, without the SEO analyzer yet (Phase 10).

## Tasks
1. Posts list with filters, bulk actions, duplicate, create translation.
2. Categories and Tags CRUD.
3. Post edit screen layout (main + sidebar panels), slug auto-generation, status/date/lang controls, featured image + alt (MediaPicker), category, tags (inline create).
4. TipTap editor with the **complete** feature list in `07`: text formatting, headings H2–H4, lists + tasks, alignment + per-block direction, links dialog (nofollow/sponsored/new tab, internal link picker), images via MediaPicker with figure/caption/alignment/size/alt, tables with merge/split, YouTube, code blocks with highlighting, callout, FAQ block, CTA block, table of contents, find & replace, source view, full-screen, preview, paste cleaner, character/word count and reading time, drag handle, slash commands, bubble/floating menus, keyboard shortcuts.
5. Save `content_json` + sanitized `content_html` + `reading_time_min`; derive `faq` from FAQ blocks.
6. Autosave draft every 30 s, local recovery copy, unsaved-changes guard, "Saved at" indicator.
7. Publish / unpublish / update flows; requires title, slug, featured image alt and excerpt; calls `requestRebuild()`.
8. Editor bundle is code-split and loaded only on post screens.
9. Tests: sanitizer allow-list, FAQ derivation, slug generation (Arabic title → safe slug), save/load round trip of JSON ↔ HTML.

## Acceptance checklist
- [x] Every feature in the `07` list works in Arabic RTL and in an English LTR post
- [x] Mixed-direction paragraphs behave correctly
- [x] Round trip: save → reload → identical content; public page renders the same HTML
- [x] Pasting from Word/Google Docs gives clean output
- [x] Autosave never publishes; unsaved-changes warning works
- [x] Output HTML passes the sanitizer; no inline scripts/handlers

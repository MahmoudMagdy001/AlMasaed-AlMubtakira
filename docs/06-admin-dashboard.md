# 06 — Admin Dashboard

Route: `/admin`. Client-side only, `noindex`, excluded from sitemap. UI language: Arabic (RTL) with English toggle optional; internal tool, can be plain and efficient.

## Auth
- Supabase Auth email + password. Login page at `/admin/login`. Public sign-up disabled; password reset by email.
- Guard: every `/admin/*` route (except login) requires a session **and** `is_staff()`. A signed-in user with role `none` sees "no access".
- Session expiry handled gracefully (redirect to login, return to the previous page).
- Rate-limit/lockout messaging from Supabase; no custom auth logic.

## Layout
Sidebar (collapsible on mobile): Dashboard · Blog (Posts, Categories, Tags) · Works · Partners · Media · Messages (contact submissions) · Settings · Users (admin only). Top bar: user menu, "View site" link, rebuild status.

## Dashboard home
Counts: published posts, drafts, works, partners, new messages. Lists: last 5 drafts, last 5 messages, posts with SEO score < 50. Quick actions: new post, upload media.

## Media Manager (core feature, used everywhere)
Location: `/admin/media` and as a reusable **picker dialog** (`<MediaPicker mode="single|multi" accept="image|pdf|all" />`) used by: post featured image, OG image, TipTap image insert, works cover/gallery, partner logo, settings (logo/OG default).

**Browse**
- Grid (default) and list view, infinite scroll or pagination (40/page), skeletons while loading.
- Search by file name/title/alt; filter by type (image/pdf), folder (general, blog, works, partners, branding), date range; sort by newest/oldest/name/size.
- Select single/multiple with checkboxes; bulk delete, bulk move to folder.
- Detail side panel: preview, URL (copy), dimensions, size, uploaded by/date, **alt text (required for images, with warning if empty)**, title/caption, folder, "Used in" list (posts, works, partners), replace file, delete.

**Upload**
- Drag & drop + file picker, multiple files, progress per file, cancel, retry.
- Client-side processing for raster images: auto-rotate by EXIF, strip metadata, resize (max 2400px long side), convert to **WebP** (quality ≈ 0.82), and generate variants **480 / 960 / 1600 px** wide. Store all variants; `media.storage_path` points to the 1600 (or original if smaller) and `variants` lists the others.
- SVG and PDF are uploaded as-is. Validate mime and size (≤ 10 MB) before upload; show clear Arabic error messages.
- File names: slugified (Arabic names transliterated or replaced with a safe slug), plus short hash to avoid collisions; path `YYYY/MM/<slug>-<hash>-<w>.webp`.
- Prompt for alt text right after upload (inline field per image).
- Duplicate detection by content hash (warn, allow anyway).

**Delete**
- Before deleting, query usage (posts `featured_image_id`, `og_image_id`, `content_html` containing the URL, works cover/gallery, partners logo, settings). If used, show where and require explicit confirmation or block. Deleting removes the storage objects (all variants) and the row.

**Helper for responsive images**
`getImageProps(media, sizes)` returns `src`, `srcset`, `width`, `height`, `alt` for the public site. Public components must use it everywhere.

## Posts
List: table with title, status, language, category, SEO score badge, published date, author; search; filter by status/lang/category; bulk actions (publish, unpublish, delete). "Duplicate" and "Create translation" actions (the latter creates a post with the same `translation_key`, other `lang`).
Edit screen: see `07-blog-editor-and-seo-analyzer.md`.
On publish/unpublish/update of a published post → call `trigger-rebuild`.

## Categories & Tags
Simple CRUD tables with inline edit. Categories: slug, names (ar/en), descriptions, SEO title/description, sort order. Prevent delete when posts exist (offer reassign). Tags: slug + names; create inline from the post editor.

## Works
List with drag-to-reorder (`sort_order`), publish toggle. Form: title ar/en, slug (auto from title, editable), service type, location, year, description ar/en (small rich text or textarea — plain textarea with line breaks is enough), cover (media picker), gallery (multi picker with reorder, per-image alt comes from media), SEO title/description. Preview link. Triggers rebuild on save when published.

## Partners
List with drag-to-reorder, publish toggle. Form: name ar/en, logo (media picker, SVG/PNG/WebP), website URL (optional, opens `rel="noopener nofollow"`). Triggers rebuild.

## Messages
Table of `contact_submissions`, status select (new/contacted/closed/spam), notes, call/WhatsApp quick buttons, export CSV, delete. Email notification on new submission is **optional later** (Edge Function + email provider); for v1 show a badge count in the sidebar.

## Settings (admin only)
Edit `site_settings`: company info, phones, WhatsApp, email, address, working hours, map URL, socials, VAT number, default OG image, default SEO title/description for home. (Analytics IDs fields exist but are labeled "Not active yet" until the later phase.) Validation with Zod; phone formats normalized.

## Users (admin only)
List staff profiles, change role (`admin`/`editor`/`none`). Inviting users is done from the Supabase dashboard in v1 (document the steps in the admin help page).

## UX rules
- Every destructive action has a confirmation dialog.
- Unsaved-changes guard on all forms.
- Toasts for success/error; inline field errors; loading and empty states.
- Keyboard accessible; works on tablet; desktop first.
- All queries via TanStack Query with sensible invalidation.

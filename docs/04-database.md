# 04 — Database (Supabase)

The full runnable SQL is in `docs/sql/schema.sql`. Split it into migrations by phase (the agent applies it via Supabase MCP `apply_migration` or CLI). This file explains the design.

## Tables
| Table | Purpose | Public read | Write |
|---|---|---|---|
| `profiles` | Staff accounts, linked to `auth.users`. Roles: `admin`, `editor`, `none`. | no (own row) | admin |
| `site_settings` | Key/value JSON (phones, email, socials, CR, GTM later…). No secrets. | yes | admin |
| `media` | One row per uploaded file (metadata + variants) | yes | staff |
| `categories` | Blog categories (bilingual) | yes | staff |
| `tags` | Blog tags (bilingual) | yes | staff |
| `posts` | Blog posts with all SEO fields | published only | staff |
| `post_tags` | posts ↔ tags | yes | staff |
| `works` | **Dynamic table 1:** projects / "أعمالنا" | published only | staff |
| `partners` | **Dynamic table 2:** "شركاء النجاح" | published only | staff |
| `contact_submissions` | Contact form leads | **insert only** (anon) | staff read/update |

Tables you asked for: `works` and `partners` (dynamic content) and the blog tables. `contact_submissions`, `site_settings`, `media` and `profiles` are the supporting tables the contact form, media manager, and admin need.

## Key design points
- **Language:** posts have `lang` (`ar`|`en`) and `translation_key` (same UUID links the Arabic and English version of one article → used for hreflang). Unique `(lang, slug)`.
- **Works/partners** are bilingual with `_ar`/`_en` columns. Arabic is required, English optional.
- **Media variants:** each image is stored as 3 WebP variants (480/960/1600 px wide) + optional original. The `variants` JSONB holds the storage paths and sizes.
- **Post content:** `content_html` (what the site renders) and `content_json` (TipTap JSON, for editing). Both saved together.
- **Post SEO fields:** `seo_title`, `seo_description`, `focus_keyword`, `secondary_keywords[]`, `canonical_url`, `robots_noindex`, `robots_nofollow`, `og_title`, `og_description`, `og_image_id`, `schema_type`, `faq` (JSONB array of `{q,a}`), `seo_score`.
- **Publishing:** `status` is `draft` or `published` (+ `archived`). A post is public only when `status='published'` and `published_at <= now()`. No scheduled publishing in v1 (static rebuild model); future option.
- **Auth:** public sign-up must be **disabled** in Supabase Auth settings. Staff are invited. A new `auth.users` row gets a `profiles` row with role `none` (no access) — an admin promotes it with SQL or the Users screen. `is_staff()` = role in (`admin`,`editor`).
- **Deletion safety:** `media` deletion is blocked in the UI when the file is referenced (posts content/featured/OG, works, partners). The DB uses `on delete set null` for FK references so nothing breaks hard.

## Row Level Security summary
- Public (anon + authenticated): `select` on published `posts`, `works`, `partners`; all `categories`, `tags`, `post_tags`, `media`, `site_settings`.
- Staff (`is_staff()`): full access to content tables and `contact_submissions`.
- Admin (`is_admin()`): `site_settings` write, `profiles` update.
- Anon: `insert` only on `contact_submissions` with length checks.
- Use `(select public.is_staff())` inside policies so Postgres caches the result per statement.

## Storage
Bucket `media` (public read, 10 MB file limit, mime allow-list: jpeg, png, webp, avif, svg, pdf). Staff-only insert/update/delete. Path convention: `YYYY/MM/<slug>-<hash>-<w>.webp`.
SVG is allowed for logos only and is uploaded by staff only.

## After applying
1. Run Supabase advisors (security + performance) and fix all warnings.
2. Generate TypeScript types into `src/types/database.types.ts`.
3. Create the first admin: invite the owner by email in Supabase Auth, then run `update public.profiles set role='admin' where id = '<uuid>';`.
4. Confirm: anon cannot read draft posts, cannot read `contact_submissions`, cannot write anything except a contact submission.

## Seed
`site_settings` starter rows and 5 blog categories are included in the SQL. **No fake posts, works or partners.**

## User Invitation & Role Management

Public sign-up is disabled by design. All staff accounts must be created through manual invitation:

1. **Invite User in Supabase Dashboard**:
   - Go to **Authentication** -> **Users** in the Supabase Dashboard.
   - Click **Invite user** and enter the staff member's email address.
   - Supabase sends an invitation email with a magic link allowing the user to set their password.

2. **Automatic Profile Creation**:
   - The trigger `on_auth_user_created` automatically inserts a corresponding row into `public.profiles` with `role = 'none'`.
   - With `role = 'none'`, the user has zero staff privileges and cannot read or write private content or admin endpoints.

3. **Promote User Role**:
   - To grant editor access:
     ```sql
     update public.profiles
     set role = 'editor'
     where id = (select id from auth.users where email = 'editor@almubtakirah.com');
     ```
   - To grant administrator access:
     ```sql
     update public.profiles
     set role = 'admin'
     where id = (select id from auth.users where email = 'admin@almubtakirah.com');
     ```
   - In subsequent phases, admins can also promote or demote roles directly through the Admin Users interface (`/admin/users`).

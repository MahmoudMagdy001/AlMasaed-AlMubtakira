# Phase 05 — Public Blog

**Read first:** 07-blog-editor-and-seo-analyzer.md (Public post page section), 05-seo.md, 04-database.md
**Goal:** the public blog reads published posts from Supabase.

## Tasks
1. Queries: list (paginated 9/page, without `content_html`), by category, by tag, single by `(lang, slug)`, related posts, prev/next, translations by `translation_key`.
2. **Blog index** `/blog`, `/blog/page/:n`; English `/en/blog`. Category chips/filter linking to `/blog/category/:slug`. Empty state.
3. **Category pages** with their own title/description (from `categories`).
4. **Post page**: breadcrumbs, H1, byline, dates (published + updated), reading time, featured image (LCP, `fetchpriority="high"`, responsive), TOC (from headings), sanitized content in `.prose-article`, FAQ section, tags, share buttons (no third-party scripts), related posts, CTA band, prev/next.
5. `prose-article` typography: RTL-friendly, tables wrapped for horizontal scroll, figure/figcaption, blockquote, callout, CTA block, code, task lists, FAQ styles; works in LTR for English posts.
6. HTML sanitization step shared between build and runtime (allow-list from `07`).
7. Heading `id`s generated/validated so TOC anchors work with Arabic headings.
8. Components accept the final SEO props; the metadata and JSON-LD for blog are completed in Phase 11.

## Acceptance checklist
- [ ] Only published posts with `published_at <= now()` appear (verify with anon key)
- [ ] Post HTML is sanitized; no script/iframe other than allowed YouTube
- [ ] TOC anchors work; layout good at 375 / 768 / 1280
- [ ] Bilingual posts link to each other via `translation_key`
- [ ] List queries do not fetch `content_html`

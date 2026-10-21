# Phase 11 — Technical SEO: Prerender, Metadata, Schema, Sitemap, Rebuild Hook

**Read first:** 05-seo.md, 03-tech-architecture.md (Why prerendering is mandatory), 08-deployment-analytics.md
**Goal:** every public page ships complete HTML and correct SEO signals.

## Tasks
1. Prerender all public routes with `vite-react-ssg`; implement `getStaticPaths` + loaders for works, posts, categories, pagination and English mirrors, using the anon key.
2. Finish the `Seo` component: title template, description, canonical, robots, OG/Twitter, article tags, `lang/dir`, hreflang via `translation_key` or page twins.
3. JSON-LD per `05`: Organization, WebSite, LocalBusiness (address only when known), Service, BlogPosting, FAQPage, CollectionPage, BreadcrumbList, work detail. A typed `JsonLd` helper; no empty or invalid properties.
4. Generate `sitemap.xml` (+ hreflang alternates, `lastmod`) and `robots.txt` at build time; exclude noindex/admin.
5. Slug-change redirects: implement the chosen approach (small `redirects` table read at build and written into `vercel.json`/redirect config) and add the migration + admin hook when a published slug changes.
6. Deploy the Edge Function `trigger-rebuild` (JWT check, staff check, debounce, CORS) and set the secret; connect it to `requestRebuild()`.
7. Default OG image and per-page OG images; favicons/manifest verified.
8. Verification scripts (`scripts/verify-seo.ts`): fetch built HTML and assert one H1, title length, description length, canonical, JSON-LD validity, no duplicate titles/descriptions across pages.
9. Validate samples with the Rich Results Test and a schema validator; fix issues.

## Acceptance checklist
- [ ] `curl` on production-like build shows full content in HTML for Home, Service, Work, Post, Category
- [ ] Verification script passes for all pages
- [ ] Sitemap lists only indexable URLs; robots correct
- [ ] Publishing/unpublishing a post in admin triggers a rebuild and updates the site
- [ ] hreflang and canonicals correct on bilingual pages
- [ ] Redirect flow tested with a renamed slug

# 03 — Technical Architecture

## Stack
- React 18+, Vite, TypeScript (strict)
- Routing + prerendering: **React Router** with **`vite-react-ssg`** (static generation of every public route at build time)
- Styling: Tailwind CSS (logical properties for RTL), CSS variables for brand tokens
- Data: `@supabase/supabase-js`, TanStack Query for admin and client-side fetching
- Forms: React Hook Form + Zod
- Editor: TipTap (open-source extensions only)
- i18n: `react-i18next` (ar default, en)
- Head/meta: `react-helmet-async` (or the head API of `vite-react-ssg`)
- Icons: `lucide-react`
- Motion: CSS first; `gsap` only if truly needed
- Sanitizing HTML: `dompurify` (+ `jsdom` at build time)
- Image processing in the browser (admin): `browser-image-compression` or canvas

## Why prerendering is mandatory
A plain Vite SPA ships an empty `<div id="root">`. Google can render JavaScript but slowly and unreliably, and other crawlers/social previews cannot. For a company whose main goal is SEO, every public page must contain full HTML, `<title>`, meta tags and JSON-LD in the **initial response**.

Strategy:
1. At build time, `vite-react-ssg` renders each public route to static HTML. For dynamic routes (`/works/:slug`, `/blog/:slug`, `/blog/category/:slug`, blog pagination, English mirrors), `getStaticPaths` queries Supabase (anon key, RLS returns only published rows) to list the slugs, and the route loader fetches the data.
2. The browser then hydrates and the site behaves like a normal SPA.
3. `/admin/*` is client-side only (not prerendered, `noindex`).
4. **Rebuild on publish:** when staff publish/update/unpublish a post, work or partner, the admin calls a Supabase Edge Function `trigger-rebuild`, which verifies the caller is staff and then calls a **Vercel Deploy Hook** (URL stored as an Edge Function secret). Debounce: ignore if a rebuild was triggered in the last 60 seconds and queue one more after it. Admin shows "Changes will be live in about 1–2 minutes".
5. Sitemap and `robots.txt` are generated at build time from the same data.
6. A nightly scheduled rebuild (Vercel cron hitting the deploy hook) is an optional safety net.

If SSG proves impossible for a route, fall back to client rendering for that route only, and note it in `PROGRESS.md`. Never ship an SEO page that is client-rendered only.

## Folder structure
```
/
├─ AGENTS.md
├─ docs/                      (this spec)
├─ public/                    favicons, manifest, og-default.jpg, robots (generated), fonts not needed (bundled)
├─ supabase/
│  ├─ migrations/             SQL migrations (from docs/sql/schema.sql, split by phase)
│  └─ functions/trigger-rebuild/
├─ src/
│  ├─ main.tsx
│  ├─ routes.tsx              route table + getStaticPaths
│  ├─ app/                    providers, layouts (PublicLayout, AdminLayout), error boundary
│  ├─ components/
│  │  ├─ ui/                  Button, Input, Dialog, Toast, Badge, Skeleton…
│  │  ├─ layout/              Header, Footer, MobileNav, FloatingContact, Breadcrumbs
│  │  └─ seo/                 Seo (head), JsonLd, hreflang helper
│  ├─ features/
│  │  ├─ home/  about/  services/  contact/  privacy/
│  │  ├─ works/               public + admin
│  │  ├─ partners/            public + admin
│  │  ├─ blog/                public + admin (editor, seo analyzer)
│  │  ├─ media/               media manager + picker
│  │  ├─ settings/
│  │  └─ auth/
│  ├─ i18n/                   ar.json, en.json, config
│  ├─ lib/                    supabase client, query keys, utils (slugify, arabic text, dates), analytics (dataLayer)
│  ├─ types/                  database.types.ts (generated)
│  └─ styles/                 tailwind.css, tokens.css, prose.css (article typography)
├─ scripts/                   generate-sitemap, generate-icons (if used)
├─ vercel.json
└─ .env.example
```

## Environment variables
| Name | Where | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | Vercel + local | public |
| `VITE_SUPABASE_ANON_KEY` | Vercel + local | publishable key, public by design, protected by RLS |
| `VITE_SITE_URL` | Vercel | `https://almubtakirah.com` (used for canonicals, sitemap, OG) |
| `VITE_GTM_ID` | Vercel (later) | empty = nothing loads |
| `VITE_GSC_VERIFICATION` | Vercel (later) | optional meta-tag verification |
| `VERCEL_DEPLOY_HOOK_URL` | Supabase Edge Function secret | never in the frontend |

Ship `.env.example` with names only.

## Data access rules
- Public pages read only through the anon key; RLS decides what is visible.
- Admin pages use the signed-in user's session; RLS checks `is_staff()`.
- No service-role key in the browser, ever.
- Use select lists, not `select *`, on large tables (posts: do not pull `content_html` for list views).
- Pagination: blog 9 per page, works 12 per page, admin tables 20 per page.

## Build & quality gates
- `tsc --noEmit`, ESLint, Prettier configured. Build must pass with zero warnings that matter.
- `build.sourcemap = false` in production.
- Bundle: route-level code splitting; admin bundle (TipTap) must **not** be loaded by public pages.
- Fonts bundled, preload critical weights. No render-blocking third-party scripts.

# 08 — Deployment, Domain & Analytics

## Vercel project
- Framework preset: Vite. Build command from `package.json` (`vite-react-ssg build`), output `dist`.
- Node version pinned (LTS) in `package.json` `engines`.
- Environment variables (Production + Preview): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL`. Later: `VITE_GTM_ID`, `VITE_GSC_VERIFICATION`.
- Create a **Deploy Hook** named `content-publish` (Production branch). Store its URL as the Supabase Edge Function secret `VERCEL_DEPLOY_HOOK_URL`.
- Preview deployments: add header `X-Robots-Tag: noindex` when `VERCEL_ENV !== 'production'` (in `vercel.json` headers or middleware).

## `vercel.json` requirements
- `cleanUrls: true`, `trailingSlash: false`.
- Redirects: `www.almubtakirah.com` → `almubtakirah.com` (301, host-based), plus generated slug redirects.
- Rewrites: `/admin/:path*` → the SPA shell (admin is not prerendered) so deep links to the dashboard work.
- Headers:
  - Hashed assets: `Cache-Control: public, max-age=31536000, immutable`.
  - HTML: `Cache-Control: public, max-age=0, must-revalidate`.
  - Security: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` minimal. Add a CSP in report-only mode first; it must allow Supabase, Google Tag Manager/Analytics (when enabled) and YouTube nocookie.
- Custom 404 page returns status 404.

## Domain
1. Add `almubtakirah.com` and `www.almubtakirah.com` in Vercel → Domains (apex is primary, `www` redirects to apex).
2. At the registrar set the DNS records Vercel shows (A record for apex, CNAME for `www`), or point nameservers to Vercel.
3. Wait for SSL issuance, confirm HTTPS, test redirects.
4. Set `VITE_SITE_URL=https://almubtakirah.com`, redeploy.
5. Supabase → Auth → URL configuration: Site URL = `https://almubtakirah.com`, redirect URLs include `https://almubtakirah.com/admin/*` and the preview/local URLs.

## Rebuild on content change
Edge Function `trigger-rebuild`: validates the caller's JWT, checks `is_staff()` through RPC or profile query, calls the Deploy Hook with `fetch(POST)`, returns `{ok:true}`. CORS locked to the site origin. 60-second debounce using a row in `site_settings` or a small table. Never exposes the hook URL.

## Analytics — prepared now, activated later
The owner will add Google Tag Manager, Search Console and (through GTM) GA4 later. Prepare so activation needs **no code changes**:

**Google Tag Manager**
- `AnalyticsProvider` reads `VITE_GTM_ID` (fallback: `site_settings.analytics.gtm_id`). If empty → renders nothing and loads nothing.
- When set: inject the GTM script as high in `<head>` as possible after hydration (or via the prerendered head if the ID is available at build), plus the `<noscript>` iframe right after `<body>`.
- `window.dataLayer` initialized always (empty array is harmless).
- SPA route changes push `{event:'page_view', page_path, page_title, page_language}`.
- Custom events (pushed even when GTM is off): `contact_form_submit`, `phone_click`, `whatsapp_click`, `email_click`, `cta_click` (with `cta_location`), `blog_share`, `file_download`.
- Never load GTM on `/admin`.

**Google Search Console**
- Preferred verification: **DNS TXT record** on the domain (Domain property) — no code needed.
- Fallback: `VITE_GSC_VERIFICATION` renders `<meta name="google-site-verification" content="…">` in the head of the home page.
- After verification: submit `https://almubtakirah.com/sitemap.xml`, inspect the home URL, check coverage and Core Web Vitals reports.

**Consent:** a small cookie notice (Arabic/English) is added when analytics is turned on; GTM loads after acceptance (Consent Mode default denied). Spec the component now, activate later.

## Post-launch checklist
- [ ] HTTPS everywhere, www → apex redirect works
- [ ] `robots.txt` and `sitemap.xml` reachable, only production URLs inside
- [ ] Rich Results Test passes for Home, a Service page, a Post
- [ ] Lighthouse mobile ≥ 90 on the 4 core page types
- [ ] Contact form submits and appears in admin Messages
- [ ] Publishing a post in admin triggers a rebuild and the post appears within ~2 minutes
- [ ] 404 returns status 404
- [ ] No console errors; no admin routes in the sitemap
- [ ] Favicons and OG image display correctly when sharing on WhatsApp/X

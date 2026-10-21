# 00 — Project Overview

## Company
- **Arabic name:** شركة المصاعد المبتكرة
- **English name:** Al-Masaed Al-Mubtakirah Company (brand wording in the profile: "Al Masaed Al Mubtakira")
- **Slogan:** ابتكار يرتفع بك
- **Tagline line used on all print material:** صيانه - تحديث - تركيب - قطع غيار (write it correctly on the site: صيانة – تحديث – تركيب – قطع غيار)
- **Based in:** Jeddah, Saudi Arabia
- **Commercial registration (CR):** 4030227058, issued by the Ministry of Commerce and Investment, dated 26/5/1433 AH
- **Domain:** almubtakirah.com — **Email:** info@almubtakirah.com
- **Business:** supply, installation, maintenance, development and modernization of elevators of all sizes and shapes; maintenance, testing and repair of all brands/models of elevators, escalators, moving walkways and lifts for people with special needs, aligned with Saudi Vision 2030.
- Accredited with the **Civil Defense** (معتمدين في الدفاع المدني).

## Goal
A fast, trustworthy, **SEO-first** corporate website that ranks for elevator maintenance / installation / modernization / spare parts searches in Saudi Arabia (Jeddah first), converts visitors into phone calls, WhatsApp chats and quote requests, and lets the company publish blog articles itself.

## Scope
**Public site**
- Static pages: Home, About, Services (+ one page per service), Contact, Privacy Policy, 404.
- Dynamic from DB: **Works** (projects), **Success Partners** (logos), **Blog** (posts, categories, tags).
- Contact form stored in DB.

**Admin dashboard** (`/admin`, private)
- Login (Supabase Auth), dashboard home, Media Manager, Blog (TipTap editor + SEO fields + SEO analyzer), Categories/Tags, Works, Partners, Contact submissions, Site settings.

**Out of scope now (prepare only):** Google Tag Manager, Google Search Console, GA4. The code must have clean hooks for them (see `08-deployment-analytics.md`).

## Decisions already taken (change only by asking the owner)
| Topic | Decision |
|---|---|
| Languages | Arabic primary (RTL, default at `/`), English secondary at `/en/...`. Blog posts carry a `lang` field. |
| Rendering | Static site generation (prerender) at build time so Google receives full HTML. See `03-tech-architecture.md`. |
| Static content | Lives in code/i18n files, not DB. |
| Dynamic content | Only works, partners, blog (+ contact submissions, site settings). |
| Hosting | Vercel (frontend), Supabase (DB/Auth/Storage). |
| Admin users | Invite-only. Public sign-up disabled. |

## Success criteria
- Lighthouse (mobile) ≥ 90 for Performance, Accessibility, Best Practices, SEO on Home, a Service page and a Blog post.
- Every public page has unique title, meta description, canonical, OG tags and valid structured data.
- A staff member can publish a fully optimized article without developer help.

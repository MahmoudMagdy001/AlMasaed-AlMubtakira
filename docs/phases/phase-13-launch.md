# Phase 13 — Deployment, Domain, Analytics Hooks, Final Audit

**Read first:** 08-deployment-analytics.md, 09-natural-look-rules.md (Final audit)
**Goal:** production launch on `almubtakirah.com`.

## Tasks
1. Vercel production configuration: env vars, `vercel.json` (redirects, rewrites, headers), preview `noindex`, Deploy Hook created and wired to the Edge Function secret.
2. Add `almubtakirah.com` (primary) and `www` (redirect) in Vercel; give the owner the exact DNS records to set; verify SSL and redirects once DNS is live.
3. Supabase Auth URL configuration updated for production; test login and password reset on the real domain.
4. Analytics readiness (inactive): `AnalyticsProvider`, `dataLayer` events, GTM injection when `VITE_GTM_ID` is set, GSC meta when `VITE_GSC_VERIFICATION` is set, consent component, never on `/admin`. Test by setting a dummy ID in a preview deployment, then remove it.
5. Remove the `/_styleguide` route and any dev-only code, demo data, test users.
6. Run the **Final audit** from `09-natural-look-rules.md` (search repo and `dist`), fix all hits.
7. Production smoke test: post-launch checklist in `08-deployment-analytics.md`.
8. Hand-over doc `docs/HANDOVER.md`: how to publish a post, upload media, add works/partners, invite a user, change settings, trigger a rebuild, add GTM/GSC later (step by step, screenshots optional).
9. Tag release `v1.0.0`.

## Acceptance checklist
- [x] Site live on `https://almubtakirah.com`, www redirects, HTTPS valid
- [x] Post-launch checklist fully ticked
- [x] Final audit returns zero visible hits
- [x] GTM/GSC can be activated by setting env vars only
- [x] `HANDOVER.md` complete

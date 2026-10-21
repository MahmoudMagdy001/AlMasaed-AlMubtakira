# Phase 02 — Supabase Database, RLS, Storage

**Read first:** 04-database.md, `sql/schema.sql`
**Goal:** the complete backend schema is live and secured.

## Tasks
1. Confirm or create the Supabase project (use the Supabase project available in the connected tools; if none exists, create one with the Supabase tools). Region: choose the closest to Saudi Arabia available (e.g. Frankfurt or Bahrain-adjacent options; prefer lowest latency).
2. Apply `schema.sql` as migrations in logical order: `001_helpers_profiles`, `002_settings_media`, `003_blog`, `004_works_partners`, `005_contact`, `006_rls`, `007_storage`, `008_seed`. Fix any syntax issue found while applying; keep semantics.
3. Auth settings: **disable public sign-ups**, enable email confirmation, set Site URL (local for now), minimum password length 10.
4. Create the first admin: invite the owner's email, then promote with SQL.
5. Run the **security and performance advisors**, fix every finding (missing indexes on FKs, RLS initplan, function search_path, etc.).
6. Generate TypeScript types to `src/types/database.types.ts`; create `src/lib/supabase.ts` (typed client, anon key only).
7. Write a short test script (or SQL checks) proving: anon cannot select drafts or `contact_submissions`; anon can insert a valid contact submission; anon cannot insert invalid (too short) data; non-staff authenticated user cannot write; staff can write; storage upload by anon fails.
8. Document how to create/invite more users in `docs/` (short section appended to `04-database.md`).

## Acceptance checklist
- [ ] All tables exist with RLS enabled and policies from `04`
- [ ] Advisors report no security errors and no unresolved warnings
- [ ] Types generated and compile
- [ ] Policy tests (step 7) pass and results are listed in `PROGRESS.md`
- [ ] Public sign-up is disabled

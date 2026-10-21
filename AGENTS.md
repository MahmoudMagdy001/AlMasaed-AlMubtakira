# AGENTS.md — Rules for the coding agent

You are building the public website and admin dashboard for Al-Masaed Al-Mubtakirah (elevator company, Jeddah).
All specifications are in `/docs`. Read them fully before writing code.

## Workflow

0. **Do not ask the user questions.** Use `docs/10-fixed-decisions.md` for any missing information; if not covered, pick the safest option that hides the unknown element and record it under "Decisions taken" in `docs/PROGRESS.md`.
1. Work on **one phase at a time** (`/docs/phases`). Never start the next phase on your own.
2. Each phase ends with an acceptance checklist. Verify every item (run the app, run `tsc --noEmit`, run the build) before saying a phase is done.
3. Update `/docs/PROGRESS.md` at the end of each phase, report briefly (what was done, decisions taken, anything incomplete, name of the next phase), then **stop and wait** until the user writes "continue".

## Fixed stack (do not change)

React 18+, Vite, TypeScript (strict), React Router, Supabase (Postgres, Auth, Storage), Tailwind CSS, TipTap (open-source extensions only), deployed on Vercel.
Adding any other dependency requires a one-line justification in `PROGRESS.md`. Prefer what is already in the stack.

## Skills available in the project (use when relevant)

`vercel-react-best-practices`, `react`, `react-hooks`, `supabase`, `supabase-postgres-best-practices`, `web-design-engineer`, `gsap-react` (subtle motion only).
Ignore the Flutter/Firebase/Next.js/React Native skills; they do not apply.

## Code rules

- TypeScript strict. No `any`. No `@ts-ignore` without a written reason.
- Generate Supabase types with the CLI/MCP and import them; do not hand-write DB types.
- Every table has RLS enabled. After any schema change, run the Supabase security and performance advisors and fix findings.
- Secrets: never commit `.env`. Only the publishable (anon) key is used in the browser. Service role keys exist only in Supabase Edge Function secrets or Vercel server env.
- Do not use or copy any credentials found in project files.
- Components are small and named by what they are (`ServiceCard`, `PostEditor`). Feature-based folders (see `03-tech-architecture.md`).
- All visible text comes from the i18n dictionaries or the database, never hardcoded inside components.
- Arabic is the primary language: layout is RTL by default; use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`) so English (LTR) works without rewrites.
- Accessibility: semantic HTML, one `h1` per page, visible focus states, alt text, contrast AA, keyboard-operable menus and dialogs.

## Natural-look rules (mandatory, see `09-natural-look-rules.md`)

The finished site must read as hand-built by a studio. No machine-generated traces in code, comments, copy, markup, metadata, commit messages or UI. Re-read that file before every phase.

## Definition of done for every phase

- App builds with zero TypeScript errors and zero console errors/warnings.
- No leftover TODO text visible to users, no placeholder lorem ipsum, no default Vite assets.
- Mobile (375px), tablet (768px) and desktop (1280px+) checked.

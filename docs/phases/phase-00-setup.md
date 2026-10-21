# Phase 00 — Project Setup

**Read first:** AGENTS.md, 03-tech-architecture.md, 09-natural-look-rules.md
**Goal:** an empty but correctly configured project that builds and deploys.

## Tasks
1. Scaffold Vite + React + TypeScript project named `almubtakirah-website`. Remove all template demo files and assets.
2. Enable TypeScript strict mode, path alias `@/` → `src/`.
3. Install and configure: Tailwind CSS, React Router, `vite-react-ssg`, `react-i18next`, `react-helmet-async` (or the SSG head API), `@supabase/supabase-js`, `@tanstack/react-query`, `react-hook-form`, `zod`, `lucide-react`, `@fontsource/tajawal`.
4. ESLint + Prettier (+ import sorting). Add scripts: `dev`, `build`, `preview`, `typecheck`, `lint`.
5. Create the folder structure from `03-tech-architecture.md` (empty folders with only needed files).
6. `.gitignore` (node_modules, dist, `.env*` except `.env.example`, tool folders listed in `09`), `.env.example`.
7. `index.html`: `lang="ar" dir="rtl"`, real title, theme-color `#132454`, viewport; no template title.
8. Placeholder `public/` favicons from the logo (see `01-brand-design-system.md`), copy logos from `docs/assets/logo` into `src/assets/brand/` (optimized).
9. Basic `vercel.json` (clean URLs, trailing slash false).
10. Short human README for the repo.
11. Connect the repo to Vercel (or document how) and confirm a blank deployment works.

## Acceptance checklist
- [ ] `npm run build`, `typecheck`, `lint` pass
- [ ] No Vite/React template assets or text remain
- [ ] `.env.example` lists all variables from `03`
- [ ] RTL root works (`dir="rtl"`) and Tajawal loads
- [ ] Vercel deployment of the blank app works (or instructions documented)

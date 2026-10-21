# Phase 06 — Admin Foundation & Auth

**Read first:** 06-admin-dashboard.md (Auth, Layout, Dashboard), 03-tech-architecture.md
**Goal:** a secure, empty admin shell.

## Tasks
1. `/admin/login` (email + password, forgot password flow, error messages), session persistence, logout.
2. `AuthProvider` + route guard: requires session **and** `is_staff()` (query own profile). Role `none` → "no access" screen. Expired session → redirect to login with return path.
3. `AdminLayout`: sidebar (Dashboard, Posts, Categories, Tags, Works, Partners, Media, Messages, Settings, Users), top bar (user menu, view site), responsive.
4. Dashboard home: counts and lists from `06` (queries only; empty states).
5. Shared admin components: DataTable (sort, pagination, empty/loading), ConfirmDialog, FormField set, PageHeader, StatusBadge, UnsavedChangesGuard, Toaster.
6. Admin is lazy-loaded; public bundle must not include admin or TipTap code. Verify with the build analyzer.
7. `noindex` meta and `X-Robots-Tag` for `/admin/*`; excluded from prerender and sitemap.
8. Password reset page and Supabase redirect URLs set.

## Acceptance checklist
- [ ] Unauthenticated users cannot see any admin screen or data
- [ ] A user with role `none` cannot access anything
- [ ] Deep-link to `/admin/...` works on Vercel (rewrite) and after refresh
- [ ] Public bundle size unaffected by admin code (report sizes)
- [ ] Logout clears session and cached queries

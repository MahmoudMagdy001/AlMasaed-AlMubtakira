# Phase 10 — SEO Fields & SEO Analyzer

**Read first:** 07-blog-editor-and-seo-analyzer.md (SEO fields, Analyzer), 05-seo.md
**Goal:** per-post SEO panel, live analyzer with Arabic-aware checks, SERP/social previews.

## Tasks
1. SEO panel fields and validations from `07`: SEO title, meta description (with live counters and color states), focus keyword, secondary keywords, canonical, robots switches, OG title/description/image, schema type.
2. Defaults/fallbacks: SEO title ← title, description ← excerpt, OG ← SEO fields ← featured image.
3. **Analyzer engine** as a pure TypeScript module in `features/blog/seo/` (no React inside): text normalization for Arabic, keyword matching with prefix handling, density, headings, paragraph/sentence analysis, link/image analysis, 22 checks with weights and the 0–100 score exactly as in `07`.
4. **Analyzer UI**: score gauge (green/amber/red), grouped checklist with pass/warn/fail, Arabic messages and fix tips, extra info (reading time, heading outline, links list, keyword occurrences), debounced updates, optional highlight of keyword occurrences in the editor.
5. SERP preview (desktop/mobile, RTL) and social card preview.
6. Duplicate slug/title detection against the DB.
7. Persist `seo_score` on save; show score badge in posts list; dashboard widget "posts needing SEO work".
8. Confirmation when publishing with score < 50 (never blocking).
9. **Vitest tests** for the analyzer with Arabic fixtures: tashkeel, alef variants, `ة/ه`, prefixed keywords (و/ب/ل/ال), multi-word keywords, density edge cases, HTML with images/links/headings.

## Acceptance checklist
- [ ] Analyzer test suite passes with Arabic fixtures
- [ ] A well-optimized sample article reaches ≥ 80; a thin article scores < 50 (document both samples in tests)
- [ ] Live updates feel instant on a 2,000-word article (no UI lag)
- [ ] Previews and counters match the rules in `07`
- [ ] Scores saved and visible in list/dashboard

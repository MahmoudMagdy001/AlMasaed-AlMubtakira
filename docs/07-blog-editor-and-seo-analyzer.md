# 07 — Blog Editor (TipTap) & SEO Analyzer

## Post edit screen layout
Two columns on desktop (stack on mobile):
- **Main (≈ 70%)**: title input (becomes the page H1), slug field, the TipTap editor, excerpt, FAQ builder.
- **Sidebar (≈ 30%)**, in collapsible panels: **Publish** (status, date, language, translation link, save draft / publish / preview), **Category & Tags**, **Featured image** (picker + alt text), **SEO**, **Social (OG)**, **Advanced** (canonical, noindex/nofollow, schema type), **SEO Analyzer** (score + checklist).
- Autosave a draft every 30 s when dirty (to the same row; never publishes), "Saved at hh:mm" indicator, warn on leaving with unsaved changes, recover from crash via local storage copy.

## TipTap — full feature set
Use only open-source (MIT) TipTap packages. Pin versions of `@tiptap/*` to the same release. Build a toolbar (sticky, wraps on mobile), a bubble menu (on selection), a floating menu (on empty line) and a slash-command menu (`/`).

**Text:** bold, italic, underline, strikethrough, inline code, subscript, superscript, highlight (multi-color), text color, font family (a small list including Tajawal), font size via custom mark (limit to a scale), clear formatting.
**Structure:** paragraph, headings H2–H4 (H1 is the post title and is blocked in the editor), blockquote, horizontal rule, bullet list, ordered list, task list, hard break.
**Alignment & direction:** text align (right/center/left/justify) and a **direction toggle per block** (RTL/LTR, custom `dir` attribute) — essential for mixed Arabic/English content. New posts follow the post language by default.
**Links:** dialog with URL, "open in new tab" (adds `rel="noopener noreferrer"`), `nofollow`, `sponsored`; validate URLs; **internal link picker** that searches posts/services/works by title and inserts a relative link; auto-detect external vs internal for the analyzer.
**Images:** insert through the **Media Manager picker** (also upload from inside the dialog). Custom image node renders `<figure><img><figcaption></figcaption></figure>` with `srcset`, `width`/`height`, `loading="lazy"`; controls for alignment (start/center/end/full width), size, caption, and **alt text (required; analyzer warns if empty)**. Paste/drop an image into the editor → uploads through the same pipeline.
**Tables:** insert, add/remove rows/columns, merge/split cells, header row/column, delete table; responsive wrapper on the public side.
**Embeds:** YouTube (privacy-enhanced domain, `loading="lazy"`), with aspect-ratio wrapper.
**Code:** code block with syntax highlighting (lowlight) and language select.
**Custom blocks (own nodes):**
- **Callout** (info / tip / warning / safety) with icon.
- **FAQ block**: question/answer pairs inside the article; the same data also fills `posts.faq` for FAQPage schema. Either approach (inline block or sidebar FAQ builder) must stay in sync — pick the inline block as source of truth and derive `posts.faq` on save.
- **CTA block**: heading, text, button (phone / WhatsApp / contact) styled with brand colors.
- **Table of contents** (auto-generated from H2–H3 using `@tiptap/extension-table-of-contents` or a custom extension) — rendered on the public page as a sticky list on desktop; headings receive stable `id` anchors (slugified Arabic-safe).
**Editing helpers:** placeholder, character & word count (with reading time), typography (smart quotes), undo/redo, drag handle to reorder blocks, find & replace, source-HTML view (read-only or guarded edit), full-screen mode, preview-as-published toggle, keyboard shortcuts cheat-sheet, **paste cleaner** (strip Word/Google-Docs junk, keep structure), fixed list of allowed tags/attributes.

## Storage & output
- Save `content_json` (editor state) and `content_html` (rendered) together.
- Compute `reading_time_min` = ceil(words / 200) for Arabic.
- Before saving and before rendering, **sanitize** HTML with an allow-list (headings, p, strong, em, u, s, mark, sub, sup, a[href,target,rel], ul/ol/li, blockquote, hr, br, img[src,srcset,sizes,alt,width,height,loading], figure/figcaption, table parts, iframe only for allowed YouTube host, pre/code, div/span with approved classes and `dir`, `data-*` for custom nodes). Remove inline scripts and event handlers.
- The public post page renders `content_html` inside `.prose-article` styles (RTL-aware typography, table wrapper, callout/CTA/FAQ styles).

## SEO fields (post)
| Field | Rules / UI |
|---|---|
| SEO title | live counter, green 30–60 chars, preview; defaults to post title |
| Meta description | counter, green 120–160 chars; defaults to excerpt |
| Slug | auto from title, editable; lowercase letters/digits/hyphens (Latin recommended); show full URL; warn if > 75 chars; warn on change after publish (redirect needed) |
| Focus keyword | single phrase |
| Secondary keywords | tag input (max 5) |
| Canonical URL | optional |
| Robots | noindex / nofollow switches (with warning) |
| OG title / description / image | default to SEO fields and featured image |
| Schema type | BlogPosting (default) / Article / NewsArticle |
| FAQ | derived from FAQ blocks |
| Featured image alt | required |

**SERP preview:** Google-style snippet, mobile/desktop toggle, RTL, showing title (truncated by ~580 px / ~60 chars), URL breadcrumb (`almubtakirah.com › blog › slug`), description. **Social preview:** Facebook/X card with OG image.

## SEO Analyzer (client-side, runs live on debounced changes, no network)
Input: title, slug, SEO title, meta description, focus keyword, secondary keywords, excerpt, featured image + alt, content HTML (parsed with `DOMParser`), links, images, FAQ, robots flags, OG image.
Output: overall score 0–100 (green ≥ 80, amber 50–79, red < 50) and a grouped checklist; each item is pass / warning / fail with a one-line explanation in Arabic and a "how to fix" tip. Score is stored in `posts.seo_score` on save. Publishing is never blocked; a confirmation appears if score < 50.

### Arabic-aware text handling (important)
Normalize both keyword and text before matching:
- remove tashkeel (U+064B–U+065F) and tatweel (U+0640);
- unify alef forms `أ إ آ → ا`, `ى → ي`, `ة → ه` (for matching only);
- lowercase Latin; collapse whitespace; convert Arabic-Indic digits to Latin;
- match on word boundaries allowing common attached prefixes (و، ف، ب، ل، ك، ال، وال، بال، لل) so "صيانة المصاعد" matches "لصيانة المصاعد" and "بصيانة المصاعد".
Word count: split on whitespace after stripping HTML. Density = (keyword occurrences × keyword word count) / total words × 100. Sentence split on `. ! ? ؟ ۔ …` and line breaks.

### Checks and weights (total 100)
**Basic SEO — 50**
| # | Check | Pass rule | Pts |
|---|---|---|---|
| 1 | Focus keyword set | not empty | 5 |
| 2 | Keyword in SEO title | present (bonus text if at the start) | 8 |
| 3 | Keyword in meta description | present | 6 |
| 4 | Keyword in slug | present (Latin transliteration allowed to be matched via manual "slug keyword" hint; otherwise check Arabic slug) | 5 |
| 5 | Keyword in first 100 words | present | 7 |
| 6 | Keyword in a subheading (H2/H3) | ≥ 1 | 5 |
| 7 | Keyword density | 0.5%–2.5% pass; < 0.5 or 2.5–3.5 warn; > 3.5 fail (stuffing) | 6 |
| 8 | SEO title length | 30–60 chars | 4 |
| 9 | Meta description length | 120–160 chars | 4 |
**Content — 30**
| 10 | Word count | ≥ 800 pass; 400–799 warn; < 400 fail | 8 |
| 11 | Heading structure | ≥ 2 H2, no skipped levels | 6 |
| 12 | Paragraph length | no paragraph > 150 words | 3 |
| 13 | Sentence length | average ≤ 25 words; ≤ 25% sentences over 30 words | 3 |
| 14 | Featured image set, alt contains keyword (or related) | both | 4 |
| 15 | All inline images have alt | 100% | 3 |
| 16 | Internal links | ≥ 2 | 3 |
**Technical & social — 20**
| 17 | External links | ≥ 1 to a reputable domain | 4 |
| 18 | Slug quality | ≤ 75 chars, no stop characters, no uppercase | 3 |
| 19 | Canonical | empty or valid absolute URL on our domain | 2 |
| 20 | Indexable | not noindex | 4 |
| 21 | OG image present | explicit or featured image | 4 |
| 22 | FAQ present | ≥ 2 Q&As (bonus signal for rich results) | 3 |
Also display (not scored): reading time, heading outline, keyword occurrence list highlighted in the editor on demand, secondary keywords usage, link list (internal/external, nofollow flags), duplicate-title/slug warning (query DB), "missing translation" hint.

Unit-test the analyzer (Vitest) with Arabic fixtures: diacritics, alef variants, prefixed keywords, multi-word keywords, HTML with images/links.

## Public post page
Breadcrumbs, H1, byline (author, published date, updated date, reading time), featured image (LCP, `fetchpriority="high"`), TOC, content, FAQ section (schema), tags, share links (copy link, WhatsApp, X, LinkedIn, no third-party scripts), related posts (same category), CTA band to services/contact, prev/next. Blog index: grid, category filter, pagination (`rel="prev/next"` not needed, but canonical per page), search is optional later.

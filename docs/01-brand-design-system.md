# 01 — Brand & Design System

Source: the company brand book. Follow it; extend it only where noted.

## Colors
| Token | Name | HEX | RGB | Use |
|---|---|---|---|---|
| `--brand-900` | Dark Blue | `#132454` | 19 36 84 | Headings, header/footer background, primary buttons |
| `--brand-600` | Blue | `#336ea6` | 51 110 166 | Links, secondary buttons, accents, icons |
| `--brand-400` | Cyan Blue | `#5ec1f0` | 94 193 240 | Highlights, hover accents, small details, gradients end |

The brand book also defines tints (5%–100%) of each color. Generate a scale per color (50…900) with the three HEX values as anchors:
- `brand-900` = `#132454`, `brand-600` = `#336ea6`, `brand-400` = `#5ec1f0`; derive 50/100/200/300/500/700/800 by mixing with white/black.

Neutrals: background `#ffffff`, soft section background `#f4f7fb` (a 5% tint of the blue), text `#132454` for headings, `#3a4560` for body, border `#dde4ef`.
Feedback: success `#1f8a5b`, error `#c0392b`, warning `#b7791f` (admin only).

**Gradient rule (from brand book):** a gradient uses **exactly two** palette colors, never more, never fewer. Allowed: `#132454 → #336ea6`, `#336ea6 → #5ec1f0`, `#132454 → #5ec1f0`.

**Contrast:** body text on white must be ≥ 4.5:1. `#5ec1f0` is never used for text on white; use it only on dark backgrounds or as decoration.

## Typography
- Brand fonts: **Segoe UI** (primary, headings and body) and **Tajawal** (secondary: numbers, social, footers).
- Web decision: Segoe UI cannot be self-hosted legally and does not exist on Mac/Android, which would make the site look different per device. Therefore:
  - Self-host **Tajawal** (Arabic + Latin, weights 300/400/500/700) through `@fontsource/tajawal`, subset to Arabic + Latin, `font-display: swap`, preload the 400 and 700 files.
  - CSS stack: `font-family: "Tajawal", "Segoe UI", system-ui, sans-serif;`
  - Keep this decision documented; Segoe UI stays as the second family in the stack.
- Scale (mobile → desktop): h1 32→56, h2 26→40, h3 20→28, body 16→18, small 14. Arabic line-height 1.8 for body, 1.3 for headings.
- Use Latin digits or Arabic-Indic digits consistently across the site: **Latin digits (0-9)** everywhere (phone numbers, prices, dates).

## Logo
Files: `docs/assets/logo/Al_Masaed_Al_Mubtakirah-17.png` (horizontal, 2482×777) and `Al_Masaed_Al_Mubtakirah-05.png` (square/vertical, 2481×2482).
- The files known so far (`-17` horizontal, `-05` square) are **white on transparent**, i.e. reversed versions for dark backgrounds; use them on `#132454` (header, footer, hero). Other files in the folder may be color versions.
- Use the files in `docs/assets/logo/`. Choose the version by background: reversed/white on dark (`#132454`) areas, color/dark version on light areas (admin, emails, schema logo). If an SVG exists, inline it as a React component; otherwise export optimized WebP/PNG at 2 sizes (header 160px wide, footer 220px wide, plus `@2x`). If only white versions exist, always place the logo on a `#132454` bar. Do not recolor the logo with CSS filters.
- **Clear space:** 20px on all sides at minimum (brand book). Never stretch, blur, add shadow/stroke, change colors, or place on busy/low-contrast backgrounds.
- Favicon: generate from the square logo mark (white on `#132454` rounded square). Provide `favicon.ico`, `icon.svg` or 512 png, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, and `site.webmanifest`.
- OG default image 1200×630: dark-blue background, horizontal white logo centered, slogan under it.

## Brand graphic language
From the brand book, graphics derive from the logo philosophy:
- **Ascending arrows / lines** = movement, upward progress.
- **Cubes** = innovation.
Build a subtle repeating pattern (SVG) from rising arrow strokes and small cubes, used at 5–10% opacity on dark sections (hero, footer, CTA band). Do not use stock "technology" imagery, glowing orbs or abstract blobs.

## Layout
- Container max 1200px, side padding 16 (mobile) / 24 (tablet) / 32 (desktop). 12-col grid on desktop, 4-col on mobile. 8px spacing scale.
- Section vertical rhythm: 64px mobile / 112px desktop. Alternate white and `#f4f7fb` sections.
- Corner radius: 8px for inputs/buttons, 12px for cards. One shadow level for cards (`0 6px 24px rgba(19,36,84,.08)`). No glassmorphism, no neon glows.

## Components (build once, reuse)
Header (sticky, logo, nav, language switch, call button), Mobile drawer menu, Footer (4 columns), Button (primary / secondary / ghost / whatsapp), Section heading (kicker + title + intro), Service card, Feature item (icon + title + text), Work card, Partner logo tile, Post card, Breadcrumbs, CTA band (phone + WhatsApp + quote), Contact form, FAQ accordion, Pagination, Badge, Skeleton loaders, Toast, Empty state, Image with `srcset` helper.
Floating contact buttons: WhatsApp + call, bottom-start corner, appear after scroll, never covering form fields on mobile.

## Icons
One icon set only (Lucide via `lucide-react`) with consistent 1.75 stroke. No emoji as icons anywhere (site or admin).

## Imagery
- Real photos of the company's work come from the Works table (uploaded by the owner).
- Until real photos exist, use brand-pattern backgrounds, not generic stock photos.
- All images: WebP/AVIF, explicit width/height, `loading="lazy"` except the LCP image, descriptive Arabic alt text.

## Motion
Subtle and fast (150–300ms). Allowed: fade/slide-up on reveal (once), hover lift on cards, a rising-line animation in the hero background, smooth drawer. Respect `prefers-reduced-motion`. No parallax, no auto-playing carousels, no cursor effects, no count-up animations of invented numbers.

## RTL specifics
`<html lang="ar" dir="rtl">`; English routes set `lang="en" dir="ltr"`. Use logical properties. Mirror directional icons (arrows, chevrons). Phone numbers and emails inside Arabic text use `<bdi>` or `dir="ltr"` spans.

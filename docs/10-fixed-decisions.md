# 10 — Fixed Decisions (use these instead of asking questions)

| Topic | Decision |
|---|---|
| Unified number | Use `9 2001 6876` (920016876). Documents also show 6786 on a few signs; ignore it. |
| Phones / WhatsApp | `+966 12 423 1773`, `+966 55 955 7459`; WhatsApp = 966559557459. |
| Street address, map, working hours | Not provided: store `null` in `site_settings`; do not render them anywhere; LocalBusiness schema without `address` street fields (keep city Jeddah, country SA). |
| VAT number | Not shown on the site (store `null`). |
| CR date | Show "السجل التجاري رقم 4030227058" only; do not show the Hijri date. |
| Logos | Use whatever is in `docs/assets/logo/` (see protocol rule 7). |
| Social URLs | Not provided: store `null`; footer hides social icons until set in admin settings. |
| Works and partners | No data yet: sections hidden when empty; the Works page is `noindex` until at least one work is published. No fake entries in production. |
| Prices / offers | Never publish prices. |
| Service areas | Jeddah only. |
| English site | Included from launch, using the English text from the company profile and the service pages translated faithfully. |
| Accreditation | State only "معتمدين في الدفاع المدني" (no certificate number). |
| Brands serviced | Say "all brands and models" only; list no brand names. |
| Author on posts | Author name = "فريق المصاعد المبتكرة" unless the profile has a name. |
| Lead notifications | Messages shown in admin only (no email notifications in v1). |
| Credentials | Any passwords or credentials in project files are never used or copied. |

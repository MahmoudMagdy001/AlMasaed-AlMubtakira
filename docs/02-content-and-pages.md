# 02 — Content & Pages

All facts below come from the company profile and brand book. **Do not invent** statistics, client names, years of experience, awards, testimonials, addresses, prices or certifications. If a section needs data we do not have, leave the section out (or driven by DB and hidden when empty).

## Sitemap and URLs
Arabic is at the root, English under `/en`. Slugs are lowercase Latin with hyphens.

| Page | Arabic URL | English URL |
|---|---|---|
| Home | `/` | `/en` |
| About | `/about` | `/en/about` |
| Services (index) | `/services` | `/en/services` |
| Elevator maintenance | `/services/elevator-maintenance` | `/en/services/elevator-maintenance` |
| Elevator modernization | `/services/elevator-modernization` | … |
| Elevator installation | `/services/elevator-installation` | … |
| Spare parts | `/services/elevator-spare-parts` | … |
| Escalators & moving walkways | `/services/escalators-moving-walkways` | … |
| Works (index) | `/works` | `/en/works` |
| Work detail | `/works/:slug` | `/en/works/:slug` |
| Blog (index, paginated) | `/blog`, `/blog/page/:n` | `/en/blog` |
| Blog category | `/blog/category/:slug` | … |
| Blog post | `/blog/:slug` | `/en/blog/:slug` |
| Contact | `/contact` | `/en/contact` |
| Privacy policy | `/privacy` | `/en/privacy` |
| 404 | any | any |
| Admin | `/admin/*` (noindex, not in sitemap) | — |

## Global content

**Header nav:** الرئيسية · من نحن · خدماتنا · أعمالنا · المدونة · تواصل معنا (+ language switch, call button).
**Footer:** logo + short about line, quick links, services links, contact block (phones, email, address when provided, working hours when provided), social links (Instagram, TikTok — URLs from `site_settings`), CR number, VAT number when confirmed, copyright `© {year} شركة المصاعد المبتكرة`.
**Contact data:** phones `+966 12 423 1773`, `+966 55 955 7459` (also WhatsApp), unified number `9 2001 6876` (use 6876; see Part 14), email `info@almubtakirah.com`, website `almubtakirah.com`. All come from `site_settings`.

## Home page sections (in order)
1. **Hero** — H1: «المصاعد المبتكرة: صيانة وتحديث وتركيب المصاعد في جدة». Sub: ابتكار يرتفع بك. Two buttons: «اطلب عرض سعر» (→ contact) and «اتصل الآن». A small strip: صيانة · تحديث · تركيب · قطع غيار.
2. **About snapshot** — «شركة سعودية تأسست في جدة وتعمل في مجال توريد وتركيب وصيانة وتطوير وتحديث المصاعد بكافة أحجامها وأشكالها.» + link to About.
3. **Services** — 4 main cards (maintenance, modernization, installation, spare parts) + escalators/moving walkways card.
4. **Why choose us** — the 7 points listed under "Why us" below.
5. **Maintenance & modernization details** — the maintenance service list (8 items).
6. **Works** — latest 6 published works (hidden if none).
7. **Success partners** — logos from DB (hidden if none). Title: شركاء النجاح. Intro: «هم الأساس الذي نبني عليه تميزنا في المصاعد المبتكرة، فهم ثقتنا الممتدة وقوة استمراريتنا».
8. **Latest articles** — 3 latest posts (hidden if none).
9. **CTA band** — phone, WhatsApp, quote form link.

## About page
- Who we are (paragraph from profile).
- **Vision/Goal (رؤيتنا / أهدافنا):** «تقديم خدمات الصيانة الدائمة والاختبار والإصلاح بشكل متسق وفي الوقت المناسب لجميع ماركات وموديلات المصاعد والسلالم المتحركة والممرات المتحركة ومصاعد ذوي الاحتياجات الخاصة بما يتوافق مع رؤية المملكة 2030.»
- **Approach:** «نهجنا المخصص يركز على الحفاظ على ارتفاع كفاءة وسلامة وأمان عمليات نقل الأشخاص لديك بسلاسة وكفاءة وأمان.»
- **Mission/Safety:** «في المصاعد المبتكرة، نضع سلامة المستخدمين في المقام الأول ومهما كان الأمر، فإننا سنبذل قصارى جهدنا لتقديم حلول مبتكرة ترتقي بالتجربة للجميع.»
- Logo meaning (from brand book): rising lines = movement and progress, geometric form = precision and modern technology, blue gradients = trust, innovation, stability.
- Company facts box: CR number, CR number only (no founding date), city Jeddah, Civil Defense accredited.
- Partners strip.

English versions of the above (from the profile):
- "Saudi company established in Jeddah under the Commercial Registry No. 4030227058 issued by the Ministry of Commerce and Investment on 26/5/1433 AH, working in the field of supplying, installing, maintaining, developing, and modernizing elevators of all sizes and shapes."
- "Providing continuous maintenance, testing, and repair services in a consistent and timely manner for all brands and models of elevators, escalators, moving walkways, and lifts for people with special needs — in alignment with Saudi Vision 2030."
- "Our customized approach focuses on maintaining high efficiency, safety, and smooth operation in all your passenger transportation systems."
- "At Al Masaed Al Mubtakira, we place user safety as our top priority, and no matter the challenge, we strive to deliver innovative solutions that elevate the experience for everyone."

## Services content
Intro: «نفخر بكوننا مرنين ونقدم خطط الصيانة لدينا لتناسب احتياجاتك، وليس احتياجاتنا. نقدم خطط خدمة قابلة للتخصيص تلبي احتياجات العميل.»

**Maintenance services list (8):** مراقبة قفل الباب · استبدال الأسطوانة الهيدروليكية · استبدال وحدة الطاقة · استبدال معدات الباب · ترقيات تركيبات الإشارة · استبدال الصمام الرئيسي · تصميمات داخلية مخصصة للكابينة · استبدال باب المصعد.
(EN: Door lock monitoring · Hydraulic cylinder replacement · Power unit replacement · Door equipment replacement · Signal fixture upgrades · Main valve replacement · Customized cabin interiors · Elevator door replacement.)

**Modernization:** «نقدم حلول التحديث لجميع موديلات المصاعد والسلالم المتحركة والمسارات المتحركة والمصاعد المساعدة. من مصعد هيدروليكي واحد للمباني عالية الفئة A إلى المكاتب التجارية، سنقوم بتقديم الحل الذي يناسب ميزانيتك.»

**Why us (7 points):**
1. خدمات إصلاح عالية الجودة
2. سجل قوي للسلامة ورضا العملاء
3. شبكة موردين واسعة للتنفيذ بشكل أسرع
4. فرق الاستجابة للطوارئ للحالات الحرجة
5. حلول سريعة لتشغيل المعدات بأفضل أداء
6. فنيون مدربون وذوو خبرة متاحون
7. وقت استجابة في نفس اليوم

### Service page template (each of the 5 pages)
H1 with service + city keyword · intro (120–180 words, original, written for the service) · what is included (list) · process steps · types of equipment covered · FAQ block (4–6 Q&A, also output as FAQPage schema) · related works (DB, by `service_type`) · related articles · CTA band · breadcrumbs.
Copy for the three services without profile text (installation, spare parts, escalators) must be written by a human editor or supplied by the owner; the agent writes a first draft in plain business Arabic based only on facts above and flags it for review in `PROGRESS.md`.

## Works page
Grid of published works (cover, title, service type, year, location). Filter by service type. Detail page: title, description, key facts, gallery (lightbox), CTA. If no works exist, show a short message and CTA, and keep the page `noindex` until at least one work is published.
Real works content is supplied by the owner (the profile PDF has 6 pages of work images, pp. 8–13).

## Contact page
Form: الاسم، رقم الجوال، البريد (اختياري)، نوع الخدمة (select), الرسالة. Honeypot field + time check. Success message. Side panel: phones, WhatsApp, email, address, hours, map (link or embed, only when address provided), CR.
Form posts to `contact_submissions`. Fire `dataLayer` event `contact_form_submit` on success (prepared for GTM).

## Privacy policy
Short, plain Arabic/English policy covering: what the contact form collects, how it is used, retention, contact email, cookies/analytics (to be enabled later). Saudi PDPL aware. Must be reviewed by the owner.

## Voice and tone
Business Arabic, clear and direct, written to a building owner or facility manager. Short sentences. Concrete nouns (المصعد، الباب، الكابينة، لوحة التحكم). No marketing filler. See `09-natural-look-rules.md`.

## SEO keyword map (starting point)
| Page | Primary keyword | Secondary |
|---|---|---|
| Home | شركة مصاعد في جدة | صيانة مصاعد، تركيب مصاعد، تحديث مصاعد |
| Maintenance | صيانة مصاعد في جدة | عقد صيانة مصاعد، صيانة مصاعد دورية، صيانة مصاعد هيدروليكية |
| Modernization | تحديث المصاعد | تطوير مصاعد قديمة، استبدال وحدة الطاقة |
| Installation | تركيب مصاعد في جدة | توريد وتركيب مصاعد، مصاعد للمباني السكنية |
| Spare parts | قطع غيار مصاعد | قطع غيار مصاعد هيدروليكية، استبدال صمام رئيسي |
| Escalators | صيانة سلالم متحركة | ممرات متحركة، مصاعد ذوي الاحتياجات الخاصة |
Do not claim service areas other than Jeddah until it is added in `site_settings`.

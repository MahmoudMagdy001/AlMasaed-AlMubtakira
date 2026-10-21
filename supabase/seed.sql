-- ---------------------------------------------------------------
-- seed.sql: Comprehensive Seed Data for All Tables
-- ---------------------------------------------------------------

-- 0. Clean up any partially seeded records from prior runs to ensure idempotent re-runs
delete from public.post_tags where post_id in (select id from public.posts where id::text like 'd0000001%');
delete from public.posts where id::text like 'd0000001%';
delete from public.partners where id::text like 'f0000001%';
delete from public.works where id::text like 'e0000001%';
delete from public.media where id::text like 'a0000001%';

-- 1. Site Settings Updates
insert into public.site_settings (key, value) values
  ('company', jsonb_build_object(
    'name_ar', 'شركة المصاعد المبتكرة',
    'name_en', 'Innovative Elevators Co.',
    'slogan_ar', 'ابتكار يرتفع بك',
    'slogan_en', 'Innovation that elevates you',
    'tagline_ar', 'حلول متكاملة للمصاعد والسلالم الكهربائية في جدة',
    'tagline_en', 'Integrated elevator and escalator solutions in Jeddah',
    'cr_number', '4030227058',
    'city_ar', 'جدة',
    'city_en', 'Jeddah',
    'accreditation_ar', 'معتمدون من المديرية العامة للدفاع المدني',
    'accreditation_en', 'Civil Defense Accredited'
  )),
  ('contact', jsonb_build_object(
    'phones', jsonb_build_array('+966124231773', '+966559557459'),
    'whatsapp', '966559557459',
    'unified_number', '920016876',
    'email', 'info@almubtakirah.com',
    'city_ar', 'جدة',
    'city_en', 'Jeddah',
    'address_ar', 'طريق الملك عبد العزيز، حي الروضة، جدة، المملكة العربية السعودية',
    'address_en', 'King Abdulaziz Road, Al Rawdah District, Jeddah, Saudi Arabia',
    'working_hours_ar', 'السبت - الخميس: 8:00 ص - 6:00 م | طوارئ 24/7',
    'working_hours_en', 'Sat - Thu: 8:00 AM - 6:00 PM | 24/7 Emergency',
    'map_url', 'https://maps.google.com/?q=Jeddah+Saudi+Arabia'
  )),
  ('social', jsonb_build_object(
    'instagram', 'https://instagram.com/almubtakirah',
    'tiktok', 'https://tiktok.com/@almubtakirah',
    'x', 'https://x.com/almubtakirah',
    'linkedin', 'https://linkedin.com/company/almubtakirah',
    'snapchat', null
  )),
  ('tax', jsonb_build_object(
    'vat_number', '300456789000003'
  )),
  ('analytics', jsonb_build_object(
    'gtm_id', 'GTM-ALMUBT',
    'gsc_verification', 'almubtakirah_gsc_token'
  ))
on conflict (key) do update set
  value = excluded.value,
  updated_at = now();

-- 2. Blog Categories
insert into public.categories (slug, name_ar, name_en, description_ar, description_en, seo_title, seo_description, sort_order) values
  ('elevator-maintenance', 'صيانة المصاعد', 'Elevator Maintenance', 'إرشادات ومعايير الصيانة الوقائية والطارئة للمصاعد الكهربائية والهيدروليكية في جدة.', 'Guidelines and best practices for preventive and emergency elevator maintenance in Jeddah.', 'مقالات صيانة المصاعد في جدة | شركة المصاعد المبتكرة', 'دليل شامل عن صيانة المصاعد الدورية واكتشاف الأعطال وعقود الصيانة المعتمدة في جدة.', 1),
  ('elevator-modernization', 'تحديث المصاعد', 'Elevator Modernization', 'حلول ترقية وتجديد أنظمة التحكم والمحركات وتصميم الكبائن للمباني القديمة والقائمة.', 'Modernization solutions for control panels, traction machines, and cabin interiors in existing buildings.', 'دليل تحديث وتطوير المصاعد القديمة | شركة المصاعد المبتكرة', 'كل ما تحتاج معرفته حول ترقية مصعدك، تحسين كفاءة الطاقة، وتجديد الديكور الداخلي للكبائن.', 2),
  ('elevator-safety', 'السلامة في المصاعد', 'Elevator Safety', 'معايير واشتراطات السلامة واللوائح المعتمدة من الدفاع المدني لسلامة الركاب والمشغلين.', 'Civil Defense standards, safety regulations, and operational requirements for elevator passenger safety.', 'معايير واشتراطات سلامة المصاعد | شركة المصاعد المبتكرة', 'تعرف على اشتراطات الدفاع المدني السعودي، بطاريات الإنزال الاضطراري، وأجهزة السلامة بالمصاعد.', 3),
  ('spare-parts', 'قطع الغيار', 'Spare Parts', 'دليل المكونات الميكانيكية والكهربائية الأصلية وطرق اختيار القطع المتوافقة والمعتمدة.', 'Guide to genuine mechanical and electrical components, compatibility, and certified supplies.', 'دليل قطع غيار المصاعد الأصلية | شركة المصاعد المبتكرة', 'طرق تمييز قطع غيار المصاعد الإيطالية واليابانية الأصلية وتجنب أضرار القطع المقلدة.', 4),
  ('company-news', 'أخبار الشركة', 'Company News', 'مستجدات مشاريع وإنجازات شركة المصاعد المبتكرة في المنطقة الغربية.', 'Latest updates, project milestones, and achievements of Innovative Elevators Co.', 'أخبار ومشاريع المصاعد المبتكرة في جدة | شركة المصاعد المبتكرة', 'مستجدات المشاريع المنفذة وتوسعات عقود الصيانة والتوريد لشركة المصاعد المبتكرة بجدة.', 5)
on conflict (slug) do update set
  name_ar = excluded.name_ar,
  name_en = excluded.name_en,
  description_ar = excluded.description_ar,
  description_en = excluded.description_en,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  sort_order = excluded.sort_order;

-- 3. Tags
insert into public.tags (id, slug, name_ar, name_en) values
  ('c0000001-0000-0000-0000-000000000001', 'periodic-maintenance', 'صيانة دورية', 'Periodic Maintenance'),
  ('c0000001-0000-0000-0000-000000000002', 'civil-defense', 'الدفاع المدني', 'Civil Defense'),
  ('c0000001-0000-0000-0000-000000000003', 'safety-regulations', 'لوائح السلامة', 'Safety Regulations'),
  ('c0000001-0000-0000-0000-000000000004', 'modernization', 'تحديث المصاعد', 'Modernization'),
  ('c0000001-0000-0000-0000-000000000005', 'genuine-parts', 'قطع غيار أصلية', 'Genuine Spare Parts'),
  ('c0000001-0000-0000-0000-000000000006', 'hydraulic-elevators', 'مصاعد هيدروليكية', 'Hydraulic Elevators'),
  ('c0000001-0000-0000-0000-000000000007', 'jeddah', 'مشاريع جدة', 'Jeddah Projects')
on conflict (slug) do update set
  name_ar = excluded.name_ar,
  name_en = excluded.name_en;

-- 4. Media Items (All unique storage_paths and IDs)
insert into public.media (id, file_name, storage_path, mime_type, size_bytes, width, height, alt_text, title, folder) values
  -- Works Cover Images
  ('a0000001-0000-0000-0000-000000000001', 'andalus-tower-cover.webp', 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=1200&q=80', 'image/webp', 95200, 1200, 800, 'مصاعد برج الأندلس التجاري في جدة', 'برج الأندلس التجاري', 'works'),
  ('a0000001-0000-0000-0000-000000000002', 'rawdah-residential-cover.webp', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', 'image/webp', 88400, 1200, 800, 'صيانة مصاعد مجمع الروضة السكني', 'مجمع الروضة السكني', 'works'),
  ('a0000001-0000-0000-0000-000000000003', 'tahlia-center-cover.webp', 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80', 'image/webp', 104500, 1200, 800, 'سلالم كهربائية في مركز التحلية التجاري', 'مركز التحلية للتسوق', 'works'),
  ('a0000001-0000-0000-0000-000000000004', 'saraya-hotel-cover.webp', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', 'image/webp', 92100, 1200, 800, 'تحديث مصاعد فندق سرايا الشاطئ', 'فندق سرايا الشاطئ', 'works'),
  ('a0000001-0000-0000-0000-000000000005', 'nokhba-medical-cover.webp', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', 'image/webp', 84300, 1200, 800, 'مصاعد مجمع النخبة الطبي بجدة', 'مجمع النخبة الطبي', 'works'),
  ('a0000001-0000-0000-0000-000000000006', 'united-business-cover.webp', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'image/webp', 99800, 1200, 800, 'مقر الأعمال المتحدة بطريق المدينة', 'مقر الأعمال المتحدة', 'works'),

  -- Works Gallery Images
  ('a0000001-0000-0000-0000-000000000011', 'gallery-cabin-interior.webp', 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80', 'image/webp', 89000, 1200, 800, 'التصميم الداخلي لكابينة المصعد', 'كابينة ستانلس ستيل', 'works'),
  ('a0000001-0000-0000-0000-000000000012', 'gallery-control-panel.webp', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', 'image/webp', 91200, 1200, 800, 'لوحة تحكم إلكترونية حديثة للمصعد', 'لوحة تحكم ذكية', 'works'),
  ('a0000001-0000-0000-0000-000000000013', 'gallery-escalator-view.webp', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80', 'image/webp', 94000, 1200, 800, 'مسار السلالم الكهربائية المتطورة', 'سلم كهربائي تجاري', 'works'),
  ('a0000001-0000-0000-0000-000000000014', 'gallery-shaft-mechanism.webp', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'image/webp', 87000, 1200, 800, 'منظومة الجر والسكك الحديدية في بئر المصعد', 'بئر المصعد والسكك', 'works'),

  -- Blog Featured Images
  ('a0000001-0000-0000-0000-000000000021', 'blog-maintenance-guide.webp', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80', 'image/webp', 93400, 1200, 800, 'فني صيانة يفحص لوحة تحكم المصعد في جدة', 'دليل الصيانة الدورية', 'blog'),
  ('a0000001-0000-0000-0000-000000000022', 'blog-modernization-signs.webp', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', 'image/webp', 98100, 1200, 800, 'أعمال تحديث كابينة ومحرك مصعد قديم', 'تحديث المصاعد القديمة', 'blog'),
  ('a0000001-0000-0000-0000-000000000023', 'blog-civil-defense.webp', 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80', 'image/webp', 88500, 1200, 800, 'فحص أجهزة السلامة واشتراطات الدفاع المدني', 'اشتراطات الدفاع المدني', 'blog'),
  ('a0000001-0000-0000-0000-000000000024', 'blog-spare-parts.webp', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', 'image/webp', 92300, 1200, 800, 'قطع غيار مصاعد أصلية ومحركات سحب', 'قطع غيار المصاعد الأصلية', 'blog'),

  -- Partner Logos (Each with distinct query parameter to guarantee unique storage_path)
  ('a0000001-0000-0000-0000-000000000031', 'partner-fuji.webp', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=fuji', 'image/webp', 15000, 400, 200, 'شعار فوجي للمصاعد', 'Fuji Elevators', 'partners'),
  ('a0000001-0000-0000-0000-000000000032', 'partner-montanari.webp', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=montanari', 'image/webp', 15000, 400, 200, 'شعار مونتاناري جوليو', 'Montanari Giulio', 'partners'),
  ('a0000001-0000-0000-0000-000000000033', 'partner-sicor.webp', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=sicor', 'image/webp', 15000, 400, 200, 'شعار سيكور إيطاليا', 'Sicor SpA', 'partners'),
  ('a0000001-0000-0000-0000-000000000034', 'partner-wittur.webp', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=wittur', 'image/webp', 15000, 400, 200, 'شعار مجموعة ويتور', 'Wittur Group', 'partners'),
  ('a0000001-0000-0000-0000-000000000035', 'partner-sassi.webp', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=sassi', 'image/webp', 15000, 400, 200, 'شعار ألبرتو ساسي', 'Alberto Sassi', 'partners'),
  ('a0000001-0000-0000-0000-000000000036', 'partner-fermator.webp', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=fermator', 'image/webp', 15000, 400, 200, 'شعار فيرماتور للأبواب', 'Fermator Group', 'partners')
on conflict (id) do update set
  file_name = excluded.file_name,
  storage_path = excluded.storage_path,
  mime_type = excluded.mime_type,
  size_bytes = excluded.size_bytes,
  width = excluded.width,
  height = excluded.height,
  alt_text = excluded.alt_text,
  title = excluded.title,
  folder = excluded.folder;

-- 5. Works (Projects)
insert into public.works (id, slug, title_ar, title_en, description_ar, description_en, service_type, location_ar, location_en, completed_year, cover_media_id, gallery_media_ids, seo_title, seo_description, is_published, sort_order) values
  (
    'e0000001-0000-0000-0000-000000000001',
    'andalus-commercial-tower',
    'توريد وتركيب 4 مصاعد ذكية لبرج الأندلس التجاري',
    'Supply & Installation of 4 Smart Elevators at Al Andalus Commercial Tower',
    'إنجاز توريد وتركيب أربعة مصاعد ركاب سريعة بدون غرفة محركات (MRL) مع كبائن ستانلس ستيل مخصصة، وشاشات إشارة رقمية متطورة، ونظام إدارة حركة ذكي للمكاتب والشركات.',
    'Complete turnkey supply and installation of four machine-room-less (MRL) high-speed passenger elevators with customized stainless-steel cabins, digital signal fixtures, and intelligent traffic management.',
    'installation',
    'طريق الملك عبد العزيز، جدة',
    'King Abdulaziz Road, Jeddah',
    2024,
    'a0000001-0000-0000-0000-000000000001',
    array['a0000001-0000-0000-0000-000000000011'::uuid, 'a0000001-0000-0000-0000-000000000012'::uuid],
    'مشروع مصاعد برج الأندلس بجدة | شركة المصاعد المبتكرة',
    'تفاصيل مشروع توريد وتركيب أربعة مصاعد ركاب سريعة MRL لبرج الأندلس التجاري بطريق الملك في جدة.',
    true,
    1
  ),
  (
    'e0000001-0000-0000-0000-000000000002',
    'rawdah-residential-complex',
    'عقد الصيانة الشاملة لمصاعد مجمع الروضة السكني',
    'Comprehensive Elevator Maintenance Contract for Al Rawdah Residential Complex',
    'تولي إدارة وتشغيل الصيانة الوقائية الشهرية لثمانية مصاعد سكنية مع خدمة طوارئ واستجابة على مدار الساعة، وتوفير قطع الغيار الأصلية والفحص الدوري المعتمد من الدفاع المدني.',
    'Full preventive monthly maintenance management for eight residential elevators with round-the-clock emergency response, genuine spare parts replacement, and certified Civil Defense inspections.',
    'maintenance',
    'حي الروضة، جدة',
    'Al Rawdah District, Jeddah',
    2023,
    'a0000001-0000-0000-0000-000000000002',
    array['a0000001-0000-0000-0000-000000000012'::uuid, 'a0000001-0000-0000-0000-000000000014'::uuid],
    'صيانة مصاعد مجمع الروضة بجدة | شركة المصاعد المبتكرة',
    'عقد صيانة شاملة دورية لـ 8 مصاعد سكنية في حي الروضة بجدة مع استجابة طوارئ على مدار الساعة.',
    true,
    2
  ),
  (
    'e0000001-0000-0000-0000-000000000003',
    'tahlia-shopping-center',
    'توريد وتركيب سلالم كهربائية بمركز التحلية للتسوق',
    'Turnkey Escalators Installation at Tahlia Shopping Center',
    'توريد وتركيب ستة سلالم كهربائية تجارية ذات كفاءة طاقة عالية مع حساسات توقف وتوفير حركة تلقائية، وتجهيزات أمان متكاملة مطابقة للمواصفات السعودية.',
    'Turnkey supply and installation of six energy-efficient commercial escalators with automated standby motion sensors and full safety compliance per Saudi standard regulations.',
    'escalators',
    'شارع التحلية، جدة',
    'Tahlia Street, Jeddah',
    2024,
    'a0000001-0000-0000-0000-000000000003',
    array['a0000001-0000-0000-0000-000000000013'::uuid],
    'تركيب سلالم كهربائية مركز التحلية | شركة المصاعد المبتكرة',
    'مشروع تركيب 6 سلالم كهربائية تجارية متطورة بمركز التحلية للتسوق بجدة.',
    true,
    3
  ),
  (
    'e0000001-0000-0000-0000-000000000004',
    'saraya-hotel-modernization',
    'تحديث وتطوير منظومة مصاعد فندق سرايا الشاطئ',
    'Modernization of Elevator Systems at Saraya Beach Hotel',
    'تحديث شامل لثلاثة مصاعد ركاب قديمة شمل استبدال لوحات التحكم بأنظمة تحكم دقيقة (VVVF)، وتجديد الديكور الداخلي للكبائن، وتحديث مشغلات الأبواب لرفع الأمان وتقليل استهلاك الكهرباء.',
    'Complete modernization of three legacy passenger elevators including control panel upgrade to microcomputer VVVF drive controllers, cabin interior redesign, and door operator replacement.',
    'modernization',
    'حي الشاطئ، جدة',
    'Al Shati District, Jeddah',
    2025,
    'a0000001-0000-0000-0000-000000000004',
    array['a0000001-0000-0000-0000-000000000011'::uuid, 'a0000001-0000-0000-0000-000000000014'::uuid],
    'تحديث مصاعد فندق سرايا الشاطئ بجدة | شركة المصاعد المبتكرة',
    'مشروع ترقية وتحديث 3 مصاعد فندقية في حي الشاطئ بجدة مع تركيب أنظمة توفير الطاقة VVVF.',
    true,
    4
  ),
  (
    'e0000001-0000-0000-0000-000000000005',
    'nokhba-medical-center',
    'عقد صيانة وفحص دوري لمصاعد مجمع النخبة الطبي',
    'Preventive Maintenance for Al Nokhba Medical Center Elevators',
    'عقد صيانة تخصصي لمصاعد الأسرة والمصاعد الطبية يضمن أعلى درجات النظافة وسلاسة التوقف والوقوف الدقيق على الطوابق، مع برنامج فحص أسبوعي وتدقيق معايير السلامة الحيوية.',
    'Specialized maintenance contract for hospital bed elevators ensuring ultra-smooth acceleration, precise floor leveling, weekly mechanical checks, and strict safety audits.',
    'maintenance',
    'حي الحمراء، جدة',
    'Al Hamra District, Jeddah',
    2024,
    'a0000001-0000-0000-0000-000000000005',
    array['a0000001-0000-0000-0000-000000000012'::uuid],
    'صيانة مصاعد مجمع النخبة الطبي بجدة | شركة المصاعد المبتكرة',
    'برنامج الصيانة الوقائية المتخصصة لمصاعد المستشفيات والعيادات الطبية في حي الحمراء بجدة.',
    true,
    5
  ),
  (
    'e0000001-0000-0000-0000-000000000006',
    'united-business-headquarters',
    'توريد قطع غيار وتجديد ماكينات مقر الأعمال المتحدة',
    'Spare Parts Supply & Machine Overhaul at United Business Headquarters',
    'توريد وتركيب ماكينات سحب إيطالية أصلية، وأحبال جر معتمدة، وأجهزة أمان باراشوت بديلة متوافقة مع متطلبات المبنى العالي وحمولات التشغيل المكثف.',
    'Supply and installation of certified Italian traction machines, governor ropes, and safety gears suited for high-cycle commercial operations.',
    'spare-parts',
    'طريق المدينة المنورة، جدة',
    'Madinah Road, Jeddah',
    2023,
    'a0000001-0000-0000-0000-000000000006',
    array['a0000001-0000-0000-0000-000000000014'::uuid],
    'توريد قطع غيار مقر الأعمال بجدة | شركة المصاعد المبتكرة',
    'مشروع توريد وتجديد ماكينات السحب وأحبال الجر لمقر الأعمال المتحدة بطريق المدينة في جدة.',
    true,
    6
  )
on conflict (slug) do update set
  title_ar = excluded.title_ar,
  title_en = excluded.title_en,
  description_ar = excluded.description_ar,
  description_en = excluded.description_en,
  service_type = excluded.service_type,
  location_ar = excluded.location_ar,
  location_en = excluded.location_en,
  completed_year = excluded.completed_year,
  cover_media_id = excluded.cover_media_id,
  gallery_media_ids = excluded.gallery_media_ids,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order;

-- 6. Partners
insert into public.partners (id, name_ar, name_en, logo_media_id, website_url, sort_order, is_published) values
  ('f0000001-0000-0000-0000-000000000001', 'فوجي للمصاعد', 'Fuji Elevators', 'a0000001-0000-0000-0000-000000000031', 'https://www.fujielevator.com', 1, true),
  ('f0000001-0000-0000-0000-000000000002', 'مونتاناري جوليو', 'Montanari Giulio & C.', 'a0000001-0000-0000-0000-000000000032', 'https://www.montanarigiulio.com', 2, true),
  ('f0000001-0000-0000-0000-000000000003', 'سيكور إيطاليا', 'Sicor SpA', 'a0000001-0000-0000-0000-000000000033', 'https://www.sicor-spa.it', 3, true),
  ('f0000001-0000-0000-0000-000000000004', 'مجموعة ويتور', 'Wittur Group', 'a0000001-0000-0000-0000-000000000034', 'https://www.wittur.com', 4, true),
  ('f0000001-0000-0000-0000-000000000005', 'ألبرتو ساسي', 'Alberto Sassi S.p.A.', 'a0000001-0000-0000-0000-000000000035', 'https://www.sassi.it', 5, true),
  ('f0000001-0000-0000-0000-000000000006', 'فيرماتور للأبواب', 'Fermator Group', 'a0000001-0000-0000-0000-000000000036', 'https://www.fermator.com', 6, true)
on conflict (id) do update set
  name_ar = excluded.name_ar,
  name_en = excluded.name_en,
  logo_media_id = excluded.logo_media_id,
  website_url = excluded.website_url,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published;

-- 7. Blog Posts (4 Bilingual Pairs = 8 Posts)
insert into public.posts (
  id, lang, translation_key, slug, title, excerpt, content_html, featured_image_id, featured_image_alt, category_id, status, published_at, reading_time_min,
  seo_title, seo_description, focus_keyword, secondary_keywords, schema_type, faq, seo_score
) values
  -- Post 1 AR
  (
    'd0000001-0000-0000-0000-000000000001',
    'ar',
    'b0000001-0000-0000-0000-000000000001',
    'dalil-seyana-dawriah-masaid-jeddah',
    'دليل الصيانة الدورية للمصاعد في جدة: حماية المنظومة وسلامة الركاب',
    'تعرف على البنود الأساسية لفحص المصاعد الشهري في مدينة جدة وتأثير الرطوبة والغبار على الأجهزة الكهربائية والميكانيكية وكيفية الحفاظ على عمر المصعد الافتراضي.',
    '<h2>أهمية الصيانة الوقائية المنتظمة لمصاعد المباني</h2><p>تتطلب المصاعد في مدينة جدة عناية تشغيلية خاصة نظراً لارتفاع معدلات الرطوبة الجوية والغبار العالق، مما يسرع من أكسدة المكونات المعدنية وتراكم الأتربة على لوحات التحكم والحساسات الإلكترونية. تعمل الصيانة الدورية المنتظمة على رصد التآكل الطفيف ومعالجته قبل تحوله إلى عطل مفاجئ يوقف المصعد ويسبب إزعاجاً للسكان.</p><h2>البنود الأساسية في الفحص الشهري للمصعد</h2><p>يشمل برنامج الفحص الدوري المعتمد من فرق الصيانة لدينا ثمانية محاور رئيسية تضمن عمل المصعد وفق أعلى معايير الأمان:</p><ul><li>فحص أحبال الجر وقياس نسبة الاستطالة والتآكل.</li><li>تنظيف مجاري الأبواب وتشحيم بكرات الفتح والإغلاق الأوتوماتيكي.</li><li>اختبار جهاز الباراشوت (فرامل الأمان الهبوطية) ومحدد السرعة.</li><li>معايرة دقة توقف الكابينة ومحاذاتها لمستوى أرضية الدور لمنع التعثر.</li><li>فحص بطاريات جهاز الإنزال الاضطراري (ARD) والتأكد من شحنها الكامل.</li><li>قياس مقاومة العزل للمحرك وفحص مستوى الزيت في صندوق التروس للمصاعد الهيدروليكية.</li><li>اختبار إنارة الطوارئ وجرس الإنذار وزر الاتصال الداخلي.</li><li>فحص مفاتيح نهاية المشوار وحساسات تجاوز الحدود العلوية والسفلية.</li></ul><h2>الفرق بين عقود الصيانة الشاملة والصيانة العادية</h2><p>توفر عقود الصيانة الشاملة راحة بال تامة لمديري المباني وملاك العقارات؛ إذ تتضمن الزيارات الشهرية المجدولة، وتغطية استبدال قطع الغيار الاستهلاكية التالفة بدون فواتير إضافية، مع أولوية قصوى لفرق التدخل السريع في حالات الطوارئ والبلاغات الحرجة على مدار الساعة.</p>',
    'a0000001-0000-0000-0000-000000000021',
    'فني صيانة يفحص لوحة تحكم المصعد في جدة',
    (select id from public.categories where slug = 'elevator-maintenance'),
    'published',
    now() - interval '6 days',
    4,
    'دليل الصيانة الدورية للمصاعد بجدة | شركة المصاعد المبتكرة',
    'دليل تفصيلي حول البنود الأساسية في الفحص الشهري للمصاعد في جدة وأهمية الصيانة الوقائية لتفادي الأعطال المفاجئة.',
    'صيانة مصاعد في جدة',
    array['فحص المصعد الشهري', 'عقد صيانة مصاعد', 'سلامة المصاعد'],
    'BlogPosting',
    '[
      {"q": "كم مرة يحتاج المصعد للفحص الدوري؟", "a": "توصي اشتراطات الدفاع المدني والمواصفات السعودية بإجراء فحص شهري دوري منتظم لجميع المصاعد العاملة في المباني السكنية والتجارية."},
      {"q": "ما هي أبرز أسباب توقف المصاعد المفاجئ في جدة؟", "a": "تراكم الأتربة في مجاري الأبواب وتأثر لوحات التحكم بالرطوبة وتذبذب التيار الكهربائي هي أكثر العوامل المسببة لتوقف المصاعد."},
      {"q": "هل يتضمن عقد الصيانة خدمة البلاغات الطارئة؟", "a": "نعم، توفر شركة المصاعد المبتكرة فرق استجابة سريعة على مدار 24 ساعة للبلاغات الحرجة وحالات احتجاز الركاب."}
    ]'::jsonb,
    92
  ),

  -- Post 1 EN (Twin)
  (
    'd0000001-0000-0000-0000-000000000002',
    'en',
    'b0000001-0000-0000-0000-000000000001',
    'periodic-elevator-maintenance-guide-jeddah',
    'Periodic Elevator Maintenance Guide in Jeddah: Protecting Systems & Safety',
    'Learn about the essential monthly elevator inspection checkpoints in Jeddah, the impact of coastal humidity, and preventive practices that extend equipment lifespan.',
    '<h2>The Importance of Preventive Maintenance for Building Elevators</h2><p>Elevators operating in Jeddah require dedicated technical care due to coastal humidity and airborne fine dust. These environmental factors accelerate mechanical wear and dust buildup on delicate microcomputer boards and door tracks. Scheduled preventive inspections detect minor friction and wear before they evolve into unexpected breakdowns.</p><h2>Core Inspection Checkpoints During Monthly Service</h2><p>Our certified elevator service procedure covers eight critical safety and operational checkpoints:</p><ul><li>Inspection of suspension ropes for wear, tension balance, and elongation.</li><li>Cleaning of door landing sills and lubrication of automated door drive pulleys.</li><li>Testing overspeed governors and car safety gear engagement.</li><li>Calibration of precise floor leveling to prevent trip hazards at landings.</li><li>Verification of automatic rescue device (ARD) battery health and charger functionality.</li><li>Motor insulation resistance measurement and hydraulic power unit oil quality checks.</li><li>Testing emergency lighting, car alarm bell, and intercom functions.</li><li>Inspection of terminal limit switches and directional safety buffers in the pit.</li></ul><h2>Choosing the Right Maintenance Contract</h2><p>A comprehensive maintenance agreement provides complete peace of mind for property managers. It includes scheduled monthly inspections, covered replacement of consumable mechanical parts, and immediate round-the-clock priority dispatch for emergency callouts.</p>',
    'a0000001-0000-0000-0000-000000000021',
    'Elevator technician inspecting control panel in Jeddah',
    (select id from public.categories where slug = 'elevator-maintenance'),
    'published',
    now() - interval '6 days',
    4,
    'Periodic Elevator Maintenance Guide Jeddah | Innovative Elevators',
    'Comprehensive guide on monthly elevator inspection procedures and preventive maintenance standards in Jeddah, Saudi Arabia.',
    'elevator maintenance jeddah',
    array['monthly elevator inspection', 'maintenance contract', 'elevator safety'],
    'BlogPosting',
    '[
      {"q": "How often should an elevator be inspected?", "a": "Civil Defense regulations and Saudi standards mandate monthly scheduled preventive maintenance for all commercial and residential elevators."},
      {"q": "What causes sudden elevator stoppages in coastal areas?", "a": "Fine dust in door tracks, humidity affecting electronic relay contacts, and electrical fluctuations are the most common causes."},
      {"q": "Does the maintenance agreement include emergency rescue?", "a": "Yes, Innovative Elevators Co. maintains round-the-clock rapid emergency response teams for urgent issues."}
    ]'::jsonb,
    90
  ),

  -- Post 2 AR
  (
    'd0000001-0000-0000-0000-000000000003',
    'ar',
    'b0000001-0000-0000-0000-000000000002',
    'alamat-tahdeeth-al-masaid-al-qadeemah',
    '5 علامات تدل على ضرورة تحديث وتطوير مصعدك القديم',
    'تعرف على المؤشرات الفنية والاقتصادية التي تحتم الانتقال من مرحلة الصيانة المتكررة إلى ترقية وتحديث أنظمة المصعد لرفع الكفاءة وتوفير الطاقة.',
    '<h2>متى يصبح المصعد بحاجة إلى التحديث بدلا من الصيانة؟</h2><p>يبلغ العمر الافتراضي لمنظومة المصعد الميكانيكية والكهربائية ما بين 15 إلى 20 عاماً. بعد هذه الفترة، تبدأ تكاليف الصيانة المتكررة في تجاوز الجدوى الاقتصادية، وتصبح قطع الغيار الأصلية للوحات التحكم المتقادمة نادرة أو غير متوفرة في الأسواق، مما يجعل التحديث الجزئي أو الشامل الحل الأمثل والآمن للمبنى.</p><h2>العلامات الخمس الفاصلة لقرار التحديث</h2><p>إذا لاحظت أياً من العلامات التالية في مصعد المبنى لديك، فقد حان الوقت لإجراء تقييم هندسي لترقية المنظومة:</p><ul><li><strong>تكرار التوقف المفاجئ والأعطال:</strong> حدوث أعطال متقاربة شهرياً رغم إجراء الصيانة الدورية.</li><li><strong>عدم دقة الوقوف على الطوابق:</strong> توقف الكابينة بارتفاع أو انخفاض عن مستوى أرضية الدور، مما يشكل خطراً حقيقياً لتعثر الركاب.</li><li><strong>الاهتزاز والصوت المرتفع:</strong> صدور أصوات احتكاك قوية أثناء الحركة أو اهتزاز الكابينة عند التسارع والتباطؤ.</li><li><strong>ارتفاع فاتورة استهلاك الكهرباء:</strong> استهلاك المحركات القديمة غير المزودة بمغير سرعة (Inverter/VVVF) لكميات مضاعفة من الطاقة.</li><li><strong>تقادم المظهر وتلف الديكور:</strong> تآكل أزرار الطلب وشاشات الإشارة وتهالك أرضية وجدران الكابينة الداخلية.</li></ul><h2>مزايا ترقية لوحة التحكم إلى تقنية VVVF الحديثة</h2><p>توفر الترقية إلى لوحات التحكم الإلكترونية الذكية وتقنية التردد المتغير (VVVF) حركة سلسة تماماً عند الانطلاق والتوقف، وتخفض استهلاك الطاقة الكهربائية بنسبة تصل إلى 40%، فضلاً عن رفع موثوقية الأبواب وتقليل معدل الأعطال بنسبة تتجاوز 80%.</p>',
    'a0000001-0000-0000-0000-000000000022',
    'تحديث وتطوير مصعد قديم في مبنى تجاري',
    (select id from public.categories where slug = 'elevator-modernization'),
    'published',
    now() - interval '4 days',
    5,
    'علامات تحديث وتطوير المصاعد القديمة | شركة المصاعد المبتكرة',
    'اكتشف العلامات الخمس التي تؤكد ضرورة تحديث مصعدك القديم وكيف تساهم تقنية VVVF في توفير الطاقة ورفع الأمان.',
    'تحديث المصاعد',
    array['تطوير المصاعد القديمة', 'لوحة تحكم المصعد', 'توفير طاقة المصعد'],
    'BlogPosting',
    '[
      {"q": "هل يتطلب التحديث استبدال المصعد بالكامل؟", "a": "ليس بالضرورة؛ إذ يمكن إجراء تحديث جزئي يشمل لوحة التحكم ومحرك الباب والديكور الداخلي مع الإبقاء على سكك التوجيه وهيكل البئر السليم."},
      {"q": "كم تستغرق عملية تحديث المصعد؟", "a": "تستغرق أعمال التحديث التخصصي في المتوسط من 5 إلى 10 أيام عمل حسب نطاق الترقية وتوافر المكونات."},
      {"q": "ما مقدار الطاقة التي توفرها أنظمة VVVF الحديثة؟", "a": "تصل نسبة توفير الطاقة إلى نحو 40% مقارنة بالمحركات التقليدية ثنائية السرعة القديمة."}
    ]'::jsonb,
    88
  ),

  -- Post 2 EN (Twin)
  (
    'd0000001-0000-0000-0000-000000000004',
    'en',
    'b0000001-0000-0000-0000-000000000002',
    'signs-your-legacy-elevator-needs-modernization',
    '5 Signs Your Legacy Elevator Needs Modernization',
    'Discover the key technical indicators and operational signals that show it is time to upgrade your aging elevator system to improve reliability and efficiency.',
    '<h2>When Does an Elevator Need Modernization Rather Than Repairs?</h2><p>The standard operational lifecycle of elevator mechanical and electrical assemblies ranges between 15 and 20 years. Beyond this milestone, recurrent maintenance expenses often exceed economic sense, and genuine replacement components for obsolete controllers become scarce. Modernization presents a cost-effective, durable path to renew performance without rebuilding the entire shaft.</p><h2>Five Key Signs It Is Time to Upgrade</h2><p>If your building elevator exhibits any of the following symptoms, an engineering assessment for modernization is strongly advised:</p><ul><li><strong>Frequent Unscheduled Downtime:</strong> Recurring service disruptions occurring monthly despite routine upkeep.</li><li><strong>Inaccurate Floor Leveling:</strong> Misalignment between car sill and landing floors, presenting dangerous trip hazards.</li><li><strong>Cabin Vibration and Loud Mechanical Noise:</strong> Excessive shudder during travel or harsh mechanical noises during braking.</li><li><strong>High Electricity Consumption:</strong> Obsolete single-speed or two-speed motors consuming substantial power without regenerative efficiency.</li><li><strong>Outdated Interior and Signal Fixtures:</strong> Worn cabin panels, faded button fixtures, and noisy door operation affecting property value.</li></ul><h2>Operational Benefits of Modern VVVF Controllers</h2><p>Transitioning to microcomputer controllers equipped with Variable Voltage Variable Frequency (VVVF) drives delivers whisper-quiet motion, seamless acceleration, and up to 40% reductions in power consumption while drastically minimizing operational callbacks.</p>',
    'a0000001-0000-0000-0000-000000000022',
    'Modernizing elevator components in an office building',
    (select id from public.categories where slug = 'elevator-modernization'),
    'published',
    now() - interval '4 days',
    5,
    '5 Signs Elevator Needs Modernization | Innovative Elevators',
    'Learn the five critical signals indicating your commercial or residential elevator requires modernization and VVVF controller upgrades.',
    'elevator modernization',
    array['modernize old elevator', 'elevator controller upgrade', 'energy saving elevator'],
    'BlogPosting',
    '[
      {"q": "Does modernization require replacing the entire elevator?", "a": "Not necessarily. Modernization can be modular, replacing the controller, door operator, and cabin interior while retaining sound guide rails and counterweights."},
      {"q": "How long does elevator modernization take?", "a": "A standard modernization project typically takes between 5 to 10 working days depending on project scope."},
      {"q": "How much electricity does a VVVF drive save?", "a": "Upgrading to a modern VVVF drive can yield up to 40% energy savings compared to obsolete two-speed machines."}
    ]'::jsonb,
    89
  ),

  -- Post 3 AR
  (
    'd0000001-0000-0000-0000-000000000005',
    'ar',
    'b0000001-0000-0000-0000-000000000003',
    'eshtiratat-al-difaa-al-madani-lil-masaid',
    'اشتراطات الدفاع المدني ومعايير السلامة الإلزامية للمصاعد بالمملكة',
    'دليل شامل حول اللوائح الفنية واشتراطات السلامة الصادرة عن المديرية العامة للدفاع المدني وهيئة المواصفات والمقاييس (SASO) لتشغيل المصاعد بأمان.',
    '<h2>اللوائح المنظمة لسلامة المصاعد والسلالم الكهربائية</h2><p>تولي الهيئة السعودية للمواصفات والمقاييس والجودة (SASO) والمديرية العامة للدفاع المدني أهمية بالغة لسلامة مستخدمي المصاعد في المنشآت العامة والسكنية. وتفرض اللوائح خضوع كافة المصاعد لفحوصات دورية معتمدة من شركات صيانة مؤهلة ومرخصة لضمان استيفاء معايير الأمان الإلزامية.</p><h2>عناصر السلامة الإلزامية في كابينة وبئر المصعد</h2><p>يشترط الدفاع المدني توفر مجموعة من أجهزة الأمان الأساسية التي تحول دون وقوع أي حوادث تشغيلية:</p><ul><li><strong>جهاز الإنزال الاضطراري الأوتوماتيكي (ARD):</strong> نظام بطاريات إلكتروني يعمل تلقائياً فور انقطاع التيار الكهربائي لتحريك الكابينة إلى أقرب دور وفتح الأبواب لخروج الركاب.</li><li><strong>ستائر الحماية الضوئية (Photocell Curtains):</strong> حساسات أشعة تحت حمراء متعددة الأشعة على كامل ارتفاع الباب تمنع إغلاقه عند وجود شخص أو عائق.</li><li><strong>جهاز مراقبة السرعة والباراشوت:</strong> منظومة ميكانيكية متكاملة توقف الكابينة فوراً على سكك الحديد في حال تجاوزت السرعة المحددة بنسبة معينة.</li><li><strong>نظام الاتصال المباشر والإنذار:</strong> جهاز هاتف أو زر اتصال بالطوارئ داخل الكابينة متصل بغرفة الحراسة أو الخط الساخن لشركة الصيانة.</li><li><strong>حساس الحمولة الزائدة (Overload Device):</strong> يمنع حركة المصعد ويطلق نغمة تحذيرية في حال تجاوز الوزن المسموح به.</li></ul><h2>خطوات تجديد ترخيص الدفاع المدني للمصعد</h2><p>يتطلب تجديد رخصة السلامة للمبنى إبرام عقد صيانة ساري المفعول مع شركة مصاعد معتمدة ومسجلة في منصة سلامة، حيث يقوم المهندس المختص بإجراء فحص هندسي شامل وإصدار شهادة صيانة رسمية تثبت كفاءة الأجهزة وعمل كافة دوائر الأمان.</p>',
    'a0000001-0000-0000-0000-000000000023',
    'فحص اشتراطات السلامة للمصاعد المعتمدة من الدفاع المدني',
    (select id from public.categories where slug = 'elevator-safety'),
    'published',
    now() - interval '2 days',
    4,
    'اشتراطات الدفاع المدني لسلامة المصاعد | شركة المصاعد المبتكرة',
    'تعرف على اشتراطات الدفاع المدني ومعايير السلامة الإلزامية للمصاعد في السعودية، وأجهزة الإنزال الاضطراري وخطوات الترخيص.',
    'سلامة المصاعد',
    array['اشتراطات الدفاع المدني للمصاعد', 'جهاز الإنزال الاضطراري', 'شهادة سلامة المصعد'],
    'BlogPosting',
    '[
      {"q": "ما هو جهاز ARD في المصعد؟", "a": "هو جهاز إنزال اضطراري أوتوماتيكي يعمل بالبطاريات لنقل الكابينة لأقرب طابق وفتح الباب عند انقطاع الكهرباء."},
      {"q": "هل يشترط الدفاع المدني عقداً سنوياً لصيانة المصاعد؟", "a": "نعم، يلزم الدفاع المدني جميع المباني بتوفير عقد صيانة سارٍ مع شركة مؤهلة لإصدار وتجديد رخصة المنشأة."},
      {"q": "كيف نتصرف عند تعطل المصعد واحتجاز الركاب؟", "a": "يجب الحفاظ على الهدوء والضغط على زر جرس الإنذار واستخدام هاتف الطوارئ والاتصال فوراً برقم طوارئ الشركة الموضح داخل الكابينة وعدم محاولة فتح الباب بالقوة."}
    ]'::jsonb,
    94
  ),

  -- Post 3 EN (Twin)
  (
    'd0000001-0000-0000-0000-000000000006',
    'en',
    'b0000001-0000-0000-0000-000000000003',
    'civil-defense-safety-standards-elevators-saudi-arabia',
    'Civil Defense Safety Standards for Elevators in Saudi Arabia',
    'A comprehensive overview of mandatory technical regulations and safety standards enforced by Civil Defense and SASO for commercial and residential elevators.',
    '<h2>Regulatory Standards for Elevator and Escalator Safety</h2><p>The Saudi Standards, Metrology and Quality Organization (SASO) and the General Directorate of Civil Defense enforce rigorous standards to ensure the safety of passengers in both public and residential facilities. Regulatory codes mandate that all operational elevators undergo regular technical inspections by licensed, accredited maintenance providers.</p><h2>Mandatory Elevator Safety Mechanisms</h2><p>Civil Defense guidelines require essential electromechanical protection devices to prevent operational hazards:</p><ul><li><strong>Automatic Rescue Device (ARD):</strong> An emergency battery-powered system that automatically engages during power failures to guide the cabin to the nearest floor and open doors.</li><li><strong>Multi-Beam Infrared Door Sensors:</strong> Full-height photocell curtains that immediately reopen closing doors when an obstruction is detected.</li><li><strong>Overspeed Governor & Safety Gear:</strong> A mechanical apparatus designed to clamp onto guide rails and arrest car descent if downward speed exceeds preset thresholds.</li><li><strong>Emergency Intercom & Alarm Bell:</strong> Direct two-way voice communication connecting trapped passengers to building security or service control rooms.</li><li><strong>Overload Detection Sensor:</strong> Prevents motor operation and sounds an audible alarm whenever passenger weight exceeds safe payload limits.</li></ul><h2>Civil Defense Safety Certification Renewal</h2><p>Renewing municipal or commercial building safety permits requires a valid annual maintenance contract with a certified elevator company registered on the Salamah portal, backed by formal technical inspection reports verifying full system readiness.</p>',
    'a0000001-0000-0000-0000-000000000023',
    'Certified safety inspection of commercial elevator',
    (select id from public.categories where slug = 'elevator-safety'),
    'published',
    now() - interval '2 days',
    4,
    'Civil Defense Elevator Safety Standards | Innovative Elevators',
    'Key Civil Defense safety requirements, automatic rescue devices, and certification guidelines for elevators in Saudi Arabia.',
    'elevator safety standards',
    array['civil defense elevator', 'automatic rescue device ARD', 'elevator safety certificate'],
    'BlogPosting',
    '[
      {"q": "What is an Automatic Rescue Device (ARD)?", "a": "An ARD is a battery-powered emergency system that brings the elevator cabin to the nearest landing and opens the doors during power blackouts."},
      {"q": "Is an annual elevator maintenance contract mandatory in Saudi Arabia?", "a": "Yes, Civil Defense regulations require an active contract with an accredited maintenance firm for building permit approvals."},
      {"q": "What should occupants do if trapped inside an elevator?", "a": "Remain calm, press the alarm button, use the emergency intercom, and await trained technical rescue without attempting to force doors open."}
    ]'::jsonb,
    91
  ),

  -- Post 4 AR
  (
    'd0000001-0000-0000-0000-000000000007',
    'ar',
    'b0000001-0000-0000-0000-000000000004',
    'kayfa-takhtar-qetaa-gheyar-al-masaid-al-asliyah',
    'دليل التحقق من قطع غيار المصاعد الأصلية وتفادي أخطار القطع المقلدة',
    'تعرف على المخاطر التشغيلية لاستخدام قطع غيار تجارية غير معتمدة وكيفية التأكد من جودة أحبال الجر ومحركات الأبواب والفرامل الميكانيكية.',
    '<h2>مخاطر استخدام قطع الغيار التجارية والمقلدة</h2><p>يمثل الاعتماد على قطع غيار غير أصلية أو مقلدة في منظومة المصاعد خطراً مباشراً على سلامة الركاب وسلامة المنشأة. فالقطع المقلدة تُصنع غالباً من سبائك منخفضة الجودة لا تتحمل إجهادات الشد المتكررة والحرارة العالية، مما يؤدي إلى تآكلها السريع والتسبب في أعطال متسلسلة قد تتلف ماكينة السحب أو لوحة التحكم الرئيسية بالكامل.</p><h2>القطع الأكثر استبدالاً وكيفية تمييز الأصلية منها</h2><p>تخضع المكونات الاستهلاكية في المصاعد لفترات استبدال دورية دقيقة، ومن أهم هذه المكونات:</p><ul><li><strong>أحبال الجر الفولاذية (Traction Wire Ropes):</strong> يجب أن تحمل شهادة اختبار الشد (Mill Test Certificate) وكود تتبع محفور من الشركة المصنعة المعتمدة.</li><li><strong>أحذية التوجيه وكراسي الانزلاق (Guide Shoes):</strong> تصنع القطع الأصلية من مواد بوليمرية عالية الكثافة تقلل الاحتكاك وتمنع تآكل سكك الحديد.</li><li><strong>مفاتيح وميكروسويتشات أقفال الأبواب (Door Interlock Switches):</strong> تحتوي القطع الأصلية على نقاط تلامس فضية مقاومة للشرر الكهربائي ومعتمدة بشهادات CE وSASO.</li><li><strong>موانع التسرب وحلقات الإحكام (Hydraulic Seals):</strong> للمصاعد الهيدروليكية، تمنع القطع الأصلية تسرب الزيت وتتحمل الضغوط الهيدروليكية العالية باستقرار تام.</li></ul><h2>أهمية التوريد من موزعين وشركات صيانة معتمدة</h2><p>تضمن شركة المصاعد المبتكرة توريد كافة قطع الغيار من كبرى المصانع الأوروبية واليابانية المعتمدة مع توفير الضمان التشغيلي وشهادات المنشأ الأصلية، مما يحافظ على قيمة أصولك العقارية ويضمن استمرارية عمل المصعد بكفاءة وأمان تام.</p>',
    'a0000001-0000-0000-0000-000000000024',
    'قطع غيار مصاعد أصلية ومحركات سحب معتمدة',
    (select id from public.categories where slug = 'spare-parts'),
    'published',
    now() - interval '1 day',
    4,
    'دليل قطع غيار المصاعد الأصلية | شركة المصاعد المبتكرة',
    'كيف تختار قطع غيار المصاعد الأصلية وتتجنب القطع المقلدة؟ دليل فني يوضح أهمية شهادات المنشأ لضمان سلامة المصاعد.',
    'قطع غيار المصاعد',
    array['قطع غيار مصاعد أصلية', 'أحبال جر المصاعد', 'ماكينات مصاعد إيطالية'],
    'BlogPosting',
    '[
      {"q": "كيف أتأكد أن قطع الغيار المركبة أصلية؟", "a": "اطلب شهادة المنشأ الرسمية وشهادة ضمان المصنع المعتمدة من شركة الصيانة الموردة."},
      {"q": "ما هو العمر الافتراضي لأحبال جر المصعد؟", "a": "يتراوح العمر الافتراضي لأحبال الجر بين 5 إلى 8 سنوات بحسب كثافة الاستخدام ومعدل التشحيم والفحص الدوري."},
      {"q": "هل توفر شركة المصاعد المبتكرة قطع غيار لكافة الماركات؟", "a": "نعم، نوفر قطع غيار أصلية متوافقة مع كبرى الماركات العالمية والموديلات الأوروبية واليابانية."}
    ]'::jsonb,
    87
  ),

  -- Post 4 EN (Twin)
  (
    'd0000001-0000-0000-0000-000000000008',
    'en',
    'b0000001-0000-0000-0000-000000000004',
    'how-to-choose-genuine-elevator-spare-parts',
    'How to Choose Genuine Elevator Spare Parts & Avoid Counterfeits',
    'Understand the hazards of uncertified aftermarket elevator components and learn how to verify original steel wire ropes, door interlocks, and hydraulic seals.',
    '<h2>The Hazards of Counterfeit and Substandard Elevator Components</h2><p>Installing counterfeit or substandard replacement parts in an elevator poses grave risks to passenger safety and mechanical reliability. Uncertified components are frequently manufactured using substandard alloys that cannot endure high tensile stresses and thermal variations, leading to premature fatigue and cascading damage to costly traction machines and drive controllers.</p><h2>High-Turnover Components and How to Verify Authenticity</h2><p>Elevator systems rely on high-precision components subject to disciplined replacement intervals:</p><ul><li><strong>Steel Suspension Wire Ropes:</strong> Authentic ropes must be accompanied by certified Mill Test Certificates with traceable laser-etched identification codes.</li><li><strong>Guide Rail Sliding Shoes & Rollers:</strong> Genuine items utilize high-density polyurethane polymers that minimize friction and prevent premature rail scoring.</li><li><strong>Door Lock Interlock Safety Switches:</strong> Certified originals incorporate silver-alloy contact points that resist electrical arcing and carry CE and SASO certifications.</li><li><strong>Hydraulic Cylinder Seals and Packings:</strong> Genuine seals maintain elasticity under extreme hydraulic pressures without oil weeping or pressure decay.</li></ul><h2>The Advantage of Certified Sourcing</h2><p>Innovative Elevators Co. sources all spare parts directly from accredited European and Japanese manufacturers, supplying verifiable manufacturer warranties and certificates of origin to protect your capital investment.</p>',
    'a0000001-0000-0000-0000-000000000024',
    'Genuine elevator spare parts and traction components',
    (select id from public.categories where slug = 'spare-parts'),
    'published',
    now() - interval '1 day',
    4,
    'Genuine Elevator Spare Parts Guide | Innovative Elevators',
    'How to verify genuine elevator replacement components, avoid counterfeit parts, and ensure certified safety compliance.',
    'genuine elevator spare parts',
    array['elevator wire ropes', 'traction machine parts', 'elevator door interlock'],
    'BlogPosting',
    '[
      {"q": "How can I verify if replacement parts are original?", "a": "Request the official certificate of origin and manufacturer warranty documentation from your certified maintenance provider."},
      {"q": "What is the typical operational lifespan of elevator suspension ropes?", "a": "Suspension wire ropes generally last between 5 to 8 years depending on travel cycles, tension balance, and proper lubrication."},
      {"q": "Do you provide spare parts for all major elevator brands?", "a": "Yes, we stock and source certified genuine parts compatible with leading international, European, and Japanese manufacturers."}
    ]'::jsonb,
    88
  )
on conflict (lang, slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content_html = excluded.content_html,
  featured_image_id = excluded.featured_image_id,
  featured_image_alt = excluded.featured_image_alt,
  category_id = excluded.category_id,
  status = excluded.status,
  published_at = excluded.published_at,
  reading_time_min = excluded.reading_time_min,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  focus_keyword = excluded.focus_keyword,
  secondary_keywords = excluded.secondary_keywords,
  schema_type = excluded.schema_type,
  faq = excluded.faq,
  seo_score = excluded.seo_score;

-- 8. Post Tags Linking
insert into public.post_tags (post_id, tag_id)
select p.id, t.id
from public.posts p, public.tags t
where (p.slug in ('dalil-seyana-dawriah-masaid-jeddah', 'periodic-elevator-maintenance-guide-jeddah') and t.slug in ('periodic-maintenance', 'jeddah'))
   or (p.slug in ('alamat-tahdeeth-al-masaid-al-qadeemah', 'signs-your-legacy-elevator-needs-modernization') and t.slug in ('modernization', 'genuine-parts'))
   or (p.slug in ('eshtiratat-al-difaa-al-madani-lil-masaid', 'civil-defense-safety-standards-elevators-saudi-arabia') and t.slug in ('civil-defense', 'safety-regulations'))
   or (p.slug in ('kayfa-takhtar-qetaa-gheyar-al-masaid-al-asliyah', 'how-to-choose-genuine-elevator-spare-parts') and t.slug in ('genuine-parts', 'hydraulic-elevators'))
on conflict do nothing;

-- 9. Sample Contact Submissions (Leads for Admin Messages Testing)
insert into public.contact_submissions (id, name, phone, email, service_interest, message, source_page, status, notes) values
  (
    '90000001-0000-0000-0000-000000000001',
    'م. عبد الرحمن الغامدي',
    '+966504123456',
    'a.alghamdi@alrawdah-props.com',
    'elevator-maintenance',
    'السلام عليكم، لدينا عمارة سكنية بحي الروضة مكونة من 7 أدوار وبها مصعدين ركاب، نرغب في الحصول على عرض سعر لعقد صيانة سنوي معتمد من الدفاع المدني يشمل الزيارات الشهرية وخدمة الطوارئ.',
    '/services/elevator-maintenance',
    'new',
    'تم استلام الطلب من صفحة خدمة الصيانة - حي الروضة'
  ),
  (
    '90000001-0000-0000-0000-000000000002',
    'أسامة بن سلطان',
    '+966555987654',
    'osama.s@sultan-group.sa',
    'elevator-modernization',
    'نود طلب فحص وتحديث مصعدين في برج مكاتب بطريق الملك، المصاعد قديمة والمحركات تصدر ضجيج مع بطء استجابة الكابينة. يرجى التنسيق لزيارة مهندس الفحص.',
    '/services/elevator-modernization',
    'contacted',
    'تم التواصل هاتفياً وتحديد موعد معاينة هندسية يوم الأحد القادم'
  ),
  (
    '90000001-0000-0000-0000-000000000003',
    'فيصل الحربي',
    '+966567112233',
    'faysal.alharbi@gmail.com',
    'elevator-installation',
    'أبحث عن تركيب مصعد بانورامي داخلي لفيلا خاصة في حي الشاطئ 3 أدوار (بدون حفرة عميقة أو غرفة محركات علوية MRL). الرجاء إرسال الكتالوجات المتاحة والتكاليف التقريبية.',
    '/contact',
    'new',
    'طلب تركيب لفيلا سكنية - حي الشاطئ'
  ),
  (
    '90000001-0000-0000-0000-000000000004',
    'طارق عبد العزيز الشهري',
    '+966542334455',
    'tariq@almarwah-med.com',
    'spare-parts',
    'نحتاج توريد لوحة تحكم ومغير سرعة VVVF متوافق مع ماكينة سيكور إيطالية لمجمع عيادات في حي الحمراء، مع إمكانية التركيب والبرمجة.',
    '/services/elevator-spare-parts',
    'closed',
    'تم توريد القطعة وتركيبها بنجاح وإغلاق التذكرة'
  ),
  (
    '90000001-0000-0000-0000-000000000005',
    'بدر القحطاني',
    '+966538990011',
    'bader.q@alzahra-mall.com',
    'escalators',
    'مطلوب صيانة وقائية عاجلة لزوج سلالم كهربائية في مركز تجاري بحي الزهراء بعد سماع صوت احتكاك في مجرى الدرجات.',
    '/services/escalators-moving-walkways',
    'contacted',
    'تم توجيه فريق الصيانة الميداني للموقع فوراً'
  )
on conflict (id) do nothing;

-- 10. Sample Redirects (301)
insert into public.redirects (source_path, target_path, status_code) values
  ('/services/maintenance', '/services/elevator-maintenance', 301),
  ('/services/modernization', '/services/elevator-modernization', 301),
  ('/works/andalus-tower', '/works/andalus-commercial-tower', 301)
on conflict (source_path) do nothing;

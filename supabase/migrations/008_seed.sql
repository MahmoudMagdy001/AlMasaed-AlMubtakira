-- ---------------------------------------------------------------
-- Seed
-- ---------------------------------------------------------------
insert into public.site_settings (key, value) values
  ('company', jsonb_build_object(
    'name_ar', 'شركة المصاعد المبتكرة',
    'name_en', 'Al-Masaed Al-Mubtakirah Company',
    'slogan_ar', 'ابتكار يرتفع بك',
    'cr_number', '4030227058',
    'city_ar', 'جدة',
    'city_en', 'Jeddah'
  )),
  ('contact', jsonb_build_object(
    'phones', jsonb_build_array('+966124231773', '+966559557459'),
    'whatsapp', '966559557459',
    'unified_number', '920016876',
    'email', 'info@almubtakirah.com',
    'address_ar', null,
    'address_en', null,
    'working_hours_ar', null,
    'map_url', null
  )),
  ('social', jsonb_build_object('instagram', null, 'tiktok', null, 'x', null, 'linkedin', null, 'snapchat', null)),
  ('tax', jsonb_build_object('vat_number', null)),
  ('analytics', jsonb_build_object('gtm_id', null, 'gsc_verification', null))
on conflict (key) do nothing;

insert into public.categories (slug, name_ar, name_en, sort_order) values
  ('elevator-maintenance', 'صيانة المصاعد', 'Elevator Maintenance', 1),
  ('elevator-modernization', 'تحديث المصاعد', 'Elevator Modernization', 2),
  ('elevator-safety', 'السلامة في المصاعد', 'Elevator Safety', 3),
  ('spare-parts', 'قطع الغيار', 'Spare Parts', 4),
  ('company-news', 'أخبار الشركة', 'Company News', 5)
on conflict (slug) do nothing;

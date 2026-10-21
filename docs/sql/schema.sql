-- Al-Masaed Al-Mubtakirah — database schema
-- Apply in order. Split into migrations by phase if preferred.

-- ---------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------
-- Profiles (staff)
-- ---------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'none' check (role in ('admin', 'editor', 'none')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role in ('admin', 'editor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)), 'none');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "profiles read own or admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

create policy "profiles update admin" on public.profiles
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
create trigger site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
create policy "settings public read" on public.site_settings
  for select to anon, authenticated using (true);
create policy "settings admin write" on public.site_settings
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------
-- Media
-- ---------------------------------------------------------------
create table public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  size_bytes integer not null check (size_bytes >= 0),
  width integer,
  height integer,
  variants jsonb not null default '[]'::jsonb,   -- [{ "w":480, "path":"...", "size":1234 }, ...]
  alt_text text,
  title text,
  folder text not null default 'general',
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index media_folder_idx on public.media (folder, created_at desc);
create index media_created_idx on public.media (created_at desc);
create index media_uploaded_by_idx on public.media (uploaded_by);
create trigger media_updated before update on public.media
  for each row execute function public.set_updated_at();

alter table public.media enable row level security;
create policy "media public read" on public.media
  for select to anon, authenticated using (true);
create policy "media staff write" on public.media
  for all to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

-- ---------------------------------------------------------------
-- Blog taxonomy
-- ---------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  name_en text,
  description_ar text,
  description_en text,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger categories_updated before update on public.categories
  for each row execute function public.set_updated_at();

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  name_en text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Posts
-- ---------------------------------------------------------------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  lang text not null default 'ar' check (lang in ('ar', 'en')),
  translation_key uuid not null default gen_random_uuid(),
  slug text not null,
  title text not null,
  excerpt text,
  content_html text not null default '',
  content_json jsonb,
  featured_image_id uuid references public.media (id) on delete set null,
  featured_image_alt text,
  category_id uuid references public.categories (id) on delete set null,
  author_id uuid references public.profiles (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  reading_time_min smallint not null default 1,

  -- SEO
  seo_title text,
  seo_description text,
  focus_keyword text,
  secondary_keywords text[] not null default '{}',
  canonical_url text,
  robots_noindex boolean not null default false,
  robots_nofollow boolean not null default false,
  og_title text,
  og_description text,
  og_image_id uuid references public.media (id) on delete set null,
  schema_type text not null default 'BlogPosting' check (schema_type in ('BlogPosting', 'Article', 'NewsArticle')),
  faq jsonb not null default '[]'::jsonb,         -- [{ "q": "...", "a": "..." }]
  seo_score smallint check (seo_score between 0 and 100),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint posts_slug_format check (slug ~ '^[a-z0-9ء-ي]+(-[a-z0-9ء-ي]+)*$'),
  constraint posts_lang_slug_unique unique (lang, slug),
  constraint posts_published_has_date check (status <> 'published' or published_at is not null)
);
create index posts_public_idx on public.posts (lang, status, published_at desc);
create index posts_category_idx on public.posts (category_id);
create index posts_translation_idx on public.posts (translation_key);
create index posts_author_idx on public.posts (author_id);
create index posts_featured_image_idx on public.posts (featured_image_id);
create index posts_og_image_idx on public.posts (og_image_id);
create trigger posts_updated before update on public.posts
  for each row execute function public.set_updated_at();

create table public.post_tags (
  post_id uuid not null references public.posts (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (post_id, tag_id)
);
create index post_tags_tag_idx on public.post_tags (tag_id);

-- ---------------------------------------------------------------
-- Works (dynamic table 1)
-- ---------------------------------------------------------------
create table public.works (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_ar text not null,
  title_en text,
  description_ar text,
  description_en text,
  service_type text not null default 'installation'
    check (service_type in ('installation', 'maintenance', 'modernization', 'spare-parts', 'escalators')),
  location_ar text,
  location_en text,
  completed_year smallint check (completed_year between 1990 and 2100),
  cover_media_id uuid references public.media (id) on delete set null,
  gallery_media_ids uuid[] not null default '{}',
  seo_title text,
  seo_description text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index works_public_idx on public.works (is_published, sort_order, created_at desc);
create index works_cover_idx on public.works (cover_media_id);
create trigger works_updated before update on public.works
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- Partners (dynamic table 2)
-- ---------------------------------------------------------------
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name_ar text not null,
  name_en text,
  logo_media_id uuid references public.media (id) on delete set null,
  website_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index partners_public_idx on public.partners (is_published, sort_order);
create index partners_logo_idx on public.partners (logo_media_id);
create trigger partners_updated before update on public.partners
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- Contact submissions
-- ---------------------------------------------------------------
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 30),
  email text check (email is null or char_length(email) <= 160),
  service_interest text check (service_interest is null or char_length(service_interest) <= 60),
  message text not null check (char_length(message) between 5 and 3000),
  source_page text check (source_page is null or char_length(source_page) <= 300),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),
  notes text,
  created_at timestamptz not null default now()
);
create index contact_status_idx on public.contact_submissions (status, created_at desc);

-- ---------------------------------------------------------------
-- RLS for content tables
-- ---------------------------------------------------------------
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.posts enable row level security;
alter table public.post_tags enable row level security;
alter table public.works enable row level security;
alter table public.partners enable row level security;
alter table public.contact_submissions enable row level security;

create policy "categories public read" on public.categories for select to anon, authenticated using (true);
create policy "categories staff write" on public.categories for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));

create policy "tags public read" on public.tags for select to anon, authenticated using (true);
create policy "tags staff write" on public.tags for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));

create policy "posts public read published" on public.posts for select to anon, authenticated
  using (status = 'published' and published_at <= now());
create policy "posts staff all" on public.posts for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));

create policy "post_tags public read" on public.post_tags for select to anon, authenticated using (true);
create policy "post_tags staff write" on public.post_tags for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));

create policy "works public read published" on public.works for select to anon, authenticated
  using (is_published);
create policy "works staff all" on public.works for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));

create policy "partners public read published" on public.partners for select to anon, authenticated
  using (is_published);
create policy "partners staff all" on public.partners for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));

create policy "contact anon insert" on public.contact_submissions for insert to anon, authenticated
  with check (status = 'new');
create policy "contact staff read" on public.contact_submissions for select to authenticated
  using ((select public.is_staff()));
create policy "contact staff update" on public.contact_submissions for update to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));
create policy "contact staff delete" on public.contact_submissions for delete to authenticated
  using ((select public.is_staff()));

-- ---------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'application/pdf']
)
on conflict (id) do nothing;

create policy "media objects public read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media objects staff insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_staff()));
create policy "media objects staff update" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.is_staff()));
create policy "media objects staff delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.is_staff()));

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
  ('analytics', jsonb_build_object('gtm_id', null, 'gsc_verification', null));

insert into public.categories (slug, name_ar, name_en, sort_order) values
  ('elevator-maintenance', 'صيانة المصاعد', 'Elevator Maintenance', 1),
  ('elevator-modernization', 'تحديث المصاعد', 'Elevator Modernization', 2),
  ('elevator-safety', 'السلامة في المصاعد', 'Elevator Safety', 3),
  ('spare-parts', 'قطع الغيار', 'Spare Parts', 4),
  ('company-news', 'أخبار الشركة', 'Company News', 5);

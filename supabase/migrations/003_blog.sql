-- ---------------------------------------------------------------
-- Blog taxonomy & Posts
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

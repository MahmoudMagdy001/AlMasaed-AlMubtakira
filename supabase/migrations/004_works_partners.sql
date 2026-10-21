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

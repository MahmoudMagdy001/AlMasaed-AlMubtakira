-- ---------------------------------------------------------------
-- Site settings & Media
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

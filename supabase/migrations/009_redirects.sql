-- ---------------------------------------------------------------
-- 009_redirects.sql: 301 URL redirects table for slug changes
-- ---------------------------------------------------------------
create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique,
  target_path text not null,
  status_code integer not null default 301,
  created_at timestamptz not null default now()
);

create index if not exists redirects_source_path_idx on public.redirects (source_path);

alter table public.redirects enable row level security;

create policy "redirects public read" on public.redirects for select to anon, authenticated using (true);
create policy "redirects staff all" on public.redirects for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));

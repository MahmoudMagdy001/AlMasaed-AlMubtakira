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

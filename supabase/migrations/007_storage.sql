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

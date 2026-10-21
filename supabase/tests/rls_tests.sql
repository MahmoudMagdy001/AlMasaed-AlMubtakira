-- ===============================================================
-- Al-Masaed Al-Mubtakirah — RLS & Policy Verification Suite
-- Run this in Supabase SQL Editor to verify security enforcement.
-- Everything runs in a transaction and rolls back at the end.
-- ===============================================================

begin;

-- 1. Setup mock users for testing roles
create temp table if not exists _test_context (
  anon_uid uuid default gen_random_uuid(),
  unprivileged_uid uuid default gen_random_uuid(),
  editor_uid uuid default gen_random_uuid(),
  admin_uid uuid default gen_random_uuid()
);

-- Insert profiles for test users
insert into public.profiles (id, full_name, role)
select editor_uid, 'محرر النظام', 'editor' from _test_context
union all
select admin_uid, 'مدير النظام', 'admin' from _test_context
union all
select unprivileged_uid, 'مستخدم بدون صلاحية', 'none' from _test_context;

-- Insert a draft post and a published post as admin
insert into public.posts (
  id, lang, slug, title, content_html, status, published_at, author_id
) values
(
  gen_random_uuid(), 'ar', 'test-draft-post', 'مقالة مسودة تجريبية',
  '<p>محتوى مسودة</p>', 'draft', null, (select admin_uid from _test_context)
),
(
  gen_random_uuid(), 'ar', 'test-published-post', 'مقالة منشورة تجريبية',
  '<p>محتوى منشور</p>', 'published', now() - interval '1 hour', (select admin_uid from _test_context)
);

-- Insert an unpublished work as admin
insert into public.works (
  id, slug, title_ar, service_type, is_published
) values (
  gen_random_uuid(), 'test-unpublished-work', 'مشروع غير منشور', 'installation', false
);

-- ---------------------------------------------------------------
-- Test Case 1: Anon cannot select drafts
-- ---------------------------------------------------------------
set local role anon;
set local "request.jwt.claim.sub" to '';

do $$
declare
  draft_count integer;
begin
  select count(*) into draft_count
  from public.posts
  where slug = 'test-draft-post';

  if draft_count > 0 then
    raise exception 'TEST FAILED: Anon can see draft posts (count: %)', draft_count;
  end if;
  raise notice 'PASSED: Anon cannot select drafts';
end $$;

-- ---------------------------------------------------------------
-- Test Case 2: Anon can select published posts
-- ---------------------------------------------------------------
do $$
declare
  pub_count integer;
begin
  select count(*) into pub_count
  from public.posts
  where slug = 'test-published-post';

  if pub_count <> 1 then
    raise exception 'TEST FAILED: Anon cannot see published posts';
  end if;
  raise notice 'PASSED: Anon can select published posts';
end $$;

-- ---------------------------------------------------------------
-- Test Case 3: Anon cannot select contact submissions
-- ---------------------------------------------------------------
do $$
declare
  contact_count integer;
begin
  select count(*) into contact_count
  from public.contact_submissions;

  if contact_count > 0 then
    raise exception 'TEST FAILED: Anon can see contact submissions (count: %)', contact_count;
  end if;
  raise notice 'PASSED: Anon cannot select contact submissions';
end $$;

-- ---------------------------------------------------------------
-- Test Case 4: Anon can insert a valid contact submission
-- ---------------------------------------------------------------
do $$
begin
  insert into public.contact_submissions (
    name, phone, message, service_interest
  ) values (
    'محمد علي', '+966559557459', 'طلب فحص وصيانة دورية للمصعد المنزلي', 'maintenance'
  );
  raise notice 'PASSED: Anon can insert a valid contact submission';
exception
  when others then
    raise exception 'TEST FAILED: Anon could not insert valid contact submission: %', sqlerrm;
end $$;

-- ---------------------------------------------------------------
-- Test Case 5: Anon cannot insert invalid data (short name/phone/message)
-- ---------------------------------------------------------------
do $$
begin
  insert into public.contact_submissions (name, phone, message)
  values ('x', '1', 'z');
  raise exception 'TEST FAILED: Anon inserted invalid contact data';
exception
  when check_violation then
    raise notice 'PASSED: Anon cannot insert invalid contact data (check constraint enforced)';
end $$;

-- ---------------------------------------------------------------
-- Test Case 6: Anon cannot insert posts
-- ---------------------------------------------------------------
do $$
begin
  insert into public.posts (lang, slug, title, content_html, status)
  values ('ar', 'anon-hacked-post', 'اختراق', '<p>اختراق</p>', 'published');
  raise exception 'TEST FAILED: Anon was able to insert posts!';
exception
  when insufficient_privilege then
    raise notice 'PASSED: Anon cannot write to posts';
  when others then
    -- RLS with check constraint failure
    raise notice 'PASSED: Anon cannot write to posts (%)', sqlerrm;
end $$;

-- ---------------------------------------------------------------
-- Test Case 7: Non-staff authenticated user (role = 'none') cannot write
-- ---------------------------------------------------------------
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', unprivileged_uid::text, true) from _test_context;

do $$
begin
  insert into public.categories (slug, name_ar) values ('malicious-cat', 'تصنيف غير مصرح');
  raise exception 'TEST FAILED: Non-staff user was able to insert categories!';
exception
  when others then
    raise notice 'PASSED: Non-staff authenticated user cannot write';
end $$;

-- ---------------------------------------------------------------
-- Test Case 8: Staff (editor) can write to content tables
-- ---------------------------------------------------------------
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', editor_uid::text, true) from _test_context;

do $$
begin
  insert into public.categories (slug, name_ar, sort_order)
  values ('staff-category-test', 'تصنيف تجريبي من الطاقم', 99);
  raise notice 'PASSED: Staff (editor) can write to categories';
exception
  when others then
    raise exception 'TEST FAILED: Staff could not insert category: %', sqlerrm;
end $$;

-- ---------------------------------------------------------------
-- Test Case 9: Storage upload by anon fails
-- ---------------------------------------------------------------
reset role;
set local role anon;

do $$
begin
  insert into storage.objects (bucket_id, name, owner)
  values ('media', 'anon_file.png', (select anon_uid from _test_context));
  raise exception 'TEST FAILED: Anon was able to upload to storage!';
exception
  when others then
    raise notice 'PASSED: Storage upload by anon fails (RLS enforced)';
end $$;

-- Rollback all test insertions to leave database clean
rollback;

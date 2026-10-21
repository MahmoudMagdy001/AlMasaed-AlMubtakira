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

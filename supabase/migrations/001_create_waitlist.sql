-- Run this in your Supabase dashboard SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/fupnnlybvfahalpnmofh/sql/new

create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  first_name text not null,
  whatsapp text not null,
  email text,
  pack_interest text check (pack_interest in ('nuit', 'glam', 'routine')),
  promo_code text default 'KREOL20',
  source text default 'landing'
);

alter table public.waitlist enable row level security;

-- Comment: No public read/write policies needed.
-- Server uses service role key which bypasses RLS.

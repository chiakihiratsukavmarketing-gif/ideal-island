-- MILE Web Push: subscriptions + server-side reminder dedupe
-- Run in Supabase SQL Editor (Dashboard) if not using CLI migrations.

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  timezone text not null default 'Asia/Tokyo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, endpoint)
);

create table if not exists public.schedule_reminder_sent (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  reminder_key text not null,
  sent_at timestamptz not null default now(),
  unique (user_id, reminder_key)
);

create index if not exists push_subscriptions_user_id_idx on public.push_subscriptions (user_id);
create index if not exists schedule_reminder_sent_sent_at_idx on public.schedule_reminder_sent (sent_at);

alter table public.push_subscriptions enable row level security;
alter table public.schedule_reminder_sent enable row level security;

drop policy if exists "Users manage own push subscriptions" on public.push_subscriptions;
create policy "Users manage own push subscriptions"
  on public.push_subscriptions
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Service role manages reminder sent" on public.schedule_reminder_sent;
create policy "Service role manages reminder sent"
  on public.schedule_reminder_sent
  for all
  to service_role
  using (true)
  with check (true);

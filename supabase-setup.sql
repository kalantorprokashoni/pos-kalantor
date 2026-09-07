-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.

-- 1) Live app state: one shared row every device reads/writes, so all
--    devices/browsers stay in sync.
create table if not exists pos_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Backups: a new snapshot row every time someone presses the BACKUP
--    button (or the daily auto-backup fires). Nothing is ever overwritten
--    here, so you can always go back to an earlier point in time.
create table if not exists pos_backups (
  id bigint generated always as identity primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: required by Supabase before the anon key can touch
-- a table. This app has no per-user login yet, so we allow the anon key
-- full read/write on just these two tables (nothing else in your project
-- is exposed).
alter table pos_state enable row level security;
alter table pos_backups enable row level security;

create policy "anon can read pos_state" on pos_state
  for select to anon using (true);
create policy "anon can write pos_state" on pos_state
  for insert to anon with check (true);
create policy "anon can update pos_state" on pos_state
  for update to anon using (true);

create policy "anon can read pos_backups" on pos_backups
  for select to anon using (true);
create policy "anon can write pos_backups" on pos_backups
  for insert to anon with check (true);

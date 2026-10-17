-- Kolonia Pasjonatow: backend foundation for Supabase
-- Run this whole file in Supabase SQL Editor on a NEW project.
-- Never put a Supabase service_role key in website files.

create extension if not exists pgcrypto;

do $$ begin
  create type public.colony_role as enum ('member', 'moderator', 'admin');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text not null default 'Nowy członek' check (char_length(display_name) between 1 and 60),
  bio text not null default '' check (char_length(bio) <= 500),
  avatar_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_format check (username is null or username ~ '^[a-zA-Z0-9_]{3,24}$')
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.colony_role not null default 'member',
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id) on delete set null,
  primary key (user_id, role)
);

create table if not exists public.community_stats (
  singleton boolean primary key default true check (singleton),
  member_count integer not null default 23 check (member_count >= 0),
  published_event_count integer not null default 6 check (published_event_count >= 0),
  description text not null default 'Statystyki społeczności Kolonia Pasjonatów',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

insert into public.community_stats (singleton)
values (true)
on conflict (singleton) do nothing;

create table if not exists public.community_events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  description text not null default '' check (char_length(description) <= 2000),
  starts_at timestamptz,
  published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null check (char_length(action) between 1 and 120),
  target_user_id uuid references auth.users(id) on delete set null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists profiles_public_created_idx on public.profiles (is_public, created_at desc);
create index if not exists user_roles_user_id_idx on public.user_roles (user_id);
create index if not exists events_published_starts_idx on public.community_events (published, starts_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists events_set_updated_at on public.community_events;
create trigger events_set_updated_at
before update on public.community_events
for each row execute function public.set_updated_at();

-- SECURITY DEFINER avoids recursive RLS checks on user_roles.
create or replace function public.has_colony_role(check_user_id uuid, check_role public.colony_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = check_user_id and ur.role = check_role
  );
$$;

create or replace function public.is_colony_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_colony_role(auth.uid(), 'admin'::public.colony_role);
$$;

create or replace function public.is_colony_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and (
    public.has_colony_role(auth.uid(), 'admin'::public.colony_role)
    or public.has_colony_role(auth.uid(), 'moderator'::public.colony_role)
  );
$$;

-- Do not expose the generic role-check helper: it accepts arbitrary user IDs.
-- Policies use only the caller-scoped admin/staff checks below.
revoke all on function public.has_colony_role(uuid, public.colony_role) from public, anon, authenticated;
grant execute on function public.is_colony_admin() to anon, authenticated;
grant execute on function public.is_colony_staff() to authenticated;

-- Create a member profile and default member role on Auth signup.
create or replace function public.handle_new_colony_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  chosen_name text;
begin
  chosen_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
    'Nowy członek'
  );
  insert into public.profiles (id, display_name)
  values (new.id, left(chosen_name, 60))
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'member'::public.colony_role)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_colony on auth.users;
create trigger on_auth_user_created_colony
after insert on auth.users
for each row execute procedure public.handle_new_colony_user();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.community_stats enable row level security;
alter table public.community_events enable row level security;
alter table public.admin_audit_log enable row level security;

-- Public profiles are readable; private profiles are visible only to their owner and admins.
drop policy if exists "Public profiles readable" on public.profiles;
create policy "Public profiles readable"
on public.profiles for select to anon, authenticated
using (is_public = true or id = (select auth.uid()) or public.is_colony_admin());

drop policy if exists "Members update own profile" on public.profiles;
create policy "Members update own profile"
on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles"
on public.profiles for all to authenticated
using (public.is_colony_admin())
with check (public.is_colony_admin());

-- Members may see their own roles. Only admins may assign/remove roles.
drop policy if exists "Read own roles or admin roles" on public.user_roles;
create policy "Read own roles or admin roles"
on public.user_roles for select to authenticated
using (user_id = (select auth.uid()) or public.is_colony_admin());

drop policy if exists "Admins manage roles" on public.user_roles;
create policy "Admins manage roles"
on public.user_roles for all to authenticated
using (public.is_colony_admin())
with check (public.is_colony_admin());

drop policy if exists "Public reads community stats" on public.community_stats;
create policy "Public reads community stats"
on public.community_stats for select to anon, authenticated
using (true);

drop policy if exists "Admins update community stats" on public.community_stats;
create policy "Admins update community stats"
on public.community_stats for update to authenticated
using (public.is_colony_admin())
with check (public.is_colony_admin());

drop policy if exists "Public reads published events" on public.community_events;
create policy "Public reads published events"
on public.community_events for select to anon, authenticated
using (published = true or public.is_colony_admin());

drop policy if exists "Staff create events" on public.community_events;
create policy "Staff create events"
on public.community_events for insert to authenticated
with check (public.is_colony_staff() and created_by = (select auth.uid()));

drop policy if exists "Staff update events" on public.community_events;
create policy "Staff update events"
on public.community_events for update to authenticated
using (public.is_colony_staff())
with check (public.is_colony_staff());

drop policy if exists "Admins delete events" on public.community_events;
create policy "Admins delete events"
on public.community_events for delete to authenticated
using (public.is_colony_admin());

drop policy if exists "Admins read audit log" on public.admin_audit_log;
create policy "Admins read audit log"
on public.admin_audit_log for select to authenticated
using (public.is_colony_admin());

drop policy if exists "Admins write audit log" on public.admin_audit_log;
create policy "Admins write audit log"
on public.admin_audit_log for insert to authenticated
with check (public.is_colony_admin() and actor_id = (select auth.uid()));

-- Expose only the published event count; this view does not expose event details.
create or replace view public.public_community_summary
with (security_invoker = true)
as
select
  s.member_count,
  (select count(*)::integer from public.community_events e where e.published = true) as published_event_count,
  s.updated_at
from public.community_stats s
where s.singleton = true;

grant usage on schema public to anon, authenticated;
grant select on public.profiles, public.community_stats, public.community_events to anon, authenticated;
grant select on public.user_roles to authenticated;
grant select on public.public_community_summary to anon, authenticated;
grant update (username, display_name, bio, avatar_url, is_public) on public.profiles to authenticated;
grant update (member_count, description) on public.community_stats to authenticated;
grant insert, update, delete on public.community_events to authenticated;
grant select, insert on public.admin_audit_log to authenticated;

-- IMPORTANT: after your first account is registered, promote it once using
-- the SQL Editor in Supabase, replacing the UUID with your auth.users id:
-- insert into public.user_roles (user_id, role)
-- values ('YOUR-AUTH-USER-UUID', 'admin')
-- on conflict do nothing;

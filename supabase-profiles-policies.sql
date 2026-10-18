-- Polityki dostępu dla publicznych profili Kolonii Pasjonatów.
-- Uruchom ręcznie w Supabase: SQL Editor -> New query -> Run.
-- Polityki ograniczają wiersze, nie kolumny: nie przechowuj sekretów ani prywatnych danych
-- w tabeli public.profiles. Publicznie udostępniane pola to display_name, avatar_url i bio.

alter table public.profiles enable row level security;

-- Nadaj wymagane uprawnienia SQL; RLS nadal ogranicza dostęp do własnych/publicznych wierszy.
grant select on table public.profiles to anon, authenticated;
grant insert, update on table public.profiles to authenticated;

drop policy if exists "kolonia_public_profiles_read" on public.profiles;
create policy "kolonia_public_profiles_read"
on public.profiles
for select
to anon, authenticated
using (is_public = true);

drop policy if exists "kolonia_own_profile_read" on public.profiles;
create policy "kolonia_own_profile_read"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "kolonia_own_profile_insert" on public.profiles;
create policy "kolonia_own_profile_insert"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "kolonia_own_profile_update" on public.profiles;
create policy "kolonia_own_profile_update"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

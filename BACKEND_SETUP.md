# Kolonia Pasjonatów — konfiguracja Supabase

## Baza danych
Uruchom plik `supabase/schema.sql` w SQL Editor w panelu Supabase.

## Logowanie przez Discord
Strona `konto.html` korzysta z Supabase Auth i OAuth Discord.

1. Otwórz [Discord Developer Portal](https://discord.com/developers/applications) i utwórz aplikację lub wybierz istniejącą.
2. W aplikacji wejdź w **OAuth2** i dodaj Redirect URL: `https://ffykdmhkpbcrmfqhwrvf.supabase.co/auth/v1/callback`.
3. Skopiuj Client ID oraz Client Secret z aplikacji Discord.
4. W Supabase przejdź do **Authentication → Sign In / Providers → Discord**, włącz dostawcę Discord i wpisz tam Client ID oraz Client Secret. Zapisz zmiany.
5. W Supabase w **Authentication → URL Configuration** ustaw Site URL na faktyczny adres opublikowanej strony i dodaj ten adres (w tym adres strony `konto.html`) do Redirect URLs.
6. Na stronie wybierz **Konto → Kontynuuj przez Discord**.

W przeglądarce używany jest wyłącznie Project URL i klucz Publishable. **Discord Client Secret** wklejaj tylko do panelu Supabase — nigdy do plików strony ani repozytorium.

## Pierwszy administrator
Po pierwszym zalogowaniu przez Discord otwórz **Authentication → Users**, skopiuj UUID użytkownika, a następnie w SQL Editor nadaj mu rolę administratora:

```sql
insert into public.user_roles (user_id, role)
values ('YOUR-AUTH-USER-UUID', 'admin')
on conflict do nothing;
```

Role są nadawane w bazie danych, a dostęp chronią polityki RLS. Statystyki strony i funkcje panelu administracyjnego będą podłączane w kolejnych etapach.

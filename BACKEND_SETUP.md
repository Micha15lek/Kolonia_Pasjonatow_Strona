# Kolonia Pasjonatów — konfiguracja Supabase

## Etap 1 — baza danych
W panelu Supabase uruchom cały plik `supabase/schema.sql` w SQL Editor.

## Etap 2 — połączenie i konta
Pliki `supabase-config.js` i `supabase-client.js` tworzą połączenie strony z Supabase. W konfiguracji przeglądarkowej używany jest wyłącznie Project URL i klucz Publishable. Nie umieszczaj w repozytorium klucza Secret, service_role ani hasła do bazy.

Strona `konto.html` umożliwia:
- rejestrację i logowanie przez e-mail oraz hasło;
- wyświetlanie własnego profilu;
- edycję nazwy użytkownika, nazwy wyświetlanej, opisu i widoczności profilu;
- wylogowanie.

## Konfiguracja Supabase Auth
1. W Authentication → URL Configuration ustaw Site URL na opublikowany adres strony GitHub Pages i dodaj ten adres do Redirect URLs.
2. W Authentication → Providers upewnij się, że Email jest włączony.
3. Jeśli włączono potwierdzanie e-maila, użytkownik musi potwierdzić adres przed pierwszym logowaniem.
4. Po zarejestrowaniu własnego konta otwórz Authentication → Users i skopiuj UUID użytkownika.
5. W SQL Editor nadaj sobie rolę administratora, podstawiając prawdziwy UUID:

```sql
insert into public.user_roles (user_id, role)
values ('YOUR-AUTH-USER-UUID', 'admin')
on conflict do nothing;
```

Rola administratora jest przypisywana w bazie, nie przez formularz na stronie. Nie udostępniaj nikomu swojego hasła ani klucza Secret.

## Ważne
To jest etapowe wdrożenie. Rejestracja i profil korzystają z Supabase Auth oraz RLS. Statystyki na stronie głównej i funkcje administracyjne będą podłączane w kolejnych etapach.

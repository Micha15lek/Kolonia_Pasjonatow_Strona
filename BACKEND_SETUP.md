# Kolonia Pasjonatów — konfiguracja Supabase

## Baza danych
Uruchom plik `supabase/schema.sql` w SQL Editor w panelu Supabase.

## Logowanie przez Discord
Strona `konto.html` loguje użytkowników przez Discord OAuth w Supabase Auth.

1. Otwórz [Discord Developer Portal](https://discord.com/developers/applications) i utwórz aplikację albo wybierz istniejącą.
2. W aplikacji przejdź do **OAuth2** i dodaj Redirect URL:
   `https://ffykdmhkpbcrmfqhwrvf.supabase.co/auth/v1/callback`
3. Skopiuj Client ID i Client Secret aplikacji Discord.
4. W Supabase przejdź do **Authentication → Sign In / Providers → Discord**, włącz dostawcę Discord i wklej tam Client ID oraz Client Secret. Zapisz zmiany.
5. W Supabase otwórz **Authentication → URL Configuration**. Ustaw Site URL na prawdziwy adres opublikowanej strony i dodaj go do Redirect URLs, w tym adres strony `konto.html`.
6. Otwórz stronę, kliknij **Konto → Kontynuuj przez Discord** i zaakceptuj autoryzację.

**Ważne:** Discord Client Secret wpisuj wyłącznie w panelu Supabase. Nie umieszczaj go w HTML, JavaScript ani repozytorium. W stronie używany jest tylko klucz Publishable.

## Nadanie pierwszej roli administratora
Po pierwszym zalogowaniu przez Discord otwórz **Authentication → Users**, skopiuj UUID swojego konta i w SQL Editor wykonaj polecenie z prawdziwym UUID:

```sql
insert into public.user_roles (user_id, role)
values ('YOUR-AUTH-USER-UUID', 'admin')
on conflict do nothing;
```

Role są nadawane w bazie, a nie przez formularz profilu. Dostęp do danych chronią polityki RLS.

## Kolejne etapy
Logowanie Discord i edycja własnego profilu to etap kont. Statystyki strony głównej i panel administratora będą podłączane osobno.

# Kolonia Pasjonatów — konfiguracja Supabase

## Baza danych
Uruchom plik `supabase/schema.sql` w SQL Editor w panelu Supabase.

## Logowanie przez Discord
Strona `konto.html` korzysta z Supabase Auth i logowania OAuth przez Discord. Aby je aktywować:

1. Otwórz [Discord Developer Portal](https://discord.com/developers/applications) i utwórz aplikację (lub wybierz istniejącą).
2. W aplikacji przejdź do **OAuth2** i dodaj Redirect URL:
   `https://ffykdmhkpbcrmfqhwrvf.supabase.co/auth/v1/callback`
3. Skopiuj Client ID i Client Secret z aplikacji Discord.
4. W Supabase przejdź do **Authentication → Sign In / Providers → Discord**, włącz Discord i wpisz tam Client ID oraz Client Secret. Zapisz zmiany.
5. W Supabase, w **Authentication → URL Configuration**, ustaw Site URL na dokładny adres opublikowanej strony i dodaj adres strony konta do Redirect URLs. Na przykład, jeśli repozytorium jest publikowane przez GitHub Pages, będzie to adres Twojej strony kończący się na `/konto.html`. Użyj faktycznego adresu strony.
6. Otwórz stronę i wybierz **Konto → Kontynuuj przez Discord**.

W przeglądarce używany jest wyłącznie Project URL i klucz Publishable. **Discord Client Secret** wklejaj wyłącznie w panelu Supabase — nigdy do plików strony ani repozytorium.

## Pierwszy administrator
Po pierwszym zalogowaniu przez Discord otwórz **Authentication → Users** i skopiuj UUID tego użytkownika. Następnie w SQL Editor wykonaj poniższe polecenie, podstawiając prawdziwy UUID:

```sql
insert into public.user_roles (user_id, role)
values ('YOUR-AUTH-USER-UUID', 'admin')
on conflict do nothing;
```

Role są nadawane w bazie danych, a nie przez formularz profilu. Dostęp do danych chronią polityki RLS.

## Kolejne etapy
Rejestracja/logowanie przez Discord i edycja własnego profilu to etap kont. Statystyki na stronie głównej oraz funkcje panelu administracyjnego będą podłączane oddzielnie.

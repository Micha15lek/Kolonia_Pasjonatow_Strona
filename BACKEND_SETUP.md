# Kolonia Pasjonatów — backend

Ta witryna jest obecnie statycznym HTML/CSS/JavaScript. Ten katalog rozpoczyna migrację do Supabase (Postgres, Auth i Row Level Security). Samo dodanie schematu do repozytorium **nie uruchamia jeszcze bazy ani logowania**.

## Etap 1 — skonfiguruj Supabase

1. Utwórz projekt w https://supabase.com/dashboard.
2. Otwórz **SQL Editor** i uruchom cały plik `supabase/schema.sql`.
3. W **Authentication → URL Configuration** ustaw adres strony jako Site URL i dodaj go do Redirect URLs.
4. Skonfiguruj metodę logowania w **Authentication → Providers**. Zalecane jest potwierdzanie adresu e-mail.
5. Utwórz własne konto. W **Authentication → Users** skopiuj jego UUID i wykonaj końcowy przykład SQL z `supabase/schema.sql`, aby nadać pierwszą rolę administratora.

## Bezpieczeństwo — ważne

- W przeglądarce można używać wyłącznie Project URL i klucza **publishable** (lub starszego anon key). RLS musi pozostać włączone.
- **Nigdy nie publikuj** klucza `service_role`, hasła bazy ani tokenów administratora w HTML, JS czy repozytorium.
- Rola jest przechowywana osobno w `member_roles`, a nie w edytowalnym profilu użytkownika.
- Dostęp chronią polityki RLS w bazie, nie samo ukrywanie przycisków w interfejsie.
- Przed publiczną rejestracją przygotuj politykę prywatności, ograniczenia antyspamowe i procedurę usuwania kont.

## Elementy schematu

- `profiles` — publiczne profile i kontrola widoczności.
- `member_roles` — role member, moderator, admin, director.
- `community_events` — wydarzenia publikowane przez administrację.
- `community_stats` — statystyki z ograniczonym zapisem.
- Automatyczne tworzenie profilu i roli member przy rejestracji.
- Polityki Row Level Security dla odczytu i modyfikacji.

## Kolejne etapy

1. Podłączenie klienta Supabase do strony i formularze logowania/rejestracji.
2. Lista profili oraz edycja własnego profilu.
3. Wspólne statystyki pobierane z bazy.
4. Panel administracyjny weryfikujący role po stronie bazy.
5. Dopracowanie wyglądu i testy wszystkich podstron.

Schemat jest fundamentem. Zanim backend będzie działał publicznie, trzeba uruchomić go w projekcie Supabase i przetestować z kontem zwykłym oraz administracyjnym.

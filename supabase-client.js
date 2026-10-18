/* Wspólny klient Supabase dla frontendu Kolonii Pasjonatów. */
(function () {
    "use strict";
    const url = window.KOLONIA_SUPABASE_URL;
    const key = window.KOLONIA_SUPABASE_PUBLISHABLE_KEY;
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
        console.error("Nie udało się załadować biblioteki Supabase.");
        return;
    }
    if (!url || !key) {
        console.error("Brakuje konfiguracji Supabase.");
        return;
    }
    window.koloniaSupabase = window.supabase.createClient(url, key, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });
})();

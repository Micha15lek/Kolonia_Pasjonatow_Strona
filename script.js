/* =========================================================
   KOLONIA PASJONATÓW
   SCRIPT.JS — WERSJA 1.0
   TRYB JASNY / CIEMNY
   ========================================================= */


/* =========================================================
   1. PRZEŁĄCZNIK MOTYWU
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");


/* =========================================================
   2. ODCZYT ZAPISANEGO MOTYWU
   ========================================================= */

const savedTheme =
    localStorage.getItem("theme") || "dark";


/* =========================================================
   3. ZMIANA MOTYWU
   ========================================================= */

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    } else {

        document.body.classList.remove(
            "light-theme"
        );

    }


    /* =====================================================
       ZMIANA IKONY
       ===================================================== */

    if (themeToggle) {

        themeToggle.textContent =
            theme === "light"
                ? "🌙"
                : "☀️";


        themeToggle.setAttribute(
            "aria-label",
            theme === "light"
                ? "Włącz tryb ciemny"
                : "Włącz tryb jasny"
        );

    }


    /* =====================================================
       ZAPISANIE MOTYWU
       ===================================================== */

    localStorage.setItem(
        "theme",
        theme
    );

}


/* =========================================================
   4. URUCHOMIENIE ZAPISANEGO MOTYWU
   ========================================================= */

applyTheme(savedTheme);


/* =========================================================
   5. PRZYCISK JASNY / CIEMNY
   ========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                localStorage.getItem("theme")
                || "dark";


            if (currentTheme === "dark") {

                applyTheme("light");

            } else {

                applyTheme("dark");

            }


            /* =================================================
               ANIMACJA PRZYCISKU
               ================================================= */

            themeToggle.animate(

                [
                    {
                        transform:
                            "rotate(0deg) scale(1)"
                    },

                    {
                        transform:
                            "rotate(180deg) scale(1.12)"
                    },

                    {
                        transform:
                            "rotate(360deg) scale(1)"
                    }
                ],

                {
                    duration: 450,
                    easing: "ease"
                }

            );

        }
    );

}


/* =========================================================
   6. ANIMACJA PO ZAŁADOWANIU STRONY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =========================================================
   7. OBSŁUGA LINKÓW ZEWNĘTRZNYCH
   ========================================================= */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(
        link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );


/* =========================================================
   8. KONIEC SCRIPT.JS
   ========================================================= */

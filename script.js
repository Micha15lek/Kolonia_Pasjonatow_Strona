/* =========================================================
   KOLONIA PASJONATÓW
   SCRIPT.JS — WERSJA 1.0
   TRYB JASNY / CIEMNY
   ========================================================= */


/* =========================================================
   1. PRZEŁĄCZNIK MOTYWU
   ========================================================= */

const themeToggle = document.getElementById("themeToggle");


/* =========================================================
   2. ODCZYT ZAPISANEGO MOTYWU
   ========================================================= */

const savedTheme = localStorage.getItem("theme") || "dark";


/* =========================================================
   3. USTAWIENIE MOTYWU
   ========================================================= */

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-theme");

    } else {

        document.body.classList.remove("light-theme");

    }


    /* Zmiana ikonki */

    if (themeToggle) {

        themeToggle.textContent =
            theme === "light" ? "🌙" : "☀️";

        themeToggle.setAttribute(
            "aria-label",
            theme === "light"
                ? "Włącz tryb ciemny"
                : "Włącz tryb jasny"
        );

    }


    /* Zapamiętanie wyboru */

    localStorage.setItem("theme", theme);

}


/* =========================================================
   4. URUCHOMIENIE ZAPISANEGO MOTYWU
   ========================================================= */

applyTheme(savedTheme);


/* =========================================================
   5. PRZYCISK ZMIANY MOTYWU
   ========================================================= */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            localStorage.getItem("theme") || "dark";


        if (currentTheme === "dark") {

            applyTheme("light");

        } else {

            applyTheme("dark");

        }


        /* Animacja przycisku */

        themeToggle.animate(
            [
                {
                    transform: "rotate(0deg) scale(1)"
                },
                {
                    transform: "rotate(180deg) scale(1.12)"
                },
                {
                    transform: "rotate(360deg) scale(1)"
                }
            ],
            {
                duration: 450,
                easing: "ease"
            }
        );

    });

}


/* =========================================================
   6. ANIMACJA STRONY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");

});


/* =========================================================
   7. LINKI ZEWNĘTRZNE
   ========================================================= */

document
    .querySelectorAll('a[target="_blank"]')
    .forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

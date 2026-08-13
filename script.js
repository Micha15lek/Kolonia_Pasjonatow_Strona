/* =========================================================
   KOLONIA PASJONATÓW
   SCRIPT.JS
   TRYB JASNY / CIEMNY
   ========================================================= */


/* =========================================================
   1. PRZEŁĄCZNIK MOTYWU
========================================================= */

const themeToggle = document.getElementById("themeToggle");


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

        document.body.classList.add("light");

    } else {

        document.body.classList.remove("light");

    }


    /* Zmiana samej ikonki */

    if (themeToggle) {

        themeToggle.textContent =
            theme === "light"
                ? "🌙"
                : "☀️";

    }


    /* Zapamiętanie wyboru */

    localStorage.setItem(
        "theme",
        theme
    );

}


/* =========================================================
   4. URUCHOMIENIE MOTYWU
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
                localStorage.getItem("theme") || "dark";


            if (currentTheme === "dark") {

                applyTheme("light");

            } else {

                applyTheme("dark");

            }

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

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(
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

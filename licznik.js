/* =========================================================
   KOLONIA PASJONATÓW
   LICZNIK.JS
========================================================= */


/* =========================================================
   KONFIGURACJA
========================================================= */

/*
   DATA STARTU KOLONII

   ZMIEŃ TYLKO TĘ DATĘ, jeśli data startu jest inna.

   Format:
   ROK, MIESIĄC - 1, DZIEŃ, GODZINA, MINUTA, SEKUNDA
*/

const KOLONIA_START = new Date(
    2026,
    2,
    21,
    0,
    0,
    0
);


/*
   AKTUALNA LICZBA UŻYTKOWNIKÓW

   Na razie liczba jest ustawiana tutaj.

   Później możemy podłączyć prawdziwe API,
   Discorda albo inną bazę danych.
*/

let USERS_COUNT = 0;


/* =========================================================
   ELEMENTY HTML
========================================================= */

const usersCount =
    document.getElementById("usersCount");

const daysSinceStart =
    document.getElementById("daysSinceStart");

const uptime =
    document.getElementById("uptime");

const detailedUptime =
    document.getElementById("detailedUptime");

const daysToChristmas =
    document.getElementById("daysToChristmas");

const daysToNewYear =
    document.getElementById("daysToNewYear");

const daysToYearEnd =
    document.getElementById("daysToYearEnd");

const lastUpdate =
    document.getElementById("lastUpdate");


/* =========================================================
   FORMATOWANIE LICZB
========================================================= */

function formatNumber(number) {

    return new Intl.NumberFormat(
        "pl-PL"
    ).format(number);

}


/* =========================================================
   LICZBA UŻYTKOWNIKÓW
========================================================= */

function updateUsers() {

    if (!usersCount) {
        return;
    }

    usersCount.textContent =
        formatNumber(USERS_COUNT);

}


/* =========================================================
   DNI OD STARTU KOLONII
========================================================= */

function updateDaysSinceStart(now) {

    const difference =
        now.getTime() -
        KOLONIA_START.getTime();


    if (difference < 0) {

        daysSinceStart.textContent = "0";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    daysSinceStart.textContent =
        formatNumber(days);

}


/* =========================================================
   DOKŁADNY CZAS DZIAŁANIA
========================================================= */

function updateUptime(now) {

    let difference =
        now.getTime() -
        KOLONIA_START.getTime();


    if (difference < 0) {

        uptime.textContent =
            "Jeszcze nie wystartowała";

        detailedUptime.textContent =
            "Kolonia jeszcze nie wystartowała.";

        return;
    }


    const seconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            seconds / 86400
        );


    const hours =
        Math.floor(
            (seconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const secs =
        seconds % 60;


    uptime.textContent =
        `${days} dni`;


    detailedUptime.textContent =
        `${days} dni, ` +
        `${hours} godz., ` +
        `${minutes} min, ` +
        `${secs} sek.`;

}


/* =========================================================
   NAJBLIŻSZE ŚWIĘTA
========================================================= */

function updateChristmas(now) {

    let year =
        now.getFullYear();


    let christmas =
        new Date(
            year,
            11,
            25,
            0,
            0,
            0
        );


    /*
       Jeżeli tegoroczne Święta już minęły,
       ustawiamy następny rok.
    */

    if (now >= christmas) {

        christmas =
            new Date(
                year + 1,
                11,
                25,
                0,
                0,
                0
            );

    }


    const difference =
        christmas.getTime() -
        now.getTime();


    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    daysToChristmas.textContent =
        formatNumber(days);

}


/* =========================================================
   NOWY ROK
========================================================= */

function updateNewYear(now) {

    let year =
        now.getFullYear();


    let newYear =
        new Date(
            year + 1,
            0,
            1,
            0,
            0,
            0
        );


    const difference =
        newYear.getTime() -
        now.getTime();


    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    daysToNewYear.textContent =
        formatNumber(days);

}


/* =========================================================
   KONIEC ROKU
========================================================= */

function updateYearEnd(now) {

    const year =
        now.getFullYear();


    const endOfYear =
        new Date(
            year + 1,
            0,
            1,
            0,
            0,
            0
        );


    const difference =
        endOfYear.getTime() -
        now.getTime();


    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    daysToYearEnd.textContent =
        formatNumber(days);

}


/* =========================================================
   OSTATNIA AKTUALIZACJA
========================================================= */

function updateLastUpdate(now) {

    const time =
        now.toLocaleTimeString(
            "pl-PL",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    lastUpdate.textContent =
        time;

}


/* =========================================================
   GŁÓWNA FUNKCJA
========================================================= */

function updateAllCounters() {

    const now =
        new Date();


    updateUsers();

    updateDaysSinceStart(now);

    updateUptime(now);

    updateChristmas(now);

    updateNewYear(now);

    updateYearEnd(now);

    updateLastUpdate(now);

}


/* =========================================================
   START
========================================================= */

updateAllCounters();


/*
   Aktualizacja co sekundę.
*/

setInterval(
    updateAllCounters,
    1000
);


/* =========================================================
   TRYB JASNY / CIEMNY / RETRO
========================================================= */

/*
   Ten fragment współpracuje z Twoim
   wspólnym style.css.

   Zapamiętuje wybrany tryb.
*/

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


function applySavedTheme() {

    const savedTheme =
        localStorage.getItem(
            "koloniaTheme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light"
        );

        document.body.classList.remove(
            "retro"
        );

    }


    else if (savedTheme === "retro") {

        document.body.classList.add(
            "retro"
        );

        document.body.classList.remove(
            "light"
        );

    }


    else {

        document.body.classList.remove(
            "light",
            "retro"
        );

    }

}


applySavedTheme();


/* =========================================================
   PRZEŁĄCZANIE TRYBU
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            if (
                document.body.classList.contains(
                    "retro"
                )
            ) {

                document.body.classList.remove(
                    "retro"
                );

                document.body.classList.add(
                    "light"
                );

                localStorage.setItem(
                    "koloniaTheme",
                    "light"
                );

                return;
            }


            if (
                document.body.classList.contains(
                    "light"
                )
            ) {

                document.body.classList.remove(
                    "light"
                );

                localStorage.setItem(
                    "koloniaTheme",
                    "dark"
                );

                return;
            }


            document.body.classList.add(
                "retro"
            );

            localStorage.setItem(
                "koloniaTheme",
                "retro"
            );

        }
    );

              }

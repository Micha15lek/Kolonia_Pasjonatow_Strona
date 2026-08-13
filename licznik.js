"use strict";

/* =====================================================
   USTAWIENIA
===================================================== */

/*
   Aktualna liczba użytkowników Kolonii Pasjonatów.
   Liczba NIE obejmuje botów.
*/
const USERS_COUNT = 17;


/* =====================================================
   DATY STARTU
===================================================== */

/*
   Start Kolonii Pasjonatów:
   11.06.2026
*/
const COLONY_START =
    new Date("2026-06-11T00:00:00");


/*
   Start strony internetowej:
   13.08.2026, godz. 19:00
*/
const WEBSITE_START =
    new Date("2026-08-13T19:00:00");


/* =====================================================
   DATY ODLICZAŃ
===================================================== */

/*
   Koniec wakacji:
   31.08.2026, godz. 23:59:59
*/
const VACATION_END =
    new Date("2026-08-31T23:59:59");


/*
   Halloween:
   31.10.2026, godz. 00:00
*/
const HALLOWEEN =
    new Date("2026-10-31T00:00:00");


/*
   Wigilia:
   24.12.2026, godz. 00:00
*/
const CHRISTMAS =
    new Date("2026-12-24T00:00:00");


/*
   Koniec roku:
   31.12.2026, godz. 23:59:59
*/
const YEAR_END =
    new Date("2026-12-31T23:59:59");


/*
   Wielkanoc:
   28.03.2027, godz. 00:00
*/
const EASTER =
    new Date("2027-03-28T00:00:00");


/* =====================================================
   ELEMENTY HTML
===================================================== */

const usersCount =
    document.getElementById("usersCount");

const colonyUptime =
    document.getElementById("colonyUptime");

const websiteUptime =
    document.getElementById("websiteUptime");

const vacationCountdown =
    document.getElementById("vacationCountdown");

const halloweenCountdown =
    document.getElementById("halloweenCountdown");

const christmasCountdown =
    document.getElementById("christmasCountdown");

const yearEndCountdown =
    document.getElementById("yearEndCountdown");

const easterCountdown =
    document.getElementById("easterCountdown");

const lastUpdate =
    document.getElementById("lastUpdate");


/* =====================================================
   LICZBA UŻYTKOWNIKÓW
===================================================== */

if (usersCount) {

    usersCount.textContent =
        USERS_COUNT.toLocaleString("pl-PL");

}


/* =====================================================
   FORMATOWANIE CZASU
===================================================== */

function formatDuration(milliseconds) {

    if (milliseconds <= 0) {

        return "0 dni, 0 godz. 0 min. 0 sek.";

    }


    const totalSeconds =
        Math.floor(milliseconds / 1000);


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    return (
        days +
        " dni, " +
        hours +
        " godz. " +
        minutes +
        " min. " +
        seconds +
        " sek."
    );

}


/* =====================================================
   ODLICZANIE DO DATY
===================================================== */

function countdownTo(targetDate) {

    const now =
        new Date();


    const difference =
        targetDate.getTime() -
        now.getTime();


    if (difference <= 0) {

        return "0 dni, 0 godz. 0 min. 0 sek.";

    }


    return formatDuration(
        difference
    );

}


/* =====================================================
   CZAS DZIAŁANIA KOLONII I STRONY
===================================================== */

function updateUptime() {

    const now =
        new Date();


    /* -------------------------------------------------
       KOLONIA PASJONATÓW
    ------------------------------------------------- */

    if (colonyUptime) {

        const difference =
            now.getTime() -
            COLONY_START.getTime();


        if (difference >= 0) {

            colonyUptime.textContent =
                formatDuration(
                    difference
                );

        }

        else {

            colonyUptime.textContent =
                "Kolonia jeszcze nie wystartowała.";

        }

    }


    /* -------------------------------------------------
       STRONA INTERNETOWA
    ------------------------------------------------- */

    if (websiteUptime) {

        const difference =
            now.getTime() -
            WEBSITE_START.getTime();


        if (difference >= 0) {

            websiteUptime.textContent =
                formatDuration(
                    difference
                );

        }

        else {

            websiteUptime.textContent =
                "Strona jeszcze nie wystartowała.";

        }

    }

}


/* =====================================================
   ODLICZANIE
===================================================== */

function updateCountdowns() {

    /* KONIEC WAKACJI */

    if (vacationCountdown) {

        vacationCountdown.textContent =
            countdownTo(
                VACATION_END
            );

    }


    /* HALLOWEEN */

    if (halloweenCountdown) {

        halloweenCountdown.textContent =
            countdownTo(
                HALLOWEEN
            );

    }


    /* WIGILIA */

    if (christmasCountdown) {

        christmasCountdown.textContent =
            countdownTo(
                CHRISTMAS
            );

    }


    /* KONIEC ROKU */

    if (yearEndCountdown) {

        yearEndCountdown.textContent =
            countdownTo(
                YEAR_END
            );

    }


    /* WIELKANOC */

    if (easterCountdown) {

        easterCountdown.textContent =
            countdownTo(
                EASTER
            );

    }

}


/* =====================================================
   OSTATNIA AKTUALIZACJA
===================================================== */

function updateLastUpdate() {

    if (!lastUpdate) {

        return;

    }


    const now =
        new Date();


    lastUpdate.textContent =
        now.toLocaleString(
            "pl-PL",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

}


/* =====================================================
   GŁÓWNA FUNKCJA
===================================================== */

function updateAll() {

    updateUptime();

    updateCountdowns();

    updateLastUpdate();

}


/* =====================================================
   URUCHOMIENIE
===================================================== */

updateAll();


/*
   Automatyczna aktualizacja
   co 1 sekundę.
*/
setInterval(
    updateAll,
    1000
);

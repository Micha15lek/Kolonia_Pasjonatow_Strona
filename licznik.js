/* =====================================================
   LICZNIK — KOLONIA PASJONATÓW
===================================================== */


/* =====================================================
   UŻYTKOWNICY

   Wpisz tutaj aktualną liczbę członków Kolonii
   BEZ BOTÓW.
===================================================== */

const USERS_COUNT = 0;


/* =====================================================
   DATY STARTOWE
===================================================== */

const colonyStart =
    new Date("2026-06-11T00:00:00");

const websiteStart =
    new Date("2026-08-13T19:00:00");


/* =====================================================
   DATY WYDARZEŃ
===================================================== */

const events = {

    summer: new Date(
        "2026-08-31T23:59:59"
    ),

    halloween: new Date(
        "2026-10-31T00:00:00"
    ),

    christmas: new Date(
        "2026-12-24T00:00:00"
    ),

    newYear: new Date(
        "2026-12-31T23:59:59"
    ),

    easter: new Date(
        "2027-03-28T00:00:00"
    )

};


/* =====================================================
   ELEMENTY HTML
===================================================== */

const usersCount =
    document.getElementById("usersCount");

const colonyUptime =
    document.getElementById("colonyUptime");

const websiteUptime =
    document.getElementById("websiteUptime");

const summerCountdown =
    document.getElementById("summerCountdown");

const halloweenCountdown =
    document.getElementById("halloweenCountdown");

const christmasCountdown =
    document.getElementById("christmasCountdown");

const newYearCountdown =
    document.getElementById("newYearCountdown");

const easterCountdown =
    document.getElementById("easterCountdown");

const currentTime =
    document.getElementById("currentTime");


/* =====================================================
   LICZBA UŻYTKOWNIKÓW
===================================================== */

if (usersCount) {

    usersCount.textContent =
        USERS_COUNT;

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
   ODLICZANIE
===================================================== */

function countdownTo(date) {

    const now =
        new Date();

    const difference =
        date - now;


    if (difference <= 0) {

        return "Wydarzenie już się odbyło";

    }


    return formatDuration(
        difference
    );

}


/* =====================================================
   CZAS OD STARTU
===================================================== */

function timeSince(date) {

    const now =
        new Date();

    const difference =
        now - date;


    if (difference <= 0) {

        return "Jeszcze się nie rozpoczęło";

    }


    return formatDuration(
        difference
    );

}


/* =====================================================
   AKTUALIZACJA LICZNIKÓW
===================================================== */

function updateCounters() {


    /* KOLONIA */

    if (colonyUptime) {

        colonyUptime.textContent =
            timeSince(colonyStart);

    }


    /* STRONA */

    if (websiteUptime) {

        websiteUptime.textContent =
            timeSince(websiteStart);

    }


    /* KONIEC WAKACJI */

    if (summerCountdown) {

        summerCountdown.textContent =
            countdownTo(events.summer);

    }


    /* HALLOWEEN */

    if (halloweenCountdown) {

        halloweenCountdown.textContent =
            countdownTo(events.halloween);

    }


    /* WIGILIA */

    if (christmasCountdown) {

        christmasCountdown.textContent =
            countdownTo(events.christmas);

    }


    /* KONIEC ROKU */

    if (newYearCountdown) {

        newYearCountdown.textContent =
            countdownTo(events.newYear);

    }


    /* WIELKANOC */

    if (easterCountdown) {

        easterCountdown.textContent =
            countdownTo(events.easter);

    }


    /* AKTUALNY CZAS */

    if (currentTime) {

        const now =
            new Date();

        currentTime.textContent =
            now.toLocaleString(
                "pl-PL",
                {
                    dateStyle: "full",
                    timeStyle: "medium"
                }
            );

    }

}


/* =====================================================
   START
===================================================== */

updateCounters();


/* Aktualizacja co sekundę */

setInterval(
    updateCounters,
    1000
);

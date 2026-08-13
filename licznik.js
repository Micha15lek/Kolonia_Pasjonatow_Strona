/* =====================================================
   LICZNIK — KOLONIA PASJONATÓW
===================================================== */


/* =====================================================
   USTAWIENIA
===================================================== */


/*
    Liczba wszystkich użytkowników Kolonii.
    Boty nie są tutaj uwzględniane.
*/

const USERS_COUNT = 17;


/*
    START KOLONII PASJONATÓW

    11.06.2026
*/

const COLONY_START =
    new Date(2026, 5, 11, 0, 0, 0);


/*
    START STRONY INTERNETOWEJ

    13.08.2026
    godz. 20:10
*/

const WEBSITE_START =
    new Date(2026, 7, 13, 20, 10, 0);


/* =====================================================
   ELEMENTY HTML
===================================================== */

const usersCount =
    document.getElementById("usersCount");

const colonyUptime =
    document.getElementById("colonyUptime");

const websiteUptime =
    document.getElementById("websiteUptime");

const daysToSummerEnd =
    document.getElementById("daysToSummerEnd");

const daysToHalloween =
    document.getElementById("daysToHalloween");

const daysToChristmas =
    document.getElementById("daysToChristmas");

const daysToNewYear =
    document.getElementById("daysToNewYear");

const daysToYearEnd =
    document.getElementById("daysToYearEnd");

const daysToEaster =
    document.getElementById("daysToEaster");

const detailedUptime =
    document.getElementById("detailedUptime");

const websiteDetailedUptime =
    document.getElementById("websiteDetailedUptime");

const lastUpdate =
    document.getElementById("lastUpdate");


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

        return "0 dni, 0 godzin, 0 minut, 0 sekund";

    }


    const totalSeconds =
        Math.floor(
            milliseconds / 1000
        );


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
        " godzin, " +
        minutes +
        " minut, " +
        seconds +
        " sekund"
    );

}


/* =====================================================
   ODLICZANIE
===================================================== */

function countdown(
    targetDate,
    finishedMessage
) {

    const now =
        new Date();


    const difference =
        targetDate.getTime() -
        now.getTime();


    if (difference <= 0) {

        return finishedMessage;

    }


    return formatDuration(
        difference
    );

}


/* =====================================================
   WIELKANOC
===================================================== */

function getEasterDate(year) {

    const a =
        year % 19;

    const b =
        Math.floor(year / 100);

    const c =
        year % 100;

    const d =
        Math.floor(b / 4);

    const e =
        b % 4;

    const f =
        Math.floor(
            (b + 8) / 25
        );

    const g =
        Math.floor(
            (b - f + 1) / 3
        );

    const h =
        (
            19 * a +
            b -
            d -
            g +
            15
        ) % 30;

    const i =
        Math.floor(c / 4);

    const k =
        c % 4;

    const l =
        (
            32 +
            2 * e +
            2 * i -
            h -
            k
        ) % 7;

    const m =
        Math.floor(
            (
                a +
                11 * h +
                22 * l
            ) / 451
        );

    const month =
        Math.floor(
            (
                h +
                l -
                7 * m +
                114
            ) / 31
        );

    const day =
        (
            (
                h +
                l -
                7 * m +
                114
            ) % 31
        ) + 1;


    return new Date(
        year,
        month - 1,
        day,
        0,
        0,
        0
    );

}


/* =====================================================
   NAJBLIŻSZE WAKACJE
===================================================== */

function getSummerDate() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    /*
        Początek wakacji:
        26 czerwca
    */

    const summerStart =
        new Date(
            year,
            5,
            26,
            0,
            0,
            0
        );


    /*
        Koniec wakacji:
        31 sierpnia
        godz. 23:59:59
    */

    const summerEnd =
        new Date(
            year,
            7,
            31,
            23,
            59,
            59
        );


    /*
        Jeżeli jesteśmy w trakcie wakacji,
        liczymy do ich końca.
    */

    if (
        now >= summerStart &&
        now <= summerEnd
    ) {

        return {

            date: summerEnd,

            message:
                "🏖️ Wakacje już się skończyły!"

        };

    }


    /*
        Jeżeli wakacje już się skończyły,
        liczymy do początku kolejnych wakacji.
    */

    if (
        now > summerEnd
    ) {

        return {

            date:
                new Date(
                    year + 1,
                    5,
                    26,
                    0,
                    0,
                    0
                ),

            message:
                "🏖️ Wakacje już się rozpoczęły!"

        };

    }


    /*
        Jeżeli jesteśmy przed 26 czerwca,
        liczymy do początku wakacji.
    */

    return {

        date:
            summerStart,

        message:
            "🏖️ Wakacje już się rozpoczęły!"

    };

}


/* =====================================================
   DATY ŚWIĄT
===================================================== */

function getEventDates() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    /* =================================================
       HALLOWEEN
    ================================================= */

    let halloween =
        new Date(
            year,
            9,
            31,
            0,
            0,
            0
        );


    /*
        Jeżeli Halloween już minęło,
        następne będzie w kolejnym roku.
    */

    if (
        now > halloween
    ) {

        halloween =
            new Date(
                year + 1,
                9,
                31,
                0,
                0,
                0
            );

    }


    /* =================================================
       WIGILIA
    ================================================= */

    let christmas =
        new Date(
            year,
            11,
            24,
            0,
            0,
            0
        );


    /*
        24.12 pokazujemy komunikat.
        Od 25.12 liczymy już do następnej Wigilii.
    */

    if (
        now.getMonth() === 11 &&
        now.getDate() >= 25
    ) {

        christmas =
            new Date(
                year + 1,
                11,
                24,
                0,
                0,
                0
            );

    }


    /* =================================================
       NOWY ROK
    ================================================= */

    let newYear =
        new Date(
            year,
            11,
            31,
            0,
            0,
            0
        );


    /*
        Po 31.12 licznik przechodzi
        do kolejnego 31 grudnia.
    */

    if (
        now.getMonth() === 0
    ) {

        newYear =
            new Date(
                year,
                11,
                31,
                0,
                0,
                0
            );

    }


    /*
        Od 01.01 do 30.12
        zawsze liczymy do 31.12
        bieżącego roku.
    */

    if (
        now.getMonth() >= 1 &&
        now.getMonth() <= 11
    ) {

        newYear =
            new Date(
                year,
                11,
                31,
                0,
                0,
                0
            );

    }


    /* =================================================
       KONIEC ROKU
    ================================================= */

    let yearEnd =
        new Date(
            year,
            11,
            31,
            23,
            59,
            59
        );


    if (
        now > yearEnd
    ) {

        yearEnd =
            new Date(
                year + 1,
                11,
                31,
                23,
                59,
                59
            );

    }


    /* =================================================
       WIELKANOC
    ================================================= */

    let easter =
        getEasterDate(
            year
        );


    /*
        Po Wielkanocy liczymy już
        do Wielkanocy następnego roku.
    */

    if (
        now > easter
    ) {

        easter =
            getEasterDate(
                year + 1
            );

    }


    return {

        halloween,

        christmas,

        newYear,

        yearEnd,

        easter

    };

}


/* =====================================================
   AKTUALIZACJA LICZNIKÓW
===================================================== */

function updateCounters() {

    const now =
        new Date();


    /* =================================================
       CZAS OD STARTU KOLONII
    ================================================= */

    const colonyDifference =
        now.getTime() -
        COLONY_START.getTime();


    const colonyTime =
        formatDuration(
            colonyDifference
        );


    if (colonyUptime) {

        colonyUptime.textContent =
            colonyTime;

    }


    if (detailedUptime) {

        detailedUptime.textContent =
            colonyTime;

    }


    /* =================================================
       CZAS OD STARTU STRONY
    ================================================= */

    const websiteDifference =
        now.getTime() -
        WEBSITE_START.getTime();


    const websiteTime =
        formatDuration(
            websiteDifference
        );


    if (websiteUptime) {

        websiteUptime.textContent =
            websiteTime;

    }


    if (websiteDetailedUptime) {

        websiteDetailedUptime.textContent =
            websiteTime;

    }


    /* =================================================
       WAKACJE
    ================================================= */

    const summer =
        getSummerDate();


    if (daysToSummerEnd) {

        /*
            Podczas wakacji licznik pokazuje
            czas do 31.08.

            Po wakacjach pokazuje czas
            do 26.06 kolejnego roku.
        */

        daysToSummerEnd.textContent =
            countdown(
                summer.date,
                summer.message
            );

    }


    /* =================================================
       POZOSTAŁE DATY
    ================================================= */

    const dates =
        getEventDates();


    /* =================================================
       HALLOWEEN
    ================================================= */

    if (daysToHalloween) {

        /*
            31.10 — komunikat.
            01.11 — automatycznie kolejny rok.
        */

        const halloweenNow =
            new Date();

        const halloweenToday =
            halloweenNow.getMonth() === 9 &&
            halloweenNow.getDate() === 31;


        if (halloweenToday) {

            daysToHalloween.textContent =
                "🎃 Już jest! Wesołego Halloween! 👻";

        }

        else {

            daysToHalloween.textContent =
                countdown(
                    dates.halloween,
                    "🎃 Już jest! Wesołego Halloween! 👻"
                );

        }

    }


    /* =================================================
       WIGILIA
    ================================================= */

    if (daysToChristmas) {

        const christmasToday =
            now.getMonth() === 11 &&
            now.getDate() === 24;


        if (christmasToday) {

            daysToChristmas.textContent =
                "🎄 Już są! Wesołych Świąt! ❤️";

        }

        else {

            daysToChristmas.textContent =
                countdown(
                    dates.christmas,
                    "🎄 Już są! Wesołych Świąt! ❤️"
                );

        }

    }


    /* =================================================
       NOWY ROK
    ================================================= */

    if (daysToNewYear) {

        const newYearToday =
            now.getMonth() === 11 &&
            now.getDate() === 31;


        if (newYearToday) {

            daysToNewYear.textContent =
                "🎆 Już jest! Szczęśliwego Nowego Roku! 🥳";

        }

        else {

            daysToNewYear.textContent =
                countdown(
                    dates.newYear,
                    "🎆 Już jest! Szczęśliwego Nowego Roku! 🥳"
                );

        }

    }


    /* =================================================
       KONIEC ROKU
    ================================================= */

    if (daysToYearEnd) {

        daysToYearEnd.textContent =
            countdown(
                dates.yearEnd,
                "🎆 To już koniec roku! Szczęśliwego Nowego Roku!"
            );

    }


    /* =================================================
       WIELKANOC
    ================================================= */

    if (daysToEaster) {

        const today =
            new Date();

        const easterToday =
            today.getFullYear() ===
                dates.easter.getFullYear() &&

            today.getMonth() ===
                dates.easter.getMonth() &&

            today.getDate() ===
                dates.easter.getDate();


        if (easterToday) {

            daysToEaster.textContent =
                "🐣 Już są! Wesołych Świąt Wielkanocnych! 🐰";

        }

        else {

            daysToEaster.textContent =
                countdown(
                    dates.easter,
                    "🐣 Już są! Wesołych Świąt Wielkanocnych! 🐰"
                );

        }

    }


    /* =================================================
       AKTUALNY CZAS URZĄDZENIA
    ================================================= */

    if (lastUpdate) {

        lastUpdate.textContent =
            now.toLocaleString(
                "pl-PL"
            );

    }

}


/* =====================================================
   PIERWSZE URUCHOMIENIE
===================================================== */

updateCounters();


/* =====================================================
   AKTUALIZACJA CO SEKUNDĘ
===================================================== */

setInterval(
    updateCounters,
    1000
);

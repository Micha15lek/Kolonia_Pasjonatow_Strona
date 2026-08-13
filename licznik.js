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
   TYLKO JEŚLI ELEMENT ISTNIEJE
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
   WAKACJE
===================================================== */

function getSummerDate() {

    const now =
        new Date();

    const year =
        now.getFullYear();


    const summerStart =
        new Date(
            year,
            5,
            26,
            0,
            0,
            0
        );


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
        W TRAKCIE WAKACJI
        → liczymy do końca wakacji
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
        PO WAKACJACH
        → liczymy do następnych wakacji
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
        PRZED WAKACJAMI
        → liczymy do 26 czerwca
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
       KOLONIA
       WYKONUJE SIĘ TYLKO NA STRONIE
       GDZIE JEST colonyUptime
    ================================================= */

    if (
        colonyUptime ||
        detailedUptime
    ) {

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

    }


    /* =================================================
       STRONA
       WYKONUJE SIĘ TYLKO NA STRONIE
       GDZIE JEST websiteUptime
    ================================================= */

    if (
        websiteUptime ||
        websiteDetailedUptime
    ) {

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

    }


    /* =================================================
       WAKACJE
       TYLKO JEŚLI LICZNIK ISTNIEJE
    ================================================= */

    if (daysToSummerEnd) {

        const summer =
            getSummerDate();


        daysToSummerEnd.textContent =
            countdown(
                summer.date,
                summer.message
            );

    }


    /* =================================================
       ŚWIĘTA
       DATY SĄ OBLICZANE TYLKO WTEDY,
       GDY POTRZEBNY JEST PRZYNAJMNIEJ JEDEN
       LICZNIK ŚWIĄTECZNY
    ================================================= */

    if (
        daysToHalloween ||
        daysToChristmas ||
        daysToNewYear ||
        daysToYearEnd ||
        daysToEaster
    ) {

        const dates =
            getEventDates();


        /* =============================================
           HALLOWEEN
        ============================================= */

        if (daysToHalloween) {

            const halloweenToday =
                now.getMonth() === 9 &&
                now.getDate() === 31;


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


        /* =============================================
           WIGILIA
        ============================================= */

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


        /* =============================================
           NOWY ROK
        ============================================= */

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


        /* =============================================
           KONIEC ROKU
        ============================================= */

        if (daysToYearEnd) {

            daysToYearEnd.textContent =
                countdown(
                    dates.yearEnd,
                    "🎆 To już koniec roku! Szczęśliwego Nowego Roku!"
                );

        }


        /* =============================================
           WIELKANOC
        ============================================= */

        if (daysToEaster) {

            const easterToday =
                now.getFullYear() ===
                    dates.easter.getFullYear() &&

                now.getMonth() ===
                    dates.easter.getMonth() &&

                now.getDate() ===
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

    }


    /* =================================================
       OSTATNIA AKTUALIZACJA
       TYLKO JEŚLI ELEMENT ISTNIEJE
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

const COLONY_START = "2026-06-11T00:00:00";
const WEBSITE_START = "2026-08-13T20:10:00";


/* =========================================
   ŚWIĘTA I WYDARZENIA
========================================= */

const EVENTS = {

    halloween: {
        month: 10,
        day: 31,
        activeMessage: "Już jest! Straszenie Halloween 🎃"
    },

    christmas: {
        month: 12,
        day: 24,
        activeMessage:
            "Już jest! Miłej i spokojnej Wigilii. Spędź ją ze swoimi bliskimi. Wesołych Świąt! 🎄"
    },

    newYear: {
        month: 1,
        day: 1,
        activeMessage: "Już jest! 🎆"
    },

    easter: {
        month: 3,
        day: 28,
        activeMessage: "Już jest! Wesołego jajka! 🐣"
    },

    sylwester: {
        month: 12,
        day: 31,
        activeMessage: "Już jest! Miłego Sylwestra! 🎇"
    }

};


/* =========================================
   WYDARZENIA ROCZNE
========================================= */

const YEAR_EVENTS = {

    summer2027: {
        date: "2027-06-26T00:00:00",
        activeMessage: "Już są! Wesołych wakacji! 🏖️"
    },

    end2026: {
        date: "2026-12-31T00:00:00",
        activeMessage: "Już jest! Koniec 2026 roku! 🎉"
    }

};


/* =========================================
   FERIE ZIMOWE
========================================= */

const FERIE = {

    "dolnoslaskie": ["18.01.2027", "31.01.2027"],
    "lodzkie": ["18.01.2027", "31.01.2027"],
    "opolskie": ["18.01.2027", "31.01.2027"],
    "podkarpackie": ["18.01.2027", "31.01.2027"],
    "podlaskie": ["18.01.2027", "31.01.2027"],
    "slaskie": ["18.01.2027", "31.01.2027"],

    "lubelskie": ["01.02.2027", "14.02.2027"],
    "mazowieckie": ["01.02.2027", "14.02.2027"],
    "pomorskie": ["01.02.2027", "14.02.2027"],
    "swietokrzyskie": ["01.02.2027", "14.02.2027"],

    "kujawsko-pomorskie": ["15.02.2027", "28.02.2027"],
    "lubuskie": ["15.02.2027", "28.02.2027"],
    "malopolskie": ["15.02.2027", "28.02.2027"],
    "warminsko-mazurskie": ["15.02.2027", "28.02.2027"],
    "wielkopolskie": ["15.02.2027", "28.02.2027"],
    "zachodniopomorskie": ["15.02.2027", "28.02.2027"]

};


/* =========================================
   FORMATOWANIE CZASU
========================================= */

function formatTime(milliseconds) {

    const totalSeconds = Math.max(
        0,
        Math.floor(milliseconds / 1000)
    );

    const days = Math.floor(
        totalSeconds / 86400
    );

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds =
        totalSeconds % 60;


    return `${days} DNI ${String(hours).padStart(2, "0")} GODZ. ${String(minutes).padStart(2, "0")} MIN. ${String(seconds).padStart(2, "0")} SEK.`;
}


/* =========================================
   CZAS DZIAŁANIA
========================================= */

function updateUptime() {

    const now = new Date();


    const colonyTime =
        now - new Date(COLONY_START);

    const websiteTime =
        now - new Date(WEBSITE_START);


    const colonyText =
        formatTime(colonyTime);

    const websiteText =
        formatTime(websiteTime);


    const colony =
        document.getElementById("colonyUptime");

    const website =
        document.getElementById("websiteUptime");

    const detailedColony =
        document.getElementById("detailedUptime");

    const detailedWebsite =
        document.getElementById("websiteDetailedUptime");


    if (colony) {
        colony.textContent = colonyText;
    }

    if (website) {
        website.textContent = websiteText;
    }

    if (detailedColony) {
        detailedColony.textContent = colonyText;
    }

    if (detailedWebsite) {
        detailedWebsite.textContent = websiteText;
    }
}


/* =========================================
   NAJBLIŻSZA DATA ŚWIĘTA
========================================= */

function getNextEventDate(event) {

    const now = new Date();

    let year = now.getFullYear();


    let date = new Date(
        year,
        event.month - 1,
        event.day,
        0,
        0,
        0
    );


    if (date <= now) {

        date = new Date(
            year + 1,
            event.month - 1,
            event.day,
            0,
            0,
            0
        );
    }


    return date;
}


/* =========================================
   FORMAT DATY
========================================= */

function formatDate(date) {

    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
}


/* =========================================
   OBSŁUGA ŚWIĘTA
========================================= */

function updateEvent(
    event,
    countdownId,
    dateId
) {

    const countdown =
        document.getElementById(countdownId);

    const dateElement =
        document.getElementById(dateId);


    if (!countdown) {
        return;
    }


    const now = new Date();

    const currentYear =
        now.getFullYear();


    const eventStart = new Date(
        currentYear,
        event.month - 1,
        event.day,
        0,
        0,
        0
    );


    const eventEnd = new Date(
        currentYear,
        event.month - 1,
        event.day + 1,
        0,
        0,
        0
    );


    /* DZIEŃ WYDARZENIA */

    if (
        now >= eventStart &&
        now < eventEnd
    ) {

        if (dateElement) {
            dateElement.textContent =
                formatDate(eventStart);
        }

        countdown.textContent =
            event.activeMessage;

        return;
    }


    /* KOLEJNA EDYCJA */

    const nextDate =
        getNextEventDate(event);


    if (dateElement) {
        dateElement.textContent =
            formatDate(nextDate);
    }


    countdown.textContent =
        formatTime(
            nextDate - now
        );
}


/* =========================================
   WYDARZENIA ROCZNE
========================================= */

function updateYearEvent(
    event,
    elementId
) {

    const element =
        document.getElementById(elementId);


    if (!element) {
        return;
    }


    const now = new Date();

    const target =
        new Date(event.date);


    /*
       W dniu wydarzenia
    */

    const targetDayStart =
        new Date(
            target.getFullYear(),
            target.getMonth(),
            target.getDate(),
            0,
            0,
            0
        );


    const targetDayEnd =
        new Date(
            target.getFullYear(),
            target.getMonth(),
            target.getDate() + 1,
            0,
            0,
            0
        );


    if (
        now >= targetDayStart &&
        now < targetDayEnd
    ) {

        element.textContent =
            event.activeMessage;

        return;
    }


    /*
       Przed wydarzeniem
    */

    if (now < targetDayStart) {

        element.textContent =
            formatTime(
                targetDayStart - now
            );

        return;
    }


    /*
       Po wydarzeniu
    */

    element.textContent =
        "Wydarzenie zakończone";
}


/* =========================================
   FERIE
========================================= */

function updateHolidays() {

    const select =
        document.getElementById(
            "voivodeshipSelect"
        );

    const dateElement =
        document.getElementById(
            "holidaysDate"
        );

    const countdown =
        document.getElementById(
            "daysToHolidays"
        );


    if (
        !select ||
        !dateElement ||
        !countdown
    ) {
        return;
    }


    const dates =
        FERIE[select.value];


    if (!dates) {
        return;
    }


    const startParts =
        dates[0]
            .split(".")
            .map(Number);

    const endParts =
        dates[1]
            .split(".")
            .map(Number);


    const start = new Date(
        startParts[2],
        startParts[1] - 1,
        startParts[0],
        0,
        0,
        0
    );


    const end = new Date(
        endParts[2],
        endParts[1] - 1,
        endParts[0],
        23,
        59,
        59
    );


    const now = new Date();


    dateElement.textContent =
        `${dates[0]} – ${dates[1]}`;


    /*
       FERIE TRWAJĄ
    */

    if (
        now >= start &&
        now <= end
    ) {

        countdown.textContent =
            "Już są! Wesołych ferii! 🏫";

        return;
    }


    /*
       PRZED FERIAMI
    */

    if (now < start) {

        countdown.textContent =
            formatTime(
                start - now
            );

        return;
    }


    /*
       PO FERIACH
    */

    countdown.textContent =
        "Ferie zakończone";
}


/* =========================================
   AKTUALIZACJA WSZYSTKIEGO
========================================= */

function updateAll() {

    updateUptime();


    updateEvent(
        EVENTS.halloween,
        "halloweenCountdown",
        "halloweenDate"
    );


    updateEvent(
        EVENTS.christmas,
        "christmasCountdown",
        "christmasDate"
    );


    updateEvent(
        EVENTS.newYear,
        "newYearCountdown",
        "newYearDate"
    );


    updateEvent(
        EVENTS.easter,
        "easterCountdown",
        "easterDate"
    );


    updateEvent(
        EVENTS.sylwester,
        "sylwesterCountdown",
        "sylwesterDate"
    );


    updateYearEvent(
        YEAR_EVENTS.summer2027,
        "summer2027Countdown"
    );


    updateYearEvent(
        YEAR_EVENTS.end2026,
        "end2026Countdown"
    );


    updateHolidays();


    const lastUpdate =
        document.getElementById(
            "lastUpdate"
        );


    if (lastUpdate) {

        lastUpdate.textContent =
            new Date().toLocaleString(
                "pl-PL"
            );
    }
}


/* =========================================
   WOJEWÓDZTWO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const select =
            document.getElementById(
                "voivodeshipSelect"
            );


        if (select) {

            const saved =
                localStorage.getItem(
                    "kolonia-voivodeship"
                );


            if (
                saved &&
                FERIE[saved]
            ) {
                select.value =
                    saved;
            }


            select.addEventListener(
                "change",
                () => {

                    localStorage.setItem(
                        "kolonia-voivodeship",
                        select.value
                    );

                    updateHolidays();
                }
            );
        }


        updateAll();


        setInterval(
            updateAll,
            1000
        );

    }
);

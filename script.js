/* =====================================================
   KOLONIA PASJONATÓW – GŁÓWNY SKRYPT
===================================================== */

/* =====================================================
   KONFIGURACJA
===================================================== */

const COLONY_START_DATE = "2026-06-11";
const WEBSITE_START_DATE = "2026-08-13T21:10:00";

const MEMBERS_COUNT = 20;


/* =====================================================
   DATA – POMOCNICZE FUNKCJE
===================================================== */

function createLocalDate(dateString) {
    const parts = dateString.split("-").map(Number);

    if (parts.length === 3) {
        return new Date(
            parts[0],
            parts[1] - 1,
            parts[2],
            0,
            0,
            0
        );
    }

    return new Date(dateString);
}


/* =====================================================
   LICZBA DNI OD DATY
===================================================== */

function getDaysSince(startDate) {
    const start = createLocalDate(startDate);

    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
    );

    const difference = today.getTime() - start.getTime();

    return Math.max(
        0,
        Math.floor(difference / (1000 * 60 * 60 * 24))
    );
}


/* =====================================================
   STATYSTYKI STRONY GŁÓWNEJ
===================================================== */

function loadStatistics() {
    const membersElement = document.getElementById("membersCount");
    const colonyDaysElement = document.getElementById("colonyDays");
    const websiteDaysElement = document.getElementById("websiteDays");

    if (membersElement) {
        membersElement.textContent = MEMBERS_COUNT;
    }

    if (colonyDaysElement) {
        colonyDaysElement.textContent =
            getDaysSince(COLONY_START_DATE);
    }

    if (websiteDaysElement) {
        const websiteStart = new Date(WEBSITE_START_DATE);
        const now = new Date();

        const difference = now.getTime() - websiteStart.getTime();

        const days = Math.max(
            0,
            Math.floor(
                difference / (1000 * 60 * 60 * 24)
            )
        );

        websiteDaysElement.textContent = days;
    }
}


/* =====================================================
   MOTYW JASNY / CIEMNY
===================================================== */

function setupTheme() {
    const button = document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    const savedTheme = localStorage.getItem("kolonia-theme");

    const isLightTheme = savedTheme === "light";

    document.body.classList.toggle(
        "light-theme",
        isLightTheme
    );

    button.textContent = isLightTheme
        ? "🌙"
        : "☀️";

    button.setAttribute(
        "aria-label",
        isLightTheme
            ? "Przełącz na ciemny motyw"
            : "Przełącz na jasny motyw"
    );

    button.title = isLightTheme
        ? "Przełącz na ciemny motyw"
        : "Przełącz na jasny motyw";

    button.addEventListener("click", () => {
        const lightTheme =
            document.body.classList.toggle("light-theme");

        localStorage.setItem(
            "kolonia-theme",
            lightTheme ? "light" : "dark"
        );

        button.textContent = lightTheme
            ? "🌙"
            : "☀️";

        button.setAttribute(
            "aria-label",
            lightTheme
                ? "Przełącz na ciemny motyw"
                : "Przełącz na jasny motyw"
        );

        button.title = lightTheme
            ? "Przełącz na ciemny motyw"
            : "Przełącz na jasny motyw";
    });
}


/* =====================================================
   AKTUALIZACJA LICZNIKÓW
===================================================== */

function updatePageCounters() {
    loadStatistics();
}


/* =====================================================
   START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    setupTheme();
    loadStatistics();

    /*
       Aktualizacja liczników co minutę.
       Nie odświeżamy całej strony.
    */
    setInterval(updatePageCounters, 60 * 1000);
});

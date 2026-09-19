```javascript
/* =====================================================
   KOLONIA PASJONATÓW – GŁÓWNY JAVASCRIPT
===================================================== */

/* =====================================================
   ⚙️ USTAWIENIA
===================================================== */

// UZUPEŁNIJ TE DATY
const COLONY_START_DATE = "2026-08-01";
const WEBSITE_START_DATE = "2026-08-01";

// Liczba członków – możesz później zmienić ręcznie
const MEMBERS_COUNT = 0;


/* =====================================================
   📅 FUNKCJE DAT
===================================================== */

function getDaysSince(dateString) {
    const startDate = new Date(dateString);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference = today - startDate;

    return Math.max(
        0,
        Math.floor(difference / (1000 * 60 * 60 * 24))
    );
}

function formatDate(date) {
    return date.toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}


/* =====================================================
   📊 STATYSTYKI
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
        websiteDaysElement.textContent =
            getDaysSince(WEBSITE_START_DATE);
    }
}


/* =====================================================
   📄 WCZYTYWANIE PODSTRON
===================================================== */

async function loadPage(url) {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Nie udało się wczytać ${url}`
            );
        }

        const html = await response.text();

        return new DOMParser().parseFromString(
            html,
            "text/html"
        );

    } catch (error) {

        console.error(error);

        return null;
    }
}


/* =====================================================
   📰 OGŁOSZENIA
===================================================== */

async function loadAnnouncements() {

    const container =
        document.getElementById("latestAnnouncements");

    if (!container) return;

    const page =
        await loadPage("ogloszenia.html");

    if (!page) {
        container.innerHTML =
            "<p>Nie udało się wczytać ogłoszeń.</p>";
        return;
    }

    const announcements =
        [...page.querySelectorAll(".announcement-card")];

    if (announcements.length === 0) {

        container.innerHTML =
            "<p>Brak ogłoszeń.</p>";

        return;
    }

    container.innerHTML = "";

    announcements
        .slice(0, 3)
        .forEach(card => {

            const clone =
                card.cloneNode(true);

            container.appendChild(clone);
        });


    /* =============================================
       📢 WAŻNA INFORMACJA
    ============================================= */

    const important =
        announcements[0];

    if (important) {

        const title =
            important.querySelector("h3");

        const text =
            important.querySelector("p");

        const importantTitle =
            document.getElementById(
                "importantAnnouncementTitle"
            );

        const importantText =
            document.getElementById(
                "importantAnnouncementText"
            );

        if (importantTitle && title) {
            importantTitle.textContent =
                title.textContent;
        }

        if (importantText && text) {
            importantText.textContent =
                text.textContent;
        }
    }
}


/* =====================================================
   📅 KALENDARZ – WSZYSTKIE WYDARZENIA
===================================================== */

async function loadCalendar() {

    const upcomingContainer =
        document.getElementById("upcomingEvents");

    const calendarContainer =
        document.getElementById("calendarPreview");

    const page =
        await loadPage("kalendarz.html");

    if (!page) {

        if (upcomingContainer) {
            upcomingContainer.innerHTML =
                "<p>Nie udało się wczytać wydarzeń.</p>";
        }

        if (calendarContainer) {
            calendarContainer.innerHTML =
                "<p>Nie udało się wczytać kalendarza.</p>";
        }

        return;
    }


    /* =============================================
       🔎 POBIERAMY WYDARZENIA
    ============================================= */

    const events =
        [...page.querySelectorAll(".event-card")];

    if (events.length === 0) {

        if (upcomingContainer) {
            upcomingContainer.innerHTML =
                "<p>Brak nadchodzących wydarzeń.</p>";
        }

        if (calendarContainer) {
            calendarContainer.innerHTML =
                "<p>Brak wydarzeń w kalendarzu.</p>";
        }

        return;
    }


    /* =============================================
       📦 PRZYGOTOWANIE DANYCH
    ============================================= */

    const eventData = events.map(card => {

        const dateElement =
            card.querySelector(".event-date");

        const titleElement =
            card.querySelector("h3");

        const textElement =
            card.querySelector("p");

        const dateText =
            dateElement
                ? dateElement.textContent.trim()
                : "";

        return {

            card: card,

            dateText: dateText,

            title:
                titleElement
                    ? titleElement.textContent.trim()
                    : "Wydarzenie",

            description:
                textElement
                    ? textElement.textContent.trim()
                    : "",

            date:
                parseEventDate(dateText)
        };
    });


    /* =============================================
       🗓️ SORTOWANIE OD NAJBLIŻSZEGO
    ============================================= */

    eventData.sort((a, b) => {

        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;

        return a.date - b.date;
    });


    /* =============================================
       📅 NADCHODZĄCE WYDARZENIA
    ============================================= */

    if (upcomingContainer) {

        upcomingContainer.innerHTML = "";

        const today =
            new Date();

        const upcoming =
            eventData.filter(event => {

                if (!event.date) return true;

                return event.date >= today;
            });

        upcoming
            .slice(0, 3)
            .forEach(event => {

                const clone =
                    event.card.cloneNode(true);

                upcomingContainer.appendChild(
                    clone
                );
            });

        if (upcoming.length === 0) {

            upcomingContainer.innerHTML =
                "<p>Brak nadchodzących wydarzeń.</p>";
        }
    }


    /* =============================================
       🗓️ 5 NAJBLIŻSZYCH WYDARZEŃ
    ============================================= */

    if (calendarContainer) {

        calendarContainer.innerHTML = "";

        const today =
            new Date();

        const nearest =
            eventData
                .filter(event => {

                    if (!event.date) return true;

                    return event.date >= today;
                })
                .slice(0, 5);

        nearest.forEach(event => {

            const clone =
                event.card.cloneNode(true);

            calendarContainer.appendChild(
                clone
            );
        });

        if (nearest.length === 0) {

            calendarContainer.innerHTML =
                "<p>Brak nadchodzących wydarzeń.</p>";
        }
    }
}


/* =====================================================
   📅 ODCZYTYWANIE DATY WYDARZENIA
===================================================== */

function parseEventDate(text) {

    if (!text) return null;

    /*
       Obsługiwane przykłady:

       23.09.2026
       23.09.2026 – 09.10.2026
       23.09
       23-09-2026
    */

    const match =
        text.match(
            /(\d{1,2})[.\-/](\d{1,2})(?:[.\-/](\d{4}))?/
        );

    if (!match) return null;

    const day =
        Number(match[1]);

    const month =
        Number(match[2]) - 1;

    const year =
        match[3]
            ? Number(match[3])
            : new Date().getFullYear();

    return new Date(
        year,
        month,
        day,
        23,
        59,
        59
    );
}


/* =====================================================
   🏆 RANKING TYPERÓW
===================================================== */

async function loadRanking() {

    const container =
        document.getElementById("rankingPreview");

    if (!container) return;

    const page =
        await loadPage("ranking.html");

    if (!page) {

        container.innerHTML =
            "<p>Nie udało się wczytać rankingu.</p>";

        return;
    }

    const rows =
        [...page.querySelectorAll(
            ".ranking-table tbody tr"
        )];

    if (rows.length === 0) {

        container.innerHTML =
            "<p>Brak danych rankingu.</p>";

        return;
    }

    container.innerHTML = "";

    const table =
        document.createElement("table");

    table.className =
        "ranking-table";

    const tbody =
        document.createElement("tbody");

    rows
        .slice(0, 10)
        .forEach(row => {

            tbody.appendChild(
                row.cloneNode(true)
            );
        });

    table.appendChild(tbody);

    container.appendChild(table);
}


/* =====================================================
   🔥 NAJAKTYWNIEJSI UŻYTKOWNICY
===================================================== */

function loadActiveUsers() {

    const container =
        document.getElementById(
            "activeUsers"
        );

    if (!container) return;

    /*
       Na razie dane można tutaj podawać ręcznie.
       Później możemy podłączyć je np. do
       systemu Discord / API / pliku JSON.
    */

    const users = [

        {
            name: "Mikol Yoriichi",
            activity: 0
        },

        {
            name: "Noworudzki_Mk08",
            activity: 0
        },

        {
            name: "Farmingowy Pan",
            activity: 0
        }

    ];

    container.innerHTML = "";

    users.forEach((user, index) => {

        const card =
            document.createElement("div");

        card.className =
            "info-card";

        card.innerHTML = `

            <div class="card-icon">
                ${index === 0 ? "🔥" : "👤"}
            </div>

            <h2>
                ${user.name}
            </h2>

            <p>
                Aktywność:
                <strong>
                    ${user.activity}
                </strong>
            </p>

        `;

        container.appendChild(card);
    });
}


/* =====================================================
   🌙 MOTYW JASNY / CIEMNY
===================================================== */

function setupTheme() {

    const button =
        document.getElementById(
            "themeToggle"
        );

    if (!button) return;

    const savedTheme =
        localStorage.getItem(
            "kolonia-theme"
        );

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        button.textContent = "🌙";

    } else {

        button.textContent = "☀️";
    }


    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );

            const light =
                document.body.classList.contains(
                    "light-theme"
                );

            localStorage.setItem(
                "kolonia-theme",
                light
                    ? "light"
                    : "dark"
            );

            button.textContent =
                light
                    ? "🌙"
                    : "☀️";
        }
    );
}


/* =====================================================
   🚀 START STRONY
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadStatistics();

        loadAnnouncements();

        loadCalendar();

        loadRanking();

        loadActiveUsers();

        setupTheme();

    }
);
```

```javascript
/* =====================================================
   KOLONIA PASJONATÓW
   GŁÓWNY JAVASCRIPT
===================================================== */


/* =====================================================
   ⚙️ USTAWIENIA
===================================================== */

/*
   DATA POWSTANIA KOLONII:
   11.06.2026
*/

const COLONY_START_DATE = "2026-06-11";


/*
   DATA URUCHOMIENIA STRONY:
   13.08.2026 godz. 21:10
*/

const WEBSITE_START_DATE = "2026-08-13T21:10:00";


/*
   LICZBA CZŁONKÓW

   Na razie ustawiamy ręcznie.
   Zmień 0 na aktualną liczbę.
*/

const MEMBERS_COUNT = 0;



/* =====================================================
   📅 FUNKCJE DAT
===================================================== */


/*
   Tworzy datę bez problemów ze strefą czasową.
*/

function createLocalDate(dateString) {

    if (!dateString) {
        return null;
    }


    /*
       Data typu:
       2026-06-11
    */

    if (
        dateString.length === 10 &&
        dateString.includes("-")
    ) {

        const parts =
            dateString.split("-");


        return new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2]),
            0,
            0,
            0
        );
    }


    /*
       Data z godziną:
       2026-08-13T21:10:00
    */

    return new Date(dateString);
}



/* =====================================================
   ⏱️ LICZENIE DNI
===================================================== */

function getDaysSince(dateString) {

    const startDate =
        createLocalDate(dateString);


    const now =
        new Date();


    if (!startDate) {
        return 0;
    }


    const difference =
        now.getTime() -
        startDate.getTime();


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    return Math.max(
        0,
        days
    );
}



/* =====================================================
   📊 STATYSTYKI
===================================================== */

function loadStatistics() {


    const membersElement =
        document.getElementById(
            "membersCount"
        );


    const colonyDaysElement =
        document.getElementById(
            "colonyDays"
        );


    const websiteDaysElement =
        document.getElementById(
            "websiteDays"
        );



    /*
       CZŁONKOWIE
    */

    if (membersElement) {

        membersElement.textContent =
            MEMBERS_COUNT;
    }



    /*
       DNI KOLONII
    */

    if (colonyDaysElement) {

        colonyDaysElement.textContent =
            getDaysSince(
                COLONY_START_DATE
            );
    }



    /*
       DNI STRONY
    */

    if (websiteDaysElement) {

        websiteDaysElement.textContent =
            getDaysSince(
                WEBSITE_START_DATE
            );
    }

}



/* =====================================================
   🔄 AKTUALIZOWANIE DNI
===================================================== */

/*
   Odświeżamy statystyki co minutę.
   Dzięki temu strona nie musi być odświeżana
   ręcznie, gdy zmieni się liczba pełnych dni.
*/

setInterval(
    loadStatistics,
    60000
);



/* =====================================================
   📄 WCZYTYWANIE PODSTRON
===================================================== */

async function loadPage(url) {

    try {

        const response =
            await fetch(
                url,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const html =
            await response.text();


        return new DOMParser()
            .parseFromString(
                html,
                "text/html"
            );


    } catch (error) {

        console.error(
            `Nie udało się wczytać ${url}:`,
            error
        );


        return null;
    }

}



/* =====================================================
   📰 OGŁOSZENIA
===================================================== */

async function loadAnnouncements() {


    const container =
        document.getElementById(
            "latestAnnouncements"
        );


    if (!container) {
        return;
    }



    const page =
        await loadPage(
            "ogloszenia.html"
        );



    if (!page) {

        container.innerHTML =
            `
            <p>
                Nie udało się wczytać ogłoszeń.
            </p>
            `;

        return;
    }



    /*
       Pobieramy wszystkie karty ogłoszeń.
    */

    const announcements =
        Array.from(
            page.querySelectorAll(
                ".announcement-card"
            )
        );



    if (
        announcements.length === 0
    ) {

        container.innerHTML =
            `
            <p>
                Brak ogłoszeń.
            </p>
            `;

        return;
    }



    /*
       Czyścimy tekst "Ładowanie..."
    */

    container.innerHTML = "";



    /*
       Pokazujemy 3 najnowsze ogłoszenia.
    */

    announcements
        .slice(0, 3)
        .forEach(
            card => {

                const copy =
                    card.cloneNode(true);


                container.appendChild(
                    copy
                );

            }
        );



    /*
       Pierwsze ogłoszenie
       trafia do "Ważna informacja".
    */

    const newest =
        announcements[0];



    if (!newest) {
        return;
    }



    const title =
        newest.querySelector(
            "h3"
        );


    const text =
        newest.querySelector(
            "p"
        );



    const importantTitle =
        document.getElementById(
            "importantAnnouncementTitle"
        );


    const importantText =
        document.getElementById(
            "importantAnnouncementText"
        );



    if (
        importantTitle &&
        title
    ) {

        importantTitle.textContent =
            title.textContent.trim();
    }



    if (
        importantText &&
        text
    ) {

        importantText.textContent =
            text.textContent.trim();
    }

}



/* =====================================================
   📅 ODCZYTYWANIE DAT WYDARZEŃ
===================================================== */

function parseEventDate(text) {


    if (!text) {
        return null;
    }



    /*
       Obsługujemy:

       23.09.2026

       23.09.2026 - 09.10.2026

       23/09/2026

       23-09-2026
    */


    const match =
        text.match(
            /(\d{1,2})[.\-/](\d{1,2})(?:[.\-/](\d{4}))?/
        );



    if (!match) {
        return null;
    }



    const day =
        Number(
            match[1]
        );


    const month =
        Number(
            match[2]
        ) - 1;


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
   📅 KALENDARZ
===================================================== */

async function loadCalendar() {


    const upcomingContainer =
        document.getElementById(
            "upcomingEvents"
        );


    const calendarContainer =
        document.getElementById(
            "calendarPreview"
        );



    const page =
        await loadPage(
            "kalendarz.html"
        );



    if (!page) {


        if (upcomingContainer) {

            upcomingContainer.innerHTML =
                `
                <p>
                    Nie udało się wczytać wydarzeń.
                </p>
                `;
        }


        if (calendarContainer) {

            calendarContainer.innerHTML =
                `
                <p>
                    Nie udało się wczytać kalendarza.
                </p>
                `;
        }


        return;
    }



    /*
       Pobieramy karty wydarzeń.
    */

    const cards =
        Array.from(
            page.querySelectorAll(
                ".event-card"
            )
        );



    if (cards.length === 0) {


        if (upcomingContainer) {

            upcomingContainer.innerHTML =
                `
                <p>
                    Brak nadchodzących wydarzeń.
                </p>
                `;
        }


        if (calendarContainer) {

            calendarContainer.innerHTML =
                `
                <p>
                    Brak wydarzeń w kalendarzu.
                </p>
                `;
        }


        return;
    }



    /*
       Zamieniamy karty na dane.
    */

    const events =
        cards.map(
            card => {


                const dateElement =
                    card.querySelector(
                        ".event-date"
                    );


                const titleElement =
                    card.querySelector(
                        "h3"
                    );


                const descriptionElement =
                    card.querySelector(
                        "p"
                    );



                const dateText =
                    dateElement
                        ? dateElement.textContent.trim()
                        : "";



                return {

                    card: card,

                    dateText: dateText,

                    date:
                        parseEventDate(
                            dateText
                        ),

                    title:
                        titleElement
                            ? titleElement.textContent.trim()
                            : "Wydarzenie",

                    description:
                        descriptionElement
                            ? descriptionElement.textContent.trim()
                            : ""

                };

            }
        );



    /*
       Dzisiaj.
    */

    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );



    /*
       Zostawiamy tylko wydarzenia,
       które jeszcze się nie rozpoczęły.
    */

    const upcoming =
        events.filter(
            event => {

                if (!event.date) {
                    return true;
                }


                return event.date >= today;

            }
        );



    /*
       Sortowanie od najbliższego.
    */

    upcoming.sort(
        (a, b) => {

            if (
                !a.date &&
                !b.date
            ) {
                return 0;
            }


            if (!a.date) {
                return 1;
            }


            if (!b.date) {
                return -1;
            }


            return (
                a.date.getTime() -
                b.date.getTime()
            );

        }
    );



    /* =================================================
       📅 NADCHODZĄCE WYDARZENIA
    ================================================= */

    if (upcomingContainer) {


        upcomingContainer.innerHTML =
            "";


        upcoming
            .slice(0, 3)
            .forEach(
                event => {

                    const copy =
                        event.card.cloneNode(
                            true
                        );


                    upcomingContainer.appendChild(
                        copy
                    );

                }
            );


        if (
            upcoming.length === 0
        ) {

            upcomingContainer.innerHTML =
                `
                <p>
                    Brak nadchodzących wydarzeń.
                </p>
                `;
        }

    }



    /* =================================================
       🗓️ 5 NAJBLIŻSZYCH WYDARZEŃ
    ================================================= */

    if (calendarContainer) {


        calendarContainer.innerHTML =
            "";


        upcoming
            .slice(0, 5)
            .forEach(
                event => {

                    const copy =
                        event.card.cloneNode(
                            true
                        );


                    calendarContainer.appendChild(
                        copy
                    );

                }
            );


        if (
            upcoming.length === 0
        ) {

            calendarContainer.innerHTML =
                `
                <p>
                    Brak wydarzeń w kalendarzu.
                </p>
                `;
        }

    }

}



/* =====================================================
   🏆 RANKING TYPERÓW
===================================================== */

async function loadRanking() {


    const container =
        document.getElementById(
            "rankingPreview"
        );


    if (!container) {
        return;
    }



    const page =
        await loadPage(
            "ranking.html"
        );



    if (!page) {

        container.innerHTML =
            `
            <p>
                Nie udało się wczytać rankingu.
            </p>
            `;

        return;
    }



    const sourceTable =
        page.querySelector(
            ".ranking-table"
        );



    if (!sourceTable) {

        container.innerHTML =
            `
            <p>
                Nie znaleziono tabeli rankingu.
            </p>
            `;

        return;
    }



    const rows =
        Array.from(
            sourceTable.querySelectorAll(
                "tbody tr"
            )
        );



    if (rows.length === 0) {

        container.innerHTML =
            `
            <p>
                Brak danych rankingu.
            </p>
            `;

        return;
    }



    /*
       Tworzymy własną tabelę,
       żeby zachować CSS strony głównej.
    */

    const table =
        document.createElement(
            "table"
        );


    table.className =
        "ranking-table";



    /*
       Kopiujemy nagłówek.
    */

    const header =
        sourceTable.querySelector(
            "thead"
        );


    if (header) {

        table.appendChild(
            header.cloneNode(true)
        );
    }



    /*
       Kopiujemy maksymalnie 10 osób.
    */

    const tbody =
        document.createElement(
            "tbody"
        );


    rows
        .slice(0, 10)
        .forEach(
            row => {

                tbody.appendChild(
                    row.cloneNode(true)
                );

            }
        );


    table.appendChild(
        tbody
    );



    container.innerHTML =
        "";


    container.appendChild(
        table
    );

}



/* =====================================================
   🔥 NAJAKTYWNIEJSI UŻYTKOWNICY
===================================================== */

function loadActiveUsers() {


    const container =
        document.getElementById(
            "activeUsers"
        );


    if (!container) {
        return;
    }



    /*
       NA RAZIE DANE RĘCZNE.

       Później możemy zrobić automatyczne
       pobieranie aktywności z osobnego pliku
       lub systemu Discord.
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



    container.innerHTML =
        "";



    users.forEach(
        (user, index) => {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "info-card";



            card.innerHTML =
                `

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



            container.appendChild(
                card
            );

        }
    );

}



/* =====================================================
   🌙 MOTYW
===================================================== */

function setupTheme() {


    const button =
        document.getElementById(
            "themeToggle"
        );


    if (!button) {
        return;
    }



    const savedTheme =
        localStorage.getItem(
            "kolonia-theme"
        );



    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );


        button.textContent =
            "🌙";

    } else {

        button.textContent =
            "☀️";

    }



    button.addEventListener(
        "click",
        () => {


            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "kolonia-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            button.textContent =
                isLight
                    ? "🌙"
                    : "☀️";

        }
    );

}



/* =====================================================
   🚀 START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
           Statystyki
        */

        loadStatistics();


        /*
           Ogłoszenia
        */

        loadAnnouncements();


        /*
           Kalendarz
        */

        loadCalendar();


        /*
           Ranking
        */

        loadRanking();


        /*
           Najaktywniejsi
        */

        loadActiveUsers();


        /*
           Motyw
        */

        setupTheme();

    }
);
```

/* =========================================================
   KOLONIA PASJONATÓW
   SCRIPT.JS — WERSJA 2.0
   GŁÓWNY SKRYPT CAŁEJ STRONY
   ========================================================= */


/* =========================================================
   1. USTAWIENIA GŁÓWNE
   ========================================================= */

const STORAGE = {
    theme: "theme",
    settings: "koloniaSettings",
    notifications: "koloniaNotifications"
};


/* =========================================================
   2. MOTYW — JASNY / CIEMNY
   ========================================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem(STORAGE.theme) || "dark";


function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-theme");

    } else {

        document.body.classList.remove("light-theme");

    }


    if (themeToggle) {

        themeToggle.textContent =
            theme === "light" ? "🌙" : "☀️";

        themeToggle.setAttribute(
            "aria-label",
            theme === "light"
                ? "Włącz tryb ciemny"
                : "Włącz tryb jasny"
        );

    }


    localStorage.setItem(
        STORAGE.theme,
        theme
    );

}


applyTheme(savedTheme);


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            localStorage.getItem(STORAGE.theme) || "dark";

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        applyTheme(newTheme);


        themeToggle.animate(
            [
                {
                    transform: "rotate(0deg) scale(1)"
                },
                {
                    transform: "rotate(180deg) scale(1.12)"
                },
                {
                    transform: "rotate(360deg) scale(1)"
                }
            ],
            {
                duration: 450,
                easing: "ease"
            }
        );

    });

}


/* =========================================================
   3. NAWIGACJA
   ========================================================= */

function initNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navigation =
        document.getElementById("mainNavigation");


    if (!menuToggle || !navigation) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        navigation.classList.toggle("menu-open");

        menuToggle.classList.toggle("active");

    });


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("menu-open");

                menuToggle.classList.remove("active");

            });

        });

}


/* =========================================================
   4. AKTYWNA PODSTRONA
   ========================================================= */

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(
            "#mainNavigation a, nav a"
        )
        .forEach(link => {

            const linkPage =
                link.getAttribute("href");

            if (!linkPage) {
                return;
            }


            if (
                linkPage === currentPage ||
                (
                    currentPage === "" &&
                    linkPage === "index.html"
                )
            ) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

}


/* =========================================================
   5. ANIMACJA STRONY
   ========================================================= */

function initPageAnimation() {

    document.body.classList.add(
        "page-loaded"
    );

}


/* =========================================================
   6. ANIMACJE ELEMENTÓW
   ========================================================= */

function initScrollAnimations() {

    const elements =
        document.querySelectorAll(
            "[data-animation]"
        );


    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   7. OGŁOSZENIA
   ========================================================= */

function initAnnouncements() {

    const container =
        document.getElementById(
            "announcementsList"
        );


    if (!container) {
        return;
    }


    const announcements =
        window.announcements || [];


    container.innerHTML = "";


    announcements.forEach(
        announcement => {

            const article =
                document.createElement("article");

            article.className =
                "announcement-card";


            article.innerHTML = `

                <div class="announcement-icon">
                    ${announcement.icon || "📢"}
                </div>

                <div class="announcement-content">

                    <h3>
                        ${announcement.title}
                    </h3>

                    <p>
                        ${announcement.description || ""}
                    </p>

                    <span class="announcement-date">
                        ${announcement.date || ""}
                    </span>

                </div>

            `;


            container.appendChild(article);

        }
    );

}


/* =========================================================
   8. WYDARZENIA
   ========================================================= */

function initEvents() {

    const container =
        document.getElementById(
            "eventsList"
        );


    if (!container) {
        return;
    }


    const events =
        window.koloniaEvents || [];


    container.innerHTML = "";


    events.forEach(event => {

        const card =
            document.createElement("article");

        card.className =
            "event-card";


        card.innerHTML = `

            <div class="event-icon">
                ${event.icon || "🎉"}
            </div>

            <div class="event-content">

                <h3>
                    ${event.title}
                </h3>

                <p>
                    ${event.description || ""}
                </p>

                <div class="event-date">
                    📅 ${event.date || ""}
                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   9. KALENDARZ
   ========================================================= */

function initCalendar() {

    const calendar =
        document.getElementById(
            "calendar"
        );


    if (!calendar) {
        return;
    }


    /*
       System kalendarza zostanie
       rozbudowany przy tworzeniu
       calendar.html.
    */

}


/* =========================================================
   10. RANKING TYPERÓW
   ========================================================= */

function initRanking() {

    const ranking =
        document.getElementById(
            "rankingList"
        );


    if (!ranking) {
        return;
    }


    const typers =
        window.typerRanking || [];


    ranking.innerHTML = "";


    typers.forEach(
        (typer, index) => {

            const position =
                index + 1;


            const row =
                document.createElement("div");

            row.className =
                "ranking-row";


            row.innerHTML = `

                <div class="ranking-position">
                    ${position}
                </div>

                <div class="ranking-name">
                    ${typer.name || "Nieznany"}
                </div>

                <div class="ranking-points">
                    ${typer.points || 0} pkt
                </div>

            `;


            ranking.appendChild(row);

        }
    );

}


/* =========================================================
   11. OSIĄGNIĘCIA
   ========================================================= */

function initAchievements() {

    const container =
        document.getElementById(
            "achievementsList"
        );


    if (!container) {
        return;
    }


    const achievements =
        window.koloniaAchievements || [];


    container.innerHTML = "";


    achievements.forEach(
        achievement => {

            const card =
                document.createElement("div");

            card.className =
                "achievement-card";


            if (
                achievement.locked
            ) {

                card.classList.add(
                    "locked"
                );

            }


            card.innerHTML = `

                <div class="achievement-icon">
                    ${achievement.icon || "🏆"}
                </div>

                <div class="achievement-content">

                    <h3>
                        ${achievement.name}
                    </h3>

                    <p>
                        ${achievement.description || ""}
                    </p>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================================
   12. LICZNIK
   ========================================================= */

function initCounter() {

    const counter =
        document.getElementById(
            "koloniaCounter"
        );


    if (!counter) {
        return;
    }


    const startDate =
        counter.dataset.start;


    if (!startDate) {
        return;
    }


    function updateCounter() {

        const start =
            new Date(startDate);

        const now =
            new Date();

        const difference =
            now - start;


        if (difference < 0) {
            return;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        counter.textContent =
            `${days} dni`;

    }


    updateCounter();


    setInterval(
        updateCounter,
        60000
    );

}


/* =========================================================
   13. WYSZUKIWARKA
   ========================================================= */

function initSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );

    const results =
        document.getElementById(
            "searchResults"
        );


    if (!input || !results) {
        return;
    }


    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            const items =
                document.querySelectorAll(
                    "[data-search]"
                );


            items.forEach(item => {

                const text =
                    item.dataset.search
                        .toLowerCase();


                if (
                    !query ||
                    text.includes(query)
                ) {

                    item.style.display = "";

                } else {

                    item.style.display =
                        "none";

                }

            });

        }
    );

}


/* =========================================================
   14. POWIADOMIENIA
   ========================================================= */

function showNotification(
    message,
    type = "info"
) {

    const notification =
        document.createElement("div");


    notification.className =
        `site-notification ${type}`;


    notification.innerHTML = `

        <span>
            ${message}
        </span>

        <button
            type="button"
            aria-label="Zamknij"
        >
            ×
        </button>

    `;


    document.body.appendChild(
        notification
    );


    const closeButton =
        notification.querySelector(
            "button"
        );


    closeButton.addEventListener(
        "click",
        () => {

            notification.remove();

        }
    );


    setTimeout(() => {

        if (
            document.body.contains(
                notification
            )
        ) {

            notification.remove();

        }

    }, 5000);

}


/* =========================================================
   15. USTAWIENIA
   ========================================================= */

function loadSettings() {

    const saved =
        localStorage.getItem(
            STORAGE.settings
        );


    if (!saved) {
        return {};
    }


    try {

        return JSON.parse(saved);

    } catch {

        return {};

    }

}


function saveSettings(settings) {

    localStorage.setItem(
        STORAGE.settings,
        JSON.stringify(settings)
    );

}


/* =========================================================
   16. LINKI ZEWNĘTRZNE
   ========================================================= */

function initExternalLinks() {

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });

}


/* =========================================================
   17. ROK W STOPCE
   ========================================================= */

function initCurrentYear() {

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });

}


/* =========================================================
   18. START CAŁEGO SYSTEMU
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initNavigation();

        setActiveNavigation();

        initPageAnimation();

        initScrollAnimations();

        initAnnouncements();

        initEvents();

        initCalendar();

        initRanking();

        initAchievements();

        initCounter();

        initSearch();

        initExternalLinks();

        initCurrentYear();

    }
);


/* =========================================================
   KONIEC SCRIPT.JS
   KOLONIA PASJONATÓW
   ========================================================= */

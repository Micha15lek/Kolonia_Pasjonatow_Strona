document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       KONFIGURACJA
    ========================================= */

    const COLONY_START_DATE = "2026-06-11T00:00:00";
    const WEBSITE_START_DATE = "2026-08-13T20:10:00";
    const MEMBERS_COUNT = 20;


    /* =========================================
       SYSTEM MOTYWÓW
    ========================================= */

    const THEMES = {

        blue: {
            name: "🔵 Kolonia Blue"
        },

        purple: {
            name: "🟣 Purple Galaxy"
        },

        railway: {
            name: "🚉 Railway"
        },

        midnight: {
            name: "🌌 Midnight"
        },

        nature: {
            name: "🌿 Nature"
        },

        sunset: {
            name: "🌅 Sunset"
        }

    };


    const MODES = {

        dark: {
            name: "🌙 Tryb ciemny"
        },

        light: {
            name: "☀️ Tryb jasny"
        }

    };


    const DEFAULT_THEME = "blue";
    const DEFAULT_MODE = "dark";


    function getSavedTheme() {

        const saved =
            localStorage.getItem(
                "koloniaTheme"
            );

        return THEMES[saved]
            ? saved
            : DEFAULT_THEME;
    }


    function getSavedMode() {

        const saved =
            localStorage.getItem(
                "koloniaMode"
            );

        return MODES[saved]
            ? saved
            : DEFAULT_MODE;
    }


    let currentTheme =
        getSavedTheme();

    let currentMode =
        getSavedMode();


    /* =========================================
       ELEMENTY USTAWIEŃ
    ========================================= */

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const themeOptions =
        document.querySelectorAll(
            "[data-theme-option]"
        );


    const modeOptions =
        document.querySelectorAll(
            "[data-mode-option]"
        );


    const currentThemeName =
        document.getElementById(
            "currentThemeName"
        );


    const currentModeName =
        document.getElementById(
            "currentModeName"
        );


    /* =========================================
       AKTUALIZACJA WYBORU MOTYWU
    ========================================= */

    function updateThemeButtons() {

        themeOptions.forEach(
            button => {

                const theme =
                    button.dataset.themeOption;

                button.classList.toggle(
                    "selected",
                    theme === currentTheme
                );

                button.setAttribute(
                    "aria-pressed",
                    theme === currentTheme
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /* =========================================
       AKTUALIZACJA WYBORU TRYBU
    ========================================= */

    function updateModeButtons() {

        modeOptions.forEach(
            button => {

                const mode =
                    button.dataset.modeOption;

                button.classList.toggle(
                    "selected",
                    mode === currentMode
                );

                button.setAttribute(
                    "aria-pressed",
                    mode === currentMode
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /* =========================================
       AKTUALIZACJA INFORMACJI
    ========================================= */

    function updateCurrentThemeInfo() {

        if (currentThemeName) {

            currentThemeName.textContent =
                THEMES[currentTheme].name;

        }


        if (currentModeName) {

            currentModeName.textContent =
                MODES[currentMode].name;

        }

    }


    /* =========================================
       PRZEŁĄCZNIK W GÓRNYM PASKU
    ========================================= */

    function updateThemeToggle() {

        if (!themeToggle) {
            return;
        }


        if (currentMode === "dark") {

            themeToggle.textContent =
                "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "Włącz tryb jasny"
            );

            themeToggle.setAttribute(
                "title",
                "Włącz tryb jasny"
            );

        } else {

            themeToggle.textContent =
                "🌙";

            themeToggle.setAttribute(
                "aria-label",
                "Włącz tryb ciemny"
            );

            themeToggle.setAttribute(
                "title",
                "Włącz tryb ciemny"
            );

        }

    }


    /* =========================================
       ZASTOSOWANIE MOTYWU
    ========================================= */

    function applyTheme(
        theme,
        save = true
    ) {

        if (!THEMES[theme]) {
            theme = DEFAULT_THEME;
        }


        currentTheme = theme;


        document.documentElement.dataset.theme =
            currentTheme;

        document.body.dataset.theme =
            currentTheme;


        if (save) {

            localStorage.setItem(
                "koloniaTheme",
                currentTheme
            );

        }


        updateThemeButtons();
        updateCurrentThemeInfo();

    }


    /* =========================================
       ZASTOSOWANIE TRYBU
    ========================================= */

    function applyMode(
        mode,
        save = true
    ) {

        if (!MODES[mode]) {
            mode = DEFAULT_MODE;
        }


        currentMode = mode;


        document.documentElement.dataset.mode =
            currentMode;

        document.body.dataset.mode =
            currentMode;


        if (save) {

            localStorage.setItem(
                "koloniaMode",
                currentMode
            );

        }


        updateModeButtons();
        updateCurrentThemeInfo();
        updateThemeToggle();

    }


    /* =========================================
       WYBÓR MOTYWU
    ========================================= */

    themeOptions.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const theme =
                        button.dataset.themeOption;

                    applyTheme(theme);

                }
            );

        }
    );


    /* =========================================
       WYBÓR TRYBU
    ========================================= */

    modeOptions.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const mode =
                        button.dataset.modeOption;

                    applyMode(mode);

                }
            );

        }
    );


    /* =========================================
       PRZYCISK TRYBU W NAGŁÓWKU
    ========================================= */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const newMode =
                    currentMode === "dark"
                        ? "light"
                        : "dark";

                applyMode(newMode);

            }
        );

    }


    /* =========================================
       START SYSTEMU MOTYWÓW
    ========================================= */

    applyTheme(
        currentTheme,
        false
    );

    applyMode(
        currentMode,
        false
    );


    /* =========================================
       DOKŁADNY LICZNIK CZASU
    ========================================= */

    function getTimeParts(startDate) {

        const start =
            new Date(startDate);

        const now =
            new Date();

        const difference =
            Math.max(
                0,
                now.getTime() -
                start.getTime()
            );

        const totalSeconds =
            Math.floor(
                difference / 1000
            );

        return {

            days:
                Math.floor(
                    totalSeconds / 86400
                ),

            hours:
                Math.floor(
                    (totalSeconds % 86400) / 3600
                ),

            minutes:
                Math.floor(
                    (totalSeconds % 3600) / 60
                ),

            seconds:
                totalSeconds % 60

        };

    }


    function updateCounters() {

        /* =====================================
           LICZBA CZŁONKÓW
        ===================================== */

        const membersCount =
            document.getElementById(
                "membersCount"
            );


        if (membersCount) {

            membersCount.textContent =
                MEMBERS_COUNT;

        }


        /* =====================================
           START KOLONII
        ===================================== */

        const colony =
            getTimeParts(
                COLONY_START_DATE
            );


        const colonyDays =
            document.getElementById(
                "colonyDays"
            );

        const colonyHours =
            document.getElementById(
                "colonyHours"
            );

        const colonyMinutes =
            document.getElementById(
                "colonyMinutes"
            );

        const colonySeconds =
            document.getElementById(
                "colonySeconds"
            );


        if (colonyDays) {

            colonyDays.textContent =
                colony.days;

        }


        if (colonyHours) {

            colonyHours.textContent =
                String(
                    colony.hours
                ).padStart(
                    2,
                    "0"
                );

        }


        if (colonyMinutes) {

            colonyMinutes.textContent =
                String(
                    colony.minutes
                ).padStart(
                    2,
                    "0"
                );

        }


        if (colonySeconds) {

            colonySeconds.textContent =
                String(
                    colony.seconds
                ).padStart(
                    2,
                    "0"
                );

        }


        /* =====================================
           START STRONY
        ===================================== */

        const website =
            getTimeParts(
                WEBSITE_START_DATE
            );


        const websiteDays =
            document.getElementById(
                "websiteDays"
            );

        const websiteHours =
            document.getElementById(
                "websiteHours"
            );

        const websiteMinutes =
            document.getElementById(
                "websiteMinutes"
            );

        const websiteSeconds =
            document.getElementById(
                "websiteSeconds"
            );


        if (websiteDays) {

            websiteDays.textContent =
                website.days;

        }


        if (websiteHours) {

            websiteHours.textContent =
                String(
                    website.hours
                ).padStart(
                    2,
                    "0"
                );

        }


        if (websiteMinutes) {

            websiteMinutes.textContent =
                String(
                    website.minutes
                ).padStart(
                    2,
                    "0"
                );

        }


        if (websiteSeconds) {

            websiteSeconds.textContent =
                String(
                    website.seconds
                ).padStart(
                    2,
                    "0"
                );

        }

    }


    updateCounters();


    setInterval(
        updateCounters,
        1000
    );


    /* =========================================
       LICZNIKI ADMINISTRACJI
    ========================================= */

    function updateAdminCounters() {

        const adminMembers =
            document.querySelectorAll(
                ".admin-member[data-join-date]"
            );


        const now =
            new Date();


        adminMembers.forEach(
            member => {

                const joinDate =
                    new Date(
                        member.dataset.joinDate
                    );


                const difference =
                    Math.max(
                        0,
                        now.getTime() -
                        joinDate.getTime()
                    );


                const totalSeconds =
                    Math.floor(
                        difference / 1000
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


                const daysElement =
                    member.querySelector(
                        "[data-days]"
                    );


                const hoursElement =
                    member.querySelector(
                        "[data-hours]"
                    );


                const minutesElement =
                    member.querySelector(
                        "[data-minutes]"
                    );


                const secondsElement =
                    member.querySelector(
                        "[data-seconds]"
                    );


                if (daysElement) {

                    daysElement.textContent =
                        days;

                }


                if (hoursElement) {

                    hoursElement.textContent =
                        String(
                            hours
                        ).padStart(
                            2,
                            "0"
                        );

                }


                if (minutesElement) {

                    minutesElement.textContent =
                        String(
                            minutes
                        ).padStart(
                            2,
                            "0"
                        );

                }


                if (secondsElement) {

                    secondsElement.textContent =
                        String(
                            seconds
                        ).padStart(
                            2,
                            "0"
                        );

                }

            }
        );

    }


    updateAdminCounters();


    setInterval(
        updateAdminCounters,
        1000
    );


    /* =========================================
       KALENDARZ
    ========================================= */

    const calendar =
        document.getElementById(
            "calendar"
        );

    const calendarMonth =
        document.getElementById(
            "calendarMonth"
        );

    const calendarYear =
        document.getElementById(
            "calendarYear"
        );

    const previousMonth =
        document.getElementById(
            "previousMonth"
        );

    const nextMonth =
        document.getElementById(
            "nextMonth"
        );


    let calendarDate =
        new Date();


    function renderCalendar() {

        if (!calendar) {
            return;
        }


        const deviceDate =
            new Date();

        const currentDay =
            deviceDate.getDate();

        const currentMonth =
            deviceDate.getMonth();

        const currentYear =
            deviceDate.getFullYear();


        const year =
            calendarDate.getFullYear();

        const month =
            calendarDate.getMonth();


        const monthName =
            calendarDate.toLocaleDateString(
                "pl-PL",
                {
                    month: "long"
                }
            );


        if (calendarMonth) {

            calendarMonth.textContent =
                monthName.charAt(0).toUpperCase() +
                monthName.slice(1);

        }


        if (calendarYear) {

            calendarYear.textContent =
                year;

        }


        const firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();


        const startingDay =
            firstDay === 0
                ? 6
                : firstDay - 1;


        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        calendar.innerHTML = "";


        for (
            let i = 0;
            i < startingDay;
            i++
        ) {

            const emptyDay =
                document.createElement(
                    "div"
                );

            emptyDay.className =
                "calendar-day empty";

            calendar.appendChild(
                emptyDay
            );

        }


        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const dayElement =
                document.createElement(
                    "div"
                );


            dayElement.className =
                "calendar-day";


            dayElement.textContent =
                day;


            if (
                day === currentDay &&
                month === currentMonth &&
                year === currentYear
            ) {

                dayElement.classList.add(
                    "today"
                );

            }


            calendar.appendChild(
                dayElement
            );

        }

    }


    if (previousMonth) {

        previousMonth.addEventListener(
            "click",
            () => {

                calendarDate.setMonth(
                    calendarDate.getMonth() - 1
                );

                renderCalendar();

            }
        );

    }


    if (nextMonth) {

        nextMonth.addEventListener(
            "click",
            () => {

                calendarDate.setMonth(
                    calendarDate.getMonth() + 1
                );

                renderCalendar();

            }
        );

    }


    renderCalendar();


    /* =========================================
       NAGŁÓWEK — SCROLL
    ========================================= */

    const header =
        document.querySelector(
            "header"
        );


    function handleHeaderScroll() {

        if (!header) {
            return;
        }


        if (window.scrollY > 20) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    handleHeaderScroll();


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        {
            passive: true
        }
    );


    /* =========================================
       AKTYWNA NAWIGACJA
    ========================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";


    document
        .querySelectorAll("nav a")
        .forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );


    /* =========================================
       PŁYNNE PRZEWIJANIE
    ========================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            anchor => {

                anchor.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            anchor.getAttribute(
                                "href"
                            );


                        if (
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );


    /* =========================================
       ANIMACJE REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element =>
                observer.observe(
                    element
                )
        );

    } else {

        revealElements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

    }


    /* =========================================
       RIPPLE
    ========================================= */

    document
        .querySelectorAll(
            ".button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function (event) {

                        const ripple =
                            document.createElement(
                                "span"
                            );


                        ripple.className =
                            "button-ripple";


                        const rect =
                            this.getBoundingClientRect();


                        const size =
                            Math.max(
                                rect.width,
                                rect.height
                            );


                        ripple.style.width =
                            `${size}px`;

                        ripple.style.height =
                            `${size}px`;


                        ripple.style.left =
                            `${event.clientX - rect.left - size / 2}px`;


                        ripple.style.top =
                            `${event.clientY - rect.top - size / 2}px`;


                        this.appendChild(
                            ripple
                        );


                        setTimeout(
                            () => {

                                ripple.remove();

                            },
                            600
                        );

                    }
                );

            }
        );


    /* =========================================
       LOGO
    ========================================= */

    const logo =
        document.querySelector(
            ".logo"
        );


    if (logo) {

        logo.addEventListener(
            "mouseenter",
            () => {

                logo.classList.add(
                    "logo-hover"
                );

            }
        );


        logo.addEventListener(
            "mouseleave",
            () => {

                logo.classList.remove(
                    "logo-hover"
                );

            }
        );

    }


    /* =========================================
       ESC
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                document
                    .querySelectorAll(
                        ".open"
                    )
                    .forEach(
                        element => {

                            element.classList.remove(
                                "open"
                            );

                        }
                    );

            }

        }
    );


    /* =========================================
       ROK W STOPCE
    ========================================= */

    const currentYearElement =
        document.getElementById(
            "currentYear"
        );


    if (currentYearElement) {

        currentYearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       ZAŁADOWANIE STRONY
    ========================================= */

    requestAnimationFrame(
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );

});

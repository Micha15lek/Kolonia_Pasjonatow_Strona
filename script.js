document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       KONFIGURACJA
    ========================================= */

    const COLONY_START_DATE = "2026-06-11T00:00:00";
    const WEBSITE_START_DATE = "2026-08-13T20:10:00";
    const MEMBERS_COUNT = 20;


    /* =========================================
       MOTYW JASNY / CIEMNY
    ========================================= */

    const themeToggle =
        document.getElementById("themeToggle");

    function applyTheme(isLight) {

        /* CSS używa klasy "light" */

        document.body.classList.toggle(
            "light",
            isLight
        );

        document.documentElement.classList.toggle(
            "light",
            isLight
        );

        document.documentElement.dataset.theme =
            isLight ? "light" : "dark";

        if (themeToggle) {

            /*
             * W trybie ciemnym pokazujemy słońce,
             * ponieważ przycisk służy do przejścia
             * w tryb jasny.
             */

            themeToggle.textContent =
                isLight ? "🌙" : "☀️";

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Włącz tryb ciemny"
                    : "Włącz tryb jasny"
            );
        }
    }


    const savedTheme =
        localStorage.getItem("kolonia-theme");

    applyTheme(
        savedTheme === "light"
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    !document.body.classList.contains(
                        "light"
                    );

                applyTheme(isLight);

                localStorage.setItem(
                    "kolonia-theme",
                    isLight
                        ? "light"
                        : "dark"
                );
            }
        );
    }


    /* =========================================
       DOKŁADNY LICZNIK CZASU
    ========================================= */

    function getExactTimeDifference(startDate) {

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

        return `${days} dni ${String(hours).padStart(2, "0")} godz. ${String(minutes).padStart(2, "0")} min. ${String(seconds).padStart(2, "0")} sek.`;
    }


    function updateCounters() {

        const membersCount =
            document.getElementById(
                "membersCount"
            );

        const colonyDays =
            document.getElementById(
                "colonyDays"
            );

        const websiteDays =
            document.getElementById(
                "websiteDays"
            );


        if (membersCount) {

            membersCount.textContent =
                MEMBERS_COUNT;
        }


        if (colonyDays) {

            colonyDays.textContent =
                getExactTimeDifference(
                    COLONY_START_DATE
                );
        }


        if (websiteDays) {

            websiteDays.textContent =
                getExactTimeDifference(
                    WEBSITE_START_DATE
                );
        }
    }


    updateCounters();

    setInterval(
        updateCounters,
        1000
    );


    /* =========================================
       KALENDARZ
       DATA POBIERANA Z URZĄDZENIA
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


    /* =========================================
       POPRZEDNI MIESIĄC
    ========================================= */

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


    /* =========================================
       NASTĘPNY MIESIĄC
    ========================================= */

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
       AKTUALIZACJA KALENDARZA
    ========================================= */

    setInterval(
        () => {

            const now =
                new Date();

            if (
                now.getDate() !==
                    calendarDate.getDate() &&
                now.getMonth() ===
                    calendarDate.getMonth() &&
                now.getFullYear() ===
                    calendarDate.getFullYear()
            ) {

                renderCalendar();
            }

        },
        60000
    );


    /* =========================================
       NAGŁÓWEK — EFEKT PRZY SCROLLU
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
        .forEach(link => {

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
        });


    /* =========================================
       PŁYNNE PRZEWIJANIE
    ========================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

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
        });


    /* =========================================
       ANIMACJE POJAWIANIA SIĘ
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
       RIPPLE NA PRZYCISKACH
    ========================================= */

    document
        .querySelectorAll(
            ".button"
        )
        .forEach(button => {

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
        });


    /* =========================================
       LOGO — LEKKI EFEKT
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
       ESC — ZAMYKANIE ELEMENTÓW
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

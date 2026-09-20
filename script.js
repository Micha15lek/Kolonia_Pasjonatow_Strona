/* =====================================================
   KOLONIA PASJONATÓW 3.0
   GŁÓWNY SKRYPT
===================================================== */


/* =====================================================
   KONFIGURACJA
===================================================== */

const COLONY_START_DATE = "2026-06-11T00:00:00";
const WEBSITE_START_DATE = "2026-08-13T21:10:00";

const MEMBERS_COUNT = 20;


/* =====================================================
   USTAWIENIA ANIMACJI
===================================================== */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =====================================================
   DATA – POMOCNICZE FUNKCJE
===================================================== */

function createLocalDate(dateString) {

    const date = new Date(dateString);

    return isNaN(date.getTime())
        ? new Date()
        : date;
}


/* =====================================================
   FORMATOWANIE CZASU
===================================================== */

function formatDuration(startDate) {

    const start =
        createLocalDate(startDate);

    const now =
        new Date();

    let difference =
        now.getTime() -
        start.getTime();


    if (difference < 0) {
        difference = 0;
    }


    const second =
        1000;

    const minute =
        second * 60;

    const hour =
        minute * 60;

    const day =
        hour * 24;


    const days =
        Math.floor(
            difference / day
        );


    difference -=
        days * day;


    const hours =
        Math.floor(
            difference / hour
        );


    difference -=
        hours * hour;


    const minutes =
        Math.floor(
            difference / minute
        );


    difference -=
        minutes * minute;


    const seconds =
        Math.floor(
            difference / second
        );


    return `${days} dni, ${hours} godz. ${minutes} min. ${seconds} sek.`;
}


/* =====================================================
   STATYSTYKI STRONY GŁÓWNEJ
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


    /* LICZBA CZŁONKÓW */

    if (membersElement) {

        membersElement.textContent =
            MEMBERS_COUNT;
    }


    /* CZAS ISTNIENIA KOLONII */

    if (colonyDaysElement) {

        colonyDaysElement.textContent =
            formatDuration(
                COLONY_START_DATE
            );
    }


    /* CZAS DZIAŁANIA STRONY */

    if (websiteDaysElement) {

        websiteDaysElement.textContent =
            formatDuration(
                WEBSITE_START_DATE
            );
    }
}


/* =====================================================
   MOTYW JASNY / CIEMNY
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


    const isLightTheme =
        savedTheme === "light";


    document.body.classList.toggle(
        "light-theme",
        isLightTheme
    );


    updateThemeButton(
        button,
        isLightTheme
    );


    button.addEventListener(
        "click",
        () => {

            const lightTheme =
                document.body.classList.toggle(
                    "light-theme"
                );


            localStorage.setItem(
                "kolonia-theme",
                lightTheme
                    ? "light"
                    : "dark"
            );


            updateThemeButton(
                button,
                lightTheme
            );


            if (!prefersReducedMotion) {

                button.animate(
                    [
                        {
                            transform:
                                "rotate(0deg) scale(1)"
                        },

                        {
                            transform:
                                "rotate(180deg) scale(1.15)"
                        },

                        {
                            transform:
                                "rotate(360deg) scale(1)"
                        }
                    ],
                    {
                        duration: 450,
                        easing:
                            "cubic-bezier(.2,.8,.2,1)"
                    }
                );
            }
        }
    );
}


/* =====================================================
   PRZYCISK MOTYWU
===================================================== */

function updateThemeButton(
    button,
    isLight
) {

    button.textContent =
        isLight
            ? "🌙"
            : "☀️";


    button.setAttribute(
        "aria-label",
        isLight
            ? "Przełącz na ciemny motyw"
            : "Przełącz na jasny motyw"
    );


    button.title =
        isLight
            ? "Przełącz na ciemny motyw"
            : "Przełącz na jasny motyw";
}


/* =====================================================
   AKTUALIZACJA LICZNIKÓW
===================================================== */

function updatePageCounters() {

    loadStatistics();
}


/* =====================================================
   EFEKT HEADERA PODCZAS SCROLLA
===================================================== */

function setupHeaderScroll() {

    const header =
        document.querySelector(
            "header"
        );


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 25) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );
        }
    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );
}


/* =====================================================
   AKTYWNA SEKCJA W NAVBARZE
===================================================== */

function setupActiveNavigation() {

    const links =
        document.querySelectorAll(
            "nav a[href^='#']"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (
        !links.length ||
        !sections.length
    ) {
        return;
    }


    function updateNavigation() {

        let currentSection = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop -
                    180;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.id;
                }
            }
        );


        links.forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                link.classList.remove(
                    "active"
                );


                if (
                    href ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );
                }
            }
        );
    }


    updateNavigation();


    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
    );
}


/* =====================================================
   PŁYNNE PRZEWIJANIE
===================================================== */

function setupSmoothScroll() {

    const links =
        document.querySelectorAll(
            "a[href^='#']"
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    let target = null;


                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch (error) {

                        return;
                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth",

                            block: "start"
                        }
                    );
                }
            );
        }
    );
}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function setupScrollReveal() {

    if (prefersReducedMotion) {
        return;
    }


    const elements =
        document.querySelectorAll(
            ".info-card, " +
            ".stat-card, " +
            ".announcement-card, " +
            ".event-card, " +
            ".admin-card, " +
            ".achievement-card, " +
            ".link-card, " +
            ".active-user, " +
            ".podium-card, " +
            ".timeline-item, " +
            ".section-header, " +
            ".discord-cta"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(
        element => {

            element.classList.add(
                "scroll-hidden"
            );
        }
    );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.remove(
                            "scroll-hidden"
                        );


                        entry.target.classList.add(
                            "scroll-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );
                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );
        }
    );
}


/* =====================================================
   STAGGER – OPÓŹNIENIA KART
===================================================== */

function setupStaggerAnimations() {

    const grids =
        document.querySelectorAll(
            ".info-grid, " +
            ".stats-grid, " +
            ".announcement-grid, " +
            ".event-grid, " +
            ".admin-grid, " +
            ".achievement-grid, " +
            ".links-grid, " +
            ".active-users"
        );


    grids.forEach(
        grid => {

            Array.from(
                grid.children
            ).forEach(
                (child, index) => {

                    child.style.setProperty(
                        "--animation-delay",
                        `${index * 80}ms`
                    );
                }
            );
        }
    );
}


/* =====================================================
   EFEKT 3D KART
===================================================== */

function setupCardTilt() {

    if (
        prefersReducedMotion ||
        window.matchMedia(
            "(max-width: 850px)"
        ).matches
    ) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".info-card, " +
            ".achievement-card, " +
            ".admin-card"
        );


    cards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -3;


                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;


                    card.style.transform =
                        `perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)`;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";
                }
            );
        }
    );
}


/* =====================================================
   ŚWIATŁO PODĄŻAJĄCE ZA KURSOREM
===================================================== */

function setupCursorGlow() {

    if (prefersReducedMotion) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".info-card, " +
            ".achievement-card, " +
            ".admin-card, " +
            ".stat-card"
        );


    cards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );
                }
            );
        }
    );
}


/* =====================================================
   HERO PARALLAX
===================================================== */

function setupHeroParallax() {

    if (prefersReducedMotion) {
        return;
    }


    const hero =
        document.querySelector(
            ".hero"
        );


    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    if (
        !hero ||
        !heroContent
    ) {
        return;
    }


    let ticking = false;


    function updateParallax() {

        if (ticking) {
            return;
        }


        ticking = true;


        requestAnimationFrame(
            () => {

                const scroll =
                    window.scrollY;


                if (
                    scroll <=
                    hero.offsetHeight
                ) {

                    heroContent.style.transform =
                        `translateY(${scroll * 0.12}px)`;
                }


                ticking = false;
            }
        );
    }


    window.addEventListener(
        "scroll",
        updateParallax,
        {
            passive: true
        }
    );
}


/* =====================================================
   RIPPLE NA PRZYCISKACH
===================================================== */

function setupButtonRipple() {

    if (prefersReducedMotion) {
        return;
    }


    const buttons =
        document.querySelectorAll(
            ".button"
        );


    buttons.forEach(
        button => {

            button.style.position =
                "relative";


            button.style.overflow =
                "hidden";


            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.style.position =
                        "absolute";


                    ripple.style.width =
                        `${size}px`;


                    ripple.style.height =
                        `${size}px`;


                    ripple.style.left =
                        `${
                            event.clientX -
                            rect.left -
                            size / 2
                        }px`;


                    ripple.style.top =
                        `${
                            event.clientY -
                            rect.top -
                            size / 2
                        }px`;


                    ripple.style.borderRadius =
                        "50%";


                    ripple.style.background =
                        "rgba(255,255,255,.25)";


                    ripple.style.pointerEvents =
                        "none";


                    ripple.style.transform =
                        "scale(0)";


                    button.appendChild(
                        ripple
                    );


                    const animation =
                        ripple.animate(
                            [
                                {
                                    transform:
                                        "scale(0)",

                                    opacity: 0.8
                                },

                                {
                                    transform:
                                        "scale(2.5)",

                                    opacity: 0
                                }
                            ],
                            {
                                duration: 600,

                                easing:
                                    "cubic-bezier(.2,.8,.2,1)"
                            }
                        );


                    animation.onfinish =
                        () => {

                            ripple.remove();
                        };
                }
            );
        }
    );
}


/* =====================================================
   ANIMOWANE LICZNIKI
   TYLKO DLA .stat-number
===================================================== */

function setupAnimatedCounters() {

    if (prefersReducedMotion) {
        return;
    }


    const counters =
        document.querySelectorAll(
            ".stat-number"
        );


    if (!counters.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        animateCounter(
                            entry.target
                        );


                        observer.unobserve(
                            entry.target
                        );
                    }
                );

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(
        counter => {

            observer.observe(
                counter
            );
        }
    );
}


/* =====================================================
   ANIMACJA POJEDYNCZEGO LICZNIKA
===================================================== */

function animateCounter(element) {

    const originalText =
        element.textContent.trim();


    const target =
        parseInt(
            originalText.replace(
                /\D/g,
                ""
            ),
            10
        );


    if (
        isNaN(target) ||
        target <= 0
    ) {
        return;
    }


    const suffix =
        originalText.replace(
            /[\d\s.,]/g,
            ""
        );


    const duration = 1400;

    const start =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - start) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                target * eased
            );


        element.textContent =
            value.toLocaleString(
                "pl-PL"
            ) + suffix;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target.toLocaleString(
                    "pl-PL"
                ) + suffix;
        }
    }


    requestAnimationFrame(
        update
    );
}


/* =====================================================
   EFEKT KLIKNIĘCIA LOGO
===================================================== */

function setupLogoAnimation() {

    const logo =
        document.querySelector(
            ".logo"
        );


    if (
        !logo ||
        prefersReducedMotion
    ) {
        return;
    }


    logo.addEventListener(
        "click",
        () => {

            logo.animate(
                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(1.06)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 300,
                    easing: "ease-out"
                }
            );
        }
    );
}


/* =====================================================
   EFEKT WEJŚCIA STRONY
===================================================== */

function setupPageLoad() {

    requestAnimationFrame(
        () => {

            document.body.classList.add(
                "page-loaded"
            );
        }
    );
}


/* =====================================================
   ESC – ZAMYKANIE ELEMENTÓW
===================================================== */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            document
                .querySelectorAll(
                    ".mobile-menu-open"
                )
                .forEach(
                    element => {

                        element.classList.remove(
                            "mobile-menu-open"
                        );
                    }
                );
        }
    );
}


/* =====================================================
   AKTUALIZACJA ROKU W STOPCE
===================================================== */

function setupCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date().getFullYear();
        }
    );
}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Statystyki */

        setupTheme();

        loadStatistics();


        /* Interakcje */

        setupHeaderScroll();

        setupActiveNavigation();

        setupSmoothScroll();

        setupScrollReveal();

        setupStaggerAnimations();

        setupCardTilt();

        setupCursorGlow();

        setupHeroParallax();

        setupButtonRipple();

        setupAnimatedCounters();

        setupLogoAnimation();

        setupPageLoad();

        setupEscapeKey();

        setupCurrentYear();


        /* =================================================
           LICZNIKI AKTUALIZUJĄ SIĘ CO SEKUNDĘ
        ================================================= */

        setInterval(
            updatePageCounters,
            1000
        );


        /* =================================================
           INFORMACJA W KONSOLI
        ================================================= */

        console.log(
            "%c🚆 KOLONIA PASJONATÓW 3.0",
            "font-size:18px;font-weight:800;color:#2491ff;"
        );


        console.log(
            "%cStrona została uruchomiona poprawnie.",
            "color:#7c5cff;font-weight:600;"
        );
    }
);

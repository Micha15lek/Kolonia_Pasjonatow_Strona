// ================================
// KOLONIA PASJONATÓW — SCRIPT 3.0
// ================================

// ================================
// USTAWIENIA
// ================================

const COLONY_START_DATE = "2026-06-11T00:00:00";
const WEBSITE_START_DATE = "2026-08-13T21:10:00";
const MEMBERS_COUNT = 20;


// ================================
// TRYB JASNY / CIEMNY
// ================================

function setupTheme() {
    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("kolonia-theme");

    // Domyślnie tryb ciemny
    const isLight = savedTheme === "light";

    applyTheme(isLight);

    themeToggle.addEventListener("click", () => {
        const currentlyLight =
            document.body.classList.contains("light-theme");

        applyTheme(!currentlyLight);
    });
}


function applyTheme(isLight) {
    document.body.classList.toggle("light-theme", isLight);
    document.documentElement.classList.toggle("light-theme", isLight);

    document.documentElement.setAttribute(
        "data-theme",
        isLight ? "light" : "dark"
    );

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.textContent = isLight ? "🌙" : "☀️";
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Włącz tryb ciemny" : "Włącz tryb jasny"
        );
        themeToggle.setAttribute(
            "title",
            isLight ? "Tryb ciemny" : "Tryb jasny"
        );
    }

    localStorage.setItem(
        "kolonia-theme",
        isLight ? "light" : "dark"
    );
}


// ================================
// LICZNIKI DNI / CZASU
// ================================

function formatDuration(startDate) {
    const start = new Date(startDate);
    const now = new Date();

    let difference = now - start;

    if (difference < 0) {
        difference = 0;
    }

    const seconds = Math.floor(difference / 1000);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days} dni, ${hours} godz. ${minutes} min. ${secs} sek.`;
}


function updatePageCounters() {
    const colonyDays = document.getElementById("colonyDays");
    const websiteDays = document.getElementById("websiteDays");
    const membersCount = document.getElementById("membersCount");

    if (colonyDays) {
        colonyDays.textContent =
            formatDuration(COLONY_START_DATE);
    }

    if (websiteDays) {
        websiteDays.textContent =
            formatDuration(WEBSITE_START_DATE);
    }

    if (membersCount) {
        membersCount.textContent = MEMBERS_COUNT;
    }
}


// ================================
// HEADER / GÓRNY PASEK
// ================================

function setupHeader() {
    const header = document.querySelector("header");

    if (!header) return;

    function updateHeader() {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


// ================================
// AKTYWNA PODSTRONA W MENU
// ================================

function setupActiveNavigation() {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks =
        document.querySelectorAll("header nav a");

    navLinks.forEach(link => {
        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("/").pop();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });
}


// ================================
// PŁYNNE PRZEWIJANIE
// ================================

function setupSmoothScroll() {
    const links =
        document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", event => {
            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}


// ================================
// ANIMACJE POJAWIANIA
// ================================

function setupScrollReveal() {
    const elements =
        document.querySelectorAll(
            ".info-card, .announcement-card, .event-card, .project-card, .ranking-card, .user-card"
        );

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

    elements.forEach(element => {
        observer.observe(element);
    });
}


// ================================
// EFEKT RIPPLE NA PRZYCISKACH
// ================================

function setupButtonRipple() {
    const buttons =
        document.querySelectorAll(
            ".button, button"
        );

    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            const rect =
                this.getBoundingClientRect();

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}


// ================================
// ANIMOWANE LICZNIKI
// ================================

function animateNumber(element, target) {
    if (!element) return;

    const duration = 1000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );

        const value =
            Math.floor(
                start + (target - start) * progress
            );

        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


// ================================
// LOGO
// ================================

function setupLogo() {
    const logo =
        document.querySelector(".logo");

    if (!logo) return;

    logo.addEventListener("mouseenter", () => {
        logo.classList.add("logo-active");
    });

    logo.addEventListener("mouseleave", () => {
        logo.classList.remove("logo-active");
    });
}


// ================================
// KLAWIATURA — ESC
// ================================

function setupKeyboard() {
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.activeElement?.blur();
        }
    });
}


// ================================
// ROK W STOPCE
// ================================

function updateCurrentYear() {
    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    const year =
        new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = year;
    });
}


// ================================
// START
// ================================

document.addEventListener("DOMContentLoaded", () => {

    setupTheme();

    setupHeader();

    setupActiveNavigation();

    setupSmoothScroll();

    setupScrollReveal();

    setupButtonRipple();

    setupLogo();

    setupKeyboard();

    updateCurrentYear();

    updatePageCounters();

    // Aktualizacja liczników co sekundę
    setInterval(updatePageCounters, 1000);

    // Efekt ładowania strony
    document.body.classList.add("page-loaded");
});

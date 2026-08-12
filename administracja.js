/* =========================================================
   KOLONIA PASJONATÓW
   ADMINISTRACJA — DANE I OBSŁUGA
========================================================= */

const administracja = [

    {
        id: "michal-wlasciciel",
        name: "Michał",
        role: "Właściciel",
        category: "owner",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Zarządzanie Kolonią Pasjonatów i rozwój projektu.",

        description:
            "Właściciel Kolonii Pasjonatów."
    },

    {
        id: "mikol-yoriichi-naczelny",
        name: "Mikol Yoriichi",
        role: "Naczelny Administrator",
        category: "chiefAdmin",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Nadzór nad administracją i funkcjonowaniem Kolonii.",

        description:
            "Naczelny Administrator Kolonii Pasjonatów."
    },

    {
        id: "noworudzki-mk2",
        name: "Noworudzki_Mk2",
        role: "Administrator",
        category: "admin",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Pomoc w zarządzaniu Kolonią i społecznością.",

        description:
            "Administrator Kolonii Pasjonatów."
    },

    {
        id: "mikol-yoriichi-admin",
        name: "Mikol Yoriichi",
        role: "Administrator",
        category: "admin",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Pomoc w zarządzaniu Kolonią.",

        description:
            "Administrator Kolonii Pasjonatów."
    },

    {
        id: "kebabkraftowy",
        name: "KEBABKRAFTOWY",
        role: "Moderator",
        category: "moderator",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Moderowanie społeczności i dbanie o porządek.",

        description:
            "Moderator Kolonii Pasjonatów."
    },

    {
        id: "michal-technik",
        name: "Michał",
        role: "Technik",
        category: "technician",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Opieka techniczna nad stroną i systemami Kolonii.",

        description:
            "Technik Kolonii Pasjonatów."
    },

    {
        id: "kolej-farming",
        name: "Kolej_farming",
        role: "Pomocnik",
        category: "helper",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Pomoc administracji w bieżących działaniach.",

        description:
            "Pomocnik Kolonii Pasjonatów."
    },

    {
        id: "mikol-yoriichi-helper",
        name: "Mikol Yoriichi",
        role: "Pomocnik",
        category: "helper",

        joinDate: "",
        birthday: "",

        status: "Aktywny",

        responsibility:
            "Wsparcie administracji w bieżących działaniach.",

        description:
            "Pomocnik Kolonii Pasjonatów."
    }
];


/* =========================================================
   MARKETINGOWIEC
========================================================= */

const marketingowiec = {
    name: "Brak osoby",
    role: "Marketingowiec",
    category: "marketing",
    status: "Brak"
};


/* =========================================================
   ELEMENTY HTML
========================================================= */

const lists = {
    owner: document.getElementById("ownerList"),
    chiefAdmin: document.getElementById("chiefAdminList"),
    admin: document.getElementById("adminList"),
    moderator: document.getElementById("moderatorList"),
    technician: document.getElementById("technicianList"),
    helper: document.getElementById("helperList"),
    marketing: document.getElementById("marketingList")
};


/* =========================================================
   TWORZENIE KART OSÓB
========================================================= */

function createAdminCard(person) {

    const card = document.createElement("button");

    card.type = "button";

    card.className = "admin-person";

    card.dataset.id = person.id;

    card.innerHTML = `
        <span class="admin-person-icon">👤</span>

        <span class="admin-person-name">
            ${person.name}
        </span>

        <span class="admin-person-role">
            ${person.role}
        </span>
    `;

    card.addEventListener("click", () => {
        showProfile(person);
    });

    return card;
}


/* =========================================================
   WYŚWIETLANIE OSÓB
========================================================= */

function renderAdministration() {

    Object.values(lists).forEach(list => {

        if (list) {
            list.innerHTML = "";
        }

    });


    administracja.forEach(person => {

        const list = lists[person.category];

        if (!list) return;

        list.appendChild(
            createAdminCard(person)
        );

    });


    /* Marketingowiec */

    if (lists.marketing) {

        const card = document.createElement("div");

        card.className =
            "admin-person admin-person-empty";

        card.innerHTML = `
            <span class="admin-person-icon">📣</span>

            <span class="admin-person-name">
                Brak osoby
            </span>

            <span class="admin-person-role">
                Marketingowiec
            </span>
        `;

        lists.marketing.appendChild(card);
    }
}


/* =========================================================
   PROFIL
========================================================= */

function showProfile(person) {

    const section =
        document.getElementById("profileSection");

    if (!section) return;


    document.getElementById("profileName").textContent =
        person.name;


    document.getElementById("profileRole").textContent =
        `👑 ${person.role}`;


    document.getElementById("profileRoleInfo").textContent =
        person.role;


    document.getElementById("profileJoinDate").textContent =
        person.joinDate || "Brak danych";


    document.getElementById("profileBirthday").textContent =
        person.birthday || "Brak danych";


    document.getElementById("profileStatus").textContent =
        person.status;


    document.getElementById("profileResponsibility").textContent =
        person.responsibility;


    document.getElementById("profileDescription").textContent =
        person.description;


    calculateDaysInColony(person.joinDate);


    section.hidden = false;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   LICZBA DNI W KOLONII
========================================================= */

function calculateDaysInColony(joinDate) {

    const element =
        document.getElementById("profileDays");

    if (!element) return;


    if (!joinDate) {

        element.textContent =
            "Brak danych";

        return;
    }


    const start =
        new Date(joinDate);

    const today =
        new Date();


    start.setHours(0, 0, 0, 0);

    today.setHours(0, 0, 0, 0);


    const difference =
        today.getTime() -
        start.getTime();


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    element.textContent =
        `${Math.max(0, days)} dni`;
}


/* =========================================================
   ZAMKNIĘCIE PROFILU
========================================================= */

const closeProfile =
    document.getElementById("closeProfile");


if (closeProfile) {

    closeProfile.addEventListener(
        "click",
        () => {

            const section =
                document.getElementById(
                    "profileSection"
                );

            if (section) {

                section.hidden = true;

            }

        }
    );

}


/* =========================================================
   START
========================================================= */

renderAdministration();

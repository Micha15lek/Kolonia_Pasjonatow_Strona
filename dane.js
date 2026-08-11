/* =====================================================
   DANE KOLONII PASJONATÓW
===================================================== */


/* =====================================================
   WYDARZENIA KOLONII
   TYLKO 2026 ROK
===================================================== */

const colonyEvents = {

    "08-10": {
        title: "🏆 Start Strefy STS Pucharu Polski",
        description:
            "Oficjalne uruchomienie strefy poświęconej rozgrywkom Pucharu Polski.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "08-12": {
        title: "🛠️ Naprawa automoderacji serwera",
        description:
            "Planowane poprawki oraz przywrócenie prawidłowego działania automoderacji.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "08-13": {
        title: "🛠️ Naprawa automoderacji serwera",
        description:
            "Kontynuacja prac nad automoderacją serwera.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "08-14": {
        title: "🛠️ Naprawa automoderacji serwera",
        description:
            "Ostatni zaplanowany dzień prac nad automoderacją.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "08-17": {
        title: "🌐 Uruchomienie strony serwerowej",
        description:
            "Planowane uruchomienie strony internetowej serwera Kolonii Pasjonatów.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "08-25": {
        title: "🤖 Prace nad botem „Koloniarz”",
        description:
            "Orientacyjny koniec pierwszego etapu prac nad botem Koloniarz. Termin może ulec zmianie.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "08-31": {
        title: "☀️ Zakończenie strefy wakacyjnej",
        description:
            "Oficjalne zakończenie wakacyjnego okresu na serwerze.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii",
        time: "23:45"
    },

    "09-23": {
        title: "🍂 Kolej w jesiennym krajobrazie",
        description:
            "Start jesiennego konkursu fotograficznego, w którym uczestnicy pokażą kolej w jesiennej scenerii.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "10-09": {
        title: "🍂 Kolej w jesiennym krajobrazie — zakończenie",
        description:
            "Zakończenie jesiennego konkursu fotograficznego.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "10-10": {
        title: "🍁 Jesienny Spotter",
        description:
            "Start wydarzenia. Wrzuć swoje jesienne zdjęcie kolei lub komunikacji miejskiej.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "10-18": {
        title: "🍁 Jesienny Spotter — zakończenie",
        description:
            "Zakończenie wydarzenia. Najlepsze zdjęcia mogą zostać wyróżnione i nagrodzone.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "10-31": {
        title: "🎃 Halloween Kolonii Pasjonatów",
        description:
            "Specjalne halloweenowe wydarzenie na serwerze z tematycznymi aktywnościami, zabawami i niespodziankami.",
        type: "event",
        typeName: "🎉 Wydarzenie Kolonii"
    },

    "12-31": {
        title: "🎆 Sylwester",
        description:
            "Specjalne wydarzenie kończące rok. Wspólnie żegnamy stary rok i przygotowujemy się na nadejście kolejnego.",
        type: "special",
        typeName: "🎆 Wydarzenie specjalne"
    }

};


/* =====================================================
   LICZBA WYDARZEŃ KOLONII
===================================================== */

function getColonyEventsCount() {

    return Object.keys(colonyEvents).length;

}

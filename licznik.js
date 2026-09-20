document.addEventListener("DOMContentLoaded", () => {

    const COLONY_START =
        new Date("2026-06-11T00:00:00");

    const WEBSITE_START =
        new Date("2026-08-13T20:10:00");


    const EVENTS = {

        halloween:
            new Date("2026-10-31T00:00:00"),

        christmas:
            new Date("2026-12-24T00:00:00"),

        newYear:
            new Date("2027-01-01T00:00:00"),

        easter:
            new Date("2027-03-28T00:00:00"),

        end2026:
            new Date("2026-12-31T00:00:00"),

        newYear2027:
            new Date("2027-01-01T00:00:00"),

        summer2027:
            new Date("2027-06-26T00:00:00")

    };


    const FERIE = {

        "dolnoslaskie": {
            name: "Dolnośląskie",
            start: "2027-01-18T00:00:00",
            end: "2027-01-31T23:59:59",
            date: "18.01–31.01.2027"
        },

        "lodzkie": {
            name: "Łódzkie",
            start: "2027-01-18T00:00:00",
            end: "2027-01-31T23:59:59",
            date: "18.01–31.01.2027"
        },

        "opolskie": {
            name: "Opolskie",
            start: "2027-01-18T00:00:00",
            end: "2027-01-31T23:59:59",
            date: "18.01–31.01.2027"
        },

        "podkarpackie": {
            name: "Podkarpackie",
            start: "2027-01-18T00:00:00",
            end: "2027-01-31T23:59:59",
            date: "18.01–31.01.2027"
        },

        "podlaskie": {
            name: "Podlaskie",
            start: "2027-01-18T00:00:00",
            end: "2027-01-31T23:59:59",
            date: "18.01–31.01.2027"
        },

        "slaskie": {
            name: "Śląskie",
            start: "2027-01-18T00:00:00",
            end: "2027-01-31T23:59:59",
            date: "18.01–31.01.2027"
        },


        "lubelskie": {
            name: "Lubelskie",
            start: "2027-02-01T00:00:00",
            end: "2027-02-14T23:59:59",
            date: "01.02–14.02.2027"
        },

        "mazowieckie": {
            name: "Mazowieckie",
            start: "2027-02-01T00:00:00",
            end: "2027-02-14T23:59:59",
            date: "01.02–14.02.2027"
        },

        "pomorskie": {
            name: "Pomorskie",
            start: "2027-02-01T00:00:00",
            end: "2027-02-14T23:59:59",
            date: "01.02–14.02.2027"
        },

        "swietokrzyskie": {
            name: "Świętokrzyskie",
            start: "2027-02-01T00:00:00",
            end: "2027-02-14T23:59:59",
            date: "01.02–14.02.2027"
        },


        "kujawsko-pomorskie": {
            name: "Kujawsko-Pomorskie",
            start: "2027-02-15T00:00:00",
            end: "2027-02-28T23:59:59",
            date: "15.02–28.02.2027"
        },

        "lubuskie": {
            name: "Lubuskie",
            start: "2027-02-15T00:00:00",
            end: "2027-02-28T23:59:59",
            date: "15.02–28.02.2027"
        },

        "malopolskie": {
            name: "Małopolskie",
            start: "2027-02-15T00:00:00",
            end: "2027-02-28T23:59:59",
            date: "15.02–28.02.2027"
        },

        "warminsko-mazurskie": {
            name: "Warmińsko-Mazurskie",
            start: "2027-02-15T00:00:00",
            end: "2027-02-28T23:59:59",
            date: "15.02–28.02.2027"
        },

        "wielkopolskie": {
            name: "Wielkopolskie",
            start: "2027-02-15T00:00:00",
            end: "2027-02-28T23:59:59",
            date: "15.02–28.02.2027"
        },

        "zachodniopomorskie": {
            name: "Zachodniopomorskie",
            start: "2027-02-15T00:00:00",
            end: "2027-02-28T23:59:59",
            date: "15.02–28.02.2027"
        }

    };


    function getDifference(target) {

        const now = new Date();

        return Math.max(
            0,
            target.getTime() - now.getTime()
        );

    }


    function getDays(target) {

        const difference =
            getDifference(target);

        return Math.ceil(
            difference / 86400000
        );

    }


    function getUptime(start) {

        const now = new Date();

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

        return {
            days,
            hours,
            minutes,
            seconds
        };

    }


    function updateUptime(
        elementId,
        startDate
    ) {

        const element =
            document.getElementById(
                elementId
            );

        if (!element) return;

        const time =
            getUptime(startDate);

        element.textContent =
            `${time.days} dni`;

    }


    function updateDetailedUptime(
        elementId,
        startDate
    ) {

        const element =
            document.getElementById(
                elementId
            );

        if (!element) return;

        const time =
            getUptime(startDate);

        element.textContent =
            `${time.days} dni, ` +
            `${String(time.hours).padStart(2, "0")} godz. ` +
            `${String(time.minutes).padStart(2, "0")} min. ` +
            `${String(time.seconds).padStart(2, "0")} sek.`;

    }


    function updateDays(
        elementId,
        target
    ) {

        const element =
            document.getElementById(
                elementId
            );

        if (!element) return;

        const days =
            getDays(target);

        element.textContent =
            `${days} dni`;

    }


    function updateAll() {

        updateUptime(
            "colonyUptime",
            COLONY_START
        );

        updateUptime(
            "websiteUptime",
            WEBSITE_START
        );


        updateDetailedUptime(
            "detailedUptime",
            COLONY_START
        );

        updateDetailedUptime(
            "websiteDetailedUptime",
            WEBSITE_START
        );


        updateDays(
            "daysToHalloween",
            EVENTS.halloween
        );

        updateDays(
            "daysToChristmas",
            EVENTS.christmas
        );

        updateDays(
            "daysToNewYear",
            EVENTS.newYear
        );

        updateDays(
            "daysToEaster",
            EVENTS.easter
        );


        updateDays(
            "daysToSummer2027",
            EVENTS.summer2027
        );

        updateDays(
            "daysToEnd2026",
            EVENTS.end2026
        );

        updateDays(
            "daysToNewYear2027",
            EVENTS.newYear2027
        );


        updateHolidays();


        const lastUpdate =
            document.getElementById(
                "lastUpdate"
            );

        if (lastUpdate) {

            const now = new Date();

            lastUpdate.textContent =
                now.toLocaleString(
                    "pl-PL",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }
                );

        }

    }


    function updateHolidays() {

        const select =
            document.getElementById(
                "voivodeshipSelect"
            );

        const dateElement =
            document.getElementById(
                "holidaysDate"
            );

        const counterElement =
            document.getElementById(
                "daysToHolidays"
            );

        if (
            !select ||
            !dateElement ||
            !counterElement
        ) return;


        const selected =
            FERIE[select.value];

        if (!selected) return;


        dateElement.textContent =
            selected.date;


        const now =
            new Date();

        const start =
            new Date(
                selected.start
            );

        const end =
            new Date(
                selected.end
            );


        if (now < start) {

            const days =
                Math.ceil(
                    (
                        start.getTime() -
                        now.getTime()
                    ) / 86400000
                );

            counterElement.textContent =
                `${days} dni`;

            return;

        }


        if (
            now >= start &&
            now <= end
        ) {

            counterElement.textContent =
                "TRWAJĄ";

            return;

        }


        counterElement.textContent =
            "ZAKOŃCZONE";

    }


    const voivodeshipSelect =
        document.getElementById(
            "voivodeshipSelect"
        );


    if (voivodeshipSelect) {

        const saved =
            localStorage.getItem(
                "kolonia-voivodeship"
            );

        if (
            saved &&
            FERIE[saved]
        ) {

            voivodeshipSelect.value =
                saved;

        }


        voivodeshipSelect.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "kolonia-voivodeship",
                    voivodeshipSelect.value
                );

                updateHolidays();

            }
        );

    }


    updateAll();

    setInterval(
        updateAll,
        1000
    );

});

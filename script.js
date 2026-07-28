// Automatyczne zamykanie typowania po rozpoczęciu meczu

const matches = document.querySelectorAll(".match");


matches.forEach(match => {

    const startDate = match.dataset.date;

    if (!startDate) return;


    const matchTime = new Date(startDate);

    const inputs = match.querySelectorAll("input");


    function checkMatch() {

        const now = new Date();


        if (now >= matchTime) {


            inputs.forEach(input => {

                input.disabled = true;

            });


            if (!match.querySelector(".closed")) {

                const message = document.createElement("p");

                message.className = "closed";

                message.innerHTML = "🔒 Typowanie zamknięte";

                match.appendChild(message);

            }


        }


    }


    // sprawdzenie od razu po wejściu na stronę

    checkMatch();


    // sprawdzanie co 30 sekund

    setInterval(checkMatch, 30000);


});
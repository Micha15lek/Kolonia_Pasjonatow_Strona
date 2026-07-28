// ===============================
// KOLONIA PASJONATÓW
// SYSTEM TYPOWANIA
// ===============================


// Pobieranie meczów

const matches = document.querySelectorAll(".match");




// Zapisywanie typów

function saveTips() {


    const username = document.getElementById("username").value.trim();



    if(username === "") {

        alert("Wpisz nazwę użytkownika Discord!");

        return;

    }



    let tips = [];



    matches.forEach(match => {


        const inputs = match.querySelectorAll("input");


        const matchName =
        match.querySelector("h3").innerText;



        tips.push({

            discord: username,

            mecz: matchName,

            wynikGospodarzy: inputs[0].value,

            wynikGosci: inputs[1].value,

            dataZapisu: new Date().toLocaleString("pl-PL")


        });


    });




    localStorage.setItem(
        "typy_kolonia_pasjonatow",
        JSON.stringify(tips)
    );



    alert(
        "✅ Typy zapisane dla użytkownika Discord: "
        + username
    );


}









// Automatyczne zamykanie typowania


matches.forEach(match => {


    const startDate = match.dataset.date;


    if(!startDate) return;



    const matchTime = new Date(startDate);



    function checkMatch() {


        const now = new Date();



        if(now >= matchTime) {



            const inputs =
            match.querySelectorAll("input");



            inputs.forEach(input => {

                input.disabled = true;

            });




            if(!match.querySelector(".closed")) {


                const info =
                document.createElement("p");


                info.className = "closed";


                info.innerHTML =
                "🔒 Typowanie zamknięte - mecz już się rozpoczął";



                match.appendChild(info);


            }


        }


    }




    // sprawdzenie po wejściu

    checkMatch();



    // sprawdzanie co 30 sekund

    setInterval(checkMatch,30000);



});

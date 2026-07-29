// ===================================
// KOLONIA PASJONATÓW
// SYSTEM TYPOWANIA
// ===================================


// LINK DO GOOGLE APPS SCRIPT

const SHEET_URL =
"https://script.google.com/macros/s/AKfycbyj_8vS9SJ69k_jxsXHGh569mQ9nFWGomAhioyRbbRL7vFHmkv9HaqJHi1XjS6SoHhX/exec";


// AKTUALNA KOLEJKA

const CURRENT_ROUND = 2;




// ZAPIS TYPOWANIA

async function saveTips() {


    const username =
    document.getElementById("username").value.trim();



    if(username === "") {

        document.getElementById("message").innerHTML =
        "❌ Wpisz nazwę użytkownika Discord";

        return;

    }



    const matches =
    document.querySelectorAll(".match");



    let counter = 0;



    for (const match of matches) {


        const title =
        match.querySelector("h3");


        const inputs =
        match.querySelectorAll("input");



        if(inputs.length !== 2) {

            continue;

        }



        const home =
        inputs[0].value.trim();



        const away =
        inputs[1].value.trim();



        if(home !== "" && away !== "") {



            const response = await fetch(SHEET_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },


                body: JSON.stringify({

                    date:
                    new Date().toLocaleString("pl-PL"),


                    username:
                    username,


                    league:
                    getLeague(match),


                    match:
                    title.innerText.replace("⚽ ",""),


                    home:
                    home,


                    away:
                    away,


                    round:
                    CURRENT_ROUND


                })

            });



            const result =
            await response.text();



            if(result === "ALREADY") {


                document.getElementById("message").innerHTML =

                "❌ Masz już oddane typy na tę kolejkę!";


                return;


            }



            counter++;


        }

    }



    if(counter > 0) {


        document.getElementById("message").innerHTML =

        "✅ Zapisano " + counter + " typów!";


    }

    else {


        document.getElementById("message").innerHTML =

        "❌ Nie wpisano żadnego typu";


    }


}







// POBIERANIE LIGI

function getLeague(element) {


    const section =
    element.closest("section");



    const title =
    section.querySelector(".league-title");



    if(!title) {

        return "Nieznana";

    }



    return title.innerText
    .replace("🏆 ","")
    .replace("🥇 ","")
    .replace("🥈 ","");


}







// BLOKOWANIE TYPOWANIA PO STARCIU MECZU


function checkMatches() {


    const matches =
    document.querySelectorAll(".match");



    const now =
    new Date();



    matches.forEach(match => {


        const date =
        match.dataset.date;



        if(!date) return;



        const matchDate =
        new Date(date);



        if(now >= matchDate) {


            const inputs =
            match.querySelectorAll("input");



            inputs.forEach(input => {


                input.disabled = true;


            });



            if(!match.querySelector(".closed")) {


                const info =
                document.createElement("p");


                info.className =
                "closed";


                info.innerHTML =
                "🔒 Typowanie zamknięte";


                match.appendChild(info);


            }


        }


    });


}




// START

checkMatches();


// Sprawdzanie co minutę

setInterval(checkMatches,60000);

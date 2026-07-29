// ===================================
// KOLONIA PASJONATÓW
// SYSTEM TYPOWANIA
// script.js
// ===================================


// LINK DO GOOGLE APPS SCRIPT

const SHEET_URL =
"https://script.google.com/macros/s/AKfycbyj_8vS9SJ69k_jxsXHGh569mQ9nFWGomAhioyRbbRL7vFHmkv9HaqJHi1XjS6SoHhX/exec";



// przechowuje aktualne mecze

let currentMatches = [];





// ===================================
// ŁADOWANIE MECZÓW
// ===================================

function loadMatches(){


    const round =
    document.getElementById("roundSelect").value;


    const league =
    document.getElementById("leagueSelect").value;



    const box =
    document.getElementById("matches");



    if(round === "" || league === ""){


        box.innerHTML =
        "<h2>Wybierz kolejkę i ligę</h2>";

        return;

    }



    currentMatches =
    mecze[round][league];



    box.innerHTML = "";




    let title =
    document.createElement("h2");


    title.innerHTML =
    league;


    box.appendChild(title);





    currentMatches.forEach((match,index)=>{


        let card =
        document.createElement("div");


        card.className =
        "match";



        card.innerHTML = `

        <h3>
        ⚽ ${match.home} - ${match.away}
        </h3>

        <p>
        📅 ${match.date} | ${match.time}
        </p>


        <input 
        type="number"
        min="0"
        id="home-${index}"
        placeholder="0">


        :


        <input 
        type="number"
        min="0"
        id="away-${index}"
        placeholder="0">

        `;



        box.appendChild(card);



    });



}








// ===================================
// ZAPIS TYPOWANIA
// ===================================


async function saveTips(){



    const username =
    document.getElementById("username")
    .value
    .trim();



    const round =
    document.getElementById("roundSelect")
    .value;



    const league =
    document.getElementById("leagueSelect")
    .value;




    if(username === ""){


        document.getElementById("message").innerHTML =

        "❌ Wpisz nazwę Discord";


        return;

    }





    if(currentMatches.length === 0){


        document.getElementById("message").innerHTML =

        "❌ Najpierw wybierz ligę";


        return;

    }






    let saved = 0;





    for(let i=0;i<currentMatches.length;i++){



        const home =
        document.getElementById(
        "home-"+i
        ).value;



        const away =
        document.getElementById(
        "away-"+i
        ).value;





        if(home === "" || away === ""){

            continue;

        }





        const match =
        currentMatches[i];





        const data = {


            username: username,


            round: round,


            league: league,


            match:
            match.home + " - " + match.away,


            home: home,


            away: away,


            date:
            match.date + " " + match.time


        };






        const response =
        await fetch(SHEET_URL,{


            method:"POST",


            headers:{


                "Content-Type":"application/json"

            },


            body:
            JSON.stringify(data)



        });






        const result =
        await response.text();






        if(result === "ALREADY"){



            document.getElementById("message").innerHTML =

            "❌ Typy na tę kolejkę zostały już przez Ciebie oddane!";


            return;


        }





        saved++;



    }






    if(saved > 0){



        document.getElementById("message").innerHTML =

        "✅ Zapisano "+saved+" typów!";


    }


    else{


        document.getElementById("message").innerHTML =

        "❌ Nie wpisano żadnego wyniku";


    }



}








// ===================================
// START
// ===================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    document.getElementById("matches").innerHTML =
    "<h2>Wybierz kolejkę i ligę</h2>";


});

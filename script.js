// ===================================
// KOLONIA PASJONATÓW
// SYSTEM TYPOWANIA
// script.js
// ===================================


// LINK DO GOOGLE APPS SCRIPT

const SHEET_URL =
"https://script.google.com/macros/s/AKfycbyj_8vS9SJ69k_jxsXHGh569mQ9nFWGomAhioyRbbRL7vFHmkv9HaqJHi1XjS6SoHhX/exec";



// aktualne mecze

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
    "⚽ " + league;


    box.appendChild(title);






    currentMatches.forEach((match,index)=>{


        let div =
        document.createElement("div");


        div.className =
        "match";



        div.innerHTML = `

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



        box.appendChild(div);


    });



}








// ===================================
// ZAPIS TYPOWANIA
// ===================================


async function saveTips(){



    const username =
    document
    .getElementById("username")
    .value
    .trim();




    const round =
    document
    .getElementById("roundSelect")
    .value;



    const league =
    document
    .getElementById("leagueSelect")
    .value;






    if(username === ""){


        document.getElementById("message").innerHTML =

        "❌ Wpisz nazwę użytkownika";


        return;

    }




    if(currentMatches.length === 0){


        document.getElementById("message").innerHTML =

        "❌ Wybierz ligę";


        return;

    }






    let saved = 0;







    for(let i=0;i<currentMatches.length;i++){



        const home =
        document
        .getElementById("home-"+i)
        .value;



        const away =
        document
        .getElementById("away-"+i)
        .value;





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






        console.log(data);







        fetch(SHEET_URL, {


            method:"POST",


            mode:"no-cors",


            body:
            JSON.stringify(data)


        });






        saved++;




    }







    if(saved > 0){


        document.getElementById("message").innerHTML =


        "✅ Zapisano " + saved + " typów!";


    }

    else{


        document.getElementById("message").innerHTML =


        "❌ Nie wpisano żadnego typu";


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

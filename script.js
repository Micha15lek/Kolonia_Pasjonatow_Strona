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


        div.className = "match";



        div.innerHTML = `

        <h3>
        ⚽ ${match.home}
        <br>
        VS
        <br>
        ${match.away}
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
    document.getElementById("username")
    .value
    .trim();



    const round =
    document.getElementById("roundSelect")
    .value;



    const league =
    document.getElementById("leagueSelect")
    .value;





    const message =
    document.getElementById("message");





    if(username === ""){


        message.innerHTML =
        "❌ Wpisz nazwę użytkownika";


        return;

    }





    if(currentMatches.length === 0){


        message.innerHTML =
        "❌ Wybierz ligę";


        return;

    }





    let saved = 0;






    for(let i=0;i<currentMatches.length;i++){



        let home =
        document.getElementById("home-"+i).value;



        let away =
        document.getElementById("away-"+i).value;




        if(home === "" || away === ""){

            continue;

        }




        let match =
        currentMatches[i];




        let data = {


            username:username,


            round:round,


            league:league,


            match:
            match.home+" - "+match.away,


            home:home,


            away:away,


            date:
            match.date+" "+match.time


        };





        fetch(SHEET_URL,{

            method:"POST",

            mode:"no-cors",

            body:
            JSON.stringify(data)

        });



        saved++;


    }






    if(saved > 0){


        message.innerHTML =
        "✅ Zapisano "+saved+" typów!";


    }

    else{


        message.innerHTML =
        "❌ Nie wpisano żadnego typu";


    }



}








// ===================================
// TRYB JASNY / CIEMNY
// ===================================


function setupTheme(){



    const button =
    document.getElementById("themeButton");



    let theme =
    localStorage.getItem("theme");



    if(theme === "light"){


        document.body.classList.add("light");


    }





    updateThemeButton(button);





    if(button){


        button.addEventListener("click",()=>{



            document.body.classList.toggle("light");




            if(document.body.classList.contains("light")){


                localStorage.setItem(
                    "theme",
                    "light"
                );


            }

            else{


                localStorage.setItem(
                    "theme",
                    "dark"
                );


            }




            updateThemeButton(button);



        });



    }



}







function updateThemeButton(button){


    if(!button) return;



    if(document.body.classList.contains("light")){


        button.innerHTML =
        "🌙 Tryb ciemny";


    }

    else{


        button.innerHTML =
        "☀️ Tryb jasny";


    }



}








// ===================================
// START
// ===================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    const matches =
    document.getElementById("matches");



    if(matches){


        matches.innerHTML =
        "<h2>Wybierz kolejkę i ligę</h2>";


    }



    setupTheme();



});

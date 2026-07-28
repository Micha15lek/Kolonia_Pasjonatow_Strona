// ===================================
// KOLONIA PASJONATÓW
// SYSTEM TYPOWANIA
// ===================================


// LINK DO GOOGLE APPS SCRIPT

const SHEET_URL = 
"https://script.google.com/macros/s/AKfycbyj_8vS9SJ69k_jxsXHGh569mQ9nFWGomAhioyRbbRL7vFHmkv9HaqJHi1XjS6SoHhX/exec";




// ZAPIS TYPOWANIA

function saveTips() {


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



    matches.forEach(match => {



        const title =
        match.querySelector("h3");



        const inputs =
        match.querySelectorAll("input");



        // pomija mecze przełożone

        if(inputs.length !== 2) {

            return;

        }




        const home =
        inputs[0].value;



        const away =
        inputs[1].value;




        if(home !== "" && away !== "") {



            fetch(SHEET_URL, {


                method: "POST",

                mode: "no-cors",


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
                    away


                })


            });



            counter++;


        }



    });




    if(counter > 0) {


        document.getElementById("message").innerHTML =

        "✅ Zapisano " + counter + " typów!";


    }

    else {


        document.getElementById("message").innerHTML =

        "❌ Nie wpisano żadnego typu";


    }


}





// ROZPOZNAWANIE LIGI

function getLeague(element) {


    let section =
    element.closest("section");



    let title =
    section.querySelector(".league-title");



    if(!title) {


        return "Nieznana";


    }



    return title.innerText
    .replace("🏆 ","")
    .replace("🥇 ","")
    .replace("🥈 ","");


}






// BLOKOWANIE TYPOWANIA PO ROZPOCZĘCIU MECZU


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



            let info =
            document.createElement("p");



            info.className = "closed";

            info.innerHTML =
            "🔒 Typowanie zamknięte";



            if(!match.querySelector(".closed")) {


                match.appendChild(info);


            }



        }



    });



}



// sprawdzanie przy wejściu

checkMatches();



// sprawdzanie co minutę

setInterval(checkMatches,60000);

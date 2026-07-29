// ===================================
// KOLONIA PASJONATÓW
// SYSTEM TYPOWANIA
// ===================================


// LINK DO GOOGLE APPS SCRIPT

const SHEET_URL =
"https://script.google.com/macros/s/AKfycbyj_8vS9SJ69k_jxsXHGh569mQ9nFWGomAhioyRbbRL7vFHmkv9HaqJHi1XjS6SoHhX/exec";


// AKTUALNA KOLEJKA

const CURRENT_ROUND = 2;




// ZMIANA LIGI

function changeLeague(){


    const league =
    document.getElementById("leagueSelect").value;



    const sections =
    document.querySelectorAll(".league-section");



    sections.forEach(section => {



        if(section.dataset.league === league){


            section.style.display = "block";


        }

        else{


            section.style.display = "none";


        }


    });



}







// ZAPIS TYPOWANIA


async function saveTips(){



    const username =
    document.getElementById("username").value.trim();



    const league =
    document.getElementById("leagueSelect").value;



    if(username === ""){


        document.getElementById("message").innerHTML =

        "❌ Wpisz nazwę użytkownika Discord";


        return;


    }



    if(league === ""){


        document.getElementById("message").innerHTML =

        "❌ Wybierz ligę";


        return;


    }






    const section =
    document.querySelector(
    `.league-section[data-league="${league}"]`
    );



    const matches =
    section.querySelectorAll(".match");



    let counter = 0;





    for(const match of matches){



        const inputs =
        match.querySelectorAll("input");



        const title =
        match.querySelector("h3");



        const home =
        inputs[0].value.trim();



        const away =
        inputs[1].value.trim();





        if(home === "" || away === ""){


            continue;


        }







        const response =
        await fetch(SHEET_URL,{



            method:"POST",



            headers:{


                "Content-Type":"application/json"


            },



            body:JSON.stringify({



                date:
                new Date().toLocaleString("pl-PL"),



                username:
                username,



                league:
                league,



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





        if(result === "ALREADY"){



            document.getElementById("message").innerHTML =


            "❌ Typy na tę kolejkę zostały już przez Ciebie oddane!";



            return;



        }





        counter++;




    }







    if(counter > 0){



        document.getElementById("message").innerHTML =


        "✅ Zapisano " + counter + " typów!";



    }


    else{



        document.getElementById("message").innerHTML =


        "❌ Nie wpisano żadnego typu";



    }




}








// BLOKADA PO ROZPOCZĘCIU MECZU



function checkMatches(){



    const matches =
    document.querySelectorAll(".match");



    const now =
    new Date();




    matches.forEach(match=>{



        const date =
        match.dataset.date;



        if(!date) return;




        const matchDate =
        new Date(date);





        if(now >= matchDate){



            const inputs =
            match.querySelectorAll("input");



            inputs.forEach(input=>{


                input.disabled = true;


            });





            if(!match.querySelector(".closed")){



                const p =
                document.createElement("p");



                p.className="closed";


                p.innerHTML =
                "🔒 Typowanie zamknięte";



                match.appendChild(p);



            }



        }



    });



}







// START


checkMatches();



// sprawdzanie co minutę


setInterval(checkMatches,60000);

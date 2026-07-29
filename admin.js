// ===================================
// KOLONIA PASJONATÓW
// PANEL ADMINA
// admin.js
// ===================================



const usersTips = [


    {
        username:"Michał",

        round:"Kolejka 2",

        tips:[

            {
                league:"Ekstraklasa",

                match:"Legia Warszawa - Lech Poznań",

                result:"2-1"

            },


            {
                league:"1 Liga",

                match:"Motor Lublin - ŁKS Łódź",

                result:"1-0"

            },


            {
                league:"2 Liga",

                match:"Ruch Chorzów - Polonia Bytom",

                result:"0-2"

            }

        ]

    },





    {
        username:"Kuba",

        round:"Kolejka 3",

        tips:[


            {
                league:"Ekstraklasa",

                match:"Raków - Widzew",

                result:"1-1"

            },


            {
                league:"1 Liga",

                match:"Wisła - Arka",

                result:"2-0"

            }


        ]

    }


];






// ===================================
// ŁADOWANIE UŻYTKOWNIKÓW
// ===================================


function filterUsers(){



    const filter =

    document.getElementById("roundFilter").value;



    const box =

    document.getElementById("users");



    box.innerHTML="";






    usersTips.forEach(user=>{



        if(filter !== "all" && user.round !== filter){

            return;

        }





        let div =

        document.createElement("div");



        div.className="card";



        div.onclick = () => {

            showUser(user.username);

        };





        div.innerHTML = `


        <h3>
        👤 ${user.username}
        </h3>


        <p>
        📅 ${user.round}
        </p>


        <p>
        ⚽ Typów:
        ${user.tips.length}
        </p>


        `;



        box.appendChild(div);



    });



}









// ===================================
// POKAZANIE TYPOW
// ===================================


function showUser(username){



    const box =

    document.getElementById("userTips");



    const user =

    usersTips.find(

        x => x.username === username

    );





    if(!user){

        box.innerHTML="Brak typów";

        return;

    }






    let html = `

    <h2>
    👤 ${user.username}
    </h2>


    <p>
    📅 ${user.round}
    </p>

    `;






    const leagues = [

        "Ekstraklasa",

        "1 Liga",

        "2 Liga"

    ];






    leagues.forEach(league=>{



        let leagueTips =

        user.tips.filter(

            x=>x.league===league

        );





        if(leagueTips.length > 0){



            html += `

            <h3>
            ${league}
            </h3>

            `;





            leagueTips.forEach(tip=>{



                html += `


                <div class="box">


                ⚽ ${tip.match}

                <br>

                🔮 Typ:
                ${tip.result}


                </div>


                `;



            });



        }





    });





    box.innerHTML = html;



}







// start

document.addEventListener(

"DOMContentLoaded",

()=>{


    filterUsers();


}

);
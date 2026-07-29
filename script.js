// ===================================
// TRYB JASNY / CIEMNY
// KOLONIA PASJONATÓW
// ===================================


document.addEventListener("DOMContentLoaded", () => {


    const themeButton = document.getElementById("themeButton");


    // jeżeli na stronie nie ma przycisku
    if (!themeButton) return;



    // sprawdzenie zapisanego wyglądu

    const savedTheme = localStorage.getItem("theme");



    if (savedTheme === "light") {

        document.body.classList.add("light");

        themeButton.innerHTML = "🌙 Tryb ciemny";

    } 
    else {

        themeButton.innerHTML = "☀️ Tryb jasny";

    }





    // zmiana po kliknięciu

    themeButton.addEventListener("click", () => {



        document.body.classList.toggle("light");



        if (document.body.classList.contains("light")) {



            localStorage.setItem(
                "theme",
                "light"
            );


            themeButton.innerHTML =
            "🌙 Tryb ciemny";



        } 
        
        else {



            localStorage.setItem(
                "theme",
                "dark"
            );


            themeButton.innerHTML =
            "☀️ Tryb jasny";



        }



    });



});

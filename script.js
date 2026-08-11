<script>
const themeToggle = document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("theme") || "dark";

function applyTheme(theme) {

    document.body.classList.remove(
        "light",
        "retro"
    );

    if (theme === "light") {

        document.body.classList.add("light");

        themeToggle.textContent = "☀️";

    } else if (theme === "retro") {

        document.body.classList.add("retro");

        themeToggle.textContent = "💾";

    } else {

        themeToggle.textContent = "🌙";

    }

    localStorage.setItem(
        "theme",
        theme
    );
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {

    const current =
        localStorage.getItem("theme") || "dark";

    if (current === "dark") {

        applyTheme("light");

    } else if (current === "light") {

        applyTheme("retro");

    } else {

        applyTheme("dark");

    }

});
</script> 

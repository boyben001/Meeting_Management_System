/* INFO: Dark Mode */
const toggleButton = document.querySelector("#darkmode_icon");

toggleButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("theme");
    //
    let navbar = document.querySelector('.navbar');
    let navOption = document.querySelector('.navbar-nav');
    //
    let calendarHead = document.querySelector('thead');
    let datepicker = document.querySelector('#calendar_choose');
    let calendarBody = document.querySelector('tbody');
    let calendarNum = document.querySelector('.number_block');
    if (darkMode == "dark") {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("body_dark_mode");
        /* INFO: Navbar Dark Mode */
        navOption.classList.remove("bg-dark");
        navbar.classList.remove("nav_dark_mode", "navbar-dark", "bg-dark");
        navbar.classList.add("navbar-light", "bg-light");
        /* INFO: Dashboard Dark Mode */
        calendarHead.setAttribute("style", "background-color: hsl(203, 100%, 86%);");
        calendarBody.setAttribute("style", "background-color: #80b2db");
        calendarNum.setAttribute("style", "background-color: ");
        datepicker.setAttribute("style", "background-color: hsl(203, 10%, 86%);");
    } else {
        localStorage.setItem("theme", "dark");
        document.body.classList.add("body_dark_mode");
        /* INFO: Navbar Dark Mode */
        navOption.classList.add("bg-dark");
        navbar.classList.add("nav_dark_mode", "navbar-dark", "bg-dark");
        navbar.classList.remove("navbar-light", "bg-light");
        /* INFO: Dashboard Dark Mode */
        calendarHead.setAttribute("style", "background-color: black;");
        calendarBody.setAttribute("style", "background-color: #6d6d6d;");
        calendarNum.setAttribute("style", "background-color: #424242;");
        datepicker.setAttribute("style", "background-color: #424242;");
    }
})

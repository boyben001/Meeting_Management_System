const toggleButton = document.querySelector("#darkmode_icon");
localStorage.clear();
toggleButton.addEventListener("click", () => {
    let darkMode = localStorage.getItem("theme");
    let routerLocation = window.location.href;
    routerLocation = routerLocation.substring(22, routerLocation.length);
    /* ------------------------- */

    /* ------------------------- */
    let navbar = document.querySelector('.navbar');
    let navOption = document.querySelector('.navbar-nav');
    /* ------------------------- */
    let calendarHead = document.querySelector('thead');
    let datepicker = document.querySelector('#calendar_choose');
    let calendarBody = document.querySelector('tbody');
    let calendarNum = document.querySelectorAll('.number_block');
    let totalCalendarNum = calendarNum.length;
    /* ------------------------- */
    let iconTextButton = document.querySelectorAll('.icon_text_button');
    let totalIconNum = iconTextButton.length;
    let saveBtn = document.querySelector('#save_btn');
    let listGroup = document.querySelectorAll('#identity_list li');
    let listGroupNum = listGroup.length;
    let nameListHead = document.querySelector('thead');
    let nameListBody = document.querySelector('tbody');
    let nameListBtn = document.querySelectorAll('tbody button');
    let nameListBtnNum = nameListBtn.length;
    /* ------------------------- */
    let identityTableHead = document.querySelector('#authority_table thead')
    let identityTableBody = document.querySelector('#authority_table tbody')
    let formButton = document.querySelectorAll('.form_item button');
    let formButtonNum = formButton.length;
    let card = document.querySelectorAll('.card');
    let cardNum = card.length;
    /* ------------------------- */

    if (darkMode == "dark") {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("body_dark_mode");
        /* INFO: Navbar Dark Mode */
        navOption.classList.remove("bg-dark");
        navbar.classList.remove("nav_dark_mode", "navbar-dark", "bg-dark");
        navbar.classList.add("navbar-light", "bg-light");
        /* INFO: Profile Dark Mode */
        if (routerLocation == "settings/profile") {
            for (var i = 0; i < totalIconNum; i++) {
                iconTextButton[i].classList.remove('bg-dark', 'text-light');
            }
            saveBtn.classList.remove("bg-secondary");
            for (var i = 0; i < listGroupNum; i++) {
                listGroup[i].classList.remove('bg-dark', 'text-light', 'list_hover');
            }
            nameListHead.setAttribute("style", "background-color: ; color: ");
            nameListBody.setAttribute("style", "background-color: ; color: ");
            for (var i = 0; i < nameListBtnNum; i++) {
                nameListBtn[i].setAttribute("style", "background-color: ; color: ");
            }
        }
        /* INFO: Dashboard Dark Mode */
        if (routerLocation == "dashboard") {
            calendarHead.setAttribute("style", "background-color: hsl(203, 100%, 86%);");
            calendarBody.setAttribute("style", "background-color: #80b2db");
            for (var i = 0; i < totalCalendarNum; i++) {
                calendarNum[i].setAttribute("style", "background-color: ");
            }
            datepicker.setAttribute("style", "background-color: hsl(203, 10%, 86%);");
        }
        /* INFO: Edit Dark Mode */
        if (routerLocation == "meeting/edit") {
            identityTableHead.setAttribute("style", "background-color: ; color:");

            identityTableBody.setAttribute("style", "background-color: ; color: ");
            for (var i = 0; i < formButtonNum; i++) {
                formButton[i].setAttribute("style", "background-color: ; color: ");
            }
            for (var i = 0; i < totalIconNum; i++) {
                iconTextButton[i].classList.remove('bg-dark', 'text-light');
            }
            for (var i = 0; i < cardNum; i++) {
                card[i].classList.remove('bg-dark', 'text-light');
            }
        }

    } else {
        localStorage.setItem("theme", "dark");
        document.body.classList.add("body_dark_mode");
        /* INFO: Navbar Dark Mode */
        navOption.classList.add("bg-dark");
        navbar.classList.add("nav_dark_mode", "navbar-dark", "bg-dark");
        navbar.classList.remove("navbar-light", "bg-light");
        /* INFO: Profile Dark Mode */
        if (routerLocation == "settings/profile") {
            for (var i = 0; i < totalIconNum; i++) {
                iconTextButton[i].classList.add('bg-dark', 'text-light');
            }
            saveBtn.classList.remove("bg-dark");
            saveBtn.classList.add("bg-secondary");
            for (var i = 0; i < listGroupNum; i++) {
                listGroup[i].classList.add('bg-dark', 'text-light', 'list_hover');
            }
            nameListHead.setAttribute("style", "background-color: #212529; color: azure");
            nameListBody.setAttribute("style", "background-color: #212529; color: azure");
            for (var i = 0; i < nameListBtnNum; i++) {
                nameListBtn[i].setAttribute("style", "background-color: black; color: azure");
            }
        }
        /* INFO: Dashboard Dark Mode */
        if (routerLocation == "dashboard") {
            calendarHead.setAttribute("style", "background-color: black;");
            calendarBody.setAttribute("style", "background-color: #6d6d6d;");
            for (var i = 0; i < totalCalendarNum; i++) {
                calendarNum[i].setAttribute("style", "background-color: #424242;");
            }
            datepicker.setAttribute("style", "background-color: #424242;");

        }
        /* INFO: Edit Dark Mode */
        if (routerLocation == "meeting/edit") {
            identityTableHead.setAttribute("style", "background-color: #212529; color: azure");

            identityTableBody.setAttribute("style", "background-color: #1b1b1b; color: #fff");
            for (var i = 0; i < formButtonNum; i++) {
                formButton[i].setAttribute("style", "background-color: #424242; color: azure");
            }
            for (var i = 0; i < totalIconNum; i++) {
                iconTextButton[i].classList.add('bg-dark', 'text-light');
            }
            console
            for (var i = 0; i < cardNum; i++) {
                card[i].classList.add('bg-dark', 'text-light');
            }
        }
    }

})

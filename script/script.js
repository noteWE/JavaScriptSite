function initPage() {
    if (localStorage.getItem("userName") != null) {
        console.log("login saccessful");
        document.getElementById("registration").style.display = "none";
        document.getElementById("menu-username").innerText = localStorage.getItem("userName");
    }
    let buttonRegistation = document.getElementById("registration-form-button");
    buttonRegistation.onclick = clickButtonRegistration;
}

function clickButtonRegistration() {
    let inputName = document.getElementById("registration-form-field-name");
    localStorage.setItem("userName", inputName.value);
    document.getElementById("registration").style.display = "none";
    document.getElementById("menu-username").innerText = localStorage.getItem("userName");
}

initPage();
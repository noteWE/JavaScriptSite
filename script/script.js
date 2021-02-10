function initPage() {
    let buttonRegistation = document.getElementById("registration-form-button");
    buttonRegistation.onclick = clickButtonRegistration;
}

function clickButtonRegistration() {
    let inputName = document.getElementById("registration-form-field-name");
    localStorage.setItem("userName", inputName.value);
}

initPage();
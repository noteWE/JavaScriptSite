function initPage() {
    if (localStorage.getItem("userName") != null) {
        console.log("login saccessful");
        document.getElementById("registration").style.display = "none";
        document.getElementById("menu-username").innerText = localStorage.getItem("userName");
    }
    let buttonRegistation = document.getElementById("registration-form-button");
    buttonRegistation.onclick = clickButtonRegistration;
    Array.prototype.slice.call(document.getElementsByClassName("menu-link")).forEach(element => {
        element.addEventListener("click", clickMenuLink, false)
    });
    document.getElementById("window-form-button-square").onclick = clickButtonWindowSquare;
    Array.prototype.slice.call(document.getElementsByClassName("window-hader-cross")).forEach(element => {
        element.addEventListener("click", clickWindowCross, false);
    });
    document.getElementById("window-form-button-string").onclick = clickButtonWindowString;
    document.getElementById("window-form-button-maxnmin").onclick = clickButtonWindowMaxnMin;

    document.getElementById("window-form-button-start").onclick = clickButtonWindowTimerStart;
    document.getElementById("window-form-button-continue").onclick = clickButtonWindowTimerContinnue;
    document.getElementById("window-form-button-stop").onclick = clickButtonWindowTimerStop;

    document.getElementById("window-form-button-test").onclick = clickButtonWindowTestCheck;
    document.getElementById("window-form-test").setAttribute("questionnumber", "1");
    document.getElementById("window-form-button-prev").onclick = clickButtonWindowTestPrev;
    document.getElementById("window-form-button-next").onclick = clickButtonWindowTestNext;

    document.getElementById("window-datetime").addEventListener("click", clickWindowDateTime, false);
    document.getElementById("window-form-button-datetime").onclick = clickButtonWindowDateTime;
    updateDate();
}

function clickButtonRegistration() {
    let inputName = document.getElementById("registration-form-field-name");
    localStorage.setItem("userName", inputName.value);
    document.getElementById("registration").style.display = "none";
    document.getElementById("menu-username").innerText = localStorage.getItem("userName");
}

function clickButtonWindowSquare() {
    let height = document.getElementById("window-form-input-height");
    let base = document.getElementById("window-form-input-base");
    let answer = document.getElementById("window-form-answer-number");
    answer.innerHTML = "Площадь треугольника равна: " + base.value * height.value / 2;
}

function clickButtonWindowString() {
    let strs = document.getElementsByClassName("window-form-input-string")
    let ans = "";
    if (strs.item(0).value.length == strs.item(1).value.length) {
        ans = "<b style=\"color: green\">" + true + "</b>"
    } else {
        ans = "<b style=\"color: red\">" + false + "</b>"
    }
    document.getElementById("window-form-answer-boolean").innerHTML = "Строки равны: " + ans;
}

function clickWindowCross(event) {
    event.currentTarget.parentNode.parentNode.style.display = "none";
}

function clickMenuLink(event) {
    document.getElementById(event.target.getAttribute("forwindow")).style.display="flex";
    event.preventDefault();
}

function clickButtonWindowMaxnMin() {
    let array = Array.prototype.slice.call(document.getElementsByClassName("window-form-input-small-number"));
    let max, min;
    max = min = (Number)(array[0].value);
    for (let inp of array) {
        if ((Number)(inp.value) > max) {
            max = inp.value;
        }
        if ((Number)(inp.value) < min) {
            min = inp.value;
        }
    }
    document.getElementById("window-form-answer-max").innerHTML = "Максимум: " + max;
    document.getElementById("window-form-answer-min").innerHTML = "Минимум: " + min;
}

function clickButtonWindowTimerStart() {
    let timer = document.getElementById("window-form-time");
    timer.setAttribute("active", "true");
    timer.setAttribute("timeshift", 0);
    timer.setAttribute("start-time", new Date().getTime());
}

function clickButtonWindowTimerContinnue() {
    let timer = document.getElementById("window-form-time");
    timer.setAttribute("active", "true");
    timer.setAttribute("start-time", new Date().getTime() - timer.getAttribute("timeshift"));
}

function clickButtonWindowTimerStop() {
    let timer = document.getElementById("window-form-time");
    timer.setAttribute("active", "false");
    timer.setAttribute("timeshift", new Date().getTime() - timer.getAttribute("start-time"));
}

function clickButtonWindowTestPrev() {
    let form = document.getElementById("window-form-test");
    let number = form.getAttribute("questionnumber");
    if (number > 1) {
        document.getElementById("window-form-question" + number).style.display = "none"
        document.getElementById("window-form-question" + (number - 1)).style.display = "flex";
        form.setAttribute("questionnumber", number - 1);
    }
}

function clickButtonWindowTestNext() {
    let form = document.getElementById("window-form-test");
    let number = form.getAttribute("questionnumber");
    if (number < 6) {
        document.getElementById("window-form-question" + number).style.display = "none"
        document.getElementById("window-form-question" + (Number(number) + 1)).style.display = "flex";
        form.setAttribute("questionnumber", Number(number) + 1);
    }
}

function clickButtonWindowTestCheck() {
    let answers = [1, 1, 3, 0, 1, 0];
    let buttons = [];
    let ch = false;
    for (let i = 0; i < 6; i++) {
        buttons.push(document.getElementsByClassName("window-form-radio" + (i + 1)));
        let c = 0;
        for(let j = 0; j < buttons[i].length; j++) {
            if (!buttons[i][j].checked)
                c++
        }
        if (c == buttons[i].length) {
            document.getElementById("window-form-warning").style.visibility = "visible";
            return;
        }
    }
    for (let i = 0; i < buttons.length; i++) {
        Array.prototype.slice.call(buttons[i]).forEach(elem => {
            if (elem.checked) {
                if (elem.getAttribute("var") == answers[i]) {
                    elem.nextElementSibling.nextElementSibling.style.display = "block";
                    elem.nextElementSibling.nextElementSibling.style.color = "green";
                    elem.nextElementSibling.nextElementSibling.innerHTML = " Верно";
                }
                else {
                    elem.nextElementSibling.nextElementSibling.style.display = "block";
                    elem.nextElementSibling.nextElementSibling.style.color = "red";
                    elem.nextElementSibling.nextElementSibling.innerHTML = " Не верно";
                }
            }
        });
    }
    let form = document.getElementById("window-form-test");
    let number = form.getAttribute("questionnumber");
    document.getElementById("window-form-question" + number).style.display = "none"
    document.getElementById("window-form-question1").style.display = "flex";
    form.setAttribute("questionnumber", 1);
    /*for (let i = 0; i < 6; i++) {
        let radiosGroup = document.getElementsByClassName("window-form-radio" + (i + 1));
        let c = 0;
        Array.prototype.slice.call(radiosGroup).forEach(element => {
            if (element.checked) {
                if (element.getAttribute("var") == answers[i]) {
                    element.nextSibling.nextSibling.innerHTML += "<b style=\"color:green\"> Верно</b>";
                }
                else {
                    element.nextSibling.nextSibling.innerHTML += "<b style=\"color:red\"> Не верно</b>";
                }
            }
            else {
                c++;
            }
        });
        if (c == radiosGroup.length) {
            document.getElementById("window-form-warning").style.visibility = "visible";
            break;
        }
    }*/
}

function clickWindowDateTime(event) {
    let anim = event.currentTarget.animate(
        [{ opacity: 100 },
        { opacity: 0 }],
        {
            duration: 1000,
            easing: "linear"
        }
    );
    let time = setTimeout(() => {document.getElementById("window-datetime").style.display = "none";}, 1000);
}

function clickButtonWindowDateTime() {
    document.getElementById("window-datetime").style.display = "flex";
    document.getElementById("window-datetime").animate(
        [{ opacity: 0 },
         { opacity: 100 }
        ],
        {
            duration: 1000,
            easing: "linear"
        }
    );
}

function updateTimer() {
    let timer = document.getElementById("window-form-time");
    if (document.getElementById("window-pop-up-timer").style.display == "flex" && timer.getAttribute("active") == "true") {
        let startTime = timer.getAttribute("start-time");
        timer.innerHTML = millisecondsToHMS(new Date().getTime() - startTime);
    }
    
}

function updateDate() {
    document.getElementById("date").innerHTML = new Date().toLocaleDateString("ru", { weekday: 'short', month: 'long', day: 'numeric' });
}

function updateTime() {
    let windowDateTime = document.getElementById("window-datetime");
    if (windowDateTime.style.display == "flex") {
        let date = new Date();
        let str = date.toLocaleTimeString("ru", {hour:"2-digit"});
        if (date.getSeconds() % 2 == 0)
            str += " ";
        else
            str += ":";
        if (date.getMinutes() < 10)
            str += "0";
        str += date.getMinutes();
        windowDateTime.firstElementChild.firstElementChild.innerHTML = str;
    }
}

function millisecondsToHMS(milliseconds) {
    milliseconds /= 1000;
    let str = "";
    let h = Math.floor(milliseconds / 3600);
    let m = Math.floor((milliseconds % 3600) / 60);
    let s = Math.floor(milliseconds % 60);
    if (h < 10) {
        str += "0";
    }
    str += h + ":";
    if (m < 10) {
        str += "0";
    }
    str += m + ":";
    if (s < 10) {
        str += "0";
    }
    str += s;
    return str;

}

initPage();

let timer = setInterval(updateTimer, 500);
let time = setInterval(updateTime, 1000);
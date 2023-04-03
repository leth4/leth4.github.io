const gridSize = 7;
const numbers = 6;

const squareContainer = document.getElementById("squares");
const timer = document.getElementById("timer");
var buttons = [];
var timeLeft = 6;
var marksLeft = 2;

var unclickedButtons = numbers;

createSquares();

setInterval(subtractTimer, 1000)

function subtractTimer() {
    timeLeft -= 1;
    timer.innerHTML =  Math.trunc(timeLeft);
    if (timeLeft <= 0) console.log(1);
}

setTimeout(hideNumbers, timeLeft * 1000);

function createSquares() {

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var element = document.createElement("button");
            element.classList.add("disabled");
            buttons.push(element);
            squareContainer.appendChild(element);
        }
    }

    buttons = shuffleArray(buttons);

    for (var i = 0; i < numbers; i++) {
        buttons[i].innerHTML = i + 1;
        buttons[i].classList.remove("disabled");
        buttons[i].addEventListener("click", (event) => {
            buttonClicked(event.target);
        });
    }
}

function hideNumbers() {
    console.log("1");
    for (var i = 0; i < numbers; i++) {
        if (buttons[i].classList.contains("marked")) {
            buttons[i].classList.remove("marked");
            continue;
        }
        buttons[i].innerHTML = "";
    }
}

function buttonClicked(button) {
    if (timeLeft > 0 && marksLeft > 0) {
        button.classList.add("marked");
        marksLeft--;
    }
    
    if (timeLeft > 0) return;

    button.classList.add("disabled");
    unclickedButtons--;
    if (unclickedButtons == 0) {
        document.getElementById("results").innerHTML = "L RIP BOZO";
        var element = document.createElement("button");
        element.id = "next-button";
        document.getElementById("results").appendChild(element);
        element.addEventListener("click", () =>  window.location.href = "/second.html");
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
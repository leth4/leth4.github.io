const gridSize = 7;
const numbers = 6;

const squareContainer = document.getElementById("squares");
var buttons = [];

var unclickedButtons = numbers;

createSquares();

setTimeout(hideNumbers, 2000);

function createSquares() {

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var element = document.createElement("button");
            element.disabled = true;
            element.classList.add("disabled");
            buttons.push(element);
            squareContainer.appendChild(element);
        }
    }

    buttons = shuffleArray(buttons);

    for (var i = 0; i < numbers; i++) {
        buttons[i].innerHTML = i + 1;
        buttons[i].classList.remove("disabled");
        buttons[i].addEventListener("click", (event) => buttonClicked(event.target));
    }
}

function hideNumbers() {
    for (var i = 0; i < numbers; i++) {
        buttons[i].innerHTML = "";
        buttons[i].disabled = false;
    }
}

function buttonClicked(button) {
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
const boxes = document.querySelectorAll(".box");
const spinner = document.querySelector(".spiral");
const header = document.querySelector(".brand");
const ANSWER_LENGTH = 5;

let buffer = "";

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function inputHandler(event) {
  if (event.key === "Enter") {
    console.log("submit()");
  } else if (event.key === "Backspace") {
    console.log("splice()");
  } else if (isLetter(event.key)) {
    addLetter(event.key);
  } else {
    // do nothing for other keys
  }
}

function addLetter(letter) {
  if (buffer.length < ANSWER_LENGTH) {
    buffer += letter;
  } else {
    buffer = buffer.substring(0, ANSWER_LENGTH - 1) + letter;
  }

  boxes[buffer.length - 1].textContent = letter.toUpperCase();
}

function init() {
  document.addEventListener("keydown", inputHandler);
}

init();

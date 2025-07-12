const boxes = document.querySelectorAll(".box");
const spinner = document.querySelector(".spiral");
const header = document.querySelector(".brand");
const ANSWER_LENGTH = 5;
let currentRow = 0;

let buffer = "";

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function inputHandler(event) {
  if (event.key === "Enter") {
    submit();
  } else if (event.key === "Backspace") {
    splicer();
  } else if (boxes[29].innerText === "" && isLetter(event.key)) {
    addLetter(event.key);
  } else {
    // do nothing for other keys
  }
}

function splicer() {
  if (buffer.length > 0) {
    console.log("buffer before splice: ", buffer);
    buffer = buffer.slice(0, -1);
    console.log("buffer after slice: ", buffer);
  }
  boxes[ANSWER_LENGTH * currentRow + buffer.length].textContent = "";
}

function addLetter(letter) {
  if (buffer.length < ANSWER_LENGTH) {
    buffer += letter;
  } else {
    buffer = buffer.substring(0, ANSWER_LENGTH - 1) + letter;
  }

  boxes[ANSWER_LENGTH * currentRow + buffer.length - 1].textContent = letter.toUpperCase();
}

function submit() {
  if (buffer.length === ANSWER_LENGTH) {
    buffer = "";
    // validate and color code later
  }
  currentRow++;
  console.log("Current Row: ", currentRow);
}

function init() {
  document.addEventListener("keydown", inputHandler);
}

init();

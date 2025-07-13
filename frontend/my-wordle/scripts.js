const boxes = document.querySelectorAll(".box");
const spinner = document.querySelector(".spiral");
const header = document.querySelector(".brand");
const ANSWER_LENGTH = 5;
let currentRow = 0;
const dayWordUrl = "https://words.dev-apis.com/word-of-the-day";
let dayWord = "";
let buffer = "";
let letterMatch = 0;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function inputHandler(event) {
  if (event.key === "Enter" && buffer.length === ANSWER_LENGTH) {
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
    buffer = buffer.slice(0, -1);
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

async function getDayWord() {
  const promise = await fetch(dayWordUrl);
  const processedResponse = await promise.json();
  dayWord = processedResponse.word.toUpperCase();
  return dayWord;
}

function colorCoder() {
  let dayWordCopy = dayWord.split("");
  buffer = buffer.toUpperCase();
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    letterMatch = 0;
    if (buffer[i] === dayWord[i]) {
      boxes[ANSWER_LENGTH * currentRow + i].classList.add("correct");
      let letterIndex = dayWordCopy.indexOf(buffer[i]);
      dayWordCopy.splice(letterIndex, 1);
      letterMatch++;
    }
  }

  for (let i = 0; i < ANSWER_LENGTH; i++) {
    if (dayWordCopy.includes(buffer[i]) && buffer[i] !== dayWord[i]) {
      boxes[ANSWER_LENGTH * currentRow + i].classList.add("close");
      let letterIndex = dayWordCopy.indexOf(buffer[i]);
      dayWordCopy.splice(letterIndex, 1);
      letterMatch--;
    } else if (buffer[i] !== dayWord[i] && !dayWordCopy.includes(buffer[i])) {
      boxes[ANSWER_LENGTH * currentRow + i].classList.add("wrong");
      letterMatch--;
    }
  }
}

function submit() {
  if (buffer.length === ANSWER_LENGTH) {
    colorCoder();
    buffer = "";
  }
  currentRow++;
  setTimeout(() => {
    if (currentRow === 6 && letterMatch !== 5) {
      alert("you lose, the word was: " + dayWord);
      document.removeEventListener("keydown", inputHandler);
    } else {
      if (letterMatch === 1 && currentRow <= 5) {
        alert("you win");
        document.removeEventListener("keydown", inputHandler);
      }
    }
  }, 1);
}

function setLoading(isLoading) {
  spinner.classList.toggle("spiralshow", isLoading);
}

async function init() {
  setLoading(true);
  dayWord = await getDayWord();
  setLoading(false);
  document.addEventListener("keydown", inputHandler);
}

init();

const boxes = document.querySelectorAll(".box");
const onscreenKeyboard = document.querySelectorAll(".key");
const spinner = document.querySelector(".loader");
const header = document.querySelector(".brand");
const ANSWER_LENGTH = 5;
let currentRow = 0;
const dayWordUrl = "https://words.dev-apis.com/word-of-the-day";
const checkWordUrl = "https://words.dev-apis.com/validate-word";
let dayWord = "";
let buffer = "";
let letterMatch = 0;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function inputHandler(event) {
  const key = event.type === "keydown" ? event.key : event.target.innerText;
  if ((key === "Enter" || key === "ENTER") && buffer.length === ANSWER_LENGTH) {
    checkIfWord();
  } else if (key === "Backspace" || key === "⌫") {
    splicer();
  } else if (
    (boxes[29].innerText === "" || (boxes[29].innerText !== "" && boxes[28].innerText !== "")) &&
    isLetter(key)
  ) {
    addLetter(key);
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
  boxes[ANSWER_LENGTH * currentRow + buffer.length - 1].classList.add("typing");

  setTimeout(() => {
    boxes[ANSWER_LENGTH * currentRow + buffer.length - 1].classList.remove("typing");
  }, 100);
}

async function getDayWord() {
  const promise = await fetch(dayWordUrl);
  const processedResponse = await promise.json();
  dayWord = processedResponse.word.toUpperCase();
  return dayWord;
}

// function colorCoder() {
//   let dayWordCopy = dayWord.split("");
//   buffer = buffer.toUpperCase();
//   for (let i = 0; i < ANSWER_LENGTH; i++) {
//     letterMatch = 0;
//     if (buffer[i] === dayWord[i]) {
//       boxes[ANSWER_LENGTH * currentRow + i].classList.add("correct");
//       for (let keypad of onscreenKeyboard) {
//         if (keypad.innerText === buffer[i]) {
//           keypad.classList.add("correct");
//         }
//       }
//       let letterIndex = dayWordCopy.indexOf(buffer[i]);
//       dayWordCopy.splice(letterIndex, 1);
//       letterMatch++;
//     }
//   }
//
//   for (let i = 0; i < ANSWER_LENGTH; i++) {
//     if (dayWordCopy.includes(buffer[i]) && buffer[i] !== dayWord[i]) {
//       boxes[ANSWER_LENGTH * currentRow + i].classList.add("close");
//       let letterIndex = dayWordCopy.indexOf(buffer[i]);
//       dayWordCopy.splice(letterIndex, 1);
//       letterMatch--;
//     } else if (buffer[i] !== dayWord[i] && !dayWordCopy.includes(buffer[i])) {
//       boxes[ANSWER_LENGTH * currentRow + i].classList.add("wrong");
//       letterMatch--;
//     }
//   }
// }

function colorCoder(onComplete) {
  let dayWordCopy = dayWord.split("");
  buffer = buffer.toUpperCase();

  const capturedBuffer = buffer;
  const capturedRowToColor = currentRow;

  let completedAnimations = 0;

  letterMatch = 0;

  for (let i = 0; i < ANSWER_LENGTH; i++) {
    setTimeout(() => {
      boxes[ANSWER_LENGTH * capturedRowToColor + i].classList.add("flip");

      setTimeout(() => {
        applyColorCoding(i, dayWordCopy, capturedRowToColor, capturedBuffer);

        completedAnimations++;
        if (completedAnimations === ANSWER_LENGTH && onComplete) {
          setTimeout(() => {
            onComplete();
          }, 100);
        }
      }, 250);
    }, i * 100);
  }
}

function applyColorCoding(i, dayWordCopy, capturedRowToColor, capturedBuffer) {
  if (capturedBuffer[i] === dayWord[i]) {
    boxes[ANSWER_LENGTH * capturedRowToColor + i].classList.add("correct");

    for (let keypad of onscreenKeyboard) {
      if (keypad.innerText === capturedBuffer[i]) {
        keypad.classList.add("correct");
      }
    }
    let letterIndex = dayWordCopy.indexOf(capturedBuffer[i]);
    dayWordCopy.splice(letterIndex, 1);
    letterMatch++;
  }

  if (dayWordCopy.includes(capturedBuffer[i]) && capturedBuffer[i] !== dayWord[i]) {
    boxes[ANSWER_LENGTH * capturedRowToColor + i].classList.add("close");
    for (let keypad of onscreenKeyboard) {
      if (keypad.innerText === capturedBuffer[i]) {
        keypad.classList.add("close");
      }
    }
    let letterIndex = dayWordCopy.indexOf(capturedBuffer[i]);
    dayWordCopy.splice(letterIndex, 1);
  } else if (capturedBuffer[i] !== dayWord[i] && !dayWordCopy.includes(capturedBuffer[i])) {
    boxes[ANSWER_LENGTH * capturedRowToColor + i].classList.add("wrong");
    for (let keypad of onscreenKeyboard) {
      if (keypad.innerText === capturedBuffer[i]) {
        keypad.classList.add("wrong");
      }
    }
  }
}

async function checkIfWord() {
  setLoading(true);
  const res = await fetch(checkWordUrl, {
    method: "POST",
    body: JSON.stringify({ word: buffer }),
  });
  const resObj = await res.json();
  const isValid = resObj.validWord;
  setLoading(false);
  if (!isValid) {
    runRedAlert();
  } else {
    submit();
  }
}

function runRedAlert() {
  for (let i = 0; i < buffer.length; i++) {
    boxes[ANSWER_LENGTH * currentRow + i].classList.remove("invalid");

    setTimeout(() => {
      boxes[ANSWER_LENGTH * currentRow + i].classList.add("invalid");
    }, 10);
  }
}

function submit() {
  if (buffer.length === ANSWER_LENGTH) {
    colorCoder(() => {
      // console.log("Letter match after all animations: ", letterMatch);

      if (currentRow === 6 && letterMatch !== ANSWER_LENGTH) {
        // console.log("Letter match is: ", letterMatch);
        alert("You lose, the word was: " + dayWord);
        document.removeEventListener("keydown", inputHandler);
      } else if (letterMatch === ANSWER_LENGTH) {
        // console.log("Letter match is: ", letterMatch);
        alert("You win!");
        document.querySelector(".brand").classList.add("winner");
        document.removeEventListener("keydown", inputHandler);
      }
    });
    buffer = "";
  }
  currentRow++;
  // console.log("Letter match before evaluation is: ", letterMatch);
  // setTimeout(() => {
  //   if (currentRow === 6 && letterMatch !== 5) {
  //     console.log("Letter match is: ", letterMatch);
  //     alert("you lose, the word was: " + dayWord);
  //     document.removeEventListener("keydown", inputHandler);
  //   } else {
  //     if (letterMatch === 1 && currentRow <= 5) {
  //       console.log("Letter match is: ", letterMatch);
  //       alert("you win");
  //       document.querySelector(".brand").classList.add("winner");
  //       document.removeEventListener("keydown", inputHandler);
  //     }
  //   }
  // }, 1000);
}

function setLoading(isLoading) {
  spinner.classList.toggle("loadershow", isLoading);
}

async function init() {
  setLoading(true);
  dayWord = await getDayWord();
  setLoading(false);
  document.addEventListener("keydown", inputHandler);
  onscreenKeyboard.forEach((key) => {
    key.addEventListener("click", inputHandler);
  });
}

init();

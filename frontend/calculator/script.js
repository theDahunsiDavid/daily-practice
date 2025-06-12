let buffer = "0";

const btnContainer = document.querySelector(".button-container");
const screen = document.querySelector(".screen");

function symbolHandler(symbol) {
  if (symbol === "C") {
    buffer = "0";
  } else if (symbol === "←") {
    buffer = buffer.slice(0, -1);
  } else {
    console.log("math op");
  }

  if (buffer == "") {
    buffer = "0";
  }
}

btnContainer.addEventListener("click", (e) => {
  const target = e.target.innerText;

  if (buffer == "0" && !isNaN(target)) {
    if (target == "0") {
      buffer = "0";
    }
    buffer = target;
  } else if (buffer != "0" && !isNaN(target)) {
    buffer += target;
  } else {
    symbolHandler(target);
  }

  screen.innerText = buffer;
});

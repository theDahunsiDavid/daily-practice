let buffer = "0";
let lastOperation = null;
let lastOperator = null;

const btnContainer = document.querySelector(".button-container");
const screen = document.querySelector(".screen");

function mathHandler(symbol) {
  console.log("last operator:", lastOperator);
  if (lastOperator !== null) {
    console.log("Other operation: ", buffer);

    switch (lastOperator) {
      case "÷":
        lastOperation = lastOperation / buffer;
        console.log("Divided");
        break;
      case "×":
        lastOperation = lastOperation * buffer;
        console.log("Multiplied");
        break;
      case "-":
        lastOperation = lastOperation - buffer;
        console.log("Subtracted");
        break;
      case "+":
        lastOperation = lastOperation + buffer;
        console.log("Added");
        break;
      default:
        console.log("==== Wrong operator: '←' ====");
        console.log("==== Reset with 'C' or press a number  ====");
    }
    if (lastOperation !== null && symbol !== "←") {
      lastOperator = symbol;
      buffer = "0";
    }

    if (symbol === "=") {
      buffer = lastOperation.toString();
    }
  } else {
    lastOperation = buffer;
    lastOperator = symbol;
    buffer = "0";
    screen.innerText = buffer;
  }
}

function symbolHandler(symbol) {
  if (symbol === "C") {
    console.log("=== Resetting calculator ===");
    buffer = "0";
    lastOperation = null;
    lastOperator = null;
  } else if (symbol === "←" && lastOperation === null) {
    buffer = buffer.slice(0, -1);
  } else {
    mathHandler(symbol);
  }

  if (buffer == "") {
    buffer = "0";
  }

  console.log("last operation:", lastOperation);
}

btnContainer.addEventListener("click", (e) => {
  const target = e.target.innerText;

  if (buffer == "0" && !isNaN(target)) {
    if (target == "0") {
      buffer = "0";
    }
    buffer = target;
  } else if (buffer != "0" && !isNaN(target)) {
    lastOperation = null;
    lastOperator = null;
    buffer += target;
  } else {
    symbolHandler(target);
  }

  screen.innerText = buffer;
});

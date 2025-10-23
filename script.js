function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  // Early return for attempted divide by zero.
  if (num2 == 0) {
    return "Can't divide by zero";
  }

  return num1 / num2;
}

function operate(num1, num2, symbol) {
  // Mapping symbol to functions.
  let calculations = {
    "+": add,
    "-": subtract,
    x: multiply,
    "%": divide,
  };

  // Calling function mapped to symbol.
  return calculations[symbol](num1, num2);
}

function isDigit(str) {
  // Returns true if the string is a digit.
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function updateDisplay(num1, num2, symbol) {
  // Updates the display based on the numbers and symbol.
  const display = document.querySelector(".display");

  let displayText = "";

  if (num1) {
    displayText += num1;
  }

  if (symbol) {
    displayText += symbol;
  }
  
  if (num2 && symbol) {
    displayText += num2;
  }
  console.log(displayText);
}

// Initial values
firstNumber = "";
secondNumber = "";
symbol = null;

// Select all buttons
const buttons = document.querySelectorAll("button");

// Listen for a click of each button
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let buttonContent = event.target.textContent;

    if (isDigit(buttonContent)) {
      // Check if the first number has already been set.
      if (symbol === null) {
        firstNumber += buttonContent
      } else {
        secondNumber += buttonContent
      }

    } else if (["+", "-", "x", "%"].includes(buttonContent)) {
      symbol = buttonContent;
    }

    updateDisplay(firstNumber, secondNumber, symbol);
  });
});

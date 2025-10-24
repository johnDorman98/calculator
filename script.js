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
  // TODO:
  // Validate num1 and num2 inputs
  // Restructure map to switch case.

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

function updateDisplay(number) {
  // INIT displayElement = GET display from DOM
  // SET displayElement = number
}

// TODO create clear function.

// Initial values
let firstNumber = "";
let secondNumber = "";
let symbol = null;
let totalCalculated = false;

// Select all buttons
const buttons = document.querySelectorAll("button");

// Listen for a click of each button
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Use button content to identify button pressed.
    let buttonContent = event.target.textContent;

    // IF buttonContent = integer or float
      // IF totalCalculated = true AND symbol = null
        // CALL clear to start new calculation
      // ENDIF
      // IF symbol = null
       // SET firstNumber += buttonContent
      // ELSE
       // SET secondNumber += buttonContent
      // ENDIF
      // CALL updateDisplay passing buttonContent
    // ENDIF

    // IF buttonContent = "=" OR (buttonContent in ["+", "-", "/", "*"] AND symbol != null)
      // INIT result
      // SET result = value returned from CALL operate PASSING firstNumber, secondNumber, and symbol.
      // CALL updateDisplay passing buttonContent
      // SET firstNumber = result
      // SET totalCalculated = true
      // IF buttonContent in ["+", "-", "/", "*"]
        // SET symbol = buttonContent
      // ENDIF
    // ENDIF
  });
});

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

  // Convert num1 and num2 to Number.
  num1 = Number(num1);
  num2 = Number(num2);

  // Return calculated result based on symbol.
  switch (symbol) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

function isDigit(str) {
  // Returns true if the string is a digit.
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function updateDisplay(number) {
  // TODO
  // Limit display length to 15 digits
  // Round output to two decimal places
  // INIT displayElement = GET display from DOM
  // SET displayElement = number

  const displayElement = document.querySelector(".display");
  displayElement.textContent = number;
}

function symbolEntered(buttonContent) {
  return ["+", "-", "/", "*"].includes(buttonContent);
}

function bothNumbersProvided() {
  return firstNumber !== "" && secondNumber !== "";
}

// TODO: create clear function.
function clear() {
  firstNumber = "";
  secondNumber = "";
  symbol = null;
  totalCalculated = false;
}

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
    // IF symbol = null AND totalCalculated = false
    // SET firstNumber += buttonContent
    // ELSE
    // SET secondNumber += buttonContent
    // ENDIF
    // CALL updateDisplay passing buttonContent
    // ENDIF

    // IF buttonContent in ["+", "-", "/", "*"] AND symbol = null
    // SET symbol = button content
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

    // Add to firstNumber or secondNumber when an integer or float is entered.
    if (isDigit(buttonContent)) {
      if (totalCalculated && symbol === null) {
        // CALL clear() to reset calculation.
        clear();
        updateDisplay("");
      }

      // Continue to add to firstNumber until symbol is entered.
      if (symbol === null && totalCalculated === false) {
        firstNumber += buttonContent;
        // Update display
        updateDisplay(firstNumber);
      } else {
        secondNumber += buttonContent;
        // Update display
        updateDisplay(secondNumber);
      }
    }

    // Set the symbol when a valid operator is entered.
    if (symbolEntered(buttonContent) && symbol === null) {
      symbol = buttonContent;
      // TODO: highlight selected symbol in the DOM.
    }

    // Perform calculation if "=" is pressed or symbol is pressed for completed equation.
    if (
      (bothNumbersProvided() && buttonContent === "=") ||
      (bothNumbersProvided() && symbolEntered(buttonContent) && symbol !== null)
    ) {
      // Calculate result
      let result = operate(firstNumber, secondNumber, symbol);
      // Use the result as the firstNumber in follow equation.
      firstNumber = result;

      // Update display with new firstNumber.
      updateDisplay(firstNumber);

      totalCalculated = true;

      // Set symbol for next equation.
      if (symbolEntered(buttonContent)) {
        symbol = buttonContent;
      } else {
        symbol = null;
      }

      // Reset second number for next equation.
      secondNumber = "";
    }

    if (buttonContent === "CLEAR") {
      clear();
      updateDisplay("");
    }
  });
});

// TODO:
// Prevent divide by 0 errors.
// Enable "." to allow users to enter a decimal number
// Add "backspace" button to undo last input if wrong number entered.
// Add keyboard support.

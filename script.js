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
    case "%":
      return divide(num1, num2);
  }
}

function isDigit(str) {
  // Returns true if the string is a digit.
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function updateDisplay(number) {
  // Ensure that numbers ending in a decimal are updated in the display.
  if (String(number).charAt(number.length -1) !== "." && number !== "") {
    // Round number to two decimal places.
    number = parseFloat(Number(number).toFixed(2))
  }

  // Ensure number is limited to 12 digits.
  if (number > 12) {
    number = String(number).substring(0, 12);
  }

  // Update display with rounded number.
  const displayElement = document.querySelector(".display");
  displayElement.textContent = number;
}

function symbolEntered(buttonContent) {
  // Returns true if a valid symbol is provided.
  return ["+", "-", "%", "*"].includes(buttonContent);
}

function bothNumbersProvided() {
  // Helper function to ensure that both numbers have been provided.
  return firstNumber !== "" && secondNumber !== "";
}

function clear() {
  // Reset state variables.
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

    // Add to firstNumber or secondNumber when an integer or float is entered.
    if (isDigit(buttonContent)) {
      if (totalCalculated && symbol === null) {
        // CALL clear() to reset calculation.
        clear();
        updateDisplay("");
      }

      // Continue to add to firstNumber until symbol is entered.
      if (symbol === null && totalCalculated === false && firstNumber.length <= 12) {
        firstNumber += buttonContent;
        // Update display
        updateDisplay(firstNumber);
      } else if (symbol !== null && secondNumber.length <= 12) {
        // Prevent divisions by zero.
        if (symbol === "%" && buttonContent === "0") {
          alert("Cannot divide by zero, please enter another number.")
        } else { 
          secondNumber += buttonContent;
          // Update display
          updateDisplay(secondNumber);
        }
      }
    }

    // Allow decimal numbers to be entered.
    if (buttonContent === ".") {
      if (symbol === null && !firstNumber.includes(".") && firstNumber.length > 0 && !totalCalculated) {        
        firstNumber += "."
        updateDisplay(firstNumber)
      } else if (!secondNumber.includes(".") && secondNumber.length > 0) {
        secondNumber += "."
        updateDisplay(secondNumber)
      }
    }

    // Set the symbol when a valid operator is entered.
    if (symbolEntered(buttonContent) && symbol === null) {
      symbol = buttonContent;
    }

    // Perform calculation if "=" is pressed or symbol is pressed for completed equation.
    if (
      (bothNumbersProvided() && buttonContent === "=") ||
      (bothNumbersProvided() && symbolEntered(buttonContent) && symbol !== null)
    ) {
      // Calculate result
      let result = operate(firstNumber, secondNumber, symbol);
      
      // Use the result as the firstNumber in follow equation.
      firstNumber = String(result);

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
      updateDisplay(firstNumber);
    }

    if (buttonContent === "UNDO") {
      if (firstNumber && symbol === null && !totalCalculated) {
        firstNumber = firstNumber.slice(0, firstNumber.length-1)
        updateDisplay(firstNumber) 
      } else if (secondNumber && symbol !== null) {
        secondNumber = secondNumber.slice(0, secondNumber.length-1)
        updateDisplay(secondNumber)
      }
    }
  });
});

// TODO:
// Add keyboard support.
// Add history button to allow user to return to previous equations.
// Implement rounding of first and second number during input.
// Keep selected symbol highlighted until result is calculated.
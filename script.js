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
  if (num2 == 0) {
    return "Can't divide by zero";
  }

  return num1 / num2;
}

function operate(num1, num2, operator) {
  // Mapping operator to functions.
  let calculations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
  };

  // Calling function mapped to operator.
  return calculations[operator](num1, num2);
}

firstOperator = null;
secondOperator = null;
operator = null;

console.log(operate(1, 2, "+"));

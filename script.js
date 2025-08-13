const numericBtn = document.querySelectorAll(".num");
const screen = document.querySelector(".screen");
const operationBtn = document.querySelectorAll(".operation");
const resultBtn = document.querySelector(".result");
const clearAll = document.querySelector(".AC");
const clearOne = document.querySelector(".clear");
const sqrt = document.querySelector(".sqrt");
const sqr = document.querySelector(".sqr");
function calculateSum(num1, num2) {
  return num1 + num2;
}
function calculateDifference(num1, num2) {
  return num1 - num2;
}
function calculateProduct(num1, num2) {
  return num1 * num2;
}
function calculateQuotient(num1, num2) {
  return num2 === 0 ? "Error: Division by zero" : num1 / num2;
}
function calculateSquare(num) {
  return num ** 2;
}
function calculateSquareRoot(num) {
  return Math.sqrt(num);
}

function calculatePercentage(num) {
  return num / 100;
}
let num;
let operand1 = "";
let operand2 = "";
let operation;

console.log(`Operation 1: ${operand1}`);
console.log(`Operation 2: ${operand2}`);
console.log(`Operation:  ${operation}`);

function operate(operand1, operand2, operation) {
  if (operation == "+") {
    return calculateSum(operand1, operand2);
  } else if (operation == "-") {
    return calculateDifference(operand1, operand2);
  } else if (operation == "*") {
    return calculateProduct(operand1, operand2);
  } else if (operation == "/") {
    return calculateQuotient(operand1, operand2);
  } else if (operation == "^2") {
    return calculateSquare(operand1);
  } else if (operation == "sqrt") {
    return calculateSquareRoot(operand1);
  } else if (operation == "%") {
    return calculatePercentage(operand1);
  } else if (operation == undefined) {
    return operand1;
  } else {
    return "Math Error!";
  }
}

function resultFunc() {
  let text = operate(Number(operand1), Number(operand2), operation);
  if (isNaN(text)) {
    screen.innerText = `Math Error`;
    return;
  }
  screen.innerText = text;
  operand1 = screen.innerText;
  operand2 = "";
}

numericBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (operation !== undefined) {
      operand2 += btn.value;
      screen.innerText += btn.value;
      console.log(`Operation 1: ${operand1}`);
      console.log(`Operation 2: ${operand2}`);
    } else {
      operand1 += btn.value;
      screen.innerText = operand1;
      console.log(`Operation 1: ${operand1}`);
      console.log(`Operation 2: ${operand2}`);
    }
  });
});

operationBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const some = btn.value;
    if (operand2 !== "") {
      resultFunc();
      operation = some;
      screen.innerText += operation;
      return;
    }
    const trailingOpRegex = /(\^2|sqrt|[+\-*/%])$/;
    if (screen.innerText !== "" && trailingOpRegex.test(screen.innerText)) {
      screen.innerText = screen.innerText.replace(trailingOpRegex, some);
      operation = some;
      return;
    }
    operation = some;
    if (operand1 !== "") {
      screen.innerText += operation;
    } else {
      operand1 = "0"; // treat operator-first as 0 <op>
      screen.innerText = "0" + operation;
    }
  });
});

resultBtn.addEventListener("click", resultFunc);

clearAll.addEventListener("click", () => {
  screen.innerText = "";
  operand1 = "";
  operand2 = "";
  operation = undefined;
});

clearOne.addEventListener("click", () => {
  screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1);
  if (operation == undefined)
    operand1 = operand1 = operand1.slice(0, operand1.length - 1);
  else operand2 = operand2 = operand2.slice(0, operand2.length - 1);
  console.log(`Operation 1 clear: ${operand1}`);
  console.log(`Operation 2 clear: ${operand2}`);
});

sqrt.addEventListener("click", () => {
  if (operand1 !== "") {
    screen.innerText = operate(Number(operand1), 0, "sqrt");
    operand1 = screen.innerText;
  }
});

sqr.addEventListener("click", () => {
  if (operand1 !== "") {
    screen.innerText = operate(Number(operand1), 0, "^2");
    operand1 = screen.innerText;
  }
});

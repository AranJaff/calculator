// objects [in java mood]
let container = '';
let operatorType = '';
let message = false;

let line3 = document.getElementById("line3");
let line2 = document.getElementById("line2");
let line1 = document.getElementById("line1");

const mirrorBoard = document.querySelector(".mirrorBoard");
const clear = document.querySelector(".clear");
const operands = document.querySelectorAll('.operands');
const backspace = document.querySelector('.backspace');
const operators = document.querySelectorAll(".operators");
const execOperator = document.getElementById("execOperator");

// functions
function operate(firstNumber, secondNumber, operator) {
    
    switch(operator) {
        case "+":
            result = firstNumber + secondNumber;
            return result.toString();
            break;
        case "-":
            result = firstNumber - secondNumber;
            return result.toString();
            break;
        case "*":
            result = firstNumber * secondNumber;
            return result.toString();
            break;
        case "/":
            if (secondNumber === 0) {
                return "Warning: don't divide by zero"
            } else {
                result = firstNumber / secondNumber;
                return result.toFixed(2);
            }
            break;
        case "^":
            result = Math.pow(firstNumber, secondNumber);
            return result.toString();
            break;
        case "%":
            if (secondNumber) {
                result = (firstNumber/100) * secondNumber;
            } else {
                result = (firstNumber/100);
            }
            return result.toFixed(2);
            break;
    }
}

function operandFunc(e) {
    if (!message) {
        container += e.target.value;
        addToMirrorBoard(container);
    } else if (message) {
        container = "";
        container += e.target.value;
        addToMirrorBoard(container);
        message = false;
    }
}

function operatorFunc(e) {
    console.log(e.currentTarget.value);
    container += e.currentTarget.value;
    addToMirrorBoard(container);
    message = false;
}

function execFunc() {
    const array = container.split(/[-+*/%^]/g);
    const operatorArray = container.replace(/[.\d]/g, ""); //replace(/\d+/g, "")

    for (let index = 0; index < operatorArray.length; index++) {
        let value = operate(Number(array[index]), Number(array[index+1]), operatorArray[index]);
        array[index+1] = value;
    }

    const result = array[array.length-1];
    text = container + " = " + result;
    addToHistory(text);
    container = result;
    console.log(result);
    addToMirrorBoard(result);
    message = true;
}

function backspaceFunc() {
    container = container.substring(0, container.length - 1);
    addToMirrorBoard(container);
}

function addToHistory(text) {
    line3.textContent = line2.textContent;
    line2.textContent = line1.textContent;
    line1.textContent = text;
}

function addToMirrorBoard(text) {
    mirrorBoard.textContent = text;
}

function clearMirrorBoard() {
    mirrorBoard.textContent = "";
}

function clearFunc() {
    clearMirrorBoard();
    container = "";
}

function fromKeyboard(e) {
    const input = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if ((e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 110) {
        if (!message) {
            container += input.value;
            addToMirrorBoard(container);
        } else if (message) {
            container = "";
            container += input.value;
            addToMirrorBoard(container);
            message = false;
        }
    }
    else if (e.keyCode==106 || e.keyCode==107 || e.keyCode==109 || e.keyCode==111) {
        container += input.value;
        addToMirrorBoard(container);
        message = false;
    }
    else if (e.keyCode==8) {
        backspaceFunc();
    }
    else if (e.keyCode==13) {
        execFunc();
    }
    else if (e.keyCode==27) {
        clearFunc();
    }
}

// event listeners
clear.addEventListener("click", clearFunc);
window.addEventListener('keydown', fromKeyboard);
backspace.addEventListener("click", backspaceFunc);
operators.forEach(operator => operator.addEventListener("click", operatorFunc));
operands.forEach(operand => operand.addEventListener("click", operandFunc));
execOperator.addEventListener("click", execFunc);
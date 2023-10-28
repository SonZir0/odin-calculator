const calculator = {
    calculate: {
        "+": (a, b) => +a + +b,
        "-": (a, b) => +a - +b,
        "*": (a, b) => +a * +b,
        "/": (a, b) => +a / +b,
    },
    // first/second operand and some operation
    expression: ["0", "", ""],

    eval() {
        showPastExpression();
        currNumberDisplay.textContent =
            this.calculate[this.expression[2]](this.expression[0], this.expression[1]);
        this.expression = [`${currNumberDisplay.textContent}`, "", ""];
    },
}

function showPastExpression() {
    let resultString = get1OperandAndOperation();
    // add second operand
    calculator.expression[1][0] != "-" ?
        resultString += calculator.expression[1] :
        resultString += `(${calculator.expression[1]})`;
    // show whole expression
    prevExprDisplay.textContent = resultString;
}

function get1OperandAndOperation() {
    let resultString = "";
    calculator.expression[0][0] != "-" ?
        resultString += calculator.expression[0] :
        resultString += `(${calculator.expression[0]})`;

    resultString += calculator.expression[2];
    return resultString;
}

function addNewNumber(indexOfOperand, newSymbol) {
    // if there's a leading zero - override
    if (calculator.expression[indexOfOperand][0] === "0" &&
        calculator.expression[indexOfOperand].length === 1 && newSymbol != '.')
        calculator.expression[indexOfOperand] = newSymbol;
    else calculator.expression[indexOfOperand] += newSymbol;
    currNumberDisplay.textContent = calculator.expression[indexOfOperand];
}

function clearLastSymbols(indexOfOperand) {
    if (calculator.expression[indexOfOperand].slice(-1) === ".")
        decimalBtn.disabled = false;
    calculator.expression[indexOfOperand] = calculator.expression[indexOfOperand].slice(0, -1);

    if (calculator.expression[indexOfOperand] === "-")
        calculator.expression[indexOfOperand] = ""; // throw away sign if it's there
    
    else currNumberDisplay.textContent = calculator.expression[indexOfOperand];
}

let currNumberDisplay = document.querySelector(".currNumber");
let prevExprDisplay = document.querySelector(".prevExpression");
const inputButtons = document.querySelectorAll(".forInput");
const operationBtns = document.querySelectorAll(".operation");
const displayBtns = document.querySelectorAll(".forDisplay");
let decimalBtn = document.querySelector(".decimal");
let evalBtn = document.querySelector(".eval");
let clearBtn = document.querySelector(".clearAll");
let clearEntryBtn = document.querySelector(".clearEntry");
let negativeBtn = document.querySelector(".negative");

for (let btn of Array.from(inputButtons)) {
    btn.addEventListener('click', () => {
        /*  if user choose some operation, then we're dealing
            with second operand  */
        if (!calculator.expression[2])
            addNewNumber(0, btn.textContent);
        else {
            addNewNumber(1, btn.textContent);
            prevExprDisplay.textContent = get1OperandAndOperation();
        }
    });
}

for (let btn of Array.from(operationBtns)) {
    btn.addEventListener('click', () => {
        /*  if there's 2 operand, then operator's choosen too
            evaluate and line up new operator   */
        if (calculator.expression[1])
            calculator.eval();
        calculator.expression[2] = btn.textContent;
        currNumberDisplay.textContent += ` ${btn.textContent}`;
    });
}

evalBtn.addEventListener('click', () => {
    if (calculator.expression[2] === "")
        prevExprDisplay.textContent = calculator.expression[0];
    // if there's some operator choosen but no second operand - do nothing
    else if (calculator.expression[1] === "")
        return 0;
    else calculator.eval();
});

clearBtn.addEventListener('click', () => {
    calculator.expression = ["0", "", ""];
    currNumberDisplay.textContent = "0";
    prevExprDisplay.textContent = "";
    decimalBtn.disabled = false;
});

clearEntryBtn.addEventListener('click', () => {
    if (calculator.expression[1] !== "") {
        clearLastSymbols(1);
        if (calculator.expression[1] === "") {
            prevExprDisplay.textContent = "";
            currNumberDisplay.textContent = calculator.expression[0] + ' ' + calculator.expression[2]
        }
    }
    // if there's a sign choosen - clear top display and refresh main
    // display to show first operand
    else if (calculator.expression[2] !== "") {
        calculator.expression[2] = "";
        currNumberDisplay.textContent = calculator.expression[0];
    } else {
        clearLastSymbols(0);
        if (calculator.expression[0] === "")    // display decoy zero instead of void
            currNumberDisplay.textContent = "0"
    }
});

negativeBtn.addEventListener('click', () => {
    // if there's second operand flip - the sign on it
    if (calculator.expression[1] !== "") {
        calculator.expression[1] = (-1 * calculator.expression[1]).toString();
        currNumberDisplay.textContent = calculator.expression[1];
    } // else flip the sign on first one and clear operator (if choosen)
    else {
        calculator.expression[0] = (-1 * calculator.expression[0]).toString();
        currNumberDisplay.textContent = calculator.expression[0];
        calculator.expression[2] = "";
    }
});

decimalBtn.addEventListener('click', () => {
    decimalBtn.disabled = true;
});
const calculator = {
    calculate: {
        "+": (a, b) => +a + +b,
        "-": (a, b) => +a - +b,
        "*": (a, b) => +a * +b,
        "/": (a, b) => +a / +b,
    },
    // first/second operand and some operation
    expression: ["0", "0", ""],
};

function addNewNumber(indexOfOperand, newSymbol) {
    // if there's a leading zero - override
    if (calculator.expression[indexOfOperand][0] === "0")
        calculator.expression[indexOfOperand] = newSymbol;
    else calculator.expression[indexOfOperand] += newSymbol;
    currNumberDisplay.textContent = calculator.expression[indexOfOperand];
}


const buttons = document.querySelectorAll(".forInput");
let btn = document.querySelector(".decimal");
let currNumberDisplay = document.querySelector(".currNumber");
let prevExprDisplay = document.querySelector(".prevExpression");

for (let btn of Array.from(buttons)) {
    btn.addEventListener('click', () => {
        /*  if user choose some operation, then we're dealing
            with second operand  */
        if (!calculator.expression[2])
            addNewNumber(0, btn.textContent);
        else addNewNumber(1, btn.textContent);
    });
}

btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.style.backgroundColor = "lightskyblue";
    btn.style.borderColor = "dimgrey";
});

/* currNumberDisplay.addEventListener(''() => {

}); */
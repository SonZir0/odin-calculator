const calculator = {
    calculate: {
        "+": (a, b) => +a + +b,
        "-": (a, b) => +a - +b,
        "*": (a, b) => +a * +b,
        "/": (a, b) => +a / +b,
    },
};

let firstOperand = "0";
let secondOperand = "0";
let operation = "";

const buttons = document.querySelectorAll(".forInput");
let btn = document.querySelector(".decimal");

for (let btn of Array.from(buttons)) {
    btn.addEventListener('click', () => {
        if (operation === "")
            firstOperand += btn.textContent;
        else secondOperand += btn.textContent;
    });
}

btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.style.backgroundColor = "lightskyblue";
    btn.style.borderColor = "dimgrey";
});
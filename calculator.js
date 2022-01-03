let num1 = '';
let num2 = '';
let operator = null;
let to_clear = false;

window.addEventListener('DOMContentLoaded', function() {
    const numbuttons = document.querySelectorAll(".num");
    const opbuttons = document.querySelectorAll(".op");
    const equal = document.getElementById("eq");
    const backspace = document.getElementById("backspace");
    const ac = document.getElementById("clear");

    const last = document.getElementById("last");
    const current = document.getElementById("current");

    equal.addEventListener('click', evaluate);
    ac.addEventListener('click', clearall);
    backspace.addEventListener('click', del);

    numbuttons.forEach((num) => num.addEventListener('click', () => shownum(num)));

    opbuttons.forEach((op) => op.addEventListener('click', () => setoperator(op)));

    document.addEventListener('keydown', (event) => {

        if (['/', 'x', '+', '-', '*', '%'].includes(event.key)) {
            document.querySelectorAll(".op").click();
        }
        if (event.key === 'Backspace' || event.key === 'c' || event.key === 'C') {
            document.getElementById('clear').click();
        }
        if (event.key === '=' || event.key === 'Enter') {
            document.getElementById('eq').click();
        }

    });
});

//four operation 
function operate(operator, a, b) {
    if (operator === "+") {
        return Number(a) + Number(b);
    } else if (operator === "-") {
        return a - b;
    } else if (operator === "*") {
        return a * b;
    } else if (operator === "/") {
        return a / b;
    } else {
        return null;
    }
}

//reset page 
function reset() {
    current.textContent = "";
    to_clear = false;
}

//if keying in numbers
function shownum(num) {
    if (current.textContent === "0" || to_clear === true) {
        reset();
    }
    current.textContent += num.textContent;


}

//key in an operator
function setoperator(op) {
    if (op !== null) {
        evaluate();
        num1 = current.textContent;
        operator = op.textContent;
        last.textContent = `${num1} ${operator}`;
        to_clear = true;

    }

}

//press equal
function evaluate() {
    if (operator === null || to_clear === true) {
        return true;
    } else if (operator === '÷' && current.textContent === '0') {
        alert("Error! No division by 0");
        return true;
    }
    num2 = current.textContent;
    current.textContent = round(operate(operator, num1, num2));
    last.textContent = `${num1} ${operator} ${num2} =`;
    operator = null;

}

//remove last digit
function del() {

    current.textContent = current.textContent.toString().slice(0, -1);
}

//clear calculator
function clearall() {
    current.textContent = '0';
    last.textContent = '';
    num1 = '';
    num2 = '';
    operator = null;

}

//float



function round(number) {
    return Math.round(number * 1000) / 1000
}
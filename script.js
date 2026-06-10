const display = document.getElementById("display");
function append(value) {
    display.value += value;
}
function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function percent() {

    try {
        display.value = parseFloat(display.value) / 100;
    } catch {
        display.value = "Error";
    }

}

function calculate() {

    try {

        let expression = display.value;

        expression = expression.replace(/×/g, "*");
        expression = expression.replace(/÷/g, "/");

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (
            result === Infinity ||
            result === -Infinity ||
            isNaN(result)
        ) {
            display.value = "Error";
            return;
        }

        display.value = result;

    } catch {
        display.value = "Error";
    }

}

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if ("0123456789".includes(key)) {
        append(key);
    }

    if ("+-*/.".includes(key)) {
        append(key);
    }


    if (key === "Enter") {
        e.preventDefault();
        calculate();
    }

    if (key === "Backspace") {
        deleteLast();
    }

    if (key === "Escape") {
        clearDisplay();
    }

    if (key === "%") {
        percent();
    }

});
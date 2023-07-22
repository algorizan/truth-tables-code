/* eslint-disable no-use-before-define, no-bitwise */

const VAR_REGEX_STR = "([A-Za-z]|\\d|_)+";
const EXPR_REGEX = /^(\w|\s|\d|&&|\|\||!|\?|:|\(|\))+$/;

const VARIABLES = [];
const EXPRESSIONS = [];

function initPage() {
    const localVariables = localStorage.getItem("variables");
    const localExpressions = localStorage.getItem("expressions");
    if (Array.isArray(localVariables)) {
        VARIABLES.concat(localVariables);
        // document.getElementById("variableInput").textContent = VARIABLES.join("\n");
    }
    if (Array.isArray(localExpressions)) {
        EXPRESSIONS.concat(localExpressions);
        // document.getElementById("expressionInput").textContent = EXPRESSIONS.join("\n");
    }

    generateVariablesList();
    generateExpressionsList();
}

// if (localStorage.getItem("value1")) {
//     value1Input.value = localStorage.getItem("value1");
// }

// if (localStorage.getItem("value2")) {
//     value2Input.value = localStorage.getItem("value2");
// }
// // Save the values to localStorage
// localStorage.setItem("value1", value1);
// localStorage.setItem("value2", value2);

// // Clear the values from localStorage
// localStorage.removeItem("value1");
// localStorage.removeItem("value2");

function addVariable() {
    const variableInput = document.getElementById("variableInput");
    const variable = variableInput.value.trim();

    if (!isValidVariable(variable)) {
        alert("Please enter a valid unique variable name. Only letters (A-Z, a-z), numbers (0-9), and underscores (_) are allowed.");
        return;
    }

    VARIABLES.push(variable);
    localStorage.setItem("variables", VARIABLES);
    variableInput.value = "";

    generateVariablesList();
    // generateTruthTable();
}

function addExpression() {
    const expressionInput = document.getElementById("expressionInput");
    const expression = expressionInput.value.trim();

    if (!isValidExpression(expression)) {
        alert("Please enter a valid unique logical expression.");
        return;
    }

    EXPRESSIONS.push(expression);
    localStorage.setItem("expressions", EXPRESSIONS);
    expressionInput.value = "";

    generateExpressionsList();
    // generateTruthTable();
}

function evaluateExpression(expression, variables, row) {
    const variableValues = {};
    for (let i = 0; i < variables.length; i++) {
        variableValues[variables[i]] = (row & (1 << (variables.length - i - 1))) > 0;
    }

    const replacedExpression = expression.replace(new RegExp(VAR_REGEX_STR, "g"), (variable) => variableValues[variable]);
    try {
        // eslint-disable-next-line no-eval
        return eval(replacedExpression);
    }
    catch (error) {
        console.error("Error evaluating expression:", error);
        return false;
    }
}

function generateTruthTable() {
    const truthTable = document.getElementById("truthTable");

    if (!VARIABLES.length || !EXPRESSIONS.length) {
        alert("Please enter at least one variable and expression.");
        return;
    }

    // Clear the existing truth table if any
    while (truthTable.firstChild) {
        truthTable.removeChild(truthTable.firstChild);
    }

    // Create the header row
    const headerRow = document.createElement("tr");
    for (const variable of VARIABLES) {
        const th = document.createElement("th");
        th.textContent = variable;
        headerRow.appendChild(th);
    }

    // Create header cells for expressions
    for (const expression of EXPRESSIONS) {
        const th = document.createElement("th");
        th.textContent = expression;
        headerRow.appendChild(th);
    }

    truthTable.appendChild(headerRow);

    // Generate the truth table rows
    const numRows = 2 ** VARIABLES.length;
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < VARIABLES.length; j++) {
            const td = document.createElement("td");
            const value = (i & (1 << (VARIABLES.length - j - 1))) ? "1" : "0";
            td.textContent = value;
            row.appendChild(td);
        }

        // Evaluate all expressions and add corresponding columns
        for (const expression of EXPRESSIONS) {
            const result = evaluateExpression(expression, VARIABLES, i);
            const resultTd = document.createElement("td");
            resultTd.textContent = result ? "1" : "0";
            row.appendChild(resultTd);
        }

        truthTable.appendChild(row);
    }
}

function generateVariablesList() {
    const variablesArea = document.getElementById("variablesArea");

    while (variablesArea.firstChild) {
        variablesArea.removeChild(variablesArea.firstChild);
    }

    if (!VARIABLES.length) {
        const li = document.createElement("li");
        li.textContent = "Added variables will be displayed here.";
        variablesArea.appendChild(li);
    }
    else {
        VARIABLES.forEach((variable) => {
            const li = document.createElement("li");
            li.textContent = variable;
            variablesArea.appendChild(li);
        });
    }
}

function generateExpressionsList() {
    const expressionsArea = document.getElementById("expressionsArea");

    while (expressionsArea.firstChild) {
        expressionsArea.removeChild(expressionsArea.firstChild);
    }

    if (!EXPRESSIONS.length) {
        const li = document.createElement("li");
        li.textContent = "Added expressions will be displayed here.";
        expressionsArea.appendChild(li);
    }
    else {
        EXPRESSIONS.forEach((expression) => {
            const li = document.createElement("li");
            li.textContent = expression;
            expressionsArea.appendChild(li);
        });
    }
}

function isValidVariable(variable) {
    return typeof (variable) === "string"
        && (new RegExp(`^${VAR_REGEX_STR}$`)).test(variable)
        && !VARIABLES.includes(variable);
}

function isValidExpression(expression) {
    return typeof (expression) === "string"
        && EXPR_REGEX.test(expression)
        && !EXPRESSIONS.includes(expression);
}

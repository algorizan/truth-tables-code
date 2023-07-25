const VAR_REGEX_STR = "([A-Za-z]|\\d|_)+";
const EXPR_REGEX = /^(\w|\s|\d|&&|\|\||!|\?|:|\(|\))+$/;

const LOCAL_VARIABLES_NAME = "truthTableVariables";
const LOCAL_EXPRESSIONS_NAME = "truthTableExpressions";
const LOCAL_TOGGLETF_NAME = "toggleTF";

const VARIABLES = [];
const EXPRESSIONS = [];

let toggleTF = false;

function initPage() {
    const localVariablesStr = localStorage.getItem(LOCAL_VARIABLES_NAME);
    const localExpressionsStr = localStorage.getItem(LOCAL_EXPRESSIONS_NAME);
    const localToggleTF = localStorage.getItem(LOCAL_TOGGLETF_NAME);
    let localVariables, localExpressions;

    try {
        localVariables = JSON.parse(localVariablesStr);
    }
    catch (error) {
        console.error(`No existing Variables array found in localStorage.`, error);
    }
    try {
        localExpressions = JSON.parse(localExpressionsStr);
    }
    catch (error) {
        console.error(`No existing Expressions array found in localStorage.`, error);
    }

    if (Array.isArray(localVariables)) {
        VARIABLES.push(...localVariables);
    }
    if (Array.isArray(localExpressions)) {
        EXPRESSIONS.push(...localExpressions);
    }

    if (localToggleTF === "true") {
        toggleTFSwitch();
    }

    generateVariablesList();
    generateExpressionsList();
}

function addVariable() {
    const variableInput = document.getElementById("variableInput");
    const variable = variableInput.value.trim();

    if (!isValidVariable(variable)) {
        alert("Please enter a valid unique variable name. Only letters (A-Z, a-z), numbers (0-9), and underscores (_) are allowed.");
        return;
    }

    VARIABLES.push({value: variable, visible: true});
    saveVariables();
    variableInput.value = "";

    generateVariablesList();
}

function addExpression() {
    const expressionInput = document.getElementById("expressionInput");
    const expression = expressionInput.value.trim();

    if (!isValidExpression(expression)) {
        alert("Please enter a valid unique logical expression.");
        return;
    }

    EXPRESSIONS.push({ value: expression, visible: true });
    saveExpressions();
    expressionInput.value = "";

    generateExpressionsList();
}

function removeVariable(variable) {
    const indexToRemove = VARIABLES.findIndex((vari) => vari.value === (variable.value ? variable.value : variable));
    if (indexToRemove !== -1) {
        VARIABLES.splice(indexToRemove, 1);
    }
    generateVariablesList();
    saveVariables();
}

function removeExpression(expression) {
    const indexToRemove = EXPRESSIONS.findIndex((expr) => expr.value === (expression.value ? expression.value : expression));
    if (indexToRemove !== -1) {
        EXPRESSIONS.splice(indexToRemove, 1);
    }
    generateExpressionsList();
    saveExpressions();
}

function toggleVisibility(item, element) {
    item.visible = !item.visible;
    toggleVisibilityElement(element);
}

function toggleVisibilityElement(element) {
    element.classList.toggle("disabled-background");
    const toggleButton = element.querySelector(".visibility-toggle");
    toggleButton.classList.toggle("fa-eye-slash");
}

function evaluateExpression(expression, variables, row) {
    const variableValues = {};
    for (let i = 0; i < variables.length; i++) {
        variableValues[variables[i].value] = (row & (1 << (variables.length - i - 1))) > 0;
    }

    const replacedExpression = expression.replace(new RegExp(VAR_REGEX_STR, "g"), (variable) => variableValues[variable]);
    try {
        return eval(replacedExpression);
    }
    catch (error) {
        console.error("Error evaluating expression:", error);
        return false;
    }
}

function generateTruthTable() {
    const truthTable = document.getElementById("truthTable");
    const ENABLED_VARIABLES   =   VARIABLES.filter((vari) => vari.visible);
    const ENABLED_EXPRESSIONS = EXPRESSIONS.filter((expr) => expr.visible);
    const VALUE_TRUE  = toggleTF ? "T" : "1";
    const VALUE_FALSE = toggleTF ? "F" : "0";

    if (!ENABLED_VARIABLES.length || !ENABLED_EXPRESSIONS.length) {
        alert("Please have at least one enabled variable and expression.");
        return;
    }

    // Clear the existing truth table if any
    while (truthTable.firstChild) {
        truthTable.removeChild(truthTable.firstChild);
    }

    // Create the header row
    const headerRow = document.createElement("tr");
    for (const variable of ENABLED_VARIABLES) {
        const th = document.createElement("th");
        th.textContent = variable.value;
        headerRow.appendChild(th);
    }

    headerRow.lastElementChild.style.borderRightWidth = "3px";

    // Create header cells for expressions
    for (const expression of ENABLED_EXPRESSIONS) {
        const th = document.createElement("th");
        th.textContent = expression.value;
        headerRow.appendChild(th);
    }

    truthTable.appendChild(headerRow);

    // Generate the truth table rows
    const numRows = 2 ** ENABLED_VARIABLES.length;
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < ENABLED_VARIABLES.length; j++) {
            const td = document.createElement("td");
            const value = (i & (1 << (ENABLED_VARIABLES.length - j - 1))) ? VALUE_TRUE : VALUE_FALSE;
            if (value === VALUE_FALSE) {
                td.classList.toggle("false-cell");
            }
            td.textContent = value;
            row.appendChild(td);
        }

        row.lastElementChild.style.borderRightWidth = "3px";

        // Evaluate all expressions and add corresponding columns
        for (const expression of ENABLED_EXPRESSIONS) {
            if (expression.visible) {
                const result = evaluateExpression(expression.value, ENABLED_VARIABLES, i);
                const td = document.createElement("td");
                td.textContent = result ? VALUE_TRUE : VALUE_FALSE;
                if (!result) {
                    td.classList.toggle("false-cell");
                }
                row.appendChild(td);
            }
        }

        truthTable.appendChild(row);
    }
}

function generateVariablesList() {
    const variablesList = document.getElementById("variablesList");

    while (variablesList.firstChild) {
        variablesList.removeChild(variablesList.firstChild);
    }

    if (!VARIABLES.length) {
        const item = document.createElement("span");
        item.textContent = "Added variables will be displayed here.";
        variablesList.appendChild(item);
    }
    else {
        VARIABLES.forEach((variable) => {
            variablesList.appendChild(createVariableItem(variable));
        });
    }
}

function generateExpressionsList() {
    const expressionsList = document.getElementById("expressionsList");

    while (expressionsList.firstChild) {
        expressionsList.removeChild(expressionsList.firstChild);
    }

    if (!EXPRESSIONS.length) {
        const item = document.createElement("span");
        item.textContent = "Added expressions will be displayed here.";
        expressionsList.appendChild(item);
    }
    else {
        EXPRESSIONS.forEach((expression) => {
            expressionsList.appendChild(createExpressionItem(expression));
        });
    }
}

function createVariableItem(variable) {
    const variableItem = document.createElement("div");
    variableItem.classList.add("variable-item");

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("visibility-toggle", "fas", "fa-eye");
    toggleButton.addEventListener("click", () => {
        toggleVisibility(variable, variableItem);
        saveVariables();
    });
    variableItem.appendChild(toggleButton);
    if (!variable.visible) {
        toggleVisibilityElement(variableItem);
    }

    const variableText = document.createElement("span");
    variableText.innerText = variable.value;
    variableText.classList.add("variable-text");
    variableItem.appendChild(variableText);

    const removeButton = document.createElement("button");
    removeButton.classList.add("delete-button", "fas", "fa-trash-can");
    removeButton.addEventListener("click", () => {
        removeVariable(variable);
    });
    variableItem.appendChild(removeButton);

    return variableItem;
}

function createExpressionItem(expression) {
    const expressionItem = document.createElement("div");
    expressionItem.classList.add("expression-item");

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("visibility-toggle", "fas", "fa-eye");
    toggleButton.addEventListener("click", () => {
        toggleVisibility(expression, expressionItem);
        saveExpressions();
    });
    expressionItem.appendChild(toggleButton);
    if (!expression.visible) {
        toggleVisibilityElement(expressionItem);
    }

    const expressionText = document.createElement("span");
    expressionText.innerText = expression.value;
    expressionText.classList.add("expression-text");
    expressionItem.appendChild(expressionText);

    const removeButton = document.createElement("button");
    removeButton.classList.add("delete-button", "fas", "fa-trash-can");
    removeButton.addEventListener("click", () => {
        removeExpression(expression);
    });
    expressionItem.appendChild(removeButton);

    return expressionItem;
}

function isValidVariable(variable) {
    return typeof (variable) === "string"
        && (new RegExp(`^${VAR_REGEX_STR}$`)).test(variable)
        && !VARIABLES.find((vari) => vari.value === variable);
}

function isValidExpression(expression) {
    return typeof (expression) === "string"
        && EXPR_REGEX.test(expression)
        && !(new RegExp(`^${VAR_REGEX_STR}$`)).test(expression)
        && !EXPRESSIONS.find((expr) => expr.value === expression);
}

function saveVariables() {
    localStorage.setItem(LOCAL_VARIABLES_NAME, JSON.stringify(VARIABLES));
}

function saveExpressions() {
    localStorage.setItem(LOCAL_EXPRESSIONS_NAME, JSON.stringify(EXPRESSIONS));
}

function removeAllVariables() {
    VARIABLES.splice(0, VARIABLES.length);
    localStorage.removeItem(LOCAL_VARIABLES_NAME);
    generateVariablesList();
}

function removeAllExpressions() {
    EXPRESSIONS.splice(0, EXPRESSIONS.length);
    localStorage.removeItem(LOCAL_EXPRESSIONS_NAME);
    generateExpressionsList();
}

function toggleTFSwitch() {
    toggleTF = !toggleTF;
    const toggleSwitch = document.querySelector(".slider-button");
    toggleSwitch.classList.toggle("active", toggleTF);
    localStorage.setItem(LOCAL_TOGGLETF_NAME, toggleTF);
}

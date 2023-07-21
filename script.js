/* eslint-disable no-use-before-define */
// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Get the input elements
    const value1Input = document.getElementById("value1");
    const value2Input = document.getElementById("value2");
    const sumInput = document.getElementById("sum");
    const productInput = document.getElementById("product");

    // Add event listeners to the input elements
    value1Input.addEventListener("input", calculate);
    value2Input.addEventListener("input", calculate);

    // Load the values from localStorage if available
    if (localStorage.getItem("value1")) {
        value1Input.value = localStorage.getItem("value1");
    }

    if (localStorage.getItem("value2")) {
        value2Input.value = localStorage.getItem("value2");
    }

    // Calculate and update the result fields
    calculate();

    // Function to calculate the sum and product
    function calculate() {
        const value1 = Number(value1Input.value);
        const value2 = Number(value2Input.value);

        // Check if both values are valid numbers
        if (!isNaN(value1) && !isNaN(value2)) {
            const sum = value1 + value2;
            const product = value1 * value2;

        // Update the result fields with the calculated values
            sumInput.value = sum;
            productInput.value = product;

        // Save the values to localStorage
            localStorage.setItem("value1", value1);
            localStorage.setItem("value2", value2);
        }
        else {
        // If any input is not a valid number, reset the result fields
            sumInput.value = "";
            productInput.value = "";

        // Clear the values from localStorage
            localStorage.removeItem("value1");
            localStorage.removeItem("value2");
        }
    }
});

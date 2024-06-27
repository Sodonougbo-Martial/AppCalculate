document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });
            document.getElementById('theme-stylesheet').href = this.value;
            document.getElementById('theme-stylesheet2').href = this.value;
            document.getElementById('theme-stylesheet3').href = this.value;


        }
    });
});





document.addEventListener('DOMContentLoaded', (event) => {
    const inputValue = document.getElementById("user-input");
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';


    const updateDisplay = (value) => {
        inputValue.innerText = value;
    };



    const NumberClick = (number) => {
        if (inputValue.innerText === "NaN" || inputValue.innerText === "Infinity") {
            currentInput = '';
        }
        if (currentInput === "0" && number !== ".") {
            currentInput = '';
        }
        currentInput += number;
        updateDisplay(currentInput);
    };



    const OperatorClick = (op) => {
        let lastChar = currentInput[currentInput.length - 1];
        if (operator && isNaN(lastChar)) {
            currentInput = currentInput.slice(0, -1); 
        }
        if (currentInput === '' && op === '-') {
            currentInput = op; 
        } else if (currentInput !== '') {
            if (!operator) {
                operand1 = currentInput;
            } else {
                operand2 = currentInput.slice(operand1.length + 1);
                calculate();
                operand1 = inputValue.innerText;
            }
            operator = op;
            currentInput += op;
        }
        updateDisplay(currentInput);
    };



    const calculate = () => {
        let result;
        let a = parseFloat(operand1);
        let b = parseFloat(operand2);
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                return;
        }
        updateDisplay(result);
        currentInput = result.toString();
        operand1 = result.toString();
        operand2 = '';
        operator = '';
    };


    document.querySelectorAll('.numbers').forEach(button => {
        button.addEventListener('click', (e) => {
            NumberClick(e.target.textContent.trim());
        });
    });


    document.querySelectorAll('.key-operate').forEach(button => {
        button.addEventListener('click', (e) => {
            OperatorClick(e.target.textContent.trim());
        });
    });


    document.querySelector('.key-others-del').addEventListener('click', () => {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    });



    document.querySelector('.key-operate-reset').addEventListener('click', () => {
        currentInput = '';
        operand1 = '';
        operand2 = '';
        operator = '';
        updateDisplay('0');
    });



    document.querySelector('.key-operate-egal').addEventListener('click', () => {
        if (currentInput && operator) {
            operand2 = currentInput.slice(operand1.length + 1);
            calculate();
        }
    });
});

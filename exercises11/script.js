        const display = document.getElementById('display');

        function appendToDisplay(value) {
            display.value += value;
        }

        function clearDisplay() {
            display.value = '';
        }

        function deleteLast() {
            display.value = display.value.slice(0, -1);
        }

        function calculate() {
            try {
                display.value = eval(display.value);
            } catch (e) {
                display.value = 'Error';
            }
        }

        // SOPORTE PARA TECLADO
        document.addEventListener('keydown', function(event) {
            const key = event.key;

            if (/[0-9]/.test(key)) {
                appendToDisplay(key);
            } else if (['+', '-', '*', '/', '.', '(', ')'].includes(key)) { // Added parentheses support
                appendToDisplay(key);
            } else if (key === 'Enter') {
                calculate();
            } else if (key === 'Backspace') {
                deleteLast();
            } else if (key === 'Escape') {
                clearDisplay();
            }
        });

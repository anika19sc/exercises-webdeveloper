document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const changeColorBtn = document.getElementById('change-color-btn');
    const snowContainer = document.getElementById('snow-container');
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#845EC2', '#2C73D2']; // Array de colores
    let currentColorIndex = 0;
    const numberOfSnowflakes = 100; // Cantidad de copos de nieve

    // Función para generar un color aleatorio
    function getRandomColor() {
        return colors[[Math.floor(Math.random() * colors.length)]];
    }

    // Función para generar un número aleatorio dentro de un rango
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Función para crear un copo de nieve
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${getRandomNumber(0, 100)}vw`;
        snowflake.style.animationDuration = `${getRandomNumber(5, 15)}s`;
        snowflake.style.opacity = getRandomNumber(0.5, 1);
        snowflake.style.fontSize = `${getRandomNumber(8, 20)}px`;
        snowContainer.appendChild(snowflake);

        // Eliminar el copo de nieve cuando la animación termine
        snowflake.addEventListener('animationiteration', () => {
            snowflake.remove();
        });
    }

    // Generar los copos de nieve iniciales
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }

    // Evento al hacer clic en el botón
    changeColorBtn.addEventListener('click', function() {
        const newBackgroundColor = getRandomColor();
        body.style.backgroundColor = newBackgroundColor;
        changeColorBtn.style.backgroundColor = getContrastColor(newBackgroundColor); // Cambiar color del botón
        changeColorBtn.style.color = newBackgroundColor; // Cambiar color del texto del botón
    });

    // Función para obtener un color de contraste basado en el brillo (para el botón)
    function getContrastColor(hexColor) {
        // Convertir HEX a RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        // Calcular el brillo percibido (fórmula común)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Devolver blanco para fondos oscuros y un gris oscuro para fondos claros
        return brightness > 128 ? '#333' : 'white';
    }

    // Crear nuevos copos de nieve periódicamente para una animación continua
    setInterval(createSnowflake, 500); // Crea un nuevo copo cada 500ms
});
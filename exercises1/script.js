// Ejercicio 3: Agregar interactividad simple a tu página.

        let contadorClics = 0;
        let infoVisible = false;

        // Array de colores para el fondo
        const colores = [
            '#f4f4f4', '#e8f5e8', '#fff0e6', '#f0f8ff', 
            '#fdf5e6', '#f5f0ff', '#e6f3ff', '#ffe6f0',
            '#f0fff0', '#fff5ee', '#e6e6fa', '#f5fffa'
        ];

        function cambiarColor() {
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            document.body.style.backgroundColor = colorAleatorio;
            
            // Efecto visual adicional
            document.body.style.transform = 'scale(1.01)';
            setTimeout(() => {
                document.body.style.transform = 'scale(1)';
            }, 200);
        }

        function contarClics() {
            contadorClics++;
            document.getElementById('contadorClics').textContent = contadorClics;
            
            // Efecto visual en el contador
            const contador = document.querySelector('.contador');
            contador.style.transform = 'scale(1.1)';
            contador.style.background = '#92C7F3';
            
            setTimeout(() => {
                contador.style.transform = 'scale(1)';
                contador.style.background = '#92C7F3';
            }, 200);

            // Mensaje especial en ciertos números
            if (contadorClics === 10) {
                alert('Has hecho 10 clics');
            } else if (contadorClics === 25) {
                alert('¡Has hecho 25 clics y contando...');
            }
        }

        function toggleInfo() {
            const info = document.getElementById('infoAdicional');
            infoVisible = !infoVisible;
            
            if (infoVisible) {
                info.style.display = 'block';
                setTimeout(() => {
                    info.style.opacity = '1';
                }, 10);
            } else {
                info.style.opacity = '0';
                setTimeout(() => {
                    info.style.display = 'none';
                }, 300);
            }
        }

        function mostrarFecha() {
            const ahora = new Date();
            const opciones = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            const fechaFormateada = ahora.toLocaleDateString('es-ES', opciones);
            document.getElementById('fechaHora').innerHTML = `
                <strong>Fecha y Hora Actual:</strong><br>
                ${fechaFormateada}
            `;
            
            // Efecto visual
            const fechaElement = document.getElementById('fechaHora');
            fechaElement.style.background = '#194ab5';
            setTimeout(() => {
                fechaElement.style.background = '#2075AC';
            }, 300);
        }

        // Función adicional: actualizar la hora cada segundo
        function actualizarHoraEnTiempoReal() {
            const fechaElement = document.getElementById('fechaHora');
            if (fechaElement.innerHTML.includes('Fecha y Hora Actual')) {
                mostrarFecha();
            }
        }

        // Actualizar cada segundo si se está mostrando la fecha
        setInterval(actualizarHoraEnTiempoReal, 1000);

        // Efecto de bienvenida
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Efecto scroll suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

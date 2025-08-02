        class GestorGastos {
            constructor() {
                this.gastos = [];
                this.chart = null;
                this.inicializarAplicacion();
            }
            
            inicializarAplicacion() {
                this.cargarGastos();
                this.configurarEventos();
                this.establecerFechaActual();
                this.actualizarInterfaz();
            }
            
            configurarEventos() {
                // Evento para el formulario
                document.getElementById('expense-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.agregarGastoDesdeFormulario();
                });
                
                // Eventos para los filtros
                document.getElementById('filter-category').addEventListener('change', () => {
                    this.aplicarFiltros();
                });
                
                document.getElementById('filter-date').addEventListener('change', () => {
                    this.aplicarFiltros();
                });

                // Evento para eliminar gastos usando delegación de eventos
                document.getElementById('table-body').addEventListener('click', (e) => {
                    if (e.target.classList.contains('btn-delete')) {
                        const id = parseInt(e.target.getAttribute('data-id'));
                        this.eliminarGasto(id);
                    }
                });
            }
            
            establecerFechaActual() {
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('date').value = today;
            }
            
            agregarGastoDesdeFormulario() {
                const descripcion = document.getElementById('description').value;
                const cantidad = parseFloat(document.getElementById('amount').value);
                const categoria = document.getElementById('category').value;
                const fecha = document.getElementById('date').value;
                const metodoPago = document.getElementById('payment-method').value;
                
                this.agregarGasto(descripcion, cantidad, categoria, fecha, metodoPago);
                this.limpiarFormulario();
            }
            
            agregarGasto(descripcion, cantidad, categoria, fecha, metodoPago) {
                const nuevoGasto = {
                    id: Date.now(), // ID único basado en timestamp
                    descripcion,
                    cantidad,
                    categoria,
                    fecha,
                    metodoPago
                };
                
                this.gastos.push(nuevoGasto);
                this.guardarGastos();
                this.actualizarInterfaz();
            }
            
            eliminarGasto(id) {
                if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
                    this.gastos = this.gastos.filter(gasto => gasto.id !== id);
                    this.guardarGastos();
                    this.actualizarInterfaz();
                }
            }
            
            filtrarGastos(categoria = '', fecha = '') {
                return this.gastos.filter(gasto => {
                    const coincideCategoria = !categoria || gasto.categoria === categoria;
                    const coincideFecha = !fecha || gasto.fecha === fecha;
                    return coincideCategoria && coincideFecha;
                });
            }
            
            calcularTotal(gastosFiltrados = null) {
                const gastos = gastosFiltrados || this.gastos;
                return gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
            }
            
            aplicarFiltros() {
                const categoria = document.getElementById('filter-category').value;
                const fecha = document.getElementById('filter-date').value;
                
                const gastosFiltrados = this.filtrarGastos(categoria, fecha);
                this.mostrarTabla(gastosFiltrados);
                this.actualizarTotal(gastosFiltrados);
                this.generarGrafico(gastosFiltrados);
            }
            
            mostrarTabla(gastos = null) {
                const gastosAMostrar = gastos || this.gastos;
                const tableBody = document.getElementById('table-body');
                
                if (gastosAMostrar.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="6" class="no-data">No hay gastos registrados</td></tr>';
                    return;
                }
                
                tableBody.innerHTML = gastosAMostrar.map(gasto => `
                    <tr>
                        <td>${this.formatearFecha(gasto.fecha)}</td>
                        <td>${gasto.descripcion}</td>
                        <td>${gasto.categoria}</td>
                        <td>${gasto.cantidad.toFixed(2)}</td>
                        <td>${gasto.metodoPago}</td>
                        <td>
                            <button class="btn btn-delete" data-id="${gasto.id}">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `).join('');
            }
            
            actualizarTotal(gastos = null) {
                const total = this.calcularTotal(gastos);
                document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
            }
            
            generarGrafico(gastos = null) {
                const gastosAUsar = gastos || this.gastos;
                const ctx = document.getElementById('expenseChart').getContext('2d');
                
                // Agrupar gastos por categoría
                const categorias = {};
                gastosAUsar.forEach(gasto => {
                    if (!categorias[gasto.categoria]) {
                        categorias[gasto.categoria] = 0;
                    }
                    categorias[gasto.categoria] += gasto.cantidad;
                });
                
                // Destruir gráfico anterior si existe
                if (this.chart) {
                    this.chart.destroy();
                }
                
                // Crear nuevo gráfico
                this.chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(categorias),
                        datasets: [{
                            label: 'Gastos por Categoría',
                            data: Object.values(categorias),
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40',
                                '#FF6384',
                                '#C9CBCF',
                                '#4BC0C0'
                            ],
                            borderWidth: 2,
                            borderColor: '#fff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.label + ': $' + context.parsed.toFixed(2);
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            actualizarInterfaz() {
                this.mostrarTabla();
                this.actualizarTotal();
                this.generarGrafico();
            }
            
            limpiarFormulario() {
                document.getElementById('expense-form').reset();
                this.establecerFechaActual();
            }
            
            formatearFecha(fecha) {
                const [year, month, day] = fecha.split('-');
                return `${day}/${month}/${year}`;
            }
            
            guardarGastos() {
                try {
                    // En el entorno de Claude, usamos una variable en memoria
                    this.gastosGuardados = JSON.stringify(this.gastos);
                } catch (error) {
                    console.warn('No se pueden guardar los datos en localStorage');
                }
            }
            
            cargarGastos() {
                try {
                    // En el entorno de Claude, usamos datos predeterminados
                    if (this.gastosGuardados) {
                        this.gastos = JSON.parse(this.gastosGuardados);
                    } else {
                        // Datos de ejemplo
                        this.gastos = [
                            { id: 1, descripcion: "Galletita 9 de oro", cantidad: 1000, categoria: "Alimentación", fecha: "2025-08-02", metodoPago: "Efectivo" },
                            { id: 2, descripcion: "Pasaje colectivo", cantidad: 1300, categoria: "Transporte", fecha: "2025-08-01", metodoPago: "Tarjeta" },
                        ];
                    }
                } catch (error) {
                    console.warn('Error al cargar datos:', error);
                    this.gastos = [];
                }
            }
        }
        
        // Función global para limpiar filtros
        function clearFilters() {
            document.getElementById('filter-category').value = '';
            document.getElementById('filter-date').value = '';
            gestorGastos.aplicarFiltros();
        }
        
        // Inicializar la aplicación cuando se carga la página
        let gestorGastos;
        window.addEventListener('DOMContentLoaded', () => {
            gestorGastos = new GestorGastos();
        });

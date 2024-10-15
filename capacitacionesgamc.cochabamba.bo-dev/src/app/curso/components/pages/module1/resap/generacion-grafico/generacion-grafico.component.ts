import { Component, OnInit } from '@angular/core';
import { ModalGraficoService } from 'src/app/curso/service/resap/modal-grafico.service';
import { Chart, registerables } from 'chart.js';
import { SortEvent } from 'primeng/api';

Chart.register(...registerables);

@Component({
    selector: 'app-generacion-grafico',
    templateUrl: './generacion-grafico.component.html',
    styleUrls: ['./generacion-grafico.component.scss'],
})
export class GeneracionGraficoComponent implements OnInit {
    public barChart: any;
    products: any;

    isVisible: boolean = false; //-----------------PARTE DE MODAL----------------------------

    constructor(private modal_grafico: ModalGraficoService) {
        //----------------------------------PARTE DEL MODAL-----------------------
        this.modal_grafico.visibilityChange.subscribe((isVisible: boolean) => {
            this.isVisible = isVisible;
        }); //-----------------------------

        this.modal_grafico.visibilityChange.subscribe((isVisible: boolean) => {
            this.isVisible = isVisible;
            if (this.isVisible) {
                setTimeout(() => {
                    this.createChart();
                }, 100); 
            } else if (this.barChart) {
                this.barChart.destroy(); 
            }

        });
    }

    ngOnInit(): void {
        this.createChart();
        this.initializeProducts();
    }

    //--------------------------------PARTE DEL MODAL------------
    closeModal() {
        this.modal_grafico.hide();
    }

    createChart() {
        if (this.barChart) {
            this.barChart.destroy(); 
        }

        const cursos = [
            'Curso A',
            'Curso B',
            'Curso C',
            'Curso D',
            'Curso D',
            'Curso D',
            'Curso h',
            'curso8',
            'curso9',
            'curso10',
            'curso11',
            'curso12',
            'curso13',
            'curso14',
        ];

        const empleadosPorCurso = [
            10, 15, 7, 20, 35, 22, 7, 18, 9, 10, 11, 21, 13, 41,
        ];

        const canvasElement = document.getElementById(
            'barChart'
        ) as HTMLCanvasElement;

        if (canvasElement) {
            this.barChart = new Chart(canvasElement, {
                type: 'bar',
                data: {
                    labels: cursos,
                    datasets: [
                        {
                            label: 'Número de Empleados',
                            data: empleadosPorCurso,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Cursos Solicitados por Empleado',
                        },
                    },
                },
            });
        }
    }

    //------------------------------- Registros de la tabla -------------------------------------
    initializeProducts() {
        this.products = [
            {
                code: 'P1001',
                name: 'andre',
                category: 'Category 1',
                quantity: 10,
            },
            {
                code: 'P1002',
                name: 'zambrano',
                category: 'Category 2',
                quantity: 4,
            },
            {
                code: 'P1003',
                name: 'valeria',
                category: 'Category 3',
                quantity: 20,
            },
        ];
    }

    customSort(event: SortEvent) {
        if (event.data && event.field) {
            const order = event.order ?? 1;

            event.data.sort((data1, data2) => {
                let value1 = data1[event.field!];
                let value2 = data2[event.field!];
                let result = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (
                    typeof value1 === 'string' &&
                    typeof value2 === 'string'
                ) {
                    result = value1.localeCompare(value2);
                } else {
                    result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                }

                return order * result;
            });
        }
    }
}

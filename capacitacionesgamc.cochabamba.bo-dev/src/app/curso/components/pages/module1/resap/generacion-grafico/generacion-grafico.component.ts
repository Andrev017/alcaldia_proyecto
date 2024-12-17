import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalGraficoService } from 'src/app/curso/service/resap/modal-grafico.service';
import { Chart, registerables } from 'chart.js';
import { Table } from 'primeng/table';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
    selector: 'app-generacion-grafico',
    templateUrl: './generacion-grafico.component.html',
    styleUrls: ['./generacion-grafico.component.scss'],
})
export class GeneracionGraficoComponent implements OnInit {
    public barChart: any;
    products: any;
    isVisible: boolean = false;
    public resap33get: any;
    public auth: any; //AuthResponse ;
    private userSubscription: Subscription;


    @ViewChild('filter') filter!: ElementRef;

    
    constructor(
        private modal_grafico: ModalGraficoService,
        private serviceResap33: ModalResap33Service,
        private authService: AuthService
    ) {
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

        //-------------- BACKEND --------------
        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth;
        });

        this.serviceResap33.getResap33AllParameter().subscribe({
            next: (resp) => {
                this.resap33get = resp;
            },
            error: (e) => {
                console.log('error: ', e);
            },
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

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }//---------------------------------------------------






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

}

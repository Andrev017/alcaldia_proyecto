import { MosalResap37Service } from './../../../../../service/resap/mosal-resap37.service';
import { Component } from '@angular/core';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { Resap37 } from 'src/app/curso/api/resap37.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-resap37',
    templateUrl: './resap37.component.html',
    styleUrls: ['./resap37.component.scss'],
})
export class Resap37Component {
    fechaActual: Date;
    reactiveform: FormGroup;
    traing: any;

    public auth: any;
    private userSubscription: Subscription;
    calific: string[] = ['MUY BUENO', 'BUENO', 'ACEPTABLE', 'DEFICIENTE'];
    formData: {
        criterio1: string;
        criterio2: string;
        criterio3: string;
        comentarios: string;
    } = {
        criterio1: '',
        criterio2: '',
        criterio3: '',
        comentarios: '',
    };

    isVisible: boolean = false; //-----------------PARTE DE MODAL----------------------------

    constructor(
        private authService: AuthService,
        private modal_resap: MosalResap37Service,
        private fb: FormBuilder // public config: DynamicDialogConfig,
    ) {
        this.fechaActual = new Date();
        // this.traing = this.config.data;
        this.reactiveform = this.fb.group({});

        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth;
        });
        //----------------------------------PARTE DEL MODAL-----------------------
        this.modal_resap.visibilityChange.subscribe((isVisible: boolean) => {
            this.isVisible = isVisible;
        }); //-----------------------------------------------------------------
    }
    closeModal() {
        this.modal_resap.hide();
    }

    guardar() {
        let tokenUSER = this.auth.token;
        const payload = {
            resap37: [
                {
                    criterios_evaluacion: [
                        {
                            criterio: 'Aplicación de conocimientos',
                            valor: this.formData.criterio1,
                        },
                        {
                            criterio: 'Cambio de comportamiento',
                            valor: this.formData.criterio2,
                        },
                        {
                            criterio: 'Impacto en desempeño laboral',
                            valor: this.formData.criterio3,
                        },
                    ],
                    comentarios: this.formData.comentarios,
                    fecha: this.fechaActual.toISOString(),
                    estado: 'activo',
                    id_inscripcion: this.auth.emp.id,
                },
            ],
        };

        this.formData = {
            criterio1: '',
            criterio2: '',
            criterio3: '',
            comentarios: '',
        };
        this.modal_resap.saveResap37(payload, tokenUSER).subscribe({
            next: (response) => {
                console.log('Respuesta del servidor:', response);
                Swal.fire(
                    'Éxito',
                    'Los datos se enviaron correctamente',
                    'success'
                );
                this.closeModal();
            },
            error: (err) => {
                console.error('Error al enviar datos:', err);
                Swal.fire(
                    'Error',
                    'Ocurrió un problema al enviar los datos',
                    'error'
                );
            },
        });
    }
    //-------------------------------------------------------

    ngOnInit(): void {
        setInterval(() => {
            this.fechaActual = new Date();
        }, 1000);
    }
}

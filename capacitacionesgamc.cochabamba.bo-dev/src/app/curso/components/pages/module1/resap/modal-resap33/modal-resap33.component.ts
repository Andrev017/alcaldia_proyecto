import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../service/auth/auth.service';
import { Subscription } from 'rxjs';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';

@Component({
    selector: 'app-modal-resap33',
    templateUrl: './modal-resap33.component.html',
    styleUrls: ['./modal-resap33.component.scss'],
})
export class ModalResap33Component implements OnInit {
    fechaActual: Date;
    displayModal: boolean = false;
    currentLineNumber = 1;

    nuevaFuncion: string = '';
    nuevoConocimiento2: string = '';
    nuevaPrioridad: any = '';
    nuevoConocimiento3: string = '';

    conocimientos_insert2: any[] = [];
    conocimientos_insert3: any[] = [];
    prioridad_insert: any[] = [];
    editando: boolean = false;
    indexEdicion: number | null = null;

    public auth: any;
    private userSubscription: Subscription;

    listSector: any;
    listPrioridad: any;
    listConocim: any;

    sector = [
        { name: 'Operativo', code: '' },
        { name: 'Administrativo', code: '' },
    ];

    prioridad = [
        { name: 'Alta', code: 'al' },
        { name: 'Medio', code: 'me' },
        { name: 'Bajo', code: 'ba' },
    ];

    conocimiento_data = [
        { name: 'Curso 1', code: 'c1' },
        { name: 'Curso 2', code: 'c2' },
        { name: 'Curso 3', code: 'c3' },
        { name: 'Curso 4', code: 'c4' },
    ];
    constructor(
        private authService: AuthService,
        private modal_resap33: ModalResap33Service
    ) {
        this.fechaActual = new Date();
        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth; //muestra del nombre del que inicia
        });
        //----------------------------------PARTE DEL MODAL--------------------------------
        this.modal_resap33.visibilityChange.subscribe(
            (displayModal: boolean) => {
                this.displayModal = displayModal;
            }
        ); //-----------------------------------------------------------------
    }

    ngOnInit(): void {
        setInterval(() => {
            this.fechaActual = new Date();
        }, 1000);
    }

    cerrarModal() {
        this.displayModal = false;
    }

    guardar() {
        alert('Formulario guardado');
        this.cerrarModal();
    }

    // ---------------------------------------Input Enumerado----------------------------------------------

    onKeydown(event: KeyboardEvent) {
        const textarea = event.target as HTMLTextAreaElement;
        if (event.key === 'Enter') {
            event.preventDefault();
            const value = textarea.value;
            textarea.value = value + '\n' + `${++this.currentLineNumber}. `;
        }
    }

    // ------------------------------------------pregunta 2-------------------------------------------

    agregarPregunta2() {
        if (this.nuevoConocimiento2.trim()) {
            this.conocimientos_insert2.push(this.nuevoConocimiento2);
            this.nuevoConocimiento2 = '';
        }
    }

    eliminarPregunta2(conocimiento: string) {
        this.conocimientos_insert2 = this.conocimientos_insert2.filter(
            (c) => c !== conocimiento
        );
    }

    editarPregunta2(conocimiento: string, index: number) {
        this.nuevoConocimiento2 = conocimiento;
        this.editando = true; // Activa el modo de edición
        this.indexEdicion = index; // Guarda el índice del conocimiento que se está editando
    }

    // Método para guardar los cambios de edición
    guardarEdicionPregunta2() {
        if (this.indexEdicion !== null) {
            this.conocimientos_insert2[this.indexEdicion] =
                this.nuevoConocimiento2; // Actualiza el conocimiento editado
            this.cancelarEdicionPregunta2(); // Restablece el formulario
        }
    }

    cancelarEdicionPregunta2() {
        this.nuevoConocimiento2 = '';
        this.editando = false;
        this.indexEdicion = null;
    }

    // -------------------------------------Pregunta 3------------------------------------------------
    agregarPregunta3() {
        if (this.nuevaFuncion.trim()) {
            this.prioridad_insert.push(this.nuevaFuncion);
            this.nuevaFuncion = '';
        }
        if (this.nuevoConocimiento3.trim()) {
            this.conocimientos_insert3.push(this.nuevoConocimiento3);
            this.nuevoConocimiento3 = '';
        }
    }
    eliminarPregunta3(pregunta3: string) {
        this.prioridad_insert = this.prioridad_insert.filter(
            (c) => c !== pregunta3
        );
        this.conocimientos_insert3 = this.conocimientos_insert3.filter(
            (a) => a !== pregunta3
        );
    }
    
    editarPregunta3(){
        if (this.indexEdicion !== null) {
            this.conocimientos_insert2[this.indexEdicion] =
                this.nuevoConocimiento2; // Actualiza el conocimiento editado
            this.cancelarEdicionPregunta2(); // Restablece el formulario
        }
    }
    agregarEdicionPregunta3(){
        if(this.indexEdicion !== null){
            this.cancelarEdicionPregunta3();
        }
    }
    cancelarEdicionPregunta3(){

    }

    // ----------------------------------- Pregunta 4 --------------------------------------------------
}

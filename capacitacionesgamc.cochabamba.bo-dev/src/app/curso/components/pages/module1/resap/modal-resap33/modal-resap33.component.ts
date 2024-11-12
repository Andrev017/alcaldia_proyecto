import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../service/auth/auth.service';
import { Subscription } from 'rxjs';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';
// import { ApiService } from './api.service';
// import { response } from 'express';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-modal-resap33',
    templateUrl: './modal-resap33.component.html',
    styleUrls: ['./modal-resap33.component.scss'],
})
export class ModalResap33Component implements OnInit {
    fechaActual: Date;
    displayModal: boolean = false;
    inicioEnumeracion = 1;

    datosExtraidos: any; //varible del servicio

    tabla2: any[] = [];
    nuevoConocimiento2: string = '';

    funcion3: any = ''; //pregunta3
    conocimiento3: any = '';
    prioridad3: string = '';
    tabla3: any[] = [];

    tabla4: any[] = []; //pregunta4
    nuevoConocimiento4: string = '';

    editando2: boolean = false;
    editando3: boolean = false;
    editando4: boolean = false;

    indexEdicion: number | null = null;
    indexEdicion3: number | null = null;

    public auth: any;
    private userSubscription: Subscription;

    //-------------------------------- Combo Box ----------------------------------------

    listSector: any;
    listPrioridad: any;
    listConocim: any;

    sector = [
        { name: 'SECTOR OPERATIVO', code: '' },
        { name: 'SECTOR ADMINISTRATIVO', code: '' },
    ];

    // prioridad = [
    //     { name: 'Alta', code: 'al' },
    //     { name: 'Medio', code: 'me' },
    //     { name: 'Bajo', code: 'ba' },
    // ];

    conocimiento_data = [
        { name: 'Curso 1', code: 'c1' },
        { name: 'Curso 2', code: 'c2' },
        { name: 'Curso 3', code: 'c3' },
        { name: 'Curso 4', code: 'c4' },
        { name: 'Curso 5', code: 'c5' },
        { name: 'Curso 6', code: 'c6' },
    ];

    //-----------------------------------------------------------------------------------------------------

    constructor(
        private authService: AuthService,
        private modal_resap33: ModalResap33Service,
        // private apiservice: ApiService,
        private fb: FormBuilder //pregunta3
    ) {
        this.fechaActual = new Date();
        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth; //muestra del nombre del que inicia
            console.log('Respuesta del servidor:', auth);
        });

        //----------------------------------PARTE DEL MODAL--------------------------------
        this.modal_resap33.visibilityChange.subscribe(
            (displayModal: boolean) => {
                this.displayModal = displayModal;
            }
        ); //-----------------------------------------------------------------
    }
    //-----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        setInterval(() => {
            this.fechaActual = new Date();
        }, 1000);
    }

    //--------------------------------------------Servicio-----------------------------------------

    // datosService() {
    //     const datos = { nombre_completo: 'lujan' };
    //     const ciComparacion = this.auth.emp.ci;

    //     this.apiservice.sendPostRequest(datos).subscribe(
    //         (response) => {
    //             const empleados = response.data;
    //             const empleadoEncontrado = empleados.find(
    //                 (empleado: any) => empleado.numdocumento === ciComparacion
    //             );
    //             if (empleadoEncontrado) {
    //                 console.log('Empleado encontrado:', empleadoEncontrado);
    //                 this.datosExtraidos = {
    //                     secretaria: empleadoEncontrado.cargo,
    //                     direccion: empleadoEncontrado.direccion,
    //                 };
    //             } else {
    //                 this.datosExtraidos = {
    //                     secretaria: 'No tiene registros',
    //                     direccion: 'No tiene registros',
    //                 };
    //             }
    //         },
    //         (error) => {
    //             throw new Error(error);
    //         }
    //     );
    // }

    // mostrarDatosServicio() {
    //     this.apiservice.sendPostRequest({ nombre_completo: 'lujan' }).subscribe(
    //         (response) => {
    //             console.log('Datos del servicio:', response);
    //             this.datosExtraidos = response.data;
    //         },
    //         (error) => {
    //             console.error('Error al consumir el servicio:', error);
    //             this.datosExtraidos = [];
    //         }
    //     );
    // }

    //----------------------------------PARTE DEL MODAL--------------------------------
    cerrarModal() {
        this.displayModal = false;
    }

    guardar() {
        alert('Formulario Guardado');
        this.cerrarModal();
    }

    // ----------------------------------- Pregunta 1----------------------------------------------

    enumeracion(event: KeyboardEvent) {
        const textarea = event.target as HTMLTextAreaElement;
        if (event.key === 'Enter') {
            event.preventDefault();
            const value = textarea.value;
            textarea.value = value + '\n' + `${++this.inicioEnumeracion}. `;
        }
    }

    // ------------------------------------------pregunta 2-------------------------------------------

    agregarPregunta2() {
        if (this.nuevoConocimiento2.trim()) {
            this.tabla2.push(this.nuevoConocimiento2);
            this.nuevoConocimiento2 = '';
        } else if (this.listConocim) {
            this.tabla2.push(this.listConocim.name);
            this.listConocim = null;
        }
    }

    agregadoHabiltado2() {
        return (
            this.nuevoConocimiento2.trim() !== '' || this.listConocim !== null
        );
    }

    cambioDropdown() {
        if (this.listConocim) {
            this.nuevoConocimiento2 = '';
        }
    }

    cambioEtrada() {
        if (this.nuevoConocimiento2.trim()) {
            this.listConocim = null;
        }
    }

    eliminarPregunta2(conocimiento: string) {
        this.tabla2 = this.tabla2.filter((c) => c !== conocimiento);
    }

    editarPregunta2(conocimiento: string, index: number) {
        this.nuevoConocimiento2 = conocimiento;
        this.editando2 = true;
        this.indexEdicion = index;
    }

    guardarEdicionPregunta2() {
        if (this.indexEdicion !== null) {
            this.tabla2[this.indexEdicion] = this.nuevoConocimiento2;
            this.cancelarEdicionPregunta2();
        }
    }

    cancelarEdicionPregunta2() {
        this.nuevoConocimiento2 = '';
        this.editando2 = false;
        this.indexEdicion = null;
    }

    // -------------------------------------Pregunta 3------------------------------------------------
    agregarPregunta3() {
        if (!this.funcion3 || !this.conocimiento3 || !this.prioridad3) {
            alert('Todos los campos son requeridos');
            return;
        }

        this.tabla3.push({
            funcion: this.funcion3,
            conocimiento: this.conocimiento3,
            prioridad: this.prioridad3,
        });

        this.limpiarCampos();
    }

    editarPregunta3(item: any, index: number) {
        this.funcion3 = item.funcion;
        this.conocimiento3 = item.conocimiento;
        this.prioridad3 = item.prioridad;
        this.editando3 = true;
        this.indexEdicion3 = index;
    }

    guardarEdicionPregunta3() {
        if (this.indexEdicion3 !== null) {
            this.tabla3[this.indexEdicion3] = {
                funcion: this.funcion3,
                conocimiento: this.conocimiento3,
                prioridad: this.prioridad3,
            };
            this.limpiarCampos();
        }
    }

    eliminarPregunta3(index: number) {
        this.tabla3.splice(index, 1);
    }

    limpiarCampos() {
        this.funcion3 = '';
        this.conocimiento3 = '';
        this.prioridad3 = '';
        this.editando3 = false;
        this.indexEdicion3 = null;
    }
    // ----------------------------------- Pregunta 4 --------------------------------------------------
    agregarPregunta4() {
        if (this.nuevoConocimiento4.trim() !== '' || this.listConocim) {
            const conocimiento =
                this.nuevoConocimiento4.trim() || this.listConocim.name;
            this.tabla4.push(conocimiento);
            this.cancelarEdicionPregunta4();
        }
    }

    editarPregunta4(conocimiento: string, index: number) {
        this.nuevoConocimiento4 = conocimiento;
        this.editando4 = true;
        this.indexEdicion = index;
    }

    guardarEdicionPregunta4() {
        if (this.indexEdicion !== null) {
            this.tabla4[this.indexEdicion] = this.nuevoConocimiento4;
            this.cancelarEdicionPregunta4();
        }
    }

    cancelarEdicionPregunta4() {
        this.nuevoConocimiento4 = '';
        this.listConocim = null;
        this.editando4 = false;
        this.indexEdicion = null;
    }

    eliminarPregunta4(conocimiento: string) {
        this.tabla4 = this.tabla4.filter((c) => c !== conocimiento);
    }

    agregadoHabilitado4() {
        return (
            this.nuevoConocimiento4.trim() !== '' || this.listConocim !== null
        );
    }

    cambioDropdownPregunta4() {
        // Detectar cambio en el dropdown
        if (this.listConocim) {
            this.nuevoConocimiento4 = '';
        }
    }

    cambioEtradaPregunta4() {
        // Detectar cambio en el input de texto
        if (this.nuevoConocimiento4.trim() !== '') {
            this.listConocim = null;
        }
    }
}

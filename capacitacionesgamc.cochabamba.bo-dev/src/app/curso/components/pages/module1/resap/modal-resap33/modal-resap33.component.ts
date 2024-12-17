import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../service/auth/auth.service';
import { Subscription } from 'rxjs';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';
// import { ApiService } from './api.service';
// import { response } from 'express';
// import { FormBuilder } from '@angular/forms';
// import { FuncionarioComponent } from '../../funcionario/funcionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { Curso } from 'src/app/curso/api/curso.model';

@Component({
    selector: 'app-modal-resap33',
    templateUrl: './modal-resap33.component.html',
    styleUrls: ['./modal-resap33.component.scss'],
})
export class ModalResap33Component implements OnInit {
    fechaActual: Date;
    displayModal: boolean = false;
    inicioEnumeracion = 1;

    inputSecretaria: string = '';
    inputDireccion: string = '';

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
    idEmpleado: number = 0;

    indexEdicion: number | null = null;
    indexEdicion3: number | null = null;
    indexEdicion4: number | null = null;

    //-----------------------------------------------------------------------

    public auth: any;
    private userSubscription: Subscription;
    public cursos: Curso[] = [];
    selectedCurso: any = null;

    //-------------------------------- Combo Box ----------------------------------------

    listSector: any;
    listConocim: any;
    sectorData: Array<{ sectores: string }> = [
        { sectores: 'SECTOR OPERATIVO' },
        { sectores: 'SECTOR ADMINISTRATIVO' },
    ];

    formData: {
        resap33: {
            sector: string;
            secretaria: string;
            dirección: string;
            gestion: number;
        };
        conExigido: Array<{ conocimientos: string }>;
        conAmpliar: Array<{
            conocimientos?: string;
            id_curso: any|number;
            es_otro: boolean;
        }>;
        funcionCon: Array<{
            funciones: string;
            conocimiento_demandado: string;
            prioridad: string;
        }>;
        capMateria: Array<{ materias: string }>;
    } = {
        resap33: {
            sector: '',
            secretaria: '',
            dirección: '',
            gestion: new Date().getFullYear(),
        },
        conExigido: [{ conocimientos: '' }],
        conAmpliar: [{ conocimientos: '', id_curso: '', es_otro: false }],
        funcionCon: [
            { funciones: '', conocimiento_demandado: '', prioridad: '' },
        ],
        capMateria: [{ materias: '' }],
    };

    onInputChange() {
        console.log(this.formData);
    }
    onSectorChange(value: any): void {
        console.log('Sector seleccionado:', value);

        if (value) {
            const inputData = {
                selectedSector: value,
            };
        }
    }

    //-----------------------------------------------------------------------------------------------------

    constructor(
        private authService: AuthService,
        private modal_resap33: ModalResap33Service,
        // private apiservice: ApiService,
        private fb: FormBuilder, //pregunta3
        private cursoservice: CursoService
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

        this.GetAll();
        this.GetPregumta4();

        myForm: FormGroup;

        // this.myForm = this.fb.group({
        //     name: [''], // Input
        //     sector: [''], // Select
        // });
    }

    onInput1Change(value: string): void {
        this.inputSecretaria = value;
    }

    onInput2Change(value: string): void {
        this.inputDireccion = value;
    }

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
        this.createTraing();
    }

    createTraing() {
        this.cerrarModal();
        Swal.fire({
            title: 'Éxito',
            text: 'El registro de RESAP se ha registrado correctamente',
            icon: 'success',
            showClass: { popup: 'animated animate fadeInDown' },
        });
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

    GetAll() {
        const params = {}; // ParámetROS DEL BACK
        this.cursoservice.getCursosAllParameter(params).then((customers) => {
            this.cursos = customers;
        });
    }

    agregarPregunta2() {
        const nuevoConocimiento =
            this.nuevoConocimiento2.trim() || this.selectedCurso;
        if (nuevoConocimiento) {
            this.tabla2.push(nuevoConocimiento);
            this.resetFormulario();
        }
    }

    agregadoHabiltado2() {
        return (
            this.nuevoConocimiento2.trim() !== '' || this.selectedCurso !== null
        );
    }

    editarPregunta2(conocimiento: any, index: number) {
        this.nuevoConocimiento2 = conocimiento.nombre || conocimiento;
        this.editando2 = true;
        this.indexEdicion = index;
    }

    guardarEdicionPregunta2() {
        if (this.indexEdicion !== null) {
            this.tabla2[this.indexEdicion] = this.nuevoConocimiento2.trim();
            this.resetFormulario();
        }
    }

    eliminarPregunta2(index: number) {
        this.tabla2.splice(index, 1);
    }

    cambioDropdown() {
        console.log('Curso seleccionado:', this.selectedCurso);
    }

    cambioEtrada() {
        if (this.nuevoConocimiento2.trim()) {
            this.selectedCurso = null;
        }
    }

    resetFormulario() {
        this.nuevoConocimiento2 = '';
        this.selectedCurso = null;
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
    //---------------- Parte del backend -----------------------------
    public cursos4: Curso[] = [];
    selectedCurso4: any = null;

    GetPregumta4() {
        const params = {};
        this.cursoservice.getCursosAllParameter(params).then((customers) => {
            this.cursos4 = customers;
        });
    }
    //-----------------------------------------------------------
    agregarPregunta4() {
        const nuevoConocimient =
            this.nuevoConocimiento4.trim() || this.selectedCurso4;
        if (nuevoConocimient) {
            this.tabla4.push(nuevoConocimient);
            this.resetForm();
        }
    }
    agregadoHabiltado4() {
        return (
            this.nuevoConocimiento4.trim() != '' || this.selectedCurso4 != null
        );
    }

    editarPregunta4(conocimient: any, index: number) {
        this.nuevoConocimiento4 = conocimient.nombre || conocimient;
        this.editando4 = true;
        this.indexEdicion4 = index;
    }

    guardarEdicionPregunta4() {
        if (this.indexEdicion4 !== null) {
            this.tabla4[this.indexEdicion4] = this.nuevoConocimiento4.trim();
            this.resetForm();
        }
    }

    eliminarPregunta4(index: number) {
        this.tabla4.splice(index, 1);
    }

    cambioDropdown4() {
        console.log('Curso seleccionado:', this.selectedCurso4);
    }

    cambioEtrada4() {
        if (this.nuevoConocimiento4.trim()) {
            this.selectedCurso4 = null;
        }
    }

    resetForm() {
        this.nuevoConocimiento4 = '';
        this.selectedCurso4 = null;
        this.editando4 = false;
        this.indexEdicion4 = null;
    }
}

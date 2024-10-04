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
    public auth: any;
    private userSubscription: Subscription;
    listSector: any;
    listSecretaria: any;
    listDireccion: any;
    listConocim: any;
    listPrioridad: any;

    sector = [
        { name: 'Operativo', code: ''},
        { name: 'Administrativo', code: ''},
    ];

    secretaria = [
        { name: 'nombre', code: '' },
        { name: 'nombre', code: '' },
    ];

    direccion = [
        { name: 'nombre', code: '' },
        { name: 'nombre', code: '' },
    ];

    conocimiento = [
        { name: 'Ley 1178', code: 'ly' },
        { name: 'Manejo de Archivo', code: 'RM' },
    ];
    prioridad = [
        { name: 'Alta', code: 'al' },
        { name: 'Medio', code: 'me' },
        { name: 'Bajo', code: 'ba' },
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
    messages(){
        
    }

}

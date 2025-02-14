import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HabilitarResap33Service } from 'src/app/curso/service/resap/habilitar-resap33.service';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';
import { AuthService } from 'src/app/curso/service/auth/auth.service';

@Component({
    selector: 'app-resap33',
    templateUrl: './resap33.component.html',
    styleUrls: ['./resap33.component.scss'],
})
export class Resap33Component implements OnInit {
    isToggleEnabled = false;
    
    public resap33get: any;
    public auth: any; 
    private userSubscription: Subscription;
    

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private toggleService: HabilitarResap33Service,
        private fb: FormBuilder,
        private serviceResap33: ModalResap33Service,
        private authService: AuthService
    ) {
        // this.miFormulario = this.fb.group({
        //     nombre: ['', Validators.required],
        //     gestion: ['', Validators.required],
        // });
        
        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth;
        });

        this.serviceResap33.getResap33AllParameter().subscribe({
            next: (data) => {
                this.resap33get = data; 
            },
            error: (e) => {
                console.error('Error al obtener resap33:', e);
            },
        });
    }

    ngOnInit() {
        this.toggleService.toggleState$.subscribe((state) => {
            this.isToggleEnabled = state;
        });

        

        //------------------- COMBINAR LOS DATOS PARA LA TABLA ----------------------
        // this.authService.getUser().subscribe(authData => {
        //     this.auth = authData;

        //     this.serviceResap33.getResap33AllParameter().subscribe(resapData => {
        //         this.resap33get = resapData;

        //         this.combinarData = this.resap33get.map((resap: resapData) => ({
        //             nombreCompleto: `${this.auth?.emp?.nombre || ''} ${this.auth?.emp?.otro_nombre || ''} ${this.auth?.emp?.paterno || ''} ${this.auth?.emp?.materno || ''}`,
        //             sector: resap.sector
        //         }));
        //     });
        // });
    }

    //----------------------------------- PARTE DEL MODAL --------------------------------
    abrirModalOp() {
        if (this.isToggleEnabled) {
            console.log('Modal abierto');
            this.serviceResap33.show();
        }
    }
    //----------------------------------------------------------------------------------

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    //------------------------------- DENTRO DE LA TABLA -------------------
    generarPDF() {}


    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    //------------------------------------------------------------------
}

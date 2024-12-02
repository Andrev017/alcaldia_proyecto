import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';
import { HabilitarResap33Service } from 'src/app/curso/service/resap/habilitar-resap33.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importar Reactive Forms

@Component({
    selector: 'app-resap33',
    templateUrl: './resap33.component.html',
    styleUrls: ['./resap33.component.scss'],
})
export class Resap33Component implements OnInit {
    isToggleEnabled = false;
    miFormulario: FormGroup; // Declarar el FormGroup
    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private modal_resap33: ModalResap33Service,
        private toggleService: HabilitarResap33Service,
        private fb: FormBuilder // Inyectar FormBuilder
    ) {
        // Inicializa el FormGroup en el constructor
        this.miFormulario = this.fb.group({
            nombre: ['', Validators.required], // Ejemplo de control de formulario
            gestion: ['', Validators.required], // Otro control
        });
    }

    ngOnInit() {
        this.toggleService.toggleState$.subscribe((state) => {
            this.isToggleEnabled = state;
        });
    }

    abrirModalOp() {
        if (this.isToggleEnabled) {
            console.log('Modal abierto');
            this.modal_resap33.show();
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    verRegistro() {
        // Implementa la lógica para ver el registro
    }

    generarPDF() {
        // Implementa la lógica para generar el PDF
    }

    onSubmit() {
        if (this.miFormulario.valid) {
            console.log(this.miFormulario.value);
            // Maneja la lógica de envío aquí
        }
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    llenadoReg = [
        { 
            registro: 'andre', 
            gestion: '2023' },
        {
            registro: 'zambrano',
            gestion: '2015',
        },
        {
            registro: 'valeria',
            gestion: '2002',
        },
    ];
    
}

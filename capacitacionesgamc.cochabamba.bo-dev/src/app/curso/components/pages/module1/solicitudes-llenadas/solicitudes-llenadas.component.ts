import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { HabilitarResap33Service } from 'src/app/curso/service/resap/habilitar-resap33.service';
import { ModalGraficoService } from 'src/app/curso/service/resap/modal-grafico.service';
import { SortEvent } from 'primeng/api';

@Component({
    selector: 'app-solicitudes-llenadas',
    templateUrl: './solicitudes-llenadas.component.html',
    styleUrls: ['./solicitudes-llenadas.component.scss'],
})
export class SolicitudesLlenadasComponent implements OnInit {
    isChecked: boolean = false;
    isToggleEnabled = false;
    loading: boolean = false; //CAMBIAR A TRUE Y VERIFICAR SI FUNCIONA

    stateOptions = [
        { name: 'Operativo', code: '' },
        { name: 'Administrativo', code: '' },
    ];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private toggleService: HabilitarResap33Service,
        private modal_grafico: ModalGraficoService
    ) {}

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    ngOnInit() {
        this.toggleService.toggleState$.subscribe((state) => {
            this.isChecked = state;
        });
    }

    onToggleChange(event: any) {
        this.toggleService.setToggleState(event.checked);
    }

    abrirModalGrafico() {
        console.log('Modal abierto');
        this.modal_grafico.show();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    llenadoSolid = [
        {
            gestion: '2023',
            nombre: 'andre',
            carnet: 936452,
        },
        {
            gestion: '1995',
            nombre: 'nicolas',
            carnet: 336478,
        },
        {
            gestion: '2015',
            nombre: 'micaela',
            carnet: 736446,
        },
        {
            gestion: '2008',
            nombre: 'robert',
            carnet: 326457,
        },
    ];
}

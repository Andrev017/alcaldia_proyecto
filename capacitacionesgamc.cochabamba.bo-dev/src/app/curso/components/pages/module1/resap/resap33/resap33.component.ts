import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';
import { HabilitarResap33Service } from 'src/app/curso/service/resap/habilitar-resap33.service';

@Component({
    selector: 'app-resap33',
    templateUrl: './resap33.component.html',
    styleUrls: ['./resap33.component.scss'],
})
export class Resap33Component implements OnInit {
    isToggleEnabled = false;

    constructor(
        private modal_resap33: ModalResap33Service,
        private toggleService: HabilitarResap33Service
    ) {}

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
}

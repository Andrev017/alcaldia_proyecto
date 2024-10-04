import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { HabilitarResap33Service } from 'src/app/curso/service/resap/habilitar-resap33.service';

@Component({
    selector: 'app-solicitudes-llenadas',
    templateUrl: './solicitudes-llenadas.component.html',
    styleUrls: ['./solicitudes-llenadas.component.scss'],
})
export class SolicitudesLlenadasComponent implements OnInit {
    isChecked: boolean = false;

    stateOptions = [
        { name: 'Operativo', code: '' },
        { name: 'Administrativo', code: '' },
    ];

    constructor(private toggleService: HabilitarResap33Service) {}

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
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { HabilitarResap33Service } from 'src/app/curso/service/resap/habilitar-resap33.service';
import { ModalGraficoService } from 'src/app/curso/service/resap/modal-grafico.service';
import { ModalResap33Service } from 'src/app/curso/service/resap/modal-resap33.service';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-solicitudes-llenadas',
    templateUrl: './solicitudes-llenadas.component.html',
    styleUrls: ['./solicitudes-llenadas.component.scss'],
})
export class SolicitudesLlenadasComponent implements OnInit {
    isChecked: boolean = false;
    isToggleEnabled = false;
    public resap33get: any;
    public solicutuDelate: any;
    public auth: any;
    private userSubscription: Subscription;
    llenadoSolid1 = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private toggleService: HabilitarResap33Service,
        private modal_grafico: ModalGraficoService,
        private serviceResap33: ModalResap33Service,
        private authService: AuthService
    ) {
        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth;
        });

        this.userSubscription = this.serviceResap33
            .getResap33AllParameter()
            .subscribe((sect) => {
                this.resap33get = sect;
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
            this.isChecked = state;
        });
    }

    // --------------------- PARTE DEL MODAL Y TABLA ------------------
    onToggleChange(event: any) {
        this.toggleService.setToggleState(event.checked);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    abrirModalGrafico() {
        console.log('Modal abierto');
        this.modal_grafico.show();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    } //-------------------------------------------

}

import { Component } from '@angular/core';
import { MosalResap37Service } from 'src/app/curso/service/resap/mosal-resap37.service';

@Component({
    selector: 'app-resap-list',
    templateUrl: './resap-list.component.html',
    styleUrls: ['./resap-list.component.scss'],
})
export class ResapListComponent {
    constructor(private ModalResap37Service: MosalResap37Service) {}

    abrirModal() {
        //----------------PARTE DEL MODAL----------------------
        this.ModalResap37Service.abrir();
    }
}

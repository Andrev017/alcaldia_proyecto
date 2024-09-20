import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ModalResap37Service } from '../../../../../service/resap/modal-resap37.service';


@Component({
  selector: 'app-resap-list',
  templateUrl: './resap-list.component.html',
  styleUrls: ['./resap-list.component.scss']
})
export class ResapListComponent {


  constructor(private ModalResap37Service: ModalResap37Service) {}

  abrirModal() {//----------------PARTE DEL MODAL----------------------
    this.ModalResap37Service.show(); 
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');

}

}

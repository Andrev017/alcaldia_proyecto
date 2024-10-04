import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-capacitacion-ver',
  templateUrl: './capacitacion-ver.component.html',
  styleUrls: ['./capacitacion-ver.component.scss']
})
export class CapacitacionVerComponent {

  public dataCapacity: any;
  public apiUrlImage : string;
  constructor(public config: DynamicDialogConfig ){
    this.dataCapacity = this.config.data;
    //console.log("----:",this.dataCapacity);
    this.apiUrlImage =  `${environment.apiUrls.images}`;
  }

}

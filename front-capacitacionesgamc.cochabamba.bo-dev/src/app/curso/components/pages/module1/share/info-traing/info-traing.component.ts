import { Component, Input } from '@angular/core';
import { Capacitacion } from 'src/app/curso/api/capacitacion.model';

@Component({
  selector: 'app-info-traing',
  templateUrl: './info-traing.component.html',
  styleUrls: ['./info-traing.component.scss']
})
export class InfoTraingComponent {
  @Input() training: any;

}

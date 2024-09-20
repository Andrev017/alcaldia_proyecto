import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-page',
  templateUrl: './titulo-page.component.html',
  styleUrls: ['./titulo-page.component.scss']
})
export class TituloPageComponent {
  @Input() title: any;
  @Input() subtitle: any;
}

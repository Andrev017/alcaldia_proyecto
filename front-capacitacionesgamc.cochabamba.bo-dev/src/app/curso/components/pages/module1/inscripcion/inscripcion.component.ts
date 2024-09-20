import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { TitleService } from 'src/app/curso/service/util/title.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent {

  public codTraing :string;
  public isList : string = 'false';
  public title :string = "LISTADO DE INSCRIPCIONES";
  public subtitle : string = "";

  constructor(private _route: ActivatedRoute, private service: CapacitacionService, private serviceTitle: TitleService) {
    this.codTraing = this._route.snapshot.paramMap.get('uuid') || "" ;
    this.isList = this._route.snapshot.paramMap.get('isList') || "" ;
  }

  ngOnInit(): void {
    this.serviceTitle.obtenerSubTitleCompartidos().subscribe((datos) => {
      this.subtitle = datos;
    });
  }

}

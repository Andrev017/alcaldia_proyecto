import { Component, Input } from '@angular/core';
import { CriterioEvaluacion } from 'src/app/curso/api/criterioEva.model';

@Component({
  selector: 'app-criterioeva-form',
  templateUrl: './criterioeva-form.component.html',
  styleUrls: ['./criterioeva-form.component.scss']
})

export class CriterioevaFormComponent {

  @Input() criterio: any ;
  @Input() calificacion: any ;
  gfg: string='';
}

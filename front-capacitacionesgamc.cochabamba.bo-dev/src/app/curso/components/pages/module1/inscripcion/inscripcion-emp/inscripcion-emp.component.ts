import { Component, Input } from '@angular/core';
import { EmpleadoService } from 'src/app/curso/service/empleado/empleado.service';
import { InscripcionService } from 'src/app/curso/service/inscripcion/inscripcion.service';

@Component({
  selector: 'app-inscripcion-emp',
  templateUrl: './inscripcion-emp.component.html',
  styleUrls: ['./inscripcion-emp.component.scss']
})
export class InscripcionEmpComponent {

  @Input() uuidtraing: any;
  constructor(private serviceEmp:EmpleadoService, private service: InscripcionService) {
    
  }
  ngOnInit(): void {
    this.GetAllCap();
    this.serviceEmp.saving.subscribe(r => {
     this.GetAllCap();
    });

  }
  GetAllCap(){
    const params = { activo: "1", page:"", limit:"", uuid: this.uuidtraing };

    // this.serviceTraing.getTrainingParameter(params).subscribe(result => {
    //   this.traing = result;
    //   this.GetAllCurs();
    //   console.log('capacitacion:', this.traing);
    //   this.loading = false;
    // });

  }
}
 
import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Capacitacion } from 'src/app/curso/api/capacitacion.model';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { InscripcionService } from 'src/app/curso/service/inscripcion/inscripcion.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { Inscripcion } from 'src/app/curso/api/inscripcion.model';
import { InscripcionCreateComponent } from '../inscripcion-create/inscripcion-create.component';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { InscripcionUpdateComponent } from '../inscripcion-update/inscripcion-update.component';
import { TitleService } from 'src/app/curso/service/util/title.service';
import { ReporteService } from 'src/app/curso/service/reporte/reporte.service';

@Component({
  selector: 'app-inscripcion-list',
  templateUrl: './inscripcion-list.component.html',
  styleUrls: ['./inscripcion-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class InscripcionListComponent {

    @Input() uuidtraing: any;
    @ViewChild('filter') filter!: ElementRef;

  public disponibilidadSolicitud: boolean = true;
  public cupoDisponible: boolean = true;
  public inscdata: any;
  public traing : any; //Capacitacion;
  public role : string = '';
  ref: DynamicDialogRef | undefined;
  loading: boolean = true;

  constructor(private serviceTraing:CapacitacionService, private jwtHelper: JwtHelperService, private service: InscripcionService, public dialogService: DialogService, private router: Router, private serviceTitle: TitleService, private serviceReporte: ReporteService ) {
    ///
  }

  ngOnInit(): void {
    this.GetAllCap();
   this.serviceTraing.saving.subscribe(r => {
     this.GetAllCap();
   });
  }
  GetAllCap(){
    const params = { activo: "", page:"", limit:"", uuid: this.uuidtraing };

    this.serviceTraing.getTrainingParameter(params).subscribe(result => {
      this.traing = result;
      this.GetAllCurs();
      this.cuposDisponibles();
      this.loading = false;
      this.serviceTitle.actualizarSubTitleCompartidos( this.traing.capacitacion_curso.nombre);
    });
  }

  GetAllCurs() {
    const params = { activo: "", page:"", limit:"", id_capacitacion: this.traing.id };
    this.service.getInscriptionAllParameter(params).subscribe(result => {
      console.log('Inscripcion:', result);
      this.inscdata = result.map((inscripcion: any) => ({
        ...inscripcion,
        fullName: `${inscripcion.inscripcion_empleado.nombre} ${inscripcion.inscripcion_empleado.paterno} ${inscripcion.inscripcion_empleado.materno}`
      }));
      this.loading = false;
    });
  }
  cuposDisponibles(){
    const params = { activo: "", page:"", limit:"", uuid: this.uuidtraing };

    this.serviceTraing.getTrainingParameter(params).subscribe(result => {
      this.traing = result;
      this.disponibilidadSolicitud= this.traing.solicitudes<this.traing.cupo
      this.cupoDisponible = this.traing.aprobados<this.traing.cupo

  })
}
  FunctionEdit(code: Inscripcion, tipo:string) {
    this.ref = this.dialogService.open(InscripcionUpdateComponent, {
      header: tipo== 'approved'? 'Aprobar Capacitación': tipo == 'asisttend'?'Aprobar Asistencia':'Aprobar Certificado',
      width: '70%',
      //height: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data:{
        inscription : code,
        tipo: tipo,
      }
    });
  }
  inscripcion(){
    this.ref = this.dialogService.open(InscripcionCreateComponent, {
      header: 'Inscripción',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data:{
        training : this.traing,
        isManual: 'true',
      }
    });
  }
  reporteInscritos(){
    this.serviceReporte.getReporteInscritos( this.uuidtraing );
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Capacitacion } from 'src/app/curso/api/capacitacion.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { Table } from 'primeng/table';
import { Empleado, EmpladoInscripcion } from 'src/app/curso/api/empleado.model';
import { CapacitacionVerComponent } from '../capacitacion-ver/capacitacion-ver.component';
import { CapacitacionExternaComponent } from '../capacitacion-externa/capacitacion-externa.component';
import { ResapCreateComponent } from '../../resap/resap-create/resap-create.component';
import { ReporteService } from 'src/app/curso/service/reporte/reporte.service';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { TitleService } from 'src/app/curso/service/util/title.service';
import { EmpleadoService } from 'src/app/curso/service/empleado/empleado.service';

@Component({
  selector: 'app-capacitacion-emp',
  templateUrl: './capacitacion-emp.component.html',
  styleUrls: ['./capacitacion-emp.component.scss'],
  providers: [DialogService, MessageService]
})
export class CapacitacionEmpComponent {

  loading: boolean = true;
  cursoDialog:boolean=false;
  public inscriptiondata: EmpladoInscripcion[] = [];
  public traingdata: Capacitacion[] = [];
  //public capacitacion : any = {};
  submitted: boolean = false;
  deleteCursoDialog: boolean = false;
  selectedCursos: Capacitacion[] = [];
  ref: DynamicDialogRef | undefined;
  public empData: any;
  public cursos : any;
  private userSubscription: Subscription;
  public apiUrlImage : string;

  public role : string= "";
  auth: any;
  public estado = ['SI', 'JU'];

  @ViewChild('filter') filter!: ElementRef;
  @Input() uuidempleado: any;


  constructor(private service: CapacitacionService, public dialogService: DialogService, private router: Router, private jwtHelper: JwtHelperService, private serviceCurso: CursoService, private authService: AuthService, private serviceReporte: ReporteService, private serviceTitle: TitleService, private serviceEmp : EmpleadoService ) {
    this.userSubscription = this.authService.getUser().subscribe( auths => {
      this.auth = auths;
    });
    this.apiUrlImage =  `${environment.apiUrls.images}`;
    // this.userSubscription = this.empleado.subscribe( res => {
    //   this.traingdata = res.emplado_inscripcion.incripcion_capacitacion;
    // });
 }
 ngOnInit() {

  //const toke = this.jwtHelper.decodeToken( localStorage.getItem("profanis_auth") );

  this.role = this.auth.user.rol;
  //this.empData = this.uuidempleado;
  
  
  if(this.uuidempleado!=null && this.uuidempleado ){ //list por curso
    //console.log ("-------:",this.uuidempleado);
    const par = { uuid: this.uuidempleado };
        this.serviceEmp.getSearchEmp(par).then(resp => {
          this.empData = resp;
          
          //this.empleado = this.empData[0].id;
           
          //console.log("fuancionario:>", this.empData);
          let nombre_completo = this.empData[0] ? this.empData[0].nombre +' '+ this.empData[0].otro_nombre +' '+ this.empData[0].paterno + ' ' + this.empData[0].materno:"";
          this.serviceTitle.actualizarSubTitleCompartidos(nombre_completo);
          this.LoadCapacityData( this.empData[0].id);
          this.service.saving.subscribe(r => {
            this.LoadCapacityData(this.empData[0].id);
            
          });
        });

    
  }else{
    
    //list all
    //this.GetAll();
    //this.service.saving.subscribe(r => {
    //  this.GetAll();
    //});
  }

 }
  LoadCapacityData(id_empleado:number){
    const params = { id_empleado: id_empleado, activo:"1", isjoin:"true", estado:'APROBADO' };

    this.service.getTrainingAllParameter(params).subscribe(result => {
      this.traingdata = result;
      this.loading = false;
      //this.serviceTitle.actualizarSubTitleCompartidos( this.traingdata[0].capacitacion_curso.nombre);
    });

  }
  
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  openNewCursoext(code:any){
    this.ref = this.dialogService.open(CapacitacionExternaComponent, {
        header: 'Nueva Capacitación Externa',
        width: '70%',
        //height: '80%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data:{
          //traingcode : code,
          id_empleado:this.empData[0].id,
        }
      });

      // this.ref.onClose.subscribe((product: Product) => {
      //     if (product) {
      //         //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      //     }
      // });

      this.ref.onMaximize.subscribe((value) => {
          //this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
      });
  }
  FunctionVerDetalles(capacity : any){
    this.ref = this.dialogService.open(CapacitacionVerComponent, {
      header: 'Detalles de Cursos',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: capacity,
    });

    // this.ref.onClose.subscribe((product: Product) => {
    //     if (product) {
    //         //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //     }
    // });

    this.ref.onMaximize.subscribe((value) => {
        //this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
  generarResap(traing:any){
    this.ref = this.dialogService.open(ResapCreateComponent, {
      header: 'RESAP 36',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: traing,
    });

    // this.ref.onClose.subscribe((product: Product) => {
    //     if (product) {
    //         //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //     }
    // });

    this.ref.onMaximize.subscribe((value) => {
        //this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
  imprimirResap(uuid:string){
    const params = { uuid: uuid, activo:"1"};
    this.serviceReporte.getReporteResap(params);
  }
  imprimirResap37(uuid:string){
    const params = { uuid: uuid, activo:"1"};
    this.serviceReporte.getReporteResap37(params);
  }
  imprimirCertificado(uuid: string){
    const params = { uuid: uuid, activo:"1"};
    this.serviceReporte.getCertificado(params);
  }
  calcularTotalCargaHorario() {
    const dateActual = new Date();
    return this.traingdata
      .filter((traing) => { return traing.gestion > 0 } )
      .reduce((total, traing) => total + traing.carga_horaria, 0);
  }
  calcularTotalCargaHorarioGestion() {
    const dateActual = new Date();
    return this.traingdata
      .filter((traing) => { return traing.gestion == dateActual.getFullYear() } )
      .reduce((total, traing) => total + traing.carga_horaria, 0);
  }
}

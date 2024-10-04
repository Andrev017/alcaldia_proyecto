import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Capacitacion } from 'src/app/curso/api/capacitacion.model';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { Curso, Cursos } from 'src/app/curso/api/curso.model';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { Subscription } from 'rxjs';
import { CapacitacionComponent } from '../capacitacion.component';
import { CapacitacionCreateComponent } from '../capacitacion-create/capacitacion-create.component';
import { InscripcionCreateComponent } from '../../inscripcion/inscripcion-create/inscripcion-create.component';
import { InscripcionUpdateComponent } from '../../inscripcion/inscripcion-update/inscripcion-update.component';
import { TitleService } from 'src/app/curso/service/util/title.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-capacitacion-list',
  templateUrl: './capacitacion-list.component.html',
  styleUrls: ['./capacitacion-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class CapacitacionListComponent implements OnInit {
  loading: boolean = true;
  cursoDialog:boolean=false;
  public traingdata: Capacitacion[] = [];
  public capacitacion : any = {};
  submitted: boolean = false;
  deleteCursoDialog: boolean = false;
  selectedCursos: Capacitacion[] = [];
  ref: DynamicDialogRef | undefined;
  public cursos : any;

  public role : string= "";
  private userSubscription: Subscription;
    auth: any;

  @ViewChild('filter') filter!: ElementRef;
  @Input() codcurso: string= "";
  @Input() idempleado: string= "";
  @Input() tipo: string= "";

  constructor(private service: CapacitacionService, public dialogService: DialogService, private router: Router, private jwtHelper: JwtHelperService, private serviceCurso: CursoService, private authService: AuthService, private serviceTitle: TitleService  ) {
     this.userSubscription = this.authService.getUser().subscribe( auths => {
       this.auth = auths;
     });
  }
  toggleActivoCurso(){  
    this.serviceCurso.toggleActivoCurso(this.cursos.id)
    .subscribe(response => {
      if(response.ok) {
        this.cursos.activo = response.activo;
        Swal.fire({
          icon: 'success',
          title: 'Estado actualizado',
          text: `El curso ha sido ${response.activo === 1 ? 'activado' : 'inactivado'} exitosamente.`,
          confirmButtonText: 'Aceptar',
        }).then(() => {
          window.location.reload();
        });
      } else {
        console.error('Error al cambiar el estado del curso:', response.errors);
      }
    }, error => {
      console.error('Error en la solicitud al backend:', error);
    });
  }
  ngOnInit() {
    this.role = this.auth.user.rol;

    if(this.codcurso!=null && this.codcurso!=''){ //list por curso
      this.LoadCursoData(this.codcurso);
      this.service.saving.subscribe(r => {
        this.LoadCursoData(this.codcurso);
      });
    }else{//list all
      this.GetAll();
      this.service.saving.subscribe(r => {
        this.GetAll();
      });
    }
  }
  LoadCursoData(code: any) {

    const params = { uuid: code, activo:"" };

    this.serviceCurso.getCursoParameter(params).subscribe({
      next: (resp) => {
        this.cursos= resp;
        this.GetAllCurs();
      },
      error: (e) => {
        console.log('error: ',e)
      }
    });
  }
  GetAllCurs() {

    const params = { activo: "", page:"", limit:"", id_curso: this.cursos.id, tipo:this.tipo   };
    this.service.getTrainingAllParameter(params).subscribe(result => {
      this.traingdata = result;
      this.loading = false;
      this.serviceTitle.actualizarSubTitleCompartidos(this.traingdata[0].capacitacion_curso.nombre);
      });

  }
  //////////////all///////
  GetAll() {
    let visible = "";
    let activo ="";
    if(this.role == 'USUARIO' ){
      visible = "SI";
      activo ="1";
    }

    const params = { activo: activo, page:"", limit:"", id_empleado:this.idempleado, tipo:this.tipo, visible: visible };
    this.service.getTrainingAllParameter(params).subscribe({

      next:(resp)=>{

        this.traingdata = resp;
        this.loading = false;
        this.serviceTitle.actualizarSubTitleCompartidos("");
      },
      error:(e) =>{
        console.log('error: ',e)
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  openNew(code:any){
    this.ref = this.dialogService.open(CapacitacionCreateComponent, {
        header: code? 'Actualizar Capacitación' : 'Nueva Capacitación',
        width: '60%',
        //height: '80%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data:{
          traingcode : code,
          curcode:this.cursos.id,
        }
      });
      this.ref.onMaximize.subscribe((value) => {
      });
  }

  FunctionEdit(uuid:any){
    this.ref = this.dialogService.open(CapacitacionCreateComponent, {
      header: uuid? 'Editar Capacitación' : 'Nueva Capacitación',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data:{
        traingcode : uuid,
        curcode:this.cursos.id,
      }
    });
  }

  inscripcionCapacit(uuid:any){
    this.router.navigate(['/capacitacion/capacitacion/inscription/', {uuid: uuid}]);
  }
  inscripcionCapacitAll(uuid:any){
    this.router.navigate(['/capacitacion/capacitacion/inscription/', {uuid: uuid, isList: true}]);

  }
  //acceso usuario normal
  FunctionCreateInscripcion(traing:Capacitacion){

    this.ref = this.dialogService.open(InscripcionCreateComponent, {
      header: 'Inscripción',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data:{
        training : traing,
      }
    });
  }

  getCantidadInscritosArray(cursosInscritos: Array<any>,estado: string){
    const arrayInscritos = cursosInscritos.filter(item=> item.estado == estado)
    return arrayInscritos.length
  }

}

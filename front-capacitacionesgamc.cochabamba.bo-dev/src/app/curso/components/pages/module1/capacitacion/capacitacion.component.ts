import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/curso/api/empleado.model';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { TitleService } from 'src/app/curso/service/util/title.service';
import { EmpleadoService } from 'src/app/curso/service/empleado/empleado.service';
import { Message} from 'primeng/api';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.scss']
})
export class CapacitacionComponent implements OnInit {

  public uuid : string = "";
  public empleado : any;
  public isEmp : string= '';
  public auth: any ;
  public idempleado: string="";
  public uuidempleado: string="";
  private userSubscription: Subscription;
  public tipo: string="";
  public title:string="LISTADO DE CAPACITACIONES";
  public subtitle:string="";
  public nombreCompleto : string="";
  public funcionario : any;
  msgs: Message[] = [];
  visible: boolean = true;
  constructor(private _route: ActivatedRoute, private serviceCur : CursoService,  private authService: AuthService, private serviceTitle : TitleService, private serviceEmp : EmpleadoService ) {
    //console.log("-----:",this._route.snapshot.paramMap.get('uuid')  );
    //console.log('dddddd:', this._route.snapshot.paramMap.get('isEmp'))
      //this.codCurso = this._route.snapshot.paramMap.get('uuid') ;
      this.userSubscription = this.authService.getUser().subscribe( auths => {      
        this.auth = auths;
        //console.log("auth:",this.auth)  
      });

      
      
   }
   
   ngOnInit() {
    this.uuid = this._route.snapshot.paramMap.get('uuid') || '';    
    this.isEmp = this._route.snapshot.paramMap.get('isEmp') || '';   
    
    if(this.auth.user.rol === 'USUARIO'){
      this.idempleado =  this.auth.emp.id;
      this.empleado = this.auth.emp.id;
      
      //this.nombreCompleto = this.auth.emp.nombre +' '+ this.auth.emp.otro_nombre +' '+ this.auth.emp.paterno + ' ' + this.auth.emp.materno;
      this.uuidempleado = this.auth.emp.uuid;
    }

    if(this.isEmp === 'true' &&  this.auth.user.rol === 'ADMINISTRADOR'){
      this._route.queryParams.subscribe(params => {
        this.uuidempleado = params['data'];//JSON.parse(params['data']);
        // Now you can use the 'data' object in your component logic
      });
      
    }    
    
    this.tipo = 'INTERNO';
    //this.subtitle = this.serviceTitle.getSubTitle()?this.serviceTitle.getSubTitle():'-';
      
    this.serviceTitle.obtenerSubTitleCompartidos().subscribe((datos) => {
      this.subtitle = datos;      
    });

    this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    
    //this.empleado = this._route.snapshot.paramMap.get('emp') || '';
  }

}

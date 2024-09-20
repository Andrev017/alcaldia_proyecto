import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/curso/api/auth.model';
import { Capacitacion } from 'src/app/curso/api/capacitacion.model';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { EmpleadoService } from 'src/app/curso/service/empleado/empleado.service';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import { InscripcionService } from 'src/app/curso/service/inscripcion/inscripcion.service';
import { FormattingService } from 'src/app/curso/service/util/formatting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion-create',
  templateUrl: './inscripcion-create.component.html',
  styleUrls: ['./inscripcion-create.component.scss']
})
export class InscripcionCreateComponent {

  traingdata: any;//Capacitacion;
  traing: Capacitacion;
  insdata: any;
  respdata: any;
  editdata: any;
  isAddMode: boolean;
  mensajePadre:string = "hola mensaje padre";
  //usuario
  auth: any; //AuthResponse;
  private authSubscription: Subscription;
  reactiveform : FormGroup;
  isManual : string= "";
  selectedEmpAdvanced : any[] =[];
  filteredEmp: any[] = [];
  empleados : any;
  selectedEmpId: number | null = null;
  selectedEmpCi: string | null = null;
  isReadonly: boolean=false;

  constructor(private service:InscripcionService , private serviceCapac: CapacitacionService,  private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private formErrorMessageService: FormErrorMessageService, private formatService: FormattingService , private router: Router, private authService: AuthService, private serviceEmp:EmpleadoService ) {
      this.isAddMode = false;
      this.authSubscription = this.authService.getUser().subscribe(auth => {
          this.auth = auth;
       });
      //this.auth = this.authService.getUser();
        //console.log("auth:", this.auth);
      this.reactiveform = this.fb.group({
        // id_capacitacion: new FormControl('', Validators.compose([Validators.required ]) ),
        // id_empleado: new FormControl('', Validators.compose([Validators.required ]) ),
        // activo: new FormControl('', Validators.compose([Validators.required ]) ),
      });

      this.traingdata = this.config.data;
      this.traing = this.traingdata.training;
      this.isManual = this.traingdata.isManual;      
    }

  ngOnInit(): void {

    //veerificar si es administrador

    if(this.traingdata.training!=null && this.traingdata.training!=''){
        //this.LoadEditData(this.data.traingcode);
        //dado el cod traing registrar inscripcion
        this.isAddMode = false;
        
    }
    if(this.isManual){
      
      this.reactiveform.addControl('id_empleado', this.fb.control('', Validators.compose([Validators.required ])) );
      this.reactiveform.addControl('nombre_completo', this.fb.control('', Validators.compose([Validators.required ])) );

      const params = { activo: "1", page:"", limit:"", nombre:'', id_capacitacion: this.traing.id };
      this.serviceEmp.getSearchInscripcionEmp(params).then(resp => {
        this.empleados = resp;        
      });
      
    }
    
  }

  SaveInscription() {
    if (!this.reactiveform.valid) {
      //this.notificationsService.notifications('No te olvides llenar los campos necesarios','warning','form');
      console.log("error--");
      return;

    }
    let data = this.bodyStructura(this.reactiveform.value );

    if(this.isManual){
      this.saveInscriptionManual(data);
    }else{
      this.saveInscription(data);
    }
  }

  saveInscriptionManual(data:any){
    this.service.saveInscriptionManual(data)
  .subscribe({
    next:(resp) =>{
      this.serviceCapac.saving.emit(true);
      //this.closeModal();
      this.closeDialog();
      //console.log(resp);
      Swal.fire({
        title: 'Éxito',
        text: 'Inscripción se ha registrado correctamente',
        icon:'success',
        showClass: { popup: 'animated animate fadeInDown' }
      });
      //this.router.navigate(['/login'])

    },
    error:(e) =>{
      console.log('Error', e);
      this.closeDialog();
      Swal.fire({
        title: `Ocurrio un imprevisto al registrar la inscripción`,
        text:e.error.errors[0].msg,
        icon:'error',
        showClass: { popup: 'animated animate fadeInDown' }
      });
    }
  });
  }
  
  saveInscription(data:any){
    this.service.saveInscription(data)
  .subscribe({
    next:(resp) =>{
      this.serviceCapac.saving.emit(true);
      //this.closeModal();
      this.closeDialog();
      //console.log(resp);
      Swal.fire({
        title: 'Éxito',
        text: 'Inscripción se ha registrado correctamente',
        icon:'success',
        showClass: { popup: 'animated animate fadeInDown' }
      });
      //this.router.navigate(['/login'])

    },
    error:(e) =>{
      console.log('Error', e);
      this.closeDialog();
      Swal.fire({
        title: `Alerta`,
        text:e.error.errors[0].msg,
        icon:'error',
        showClass: { popup: 'animated animate fadeInDown' }
      });
    }
  });
  }
  bodyStructura(form:any){
    let idEmp = this.isManual? form.id_empleado:this.auth?.emp.id;
    let estadoEmp = this.isManual? 'APROBADO':'PENDIENTE';
    let requestBody = null;
    if(this.isManual){
      requestBody = {
        id_capacitacion: this.traing.id ,
        id_empleado: idEmp,
        ci: this.selectedEmpCi,
        estado: estadoEmp,
        activo: "1",
      };
    }else{
      requestBody = {
        id_capacitacion: this.traing.id ,
        id_empleado: idEmp,
        estado: estadoEmp,
        activo: "1",
      };
    }
    

    return JSON.stringify (requestBody)
  }
  getErrorMessage(controlName: string): string {
    const control = this.reactiveform.get(controlName);
    if (control && control.errors) {
      const errorKey = Object.keys(control.errors)[0];
      const errorValue = control.errors[errorKey];
      return this.formErrorMessageService.getErrorMessage(errorKey, errorValue);
    }
    return '';
  }
  shouldShowError(controlName: string): boolean {
    const control = this.reactiveform.get(controlName);
    if(control)
      return control.invalid && (control.touched || control.dirty);
    return false;
  }
  closeDialog() {
    this.ref.close();
  }
  filterEmp(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < this.empleados.length; i++) {
      let emp = this.empleados[i];
      if (emp.nombre_completo.toLowerCase().includes(query.toLowerCase()) || emp.ci.toLowerCase().includes(query.toLowerCase()) ) {
        filtered.push(emp);
      }
    }
    this.filteredEmp = filtered;
    
  }
  seleccionarItem(result:any){

    this.selectedEmpId = result.id;
    this.selectedEmpCi = result.ci;
    //this.selectedCursosCodigo = result.codigo;
    this.isReadonly = true;
    //this.vaalue = result.nombre;

  }
  clearItem(){
    this.selectedEmpId = null;
    this.selectedEmpCi = null;
    //this.selectedCursosCodigo = null;
    this.isReadonly = false;
  }

}

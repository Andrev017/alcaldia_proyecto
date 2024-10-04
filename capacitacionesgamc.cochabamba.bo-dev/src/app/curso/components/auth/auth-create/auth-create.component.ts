import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import { UsuarioService } from 'src/app/curso/service/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-create',
  templateUrl: './auth-create.component.html',
  styleUrls: ['./auth-create.component.scss']
})
export class AuthCreateComponent {
  saveresponse: any;
  errormessage = '';
  errorclass = '';
  reactiveform : FormGroup;
  nombreEmpleado : any;

  private readonly emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private readonly numberPattern = /^\d+$/;
  private readonly ciPattern = /^\d+(?:-\d[A-Za-z])?$/;

  constructor( private builder: FormBuilder , private service: UsuarioService, private router: Router, private formErrorMessageService: FormErrorMessageService ) {

    this.reactiveform = this.builder.group({
      ci: this.builder.control('', Validators.compose([Validators.required,  Validators.pattern(this.ciPattern) ])  ),

    password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4) /*Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')*/ ])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.emailPattern)]))
    });


   }

  ngOnInit(){

  }



  saveEmployee(){
    if (this.reactiveform.valid) {
      let data = this.bodyStructuraUsuario(this.reactiveform.value);

      this.service.saveEmployeeUser(data)
    .subscribe({
      next:(resp) =>{
        //this.projectService.saving.emit(true);
        //this.closeModal();

        //console.log(resp);
        setTimeout(()=>{
          Swal.fire({
            title: 'Éxito',
            text: 'Usuario registrado correctamente',
            icon:'success',
            showClass: { popup: 'animated animate fadeInDown' }
          });
        },1000);
        this.router.navigate(['/auth'])

      },
      error:(e) =>{
        console.log('Error', e);
        //this.closeModal();
        Swal.fire({
          title: `Ocurrio un imprevisto al registrar el Usuario`,
          text:e.error.errors[0].msg,
          icon:'error',
          showClass: { popup: 'animated animate fadeInDown' }
        });

      }
    });

    } else {
      this.errormessage = "Please enter valid data";
      this.errorclass = "errormessage";
    }
  }

  bodyStructuraUsuario(form:any){
    const requestBody = {
      ci: form.ci.toString(),
      password: form.password,
      email: form.email,
      status:true
    };

    return JSON.stringify (requestBody)
  }

  subCancel(){
    this.router.navigate(['/auth'])
  }
  get ci() {
    return this.reactiveform.get("ci");
  }
  get name() {
    return this.reactiveform.get("name");
  }
  get email() {
    return this.reactiveform.get("email");
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
    //this.ref.close();
  }
  buscarNombre(event:any){
    console.log("empleado", );
    this.service.getEmpleadoPlanilla(event.target.value);
    // this.service.getEmpleadoPlanilla(event.target.value).subscribe(result => {
    //   this.nombreEmpleado = result;
    // });


  }

}

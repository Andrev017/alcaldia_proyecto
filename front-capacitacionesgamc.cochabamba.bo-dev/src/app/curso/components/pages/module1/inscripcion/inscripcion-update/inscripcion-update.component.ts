import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Inscripcion } from 'src/app/curso/api/inscripcion.model';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import { InscripcionService } from 'src/app/curso/service/inscripcion/inscripcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion-update',
  templateUrl: './inscripcion-update.component.html',
  styleUrls: ['./inscripcion-update.component.scss']
})
export class InscripcionUpdateComponent {

  tipo: string;
  capacdata: any;
  respdata: any;
  editdata: any;
  isAddMode: boolean;
  inscription : Inscripcion;
  reactiveform: FormGroup;

  isInputEnabled = false;
  public dataToEdit: any;

  constructor(private service:InscripcionService , private serviceTraing: CapacitacionService, private router: Router, private fb: FormBuilder, private formErrorMessageService: FormErrorMessageService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.dataToEdit = this.config.data;
    this.inscription = this.dataToEdit.inscription;
    this.tipo = this.dataToEdit.tipo;

      this.isAddMode = false;

      this.reactiveform =
      this.dataToEdit.tipo == 'approved'? this.fb.group({
        estado:  this.fb.control('', Validators.compose([ Validators.required ]) ),
        motivo_rechazo:  this.fb.control('',  Validators.compose([ Validators.required ]) ),
      }) :
          this.dataToEdit.tipo == 'asisttend'? this.fb.group({
            asistencia:  this.fb.control('', Validators.compose([ Validators.required ]) ),
      }) :
          this.fb.group({
            certificado:  this.fb.control('', Validators.compose([ Validators.required ]) ),
      });

    // this.reactiveform =
    //   this.dataToEdit.tipo == 'approved'? new FormGroup({
    //     estado:  new FormControl('', Validators.compose([ Validators.required ]) ),
    //     motivo_rechazo:  new FormControl('',  Validators.compose([ Validators.required ]) ),
    //   }) :
    //       this.dataToEdit.tipo == 'asisttend'? new FormGroup({
    //         asistencia:  new FormControl('', Validators.compose([ Validators.required ]) ),
    //   }) :
    //       new FormGroup({
    //         certificado:  new FormControl('', Validators.compose([ Validators.required ]) ),
    //   });

      // Subscribe to changes in the 'radioOption' form control
    // this.reactiveform.get('estado').valueChanges.subscribe((value) => {
    //   // Enable or disable the 'inputField' form control based on the selected radio option
    //   if (value === 'APROBADO') {
    //     this.reactiveform.get('motivo_rechazo').disable();
    //   } else {
    //     this.reactiveform.get('motivo_rechazo').enable();
    //   }
    // });

    }

  ngOnInit(): void {

    if(this.dataToEdit.tipo !=null && this.dataToEdit.tipo!=''){
      this.LoadUpdateData(this.dataToEdit.inscription, this.dataToEdit.tipo);
    }

    if(this.tipo == 'approved'){
      this.estado.valueChanges.subscribe(checked => {
        if (checked == 'APROBADO') {
          this.reactiveform.get('motivo_rechazo')?.reset();
          this.reactiveform.get('motivo_rechazo')?.disable();
          this.reactiveform.removeControl('motivo_rechazo');
          console.log("aprobado");

        } else {
          const validators = [ Validators.required ];
          this.reactiveform.addControl('motivo_rechazo', this.fb.control('', validators));
          //this.reactiveform.get('motivo_rechazo').enable();
        }
        this.reactiveform.updateValueAndValidity();
      });
    }

  }
  //habilitar input motivo rechazo
  // onRadioChange(value: string) {
  //   if(value == 'RECHAZADO'){
  //     this.isInputEnabled = true;
  //     this.reactiveform.get('motivo_rechazo').enable();
  //   } else {
  //     this.isInputEnabled = false;
  //     this.reactiveform.get('motivo_rechazo').disabled;
  //   }


  // }

  LoadUpdateData(inscription: Inscripcion, tipo:string) {

    this.editdata = inscription;
    if(tipo ==  'approved'){
      this.reactiveform.setValue({
        estado:this.editdata.estado,
        motivo_rechazo:this.editdata.motivo_rechazo
      })
    }
    if(tipo ==  'asisttend'){
      this.reactiveform.setValue({
        asistencia:this.editdata.asistencia,
      })
    }
    if(tipo ==  'certificate'){
      this.reactiveform.setValue({
        certificado:this.editdata.certificado,
      })
    }

    this.isAddMode = true;
  }

  updateInscripcion(){
    if (!this.reactiveform.valid) {
      //this.notificationsService.notifications('No te olvides llenar los campos necesarios','warning','form');
      console.log("error");
      return;
    }

    let data = this.bodyStructura(this.reactiveform.value, this.tipo);
    this.service.updateInscription(data, this.editdata.uuid, this.tipo )
    .subscribe({
      next:(resp) =>{
        this.serviceTraing.saving.emit(true);
        //this.closeModal();
        this.closeDialog();
        //console.log(resp);
        Swal.fire({
          title: 'Éxito',
          text: 'Aprobación de inscripcion se ha registrado correctamente',
          icon:'success',
          showClass: { popup: 'animated animate fadeInDown' }
        });
        //this.router.navigate(['/login'])

      },
      error:(e) =>{
        console.log('Error', e);
        this.closeDialog();
        Swal.fire({
          title: `Ocurrio un imprevisto al registrar`,
          text:e.error.errors[0].msg,
          icon:'error',
          showClass: { popup: 'animated animate fadeInDown' }
        });

      }
    });
  }

  bodyStructura(form:any, tipo:string){
    let requestBody= {};
    if(tipo == 'approved'){
      requestBody = {
        motivo_rechazo: form.estado == 'RECHAZADO'? form.motivo_rechazo:'' ,
        estado: form.estado,
      };
    }
    if(tipo == 'asisttend'){
      requestBody = {
        asistencia: form.asistencia ,
        //certificado: form.certificado ,
      };
    }
    if(tipo == 'certificate'){
      requestBody = {
        certificado: form.certificado ,
      };
    }


    return JSON.stringify (requestBody)
  }

  get estado() {
    return this.reactiveform.get('estado') as FormControl;
  }
  get motivo_rechazo() {
    return this.reactiveform.get('motivo_rechazo') as FormControl;
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

}

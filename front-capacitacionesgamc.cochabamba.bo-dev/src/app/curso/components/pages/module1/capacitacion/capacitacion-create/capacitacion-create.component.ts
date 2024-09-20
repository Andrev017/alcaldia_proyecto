import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import { FormattingService } from 'src/app/curso/service/util/formatting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-capacitacion-create',
  templateUrl: './capacitacion-create.component.html',
  styleUrls: ['./capacitacion-create.component.scss']
})
export class CapacitacionCreateComponent {

    cursoId: any;
  respdata: any;
  editdata: any;
  isAddMode: boolean;
  reactiveform : FormGroup;
  public dataToEdit: any;
  years: number[] = [];
  //gestion : Date = new Date() ;
  selectedDate: Date;

  constructor(private service:CapacitacionService ,private serviceCurso: CursoService, private router: Router, private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private formErrorMessageService: FormErrorMessageService, private formatService: FormattingService ) {
      this.isAddMode = false;

      this.reactiveform = this.fb.group({
        //codigo:  this.fb.control('', Validators.compose([Validators.required ]) ),
        gestion: this.fb.control('', Validators.compose([Validators.required ]) ),
        fecha:  this.fb.control('', Validators.compose([Validators.required, this.dateRangeValidator ], ) ),
        //fecha_fin: this.fb.control('', Validators.compose([Validators.required ]) ),
        horario_inicio: this.fb.control('', Validators.compose([Validators.required ])),
        horario_fin: this.fb.control('', Validators.compose([Validators.required ]) ),
        inst_organizadora: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5) ]) ),
        capacitador: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5) ]) ),
        direccion: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5) ]) ),
        carga_horaria: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3) ]) ),
        cupo: this.fb.control('', Validators.compose([Validators.required ]) ),
        //tipo: this.fb.control('', Validators.compose([Validators.required ]) ),
        visible: this.fb.control('', Validators.compose([Validators.required ]) ),
        //activo: this.fb.control('', Validators.compose([Validators.required ]) ),
      });

      const currentYear = new Date().getFullYear();    
      this.selectedDate = new Date(currentYear, 0, 1);

    this.dataToEdit = this.config.data;

  }
  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    let value = control.value;

    if (value && value[0] && value[1] && value[0] <= value[1]) {
      return null; // Rango válido
    } else {
      return { invalidRange: true }; // Rango no válido
    }
  }

  ngOnInit() {
    //this.loadDes();
    this.cursoId = this.dataToEdit.curcode;

    if(this.dataToEdit.traingcode!=null && this.dataToEdit.traingcode!=''){
      this.LoadEditData(this.dataToEdit.traingcode);
    }

      //selet gestion
      //this.gestion = new Date();
  }
//   loadDes() {
//     const params = { activo: "1"};
//     this.service.getTrainingParameter( params).subscribe(result => {
//       this.curdata = result;
//     });
//   }

  // reactiveform = new FormGroup({
  //   codigo: this.fb.control('', Validators.compose([Validators.required ]) ),
  //   nombre: this.fb.control('', Validators.compose([Validators.required ]) ),
  //   dirigido: this.fb.control('', Validators.compose([Validators.required ])),

  // });

  LoadEditData(code: any) {
    const params = { uuid: code, activo:"1" };

    this.service.getTrainingParameter(params).subscribe(item => {
      this.editdata = item;
      //console.log("edit:", item);
      let horaIni = "2023-01-01 "+  this.editdata.horario_inicio.toString() ;
      let horaFin = "2023-01-01 "+this.editdata.horario_fin.toString();
      let fecha1 = new Date(this.editdata.fecha_inicio);
      let fecha2 = new Date( this.editdata.fecha_fin);
      fecha1.setMinutes(fecha1.getMinutes() + fecha1.getTimezoneOffset())
      fecha2.setMinutes(fecha2.getMinutes() + fecha2.getTimezoneOffset())
      let fecha = [ fecha1, fecha2 ];
      
        this.reactiveform.setValue({
            //codigo:this.editdata.codigo,
            fecha: fecha,//new Date(this.editdata.fecha_inicio) +' - '+ new Date( this.editdata.fecha_fin) ,// new Intl.DateTimeFormat("es").format( new Date(this.editdata.fecha_inicio)), //formatDate(this.editdata.fecha_inicio, 'dd/MM/yyyy', 'en-GB'),
           // fecha_fin: new Date( this.editdata.fecha_fin), //new Intl.DateTimeFormat("es").format(new Date( this.editdata.fecha_fin) ), //formatDate(this.editdata.fecha_fin, 'dd/MM/yyyy', 'en-GB'),
            horario_inicio: new Date(horaIni), //formatDate(horaIni, 'H:mm:ss', 'en_GB'), //new Intl.DateTimeFormat("es").format(new Date( horaIni ) ),//this.editdata.horario_inicio,//formatDate(this.editdata.horario_inicio, 'H:mm:ss', 'en_US'),
            horario_fin: new Date(horaFin),//formatDate(horaFin, 'H:mm:ss', 'en_GB'), //new Intl.DateTimeFormat("es").format(new Date( horaFin ) ), //this.editdata.horario_fin, //formatDate(this.editdata.horario_fin, 'H:mm:ss', 'en_US'),
            inst_organizadora: this.editdata.inst_organizadora,
            capacitador: this.editdata.capacitador,
            direccion: this.editdata.direccion,
            carga_horaria: this.editdata.carga_horaria,
            cupo: this.editdata.cupo,
            //tipo: this.editdata.tipo,
            visible: this.editdata.visible,
            //activo: this.editdata.activo,
            gestion: formatDate("01/01/"+this.editdata.gestion, 'yyyy' ,'en-GB'),//formatDate(new Date('01/01/'+this.editdata.gestion), 'dd/MM/yyyy', 'en_US'),// this.editdata.gestion
          })
     });
    this.isAddMode = true;
  }

  SaveTraing() {

    if (!this.isAddMode) {
      this.createTraing();
    } else {
        this.updateTraing();
    }


  }
  createTraing(){

    if (!this.reactiveform.valid) {
      //this.notificationsService.notifications('No te olvides llenar los campos necesarios','warning','form');
      console.log("error");
      return;

    }

    const data = this.bodyStructura(this.reactiveform.value, 1,true);

    this.service.saveTraining(data)
    .subscribe({
      next:(resp) =>{
        this.service.saving.emit(true);
        //this.closeModal();
        //this.dialogRef.close();
        //console.log(resp);
        this.closeDialog(); // Close the dialog after form submission
        Swal.fire({
          title: 'Éxito',
          text: 'La capacitación se ha registrado correctamente',
          icon:'success',
          showClass: { popup: 'animated animate fadeInDown' }
        });
        //this.router.navigate(['/login'])

      },
      error:(e) =>{
        console.log('Error', e);
        this.closeDialog();
        Swal.fire({
          title: `Ocurrio un imprevisto al registrar capacitación`,
          text:e.error.errors[0].msg,
          icon:'error',
          showClass: { popup: 'animated animate fadeInDown' }
        });

      }
    });

  }
  updateTraing(){
    if (!this.reactiveform.valid) {
      //this.notificationsService.notifications('No te olvides llenar los campos necesarios','warning','form');
      console.log("error");
      return;
    }

    let data = this.bodyStructura(this.reactiveform.value, 1,false);
    this.service.updateTraining(data, this.editdata.uuid )
    .subscribe({
      next:(resp) =>{
        this.service.saving.emit(true);
        //this.closeModal();
        //this.dialogRef.close();
        //console.log(resp);
        this.closeDialog();
        Swal.fire({
          title: 'Éxito',
          text: 'La capacitación registrado correctamente',
          icon:'success',
          showClass: { popup: 'animated animate fadeInDown' }
        });
        //this.router.navigate(['/login'])

      },
      error:(e) =>{
        console.log('Error', e);
        //this.closeModal();
        this.closeDialog();
        Swal.fire({
          title: `Ocurrio un imprevisto al registrar el Usuario`,
          text:e.error.errors[0].msg,
          icon:'error',
          showClass: { popup: 'animated animate fadeInDown' }
        });

      }
    });
  }

  bodyStructura(form:any, activo:number, isNew:boolean){
    let dates = form.fecha;
    const requestBody = {
        //codigo: form.codigo ,
        fecha_inicio:  this.formatService.formatDate(dates[0], 'F'),//isNew? this.formatService.formatDate(form.fecha_inicio, 'F'):  this.formatService.formatDate( this.formatService.createDate(form.fecha_inicio) , 'F') , //formatDate(form.fecha_inicio, 'yyyy-MM-dd', 'en_US'),
        fecha_fin: this.formatService.formatDate( dates[1] , 'F'),//isNew? this.formatService.formatDate(form.fecha_fin, 'F'):  this.formatService.formatDate( this.formatService.createDate(form.fecha_fin) , 'F'),//this.datePipe.transform(form.fecha_fin, 'yyyy-MM-dd'), //formatDate(form.fecha_fin, 'yyyy-MM-dd', 'en_US'),
        horario_inicio: this.formatService.formatDate(form.horario_inicio, 'H'),//isNew? this.formatService.formatDate(form.horario_inicio, 'H'): this.formatService.formatDate( this.formatService.createTime(form.horario_inicio) , 'F'), // formatDate(form.horario_inicio, 'HH:mm:ss', 'en_US'),
        horario_fin: this.formatService.formatDate(form.horario_fin, 'H'),//isNew? this.formatService.formatDate(form.horario_fin, 'H'):this.formatService.formatDate( this.formatService.createTime(form.horario_inicio) , 'F'), // formatDate(form.horario_fin, 'HH:mm:ss', 'en_US'),
        inst_organizadora: form.inst_organizadora ,
        capacitador: form.capacitador ,
        direccion: form.direccion ,
        carga_horaria: form.carga_horaria ,
        cupo: form.cupo ,
        tipo: 'INTERNO' ,
        visible: form.visible ,
        activo: activo ,
        id_curso: this.cursoId,
        gestion: this.formatService.formatDate(form.gestion, 'A'),//isNew? this.formatService.formatDate(form.gestion, 'yyyy'): this.formatService.formatDate( this.formatService.createDate() , 'F'), //`${form.gestion.getFullYear()}`,
      };
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
  
}

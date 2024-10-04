import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CriterioEvaService } from 'src/app/curso/service/criterioEva/criterio-eva.service';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import { TipoEvaService } from 'src/app/curso/service/tipoEva/tipo-eva.service';
import { FormattingService } from 'src/app/curso/service/util/formatting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterioeva-create',
  templateUrl: './criterioeva-create.component.html',
  styleUrls: ['./criterioeva-create.component.scss']
})
export class CriterioevaCreateComponent {

  criterioEveId: any;
  respdata: any;
  editdata: any;
  isAddMode: boolean;
  reactiveform : FormGroup;
  public dataToEdit: any;
  years: number[] = [];
  tipoeve : any;
  filteredTipoeve: any[] = [];
  selectedTipoEveId: number | null = null;
  selectedTipoEveAdvanced: any;

  constructor(private service:CriterioEvaService , private serviceTipoEva: TipoEvaService, private router: Router, private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private formErrorMessageService: FormErrorMessageService, private formatService: FormattingService ) {
    this.isAddMode = false;

    this.reactiveform = this.fb.group({
      nombre_tipo:  this.fb.control('', Validators.compose([Validators.required ]) ),
      id_tipo_evaluacion: this.fb.control('', Validators.compose([]) ),
      nombre_criterio: this.fb.control('', Validators.compose([Validators.required ]) ),
      activo: this.fb.control('', Validators.compose([Validators.required ]) ),
    });
    

    this.dataToEdit = this.config.data;
    
  }
  ngOnInit() {
    //this.loadDes();
    this.criterioEveId = this.dataToEdit.code;

    if(this.criterioEveId!=null && this.criterioEveId!=''){
      this.LoadEditData(this.dataToEdit.code);
    }

    const params = { activo: "1", page:"", limit:"", nombre:'' };
    this.serviceTipoEva.getSearchAllTipoEve(params).then(tip => {
      this.tipoeve = tip;
      
    });

  }
  LoadEditData(code: any) {
    const params = { uuid: code, activo:"1" };

    this.service.getCriterioEvaParameter(params).subscribe(item => {
      this.editdata = item;
        this.reactiveform.setValue({
            nombre_tipo:this.editdata.criterio_tipo.nombre,
            id_tipo_evaluacion: this.editdata.criterio_tipo.id,
            nombre_criterio: this.editdata.nombre,
            activo: this.editdata.activo,            
          });
        this.selectedTipoEveAdvanced = {'id':this.editdata.criterio_tipo.id, 'nombre':this.editdata.criterio_tipo.nombre};
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

    const data = this.bodyStructura(this.reactiveform.value);

    this.service.saveTipoCriterioEva(data)
    .subscribe({
      next:(resp) =>{
        this.service.saving.emit(true);
        //this.closeModal();
        //this.dialogRef.close();
        //console.log(resp);
        this.closeDialog(); // Close the dialog after form submission
        Swal.fire({
          title: 'Éxito',
          text: 'El criterio y tipo de evaluación se ha registrado correctamente',
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

    let data = this.bodyStructura(this.reactiveform.value);
    this.service.updateTipoCriterioEva(data, this.editdata.uuid )
    .subscribe({
      next:(resp) =>{
        this.service.saving.emit(true);
        //this.closeModal();
        //this.dialogRef.close();
        //console.log(resp);
        this.closeDialog();
        Swal.fire({
          title: 'Éxito',
          text: 'El criterio de evaluación se ha registrado correctamente',
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

  bodyStructura(form:any){
    let nombre =  form.nombre_tipo.nombre ? form.nombre_tipo.nombre: form.nombre_tipo
    const requestBody = {
        nombre_tipo: nombre,
        id_tipo_evaluacion: form.id_tipo_evaluacion,
        nombre_criterio: form.nombre_criterio ,
        activo: form.activo,        
      };
    return JSON.stringify (requestBody)
  }

  // get codigo() {
  //   return this.reactiveform.get("codigo");
  // }
  // get nombre() {
  //   return this.reactiveform.get("nombre");
  // }
  // get dirigido() {
  //   return this.reactiveform.get("dirigido");
  // }

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
  filterTipoEva(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.tipoeve.length; i++) {
      let tip = this.tipoeve[i];
      if (tip.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tip);
      }
    }

    this.filteredTipoeve = filtered;
  }
  seleccionarItem(result:any){
    this.selectedTipoEveId = result.id;    
  }
  clearItem(){
    this.selectedTipoEveId = null;    
  }
}

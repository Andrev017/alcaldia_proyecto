import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import { FormattingService } from 'src/app/curso/service/util/formatting.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursosCreateComponent } from '../../cursos/cursos-create/cursos-create.component';
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-capacitacion-externa',
  templateUrl: './capacitacion-externa.component.html',
  styleUrls: ['./capacitacion-externa.component.scss']
})
export class CapacitacionExternaComponent {
  empleadoId: any;
  cursoId: any;
  respdata: any;
  editdata: any;
  isAddMode: boolean;
  reactiveform : FormGroup;
  public dataToEdit: any;
  years: number[] = [];
  idEmpleado : number = 0;

  //variables search
  searchResults: any[] = [];
  selectedCursoId: number | null = null;
  cursos : any;
  cursoMax : any;
  codigoMax : string = "";
  filteredCursos: any[] = [];
  selectedCursosAdvanced: any[] = [];
  selectedCursosCodigo: string | null = null;
  isReadonly: boolean=false;
  uploadedFile: any ;
  selectedDate: Date;
  
  constructor(private service:CapacitacionService ,private serviceCurso: CursoService, private router: Router, private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private formErrorMessageService: FormErrorMessageService, private formatService: FormattingService, public dialogService: DialogService ) {
    this.isAddMode = false;

    this.reactiveform = this.fb.group( {
      id_curso:  this.fb.control('' ),      
      nombre:  this.fb.control('', Validators.compose([Validators.required ]) ),      
      //codigo:  this.fb.control('', Validators.compose([]) ),      
      gestion: this.fb.control('', Validators.compose([Validators.required ]) ),
      fecha:  this.fb.control('', Validators.compose([Validators.required, this.dateRangeValidator ]) ),
      // fecha_fin: this.fb.control('', Validators.compose([Validators.required ]) ),
      //horario_inicio: this.fb.control('', Validators.compose([Validators.required ])),
      //horario_fin: this.fb.control('', Validators.compose([Validators.required ]) ),
      inst_organizadora: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5) ]) ),
      //capacitador: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5) ]) ),
      //direccion: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5) ]) ),
      carga_horaria: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3) ]) ),
      //file: this.fb.control(null, Validators.compose([Validators.required ]) ),

    } );
    
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
    this.empleadoId = this.dataToEdit.id_empleado;
    // if(this.dataToEdit.traingcode!=null && this.dataToEdit.traingcode!=''){
    //   this.LoadEditData(this.dataToEdit.traingcode);
    // }

      //selet gestion
      //this.gestion = new Date();
    const params = { activo: "1", page:"", limit:"", nombre:'' };
    this.serviceCurso.getSearchAllCurso(params).then(cur => {
      this.cursos = cur;
      
    });

  //   this.countryService.getCountries().then(countries => {
  //     this.countries = countries;
  // });
      
  }
  createTraing(){

    if (!this.reactiveform.valid) {
      //this.notificationsService.notifications('No te olvides llenar los campos necesarios','warning','form');
      console.log("error");
      return;

    }

    const data = this.bodyStructura(this.reactiveform.value, 1,true);

    this.service.saveTrainingExternal(data, this.uploadedFile )
    .subscribe({
      next:(resp) =>{
        this.service.saving.emit(true);
        //this.closeModal();
        //this.dialogRef.close();
        //console.log(resp);
        this.closeDialog(); // Close the dialog after form submission
        Swal.fire({
          title: 'Éxito',
          text: 'Proyecto registrado correctamente',
          icon:'success',
          showClass: { popup: 'animated animate fadeInDown' }
        });
        //this.router.navigate(['/login'])

      },
      error:(e) =>{
        console.log('Error', e);
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
  
  bodyStructura(form:any, activo:any, isNew:boolean){
    let dates = form.fecha;
    const formData = new FormData();
        formData.append('file', this.uploadedFile);  
        formData.append('id_curso', form.id_curso);
        formData.append('nombre', form.nombre);
        formData.append('fecha_inicio',  this.formatService.formatDate(dates[0], 'F'));
        formData.append('fecha_fin', this.formatService.formatDate( dates[1] , 'F'));
        //formData.append('horario_inicio', this.formatService.formatDate(form.horario_inicio, 'H'));
        //formData.append('horario_fin', this.formatService.formatDate(form.horario_fin, 'H'));
        formData.append('inst_organizadora', form.inst_organizadora );
        //formData.append('capacitador', form.capacitador);
        //formData.append('direccion', form.direccion);
        formData.append('carga_horaria', form.carga_horaria);
        formData.append('activo', activo );
        formData.append('gestion', this.formatService.formatDate(form.gestion, 'A'));
        formData.append('nombre_archivo', form.nombre_archivo);
        //formData.append('url_archivo', '9');
        formData.append('id_empleado', this.empleadoId);

    return formData;
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
  // openNewCurso(code:any){
  //   this.ref = this.dialogService.open(CursosCreateComponent, {
  //     header: 'Nuevo Curso',
  //     width: '30%',
  //     contentStyle: { overflow: 'auto' },
  //     baseZIndex: 10000,
  //     maximizable: true,
  //     data: code,
  //   });
    
  //   this.ref.onMaximize.subscribe((value) => {
  //       //this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
  //   });
  // }
  //busqueda nombre curso
  realizarBusqueda(event : any) {
    //const params = { activo: "1", page:"", limit:"", nombre: event.query };
    
    // this.serviceCurso.getSearchAllCurso(params).subscribe(results => {
    //   this.searchResults = results;
    // });

  }
  filterCursos(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cursos.length; i++) {
      let cur = this.cursos[i];
      if (cur.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(cur);
      }
    }

    this.filteredCursos = filtered;
  }

 

  seleccionarItem(result:any){

    this.selectedCursoId = result.id;
    //this.selectedCursosCodigo = result.codigo;
    this.isReadonly = true;
    //this.vaalue = result.nombre;

  }
  clearItem(){
    this.selectedCursoId = null;
    //this.selectedCursosCodigo = null;
    this.isReadonly = false;
  }
  onFileSelect(event: any) {
    if (event.files.length > 0) {
      this.uploadedFile = event.files[0];
      //this.uploadedFile = event.target.file[0];
      console.log(event.files[0]);
    }
  }
}

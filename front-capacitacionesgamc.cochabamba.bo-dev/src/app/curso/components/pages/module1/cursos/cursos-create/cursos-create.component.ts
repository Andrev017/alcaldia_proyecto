import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cursos-create',
    templateUrl: './cursos-create.component.html',
    styleUrls: ['./cursos-create.component.scss'],
})
export class CursosCreateComponent implements OnInit {
    cursoMax: any;
    respdata: any;
    editdata: any;
    isAddMode: boolean;
    reactiveform: FormGroup;
    public dataToEdit: any;
    codigoMax: string = '';

    constructor(
        private service: CursoService,
        private router: Router,
        private fb: FormBuilder,
        private formErrorMessageService: FormErrorMessageService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.isAddMode = false;

        this.reactiveform = this.fb.group({
            //codigo: this.fb.control('', Validators.compose([Validators.required ]) ),
            nombre: this.fb.control(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                ])
            ),
            contenido: this.fb.control(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(10),
                ])
            ),
            dirigido: this.fb.control(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                ])
            ),
        });

        this.dataToEdit = this.config.data;
    }

    ngOnInit() {
        this.loadDesMaxCode();
        if (this.dataToEdit != null && this.dataToEdit != '') {
            this.LoadEditData(this.dataToEdit);
        }
    }
    loadDesMaxCode() {
        const params = { activo: '1', orden: 'DESC' };
        this.service.getCursoParameter(params).subscribe((result) => {
            this.cursoMax = result;
            if (this.cursoMax) {
                let curArray = this.cursoMax.codigo.split('C');
                //console.log(curArray);
                let num = parseInt(curArray[1]) + 1;
                this.codigoMax = 'C' + num;
            } else {
                this.codigoMax = 'C' + 1;
            }
        });
    }

    LoadEditData(code: any) {
        const params = { uuid: code, activo: '1' };

        this.service.getCursoParameter(params).subscribe((item) => {
            //console.log("edit:", item);
            this.editdata = item;
            this.codigoMax = this.editdata.codigo;
            this.reactiveform.setValue({
                nombre: this.editdata.nombre,
                contenido: this.editdata.contenido,
                dirigido: this.editdata.dirigido,
            });
        });
        this.isAddMode = true;
    }

    SaveCurso() {
        if (!this.isAddMode) {
            this.createCurso();
        } else {
            this.updateCurso();
        }
    }
    createCurso() {
        if (!this.reactiveform.valid) {
            //this.notificationsService.notifications('No te olvides llenar los campos necesarios','warning','form');
            console.log('error');
            return;
        }
        const data = this.bodyStructura(this.reactiveform.value);
        this.service.saveCurso(data).subscribe({
            next: (resp) => {
                this.service.saving.emit(true);
                this.closeDialog(); // Close the dialog after form submission
                Swal.fire({
                    title: 'Éxito',
                    text: 'Proyecto registrado correctamente',
                    icon: 'success',
                    showClass: { popup: 'animated animate fadeInDown' },
                });
            },
            error: (e) => {
                console.log('Error', e);
            },
        });
    }
    updateCurso() {
        if (!this.reactiveform.valid) {
            console.log('error');
            return;
        }

        let data = this.bodyStructura(this.reactiveform.value);
        this.service.updateCurso(data, this.editdata.uuid).subscribe({
            next: (resp) => {
                this.service.saving.emit(true);
                this.closeDialog();
                Swal.fire({
                    title: 'Éxito',
                    text: 'Proyecto registrado correctamente',
                    icon: 'success',
                    showClass: { popup: 'animated animate fadeInDown' },
                });
            },
            error: (e) => {
                console.log('Error', e);
                this.closeDialog();
                Swal.fire({
                    title: `Ocurrio un imprevisto al registrar el Usuario`,
                    text: e.error.errors[0].msg,
                    icon: 'error',
                    showClass: { popup: 'animated animate fadeInDown' },
                });
            },
        });
    }

    bodyStructura(form: any) {
        if (!this.isAddMode) {
            this.loadDesMaxCode();
            return JSON.stringify({
                nombre: form.nombre,
                contenido: form.contenido,
                dirigido: form.dirigido,
                codigo: this.codigoMax,
            });
        } else {
            return JSON.stringify({
                nombre: form.nombre,
                dirigido: form.dirigido,
            });
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.reactiveform.get(controlName);
        if (control && control.errors) {
            const errorKey = Object.keys(control.errors)[0];
            const errorValue = control.errors[errorKey];
            return this.formErrorMessageService.getErrorMessage(
                errorKey,
                errorValue
            );
        }
        return '';
    }
    shouldShowError(controlName: string): boolean {
        const control = this.reactiveform.get(controlName);
        if (control)
            return control.invalid && (control.touched || control.dirty);
        return false;
    }
    closeDialog() {
        this.ref.close();
    }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Resap } from 'src/app/curso/api/resap.model';
import { TipoEvaluacion } from 'src/app/curso/api/tipoEva.model';
import { CapacitacionService } from 'src/app/curso/service/capacitacion/capacitacion.service';
import { CriterioEvaService } from 'src/app/curso/service/criterioEva/criterio-eva.service';
import { FormErrorMessageService } from 'src/app/curso/service/formErrorMessage/form-error-message.service';
import { ResapService } from 'src/app/curso/service/resap/resap.service';
import { TipoEvaService } from 'src/app/curso/service/tipoEva/tipo-eva.service';
import { FormattingService } from 'src/app/curso/service/util/formatting.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-resap-create',
    templateUrl: './resap-create.component.html',
    styleUrls: ['./resap-create.component.scss'],
    
})
export class ResapCreateComponent {
    reactiveform: FormGroup;
    isAddMode: boolean;
    traing: any;
    tipoCriterio: TipoEvaluacion[] = [];
    listResap: Resap[] = [];
    calific: string[] = ['MUY BUENO', 'BUENO', 'ACEPTABLE', 'DEFICIENTE'];

    constructor(
        private serviceResap: ResapService,
        private router: Router,
        private fb: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private formErrorMessageService: FormErrorMessageService,
        private formatService: FormattingService,
        public dialogService: DialogService,
        private serviceTipoEva: TipoEvaService,
        private serviceCapacity: CapacitacionService
    ) {
        this.isAddMode = false;

        this.reactiveform = this.fb.group({
            //radioOptions: this.fb.array([]),
            //selectedOption: ['option1'],
            //codigo:  this.fb.control('', Validators.compose([Validators.required ]) ),
        });

        this.traing = this.config.data;
    }
    ngOnInit() {
        this.listaTipoCriterio();
    }
    listaTipoCriterio() {
        const params = {
            activo: '1',
            page: '',
            limit: '',
            nombretipo: 'CUMPLIMIENTO DE OBJETIVO DE GESTIÓN',
        };

        this.serviceTipoEva.getTipoEveAllParameter(params).subscribe({
            next: (resp) => {
                this.tipoCriterio = resp;
                this.loadData();
            },
            error: (e) => {},
        });
    }
    loadData() {
        for (let tipo of this.tipoCriterio) {
            if (tipo.tipo_criterio)
                for (let criterio of tipo.tipo_criterio) {
                    let radiob = 'criterio' + criterio.id;
                    this.reactiveform.addControl(radiob, this.fb.control(''));
                }
        }
        //this.verificarRegistro()
    }
    verificarRegistro() {
        const params = {
            activo: '1',
            page: '',
            limit: '',
            id_inscripcion: this.traing.capacitacion_inscripcion[0].id,
        };
        this.serviceResap.getResapAllParameter(params).subscribe({
            next: (resp) => {
                this.listResap = resp;
                if (this.listResap.length > 0) {
                    this.loadResapForm();
                    this.isAddMode = false;
                } else {
                    this.isAddMode = true;
                }
            },
            error: (e) => {},
        });
    }
    loadResapForm() {
        for (let criterio of this.listResap) {
            const radiob = 'criterio' + criterio.id_criterio_evaluacion;
            this.reactiveform.get(radiob)?.setValue(criterio.estado);
        }
        //console.log("hola",this.listResap);
    }
    SaveResap() {
        //if (!this.isAddMode) {
        this.createTraing();
        //} else {
        //this.updateTraing();
        //}
    }
    createTraing() {
        // if (!this.reactiveform.valid) {
        //   //this.notificationsService.notifications('No te olvides llenar los campos necesarios','warning','form');
        //   console.log("error");
        //   return;

        // }

        const data = this.bodyStructura(this.reactiveform.value, 1, true);

        this.serviceResap.saveResap(data).subscribe({
            next: (resp) => {
                this.serviceCapacity.saving.emit(true);
                //this.closeModal();
                //this.dialogRef.close();
                //console.log(resp);
                this.closeDialog(); // Close the dialog after form submission
                Swal.fire({
                    title: 'Éxito',
                    text: 'El registro de RESAP se ha registrado correctamente',
                    icon: 'success',
                    showClass: { popup: 'animated animate fadeInDown' },
                });
                //this.router.navigate(['/login'])
            },
            error: (e) => {
                console.log('Error', e);
                this.closeDialog();
                Swal.fire({
                    title: `Ocurrio un imprevisto al registrar RESAP`,
                    text: e.error.errors[0].msg,
                    icon: 'error',
                    showClass: { popup: 'animated animate fadeInDown' },
                });
            },
        });
    }
    bodyStructura(form: any, activo: number, isNew: boolean) {
        let resap = [];

        for (let tipo of this.tipoCriterio) {
            if (tipo.tipo_criterio)
                for (let criterio of tipo.tipo_criterio) {
                    let radiob = 'criterio' + criterio.id;
                    let valor = this.reactiveform.get(radiob)?.value;
                    resap.push({
                        id_inscripcion:
                            this.traing.capacitacion_inscripcion[0].id,
                        id_criterio_evaluacion: criterio.id,
                        estado: valor,
                    });
                }
        }
        const requestBody = {
            tipo: 'coleccion',
            resap: resap,
        };
        //console.log(requestBody);
        return JSON.stringify(requestBody);
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

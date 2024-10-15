import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module1RoutingModule } from './module1-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
//import { MiscDemoRoutingModule } from 'src/app/demo/components/uikit/misc/miscdemo-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ScrollTopModule } from 'primeng/scrolltop';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosListComponent } from './cursos/cursos-list/cursos-list.component';
import { CursosCreateComponent } from './cursos/cursos-create/cursos-create.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
//import { TableDemoRoutingModule } from 'src/app/demo/components/uikit/table/tabledemo-routing.module';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { CapacitacionListComponent } from './capacitacion/capacitacion-list/capacitacion-list.component';
import { CapacitacionCreateComponent } from './capacitacion/capacitacion-create/capacitacion-create.component';
import { AclaratorioCapacitacionComponent } from './share/aclaratorio-capacitacion/aclaratorio-capacitacion.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { InscripcionListComponent } from './inscripcion/inscripcion-list/inscripcion-list.component';
import { InscripcionCreateComponent } from './inscripcion/inscripcion-create/inscripcion-create.component';
import { InscripcionUpdateComponent } from './inscripcion/inscripcion-update/inscripcion-update.component';
import { InfoTraingComponent } from './share/info-traing/info-traing.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { FuncionarioListComponent } from './funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioCreateComponent } from './funcionario/funcionario-create/funcionario-create.component';
import { CapacitacionEmpComponent } from './capacitacion/capacitacion-emp/capacitacion-emp.component';
import { CapacitacionExternaComponent } from './capacitacion/capacitacion-externa/capacitacion-externa.component';
import { CapacitacionVerComponent } from './capacitacion/capacitacion-ver/capacitacion-ver.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ResapComponent } from './resap/resap.component';
import { ResapListComponent } from './resap/resap-list/resap-list.component';
import { ResapCreateComponent } from './resap/resap-create/resap-create.component';
import { CriterioEvaluacionComponent } from './criterio-evaluacion/criterio-evaluacion.component';
//import { CriterioevaListComponent } from './criterioEvaluacion/criterioeva-list/criterioeva-list.component';
import { CriterioevaCreateComponent } from './criterio-evaluacion/criterioeva-create/criterioeva-create.component';
import { CriterioevaListComponent } from './criterio-evaluacion/criterioeva-list/criterioeva-list.component';
import { DividerModule } from 'primeng/divider';
import { CriterioevaFormComponent } from './criterio-evaluacion/criterioeva-form/criterioeva-form.component';
import { InscripcionEmpComponent } from './inscripcion/inscripcion-emp/inscripcion-emp.component';
import { InfoCapacitacionComponent } from './share/info-capacitacion/info-capacitacion.component';
import { TreeModule } from 'primeng/tree';
import { CardModule } from 'primeng/card';
import { TituloPageComponent } from './share/titulo-page/titulo-page.component';
import { Resap37Component } from './resap/resap37/resap37.component';
import { Resap33Component } from './resap/resap33/resap33.component';
import { ModalResap33Component } from './resap/modal-resap33/modal-resap33.component';
import { SolicitudesLlenadasComponent } from './solicitudes-llenadas/solicitudes-llenadas.component';
import { GeneracionGraficoComponent } from './resap/generacion-grafico/generacion-grafico.component';


@NgModule({
  declarations: [
    HomeComponent,
    CursosComponent,
    CursosListComponent,
    CursosCreateComponent,
    CapacitacionComponent,
    CapacitacionListComponent,
    CapacitacionCreateComponent,
    AclaratorioCapacitacionComponent,
    InscripcionComponent,
    InscripcionListComponent,
    InscripcionCreateComponent,
    InscripcionUpdateComponent,
    InfoTraingComponent,
    FuncionarioComponent,
    FuncionarioListComponent,
    FuncionarioCreateComponent,
    CapacitacionEmpComponent,
    CapacitacionExternaComponent,
    CapacitacionVerComponent,
    ResapComponent,
    ResapListComponent,
    ResapCreateComponent,
    CriterioEvaluacionComponent,
    CriterioevaListComponent,
    CriterioevaCreateComponent,
    CriterioevaFormComponent,
    InscripcionEmpComponent,
    InfoCapacitacionComponent,
    TituloPageComponent,
    Resap37Component,
    Resap33Component,
    ModalResap33Component,
    SolicitudesLlenadasComponent,
    GeneracionGraficoComponent,
  ],
  imports: [
    CommonModule,
    Module1RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    DropdownModule,
		ProgressBarModule,
		ToastModule,
    //TableDemoRoutingModule,
		RatingModule,
		ButtonModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    FieldsetModule,
    AutoCompleteModule,
    CalendarModule,
    RadioButtonModule,
    ChipModule,
    OverlayPanelModule,
    DividerModule,
    TreeModule,
    CardModule,
    // MiscDemoRoutingModule,
		// ProgressBarModule,
		// BadgeModule,
		// AvatarModule,
		// ScrollPanelModule,
		// TagModule,
		// ChipModule,
		// ButtonModule,

		//AvatarGroupModule,
		//ScrollTopModule
  ]

})
export class Module1Module { }

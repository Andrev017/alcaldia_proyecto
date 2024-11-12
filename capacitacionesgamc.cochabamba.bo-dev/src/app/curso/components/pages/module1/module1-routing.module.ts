import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { CriterioEvaluacionComponent } from './criterio-evaluacion/criterio-evaluacion.component';
import { ResapListComponent } from './resap/resap-list/resap-list.component';
import { Resap33Component } from './resap/resap33/resap33.component';
import { SolicitudesLlenadasComponent } from './solicitudes-llenadas/solicitudes-llenadas.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'cursos/capacitacion', component: CapacitacionComponent },
    { path: 'capacitacion', component: CapacitacionComponent },
    { path: 'capacitacion/usuario', component: CapacitacionComponent },
    { path: 'capacitacion/inscription', component: InscripcionComponent },
    { path: 'funcionario', component: FuncionarioComponent },
    { path: 'empleado/capacitacion', component: CapacitacionComponent },
    { path: 'criterio_evaluacion', component: CriterioEvaluacionComponent },
    { path: 'prueba', component: ResapListComponent },
    { path: 'resap33', component: Resap33Component },
    { path: 'solicitudes_llenadas', component: SolicitudesLlenadasComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Module1RoutingModule {}

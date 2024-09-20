import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  // {
  //   path:'',
  //   pathMatch:'full',
  //   redirectTo: 'capacitacion'
  // },
  {
    path:'capacitacion',
    
    loadChildren: () => import('./module1/module1.module').then(m=>m.Module1Module)
  },
  {
    path: '**', redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

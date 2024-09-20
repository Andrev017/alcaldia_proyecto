import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthCreateComponent } from './auth-create/auth-create.component';


const routes: Routes =[

  {
    path:'', component: AuthLoginComponent
  },
  {
    path:'register', component: AuthCreateComponent
  },  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

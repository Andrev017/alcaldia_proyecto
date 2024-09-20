import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/curso/service/auth/auth.service';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {

  reactiveform : FormGroup;
  mensajeError : string='';
  // form = new FormGroup({
  //   ci: new FormControl(null, Validators.required),
  //   password: new FormControl(null, Validators.required),
  // });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 

    this.reactiveform = this.fb.group({
      ci: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      
    });

  }

  submitForm(){
    //console.log(this.user);
    this.authService
      .singin(this.reactiveform.get('ci')?.value, this.reactiveform.get('password')?.value)
      .subscribe({
        next:(resp) =>{
          this.router.navigate(['/capacitacion/home']);
        },
        error:(e) =>{
          if (e.status === 401) {
            // Unauthorized: handle authentication error here
            console.error('Authentication error:', e);
            this.mensajeError = e.error.errors[0].msg;
          } else {
            // Handle other errors
            console.error('Other error:', e);
          }

        }
      }        
      );
      //.singin('', '')
      //.subscribe((response) => { this.router.navigate(['/capacitacion/home'])} );

    //this.auth.checkTocken();
    /*this.auth.singin(this.user.ci, this.user.password).subscribe( (res:any) => {
      console.log(res);
      localStorage.setItem('token',res.token);
      //this.router.navigate(['private']);
    })*/
    
  }
  subRegister(){
    this.router.navigate(['auth/register'])
  }


}

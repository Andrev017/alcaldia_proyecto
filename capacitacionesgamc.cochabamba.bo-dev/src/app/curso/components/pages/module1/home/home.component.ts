import { Component } from '@angular/core';
import { Empleado } from '../../../../api/empleado.model';
import { AuthResponse } from '../../../../api/auth.model';
import { Subscription } from 'rxjs';
import { EmpleadoService } from '../../../../service/empleado/empleado.service';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public auth: any; //AuthResponse ;
    private userSubscription: Subscription;

    constructor(
        private serviceEmp: EmpleadoService,
        private authService: AuthService
    ) {
        //this.empleados = ;
        //this.id_empleado = localStorage.getItem('clientId');

        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth;
        });
    }

    ngOnInit(): void {
        //console.log('empleado',this.user);
        /*this.userService.getEmpReposParameter( this.user.uuid , '1' ).
    subscribe( (respuesta) =>{ 
      this.empleados = respuesta;      
    }
    );
    */
    }
}

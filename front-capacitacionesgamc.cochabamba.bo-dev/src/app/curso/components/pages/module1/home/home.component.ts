import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpleadoService } from '../../../../service/empleado/empleado.service';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  public auth: any;
  private userSubscription: Subscription;

  constructor(
    private serviceEmp: EmpleadoService, 
    private authService: AuthService 
  ){ 
    
    this.userSubscription = this.authService.getUser().subscribe(auth => {
      
      this.auth = auth;
    });
    
  }

  ngOnInit(): void {
    
  }


}

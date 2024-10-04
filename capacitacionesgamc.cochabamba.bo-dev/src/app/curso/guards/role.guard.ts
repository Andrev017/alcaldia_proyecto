import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    public router: Router
    ){}

  canActivate(route: ActivatedRouteSnapshot):  boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem(this.authService.getAccessToken());

    const user = JSON.stringify(decode(token));
    const userObj = JSON.parse(user);
    console.log(userObj);
    //const { id, role, exp, iat } = user;
    
    if( !this.authService.isAuth() || userObj.role !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['/dashboard/curso/curso']);
      return false;
    }
    return true;
  }
  
}

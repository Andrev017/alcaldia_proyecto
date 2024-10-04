import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
//import { AuthService } from 'app/auth/auth.service';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { AuthResponse  } from '../api/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public user : any;
    constructor(
        private authService: AuthService,
        private router: Router
        ){  }
    canActivate(): boolean {
        if(!this.authService.isAuth()){
        console.log('Token no es válido o ya expiró');
        this.router.navigate(['/auth']);
        return false;
        }else{

            this.user = JSON.parse( sessionStorage.getItem("userDetails") ! ) as AuthResponse;  // if it's object
            this.authService.setUser(this.user);
            //this._authSubject$.next(resp);
        }
        return true;
    }

}


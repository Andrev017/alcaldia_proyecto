import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponse } from '../../api/auth.model';
import { Data, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private authService: AuthService,private router: Router) { }

  intercept( request: HttpRequest<any>, next: HttpHandler  ): Observable<HttpEvent<any>>{

    const authToken = this.authService.getAccessToken();    
    
    //this.authService.refreshToken().subscribe();

    
    // Add the token to the request headers
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });
    }

    // const tokenHeader = request.clone({
    //   setHeaders: {
    //     Authorization: `${token}`
    //   }
    // });
    //console.log(request);
    //return next.handle(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized (token expired or invalid)
          //return this.handleTokenExpiration(request, next);
          this.authService.removeAccessToken(); 
          this.router.navigate(['/auth']);
        }
        return throwError(error);
      })
    );
  }
  // intercept( req:any, next:any ){

  //   //const token = localStorage.getItem('access_token'); 
  //   const authToken = this.authService.getAccessToken();   
  //   if (authToken) {
  //     const tokenHeader = req.clone({
  //       setHeaders: {
  //         Authorization: `${authToken}`
  //       }
  //     });
  //   }
  //   //console.log(tokenHeader);
  //   return next.handle(tokenHeader);
  // }

  private handleTokenExpiration(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Perform the token renewal process and retry the request
    return this.authService.refreshToken()
    .pipe(
      switchMap((newToken: AuthResponse) => {
        // Update the stored token with the new token
        this.authService.setAccessToken(newToken.token);

        // Clone the request and add the new token to the headers
        console.log('Nuevo Token:',newToken.token);
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `${newToken}`
          }
        });

        // Retry the request with the new token
        return next.handle(newRequest);
      }),
      catchError((error: any) => {
        // Token renewal failed, redirect to login or handle the error as needed
        return throwError(error);
      })
    );
  }
}

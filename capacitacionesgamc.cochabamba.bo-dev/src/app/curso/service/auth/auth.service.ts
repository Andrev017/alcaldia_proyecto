import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../api/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { EmpleadoService } from '../empleado/empleado.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _authSubject$ = new BehaviorSubject<any>(null); // Puedes cambiar "any" por el tipo de datos del usuario si lo conoces

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  userSubject$ = this._authSubject$.asObservable();
  //private auth : AuthResponse;
  private accessTokenKey = 'access_token';

  private jwtHelper = new JwtHelperService();
  //public uuidEmp: string;
  private apiUrl : string;
  private apiUrlAuth : string;
  
  constructor(private apiService: ApiService, private apiServiceEmp:EmpleadoService, private http: HttpClient) {
    this.apiUrl = `${environment.apiUrls.users}`;
    this.apiUrlAuth = `${environment.apiUrls.auth}`;
    
    //const token = localStorage.getItem('profanis_auth');
    //this._isLoggedIn$.next(!!token);


  }

  singin(ci:string, password:string){
    return this.apiService.login(ci, password).
    pipe(
      map((resp)=>{
        //console.log('login--------------:',resp);
        this._isLoggedIn$.next(true);
        //localStorage.setItem('profanis_auth', resp.token);

        sessionStorage.setItem('userDetails', JSON.stringify(resp));
        this._authSubject$.next(resp);
        this.saveAuthenticationInformation(resp );
      }),catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized: handle authentication error here
          console.error('Authentication error:', error);
        } else {
          // Handle other errors
          console.error('Other error:', error);
        }
        throw error; //throwError('An error occurred');
      })
    )
    // pipe(      
    //   tap((resp: AuthResponse) => {
    //     console.log('login--------------:',resp);
    //     this._isLoggedIn$.next(true);
    //     //localStorage.setItem('profanis_auth', resp.token);

    //     sessionStorage.setItem('userDetails', JSON.stringify(resp));
    //     this._authSubject$.next(resp);
    //     this.saveAuthenticationInformation(resp );

    //   }),catchError((err, caught) => {
    //     console.error("error Login:",caught);
    //     throw err;
    //   }
    //   )
    // )
    ;
    /*
    subscribe( (resp) => {
      result= new PayloadForSuccessfulAuthentication(resp.id,resp.id_empleado, resp.);
      AuthService.saveAuthenticationInformation(resp);
    }) */
  }

  isAuth():boolean{
    const token = localStorage.getItem(this.accessTokenKey);
    console.log("Ingreso");
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem(this.accessTokenKey)){
      return false;
    }
    else{
      //actualizar _authSubject$
      //this._authSubject$.next(userInfo);
      console.log('valido token:');
      this.http.post<AuthResponse>(`${this.apiUrlAuth+'/refresh'}`,null).pipe(
        tap((resp: AuthResponse) => {
          console.log('refresh:',resp);
          this._isLoggedIn$.next(true);
          //this._authSubject$.next(resp);
          this.setUser(resp);
          //this.saveAuthenticationInformation(resp );

        })
      );
      return true;

    }

    return true;
  }
  

  // getAccessToken(): string {
  //   var localStorageToken = localStorage.getItem(this.accessTokenKey);
  //   if (localStorageToken) {
  //     //var token = JSON.parse(localStorageToken) as TokenModel;
  //     var isTokenExpired = this.jwtHelper.isTokenExpired(localStorageToken);
  //     if (isTokenExpired) {
  //       this._authSubject$.next(null);
  //       return '';
  //     }
  //     //var userInfo = this.jwtHelper.decodeToken(
  //     //  token.access_token
  //     //) as UserProfile;
  //     //this._authSubject$.next(userInfo);
  //     return token.access_token;
  //   }
  //   return '';
  // }

  saveAuthenticationInformation(payload: AuthResponse ) {

    this.setAccessToken(payload.token);
    //localStorage.setItem(LocalStorageAuthContent.userId,  payload.user.uuid );
    //localStorage.setItem(LocalStorageAuthContent.token, payload.token);
    //localStorage.setItem(LocalStorageAuthContent.expirationDate, payload.user?.expirationDate.getTime().toString());
    //localStorage.setItem(LocalStorageAuthContent.clienteId, payload.emp.uuid );
    //localStorage.setItem(LocalStorageAuthContent.role, payload.user.rol );

  }

  setUser(auth: AuthResponse): void {
    this._authSubject$.next(auth);
  }

  getUser(): BehaviorSubject<AuthResponse> {
    return this._authSubject$;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    // Check if the token is expired (implement as needed)
    // Example: return tokenExpirationDate < currentDate;
    return false;
  }
  refreshToken(): Observable<AuthResponse>{
    //return this.http.post();
    return this.http.post<AuthResponse>(`${this.apiUrlAuth+'/refresh'}`,null).pipe(
      tap((resp: AuthResponse) => {
        console.log('refresh:',resp);
        this._isLoggedIn$.next(true);
        //localStorage.setItem('profanis_auth', resp.token);
        this._authSubject$.next(resp);
        this.saveAuthenticationInformation(resp );

      })
    );
    //.pipe(      map( (response) => { return response.user } ),catchError( (err, caught)=> {console.error(err); throw err;})     );
  }

  /*refreshToken(): Observable<string> {
    // Make an HTTP request to your backend's token refresh API
    return this.http.post<any>('/api/refresh-token', {}).pipe(
      tap((response) => {
        if (response && response.access_token) {
          // Update the access token in your application
          this.setAccessToken(response.access_token);
        }
      })
    );
  }*/

  // renewToken() {
  //   // Make an HTTP request to your Node.js backend to renew the token
  //   return this.http.post<any>('/api/renew-token', {}).pipe(
  //     tap((response) => {
  //       // Handle the response, which should contain the new token
  //       if (response && response.token) {
  //         // Update the token in your application (e.g., in localStorage or a variable)
  //         // Example: localStorage.setItem('token', response.token);
  //       }
  //     })
  //   );
  // }

  // isTokenExpired() {
  //   // Check if the token is expired (implement as needed)
  //   // Example: return tokenExpirationDate < currentDate;
  // }

  /*setUsuario(user): void {
    this.user = user;
  }
  getUsuario(): any {
    return this.user;
  }*/

  //lista empleado por id empleado
  /*getAuthParameter(uuid: string, activo: string): Observable<User> {

    const params = new HttpParams()
      .set('uuid', uuid)
      .set('activo',activo);

    return this.http.get<AuthResponse>(`${this.apiUrl}`, {'params':params}).pipe(
        map(( response ) =>  {
          console.log('EMP:',params);
          return response.user[0];
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        }
        )
      );
    }
    */
}
export enum LocalStorageAuthContent {
  userId = 'userId',
  clienteId = 'clientId',
  token = 'profanis_auth',
  expirationDate = 'expirationDate',
  role = 'role'

}

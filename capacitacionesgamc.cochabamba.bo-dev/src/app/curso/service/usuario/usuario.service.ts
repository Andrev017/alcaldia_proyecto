import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthResponse } from '../../api/auth.model';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private apiUrl: string;
    //public apiHeader : any;
    private _refreshrequired = new Subject<void>();
    private apiUrlPlanilla: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrls.users}`;
        this.apiUrlPlanilla = `${environment.apiUrls.planilla}`;

        //this.apiHeader = new HttpHeaders(environment.httpHeaders);
    }

    //registro de usuario empleado por id empleado
    saveEmployeeUser(inputdata: any) {
        // const params = new HttpParams()
        // .set('ci', "5155431")
        // .set('password', "prueba")
        // .set('email', "neovave@gmail.com");

        const headers = new HttpHeaders(environment.httpHeaders);

        //let body = JSON.stringify(inputdata);
        //console.log(body);
        return this.http.post<AuthResponse>(`${this.apiUrl}`, inputdata, {
            headers,
        }); /*.pipe(
        tap(( response ) =>  {
          //console.log (response);
          //this._refreshrequired.next();
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        }
        )
      );*/
    }
    getEmpleadoPlanilla(ci: any) {
        // const headers = new HttpHeaders(

        // );
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            }),
        };

        return this.http
            .get(
                `${this.apiUrlPlanilla + '/info-empleado&ci=' + ci}`,
                httpOptions
            )
            .pipe(
                map((response) => {
                    console.log(response);
                    //return response.data;
                }),
                catchError((err, caught) => {
                    console.error(err);
                    throw err;
                })
            );
    }
    //lista cursos por id empleado
    // getCursosAllParameter(params: any): Observable<Usuario[]> {

    //   return this.http.get<CurResponse>(`${this.apiUrl}`, {'params':params}).pipe(
    //     map(( response ) =>  {
    //       return response.cursos.data;
    //     }),
    //     catchError((err, caught) => {
    //       console.error(err);
    //       throw err;
    //     }
    //     )
    //   );
    // }
}

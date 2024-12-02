import { EmpladoInscripcion } from './../../api/empleado.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ApiService } from '../auth/api.service';
import { environment } from 'src/environments/environment';
import { EmpReponse, Empleado } from '../../api/empleado.model';

@Injectable({
    providedIn: 'root',
})
export class EmpleadoService {
    //private empleados: Empleado[];
    private apiUrl: string;
    private _refreshrequired = new Subject<void>();
    public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private apiService: ApiService, private http: HttpClient) {
        //this.empleados = [];
        this.apiUrl = `${environment.apiUrls.empleado}`;
    }

    //lista cursos por id empleado
    getEmpAllParameter(params: any) {
        return this.http
            .get<any>(`${this.apiUrl}`, { params: params })
            .toPromise()
            .then((res) => res.empleados as Empleado[])
            .then((data) => data);
    }
    getSearchInscripcionEmp(params: any) {
        return (
            this.http
                .get<any>(`${this.apiUrl + '/inscripcion'}`, { params: params })
                .toPromise()
                //.then(res => res.cursos as any[])
                //.then(cursos => cursos);
                .then((res) => <any[]>res.empleados)
                .then((data) => {
                    return data;
                })
        );
    }
    getSearchEmp(params: any) {
        return (
            this.http
                .get<any>(`${this.apiUrl + '/user'}`, { params: params })
                .toPromise()
                //.then(res => res.cursos as any[])
                //.then(cursos => cursos);
                .then((res) => res.emp.data as Empleado[])
                .then((data) => data)
        );
    }
    //lista empleado por id empleado
    getEmpReposParameter(uuid: string, activo: string): Observable<Empleado> {
        const params = new HttpParams().set('uuid', uuid).set('activo', activo);

        return this.http
            .get<EmpReponse>(`${this.apiUrl}`, { params: params })
            .pipe(
                map((response) => {
                    console.log('EMP:', params);
                    return response.emp.data[0];
                }),
                catchError((err, caught) => {
                    console.error(err);
                    throw err;
                })
            );
    }
    //registro de usuario empleado por id empleado
    saveEmployeeUser(inputdata: any) {
        return this.http.post(`${this.apiUrl}`, inputdata).pipe(
            tap((response) => {
                //console.log (response);
                this._refreshrequired.next();
            }),
            catchError((err, caught) => {
                console.error(err);
                throw err;
            })
        );
    }
}

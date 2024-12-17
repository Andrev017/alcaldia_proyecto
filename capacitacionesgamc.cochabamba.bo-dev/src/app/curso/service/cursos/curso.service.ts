import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurResponse, Curso, Cursos } from '../../api/curso.model';

@Injectable({
    providedIn: 'root',
})
export class CursoService {
    private apiUrl: string;
    public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    
    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrls.cursos}`;
    }
    private _refreshrequired = new Subject<void>();

    get RequiredRefresh() {
        return this._refreshrequired;
    }

    toggleActivoCurso(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/toggleActivo/${id}`, {});
    }

    //lista cursos por id empleado
    getCursosAllParameter(params: any) {
        return this.http
            .get<any>(`${this.apiUrl}`, { params: params })
            .toPromise()
            .then((res) => res.cursos.data as Curso[])
            .then((data) => data);
    }
    getSearchAllCurso(params: any) {
        return this.http
            .get<any>(`${this.apiUrl + '/Search'}`, { params: params })
            .toPromise()
            .then((res) => <any[]>res.cursos)
            .then((data) => {
                return data;
            });
    }
    getCursoParameter(params: any): Observable<Curso> {
        return this.http
            .get<CurResponse>(`${this.apiUrl}`, { params: params })
            .pipe(
                map((response) => {
                    //console.log(response);
                    return response.cursos.data[0];
                }),
                catchError((err, caught) => {
                    console.error(err);
                    throw err;
                })
            );
    }
    saveCurso(inputdata: any) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.post<CurResponse>(`${this.apiUrl}`, inputdata, {
            headers,
        });
    }
    updateCurso(inputdata: any, uuid: string) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.put<CurResponse>(
            `${this.apiUrl + '/' + uuid}`,
            inputdata,
            { headers }
        );
    }
}

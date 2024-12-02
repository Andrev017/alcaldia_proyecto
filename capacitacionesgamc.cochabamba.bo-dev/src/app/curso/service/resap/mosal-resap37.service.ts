import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, AsyncSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurResponse, Curso, Cursos } from '../../api/curso.model';

@Injectable({
    providedIn: 'root',
})
export class MosalResap37Service {
    private visibilitySubject = new Subject<boolean>();
    visibilityChange = this.visibilitySubject.asObservable();

    // ------------------------------PARTE DEL MODAL -----------------------------------
    show() {
        this.visibilitySubject.next(true);
    }

    hide() {
        this.visibilitySubject.next(false);
    }

    // --------------------------------- CONSUMIR LAS ApI REST ------------------------------------
    /*
    private apiUrl: string;
    private _refreshrequired = new Subject<void>();
    // public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrls.resap37s}`;
    }

    get RequiredRefresh() {
        return this._refreshrequired;
    }

    // toggleActivoResap(id: number): Observable<any> {
    //     return this.http.put(`${this.apiUrl}/toggleActivo/${id}`, {});
    // }

    getResapParameter(params: any) {
        return this.http
            .get<any>(`${this.apiUrl}`, { params: params })
            .toPromise()
            .then((res) => res.resap37s.data as Reasap37[])
            .then((data) => data);
    }
    getSearchsAllParameter(params: any) {
        return this.http
            .get<any>(`${this.apiUrl + '/Search'}`, { params: params })
            .toPromise()
            .then((res) => <any[]>res.resap37s)
            .then((data) => {
                return data;
            });
    }*/
    //getResap37Parameter(params: any): Observable</*Resap37*/> {
    /*return this.http

        .get<ResapResponse>(`${this.apiUrl}`, { params: params })
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

    saveResap(inputdata: any) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.post<ResapResponse>(`${this.apiUrl}`, inputdata, {
            headers,
        });
    }

    updatResap(inputdata: any, uuid: string) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.put<ResapResponse>(
            `${this.apiUrl + '/' + uuid}`,
            inputdata,
            { headers }
        );
    }*/
}

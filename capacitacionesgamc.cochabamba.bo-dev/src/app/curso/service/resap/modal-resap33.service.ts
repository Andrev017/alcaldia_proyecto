import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Resap33Component } from '../../components/pages/module1/resap/resap33/resap33.component';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Resap33, Resap33Response } from '../../api/resap33.model';

@Injectable({
    providedIn: 'root',
})
export class ModalResap33Service {
    private visibilitySubject = new Subject<boolean>();
    

    visibilityChange = this.visibilitySubject.asObservable();

    show() {
        this.visibilitySubject.next(true);
    }

    hide() {
        this.visibilitySubject.next(false);
    }

    // --------------------------------- CONSUMIR LAS ApI REST ------------------------------------

    private apiUrl: string;
    public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrls.resap33}`;
    }

    getResap33AllParameter(): Observable<Resap33[]> {
        return this.http.get<Resap33Response>(`${this.apiUrl}`).pipe(
            map((response) => {
                console.log(response);

                return response.resap33.data;
            }),
            catchError((err, caught) => {
                console.error(err);
                throw err;
            })
        );
    }

    getResap33Parameter(params: any): Observable<Resap33> {
        return this.http
            .get<Resap33Response>(`${this.apiUrl}`, { params: params })
            .pipe(
                map((response) => {
                    return response.resap33.data[0];
                }),
                catchError((err, caught) => {
                    console.error(err);
                    throw err;
                })
            );
    }

    saveResap33(inputdata: any) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.post<Resap33Response>(`${this.apiUrl}`, inputdata, {
            headers,
        });
    }

    updateResap33(inputdata: any, uuid: string) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.put<Resap33Response>(
            `${this.apiUrl + '/' + uuid}`,
            inputdata
        );
    }

    //----------------- PARTE DE LOS GRAFICOS -------------------
}

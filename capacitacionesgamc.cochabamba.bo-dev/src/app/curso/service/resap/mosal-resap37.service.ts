import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, AsyncSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
    Resap37,
    Resap37Request,
    Resap37Response,
} from '../../api/resap37.model';

@Injectable({
    providedIn: 'root',
})
export class MosalResap37Service {
    private visibilitySubject = new Subject<boolean>();
    visibilityChange = this.visibilitySubject.asObservable();

    // ------------------------------PARTE DEL MODAL -----------------------------------
    abrir() {
        this.visibilitySubject.next(true);
    }

    hide() {
        this.visibilitySubject.next(false);
    }

    // --------------------------------- CONSUMIR LAS ApI REST ------------------------------------
    private apiUrl: string;
    public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrls.resap37}`;
    }

    getResap37AllParameter(params: any): Observable<Resap37[]> {
        return this.http
            .get<Resap37Response>(`${this.apiUrl}`, { params: params })
            .pipe(
                map((response) => {
                    return response.resap37.data;
                }),
                catchError((err, caught) => {
                    console.error(err);
                    throw err;
                })
            );
    }

    getResap37Parameter(params: any): Observable<Resap37> {
        return this.http
            .get<Resap37Response>(`${this.apiUrl}`, { params: params })
            .pipe(
                map((response) => {
                    return response.resap37.data[0];
                }),
                catchError((err, caught) => {
                    console.error(err);
                    throw err;
                })
            );
    }

    // saveResap37(inputdata: any){
    //     const headers = new HttpHeaders(environment.httpHeaders);
    //     return this.http.post<Resap37Response>(`${this.apiUrl}`, inputdata, {
    //         headers,
    //     });
    // }
    // import { Resap37Request } from './interfaces'; // Ajusta la ruta de importación

    saveResap37(payload: Resap37Request,tokenUSER:string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${tokenUSER}`,
        });
        return this.http.post<any>(`${this.apiUrl}`, payload, { headers });
    }

    updateResap37(inputdata: any, uuid: string) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.put<Resap37Response>(
            `${this.apiUrl + '/' + uuid}`,
            inputdata
        );
    }
}

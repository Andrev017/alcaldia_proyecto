import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Resap, ResapResponse } from '../../api/resap.model';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ResapService {
    private apiUrl: string;
    public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrls.resap}`;
    }

    getResapAllParameter(params: any): Observable<Resap[]> {
        return this.http.get<ResapResponse>(`${this.apiUrl}`, { params: params }).pipe(
                map((response) => {
                    return response.resap.data;
                }),
                catchError((err, caught) => {
                    console.error(err);
                    throw err;
                })
            );
    }

    getResapParameter(params: any): Observable<Resap> {
        return this.http
            .get<ResapResponse>(`${this.apiUrl}`, { params: params })
            .pipe(
                map((response) => {
                    //console.log(response);
                    return response.resap.data[0];
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
    
    updateResap(inputdata: any, uuid: string) {
        const headers = new HttpHeaders(environment.httpHeaders);
        return this.http.put<ResapResponse>(
            `${this.apiUrl + '/' + uuid}`,
            inputdata
        );
    }

    saveResapExternal(inputdata: any, fileUpload: any) {
        const headers = new HttpHeaders(environment.httpHeaders);

        return this.http.post<ResapResponse>(
            `${this.apiUrl + '/externa'}`,
            inputdata
        );
    }
}

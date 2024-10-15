import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { response } from 'express';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../../api/auth.model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiUrls.auth}`;
    }

    login(ci: string, password: string): Observable<AuthResponse> {
        //return this.http.post();
        return this.http.post<AuthResponse>(`${this.apiUrl}`, { ci, password });
        //.pipe(      map( (response) => { return response.user } ),catchError( (err, caught)=> {console.error(err); throw err;})     );
    }
}

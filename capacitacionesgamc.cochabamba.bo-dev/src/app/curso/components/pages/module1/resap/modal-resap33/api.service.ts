import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl =
        'https://appgamc.cochabamba.bo/transparencia/servicio/buscar-empleados.php';
    constructor(private http: HttpClient) {}

    sendPostRequest(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        let body = new HttpParams();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                body = body.set(key, data[key]);
            }
        }

        return this.http.post(this.apiUrl, body.toString());
    }
}

import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Resap33Component } from '../../components/pages/module1/resap/resap33/resap33.component';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ThisReceiver } from '@angular/compiler';
// import { CurResponse, Curso, Cursos } from '../../api/curso.model';  CAMBAIR POr La TABLA


@Injectable({
    providedIn: 'root',
})
export class ModalResap33Service {
    private malo = Resap33Component;
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
    private _refreshrequired = new Subject<void>();
    public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor( private http: HttpClient){
        // this.apiUrl = `${environment.apiUrls.resap33s}`;
        this.apiUrl = '';
    }

    get RequiredRefresh(){
        return this._refreshrequired;
    }

    toggleActivoResap(id: number): Observable<any>{
        return this.http.put(`${this.apiUrl}/toggleActivo/${id}`, {});
    }


}

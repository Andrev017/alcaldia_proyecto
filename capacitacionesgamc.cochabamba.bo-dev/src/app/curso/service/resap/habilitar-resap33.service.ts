import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventEmitter } from 'stream';
// import { CurResponse, Curso, Cursos } from '../../api/curso.model'; cambiar por el modelo


@Injectable({
    providedIn: 'root',
})
export class HabilitarResap33Service {
    private readonly storageKey = 'toggleState';
    private toggleState = new BehaviorSubject<boolean>(
        this.getToggleStateFromStorage()
    );

    toggleState$ = this.toggleState.asObservable();

    // private toggleState = new BehaviorSubject<boolean>(false);
    // toggleState$ = this.toggleState.asObservable();

    setToggleState(state: boolean) {
        this.toggleState.next(state);
        localStorage.setItem(this.storageKey, JSON.stringify(state));
    }

    private getToggleStateFromStorage(): boolean {
        const savedState = localStorage.getItem(this.storageKey);
        return savedState !== null ? JSON.parse(savedState) : false;
    }

    // --------------------------------- CONSUMIR LAS ApI REST ------------------------------------
    private apiUrl: string;
    private _refreshrequired = new Subject<void>();
    // public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor( private http: HttpClient){
        // this.apiUrl = `${environment.apiUrls.resap33s}`;
        this.apiUrl =''
    }
}


import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { ModalResap33Service } from './modal-resap33.service';
import { environment } from 'src/environments/environment';
import { Resap33, Resap33Response } from '../../api/resap33.model';



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


}


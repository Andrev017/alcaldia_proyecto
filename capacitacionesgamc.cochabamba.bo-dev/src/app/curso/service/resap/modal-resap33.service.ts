import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Resap33Component } from '../../components/pages/module1/resap/resap33/resap33.component';

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
}

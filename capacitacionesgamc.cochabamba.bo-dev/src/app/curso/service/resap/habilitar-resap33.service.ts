import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
        // this.toggleState.next(state);
        this.toggleState.next(state);
        localStorage.setItem(this.storageKey, JSON.stringify(state));
    }

    private getToggleStateFromStorage(): boolean {
      const savedState = localStorage.getItem(this.storageKey);
      return savedState !== null ? JSON.parse(savedState) : false; 
    }
}

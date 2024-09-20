import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalResap37Service {

  private visibilitySubject = new Subject<boolean>();
  visibilityChange = this.visibilitySubject.asObservable();

  show() {
    this.visibilitySubject.next(true);
  }

  hide() {
    this.visibilitySubject.next(false);
  }
}

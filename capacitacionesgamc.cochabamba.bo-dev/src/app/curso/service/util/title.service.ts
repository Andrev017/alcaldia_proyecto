import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private subTitle: string = '';
  private title: string = '';
  private subTitleCompartidos = new BehaviorSubject <string>('');

  constructor() { }

  

  setSubTitle(dato: string) {
    this.subTitle = dato;
    console.log("entro servicio:",dato);
  }

  getSubTitle(): string {
    return this.subTitle;
  }

  setTitle(dato: string) {
    this.title = dato;
    
  }

  getTitle(): string {
    return this.title;
  }

  obtenerSubTitleCompartidos() {
    return this.subTitleCompartidos.asObservable();
  }

  actualizarSubTitleCompartidos(datos: string) {
    this.subTitleCompartidos.next(datos);
  }

}

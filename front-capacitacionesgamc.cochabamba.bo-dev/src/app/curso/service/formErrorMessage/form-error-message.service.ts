import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormErrorMessageService {

  constructor() { }
  getErrorMessage(validationErrorKey: string, validationErrorValue: any): string {
    switch (validationErrorKey) {
      case 'required':
        return 'El campo es requerido.';
      case 'email':
        return 'Formato de correo Invalido';
      case 'minlength':
        return `Minimo tamaño caracteres requerido es ${validationErrorValue.requiredLength}, actual tamaño es ${validationErrorValue.actualLength}.`;
      // Add more custom error messages for other validation rules as needed
      default:
        return 'Invalido valor.';
    }
  }
}

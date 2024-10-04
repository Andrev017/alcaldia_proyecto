import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormattingService {

  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date, tipo:string): string {

    let dateString;

    switch (tipo) {
        case 'F':
            dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
            break;
        case 'H':
            dateString = this.datePipe.transform(date, 'H:mm:ss');
            break;
        case 'A':
            dateString = this.datePipe.transform(date, 'yyyy');
            break;
        default:            
            break;
    }

    return dateString? dateString: "" ;
  }

  createDate(str:string):Date{
    const [day, month , year] = str.split('/');
    const date = new Date(+year, +month , +day);
    return date
  }
  createTime(str:string):Date{
    const [hora, min , seg] = str.split(':');
    const date = new Date(2023, 1, 1, +hora, +min, +seg);
    return date
  }
  

}

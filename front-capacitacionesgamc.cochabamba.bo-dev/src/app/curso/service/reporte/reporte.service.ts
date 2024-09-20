import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Resap, ResapResponse } from '../../api/resap.model';
import { map, tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl : string;
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private http:HttpClient) { 
    this.apiUrl = `${environment.apiUrls.reporte}`;
  }
  getReporteResap(params: any) {
    //return this.http.get<Blob>(`${this.exportExcelUrl}`,
    //{ params: params, responseType: 'blob' })

    return this.http.get<any>(`${this.apiUrl+'/resap36'}`, {'params':params, responseType: 'blob' as 'json'},)
    .subscribe(result=>{
      const blob = new Blob([result], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
    
  }
  getReporteInscritos(params: any) {
    //return this.http.get<Blob>(`${this.exportExcelUrl}`,
    //{ params: params, responseType: 'blob' })

    // return this.http.get<any>(`${this.apiUrl+'/inscritos'}`, {'params':params, responseType: 'blob' as 'json'},)
    // .subscribe(result=>{
      console.log("params",params);
      return this.http.get(`${this.apiUrl}/inscritos/?uuid=${params}`, { responseType: 'blob' }).subscribe(blob=>{
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'inscritos.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);


    });
    
  }
  getReporteResap37(params: any) {
    //return this.http.get<Blob>(`${this.exportExcelUrl}`,
    //{ params: params, responseType: 'blob' })

    return this.http.get(`${this.apiUrl+'/resap37'}`, { responseType: 'blob' })
    .subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resap37.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
    
  }
  
  getCertificado(params: any) {
    //return this.http.get<Blob>(`${this.exportExcelUrl}`,
    //{ params: params, responseType: 'blob' })

    return this.http.get<any>(`${this.apiUrl+'/certificado'}`, {'params':params, responseType: 'blob' as 'json'},)
    .subscribe(result=>{
      const blob = new Blob([result], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
    
  }
}

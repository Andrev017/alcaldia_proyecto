import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapCriEva, CriterioEvaResponse, CriterioEvaluacion } from '../../api/criterioEva.model';
import { Observable, Subject } from 'rxjs';
import { map, tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CriterioEvaService {
  private apiUrl : string;
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http:HttpClient) {

    this.apiUrl = `${environment.apiUrls.criterioeva}`;
   }
  getCriterioEvaAllParameter(params: any): Observable< CriterioEvaluacion[]> {

    return this.http.get<CriterioEvaResponse>(`${this.apiUrl}`, {'params':params}).pipe(
      map(( response ) =>  {
        return response.capCriEva.data;
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
  }
  getCriterioEvaParameter(params: any): Observable<CriterioEvaluacion> {

    return this.http.get<CriterioEvaResponse>(`${this.apiUrl}`, {'params':params}).pipe(
      map(( response ) =>  {
        //console.log(response);
        return response.capCriEva.data[0];
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
  }
  saveCriterioEva(inputdata:any){
  
    const headers = new HttpHeaders(environment.httpHeaders);
  
    return this.http.post< CriterioEvaResponse >( `${this.apiUrl}`, inputdata,{headers} );
  
  
  }
  saveTipoCriterioEva(inputdata:any){
  
    const headers = new HttpHeaders(environment.httpHeaders);
  
    return this.http.post< CriterioEvaResponse >( `${this.apiUrl+'/tipocriterio'}`, inputdata,{headers} );
  
  
  }
  
  updateCriterioEva(inputdata:any, uuid:string){
  
    const headers = new HttpHeaders(environment.httpHeaders);
    return this.http.put<CriterioEvaResponse>( `${this.apiUrl+'/'+uuid}`, inputdata );
  }

  updateTipoCriterioEva(inputdata:any, uuid:string){
    const headers = new HttpHeaders(environment.httpHeaders);
    return this.http.put<CriterioEvaResponse>( `${this.apiUrl+'/tipocriterio/'+uuid}`, inputdata,{headers} );
  }
  
}

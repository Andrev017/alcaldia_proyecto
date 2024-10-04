import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { TipoEvaResponse, TipoEvaluacion } from '../../api/tipoEva.model';
import { map, tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoEvaService {
  private apiUrl : string;
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http:HttpClient) {
    this.apiUrl = `${environment.apiUrls.tipoeva}`;
   }
  getTipoEveAllParameter(params: any): Observable<TipoEvaluacion[]> {

    return this.http.get<TipoEvaResponse>(`${this.apiUrl}`, {'params':params}).pipe(
      map(( response ) =>  {
        return response.tipoEvas.data;
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
  }
  getSearchAllTipoEve(params: any) {
    
     return this.http.get<any>(`${this.apiUrl+'/Search'}`, {'params':params})
     .toPromise()
     //.then(res => res.cursos as any[])
     //.then(cursos => cursos);
     .then(res => <any[]>res.tipoeva)
     .then(data => { return data; });    

  }
  getTipoEveParameter(params: any): Observable<TipoEvaluacion> {

    return this.http.get<TipoEvaResponse>(`${this.apiUrl}`, {'params':params}).pipe(
      map(( response ) =>  {
        //console.log(response);
        return response.tipoEvas.data[0];
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
  }
  saveTipoEve(inputdata:any){
  
    const headers = new HttpHeaders(environment.httpHeaders);
  
    return this.http.post< TipoEvaResponse >( `${this.apiUrl}`, inputdata,{headers} );
  
  
  }
  updateTipoEve(inputdata:any, uuid:string){
  
    const headers = new HttpHeaders(environment.httpHeaders);
    return this.http.put<TipoEvaResponse>( `${this.apiUrl+'/'+uuid}`, inputdata );
  }

}

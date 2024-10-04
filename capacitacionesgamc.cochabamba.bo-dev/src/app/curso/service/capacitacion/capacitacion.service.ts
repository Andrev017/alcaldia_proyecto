import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Capacitacion, CapactyRepons } from '../../api/capacitacion.model';
//import { Capacitacion, CapactyRepons } from '../../interfaces/capacitacion.model';


@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {
  private apiUrl : string;
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http:HttpClient) {
    this.apiUrl = `${environment.apiUrls.capacitacion}`;
   }

toggleActivoCapacitacion(id: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/toggleActivo/${id}`, {});
}
//lista capacitaciones por id empleado
getTrainingAllParameter(params: any): Observable<Capacitacion[]> {

  return this.http.get<CapactyRepons>(`${this.apiUrl}`, {'params':params}).pipe(
    map(( response ) =>  {
      return response.capCurso.data;
    }),
    catchError((err, caught) => {
      console.error(err);
      throw err;
    }
    )
  );
}
getTrainingParameter(params: any): Observable<Capacitacion> {

  return this.http.get<CapactyRepons>(`${this.apiUrl}`, {'params':params}).pipe(
    map(( response ) =>  {
      //console.log(response);
      return response.capCurso.data[0];
    }),
    catchError((err, caught) => {
      console.error(err);
      throw err;
    }
    )
  );
}
saveTraining(inputdata:any){

  const headers = new HttpHeaders(environment.httpHeaders);

  return this.http.post< CapactyRepons >( `${this.apiUrl}`, inputdata,{headers} );


}
updateTraining(inputdata:any, uuid:string){

  const headers = new HttpHeaders(environment.httpHeaders);
  return this.http.put<CapactyRepons>( `${this.apiUrl+'/'+uuid}`, inputdata,{headers} );
}

saveTrainingExternal(inputdata:any, fileUpload:any){

  const headers = new HttpHeaders(environment.httpHeaders);
  
  return this.http.post< CapactyRepons >( `${this.apiUrl+'/externa'}`, inputdata );

}



}

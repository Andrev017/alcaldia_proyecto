import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { InscRespons, Inscripcion } from '../../api/inscripcion.model';


@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private apiUrl : string;
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  private _refreshrequired=new Subject<void>();

  constructor(private http:HttpClient) {
    this.apiUrl = `${environment.apiUrls.inscripcion}`;
   }
   get RequiredRefresh(){
    return this._refreshrequired;
  }
  //lista capacitaciones por id empleado
  getInscriptionAllParameter(params: any): Observable<Inscripcion[]> {
      
    return this.http.get<InscRespons>(`${this.apiUrl}`, {'params':params}).pipe(
      map(( response ) =>  {
        return response.insCap.data;
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
  }
  getInscriptionParameter(params: any): Observable<Inscripcion> {
    
    return this.http.get<InscRespons>(`${this.apiUrl}`, {'params':params}).pipe(
      map(( response ) =>  {
        //console.log(response);
        return response.insCap.data[0];
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    );
  }
  
  saveInscription(inputdata:any){

    const headers = new HttpHeaders(environment.httpHeaders);
    
    return this.http.post< InscRespons >( `${this.apiUrl}`, inputdata,{headers} );
    
  
  }
  saveInscriptionManual(inputdata:any){

    const headers = new HttpHeaders(environment.httpHeaders);
    
    return this.http.post< InscRespons >( `${this.apiUrl}/manual`, inputdata,{headers} );
    
  
  }
  
  updateInscription(inputdata:any, uuid:string, tipo:string){
    let urlTipo = "";
    if( tipo=='approved' ){
      urlTipo = "/habilitarCurso";
    }
    if(tipo == 'asisttend'){
      urlTipo = "/asistenciaCurso";
    }
    if(tipo == 'certificate'){
      urlTipo = "/certificadoCurso";
    }
    console.log('motivos:..', inputdata);
    const headers = new HttpHeaders(environment.httpHeaders);
    return this.http.put<InscRespons>( `${this.apiUrl+urlTipo+'/'+uuid}`, inputdata,{headers} ); 
  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { CapCriEva, CriterioEvaluacion } from 'src/app/curso/api/criterioEva.model';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { CriterioEvaService } from 'src/app/curso/service/criterioEva/criterio-eva.service';
import { TipoEvaService } from 'src/app/curso/service/tipoEva/tipo-eva.service';
import { CriterioevaCreateComponent } from '../criterioeva-create/criterioeva-create.component';

@Component({
  selector: 'app-criterioeva-list',
  templateUrl: './criterioeva-list.component.html',
  styleUrls: ['./criterioeva-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class CriterioevaListComponent {

  loading: boolean = true;
  criterioEvaDialog:boolean=false;
  public criterioEvas: CriterioEvaluacion[] = [];
  public criterioEva : any = {};
  submitted: boolean = false;
  deleteCriterioEvaDialog: boolean = false;
  selectedCriterioEvas: CapCriEva[] = [];
  ref: DynamicDialogRef | undefined;

  @ViewChild('filter') filter!: ElementRef;
  constructor( private service: CriterioEvaService, public dialogService: DialogService, private router: Router, private jwtHelper: JwtHelperService, private serviceTipoEva: TipoEvaService, private authService: AuthService ) { 
    
  }

  ngOnInit() {

    this.GetAll();
    this.service.saving.subscribe(r => {
      this.GetAll();
    });
    
  }
  GetAll() {

    const params = { activo: "1", page:"", limit:"" };
    this.service.getCriterioEvaAllParameter(params).subscribe({
      next:(resp)=>{
        this.criterioEvas = resp;
        this.loading = false;
      }, 
      error:(e) =>{

      }
      
    });

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  openNew(code:any){
    this.ref = this.dialogService.open(CriterioevaCreateComponent, {
        header: code? 'Actualizar Criterio Evaluación' : 'Nuevo Criterio Evaluación',
        width: '70%',
        //height: '80%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data:{
          code : code,
          //curcode:this.cursos.id,
        }
      });

    //   this.ref.onClose.subscribe((product: Product) => {
    //       if (product) {
    //           //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //       }
    //   });

      this.ref.onMaximize.subscribe((value) => {
          //this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
      });
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Empleado } from 'src/app/curso/api/empleado.model';
import { EmpleadoService } from 'src/app/curso/service/empleado/empleado.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class FuncionarioListComponent {

  loading: boolean = true;

  
  funcDialog:boolean=false;
  public funcionarios: Empleado[] = [];
  public funcionario : any = {};
  submitted: boolean = false;
  deleteFuncDialog: boolean = false;
  selectedFunc: Empleado[] = [];
  ref: DynamicDialogRef | undefined;
  public esEmp : string = 'true';

  @ViewChild('filter') filter!: ElementRef;

  constructor(private service: EmpleadoService, public dialogService: DialogService, private router: Router /*, private messageService: MessageService,*/  ) { 
    
  }

  ngOnInit() {
    this.GetAll();
    this.service.saving.subscribe(r => {      
      this.GetAll();
    }); 
  }

  GetAll() {
    const params = { activo: "1", page:"", limit:"" };
    this.service.getEmpAllParameter(params).then( customers => {
      console.log('Funcionarios', customers)
      this.funcionarios = customers.map((func: any) => ({
        ...func,
        fullName: `${func.nombre} ${func.paterno} ${func.materno}`
      }));
      this.loading = false;
    } );

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
  capacitacionEmp(uuid: string){
    const navigationExtras = {
      queryParams: {
        data: uuid //JSON.stringify(emp)
      }
    };
  
  
    this.router.navigate(['/capacitacion/empleado/capacitacion/',{isEmp:'true'}],  navigationExtras);
  }
  
}

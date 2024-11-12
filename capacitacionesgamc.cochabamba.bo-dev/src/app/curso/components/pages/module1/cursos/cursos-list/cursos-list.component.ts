import { Component, ElementRef, ViewChild } from '@angular/core';
//import { Customer, Representative } from 'src/app/demo/api/customer';
//import { Product } from 'src/app/demo/api/product';
//import { CustomerService } from 'src/app/demo/service/customer.service';
//import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { CursoService } from 'src/app/curso/service/cursos/curso.service';
import { CurResponse, Curso, Cursos } from 'src/app/curso/api/curso.model';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CursosCreateComponent } from '../cursos-create/cursos-create.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cursos-list',
    templateUrl: './cursos-list.component.html',
    styleUrls: ['./cursos-list.component.scss'],
    providers: [DialogService, MessageService],
})
export class CursosListComponent {
    // customers1: Customer[] = [];

    // customers2: Customer[] = [];

    // selectedCustomers1: Customer[] = [];

    // selectedCustomer: Customer = {};

    // representatives: Representative[] = [];

    statuses: any[] = [];

    // products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    cursoDialog: boolean = false;
    public cursos: Curso[] = [];
    public curso: any = {};
    submitted: boolean = false;
    deleteCursoDialog: boolean = false;
    selectedCursos: Curso[] = [];
    ref: DynamicDialogRef | undefined;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: CursoService,
        public dialogService: DialogService,
        private router: Router /*, private messageService: MessageService,*/
    ) {}

    ngOnInit() {
        // this.customerService.getCustomersLarge().then(customerss => {
        //   console.log(customerss);
        //     this.customers1 = customerss;
        //     this.loading = false;

        //     // @ts-ignore
        //     //this.customers1.forEach(customer => customer.date = new Date(customer.date));
        // });
        //this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        //this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        //this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.GetAll();
        this.service.saving.subscribe((r) => {
            this.GetAll();
        });
    }
    GetAll() {
        const params = { activo: '', page: '', limit: '' };
        this.service.getCursosAllParameter(params).then((customers) => {
            //console.log(customers);
            this.cursos = customers;
            this.loading = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    openNew(code: any) {
        this.ref = this.dialogService.open(CursosCreateComponent, {
            header: code ? 'Actualizar Curso' : 'Nuevo Curso',
            width: '30%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: code,
        });

        // this.ref.onClose.subscribe((product: Product) => {
        //     if (product) {
        //         //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
        //     }
        // });

        this.ref.onMaximize.subscribe((value) => {
            //this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
    }
    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    FunctionEdit(code: any) {
        this.openNew(code);
    }
    capacitacionCurso(uuid: string) {
        this.router.navigate([
            '/capacitacion/cursos/capacitacion/',
            { uuid: uuid },
        ]);
    }
    /*openNew() {
        this.curso = {};
        this.submitted = false;
        this.cursoDialog = true;
    }
  editCurso(curso: Curso) {
      this.curso = { ...curso };
      this.cursoDialog = true;
  }
  deleteCurso(curso: Curso) {
    this.deleteCursoDialog = true;
    this.curso = { ...curso };
  }
  confirmDeleteSelected() {
    this.deleteCursoDialog = false;
    this.cursos = this.cursos.filter(val => !this.selectedCursos.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedCursos = [];
  }
  confirmDelete() {
    this.deleteCursoDialog = false;
    this.cursos = this.cursos.filter(val => val.id !== this.curso.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.curso = {};
  }
  saveProduct() {
    this.submitted = true;

    if (this.curso.nombre?.trim()) {
        if (this.curso.id) {
            // @ts-ignore
            //this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
            this.cursos[this.findIndexById(this.curso.id)] = this.curso;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curso actualizado Updated', life: 3000 });
        } else {
            //this.curso.id = this.createId();
            //this.curso.codigo = this.createId();
            //this.product.image = 'product-placeholder.svg';
            // @ts-ignore
            //this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
            this.products.push(this.product);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curso creado', life: 3000 });
        }

        this.cursos = [...this.cursos];
        this.cursoDialog = false;
        this.curso = {};
    }
  }*/
    // onSort() {
    //     this.updateRowGroupMetaData();
    // }

    // updateRowGroupMetaData() {
    //     this.rowGroupMetadata = {};

    //     if (this.customers3) {
    //         for (let i = 0; i < this.customers3.length; i++) {
    //             const rowData = this.customers3[i];
    //             const representativeName = rowData?.representative?.name || '';

    //             if (i === 0) {
    //                 this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
    //             }
    //             else {
    //                 const previousRowData = this.customers3[i - 1];
    //                 const previousRowGroup = previousRowData?.representative?.name;
    //                 if (representativeName === previousRowGroup) {
    //                     this.rowGroupMetadata[representativeName].size++;
    //                 }
    //                 else {
    //                     this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
    //                 }
    //             }
    //         }
    //     }
    // }

    // expandAll() {
    //     if (!this.isExpanded) {
    //         //this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

    //     } else {
    //         this.expandedRows = {};
    //     }
    //     this.isExpanded = !this.isExpanded;
    // }

    // formatCurrency(value: number) {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // }
}

interface expandedRows {
    [key: string]: boolean;
}

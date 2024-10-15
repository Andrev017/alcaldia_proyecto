import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/curso/api/empleado.model';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MosalResap37Service } from 'src/app/curso/service/resap/mosal-resap37.service';


@Component({
    selector: 'app-resap37',
    templateUrl: './resap37.component.html',
    styleUrls: ['./resap37.component.scss'],
})
export class Resap37Component {
    fechaActual: Date;
    public auth: any;
    private userSubscription: Subscription;
    califica: string[] = ['MUY BUENO', 'BUENO', 'ACEPTABLE', 'DEFICIENTE'];
    califica2: string[] = ['MUY BUENO', 'BUENO', 'ACEPTABLE', 'DEFICIENTE'];
    califica3: string[] = ['MUY BUENO', 'BUENO', 'ACEPTABLE', 'DEFICIENTE'];
    isVisible: boolean = false; //-----------------PARTE DE MODAL----------------------------

    constructor(
        private authService: AuthService,
        private modal_resap: MosalResap37Service,
    ) {
        this.fechaActual = new Date();

        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth; //muestra del nombre del que inicia
        });
        //----------------------------------PARTE DEL MODAL-----------------------
        this.modal_resap.visibilityChange.subscribe(
            (isVisible: boolean) => {
                this.isVisible = isVisible;
            }
        ); //-----------------------------------------------------------------
    }

    //--------------------------------PARTE DEL MODAL------------
    closeModal() {
        this.modal_resap.hide();
    } //-------------------------------------------------------

    ngOnInit(): void {
        setInterval(() => {
            this.fechaActual = new Date();
        }, 1000);
    }

    generatePDF() {}
}

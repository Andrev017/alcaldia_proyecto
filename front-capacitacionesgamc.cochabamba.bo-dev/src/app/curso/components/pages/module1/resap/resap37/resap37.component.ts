import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/curso/api/empleado.model';
import { AuthService } from 'src/app/curso/service/auth/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalResap37Service } from 'src/app/curso/service/resap/modal-resap37.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    isVisible: boolean = false;//-----------------PARTE DE MODAL----------------------------

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private ModalResap37Service: ModalResap37Service
    ) {
        this.fechaActual = new Date();

        this.userSubscription = this.authService.getUser().subscribe((auth) => {
            this.auth = auth; //muestra del nombre del que inicia
        });
        //----------------------------------PARTE DEL MODAL-----------------------
        this.ModalResap37Service.visibilityChange.subscribe(
            (isVisible: boolean) => {
                this.isVisible = isVisible;
            });//-----------------------------------------------------------------
    }

    //--------------------------------PARTE DEL MODAL------------
    closeModal() {
        this.ModalResap37Service.hide();
    } //-------------------------------------------------------

    ngOnInit(): void {
        setInterval(() => {
            this.fechaActual = new Date();
        }, 1000);
    }

    generatePDF() {
        const DATA = document.getElementById('htmlData');
        if (!DATA) {
            console.error('Elemento con id "htmlData" no encontrado.');
            return;
        }
        const doc = new jsPDF('p', 'pt', 'a4');
        const options = {
            background: 'white',
            scale: 3,
        };

        html2canvas(DATA, options)
            .then((canvas) => {
                const img = canvas.toDataURL('image/PNG');

                const bufferX = 15;
                const bufferY = 15;
                const imgProps = (doc as any).getImageProperties(img);
                const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                doc.addImage(
                    img,
                    'PNG',
                    bufferX,
                    bufferY,
                    pdfWidth,
                    pdfHeight,
                    undefined,
                    'FAST'
                );
                return doc;
            })
            .then((docResult) => {
                docResult.save(`${new Date().toISOString()}_Resap37.pdf`);
            });
    }
}

import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation({
            startsWith: "Comienza con",
            contains: "Contiene",
            notContains: "No contiene",
            endsWith: "Termina con",
            equals: "Igual",
            notEquals: "No igual",
            noFilter: "No filtrar",
            lt: "Menor que",
            lte: "Menor o igual a",
            gt: "Mayor que",
            gte: "Mayor o igual a",
            is: "Es",
            isNot: "No es",
            before: "Antes",
            after: "Despues",
            dateIs: "La fecha es",
            dateIsNot: "La fecha no es",
            dateBefore: "La fecha es anterior",
            dateAfter: "La fecha es despues",
            clear: "Limpiar",
            apply: "Aplicar",
            matchAll: "Coincidir con todos",
            matchAny: "Coincidir con cualquiera",
            addRule: "Adicionar regla",
            removeRule: "Eliminar regla",
            accept: "Si",
            reject: "No",
            choose: "Seleccionar",
            upload: "Subir",
            cancel: "Cancelar",
            dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            dayNamesShort: ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"],
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", " diciembre"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            dateFormat: "dd/mm/yy",
            today: "Hoy",
            weekHeader: "Semana",
            weak: "Débil",
            medium: "Medio",
            strong: "Fuerte",
            passwordPrompt: "Ingrese una contraseña",
            emptyMessage: "No se encontraron resultados",
            emptyFilterMessage: "No se encontraron resultados"
            //translations
        });
    }
}

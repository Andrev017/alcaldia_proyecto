import { Component, Input } from '@angular/core';
import { CapacitacionService } from '../../../../../service/capacitacion/capacitacion.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-info-capacitacion',
    templateUrl: './info-capacitacion.component.html',
    styleUrls: ['./info-capacitacion.component.scss'],
})
export class InfoCapacitacionComponent {
    @Input() traing: any;
    constructor(private capacitacionService: CapacitacionService) {}
    toggleActivoCapacitacion() {
        this.capacitacionService
            .toggleActivoCapacitacion(this.traing.id)
            .subscribe(
                (response) => {
                    if (response.ok) {
                        this.traing.activo = response.activo;
                        // Mostrar el Swal de éxito
                        Swal.fire({
                            icon: 'success',
                            title: 'Estado actualizado',
                            text: `La capacitación ha sido ${
                                response.activo === 1
                                    ? 'activada'
                                    : 'inactivada'
                            } exitosamente.`,
                            confirmButtonText: 'Aceptar',
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        console.error(
                            'Error al cambiar el estado de la capacitación:',
                            response.errors
                        );
                    }
                },
                (error) => {
                    console.error('Error en la solicitud al backend:', error);
                }
            );
    }

    calcularTotalSolicitadosIns() {
        //console.log('t',this.traing.capacitacion_inscripcion);
        return this.traing?.capacitacion_inscripcion
            .filter((inscripcion: any) => {
                return inscripcion.estado == 'PENDIENTE';
            })
            .reduce((total: any) => total + 1, 0);
    }
    calcularTotalDisponiblesIns() {
        //console.log('t',this.traing.capacitacion_inscripcion);
        return (
            this.traing?.cupo -
            this.traing?.capacitacion_inscripcion
                .filter((inscripcion: any) => {
                    return inscripcion.estado == 'APROBADO';
                })
                .reduce((total: any) => total + 1, 0)
        );
    }
    calcularTotalHabilitadosIns() {
        //console.log('t',this.traing.capacitacion_inscripcion);
        return this.traing?.capacitacion_inscripcion
            .filter((inscripcion: any) => {
                return inscripcion.estado == 'APROBADO';
            })
            .reduce((total: any) => total + 1, 0);
    }
}

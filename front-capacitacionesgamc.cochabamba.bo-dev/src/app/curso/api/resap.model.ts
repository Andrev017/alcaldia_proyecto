export interface ResapResponse {
    ok:    boolean;
    resap: ResapPage;
}

export interface ResapPage {
    previousPage: null;
    currentPage:  number;
    nextPage:     null;
    total:        number;
    per_page:     number;
    from:         number;
    to:           number;
    data:         Resap[];
}

export interface Resap {
    id:                     number;
    uuid:                   string;
    estado:                 string;
    activo:                 string;
    updatedAt:              Date;
    id_criterio_evaluacion: number;
    id_inscripcion:         number;
    resap_criterio:         ResapCriterio;
    inscripcion_resap:      InscripcionResap;
}

export interface InscripcionResap {
    id:                 number;
    uuid:               string;
    estado:             string;
    asistencia:         string;
    certificado:        string;
    motivo_rechazo:     string;
    fecha_inscripcion:  null;
    fecha_aprobacion:   Date;
    usuario_aprobacion: number;
    aprobado:           null;
    activo:             string;
    id_capacitacion:    number;
    id_empleado:        number;
}

export interface ResapCriterio {
    id:                 number;
    uuid:               string;
    nombre:             string;
    activo:             string;
    updatedAt:          Date;
    id_tipo_evaluacion: number;
    criterio_tipo:      CriterioTipo;
}

export interface CriterioTipo {
    id:        number;
    uuid:      string;
    nombre:    string;
    activo:    string;
    updatedAt: Date;
}

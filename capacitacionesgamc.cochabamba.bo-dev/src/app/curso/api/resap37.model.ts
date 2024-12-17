export interface Resap37Response {
    ok: boolean;
    resap37: Resap37Page;
}

export interface Resap37Page {
    previousPage: null;
    currentPage: number;
    nextPage: null;
    total: number;
    per_page: number;
    from: number;
    to: number;
    data: Resap37[];
}

export interface Resap37 {
    id: number;
    uuid: number;
    estado: string;
    comentarios: string;
    activo: string;
    updatedAt: Date;
    id_inscripcion: number;
    id_criterio_evaluacion: number;
    resap37_criterio: ResapCriterio;
    inscripcion_resap37: InscripcionResap;
}

export interface ResapCriterio {
    id: number;
    uuid: string;
    nombre: string;
    activo: string;
    updatedAt: Date;
    id_tipo_evaluacion: number;
    criterio_tipo: CriterioTipo;
}

export interface CriterioTipo {
    id: number;
    uuid: string;
    nombre: string;
    activo: string;
    updatedAt: Date;
}

export interface InscripcionResap {
    id: number;
    uuid: string;
    estado: string;
    asistencia: string;
    certificado: string;
    motivo_rechazo: string;
    fecha_inscripcion: null;
    fecha_aprobacion: Date;
    usuario_aprobacion: number;
    aprobado: null;
    activo: string;
    id_capacitacion: number;
    id_empleado: number;
}

export interface Resap37Request {
    resap37: dataResap[];
}

export interface dataResap {
    criterios_evaluacion: CriterioEvaluacion[];
    comentarios: string;
    fecha: string;
    estado: string;
}

export interface CriterioEvaluacion {
    criterio: string;
    valor: string;
}

export interface CapactyRepons {
    ok:       boolean;
    capCurso: CapCurso;
}

export interface CapCurso {
    previousPage: null;
    currentPage:  number;
    nextPage:     null;
    total:        number;
    per_page:     number;
    from:         number;
    to:           number;
    data:         Capacitacion[];
}

export interface Capacitacion {
    id:                 number;
    solicitudes:          number;
    aprobados:          number;
    uuid:               string;
    codigo:             string;
    fecha_inicio:       Date;
    fecha_fin:          Date;
    horario_inicio:     string;
    horario_fin:        string;
    inst_organizadora:  string;
    capacitador:        string;
    direccion:          string;
    carga_horaria:      number;
    cupo:               number;
    tipo:               string;
    visible:            string;
    nombre_archivo:     null;
    url_archivo:        null;
    estado:             null;
    activo:             string;
    gestion:            number;
    updatedAt:          Date;
    id_curso:           number;
    capacitacion_curso: CapacitacionCurso;
    capacitacion_inscripcion: CapacitacionInscripcion[];
}

export interface CapacitacionCurso {
    id:        number;
    uuid:      string;
    codigo:    string;
    nombre:    string;
    dirigido:  string;
    estado:    null;
    activo:    string;
    updatedAt: Date;
    contenido:  string;
}


export interface CapacitacionInscripcion {
    id:                 number;
    uuid:               string;
    estado:             string;
    asistencia:         null;
    certificado:        null;
    motivo_rechazo:     null;
    fecha_inscripcion:  null;
    fecha_aprobacion:   null;
    usuario_aprobacion: null;
    aprobado:           null;
    activo:             string;
    id_capacitacion:    number;
    id_empleado:        number;
}

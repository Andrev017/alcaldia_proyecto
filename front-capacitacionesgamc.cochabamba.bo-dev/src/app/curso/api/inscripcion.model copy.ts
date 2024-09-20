export interface InscRespons {
    ok:     boolean;
    insCap: InsCap;
}

export interface InsCap {
    previousPage: null;
    currentPage:  number;
    nextPage:     null;
    total:        number;
    per_page:     number;
    from:         number;
    to:           number;
    data:         Inscripcion[];
}

export interface Inscripcion {
    id:                      number;
    uuid:                    string;
    estado:                  string;
    asistencia:              null;
    certificado:             null;
    motivo_rechazo:          null;
    fecha_inscripcion:       null;
    fecha_aprobacion:        null;
    usuario_aprobacion:      null;
    aprobado:                null;
    activo:                  string;
    updatedAt:               Date;
    id_capacitacion:         number;
    id_empleado:             number;
    inscripcion_empleado:    InscripcionEmpleado;
    incripcion_capacitacion: IncripcionCapacitacion;
}

export interface IncripcionCapacitacion {
    id:                number;
    uuid:              string;
    codigo:            string;
    fecha_inicio:      Date;
    fecha_fin:         Date;
    horario_inicio:    string;
    horario_fin:       string;
    inst_organizadora: string;
    capacitador:       string;
    direccion:         string;
    carga_horaria:     number;
    cupo:              number;
    tipo:              string;
    visible:           string;
    nombre_archivo:    null;
    url_archivo:       null;
    estado:            null;
    activo:            string;
    createdAt:         Date;
    updatedAt:         Date;
    id_curso:          number;
    capacitacion_curso: CapacitacionCurso;
}

export interface CapacitacionCurso {
    id:       number;
    uuid:     string;
    codigo:   string;
    nombre:   string;
    dirigido: string;
    estado:   null;
    activo:   string;
    contenido:  string;
}

export interface InscripcionEmpleado {
    id:            number;
    uuid:          string;
    cod_empleado:  number;
    ci:            string;
    nombre:        string;
    otro_nombre:   string;
    paterno:       string;
    materno:       string;
    item:          number;
    cargo:         string;
    unidad:        string;
    tipo_contrato: number;
    activo:        string;
    updatedAt:     Date;
}

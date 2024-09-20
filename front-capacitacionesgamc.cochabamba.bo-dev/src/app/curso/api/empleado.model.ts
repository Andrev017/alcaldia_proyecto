export interface EmpReponse {
    ok:     boolean;
    emp: Emp;
}

export interface Emp {
    previousPage: null;
    currentPage:  number;
    nextPage:     null;
    total:        number;
    per_page:     number;
    from:         number;
    to:           number;
    data:         Empleado[];
}

export interface Empleado {
    id:                  number;
    uuid:                string;
    cod_empleado:        number;
    ci:                  string;
    nombre:              string;
    otro_nombre:         string;
    paterno:             string;
    materno:             string;
    item:                number;
    cargo:               string;
    unidad:              string;
    tipo_contrato:       number;
    activo:              string;
    updatedAt:           Date;
    emplado_inscripcion: EmpladoInscripcion[];
}

export interface EmpladoInscripcion {
    id:                      number;
    uuid:                    string;
    estado:                  string;
    asistencia:              string;
    certificado:             string;
    motivo_rechazo:          string;
    fecha_inscripcion:       null;
    fecha_aprobacion:        Date;
    usuario_aprobacion:      number;
    aprobado:                null;
    activo:                  string;
    updatedAt:               Date;
    id_capacitacion:         number;
    id_empleado:             number;
    incripcion_capacitacion: IncripcionCapacitacion;
}

export interface IncripcionCapacitacion {
    id:                number;
    uuid:               string;
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
    updatedAt:         Date;
    id_curso:          number;
}

export interface Resap33Response {
    ok:    boolean;
    resap33: Resap33Page;
}

export interface Resap33Page {
    previousPage:           null;
    currentPage:            number;
    nextPage:               null;
    total:                  number;
    per_page:               number;
    from:                   number;
    to:                     number;
    data:                   Resap33[];
}

export interface Resap33 {
    id:                     number;
    uuid:                   string;
    sector:                 string;
    secretaria:             string;
    direccion:              string;
    activo:                 string;
    updatedAt:              Date;
    gestion:                number;
    id_empleado:            number;
    // empelado_resap33:       EmpleadoResap33;
}

// export interface EmpleadoResap33 {
//     id:                     number;
//     uuid:                   string;
//     codigo:                 string;
// }


export interface ConocimientosExigidos {
    id:                     number;
    uuid:                   string;
    conocimientos:          string;
    updatedAt:              Date;
    // id_resap33:             Resap33;
}

export interface ConocimientoAmpliars {
    id:                     number;
    uuid:                   string;
    conocimientos:          string;
    es_otro:                string;
    updatedAt:              Date;

}

export interface FuncionConocimiento {
    id:                     number;
    uuid:                   string;
    funciones:              string;
    conocimientoDemandado:  string;
    prioridad:              string;
    updatedAt:              Date;
}

export interface CapacitadorMaterias {
    id:                     number;
    uuid:                   string;
    conocimientos:          string;
    es_otro:                string; //INCLUIR LA TABLA A LA BD
    updatedAt:              Date;

}


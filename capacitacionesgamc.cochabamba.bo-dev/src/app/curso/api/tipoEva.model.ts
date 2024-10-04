
export interface TipoEvaResponse {
    ok:       boolean;
    tipoEvas: TipoEvas;
}

export interface TipoEvas {
    previousPage: null;
    currentPage:  number;
    nextPage:     null;
    total:        number;
    per_page:     number;
    from:         number;
    to:           number;
    data:         TipoEvaluacion[];
}

export interface TipoEvaluacion {
    id:                  number;
    uuid:                string;
    nombre:              string;
    activo:              string;
    updatedAt:           Date;
    tipo_criterio?:      TipoEvaluacion[];
    id_tipo_evaluacion?: number;
}


export interface CriterioEvaResponse {
    ok:        boolean;
    capCriEva: CapCriEva;
}

export interface CapCriEva {
    previousPage: null;
    currentPage:  number;
    nextPage:     null;
    total:        number;
    per_page:     number;
    from:         number;
    to:           number;
    data:         CriterioEvaluacion[];
}

export interface CriterioEvaluacion {
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

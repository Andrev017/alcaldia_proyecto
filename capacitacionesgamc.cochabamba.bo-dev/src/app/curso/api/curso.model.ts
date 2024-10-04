export interface CurResponse {
    ok:     boolean;
    cursos: Cursos;
}

export interface Cursos {
    previousPage: null;
    currentPage:  number;
    nextPage:     null;
    total:        number;
    per_page:     number;
    from:         number;
    to:           number;
    data:         Curso[];
}

export interface Curso {
    id:        number;
    codigo:    string;
    nombre:    string;
    dirigido:  string;
    estado:    null;
    activo:    string;
    updatedAt: Date;
    contenido:  string;
}

export interface AuthResponse {
    ok:         boolean;
    user:       User;
    token:      string;
    nameSystem: string;
    menu:       Menu[];
    emp:        Emp;
}

export interface Menu {
    title:    string;
    url?:     string;
    icon:     string;
    subMenu?: Menu[];
}

export interface User {
    id:          number;
    uuid:        string;
    ci:          string;
    password:    string;
    email:       string;
    rol:         string;
    activo:      string;
    id_empleado: number;
}
export interface Emp {
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
}


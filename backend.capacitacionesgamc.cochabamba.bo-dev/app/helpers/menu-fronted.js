const getMenuFrontend = (role = 'OPERADOR') => {

  if (role === 'ADMINISTRADOR' || role === 'DESARROLLADOR') return getMenuRolAdmin();
  if (role === 'USUARIO') return getMenuRolUsuario();
  if (role === 'CONSULTOR') return getMenuRolConsultor();
  return [];
}

const getMenuRolAdmin = () => {
  return [
    {
      title: 'Dashboard',
      url: '/capacitacion/home',
      icon: 'home',
    },
    {
      title: 'Cursos',
      url: '/capacitacion/curso',
      icon: 'school',
    },
    {
      title: 'Capacitaciones',
      url: '/capacitacion/capacitacion',
      icon: 'reduce_capacity',
    },
    {
      title: 'Funcionario',
      url: '/capacitacion/funcionario',
      icon: 'person',
    },
    {
      title: 'Registros',
      url: '/capacitacion/solicitudes_llenadas',
      icon: 'person',
    },
    {
      label: 'Principal',
      items: [
        { label: 'Principal', icon: 'pi pi-fw pi-home', routerLink: ['/capacitacion/home'] }
      ],
    },
    {
      label: 'Cursos',
      items: [
        { label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/capacitacion/cursos'] }
      ],
    },
    {
      label: 'Capacitaciones',
      items: [
        { label: 'Capacitaciones', icon: 'pi pi-fw pi-id-card', routerLink: ['/capacitacion/capacitacion'] }
      ],
    },
    {
      label: 'Funcionario',
      items: [
        { label: 'Funcionario', icon: 'pi pi-fw pi-user', routerLink: ['/capacitacion/funcionario'] }
      ],

    },
    {
      label: 'Resap',
      items: [
        { label: 'Criterio Evaluacion', icon: 'pi pi-fw pi-verified', routerLink: ['/capacitacion/criterio_evaluacion'] }
      ],

    },
    {
      label: 'Solicitud Capacitaciones',
      items: [
        { label: 'Registros', icon: 'pi pi-fw pi-user-edit', routerLink: ['/capacitacion/solicitudes_llenadas'] }
      ],

    },
  ];
}


const getMenuRolUsuario = () => {
  return [
    {
      label: 'Principal',
      items: [
        { label: 'Principal', icon: 'pi pi-fw pi-home', routerLink: ['/capacitacion/home'] }
      ],
    },
    {
      label: 'Capacitaciones',
      items: [
        { label: 'Capacitacion', icon: 'pi pi-fw pi-id-card', routerLink: ['/capacitacion/capacitacion/usuario'] }
      ],
    },
    {
      label: 'Curso',
      items: [
        { label: 'Mis Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/capacitacion/empleado/capacitacion/', { isEmp: 'true' }] }
      ],
    },
    {
      label: 'Solicitud Capacitaciones',
      items: [
        { label: 'Resap33', icon: 'pi pi-fw pi-user-edit', routerLink: ['/capacitacion/resap33'] }
      ],
    },

    {
      title: 'Dashboard',
      url: '/capacitacion/home',
      icon: 'home',
    },
    {
      title: 'Capacitaciones',
      url: '/capacitacion/capacitacion/usuario',
      icon: 'school',
    },
    {
      title: 'Curso',
      url: '3',
      icon: 'history_edu',
    },
    {
      title: 'Registros',
      url: 'capacitacion/resap33',
      icon: 'history_edu',
    },
  ];
}

const getMenuRolConsultor = () => {
  return [
    {
      title: 'Consultas / Reportes',
      url: 'reports/assignments',
      icon: 'fa-solid fa-magnifying-glass',
    },
    {
      title: 'Acerca de',
      url: 'acerca-de',
      icon: 'fa-solid fa-circle-info',
    },
  ];
}

module.exports = {
  getMenuFrontend
}
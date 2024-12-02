const host = 'https://capacitacionesgamcapidev.cochabamba.bo'
export const environment = {
  production: true,
  apiUrls: {
    authentication: '',
    images: host+'/img/curso_externo/',
    auth: host+'/api/v1/auth',
    empleado: host+'/api/v1/empleado',
    users: host+'/api/v1/users',
    cursos: host+'/api/v1/cursos',
    capacitacion: host+'/api/v1/capacitacion',
    inscripcion: host+'/api/v1/inscripcion',        
    planilla:host+'/index.php?r=webservices/v1',
    criterioeva: host+'/api/v1/criterioevaluacion',
    tipoeva: host+'/api/v1/tipoevaluacion',
    resap: host+'/api/v1/resap',

    resap37: host+'/api/v1/resap37',
    resap33: host+'/api/v1/resap33 ',

    reporte: host+'/api/v1/reporte',
    archives : '',
    thirds: host+'/thirds',
    config: host+'/config/web-ui.json',
    time: host+'/time',
    actions: host+'/action'
  },
httpHeaders: {
    'Content-Type': 'application/json'      
    //'Authorization': 'Bearer <token>'
  }
};
// This file can be replaced during build by using the fileReplacements array.
// ng build replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.
const host ='http://localhost:3001'
// const host = 'https://capacitacionesgamcapidev.cochabamba.bo'
export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
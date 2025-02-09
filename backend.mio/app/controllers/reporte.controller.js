const PdfPrinter = require('pdfmake');
const fonts = require('../helpers/generator-pdf/fonts');
const styles = require('../helpers/generator-pdf/styles');
const path = require('path');
const { Op } = require("sequelize");
const fs = require('fs');
const fromDateUTCToText = require('../helpers/date');

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//const { Jobs } = require('../../database/config');
const moment = require('moment');
const { Inscripcion, Curso, sequelize } = require('../database/config');
const { TipoEvaluacion } = require('../database/config');
const { request, response, text } = require('express');
const { alignment } = require('excel4node/distribution/lib/types');

const imagePath = path.join(__dirname, '../../uploads/mpdf/escudo-gamc.png');
const imagePathCertificado = path.join(__dirname, '../../uploads/certificado.jpg');


//  -------------------------------- GENERACION DE CABECERA DE LOS PDF --------------------------------
const dataPdfReturn = (jobs, userAuth) => [
    {
        image: 'data:image/png;base64,' + fs.readFileSync(imagePath, 'base64'),
        width: 50,
        absolutePosition: { x: 25, y: 15 }
    },
    {
        text: 'GOBIERNO AUTÓNOMO MUNICIPAL DEL CERCADO - COCHABAMBA', style: 'titleHeader',
        absolutePosition: { x: 8, y: 34 },
    },
    {
        text: 'REGLAMENTO ESPECIFICO DEL SISTEMA DE ADMINISTRACIÓN DEL PERSONAL', style: 'text', alignment: 'center',
        absolutePosition: { x: 8, y: 50 },
    },
    // {   text: new Date().toLocaleDateString('es-ES', options), style: 'fechaDoc',
    //     absolutePosition: { y: 16 },
    // },
    // {   text: `Impreso por: ${userAuth.employee}`, style: 'fechaDoc',
    //     absolutePosition: {  y: 27 }
    {
        text: 'Conferencia',
    },
    // },
    {
        canvas: [{
            type: 'rect', x: 60, y: -20, w: 470,
            h: 1,
            lineWidth: 1,
            lineColor: '#276fb8'
        }]
    },
    { text: 'EVALUACIÓN DEL EVENTO DE CAPACITACIÓN', style: 'title', absolutePosition: { y: 92 } },
    { text: 'Form. RESAP 36', absolutePosition: { x: 475, y: 102 } },
    { canvas: [{ type: 'rect', x: 430, y: -45, w: 100, h: 30 }] },
];
//---------------------------------------------------
const dataPDFresap37 = (jobs, userAuth) => [
    {
        image: 'data:image/png;base64,' + fs.readFileSync(imagePath, 'base64'),
        width: 50,
        absolutePosition: { x: 25, y: 15 }
    },
    {
        text: 'GOBIERNO AUTÓNOMO MUNICIPAL DEL CERCADO - COCHABAMBA', style: 'titleHeader',
        absolutePosition: { x: 8, y: 34 },
    },
    {
        text: 'REGLAMENTO ESPECIFICO DEL SISTEMA DE ADMINISTRACIÓN DEL PERSONAL', style: 'text', alignment: 'center',
        absolutePosition: { x: 8, y: 50 },
    },
    {
        canvas: [{
            type: 'rect', x: 60, y: -20, w: 470,
            h: 1,
            lineWidth: 1,
            lineColor: '#276fb8'
        }]
    },
    { text: 'EVALUACIÓN DEL EVENTO DE CAPACITACIÓN', style: 'title', absolutePosition: { y: 92 } },
    { text: 'Form. RESAP 37', absolutePosition: { x: 475, y: 102 } },

    { text: 'FECHA |', absolutePosition: { x: 475, y: 102 } },
    { canvas: [{ type: 'rect', x: 430, y: -45, w: 100, h: 30 }] },
];
const dataPDFresap33 = (jobs, userAuth) => [
    {
        image: 'data:image/png;base64,' + fs.readFileSync(imagePath, 'base64'),
        width: 50,
        absolutePosition: { x: 25, y: 15 }
    },
    {
        text: 'GOBIERNO AUTÓNOMO MUNICIPAL DEL CERCADO - COCHABAMBA', style: 'titleHeader',
        absolutePosition: { x: 8, y: 34 },
    },
    {
        text: 'REGLAMENTO ESPECIFICO DEL SISTEMA DE ADMINISTRACIÓN DEL PERSONAL', style: 'text', alignment: 'center',
        absolutePosition: { x: 8, y: 50 },
    },
    {
        canvas: [{
            type: 'rect', x: 60, y: -20, w: 470,
            h: 1,
            lineWidth: 1,
            lineColor: '#276fb8'
        }]
    },
    { text: 'EVALUACIÓN DEL EVENTO DE CAPACITACIÓN', style: 'title', absolutePosition: { y: 92 } },
    { text: 'Form. RESAP 33', absolutePosition: { x: 475, y: 102 } },

    { text: 'FECHA |', absolutePosition: { x: 475, y: -100 } },
    { canvas: [{ type: 'rect', x: 430, y: -45, w: 100, h: 30 }] },
];
//-------------------------------------------------------------------------------------------------------


const generatePdfReportResap = async (req = request, res = response) => {
    try {
        const { status, activo, uuid } = req.query;
        const optionsDb1 = {
            order: [['id', 'ASC']],
            where: {
                [Op.and]: [
                    { uuid },
                ],
            },
            include: [
                { association: 'inscripcion_empleado', attributes: { exclude: ['updatedAt'] } },
                {
                    association: 'incripcion_capacitacion', attributes: { exclude: ['updatedAt'] },
                    include: [
                        { association: 'capacitacion_curso', attributes: { exclude: ['updatedAt'] } }
                    ]
                },
            ]
        };

        let inscReport = await Inscripcion.findAll(optionsDb1);
        let dataPdf = dataPdfReturn(inscReport, req.userAuth); //PDF         
        let a = JSON.stringify(inscReport);
        let b = JSON.parse(a);

        dataPdf.push({ text: 'DATOS DEL EVENTO', style: 'subheader', fontSize: 14, bold: true, });
        var table1 = {
            //layout: 'lightHorizontalLines', // optional
            style: 'tableExample',
            table: {
                //headerRows: 1,
                widths: [184, 75, 75, 75, 75],

                body: [
                    [{ text: 'FECHA DE REALIZACIÓN', bold: true }, { text: 'DESDE', bold: true }, b[0].incripcion_capacitacion.fecha_inicio, { text: 'HASTA', bold: true }, b[0].incripcion_capacitacion.fecha_fin],
                    [{ text: 'HORARIO DE REALIZACIÓN', bold: true }, { text: 'DE HORAS', bold: true }, b[0].incripcion_capacitacion.horario_inicio, { text: 'A HORAS', bold: true }, b[0].incripcion_capacitacion.horario_fin],
                    [{ text: 'NOMBRE DEL EVENTO', bold: true }, { text: b[0].incripcion_capacitacion.capacitacion_curso.nombre, style: 'text', colSpan: 4, alignment: 'center' }],
                    [{ text: 'INSTITUCIÓN ORGANIZADORA', bold: true }, { text: b[0].incripcion_capacitacion.inst_organizadora, style: 'text', colSpan: 4, alignment: 'center' }],
                ]
            }
        };
        dataPdf.push(table1);

        const optionsDb2 = {
            order: [['id', 'ASC']],
            include: [{
                association: 'tipo_criterio', attributes: { exclude: ['updatedAt'] },
                include: [{
                    association: 'criterio_resap', attributes: { exclude: ['updateAt'] },
                    include: [{
                        association: 'inscripcion_resap', attributes: { exclude: ['updateAt'] },
                        where: { [Op.and]: [{ uuid },] },
                    }]
                }]
            }]
        };
        let tipoEva = await TipoEvaluacion.findAll(optionsDb2);
        tipoEva.forEach(resp => {
            dataPdf.push({ text: ' ' });
            dataPdf.push({ text: resp.nombre, style: 'subheader', fontSize: 14, bold: true, });
            var table2 = {
                //layout: 'lightHorizontalLines', // optional
                style: 'tableExample',
                table: {
                    headerRows: 2,
                    widths: [264, 55, 55, 55, 55],

                    body: [
                        [{ text: 'CRITERIO DE EVALUACIÓN', bold: true, rowSpan: 2, alignment: 'center' }, { text: 'PARAMETROS', bold: true, colSpan: 4, alignment: 'center' }, {}, {}, {}],
                        [{}, { text: 'MUY BUENO', bold: true, style: 'criterioEva', alignment: 'center' }, { text: 'BUENO', bold: true, style: 'criterioEva', alignment: 'center' }, { text: 'ACEPTABLE', bold: true, style: 'criterioEva', alignment: 'center' }, { text: 'DEFICIENTE', bold: true, style: 'criterioEva', alignment: 'center' }]
                    ]
                }
            };
            //for criterio evaluacion
            resp.tipo_criterio.forEach(resp2 => {
                const rowTable = [{ text: resp2.nombre, bold: true, style: 'fechaDoc', alignment: 'left' }, { text: resp2.criterio_resap[0].estado == 'MUY BUENO' ? 'X' : '', style: 'marcacionEva' }, { text: resp2.criterio_resap[0].estado == 'BUENO' ? 'X' : '', style: 'marcacionEva' }, { text: resp2.criterio_resap[0].estado == 'ACEPTABLE' ? 'X' : '', style: 'marcacionEva' }, { text: resp2.criterio_resap[0].estado == 'DEFICIENTE' ? 'X' : '', style: 'marcacionEva' }];
                table2.table.body.push(rowTable);
            })

            dataPdf.push(table2);
        });

        var table3 = {
            //layout: 'lightHorizontalLines', // optional
            style: 'tableExample',
            table: {
                //headerRows: 1,
                widths: [520],

                body: [[{ text: ' ', bold: true }],
                ]
            }
        };
        dataPdf.push({ text: ' ' });
        dataPdf.push({ text: 'COMENTARIO DEL PARTICIPANTE', fontSize: 14, bold: true, });
        dataPdf.push(table3);


        let docDefinition = {
            content: dataPdf,
            footer: function (currentPage, pageCount) {
                return [
                    {
                        text: currentPage.toString() + ' de ' + pageCount,
                        alignment: 'right', margin: [0, 20, 20, 0],
                    }
                ]
            },
            // watermark: { text: 'TEST ZOONOSIS', opacity: 0.1, bold: true, italics: false },
            styles: styles,
            pageSize: 'LETTER',
            //pageOrientation: 'landscape',
            pageOrientation: 'portrait',
        };


        const printer = new PdfPrinter(fonts);
        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        let chunks = [];
        pdfDoc.on("data", (chunk) => { chunks.push(chunk); });
        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks);
            res.setHeader('Content-Type', 'application/pdf;');
            res.setHeader('Content-disposition', `filename=report_assignments_${new Date().toJSON().split('T')[0]}.pdf`);
            return res.send(result);
        });
        pdfDoc.end();

    } catch (error) {
        const pathImage = path.join(__dirname, `../../uploads/none-img.jpg`);
        return res.sendFile(pathImage);
    }
}

// --------------------------  PDF de lso resap ------------------------

const generatePdfResap37 = async (req = request, res = response) => {
    try {
        const { status, activo, id } = req.query;
        const optionsDb1 = {
            order: [['id', 'ASC']],
            where: {
                [Op.and]: [
                    { id },
                ],
            },
            include: [
                { association: 'empleados', attributes: { exclude: ['updatedAt'] } },

            ]
        };
        let inscReport = await Inscripcion.findAll(optionsDb1);
        let dataPDF = dataPDFresap37(inscReport, req.userAuth); //PDF         
        let a = JSON.stringify(inscReport);
        let b = JSON.parse(a);

        dataPDF.push({ text: 'DATOS DE IDENTIFICACIÓN', style: 'subheader', fontSize: 14, bold: true, });
        var table1 = {
            stryle: 'tableExample',
            table: {
                headerRows: 2,
                widths: [200, 284],
                body: [
                    [{ text: 'NOMBRE Y APELLIDOS DEL SERVIDOR PUBLICO MUNICIPAL', bold: true }, b[0].empleados.nombre + otro_nombre + paterno + materno],
                    [{ text: 'NOMBRE DEL PUESTO QUE OCUPA', bold: true }, b[0].empleados.cargo],
                    [{ text: 'NOMBRE DEL INMEDIATO SUPERIOR', bould: true }]
                    [{ text: 'PUESTO DEL INMEDIATO SUPERIOR', bould: true }]
                ]
            }
        };
        dataPDF.push(table1);




        const optionsDb2 = {
            order: [['id', 'ASC']],
            include: [
                {
                    association: 'empleados', attributes: { exclude: ['updatedAt'] },
                    include: [{
                        association: 'criterio_resap', attributes: { exclude: ['updateAt'] },
                    }]
                },
            ]
        };
        let tipoArea = await Inscripcion.findAll(optionsDb2);
        dataPdf.push({ text: 'DATOS DEL AREA Y UNIDAD', style: 'subheader', fontSize: 14, bold: true, });
        var table2 = {
            style: 'tableExample',
            table: {
                headerRows: 2,
                widths: [200, 284],
                body: [
                    [{ text: 'OFICIAL MAYOR', bold: true }, {}],
                    [{ text: 'DIRECCION', bould: true }, {}]
                    [{ text: 'DEPARTAMENTO', bould: true }, b[0].empleados.unidad, {}]
                ]
            }
        };
        dataPdf.push(table2);




        const optionsDb3 = {
            order: [['id', 'ASC']],
            where: {
                [Op.and]: [
                    { uuid },
                ],
            },
            include: [
                { association: 'inscripcion_empleado', attributes: { exclude: ['updatedAt'] } },
                {
                    association: 'incripcion_capacitacion', attributes: { exclude: ['updatedAt'] },
                    include: [
                        { association: 'capacitacion_curso', attributes: { exclude: ['updatedAt'] } }
                    ]
                },
            ]
        };
        let datosEvent = await Inscripcion.findAll(optionsDb3);
        dataPdf.push({ text: 'DATOS DEL EVENTO DE LA CAPACITACION', style: 'subheader', fontSize: 14, bold: true, });
        var table3 = {
            style: 'tableExample',
            table: {
                //headerRows: 1,
                widths: [184, 75, 75, 75, 75],
                body: [
                    [{ text: 'FECHA DE REALIZACIÓN', bold: true }, { text: 'DESDE', bold: true }, b[0].incripcion_capacitacion.fecha_inicio, { text: 'HASTA', bold: true }, b[0].incripcion_capacitacion.fecha_fin],
                    [{ text: 'HORARIO DE REALIZACIÓN', bold: true }, { text: 'DE HORAS', bold: true }, b[0].incripcion_capacitacion.horario_inicio, { text: 'A HORAS', bold: true }, b[0].incripcion_capacitacion.horario_fin],
                    [{ text: 'NOMBRE DEL EVENTO', bold: true }, { text: b[0].incripcion_capacitacion.capacitacion_curso.nombre, style: 'text', colSpan: 4, alignment: 'center' }],
                ]
            }
        };
        dataPdf.push(table3);





        const optionsDb4 = {
            order: [['id', 'ASC']],
            include: [
                {
                    association: 'tipo_criterio', attributes: { exclude: ['updatedAt'] },
                    include: [{
                        association: 'criterio_resap', attributes: { exclude: ['updateAt'] },
                        include: [{
                            association: 'inscripcion_resap', attributes: { exclude: ['updateAt'] },
                            where: { [Op.and]: [{ uuid },] },
                        }]
                    }]
                },
            ]
        };
        let tipoEva = await TipoEvaluacion.findAll(optionsDb2);
        tipoEva.forEach(resp => {
            dataPdf.push({ text: ' ' });
            dataPdf.push({ text: resp.nombre, style: 'subheader', fontSize: 14, bold: true, });
            var table4 = {
                //layout: 'lightHorizontalLines', // optional
                style: 'tableExample',
                table: {
                    headerRows: 2,
                    widths: [264, 55, 55, 55, 55],

                    body: [
                        [{ text: 'CRITERIO DE EVALUACIÓN', bold: true, rowSpan: 2, alignment: 'center' }, { text: 'PARAMETROS', bold: true, colSpan: 4, alignment: 'center' }, {}, {}, {}],
                        [{}, { text: 'MUY BUENO', bold: true, style: 'criterioEva', alignment: 'center' }, { text: 'BUENO', bold: true, style: 'criterioEva', alignment: 'center' }, { text: 'ACEPTABLE', bold: true, style: 'criterioEva', alignment: 'center' }, { text: 'DEFICIENTE', bold: true, style: 'criterioEva', alignment: 'center' }]
                    ]
                }
            };
            resp.tipo_criterio.forEach(resp2 => {
                const rowTable = [{ text: resp2.nombre, bold: true, style: 'fechaDoc', alignment: 'left' }, { text: resp2.criterio_resap[0].estado == 'MUY BUENO' ? 'X' : '', style: 'marcacionEva' }, { text: resp2.criterio_resap[0].estado == 'BUENO' ? 'X' : '', style: 'marcacionEva' }, { text: resp2.criterio_resap[0].estado == 'ACEPTABLE' ? 'X' : '', style: 'marcacionEva' }, { text: resp2.criterio_resap[0].estado == 'DEFICIENTE' ? 'X' : '', style: 'marcacionEva' }];
                table4.table.body.push(rowTable);
            })

            dataPdf.push(table4);
        });



        dataPdf.push({ text: ' ' });
        dataPdf.push({ text: 'OTROS COMENTARIOS Y RECOMENDACIONES DEL JEFE INMEDIATO SUPERIOR ', fontSize: 14, bold: true, });
        var table5 = {
            style: 'tableExample',
            table: {
                headerRows: 2,
                widths: [220],

                body: [
                    [{ text: 'COMENTARIOS Y RECOMENDACIONES', bold: true, alignment: 'center' }, { text: 'Firma y sello Jefe Inmediato Superior ', bold: true, alignment: 'center' }],
                    [{}, {}],
                ]
            }
        };
        // dataPdf.push({ text: ' ' });
        // dataPdf.push({ text: 'COMENTARIOS Y RECOMENDACIONES', fontSize: 14, bold: true, });

        dataPdf.push(table5);



        let docDefinition = {
            content: dataPdf,
            footer: function (currentPage, pageCount) {
                return [
                    {
                        text: currentPage.toString() + ' de ' + pageCount,
                        alignment: 'right', margin: [0, 20, 20, 0],
                    }
                ]
            },
            styles: styles,
            pageSize: 'LETTER',
            pageOrientation: 'portrait',
        };

        const printer = new PdfPrinter(fonts);
        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        let chunks = [];
        pdfDoc.on("data", (chunk) => { chunks.push(chunk); });
        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks);
            res.setHeader('Content-Type', 'application/pdf;');
            res.setHeader('Content-disposition', `filename=report_assignments_${new Date().toJSON().split('T')[0]}.pdf`);
            return res.send(result);
        });
        pdfDoc.end();
    }

    catch (error) {
        const pathImage = path.join(__dirname, `../../uploads/none-img.jpg`);
        return res.sendFile(pathImage);
    }
}


const generatePdfResap33 = async (req = request, res = response) => {
    try {
        const { status, activo, uuid } = req.query;
        const optionsDb1 = {
            order: [['id', 'ASC']],
            where: {
                [Op.and]: [
                    { uuid },
                ],
            },
            include: [
                { association: 'ponerLosCriterios', attributes: { exclude: ['updatedAt'] } },

            ]
        };
        let inscReport = await Inscripcion.findAll(optionsDb1);
        let dataPdf = dataPDFresap33(inscReport, req.userAuth); //PDF         
        let a = JSON.stringify(inscReport);
        let b = JSON.parse(a);


        dataPdf.push({
            text: 'DATOS GENERALES DEL SERVIDOR PÚBLICO Y/O TRABAJADOR MUNICIPAL',
            style: 'subheader', fontSize: 14, bold: true,
        });
        var table1 = {
            style: 'tableExample',
            table: {
                widths: [184, 245, 55],

                body: [
                    [{ text: 'NOMBRES Y APELLIDOS', bold: true, alignment: 'center' }, {}],
                    [{ text: 'PUESTO (CARGO)', bold: true, alignment: 'center' }, {}, { text: 'ITEM:', bold: true, colSpan: 1 }],
                    [{ text: 'SECRETARIA', bold: true, alignment: 'center' }, {}],
                    [{ text: 'DIRECCION/COMUNA', bold: true, alignment: 'center' }, {}],
                    [{ text: 'DEPARTAMENTO', bold: true, alignment: 'center' }, {}],
                ]
            }
        };
        dataPdf.push(table1);


        const optionsDb2 = {
            order: [['id', 'ASC']],
            include: [{
                association: 'ponerLosCriterios', attributes: { exclude: [] },
            }]
        };
        let TipoEvalu1 = await TipoEvaluacion.findAll(optionsDb2);
        TipoEvalu1.forEach(resp => {
            dataPdf.push({ text: ' ' });
            dataPdf.push({
                text: '1. Conocimientos que exige el cargo (puesto), de acuerdo a manual de Funciones.',
                style: 'subheader', fontSize: 12, bold: true,
            });

            var table2 = {
                style: 'tableExample',
                table: {
                    widths: [484],

                    body: [
                        [{ text: '', bold: true }],
                    ]
                }
            };
            dataPdf.push(table2);
        });



        const optionsDb3 = {
            order: [['id', 'ASC']],
            include: [{
                association: 'ponerLosCriterios', attributes: { exclude: [] },

            }]
        };
        let TipoEvalu2 = await TipoEvaluacion.findAll(optionsDb3);
        TipoEvalu2.forEach(resp => {
            dataPdf.push({ text: ' ' });
            dataPdf.push({
                text: '2. Que conocimientos se requiere ampliar o conocer el trabajador y/o servidor Público, para poder desempeñar óptimamente sus funciones ',
                style: 'subheader', fontSize: 12, bold: true,
            });

            var table3 = {
                style: 'tableExample',
                table: {
                    widths: [484],

                    body: [
                        [{ text: '', bold: true }],
                    ]
                }
            };
            dataPdf.push(table3);
        });



        const optionsDb4 = {
            order: [['id', 'ASC']],
            include: [{
                association: 'ponerLosCriterios', attributes: { exclude: [] },

            }]
        };
        let TipoEvalu3 = await TipoEvaluacion.findAll(optionsDb4);
        TipoEvalu3.forEach(resp => {
            dataPdf.push({ text: ' ' });
            dataPdf.push({
                text: '3. Las funciones realizadas, a su criterio, qué conocimientos demandan por el trabajador y/o Servidor Público Municipal. La prioridad Podría ser alta, media o baja. ',
                style: 'subheader', fontSize: 12, bold: true,
            });

            var table4 = {
                style: 'tableExample',
                table: {
                    headerRows: 5,
                    widths: [164, 185, 45, 45, 45],

                    body: [
                        [{ text: 'FUNCIONES', bold: true, alignment: 'center' }, { text: 'CONOCIMIENTOS DEMANDADOS', bold: true, alignment: 'center' }, { text: 'PRIORIDAD ALTA', bold: true, alignment: 'center' }, { text: 'PRIORIDA MEDIA', bould: true, alignment: 'center' }, { text: 'PRIORIDA BAJA', bould: true, alignment: 'center' }],
                        [{}, {}, {}, {}, {}]
                    ]
                }
            };
            dataPdf.push(table4);
        });



        const optionsDb5 = {
            order: [['id', 'ASC']],
            include: [{
                association: 'ponerLosCriterios', attributes: { exclude: [] },
            }]
        };
        let TipoEvalu4 = await TipoEvaluacion.findAll(optionsDb5);
        TipoEvalu4.forEach(resp => {
            dataPdf.push({ text: ' ' });
            dataPdf.push({
                text: '  4. Mencione las materias en las que el Trabajador y/o Servidor Público Municipal tiene conocimientos profundos y podria actuar como capacitador. ',
                style: 'subheader', fontSize: 12, bold: true,
            });

            var table5 = {
                style: 'tableExample',
                table: {
                    widths: [42, 200, 200, 42],

                    body: [
                        [{}]
                    ]
                }
            };
            dataPdf.push(table5);
        });


        dataPdf.push({ text: ' ' });
        var table6 = {
            style: 'tableExample',
            table: {
                headerRows: 2,
                widths: [340],

                body: [
                    [{}, {}],
                    [{ text: 'Firma de conformidad Trabajador y/o Servidor Público municipal ', bold: true, alignment: 'center' }, { text: 'Firma y sello Jefe Inmediato Superior ', bold: true, alignment: 'center' }],
                ]
            }
        };
        dataPdf.push(table6);


        let docDefinition = {
            content: dataPdf,
            footer: function (currentPage, pageCount) {
                return [
                    {
                        text: currentPage.toString() + ' de ' + pageCount,
                        alignment: 'right', margin: [0, 20, 20, 0],
                    }
                ]
            },
            styles: styles,
            pageSize: 'LETTER',
            pageOrientation: 'portrait',
        };

        const printer = new PdfPrinter(fonts);
        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        let chunks = [];
        pdfDoc.on("data", (chunk) => { chunks.push(chunk); });
        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks);
            res.setHeader('Content-Type', 'application/pdf;');
            res.setHeader('Content-disposition', `filename=report_assignments_${new Date().toJSON().split('T')[0]}.pdf`);
            return res.send(result);
        });
        pdfDoc.end();

    }
    catch (error) {
        const pathImage = path.join(__dirname, `../../uploads/none-img.jpg`);
        return res.sendFile(pathImage);
    }
}



const inscritosCapacitacion = async (req = request, res = response) => {
    try {
        let { uuid } = req.query;

        const reporte = await getInfoCapacitacion(uuid);

        // Crear un nuevo libro de Excel
        var excel = require('excel4node');
        const wb = new excel.Workbook();
        const ws = wb.addWorksheet('MiHojaDeExcel');
        let titulo = '"PLANILLAS DE INSCRITOS"';
        let curso = await Curso.findOne({
            include: [
                {
                    association: 'curso_capacitacion',
                    attributes: { exclude: ['createdAt', 'status', 'updatedAt'] },
                    where: { uuid }
                }
            ]
        });

        ws.cell(1, 4).string(titulo);
        ws.cell(2, 2).string('CURSO:');
        ws.cell(2, 3).string(curso.nombre + ' DE FECHA:' + new Date(curso.curso_capacitacion[0].fecha_inicio).toLocaleDateString() + " - " + new Date(curso.curso_capacitacion[0].fecha_fin).toLocaleDateString());


        // Configurar el contenido de la hoja de Excel (esto es solo un ejemplo)
        ws.cell(4, 2).string('N°');
        ws.cell(4, 3).string('NOMBRE Y APELLIDO');
        ws.cell(4, 4).string('CARGO');
        ws.cell(4, 5).string('UNIDAD');
        ws.cell(4, 6).string('ITEM');
        ws.cell(4, 7).string('CARNET');
        ws.cell(4, 8).string('ESTADO INSCRIPCION');
        var i = 5;
        var j = 1;

        reporte.forEach(element => {
            ws.cell(i, 2).number(j);
            ws.cell(i, 3).string(element.nombre_completo);
            ws.cell(i, 4).string(element.cargo);
            ws.cell(i, 5).string(element.unidad);
            ws.cell(i, 6).string((element.item > 0) ? '' + element.item : 'EVENTUAL');
            ws.cell(i, 7).string(element.ci);
            ws.cell(i, 8).string(element.estado);
            i = i + 1;
            j = j + 1;
        });

        // Stream the Excel file directly as a response

        // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // res.setHeader('Content-Disposition', `attachment; filename=reporte_ ${titulo} .xlsx`);

        wb.writeToBuffer().then(buffer => {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=${titulo}.xls`);
            res.send(buffer);
            //res.send(buffer);
        }).catch(err => {
            console.error('Error generating Excel file:', err);
            res.status(500).json({ error: 'Error generating Excel file' });
        });

    } catch (error) {

        const pathImage = path.join(__dirname, `../../uploads/none-img.jpg`);
        return res.sendFile(pathImage);
    }

}
const getInfoCapacitacion = async (uuid) => {

    try {

        let lista = await sequelize.query(`SELECT 
        ee.ci, concat_ws (' ', ee.nombre, ee.otro_nombre, ee.paterno, ee.materno ) AS nombre_completo, ee.cargo, ee.unidad, ee.item  ,i.estado    
        FROM empleados ee 
        inner join inscripcions i ON  i.id_empleado = ee.id inner join capacitacions c on c.id = i.id_capacitacion 
        where c.uuid = '${uuid}' order by  i.estado asc, ee.item asc`,
            { type: Op.SELECT });
        return lista[0];

    } catch (error) {

    }
}
// ---------------------------------



const generarCertificado = async (req = request, res = response) => {
    const { status, activo, uuid } = req.query; //uuid inscripcion
    const optionsDb1 = {
        order: [['id', 'ASC']],
        where: {
            [Op.and]: [
                { uuid },
            ],
        },
        include: [
            { association: 'inscripcion_empleado', attributes: { exclude: ['updatedAt'] } },
            {
                association: 'incripcion_capacitacion', attributes: { exclude: ['updatedAt'] },
                include: [
                    { association: 'capacitacion_curso', attributes: { exclude: ['updatedAt'] } }
                ]
            },
        ]
    };
    let inscReport = await Inscripcion.findAll(optionsDb1);
    let nombre_completo = inscReport[0].inscripcion_empleado.nombre + " " + inscReport[0].inscripcion_empleado.otro_nombre + " " + inscReport[0].inscripcion_empleado.paterno + " " + inscReport[0].inscripcion_empleado.materno;
    let nombre_curso = inscReport[0].incripcion_capacitacion.capacitacion_curso.nombre;
    let inst_organizadora = inscReport[0].incripcion_capacitacion.inst_organizadora;
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    let fecha_inicio = fromDateUTCToText(inscReport[0].incripcion_capacitacion.fecha_inicio) /*(new Date(inscReport[0].incripcion_capacitacion.fecha_inicio)).toLocaleDateString('es-BO', options) ;*/
    let carga_horaria = inscReport[0].incripcion_capacitacion.carga_horaria;
    dataPdf = [
        {
            image: 'data:image/png;base64,' + fs.readFileSync(imagePathCertificado, 'base64'),
            width: 800,
            height: 610,
            absolutePosition: { x: 0, y: 0 }
        },
        {
            text: nombre_completo.toUpperCase(), style: 'name',
            absolutePosition: { x: 100, y: 290 },
        },
        {
            stack: [
                {
                    text: [
                        'Por haber participado del Taller de Capacitación "',
                        { text: nombre_curso, italics: true, color: 'violet', },
                        '" , organizado por ', { text: inst_organizadora, italics: true }, ', desarrollado en fecha ', { text: fecha_inicio, italics: true }, ' con una carga horaria de ', , { text: carga_horaria, italics: true }, ' horas académicas.'
                    ], alignment: 'center',
                },
            ],
            style: 'superMargin'
        },
        // {   text: `Por haber participado del Taller de Capacitación “${nombre_curso}”, organizado por ${inst_organizadora}, desarrollado en fecha ${fecha_inicio}, con una carga horaria de ${carga_horaria} horas académicas. `,style: 'text', alignment:'center',
        //     absolutePosition: { x:50, y: 350 },
        // },                
    ];

    //dataPdf.push(table1);
    let docDefinition = {
        content: dataPdf,
        // footer: function(currentPage, pageCount) { return [
        //     {
        //         text: currentPage.toString() + ' de ' + pageCount,
        //         alignment:'right', margin:[0,20,20,0], 
        //     }
        // ] },
        // watermark: { text: 'TEST ZOONOSIS', opacity: 0.1, bold: true, italics: false },
        styles: styles,
        pageSize: 'LETTER',
        pageOrientation: 'landscape',
        //pageOrientation: 'portrait',
    };

    const printer = new PdfPrinter(fonts);
    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    let chunks = [];
    pdfDoc.on("data", (chunk) => { chunks.push(chunk); });
    pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        res.setHeader('Content-Type', 'application/pdf;');
        res.setHeader('Content-disposition', `filename=report_assignments_${new Date().toJSON().split('T')[0]}.pdf`);

        return res.send(result);
    });
    pdfDoc.end();
}



module.exports = {
    generatePdfReportResap,
    generatePdfResap37,
    generatePdfResap33,
    inscritosCapacitacion,
    generarCertificado

};
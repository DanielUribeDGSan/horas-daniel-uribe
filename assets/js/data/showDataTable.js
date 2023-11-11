var taskRef = db.collection('col-sala').doc('horas-uribe').collection('tareas');
(async () => {
  var dataSet = new Array();
  var totalHours = 0; // Variable para almacenar el total de horas

  await taskRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const project = doc.data().project;
      const task = doc.data().task;
      const time = parseFloat(doc.data().time);

      dataSet.push([project, task, time.toFixed(2)]);

      // Sumar las horas al total
      totalHours += time;
      totalHoursPending = 160.0 - totalHours;
    });

    // Llamar a la función de dataTable con el nuevo dataSet y el total
    dataTable('#taskTables', dataSet, totalHours.toFixed(2), totalHoursPending);

    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const fecha = new Date();
    const nombreMes = meses[fecha.getMonth()];

    // Concatenar el mes al título
    document.title = `Horas Daniel Uribe | ${nombreMes}`;
  });
})();

const dataTable = (id, dataSet, total) => {
  $(id).DataTable({
    dom: 'Bfrtip',
    language: {
      decimal: '',
      emptyTable: 'No hay datos disponibles en la tabla',
      info: 'Demostración _START_ en _END_, de _TOTAL_ de mis horas',
      infoEmpty: 'Showing 0 to 0 of 0 entries',
      infoFiltered: '(filtrado de _MAX_ total entradas)',
      infoPostFix: '',
      thousands: ',',
      lengthMenu: 'Seleccionar el número de entradas _MENU_',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: 'Buscar:',
      zeroRecords: 'No se encontraron registros coincidentes',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: 'Siguiente',
        previous: 'Anterior',
      },
      aria: {
        sortAscending: ': activar para ordenar la columna ascendente',
        sortDescending: ': activar para ordenar la columna descendente',
      },
    },
    dom: 'lBfrtip',
    buttons: [
      // {
      //   extend: 'print',
      //   text: '<i class="fas fa-print"></i>',
      //   titleAttr: 'Imprimir tabla',
      //   exportOptions: {
      //     columns: ':visible',
      //   },
      //   customize: function (win) {
      //     $(win.document.body)
      //       .css('font-size', '10pt')
      //       .prepend(
      //         '<img src="../theme-assets/images/China-Logo.png" style="position:absolute; top:0; left:0;" />'
      //       );

      //     $(win.document.body)
      //       .find('table')
      //       .addClass('compact')
      //       .css('font-size', 'inherit');
      //   },
      // },
      // {
      //   extend: 'excelHtml5',
      //   text: '<i class="fas fa-file-excel"></i>',
      //   titleAttr: 'Exportar a Excel',
      //   autoFilter: true,
      //   sheetName: 'Exported data',
      //   exportOptions: {
      //     columns: ':visible',
      //   },
      //   customize: function (output, config, rows) {
      //     // Agregar la fila de total al contenido de CSV
      //     output += `\nTotal, ,${total}`;
      //     return output;
      //   },
      // },
      {
        extend: 'csvHtml5',
        text: '<i class="fas fa-file-csv"></i>',
        titleAttr: 'Exportar a CSV',
        charset: 'UTF-16LE',
        bom: true,
        autoFilter: false,
        exportOptions: {
          columns: ':visible',
        },
        customize: function (output, config, rows) {
          // Agregar la fila de total al contenido de CSV
          output += `\nTotal, ,${total}`;
          output += `\nHoras no asignadas, ,${totalHoursPending.toFixed(2)}`;
          return output;
        },
      },
      // {
      //   extend: 'pdfHtml5',
      //   messageTop: '',
      //   text: '<i class="fas fa-file-pdf"></i>',
      //   titleAttr: 'Exportar a PDF',
      //   orientation: 'landscape',
      //   pageSize: 'LEGAL',
      //   filename: 'Horas-Daniel-Uribe',
      //   exportOptions: {
      //     columns: ':visible',
      //   },
      //   customize: function (output, config, rows) {
      //     // Agregar la fila de total al contenido de CSV
      //     output += `\nTotal, ,${total}`;
      //     return output;
      //   },
      // },
      {
        extend: 'colvis',
        text: '<i class="fas fa-columns"> </i>',
        titleAttr: 'Visibilidad de las columnas',
      },
    ],
    lengthMenu: [
      [10, 20, 30, 50, -1],
      [10, 20, 30, 50, 'Todos'],
    ],
    data: dataSet,
    columns: [
      {
        title: 'Proyecto',
      },
      {
        title: 'Tareas',
      },
      {
        title: 'Horas y minutos',
      },
    ],
  });
};

var projectRef = db
  .collection('col-sala')
  .doc('horas-uribe')
  .collection('proyectos');
var taskRef = db.collection('col-sala').doc('horas-uribe').collection('tareas');
var projectHours = [];

(async () => {
  await taskRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const project = data.project;
      const time = parseFloat(data.time); // Parsear a float

      // Buscar si el proyecto ya está en el arreglo
      const existingProject = projectHours.find(
        (item) => item.project === project
      );

      // Si el proyecto ya existe en el arreglo, suma las horas
      if (existingProject) {
        existingProject.tasks += time;
      } else {
        // Si el proyecto no existe en el arreglo, crea un nuevo objeto
        projectHours.push({
          project: project,
          tasks: time,
        });
      }
    });
  });

  // Formatear los números con dos decimales
  projectHours.forEach((item) => {
    item.tasks = item.tasks.toFixed(2);
  });

  // Luego, puedes llamar a la siguiente parte de tu código o a otra función.
  renderProjects();
})();

const renderProjects = () => {
  const contentProyects = document.querySelector('#content-projects');

  projectHours.map((doc) => {
    contentProyects.innerHTML += `
          <div class="col-xl-3 col-sm-6 mb-4">
            <div class="card h-100">
              <div class="card-body p-3 min-height-150">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">                  
                      <h5 class="font-weight-bolder">
                      ${doc.project}
                      </h5>
                      <p><strong>Horas:</strong>  ${doc.tasks}</p>                  
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div
                      class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                      <i
                        class="ni ni-money-coins text-lg opacity-10"
                        aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;
  });
};

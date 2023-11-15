var projectRef = db
  .collection('col-sala')
  .doc('horas-uribe')
  .collection('proyectos');
var taskRef = db.collection('col-sala').doc('horas-uribe').collection('tareas');
var month = 11;
var year = 23;

const createProject = () => {
  const project = document.querySelector('#project');

  if (!project.value) {
    Swal.fire({
      title: 'Campo vacío',
      text: 'El campo es obligatorio',
      icon: 'warning',
      confirmButtonText: `
      Aceptar
    `,
    });
    return;
  }

  projectRef
    .add({
      project: project.value,
      month,
      year,
    })
    .then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Proyecto registrado',
        showConfirmButton: false,
        timer: 1500,
      });
      project.value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

const addTask = () => {
  const projectSelect = document.querySelector('#projectSelect');
  const task = document.querySelector('#task');
  const time = document.querySelector('#time');
  const currentDate = new Date();
  const taskDate = currentDate.toISOString();

  if (!projectSelect.value || !task.value || !time.value || time.value === 0) {
    Swal.fire({
      title: 'Campos vacíos',
      text: 'Los campos son obligatorios',
      icon: 'warning',
      confirmButtonText: `
      Aceptar
    `,
    });
    return;
  }

  taskRef
    .add({
      project: projectSelect.value,
      task: task.value,
      time: parseFloat(time.value),
      month,
      year,
      dateTime: taskDate,
    })
    .then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tarea registrada',
        showConfirmButton: false,
        timer: 1500,
      });
      projectSelect.value = '';
      task.value = '';
      time.value = 0;
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

(async () => {
  const projectSelect = document.querySelector('#projectSelect');
  await projectRef.onSnapshot((querySnapshot) => {
    let options = `<option selected value="">Selecciona una opción</option>`;
    querySnapshot.forEach((doc) => {
      options += `<option value="${doc.data().project}">${
        doc.data().project
      }</option>`;
      projectSelect.innerHTML = options;
    });
  });
})();

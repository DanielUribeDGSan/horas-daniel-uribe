const onClickRegister = () => {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  if (!email.value || !password.value) {
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

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(() => {
      // Signed in
      // var user = userCredential.user;
      persistenceUser(email.value);
      window.location.href = '../index.html';

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      Swal.fire({
        title: 'Campos vacíos',
        text: errorMessage,
        icon: 'warning',
        confirmButtonText: `
          Aceptar
        `,
      });
      return;

      console.log(error);
      // ..
    });
};

const onClickLogIn = () => {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  if (!email.value || !password.value) {
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

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      // Signed in

      persistenceUser(email.value);
      window.location.href = '../index.html';
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.message);
      Swal.fire({
        title: 'Campos vacíos',
        text: errorMessage,
        icon: 'warning',
        confirmButtonText: `
        Aceptar
      `,
      });
    });
};

// logOut();
getUser();

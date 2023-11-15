const togglePassword = () => {
  var passwordInput = document.getElementById('password');
  var toggleIcon = document.getElementById('toggleIcon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.src =
      'https://img.icons8.com/material-outlined/24/000000/invisible.png';
  } else {
    passwordInput.type = 'password';
    toggleIcon.src =
      'https://img.icons8.com/material-outlined/24/000000/visible.png';
  }
};

const persistenceUser = (email) => {
  localStorage.setItem('usuarioIronbit', email);
};

const getUser = () => {
  const usuarioGuardado = localStorage.getItem('usuarioIronbit');

  return usuarioGuardado || null;
};

const logOut = () => {
  const path = window.location.pathname;
  const isPage = path.includes('/pages');

  firebase
    .auth()
    .signOut()
    .then(() => {
      // Eliminar un objeto específico de localStorage
      localStorage.removeItem('usuarioIronbit');
      if (isPage) {
        window.location.href = './iniciar-sesion.html';
      } else {
        window.location.href = './pages/iniciar-sesion.html';
      }
    })
    .catch((error) => {
      // An error happened.
    });
};

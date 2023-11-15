(() => {
  const user = getUser();
  const path = window.location.pathname;
  const isPage = path.includes('/pages');

  if (!user) {
    if (isPage) {
      window.location.href = './iniciar-sesion.html';
    } else {
      window.location.href = './pages/iniciar-sesion.html';
    }
  }
})();

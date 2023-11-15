(() => {
  const user = getUser();
  const path = window.location.pathname;
  const isPage = path.includes('/pages');

  if (user) {
    if (isPage) {
      window.location.href = '../index.html';
    } else {
      window.location.href = './index.html';
    }
  }
})();

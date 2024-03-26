// preload.js

window.addEventListener('beforeunload', (event) => {
    // Guardar el estado de la aplicación antes de recargar la página si es necesario
    localStorage.setItem('appState', JSON.stringify(appState));
  
    // Recargar la página
    location.reload();
  });
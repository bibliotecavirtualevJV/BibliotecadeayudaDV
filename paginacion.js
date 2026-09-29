/**
 * Renderiza la barra de paginación
 * @param {number} totalRegistros - Total de libros
 * @param {number} paginaActual - Página activa actual
 * @param {string} idContenedor - ID del contenedor HTML
 * @param {string} urlDestino - Archivo HTML de destino ('catalogo.html')
 * @param {boolean} forzarPaginaUno - Si es true, TODOS los botones redirigen a la página 1
 */
function renderizarPaginacion(totalRegistros, paginaActual, idContenedor = 'paginacion-bottom', urlDestino = '', forzarPaginaUno = false) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = '';
  const limitePorPagina = 50;
  const totalPaginas = Math.ceil(totalRegistros / limitePorPagina) || 1;

  if (totalPaginas <= 1) return;

  const baseUrl = urlDestino ? urlDestino : window.location.pathname.split('/').pop();

  for (let i = 1; i <= totalPaginas; i++) {
    if (totalPaginas > 7 && i > 3 && i < totalPaginas - 1 && Math.abs(i - paginaActual) > 1) {
      if (i === 4 || i === totalPaginas - 2) {
        const puntos = document.createElement('span');
        puntos.textContent = '...';
        puntos.style.padding = '0 5px';
        contenedor.appendChild(puntos);
      }
      continue;
    }

    const btn = document.createElement('a');
    btn.textContent = i;
    
    // Si forzarPaginaUno es true, redirige SIEMPRE a la pagina 1
    const numPaginaDestino = forzarPaginaUno ? 1 : i;
    btn.href = `${baseUrl}?pagina=${numPaginaDestino}`;
    
    btn.className = `btn-pagina ${i === paginaActual ? 'activo' : ''}`;
    contenedor.appendChild(btn);
  }

  if (paginaActual < totalPaginas) {
    const btnSiguiente = document.createElement('a');
    btnSiguiente.textContent = 'Página siguiente »';
    
    const pagSiguienteDestino = forzarPaginaUno ? 1 : (paginaActual + 1);
    btnSiguiente.href = `${baseUrl}?pagina=${pagSiguienteDestino}`;
    
    btnSiguiente.className = 'btn-siguiente';
    contenedor.appendChild(btnSiguiente);
  }
}
function renderizarPaginacion(totalRegistros, paginaActual, idContenedor = 'paginacion-bottom', urlDestino = '', forzarPaginaUno = false) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = '';
  
  // Define cuántos libros van por página para calcular el total real
  const limitePorPagina = 50; 
  const totalPaginas = Math.ceil(totalRegistros / limitePorPagina) || 1;

  // Si solo hay 1 página, no es necesario mostrar la barra
  if (totalPaginas <= 1) return;

  const baseUrl = urlDestino ? urlDestino : window.location.pathname.split('/').pop();

  // Se crean ÚNICAMENTE las páginas que existen en totalPaginas
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('a');
    btn.textContent = i;
    
    // En el index envía a la página 1 del catálogo si forzarPaginaUno es true
    const numPaginaDestino = forzarPaginaUno ? 1 : i;
    btn.href = `${baseUrl}?pagina=${numPaginaDestino}`;
    
    btn.className = `btn-pagina ${i === paginaActual ? 'active' : ''}`;
    contenedor.appendChild(btn);
  }

  // Si hay más de una página, muestra el botón Siguiente
  if (paginaActual < totalPaginas) {
    const btnSiguiente = document.createElement('a');
    btnSiguiente.textContent = 'Página siguiente »';
    const pagSiguienteDestino = forzarPaginaUno ? 1 : (paginaActual + 1);
    btnSiguiente.href = `${baseUrl}?pagina=${pagSiguienteDestino}`;
    btnSiguiente.className = 'btn-pagina btn-siguiente';
    contenedor.appendChild(btnSiguiente);
  }
}
  }
}

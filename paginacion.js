/**
 * Renderiza la barra de paginación
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
    const btn = document.createElement('a');
    btn.textContent = i;
    
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
    btnSiguiente.className = 'btn-pagina btn-siguiente';
    contenedor.appendChild(btnSiguiente);
  }
}
    btnSiguiente.href = `${baseUrl}?pagina=${pagSiguienteDestino}`;
    btnSiguiente.className = 'btn-pagina btn-siguiente';
    contenedor.appendChild(btnSiguiente);
  }
}

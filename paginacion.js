/**
 * Renderiza la barra de paginación
 * @param {number} totalRegistros - Total de libros recuperados
 * @param {number} paginaActual - Página activa actual (ej. 1)
 * @param {string} idContenedor - ID del contenedor HTML ('paginacion-bottom')
 * @param {string} urlDestino - Archivo HTML de destino ('catalogo.html')
 * @param {boolean} forzarPaginaUno - Si es true, redirige a la página 1
 */
function renderizarPaginacion(totalRegistros, paginaActual = 1, idContenedor = 'paginacion-bottom', urlDestino = 'catalogo.html', forzarPaginaUno = false) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    contenedor.innerHTML = '';

    // Cambiado a 10 (o la cantidad de libros que muestres por fila/página)
    const limitePorPagina = 1; 
    const totalPaginas = Math.ceil(totalRegistros / limitePorPagina) || 1;

    // Si solo hay 1 página, no se muestran botones
    if (totalPaginas <= 1) return;

    const baseUrl = urlDestino ? urlDestino : window.location.pathname.split('/').pop();

    for (let i = 1; i <= totalPaginas; i++) {
        // Lógica de puntos suspensivos si hay más de 7 páginas
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
        
        const numPaginaDestino = forzarPaginaUno ? 1 : i;
        btn.href = `${baseUrl}?pagina=${numPaginaDestino}`;
        
        // Asignamos la clase activa
        btn.className = `btn-pagina ${i === Number(paginaActual) ? 'activo' : ''}`;
        contenedor.appendChild(btn);
    }

    // Botón de Página Siguiente
    if (paginaActual < totalPaginas) {
        const btnSiguiente = document.createElement('a');
        btnSiguiente.textContent = 'Página siguiente »';
        
        const pagSiguienteDestino = forzarPaginaUno ? 1 : (Number(paginaActual) + 1);
        btnSiguiente.href = `${baseUrl}?pagina=${pagSiguienteDestino}`;
        
        btnSiguiente.className = 'btn-pagina btn-siguiente';
        contenedor.appendChild(btnSiguiente);
    }
}

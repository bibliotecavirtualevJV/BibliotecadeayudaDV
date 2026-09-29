// 1. REGENERAR OPCIONES DEL SELECT 'ASIGNATURA'
function actualizarOpcionesAsignatura() {
  const selectCarrera = document.getElementById('select-carrera')?.value || 'todas';
  const selectCiclo = document.getElementById('select-ciclo')?.value || 'todos';
  const selectAsignatura = document.getElementById('select-asignatura');

  if (!selectAsignatura || typeof BASE_CURSOS === 'undefined') return;

  // Filtrar asignaturas compatibles con lectura flexible de llaves
  const asignaturasCompatibles = BASE_CURSOS.filter(curso => {
    const valCarrera = String(curso.carrera || curso.carrera_id || '');
    const valCiclo = String(curso.ciclo || curso.ciclo_id || '');

    const coincideCarrera = (selectCarrera === 'todas' || valCarrera === selectCarrera);
    const coincideCiclo = (selectCiclo === 'todos' || valCiclo === String(selectCiclo));
    return coincideCarrera && coincideCiclo;
  });

  const valorPrevio = selectAsignatura.value;
  selectAsignatura.innerHTML = '<option value="todas">Todas las asignaturas</option>';

  asignaturasCompatibles.forEach(curso => {
    const idCurso = curso.id || curso.codigo || '';
    const nombreCurso = curso.nombre || curso.titulo || '';
    const option = document.createElement('option');
    option.value = idCurso;
    option.textContent = `${idCurso} - ${nombreCurso}`;
    selectAsignatura.appendChild(option);
  });

  if (Array.from(selectAsignatura.options).some(opt => opt.value === valorPrevio)) {
    selectAsignatura.value = valorPrevio;
  } else {
    selectAsignatura.value = 'todas';
  }
}

// 2. FILTRADO PRINCIPAL Y MANEJO DE VISTA PREVIA
function aplicarFiltrosMultiples() {
  if (typeof BASE_CURSOS === 'undefined') return;

  const carrera = document.getElementById('select-carrera')?.value || 'todas';
  const ciclo = document.getElementById('select-ciclo')?.value || 'todos';
  const asignatura = document.getElementById('select-asignatura')?.value || 'todas';
  const texto = (document.getElementById('input-buscador')?.value || '').toLowerCase().trim();

  // Filtrado de la base de datos completa
  let resultado = BASE_CURSOS.filter(curso => {
    const valCarrera = String(curso.carrera || curso.carrera_id || '');
    const valCiclo = String(curso.ciclo || curso.ciclo_id || '');
    const valAsignatura = String(curso.id || curso.codigo || curso.codigo_curso || curso.asignatura || '');
    const valNombre = String(curso.nombre || curso.titulo || '').toLowerCase();

    const coincideCarrera = (carrera === 'todas' || valCarrera === carrera);
    const coincideCiclo = (ciclo === 'todos' || valCiclo === String(ciclo));
    const coincideAsignatura = (asignatura === 'todas' || valAsignatura === asignatura);
    const coincideTexto = (texto === '' || valNombre.includes(texto));

    return coincideCarrera && coincideCiclo && coincideAsignatura && coincideTexto;
  });

  const sinFiltroAplicado = (carrera === 'todas' && ciclo === 'todos' && asignatura === 'todas' && texto === '');

  // Muestra solo 6 de vista previa si no se ha aplicado ningún filtro
  const librosAMostrar = sinFiltroAplicado ? resultado.slice(0, 6) : resultado;
  renderizarCursosResultantes(librosAMostrar);

  // Genera la paginación con el TOTAL de la base si no hay filtro, o sobre el total filtrado
  if (typeof renderizarPaginacion === 'function') {
    const totalParaPaginacion = sinFiltroAplicado ? BASE_CURSOS.length : resultado.length;
    renderizarPaginacion(totalParaPaginacion, 1, 'paginacion-principal', 'catalogo.html', true);
  }
}

// 3. RENDERIZADO DE TARJETAS EN HTML
// 3. RENDERIZADO DE TARJETAS EN HTML (CON PORTADAS)
function renderizarCursosResultantes(lista) {
  // Intenta encontrar el contenedor por los ID/clases más comunes
  const contenedor = document.getElementById('grid-libros') || 
                     document.getElementById('contenedor-tarjetas') || 
                     document.querySelector('.catalogo-grid');

  if (!contenedor) return;

  contenedor.innerHTML = '';

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
        <p>No se encontraron publicaciones o recursos para este filtro.</p>
      </div>`;
    return;
  }

  lista.forEach(curso => {
    const card = document.createElement('div');
    card.className = 'libro-card';

    // Genera la etiqueta <img> si la propiedad portada existe
    const htmlPortada = curso.portada 
      ? `<img src="${curso.portada}" alt="${curso.nombre || curso.titulo}" class="portada-img" style="width: 100%; height: 220px; object-fit: cover; border-radius: 8px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
         <div class="portada-placeholder" style="display: none; background: #5b2c91; color: #fff; padding: 25px 15px; text-align: center; border-radius: 8px;">
           <strong>${curso.id || curso.codigo || 'LIBRO'}</strong>
         </div>`
      : `<div class="portada-placeholder" style="background: #5b2c91; color: #fff; padding: 25px 15px; text-align: center; border-radius: 8px;">
           <strong>${curso.id || curso.codigo || 'LIBRO'}</strong>
         </div>`;

    card.innerHTML = `
      <div class="portada-wrapper" style="position: relative;">
        ${htmlPortada}
        <span class="badge-formato" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem;">${(curso.modalidad || 'PDF').toUpperCase()}</span>
      </div>
      <div class="libro-info" style="padding: 15px 0;">
        <h4 style="margin: 5px 0;">${curso.nombre || curso.titulo}</h4>
        <p class="autor" style="font-size: 0.85rem; color: #555;">Categoría: ${curso.categoria || 'General'}</p>
        <a href="${curso.link || '#'}" class="btn-descargar-card" target="_blank" style="display:inline-block; margin-top:10px; background:#5b2c91; color:#fff; padding:8px 12px; border-radius:6px; text-decoration:none;">
          <i class="fa-solid fa-download"></i> Descargar
        </a>
      </div>
    `;
    contenedor.appendChild(card);
  });
}
// 4. RESTABLECER FILTROS A ESTADO INICIAL
function limpiarFiltros() {
  const selectCarrera = document.getElementById('select-carrera');
  const selectCiclo = document.getElementById('select-ciclo');
  const selectAsignatura = document.getElementById('select-asignatura');
  const inputBuscador = document.getElementById('input-buscador');

  if (selectCarrera) selectCarrera.value = 'todas';
  if (selectCiclo) selectCiclo.value = 'todos';
  if (inputBuscador) inputBuscador.value = '';

  actualizarOpcionesAsignatura();
  if (selectAsignatura) selectAsignatura.value = 'todas';

  aplicarFiltrosMultiples();
}

// 5. ESCUCHADORES DE EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  const selectCarrera = document.getElementById('select-carrera');
  const selectCiclo = document.getElementById('select-ciclo');
  const selectAsignatura = document.getElementById('select-asignatura');

  if (selectCarrera) {
    selectCarrera.addEventListener('change', () => {
      actualizarOpcionesAsignatura();
      aplicarFiltrosMultiples();
    });
  }

  if (selectCiclo) {
    selectCiclo.addEventListener('change', () => {
      actualizarOpcionesAsignatura();
      aplicarFiltrosMultiples();
    });
  }

  if (selectAsignatura) {
    selectAsignatura.addEventListener('change', aplicarFiltrosMultiples);
  }

  // Carga inicial
  actualizarOpcionesAsignatura();
  aplicarFiltrosMultiples();
});

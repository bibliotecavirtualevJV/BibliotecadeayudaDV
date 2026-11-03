// 1. REGENERAR OPCIONES DEL SELECT 'ASIGNATURA'
function actualizarOpcionesAsignatura() {
  const selectCarrera = document.getElementById('select-carrera')?.value || 'todas';
  const selectCiclo = document.getElementById('select-ciclo')?.value || 'todos';
  const selectAsignatura = document.getElementById('select-asignatura');

  if (!selectAsignatura || typeof BASE_CURSOS === 'undefined') return;

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

// 2. FILTRADO PRINCIPAL
function aplicarFiltrosMultiples() {
  if (typeof BASE_CURSOS === 'undefined') {
    console.error("BASE_CURSOS no está definido. Revisa que cursos.js cargue antes.");
    return;
  }

  const carrera = document.getElementById('select-carrera')?.value || 'todas';
  const ciclo = document.getElementById('select-ciclo')?.value || 'todos';
  const asignatura = document.getElementById('select-asignatura')?.value || 'todas';
  const texto = (document.getElementById('input-buscador')?.value || '').toLowerCase().trim();

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
  const librosAMostrar = sinFiltroAplicado ? resultado.slice(0, 6) : resultado;

  renderizarCursosResultantes(librosAMostrar);

  if (typeof renderizarPaginacion === 'function') {
    const totalParaPaginacion = sinFiltroAplicado ? BASE_CURSOS.length : resultado.length;
    renderizarPaginacion(totalParaPaginacion, 1, 'paginacion-principal', 'catalogo.html', true);
  }
}

// 3. RENDERIZADO DE TARJETAS
function renderizarCursosResultantes(lista) {
  const contenedor = document.getElementById('grid-libros');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
        <p>No se encontraron publicaciones o recursos para este filtro.</p>
      </div>`;
    return;
  }

  lista.forEach(curso => {
    const card = document.createElement('div');
    card.className = 'libro-card';

    let contenidoPortada = '';
    if (curso.portada && curso.portada.trim() !== '') {
      contenidoPortada = `<img src="${curso.portada}" alt="${curso.nombre || curso.titulo || 'Libro'}" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
      contenidoPortada = `<strong style="padding: 10px; font-size: 0.9rem;">${curso.id || curso.codigo || 'LIBRO'}</strong>`;
    }

    card.innerHTML = `
      <div class="portada-wrapper">
        <div class="portada-placeholder" style="background: #5b2c91; color: #fff; height: 180px; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; border-radius: 8px; position: relative;">
          ${contenidoPortada}
          <span class="badge-formato" style="position: absolute; bottom: 10px; right: 10px; background: #000; color: #fff; padding: 3px 8px; font-size: 0.75rem; font-weight: bold; border-radius: 4px;">${(curso.modalidad || 'PDF').toUpperCase()}</span>
        </div>
      </div>
      <div class="libro-info" style="padding: 15px 0;">
        <h4 style="margin: 5px 0; font-size: 1rem; color: #1a2b4c;">${curso.nombre || curso.titulo || 'Sin título'}</h4>
        <p class="autor" style="font-size: 0.85rem; color: #555; margin-bottom: 12px;">Por: ${curso.autor || 'Cátedra Académica'}</p>
        <a href="${curso.link || '#'}" class="btn-descargar-card" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; background:#5b2c91; color:#fff; padding:10px; border-radius:8px; text-decoration:none; font-weight: bold;">
          <i class="fa-solid fa-download"></i> Descargar
        </a>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// 4. RESTABLECER FILTROS
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

// 5. INICIALIZACIÓN
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

  actualizarOpcionesAsignatura();
  aplicarFiltrosMultiples();
});



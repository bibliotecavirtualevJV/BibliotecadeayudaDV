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

// 3. RENDERIZADO DE TARJETAS (Con botones apilados: Me gusta arriba, Descargar abajo)
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

    let imgSrc = curso.portada || '';
    if (imgSrc.includes('drive.google.com')) {
      const matchId = imgSrc.match(/[-\w]{25,}/);
      if (matchId) {
        imgSrc = `https://lh3.googleusercontent.com/d/${matchId[0]}`;
      }
    }

    const idRecurso = curso.id || curso.codigo || curso.tituloLibro || curso.nombreLibro;
    const tituloLibro = curso.nombreLibro || curso.tituloLibro || curso.nombre || 'Recurso Académico';
    const cursoAsociado = curso.nombre || '';

    const esFav = (typeof usuarioActual !== 'undefined' && usuarioActual) 
      ? (JSON.parse(localStorage.getItem(`favs_${usuarioActual.uid}`)) || []).includes(idRecurso)
      : false;

    let contenidoPortada = '';
    if (imgSrc && imgSrc.trim() !== '') {
      contenidoPortada = `
        <img src="${imgSrc}" alt="Portada" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;" onerror="this.style.display='none';">
      `;
    } else {
      contenidoPortada = `<strong style="padding: 10px; font-size: 0.95rem; position: relative; z-index: 1; color: white;">${tituloLibro}</strong>`;
    }

    card.innerHTML = `
      <div class="portada-wrapper">
        <div class="portada-placeholder" style="background: linear-gradient(135deg, #5b2c91, #3b1d59); color: #fff; height: 180px; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; border-radius: 8px; position: relative;">
          ${contenidoPortada}
          <span class="badge-formato" style="position: absolute; bottom: 10px; right: 10px; background: #000; color: #fff; padding: 3px 8px; font-size: 0.75rem; font-weight: bold; border-radius: 4px; z-index: 2;">${(curso.modalidad || 'PDF').toUpperCase()}</span>
        </div>
      </div>
      <div class="libro-info" style="padding: 15px 0; display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 5px 0; font-size: 1.05rem; color: #1a2b4c; font-weight: bold;">${tituloLibro}</h4>
        <p class="autor" style="font-size: 0.82rem; color: #555; margin-bottom: 2px;"><strong>Curso:</strong> ${cursoAsociado}</p>
        <p class="autor" style="font-size: 0.85rem; color: #555; margin-bottom: 8px;">Por: ${curso.autor || 'Cátedra Académica'}</p>
        
        <!-- BOTONES APILADOS: Me gusta arriba, Descargar abajo -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: auto;">
          <button class="btn-like ${esFav ? 'activo' : ''}" onclick="toggleFavorito('${idRecurso}', this)" style="width: 100%; background: ${esFav ? '#ffc107' : '#f0f0f0'}; color: ${esFav ? '#000' : '#333'}; border: 1px solid #ccc; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="fa-solid fa-star"></i> ${esFav ? 'Guardado' : 'Me gusta'}
          </button>
          
          <a href="${curso.link || '#'}" class="btn-descargar-card" target="_blank" onclick="registrarEnHistorial('${idRecurso}')" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; background:#5b2c91; color:#fff; padding:8px; border-radius:6px; text-decoration:none; font-weight: bold; box-sizing: border-box;">
            <i class="fa-solid fa-download"></i> Descargar
          </a>
        </div>
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

// 5. LÓGICA DE FAVORITOS E HISTORIAL CONECTADA AL PERFIL
window.toggleFavorito = function(idRecurso, btnElement) {
  if (typeof usuarioActual === 'undefined' || !usuarioActual) {
    const modalAuth = document.getElementById('modal-auth');
    if (modalAuth) modalAuth.style.display = 'flex';
    alert('Debes iniciar sesión para guardar recursos en tus favoritos.');
    return;
  }

  const claveStorage = `favs_${usuarioActual.uid}`;
  let favoritos = JSON.parse(localStorage.getItem(claveStorage)) || [];

  const index = favoritos.indexOf(idRecurso);
  if (index > -1) {
    favoritos.splice(index, 1);
    btnElement.style.background = '#f0f0f0';
    btnElement.style.color = '#333';
    btnElement.innerHTML = '<i class="fa-solid fa-star"></i> Me gusta';
  } else {
    favoritos.push(idRecurso);
    btnElement.style.background = '#ffc107';
    btnElement.style.color = '#000';
    btnElement.innerHTML = '<i class="fa-solid fa-star"></i> Guardado';
  }

  localStorage.setItem(claveStorage, JSON.stringify(favoritos));
  if (typeof window.renderizarFavoritos === 'function') window.renderizarFavoritos();
};

window.registrarEnHistorial = function(idRecurso) {
  if (typeof usuarioActual === 'undefined' || !usuarioActual) return;

  const claveHistorial = `hist_${usuarioActual.uid}`;
  let historial = JSON.parse(localStorage.getItem(claveHistorial)) || [];

  const nuevoRegistro = { id: idRecurso, fecha: new Date().toLocaleDateString() };
  historial = historial.filter(item => item.id !== idRecurso);
  historial.unshift(nuevoRegistro);
  
  if (historial.length > 20) historial.pop();

  localStorage.setItem(claveHistorial, JSON.stringify(historial));
  if (typeof window.renderizarHistorial === 'function') window.renderizarHistorial();
};

// 6. FUNCIONES DE RENDERIZADO PARA LA VISTA DE PERFIL (FAVORITOS E HISTORIAL)
window.renderizarFavoritos = function() {
  const contenedor = document.getElementById('tab-content-favoritos');
  if (!contenedor || typeof usuarioActual === 'undefined' || !usuarioActual) return;

  const favoritosIds = JSON.parse(localStorage.getItem(`favs_${usuarioActual.uid}`)) || [];

  if (favoritosIds.length === 0) {
    contenedor.innerHTML = `<p style="padding: 30px; text-align: center; color: #666;">No tienes recursos guardados en favoritos.</p>`;
    return;
  }

  const recursosFavoritos = BASE_CURSOS.filter(curso => {
    const idC = curso.id || curso.codigo || curso.tituloLibro || curso.nombreLibro;
    return favoritosIds.includes(idC);
  });

  contenedor.innerHTML = `<div class="portadas-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; padding: 20px;"></div>`;
  const subGrid = contenedor.querySelector('.portadas-grid');

  recursosFavoritos.forEach(curso => {
    const card = document.createElement('div');
    card.className = 'libro-card';

    let imgSrc = curso.portada || '';
    if (imgSrc.includes('drive.google.com')) {
      const matchId = imgSrc.match(/[-\w]{25,}/);
      if (matchId) {
        imgSrc = `https://lh3.googleusercontent.com/d/${matchId[0]}`;
      }
    }

    const idRecurso = curso.id || curso.codigo || curso.tituloLibro || curso.nombreLibro;
    const tituloLibro = curso.nombreLibro || curso.tituloLibro || curso.nombre || 'Recurso Académico';
    const cursoAsociado = curso.nombre || '';

    let contenidoPortada = '';
    if (imgSrc && imgSrc.trim() !== '') {
      contenidoPortada = `<img src="${imgSrc}" alt="Portada" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;" onerror="this.style.display='none';">`;
    } else {
      contenidoPortada = `<strong style="padding: 10px; font-size: 0.95rem; position: relative; z-index: 1; color: white;">${tituloLibro}</strong>`;
    }

    card.innerHTML = `
      <div class="portada-wrapper">
        <div class="portada-placeholder" style="background: linear-gradient(135deg, #5b2c91, #3b1d59); color: #fff; height: 180px; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; border-radius: 8px; position: relative;">
          ${contenidoPortada}
          <span class="badge-formato" style="position: absolute; bottom: 10px; right: 10px; background: #000; color: #fff; padding: 3px 8px; font-size: 0.75rem; font-weight: bold; border-radius: 4px; z-index: 2;">${(curso.modalidad || 'PDF').toUpperCase()}</span>
        </div>
      </div>
      <div class="libro-info" style="padding: 15px 0; display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 5px 0; font-size: 1.05rem; color: #1a2b4c; font-weight: bold;">${tituloLibro}</h4>
        <p class="autor" style="font-size: 0.82rem; color: #555; margin-bottom: 2px;"><strong>Curso:</strong> ${cursoAsociado}</p>
        <p class="autor" style="font-size: 0.85rem; color: #555; margin-bottom: 8px;">Por: ${curso.autor || 'Cátedra Académica'}</p>
        
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: auto;">
          <button class="btn-like activo" onclick="toggleFavorito('${idRecurso}', this); window.renderizarFavoritos();" style="width: 100%; background: #ffc107; color: #000; border: 1px solid #ccc; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="fa-solid fa-star"></i> Guardado
          </button>
          <a href="${curso.link || '#'}" class="btn-descargar-card" target="_blank" onclick="registrarEnHistorial('${idRecurso}')" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; background:#5b2c91; color:#fff; padding:8px; border-radius:6px; text-decoration:none; font-weight: bold; box-sizing: border-box;">
            <i class="fa-solid fa-download"></i> Descargar
          </a>
        </div>
      </div>
    `;
    subGrid.appendChild(card);
  });
};

window.renderizarHistorial = function() {
  const contenedor = document.getElementById('tab-content-historial');
  if (!contenedor || typeof usuarioActual === 'undefined' || !usuarioActual) return;

  const historial = JSON.parse(localStorage.getItem(`hist_${usuarioActual.uid}`)) || [];

  if (historial.length === 0) {
    contenedor.innerHTML = `<p style="padding: 30px; text-align: center; color: #666;">Aún no has descargado ningún recurso.</p>`;
    return;
  }

  contenedor.innerHTML = `<div style="display: flex; flex-direction: column; gap: 10px; padding: 20px;"></div>`;
  const subList = contenedor.querySelector('div');

  historial.forEach(reg => {
    const cursoEncontrado = BASE_CURSOS.find(c => (c.id || c.codigo || c.tituloLibro || c.nombreLibro) === reg.id);
    const titulo = cursoEncontrado ? (cursoEncontrado.nombreLibro || cursoEncontrado.tituloLibro || cursoEncontrado.nombre) : 'Recurso Descargado';
    
    const item = document.createElement('div');
    item.style.cssText = "background: #f9f9f9; padding: 12px; border: 1px solid #eee; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;";
    item.innerHTML = `
      <div>
        <strong>${titulo}</strong>
        <span style="display: block; font-size: 0.75rem; color: #778;">Descargado el: ${reg.fecha}</span>
      </div>
      ${cursoEncontrado?.link ? `<a href="${cursoEncontrado.link}" target="_blank" style="background: #5b2c91; color: #fff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 0.85rem; font-weight: bold;">Volver a Descargar</a>` : ''}
    `;
    subList.appendChild(item);
  });
};
// 7. ESTADÍSTICAS DINÁMICAS DE LA BARRA (Con reintento automático)
function actualizarEstadisticasBarra() {
  if (typeof BASE_CURSOS === 'undefined' || !Array.isArray(BASE_CURSOS)) {
    setTimeout(actualizarEstadisticasBarra, 500);
    return;
  }

  const totalRecursos = BASE_CURSOS.length;

  const totalLibros = BASE_CURSOS.filter(curso => {
    const modalidad = String(curso.modalidad || '').toLowerCase();
    const formato = String(curso.formato || '').toLowerCase();
    return modalidad.includes('pdf') || modalidad.includes('libro') || formato.includes('pdf') || formato.includes('libro') || curso.link;
  }).length;

  let usuariosConocidos = JSON.parse(localStorage.getItem('registro_usuarios_locales')) || [];
  if (typeof usuarioActual !== 'undefined' && usuarioActual && !usuariosConocidos.includes(usuarioActual.uid)) {
    usuariosConocidos.push(usuarioActual.uid);
    localStorage.setItem('registro_usuarios_locales', JSON.stringify(usuariosConocidos));
  }
  const totalUsuarios = 50 + usuariosConocidos.length;

  const elRecursos = document.getElementById('stat-recursos');
  const elLibros = document.getElementById('stat-libros');
  const elUsuarios = document.getElementById('stat-usuarios');

  if (elRecursos) elRecursos.textContent = `+ ${totalRecursos}`;
  if (elLibros) elLibros.textContent = `+ ${totalLibros}`;
  if (elUsuarios) elUsuarios.textContent = `+ ${totalUsuarios}`;
}

// 8. INICIALIZACIÓN GENERAL Y DISPARADOR DE ESTADÍSTICAS
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

  // Ejecutar estadísticas y renderizado de perfil si hay sesión
  setTimeout(() => {
    if (typeof usuarioActual !== 'undefined' && usuarioActual) {
      window.renderizarFavoritos();
      window.renderizarHistorial();
    }
    actualizarEstadisticasBarra();
  }, 500);
});

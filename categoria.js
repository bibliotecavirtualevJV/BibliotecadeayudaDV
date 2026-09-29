let librosCategoriaActual = [];

function normalizarTexto(str) {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat') || params.get('categoria') || '';

  const tituloEl = document.getElementById('titulo-categoria');
  if (tituloEl) {
    tituloEl.innerText = catParam ? 'Categoría: ' + catParam.toUpperCase() : 'Todas las Categorías';
  }

  // Intentar obtener los datos de BASE_CURSOS
  const fuente = (typeof BASE_CURSOS !== 'undefined' && Array.isArray(BASE_CURSOS)) ? BASE_CURSOS : [];

  const catBuscada = normalizarTexto(catParam);

  // Filtrado de alta tolerancia (busca en categoria, nombre, titulo o id)
  librosCategoriaActual = fuente.filter(libro => {
    if (!catBuscada) return true;

    const catLibro = normalizarTexto(libro.categoria || libro.cat || '');
    const nombreLibro = normalizarTexto(libro.nombre || libro.titulo || '');
    const idLibro = normalizarTexto(libro.id || libro.codigo || '');

    // Coincidencia directa en categoría
    if (catLibro.includes(catBuscada) || catBuscada.includes(catLibro)) return true;

    // Reglas de rescate por palabras clave en nombre/título
    if (catBuscada.includes('educacion') || catBuscada === 'edu') {
      return catLibro.includes('educa') || nombreLibro.includes('historia') || nombreLibro.includes('didactica') || nombreLibro.includes('pedagogia');
    }
    if (catBuscada.includes('tic')) {
      return catLibro.includes('tic') || nombreLibro.includes('informática') || nombreLibro.includes('tecnología') || idLibro.includes('40-03') || idLibro.includes('40-04');
    }
    if (catBuscada.includes('lenguaje')) {
      return catLibro.includes('lenguaje') || nombreLibro.includes('gramaticales') || nombreLibro.includes('comunicación');
    }
    if (catBuscada.includes('investigacion')) {
      return catLibro.includes('investig') || nombreLibro.includes('técnicas de estudio');
    }
    if (catBuscada.includes('sociales')) {
      return catLibro.includes('social') || nombreLibro.includes('sociología');
    }

    return false;
  });

  // Ordenar alfabéticamente
  librosCategoriaActual.sort((a, b) => {
    const tA = (a.nombre || a.titulo || '').toLowerCase();
    const tB = (b.nombre || b.titulo || '').toLowerCase();
    return tA.localeCompare(tB);
  });

  renderizarLibros(librosCategoriaActual);
});

function renderizarLibros(lista) {
  const grid = document.getElementById('grid-categoria');
  if (!grid) return;

  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
        <p>No se encontraron libros en esta categoría.</p>
      </div>`;
    return;
  }

  lista.forEach(libro => {
    const card = document.createElement('div');
    card.className = 'libro-card';
    card.style.cssText = 'background: #fff; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.08);';

    const titulo = libro.nombre || libro.titulo || 'Sin título';
    const codigo = libro.id || libro.codigo || 'LIBRO';
    const formato = libro.modalidad || libro.formato || 'PDF';
    const enlace = libro.link || libro.enlace || '#';
    const categoriaNombre = libro.categoria || 'General';

    const htmlPortada = libro.portada 
      ? `<img src="${libro.portada}" alt="${titulo}" style="width: 100%; height: 260px; object-fit: contain; background: #f1f3f5; display: block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <div style="display: none; height: 260px; background: #5b2c91; color: #fff; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold;">
           ${codigo}
         </div>`
      : `<div style="display: flex; height: 260px; background: #5b2c91; color: #fff; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold;">
           ${codigo}
         </div>`;

    card.innerHTML = `
      <div style="position: relative; width: 100%; background: #f1f3f5;">
        ${htmlPortada}
        <span style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.75); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; z-index: 2;">
          ${formato.toUpperCase()}
        </span>
      </div>
      <div style="padding: 16px; text-align: center; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between;">
        <div>
          <h4 style="margin: 0 0 6px 0; font-size: 0.95rem; color: #222; font-weight: 600; line-height: 1.3;">${titulo}</h4>
          <p style="font-size: 0.8rem; color: #666; margin: 0 0 14px 0;">Categoría: ${categoriaNombre}</p>
        </div>
        <a href="${enlace}" target="_blank" style="display: block; width: 100%; background: #5b2c91; color: #fff; padding: 99px 0; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; background-color: #5b2c91; padding: 9px 0;">
          <i class="fa-solid fa-download" style="margin-right: 5px;"></i> Descargar
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filtrarYOrdenar() {
  const input = document.getElementById('input-filtro');
  if (!input) return;

  const texto = normalizarTexto(input.value);

  const filtrados = librosCategoriaActual.filter(libro => {
    const titulo = normalizarTexto(libro.nombre || libro.titulo);
    const autor = normalizarTexto(libro.autor || '');
    return titulo.includes(texto) || autor.includes(texto);
  });

  renderizarLibros(filtrados);
}

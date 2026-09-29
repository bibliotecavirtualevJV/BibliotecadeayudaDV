// Variable global para almacenar los libros filtrados
let librosCategoriaActual = [];

// Función para normalizar texto (quita tildes, espacios extra y pasa a minúsculas)
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
  // 1. Leer categoría desde la URL (?cat=... o ?categoria=...)
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat') || params.get('categoria') || '';

  // 2. Mostrar título en pantalla
  const tituloEl = document.getElementById('titulo-categoria');
  if (tituloEl) {
    tituloEl.innerText = catParam ? 'Categoría: ' + catParam.toUpperCase() : 'Todas las Categorías';
  }

  // 3. Comprobar que BASE_CURSOS exista (cargada desde cursos.js)
  if (typeof BASE_CURSOS === 'undefined' || !Array.isArray(BASE_CURSOS)) {
    console.error('ERROR: BASE_CURSOS no está definida. Revisa que cursos.js se cargue antes que este script.');
    const grid = document.getElementById('grid-categoria');
    if (grid) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red;">Error: No se pudo acceder a la base de datos de libros (cursos.js no detectado).</p>';
    }
    return;
  }

  console.log('Total libros en BASE_CURSOS:', BASE_CURSOS.length);
  console.log('Buscando categoría solicitada:', catParam);

  const catBuscada = normalizarTexto(catParam);

  // 4. Filtrar libros
  librosCategoriaActual = BASE_CURSOS.filter(libro => {
    // Si la URL no trae categoría, mostrar todos los libros
    if (!catBuscada) return true;

    // Obtener la categoría del objeto libro (soportando 'categoria', 'cat' o 'seccion')
    const catLibro = normalizarTexto(libro.categoria || libro.cat || libro.seccion || '');
    
    // Comprobar coincidencia exacta o parcial
    return catLibro.includes(catBuscada) || catBuscada.includes(catLibro);
  });

  console.log('Libros encontrados para esta categoría:', librosCategoriaActual);

  // 5. Ordenar alfabéticamente por título/nombre
  librosCategoriaActual.sort((a, b) => {
    const tituloA = (a.nombre || a.titulo || '').toLowerCase();
    const tituloB = (b.nombre || b.titulo || '').toLowerCase();
    return tituloA.localeCompare(tituloB);
  });

  // 6. Dibujar las tarjetas en el HTML
  renderizarLibros(librosCategoriaActual);
});

function renderizarLibros(lista) {
  const grid = document.getElementById('grid-categoria');
  if (!grid) return;

  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
        <p>No se encontraron libros o publicaciones en esta categoría.</p>
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
        <a href="${enlace}" target="_blank" style="display: block; width: 100%; background: #5b2c91; color: #fff; padding: 9px 0; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600;">
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
}

// Manejo dinámico de categorías conectado con cursos.js
let librosCategoriaActual = [];

// Función para remover acentos y mayúsculas
function normalizarTexto(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener la categoría desde la URL (ej. categoria.html?cat=educacion)
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat') || params.get('categoria') || '';

  // 2. Colocar título en pantalla
  const tituloEl = document.getElementById('titulo-categoria');
  if (tituloEl) {
    tituloEl.innerText = catParam 
      ? 'Categoría: ' + catParam.toUpperCase() 
      : 'Todas las Categorías';
  }

  // 3. Verificar que BASE_CURSOS exista
  const fuenteDatos = (typeof BASE_CURSOS !== 'undefined') ? BASE_CURSOS : [];

  // 4. Filtrar por categoría (flexible a tildes y mayúsculas)
  const catBuscada = normalizarTexto(catParam);
  
  librosCategoriaActual = fuenteDatos.filter(curso => {
    if (!catBuscada) return true;
    const catCurso = normalizarTexto(curso.categoria);
    return catCurso.includes(catBuscada) || catBuscada.includes(catCurso);
  });

  // 5. Ordenar alfabéticamente
  librosCategoriaActual.sort((a, b) => {
    const tituloA = (a.nombre || a.titulo || '').toLowerCase();
    const tituloB = (b.nombre || b.titulo || '').toLowerCase();
    return tituloA.localeCompare(tituloB);
  });

  // 6. Renderizar resultado
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

  lista.forEach(curso => {
    const card = document.createElement('div');
    card.className = 'libro-card';
    card.style.cssText = 'background: #fff; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.08);';

    const htmlPortada = curso.portada 
      ? `<img src="${curso.portada}" alt="${curso.nombre || curso.titulo}" style="width: 100%; height: 260px; object-fit: contain; background: #f1f3f5; display: block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <div style="display: none; height: 260px; background: #5b2c91; color: #fff; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold;">
           ${curso.id || curso.codigo || 'LIBRO'}
         </div>`
      : `<div style="display: flex; height: 260px; background: #5b2c91; color: #fff; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold;">
           ${curso.id || curso.codigo || 'LIBRO'}
         </div>`;

    card.innerHTML = `
      <div style="position: relative; width: 100%; background: #f1f3f5;">
        ${htmlPortada}
        <span style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.75); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; z-index: 2;">
          ${(curso.modalidad || 'PDF').toUpperCase()}
        </span>
      </div>
      <div style="padding: 16px; text-align: center; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between;">
        <div>
          <h4 style="margin: 0 0 6px 0; font-size: 0.95rem; color: #222; font-weight: 600; line-height: 1.3;">${curso.nombre || curso.titulo}</h4>
          <p style="font-size: 0.8rem; color: #666; margin: 0 0 14px 0;">Categoría: ${curso.categoria || 'General'}</p>
        </div>
        <a href="${curso.link || '#'}" target="_blank" style="display: block; width: 100%; background: #5b2c91; color: #fff; padding: 9px 0; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600;">
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

  const filtrados = librosCategoriaActual.filter(curso => {
    const titulo = normalizarTexto(curso.nombre || curso.titulo);
    const autor = normalizarTexto(curso.autor || '');
    return titulo.includes(texto) || autor.includes(texto);
  });

  renderizarLibros(filtrados);
}

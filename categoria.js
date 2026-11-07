let librosCategoriaActual = [];

function inicializarCategoria() {
  const params = new URLSearchParams(window.location.search);
  const catParamCrudo = params.get('cat') || 'todas';
  // Normalizar parámetro de la URL (quitar tildes y pasar a minúsculas)
  const catParam = catParamCrudo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const tituloEl = document.getElementById('titulo-categoria');
  if (tituloEl) {
    tituloEl.innerText = 'Categoría: ' + catParamCrudo.toUpperCase();
  }

  const listaBase = (typeof BASE_CURSOS !== 'undefined') ? BASE_CURSOS : [];

  librosCategoriaActual = listaBase.filter(item => {
    const catItem = String(item.categoria || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return catItem.includes(catParam) || catItem === catParam;
  });

  librosCategoriaActual.sort((a, b) => {
    const nombreA = a.nombreLibro || a.nombre || a.titulo || '';
    const nombreB = b.nombreLibro || b.nombre || b.titulo || '';
    return nombreA.localeCompare(nombreB);
  });

  renderizarLibros(librosCategoriaActual);
}

// Escuchar la carga de la API de Google Sheets
window.addEventListener('DOMContentLoaded', () => {
  const verificarCarga = setInterval(() => {
    if (typeof BASE_CURSOS !== 'undefined' && BASE_CURSOS.length > 0) {
      clearInterval(verificarCarga);
      inicializarCategoria();
    }
  }, 100);
});

function renderizarLibros(lista) {
  const grid = document.getElementById('grid-categoria');
  if (!grid) return;

  grid.innerHTML = '';

  if (!lista || lista.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;"><p>No se encontraron recursos en esta categoría.</p></div>';
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

    const tituloLibro = curso.nombreLibro || curso.tituloLibro || curso.nombre || curso.titulo || 'Recurso Académico';
    const formato = (curso.modalidad || 'PDF').toUpperCase();

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
          <span class="badge-formato" style="position: absolute; bottom: 10px; right: 10px; background: #000; color: #fff; padding: 3px 8px; font-size: 0.75rem; font-weight: bold; border-radius: 4px; z-index: 2;">${formato}</span>
        </div>
      </div>
      <div class="libro-info" style="padding: 15px 0;">
        <h4 style="margin: 5px 0; font-size: 1rem; color: #1a2b4c;">${tituloLibro}</h4>
        <p class="autor" style="font-size: 0.85rem; color: #555; margin-bottom: 12px;">Por: ${curso.autor || 'Cátedra Académica'}</p>
        <a href="${curso.link || '#'}" class="btn-descargar-card" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; background:#5b2c91; color:#fff; padding:10px; border-radius:8px; text-decoration:none; font-weight: bold;">
          <i class="fa-solid fa-download"></i> Descargar
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filtrarYOrdenar() {
  const input = document.getElementById('input-filtro');
  if (!input) return;

  const texto = input.value.toLowerCase().trim();
  const filtrados = librosCategoriaActual.filter(item => {
    const nombre = (item.nombreLibro || item.nombre || item.titulo || '').toLowerCase();
    const autor = (item.autor || '').toLowerCase();
    return nombre.includes(texto) || autor.includes(texto);
  });

  renderizarLibros(filtrados);
}

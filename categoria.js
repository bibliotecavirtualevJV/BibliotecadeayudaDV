// Base de datos de libros clasificados por categoría
const BASE_DATOS = [
  { titulo: "Didáctica General y Evaluación", autor: "Dra. María López", categoria: "pedagogia", formato: "EPUB", link: "#" },
  { titulo: "Metodología de la Investigación", autor: "USAC Humanidades", categoria: "investigacion", formato: "PDF", link: "#" },
  { titulo: "Pedagogía y Tecnologías Digitales", autor: "Departamento de Educación", categoria: "tic", formato: "PDF", link: "#" },
  { titulo: "Psicología del Aprendizaje", autor: "Lic. Juan Pérez", categoria: "psicologia", formato: "PDF", link: "#" },
  { titulo: "Análisis del Lenguaje y Comunicación", autor: "Facultad de Humanidades", categoria: "lenguaje", formato: "PDF", link: "#" },
  { titulo: "Introducción a las Ciencias Sociales", autor: "USAC", categoria: "sociales", formato: "PDF", link: "#" }
];

let librosCategoriaActual = [];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener la categoría desde la URL (ej. categoria.html?cat=pedagogia)
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat') || 'todas';

  // 2. Colocar título
  const tituloEl = document.getElementById('titulo-categoria');
  if (tituloEl) {
    tituloEl.innerText = 'Categoría: ' + catParam.toUpperCase();
  }

  // 3. Filtrar por categoría
  librosCategoriaActual = BASE_DATOS.filter(item => item.categoria === catParam);

  // 4. Ordenar alfabéticamente por título por defecto
  librosCategoriaActual.sort((a, b) => a.titulo.localeCompare(b.titulo));

  // 5. Renderizar
  renderizarLibros(librosCategoriaActual);
});

function renderizarLibros(lista) {
  const grid = document.getElementById('grid-categoria');
  if (!grid) return;

  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = '<p>No se encontraron recursos en esta categoría.</p>';
    return;
  }

  lista.forEach(libro => {
    const card = document.createElement('div');
    card.className = 'libro-card';
    card.innerHTML = `
      <div class="portada-wrapper">
        <img src="https://via.placeholder.com/200x280/5b2c91/ffffff?text=${encodeURIComponent(libro.titulo)}" alt="Portada">
        <span class="badge-formato">${libro.formato}</span>
      </div>
      <div class="libro-info">
        <h4>${libro.titulo}</h4>
        <p class="autor">Por: ${libro.autor}</p>
        <a href="${libro.link}" class="btn-descargar-card"><i class="fa-solid fa-download"></i> Descargar</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filtrarYOrdenar() {
  const input = document.getElementById('input-filtro');
  if (!input) return;

  const texto = input.value.toLowerCase().trim();

  const filtrados = librosCategoriaActual.filter(item => 
    item.titulo.toLowerCase().includes(texto) || 
    item.autor.toLowerCase().includes(texto)
  );

  renderizarLibros(filtrados);
}
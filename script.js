document.addEventListener('DOMContentLoaded', function () {

  // Lista de vistas intercambiables
  const TODAS_LAS_VISTAS = ['vista-inicio', 'vista-catalogo', 'vista-favoritos', 'vista-historial'];

  // Función para alternar vistas completas
  function cambiarVista(targetVista) {
    TODAS_LAS_VISTAS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === targetVista) {
          el.classList.remove('vista-oculta');
        } else {
          el.classList.add('vista-oculta');
        }
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Funciones para controlar el modal
  function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) modal.classList.remove('vista-oculta');
  }

  function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) modal.classList.add('vista-oculta');
  }

  // Escuchador de clics global
  document.addEventListener('click', function (e) {
    const btnVista = e.target.closest('[data-vista]');
    const btnModal = e.target.closest('[data-modal]');
    const btnSeccion = e.target.closest('[data-seccion]');

    if (btnVista) {
      e.preventDefault();
      cambiarVista(btnVista.getAttribute('data-vista'));
    } else if (btnModal) {
      e.preventDefault();
      abrirModal(btnModal.getAttribute('data-modal'));
    } else if (btnSeccion) {
      e.preventDefault();
      const idSeccion = btnSeccion.getAttribute('data-seccion');
      cambiarVista('vista-inicio');
      setTimeout(() => {
        const el = document.getElementById(idSeccion);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  });

  // Eventos para cerrar el modal de subir recurso
  const btnCerrar = document.getElementById('btn-cerrar-modal');
  const btnCancelar = document.getElementById('btn-cancelar-modal');
  const modalSubir = document.getElementById('modal-subir');

  if (btnCerrar) btnCerrar.addEventListener('click', () => cerrarModal('modal-subir'));
  if (btnCancelar) btnCancelar.addEventListener('click', () => cerrarModal('modal-subir'));

  if (modalSubir) {
    modalSubir.addEventListener('click', function (e) {
      if (e.target === modalSubir) {
        cerrarModal('modal-subir');
      }
    });
  }

  // Manejo del Input de Búsqueda
  const input = document.getElementById('input-buscador');
  if (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        ejecutarBusqueda(e);
      }
    });
  }

});

// FUNCIÓN PRINCIPAL DE BÚSQUEDA Y SCROLL DIRECTO AL CATÁLOGO
function ejecutarBusqueda(event) {
  if (event) event.preventDefault();

  const input = document.getElementById('input-buscador');
  if (!input) return;

  const texto = input.value.toLowerCase().trim();

  // 1. Filtrar las tarjetas de libros (.libro-card)
  const tarjetas = document.querySelectorAll('.libro-card');
  tarjetas.forEach(tarjeta => {
    const contenido = tarjeta.innerText.toLowerCase();
    if (texto === '' || contenido.includes(texto)) {
      tarjeta.style.display = 'flex';
    } else {
      tarjeta.style.display = 'none';
    }
  });

  // 2. Desplazar la pantalla suavemente hacia la sección #catalogo (que sí existe en tu HTML)
  const seccionCatalogo = document.getElementById('catalogo');
  if (seccionCatalogo) {
    seccionCatalogo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// RESTABLECER BÚSQUEDA
function limpiarBusqueda() {
  const input = document.getElementById('input-buscador');
  if (input) {
    input.value = '';
  }

  const tarjetas = document.querySelectorAll('.libro-card');
  tarjetas.forEach(tarjeta => {
    tarjeta.style.display = 'flex';
  });
}

// FUNCIÓN AUXILIAR PARA TECLA ENTER
function detectarEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    ejecutarBusqueda(event);
  }
}
/**
 * Renderiza la barra de paginación en cualquier página.
 * @param {number} paginaActual - Número de página en la que estás (ej: 1, 2, 3...)
 * @param {number} totalPaginas - Total de páginas disponibles (ej: 12)
 * @param {string} idContenedor - ID del div donde se insertará la paginación
 */
function generarBarraPaginacion(paginaActual, totalPaginas, idContenedor = 'paginacion-container') {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = ''; // Limpiar previo

  // Si solo hay 1 página, no mostramos nada
  if (totalPaginas <= 1) return;

  // Botón/Enlace para cada número de página
  for (let i = 1; i <= totalPaginas; i++) {
    // Si hay muchas páginas, simplificar con "..."
    if (totalPaginas > 5 && i > 3 && i < totalPaginas) {
      if (i === 4) {
        const puntos = document.createElement('span');
        puntos.className = 'puntos-paginacion';
        puntos.textContent = '...';
        contenedor.appendChild(puntos);
      }
      continue;
    }

    const enlace = document.createElement('a');
    enlace.textContent = i;
    enlace.className = `btn-pagina ${i === paginaActual ? 'active' : ''}`;
    
    // Si es la página actual, permanece en la misma vista, de lo contrario navega
    if (i === paginaActual) {
      enlace.href = 'javascript:void(0);';
    } else {
      enlace.href = `catalogo.html?pagina=${i}`;
    }

    contenedor.appendChild(enlace);
  }

  // Botón "Página siguiente »"
  if (paginaActual < totalPaginas) {
    const btnSiguiente = document.createElement('a');
    btnSiguiente.textContent = 'Página siguiente »';
    btnSiguiente.className = 'btn-pagina btn-siguiente';
    btnSiguiente.href = `catalogo.html?pagina=${paginaActual + 1}`;
    contenedor.appendChild(btnSiguiente);
  }
}
// Renderiza la paginación en el index.html enviando todos los botones a catalogo.html?pagina=1
renderizarPaginacion(BASE_CURSOS.length, 1, 'paginacion-principal', 'catalogo.html', true);

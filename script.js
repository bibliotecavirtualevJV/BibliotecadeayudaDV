document.addEventListener('DOMContentLoaded', function () {

  // 1. CARGA DINÁMICA DEL CATÁLOGO DESDE LA BASE DE DATOS
  // Verifica si existen las variables globales de cursos (ajusta si se llama distinto)
  const listaCursos = (typeof BASE_CURSOS !== 'undefined') ? BASE_CURSOS : 
                      (typeof cursos_2 !== 'undefined') ? cursos_2 : 
                      (typeof cursos !== 'undefined') ? cursos : [];

  if (listaCursos.length > 0) {
    renderizarCatalogo(listaCursos);
  }

  // 2. LISTA DE VISTAS INTERCAMBIABLES
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

// FUNCIÓN PARA RENDERIZAR LAS TARJETAS DESDE EL ARREGLO DE CURSOS
function renderizarCatalogo(cursos) {
  const contenedor = document.getElementById('catalogo');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  cursos.forEach(curso => {
    // Si el objeto del curso tiene la propiedad 'portada', genera la imagen
    const imagenHTML = curso.portada 
      ? `<img src="${curso.portada}" alt="${curso.nombre}">` 
      : `<div class="sin-portada">Sin Portada</div>`;

    const tarjeta = document.createElement('div');
    tarjeta.className = 'card-libro libro-card';
    tarjeta.innerHTML = `
      <div class="portada-container">
        ${imagenHTML}
      </div>
      <div class="card-body">
        <span class="categoria">${curso.categoria || ''}</span>
        <h3>${curso.nombre}</h3>
        <p><strong>Ciclo:</strong> ${curso.ciclo || 'N/A'}</p>
        <a href="${curso.link}" target="_blank" class="btn-descargar">Descargar</a>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// BÚSQUEDA Y SCROLL DIRECTO AL CATÁLOGO
function ejecutarBusqueda(event) {
  if (event) event.preventDefault();

  const input = document.getElementById('input-buscador');
  if (!input) return;

  const texto = input.value.toLowerCase().trim();

  const tarjetas = document.querySelectorAll('.libro-card');
  tarjetas.forEach(tarjeta => {
    const contenido = tarjeta.innerText.toLowerCase();
    if (texto === '' || contenido.includes(texto)) {
      tarjeta.style.display = 'flex';
    } else {
      tarjeta.style.display = 'none';
    }
  });

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

// BARRA DE PAGINACIÓN
function generarBarraPaginacion(paginaActual, totalPaginas, idContenedor = 'paginacion-container') {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = '';

  if (totalPaginas <= 1) return;

  for (let i = 1; i <= totalPaginas; i++) {
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
    
    if (i === paginaActual) {
      enlace.href = 'javascript:void(0);';
    } else {
      enlace.href = `catalogo.html?pagina=${i}`;
    }

    contenedor.appendChild(enlace);
  }

  if (paginaActual < totalPaginas) {
    const btnSiguiente = document.createElement('a');
    btnSiguiente.textContent = 'Página siguiente »';
    btnSiguiente.className = 'btn-pagina btn-siguiente';
    btnSiguiente.href = `catalogo.html?pagina=${paginaActual + 1}`;
    contenedor.appendChild(btnSiguiente);
  }
}

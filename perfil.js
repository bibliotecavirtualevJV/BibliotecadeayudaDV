import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Configuración Firebase (mismas credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyBQgqn3ZFCA1bcPGrM69JHRJslGHS_zhOc",
  authDomain: "biblioteca-fahusaccicloiv.firebaseapp.com",
  projectId: "biblioteca-fahusaccicloiv",
  storageBucket: "biblioteca-fahusaccicloiv.firebasestorage.app",
  messagingSenderId: "5848760982",
  appId: "1:5848760982:web:17762af3d20ff3e54a78b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let usuarioActual = null;

// Control de vistas
function mostrarPerfil(seccion = 'favoritos') {
  const seccionesOcultar = ['catalogo', 'inicio', 'accesos-rapidos', 'recursos', 'categorias', 'ayuda', 'contacto'];
  seccionesOcultar.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const vistaPerfil = document.getElementById('vista-perfil');
  if (vistaPerfil) vistaPerfil.style.display = 'block';

  activarPestana(seccion);
}

function volverAlInicio() {
  const vistaPerfil = document.getElementById('vista-perfil');
  if (vistaPerfil) vistaPerfil.style.display = 'none';

  const seccionesMostrar = ['inicio', 'accesos-rapidos', 'recursos', 'catalogo', 'categorias', 'ayuda', 'contacto'];
  seccionesMostrar.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
}

function activarPestana(tab) {
  const tabFav = document.getElementById('tab-content-favoritos');
  const tabHist = document.getElementById('tab-content-historial');
  const btnFav = document.getElementById('tab-btn-favoritos');
  const btnHist = document.getElementById('tab-btn-historial');

  if (tab === 'favoritos') {
    if (tabFav) tabFav.style.display = 'block';
    if (tabHist) tabHist.style.display = 'none';
    if (btnFav) { btnFav.style.color = '#5b2c91'; btnFav.style.borderBottom = '3px solid #5b2c91'; }
    if (btnHist) { btnHist.style.color = '#666'; btnHist.style.borderBottom = 'none'; }
    if (window.renderizarFavoritos) window.renderizarFavoritos();
  } else {
    if (tabFav) tabFav.style.display = 'none';
    if (tabHist) tabHist.style.display = 'block';
    if (btnHist) { btnHist.style.color = '#5b2c91'; btnHist.style.borderBottom = '3px solid #5b2c91'; }
    if (btnFav) { btnFav.style.color = '#666'; btnFav.style.borderBottom = 'none'; }
    if (window.renderizarHistorial) window.renderizarHistorial();
  }
}

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
  const btnFavoritosQA = document.querySelector('[data-vista="vista-favoritos"]');
  const btnHistorialQA = document.querySelector('[data-vista="vista-historial"]');
  const modalAuth = document.getElementById('modal-auth');

  // Evaluar sesión antes de redirigir
  const manejarAcceso = (seccionDeseada) => {
    if (usuarioActual) {
      mostrarPerfil(seccionDeseada);
    } else {
      if (modalAuth) modalAuth.style.display = 'flex';
    }
  };

  btnFavoritosQA?.addEventListener('click', (e) => {
    e.preventDefault();
    manejarAcceso('favoritos');
  });

  btnHistorialQA?.addEventListener('click', (e) => {
    e.preventDefault();
    manejarAcceso('historial');
  });

  // Eventos de Pestañas
  document.getElementById('tab-btn-favoritos')?.addEventListener('click', () => activarPestana('favoritos'));
  document.getElementById('tab-btn-historial')?.addEventListener('click', () => activarPestana('historial'));

  // Botón Volver
  document.querySelectorAll('.btn-regresar-catalogo').forEach(btn => {
    btn.addEventListener('click', volverAlInicio);
  });

  // Cambio de Foto de Perfil (Local preview + actualización Auth)
  const inputAvatar = document.getElementById('input-avatar');
  inputAvatar?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && usuarioActual) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Img = event.target.result;
        document.getElementById('profile-avatar').src = base64Img;
        
        // Guardar la foto en el perfil de Firebase
        updateProfile(usuarioActual, { photoURL: base64Img }).catch(err => console.error("Error al guardar foto", err));
      };
      reader.readAsDataURL(file);
    }
  });

  // Estado del usuario en tiempo real
  onAuthStateChanged(auth, (user) => {
    usuarioActual = user;
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');

    if (user) {
      if (profileName) profileName.textContent = user.displayName || user.email.split('@')[0];
      if (profileEmail) profileEmail.textContent = user.email;
      if (profileAvatar) {
        profileAvatar.src = user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.email) + '&background=5b2c91&color=fff';
      }
    } else {
      volverAlInicio();
    }
  });
});
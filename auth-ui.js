import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Configuración de Firebase
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
const providerGoogle = new GoogleAuthProvider();

let usuarioActual = null;
let modoRegistro = false;

function abrirPerfil(tab = 'favoritos') {
  const dropdownUsuario = document.getElementById('dropdown-usuario');
  if (dropdownUsuario) dropdownUsuario.style.display = 'none';

  // Oculta el catálogo aplicando la clase al body
  document.body.classList.add('en-vista-perfil');

  // Muestra el perfil de forma limpia
  const vistaPerfil = document.getElementById('vista-perfil');
  if (vistaPerfil) {
    vistaPerfil.classList.remove('vista-oculta');
    vistaPerfil.style.removeProperty('display');
  }

  activarPestanaPerfil(tab);
}

function volverAlCatalogo() {
  // 1. Desactivar el modo perfil en la clase principal
  document.body.classList.remove('en-vista-perfil');

  // 2. Ocultar la sección de perfil
  const vistaPerfil = document.getElementById('vista-perfil');
  if (vistaPerfil) {
    vistaPerfil.classList.add('vista-oculta');
    vistaPerfil.style.setProperty('display', 'none', 'important');
  }

  // 3. Limpiar estilos en línea residuales agregados por otros scripts
  const contenedores = [
    '#inicio', '#accesos-rapidos', '#recursos', '#catalogo', 
    '#categorias', '#ayuda', '#contacto', '.collab-banner', '.stats-bar'
  ];

  contenedores.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.style.removeProperty('display');
  });

  // 4. FORZAR el valor flex original para la sección inicio/hero
  const inicio = document.getElementById('inicio');
  if (inicio) {
    inicio.style.display = ''; // Limpia el estilo en línea por completo
  }
}
function activarPestanaPerfil(tab) {
  const tabFav = document.getElementById('tab-content-favoritos');
  const tabHist = document.getElementById('tab-content-historial');
  const btnFav = document.getElementById('tab-btn-favoritos');
  const btnHist = document.getElementById('tab-btn-historial');

  if (tab === 'favoritos') {
    if (tabFav) tabFav.style.display = 'block';
    if (tabHist) tabHist.style.display = 'none';
    if (btnFav) { btnFav.style.color = '#5b2c91'; btnFav.style.borderBottom = '3px solid #5b2c91'; }
    if (btnHist) { btnHist.style.color = '#666'; btnHist.style.borderBottom = 'none'; }
  } else {
    if (tabFav) tabFav.style.display = 'none';
    if (tabHist) tabHist.style.display = 'block';
    if (btnHist) { btnHist.style.color = '#5b2c91'; btnHist.style.borderBottom = '3px solid #5b2c91'; }
    if (btnFav) { btnFav.style.color = '#666'; btnFav.style.borderBottom = 'none'; }
  }
}

function iniciarModuloAutenticacion() {
  const btnMiCuenta = document.getElementById('btn-mi-cuenta');
  const modalAuth = document.getElementById('modal-auth');
  const linkToggle = document.getElementById('link-toggle-auth');
  const formAuth = document.getElementById('form-auth');
  const btnGoogle = document.getElementById('btn-auth-google');
  const dropdownUsuario = document.getElementById('dropdown-usuario');
  const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
  const btnVerPerfil = document.getElementById('btn-ver-perfil');

  // Menú Superior (Mi Cuenta)
  btnMiCuenta?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (usuarioActual) {
      if (dropdownUsuario) {
        const visible = dropdownUsuario.style.display === 'block';
        dropdownUsuario.style.display = visible ? 'none' : 'block';
      }
    } else {
      if (modalAuth) modalAuth.style.display = 'flex';
    }
  });

  // Botón "Ver Mi Perfil" en el desplegable
  btnVerPerfil?.addEventListener('click', () => {
    abrirPerfil('favoritos');
  });

  // Tarjetas de Accesos Rápidos
  document.querySelector('[data-vista="vista-favoritos"]')?.addEventListener('click', () => {
    if (usuarioActual) abrirPerfil('favoritos');
    else if (modalAuth) modalAuth.style.display = 'flex';
  });

  document.querySelector('[data-vista="vista-historial"]')?.addEventListener('click', () => {
    if (usuarioActual) abrirPerfil('historial');
    else if (modalAuth) modalAuth.style.display = 'flex';
  });

  // Pestañas del Perfil
  document.getElementById('tab-btn-favoritos')?.addEventListener('click', () => activarPestanaPerfil('favoritos'));
  document.getElementById('tab-btn-historial')?.addEventListener('click', () => activarPestanaPerfil('historial'));

  // Botón Volver al Catálogo
  document.querySelectorAll('.btn-regresar-catalogo').forEach(btn => {
    btn.addEventListener('click', volverAlCatalogo);
  });

  // Cambio de Foto de Perfil
  const inputAvatar = document.getElementById('input-avatar');
  inputAvatar?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && usuarioActual) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Img = event.target.result;
        const profileAvatar = document.getElementById('profile-avatar');
        if (profileAvatar) profileAvatar.src = base64Img;
        
        updateProfile(usuarioActual, { photoURL: base64Img }).catch(err => console.error(err));
      };
      reader.readAsDataURL(file);
    }
  });

  // Cerrar Modales
  document.addEventListener('click', (e) => {
    if (e.target.matches('#btn-cerrar-modal-auth') || e.target.matches('.btn-cerrar-auth')) {
      if (modalAuth) modalAuth.style.display = 'none';
    }
    // Ocultar menú si hace clic fuera
    if (dropdownUsuario && !btnMiCuenta.contains(e.target) && !dropdownUsuario.contains(e.target)) {
      dropdownUsuario.style.display = 'none';
    }
  });

  // Alternar Formulario Login / Registro
  linkToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    modoRegistro = !modoRegistro;
    document.getElementById('titulo-modal').textContent = modoRegistro ? 'Crear Cuenta' : 'Iniciar Sesión';
    document.getElementById('btn-submit-auth').textContent = modoRegistro ? 'Registrarse' : 'Ingresar';
    document.getElementById('texto-toggle').textContent = modoRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?';
    linkToggle.textContent = modoRegistro ? 'Inicia sesión aquí' : 'Regístrate aquí';
  });

  // Submit Login/Registro
  formAuth?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    try {
      if (modoRegistro) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      if (modalAuth) modalAuth.style.display = 'none';
      formAuth.reset();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });

  // Google Sign-In
  btnGoogle?.addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, providerGoogle);
      if (modalAuth) modalAuth.style.display = 'none';
    } catch (error) {
      alert(`Error con Google: ${error.message}`);
    }
  });

  // Cerrar Sesión
  btnCerrarSesion?.addEventListener('click', async () => {
    try {
      await signOut(auth);
      if (dropdownUsuario) dropdownUsuario.style.display = 'none';
      volverAlCatalogo();
    } catch (error) {
      console.error(error);
    }
  });

  // Estado del usuario en tiempo real
  onAuthStateChanged(auth, (user) => {
    usuarioActual = user;
    const labelUsuario = document.getElementById('label-usuario');
    const userEmailDisplay = document.getElementById('user-email-display');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');

    if (user) {
      const nombre = user.displayName || user.email.split('@')[0];
      if (labelUsuario) labelUsuario.textContent = nombre;
      if (userEmailDisplay) userEmailDisplay.textContent = user.email;
      if (profileName) profileName.textContent = nombre;
      if (profileEmail) profileEmail.textContent = user.email;
      if (profileAvatar) {
        profileAvatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=5b2c91&color=fff`;
      }
    } else {
      if (labelUsuario) labelUsuario.textContent = "Mi cuenta";
      if (dropdownUsuario) dropdownUsuario.style.display = 'none';
      volverAlCatalogo();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarModuloAutenticacion);
} else {
  iniciarModuloAutenticacion();
}
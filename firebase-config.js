import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQgqn3ZFCA1bcPGrM69JHRJslGHS_zhOc",
  authDomain: "biblioteca-fahusaccicloiv.firebaseapp.com",
  projectId: "biblioteca-fahusaccicloiv",
  storageBucket: "biblioteca-fahusaccicloiv.firebasestorage.app",
  messagingSenderId: "5848760982",
  appId: "1:5848760982:web:17762af3d20ff3e54a78b7",
  measurementId: "G-95N8ZW65KY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Asignación directa a window para ejecución local fluida
window.registrarUsuario = async function(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { exito: true, usuario: userCredential.user };
  } catch (error) {
    return { exito: false, error: error.message };
  }
};

window.iniciarSesion = async function(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { exito: true, usuario: userCredential.user };
  } catch (error) {
    return { exito: false, error: error.message };
  }
};

window.cerrarSesion = async function() {
  try {
    await signOut(auth);
    return { exito: true };
  } catch (error) {
    return { exito: false, error: error.message };
  }
};

window.observarUsuario = function(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
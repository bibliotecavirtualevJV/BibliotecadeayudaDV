// Pega aquí la URL de tu Apps Script que copiaste al desplegar tu API
const URL_API_SHEETS = "https://script.google.com/macros/s/AKfycbzhxD6-Jlw13W6i6YubgDK3DY5Pvor0gPdTjGPaMw4IUP8RFSXM0Vq3Fk3vehfjjnY/exec";

// Inicializamos la variable vacía; se llenará solita con Google Sheets
let BASE_CURSOS = [];

// Función para descargar los libros desde la nube en tiempo real
async function cargarCursosDesdeGoogleSheets() {
  try {
    const respuesta = await fetch(URL_API_SHEETS);
    BASE_CURSOS = await respuesta.json();
    
    console.log("¡Biblioteca cargada con éxito desde Google Sheets!", BASE_CURSOS);

    // Si ya tienes funciones de filtros o renderizado listas, las ejecutas aquí:
    if (typeof aplicarFiltrosMultiples === 'function') {
      aplicarFiltrosMultiples();
    }
  } catch (error) {
    console.error("Error al conectar con la base de datos de la nube:", error);
  }
}

// Ejecutar la carga automáticamente al abrir la página web
document.addEventListener('DOMContentLoaded', () => {
  cargarCursosDesdeGoogleSheets();
});

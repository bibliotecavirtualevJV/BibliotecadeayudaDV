const BASE_CURSOS = [
  // ==========================================
  // PROFESORADO EN EDUCACIÓN A DISTANCIA (40)
  // ==========================================
  // Ciclo I
  { id: "40-01", nombre: "Estudios gramaticales", carrera: "profesorado-distancia", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "Lenguaje" },
  { id: "40-02", nombre: "Historia de Guatemala", carrera: "profesorado-distancia", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación", link: "https://1024terabox.com/s/1-CmWaXBWXoq6qoB1n61BcQ",portada: "img/patriacriollo.png" },
  { id: "40-03", nombre: "Alfabetización informacional y mediática", carrera: "profesorado-distancia", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-04", nombre: "Lógica aplicada a la informática", carrera: "profesorado-distancia", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-05", nombre: "Técnicas de estudio e investigación", carrera: "profesorado-distancia", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "Investigación" },

  // Ciclo II
  { id: "40-06", nombre: "Sociología general", carrera: "profesorado-distancia", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "40-07", nombre: "Fundamentos de Pedagogía", carrera: "profesorado-distancia", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-08", nombre: "Psicología evolutiva", carrera: "profesorado-distancia", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-09", nombre: "Educación a distancia", carrera: "profesorado-distancia", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "40-10", nombre: "Alfabetización digital", carrera: "profesorado-distancia", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-11", nombre: "Ofimática", carrera: "profesorado-distancia", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo III
  { id: "40-12", nombre: "Estudios socioeconómicos de Guatemala", carrera: "profesorado-distancia", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "40-13", nombre: "Historia de la tecnología", carrera: "profesorado-distancia", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-14", nombre: "Estrategias de evaluación de los aprendizajes 1", carrera: "profesorado-distancia", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-15", nombre: "Didáctica general", carrera: "profesorado-distancia", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-16", nombre: "Educación a distancia modalidad B-learning", carrera: "profesorado-distancia", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "40-17", nombre: "Sistemas operativos y redes", carrera: "profesorado-distancia", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo IV
  { id: "40-18", nombre: "Estrategias de evaluación de los aprendizajes 2", carrera: "profesorado-distancia", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-19", nombre: "Centros de aprendizaje integrados al currículo", carrera: "profesorado-distancia", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-20", nombre: "Educación a distancia modalidad e-learning", carrera: "profesorado-distancia", ciclo: "4", modalidad: "e-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "40-21", nombre: "Bibliotecas digitales", carrera: "profesorado-distancia", ciclo: "4", modalidad: "e-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-22", nombre: "Semiología de la imagen", carrera: "profesorado-distancia", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-23", nombre: "Lenguajes de programación", carrera: "profesorado-distancia", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo V
  { id: "40-24", nombre: "Planificación curricular orientada a la educación a distancia", carrera: "profesorado-distancia", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-25", nombre: "Formación de tutores en educación virtual", carrera: "profesorado-distancia", ciclo: "5", modalidad: "e-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "40-26", nombre: "Aprendizaje ubicuo y otras modalidades", carrera: "profesorado-distancia", ciclo: "5", modalidad: "e-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "40-27", nombre: "Producción de contenidos digitales", carrera: "profesorado-distancia", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-28", nombre: "Mantenimiento de equipo multimedia", carrera: "profesorado-distancia", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-29", nombre: "Seminario de actualización tecnológica", carrera: "profesorado-distancia", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo VI
  { id: "40-30", nombre: "Práctica supervisada en el área de tecnología", carrera: "profesorado-distancia", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "Investigación" },
  { id: "40-31", nombre: "Práctica docente en el área de tecnológica", carrera: "profesorado-distancia", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "40-32", nombre: "Administración de plataformas virtuales", carrera: "profesorado-distancia", ciclo: "6", modalidad: "e-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "40-33", nombre: "Diseño y desarrollo de sitios Web", carrera: "profesorado-distancia", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // ===================================================
  // PROFESORADO EN PEDAGOGÍA Y TIC (29)
  // ===================================================
  // Ciclo I
  { id: "29-01", nombre: "Estudios gramaticales", carrera: "profesorado-pedagogia-tic", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "Lenguaje" },
  { id: "29-02", nombre: "Historia de Guatemala I", carrera: "profesorado-pedagogia-tic", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "29-03", nombre: "Alfabetización informacional y mediática", carrera: "profesorado-pedagogia-tic", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-04", nombre: "Técnicas de investigación", carrera: "profesorado-pedagogia-tic", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "Investigación" },
  { id: "29-05", nombre: "Lógica aplicada a la informática", carrera: "profesorado-pedagogia-tic", ciclo: "1", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo II
  { id: "29-06", nombre: "Sociología general", carrera: "profesorado-pedagogia-tic", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "29-07", nombre: "Historia de Guatemala II", carrera: "profesorado-pedagogia-tic", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "29-08", nombre: "Alfabetización digital", carrera: "profesorado-pedagogia-tic", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-09", nombre: "Ofimática", carrera: "profesorado-pedagogia-tic", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-10", nombre: "Inglés aplicado a la informática", carrera: "profesorado-pedagogia-tic", ciclo: "2", modalidad: "b-learning", jornada: "vespertina", categoria: "Lenguaje" },

  // Ciclo III
  { id: "29-11", nombre: "Fundamentos de Pedagogia", carrera: "profesorado-pedagogia-tic", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-12", nombre: "Didáctica General", carrera: "profesorado-pedagogia-tic", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-13", nombre: "Psicología Evolutiva", carrera: "profesorado-pedagogia-tic", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-14", nombre: "Tecnologías de la información y comunicación", carrera: "profesorado-pedagogia-tic", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-15", nombre: "Sistemas operativos y redes", carrera: "profesorado-pedagogia-tic", ciclo: "3", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo IV
  { id: "29-16", nombre: "Centros de aprendizaje integrados al currículo", carrera: "profesorado-pedagogia-tic", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-17", nombre: "Didáctica y multimedia", carrera: "profesorado-pedagogia-tic", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-18", nombre: "Estrategias de evaluación I", carrera: "profesorado-pedagogia-tic", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-19", nombre: "Bibliotecas digitales", carrera: "profesorado-pedagogia-tic", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-20", nombre: "Semiologia de la imagen", carrera: "profesorado-pedagogia-tic", ciclo: "4", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo V
  { id: "29-21", nombre: "Mediación pedagógica y TIC", carrera: "profesorado-pedagogia-tic", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-22", nombre: "Estrategias de evaluación II", carrera: "profesorado-pedagogia-tic", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-23", nombre: "Competencias instrumentales en TIC", carrera: "profesorado-pedagogia-tic", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-24", nombre: "Producción de contenidos digitales", carrera: "profesorado-pedagogia-tic", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-25", nombre: "Lenguajes de Programación I", carrera: "profesorado-pedagogia-tic", ciclo: "5", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo VI
  { id: "29-26", nombre: "Práctica docente", carrera: "profesorado-pedagogia-tic", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-27", nombre: "Diseño y desarrollo de sitios web", carrera: "profesorado-pedagogia-tic", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-28", nombre: "Mantenimiento de equipo multimedia", carrera: "profesorado-pedagogia-tic", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-29", nombre: "Lenguajes de programación II", carrera: "profesorado-pedagogia-tic", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-30", nombre: "Inglés I-II-TIC", carrera: "profesorado-pedagogia-tic", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "Lenguaje" },
  { id: "29-31", nombre: "Seminario de actualización tecnológica", carrera: "profesorado-pedagogia-tic", ciclo: "6", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },

  // Ciclo VII
  { id: "29-32", nombre: "Estudios socioeconómicos de Guatemala", carrera: "profesorado-pedagogia-tic", ciclo: "7", modalidad: "b-learning", jornada: "vespertina", categoria: "Educación" },
  { id: "29-33", nombre: "Práctica supervisada", carrera: "profesorado-pedagogia-tic", ciclo: "7", modalidad: "b-learning", jornada: "vespertina", categoria: "Investigación" },
  { id: "29-34", nombre: "Planificación curricular orientada a las TIC", carrera: "profesorado-pedagogia-tic", ciclo: "7", modalidad: "b-learning", jornada: "vespertina", categoria: "Pedagogía" },
  { id: "29-35", nombre: "Nuevas tendencias de las TIC y su aplicabilidad en la educ.", carrera: "profesorado-pedagogia-tic", ciclo: "7", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-36", nombre: "Software libre", carrera: "profesorado-pedagogia-tic", ciclo: "7", modalidad: "b-learning", jornada: "vespertina", categoria: "TIC" },
  { id: "29-37", nombre: "Inglés III-IV-TIC", carrera: "profesorado-pedagogia-tic", ciclo: "7", modalidad: "b-learning", jornada: "vespertina", categoria: "Lenguaje" },

  // ===================================================
  // LICENCIATURA EN EDUCACIÓN Y TIC (41)
  // ===================================================
  // Ciclo VII
  { id: "41-01", nombre: "Impacto socioeconómico y político de las TIC", carrera: "licenciatura-tic", ciclo: "7", modalidad: "e-learning", jornada: "nocturna", categoria: "Educación" },
  { id: "41-02", nombre: "Filosofía de la educación", carrera: "licenciatura-tic", ciclo: "7", modalidad: "e-learning", jornada: "nocturna", categoria: "Educación" },
  { id: "41-03", nombre: "Entornos virtuales de aprendizaje", carrera: "licenciatura-tic", ciclo: "7", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },
  { id: "41-04", nombre: "Tecnología y desarrollo de aplicaciones", carrera: "licenciatura-tic", ciclo: "7", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },
  { id: "41-05", nombre: "Gestión de las TIC en las instituciones", carrera: "licenciatura-tic", ciclo: "7", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },
  { id: "41-06", nombre: "Métodos de investigación", carrera: "licenciatura-tic", ciclo: "7", modalidad: "e-learning", jornada: "nocturna", categoria: "Investigación" },

  // Ciclo VIII
  { id: "41-07", nombre: "Administración de la mercadotecnia", carrera: "licenciatura-tic", ciclo: "8", modalidad: "e-learning", jornada: "nocturna", categoria: "Educación" },
  { id: "41-08", nombre: "Comunicación educativa", carrera: "licenciatura-tic", ciclo: "8", modalidad: "e-learning", jornada: "nocturna", categoria: "Educación" },
  { id: "41-09", nombre: "Metodología y evaluación en entornos virtuales de aprendizaje", carrera: "licenciatura-tic", ciclo: "8", modalidad: "e-learning", jornada: "nocturna", categoria: "Pedagogía" },
  { id: "41-10", nombre: "Estándares educativos en las TIC", carrera: "licenciatura-tic", ciclo: "8", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },
  { id: "41-11", nombre: "Elaboración de proyectos", carrera: "licenciatura-tic", ciclo: "8", modalidad: "e-learning", jornada: "nocturna", categoria: "Investigación" },
  { id: "41-12", nombre: "Ética profesional y de la investigación", carrera: "licenciatura-tic", ciclo: "8", modalidad: "e-learning", jornada: "nocturna", categoria: "Investigación" },

  // Ciclo IX
  { id: "41-13", nombre: "Gestión de recursos humanos", carrera: "licenciatura-tic", ciclo: "9", modalidad: "e-learning", jornada: "nocturna", categoria: "Educación" },
  { id: "41-14", nombre: "Inteligencias múltiples y TAC", carrera: "licenciatura-tic", ciclo: "9", modalidad: "e-learning", jornada: "nocturna", categoria: "Pedagogía" },
  { id: "41-15", nombre: "Tecnologías emergentes y sus aplicaciones en educación", carrera: "licenciatura-tic", ciclo: "9", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },
  { id: "41-16", nombre: "Propiedad intelectual y TIC", carrera: "licenciatura-tic", ciclo: "9", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },
  { id: "41-17", nombre: "Diseño, producción y administración de proyectos educativos basados en TIC / TAC", carrera: "licenciatura-tic", ciclo: "9", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },
  { id: "41-18", nombre: "Seminario de actualización tecnológica", carrera: "licenciatura-tic", ciclo: "9", modalidad: "e-learning", jornada: "nocturna", categoria: "TIC" },

  // Ciclo X
  { id: "41-19", nombre: "Ejercicio Profesional Supervisado EPS", carrera: "licenciatura-tic", ciclo: "10", modalidad: "e-learning", jornada: "nocturna", categoria: "Investigación" }
];
function aplicarFiltrosMultiples() {
  if (typeof BASE_CURSOS === 'undefined') return;

  const carrera = document.getElementById('select-carrera')?.value || 'todas';
  const ciclo = document.getElementById('select-ciclo')?.value || 'todos';
  const asignatura = document.getElementById('select-asignatura')?.value || 'todas';
  const texto = (document.getElementById('input-buscador')?.value || '').toLowerCase().trim();

  const resultado = BASE_CURSOS.filter(curso => {
    // Lectura flexible de claves (acepta 'carrera', 'carrera_id', 'id', 'codigo', 'ciclo', etc.)
    const valCarrera = String(curso.carrera || curso.carrera_id || '');
    const valCiclo = String(curso.ciclo || curso.ciclo_id || '');
    const valAsignatura = String(curso.id || curso.codigo || curso.codigo_curso || curso.asignatura || '');
    const valNombre = String(curso.nombre || curso.titulo || '').toLowerCase();

    // Validaciones
    const coincideCarrera = (carrera === 'todas' || valCarrera === carrera);
    const coincideCiclo = (ciclo === 'todos' || valCiclo === String(ciclo));
    const coincideAsignatura = (asignatura === 'todas' || valAsignatura === asignatura);
    const coincideTexto = (texto === '' || valNombre.includes(texto));

    return coincideCarrera && coincideCiclo && coincideAsignatura && coincideTexto;
  });

  renderizarCursosResultantes(resultado);

  // Actualiza los botones de la paginación con el resultado filtrado
  if (typeof renderizarPaginacion === 'function') {
    renderizarPaginacion(resultado.length, 1, 'paginacion-principal', 'catalogo.html', true);
  }
}

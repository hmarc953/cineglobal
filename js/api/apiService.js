/**
 * Servicio para consumo de API externa
 */
const ApiService = {
  /**
   * Obtiene datos desde un endpoint.
   *
   * @param {string} endpoint URL o ruta del recurso.
   * @returns {Promise<Array>}
   * @throws {Error}
   */
  async fetchData(endpoint) {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const json = await response.json();

      // Validación y sanitización obligatoria
      const datosSanitizados =
        this.sanitizarDatos(json);

      return datosSanitizados;

    } catch (error) {
      if (error.message.startsWith('HTTP_')) {
        error.userMessage =
          'El servidor respondió con un error.';
      } else if (error instanceof SyntaxError) {
        error.userMessage =
          'Los datos recibidos tienen un formato inválido.';
      } else if (error instanceof TypeError) {
        error.userMessage =
          'No fue posible establecer conexión con el servidor.';
      } else {
        error.userMessage =
          'Ocurrió un error inesperado.';
      }

      throw error;
    }
  },

/**
 * Valida, filtra y transforma datos.
 *
 * Utiliza:
 * - filter()
 * - map()
 *
 * @param {Array|Object} datos
 * @returns {Array}
 */
sanitizarDatos(datos = []) {
  let lista = [];

  if (Array.isArray(datos)) {
    lista = datos;
  } else if (
    datos &&
    Array.isArray(datos.results)
  ) {
    lista = datos.results;
  }

  return lista
    .filter(
      (item) =>
        item &&
        item.id &&
        (item.title || item.name)
    )
    .map((item) => ({
      id: item.id,

      titulo: String(
        item.title ||
        item.name ||
        'Sin título'
      ).trim(),

      categoria: Array.isArray(item.genre_ids)
        ? item.genre_ids.join(', ')
        : 'Sin categoría',

      clasificacion: 'ATP',

      fechaEstreno:
        item.release_date || '',

      imagen: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : '',

      funciones: []
    }));
},

  /**
   * Calcula la cantidad total de funciones
   * utilizando reduce().
   *
   * @param {Array} datos
   * @returns {number}
   */
  contarResultados(datos = []) {
    const totalPeliculas = datosApi.length;

mostrarExito(
  estadoApi,
  `Cartelera cargada correctamente. ${totalPeliculas} película(s) disponibles.`
);
    ;


  return datos.reduce(
    (total, pelicula) =>
      total + (pelicula.funciones?.length || 0),
    0
  );
}  

};

export default ApiService;
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
        (item.titulo || item.title)
    )
    .map((item) => ({
      id: item.id,

      titulo: String(
        item.titulo ||
        item.title ||
        'Sin título'
      ).trim(),

      categoria:
        item.categoria || 'Sin categoría',

      clasificacion:
        item.clasificacion || 'ATP',

      fechaEstreno:
        item.fechaEstreno || '',

      imagen:
        item.imagen || '',

      funciones: Array.isArray(
        item.funciones
      )
        ? item.funciones
        : []
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
    return datos.reduce(
      (total, pelicula) =>
        total + (pelicula.funciones?.length || 0),
      0
    );
  }
};

export default ApiService;
import {
  mostrarLoading,
  mostrarError,
  mostrarExito,
  ocultarLoading
} from '../utils/dom.js';

/**
 * Servicio para consumo de API externa
 */
const ApiService = {
  /**
   * Obtiene datos desde un endpoint.
   *
   * @param {string} endpoint URL o ruta del recurso.
   * @param {HTMLElement|null} elementoEstado Elemento donde mostrar mensajes.
   * @returns {Promise<Array|Object>}
   * @throws {Error}
   */
  async fetchData(endpoint, elementoEstado = null) {
    try {
      this.showLoading(elementoEstado);

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const json = await response.json();

      const datos = this.sanitizarDatos(json);

      this.hideLoading(elementoEstado);

      this.showSuccess(
        elementoEstado,
        `${this.contarResultados(datos)} registro(s) cargado(s)`
      );

      return datos;
    } catch (error) {
      this.hideLoading(elementoEstado);

      if (error.message.startsWith('HTTP_')) {
        this.showError(
          elementoEstado,
          'El servidor respondió con un error.'
        );
      } else {
        this.showError(
          elementoEstado,
          'No fue posible obtener los datos. Intente nuevamente.'
        );
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
    const lista = Array.isArray(datos)
      ? datos
      : datos.results || [];

    return lista
      .filter((item) => item && item.id)
      .map((item) => ({
        ...item,
        title: item.title
          ? String(item.title).trim()
          : 'Sin título'
      }));
  },

  /**
   * Cuenta elementos utilizando reduce().
   *
   * @param {Array} datos
   * @returns {number}
   */
  contarResultados(datos = []) {
    return datos.reduce(
      (total) => total + 1,
      0
    );
  },

  showLoading(elemento) {
    if (elemento) {
      mostrarLoading(
        elemento,
        'Cargando información...'
      );
    }
  },

  hideLoading(elemento) {
    if (elemento) {
      ocultarLoading(elemento);
    }
  },

  showSuccess(elemento, mensaje) {
    if (elemento) {
      mostrarExito(elemento, mensaje);
    }
  },

  showError(elemento, mensaje) {
    if (elemento) {
      mostrarError(elemento, mensaje);
    }
  }
};
async function cargarPeliculasDesdeApi() {
  try {
    const datosApi = await ApiService.fetchData(
      './api/peliculas.json'
    );

    const peliculasSanitizadas =
      ApiService.sanitizarDatos(datosApi);

    const cantidad =
      ApiService.contarResultados(
        peliculasSanitizadas
      );

    console.log(
      `Se cargaron ${cantidad} películas desde la API`
    );

  } catch (error) {
    console.error(
      'Error al cargar películas:',
      error
    );
  }
}
export default ApiService;
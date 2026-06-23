import {
  consultarElemento,
  mostrarLoading,
  mostrarError,
  mostrarExito,
  ocultarLoading
} from '../utils/dom.js';

/**
 * Servicio para consumo de API externa
 */
const ApiService = {
  async fetchData(endpoint) {
    try {
      this.showLoading();

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      this.hideLoading();
      this.showSuccess('Datos cargados correctamente');

      return data;
    } catch (error) {
      this.hideLoading();
      this.showError('No fue posible obtener los datos. Intente nuevamente.');
      throw error;
    }
  },

  /**
   * Sanitiza y transforma datos usando filter() y map()
   */
  sanitizarDatos(datos = []) {
    return datos
      .filter(item => item && item.id) // filter()
      .map(item => ({                  // map()
        ...item,
        title: item.title
          ? String(item.title).trim()
          : 'Sin título'
      }));
  },

  /**
   * Cuenta elementos usando reduce()
   */
  contarResultados(datos = []) {
    return datos.reduce(
      (total) => total + 1,
      0
    );
  },

  showLoading() {
    const mensaje = consultarElemento('#mensaje-api');

    if (mensaje) {
      mostrarLoading(mensaje, 'Cargando datos...');
    }
  },

  hideLoading() {
    const mensaje = consultarElemento('#mensaje-api');

    if (mensaje) {
      ocultarLoading(mensaje);
    }
  },

  showSuccess(message) {
    const mensaje = consultarElemento('#mensaje-api');

    if (mensaje) {
      mostrarExito(mensaje, message);
    }
  },

  showError(message) {
    const mensaje = consultarElemento('#mensaje-api');

    if (mensaje) {
      mostrarError(mensaje, message);
    }
  }
};

export default ApiService;
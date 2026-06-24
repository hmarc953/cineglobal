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
    } else if (datos && Array.isArray(datos.results)) {
      lista = datos.results;
    }

    return lista
      .filter((item) => item && item.id)
      .map((item) => ({
        ...item,
        title: item.title
          ? String(item.title).trim()
          : String(item.name || 'Sin título').trim(),
        categoria: this.obtenerCategoriaCompatible(item),
        clasificacion: item.clasificacion || 'ATP',
        fechaEstreno: this.obtenerFechaEstrenoSegura(item),
        imagen: item.imagen || (item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : ''),
        funciones: Array.isArray(item.funciones) ? item.funciones : []
      }));
  },

  /**
   * Normaliza la fecha de estreno para evitar valores inválidos.
   *
   * @param {object} item
   * @returns {string|null}
   */
  obtenerFechaEstrenoSegura(item) {
    const fechaCruda = item?.release_date || item?.fechaEstreno;

    if (!fechaCruda) {
      return null;
    }

    const fecha = new Date(fechaCruda);

    if (Number.isNaN(fecha.getTime())) {
      return null;
    }

    return fecha.toISOString().slice(0, 10);
  },

  /**
   * Traduce los géneros de TMDB a categorías usadas por CineGlobal.
   *
   * @param {object} item
   * @returns {string}
   */
  obtenerCategoriaCompatible(item) {
    const categoriaCruda =
      typeof item?.categoria === 'string'
        ? item.categoria.trim()
        : '';

    if (
      categoriaCruda &&
      !/^\d+(\s*,\s*\d+)*$/.test(categoriaCruda)
    ) {
      return categoriaCruda;
    }

    const genreIds = Array.isArray(item?.genre_ids)
      ? item.genre_ids
      : categoriaCruda
      ? categoriaCruda.split(',').map((id) => Number(id.trim()))
      : [];

    for (const genreId of genreIds) {
      const categoria = this.mapearGeneroTmdb(Number(genreId));
      if (categoria) {
        return categoria;
      }
    }

    return 'Drama';
  },

  /**
   * Mapa de género TMDB -> categoría compatible con filtros internos.
   *
   * @param {number} genreId
   * @returns {string|null}
   */
  mapearGeneroTmdb(genreId) {
    const mapa = {
      16: 'Animacion',
      28: 'Accion',
      12: 'Accion',
      878: 'Accion',
      14: 'Accion',
      80: 'Accion',
      10752: 'Accion',
      37: 'Accion',
      53: 'Accion',
      35: 'Comedia',
      10751: 'Comedia',
      10402: 'Comedia',
      10749: 'Drama',
      18: 'Drama',
      36: 'Drama',
      27: 'Drama',
      9648: 'Drama',
      99: 'Drama'
    };

    return mapa[genreId] || null;
  },

  /**
   * Cuenta elementos utilizando reduce().
   *
   * @param {Array} datos
   * @returns {number}
   */
  contarResultados(datos = []) {
    if (!Array.isArray(datos)) {
      return 0;
    }

    return datos.reduce(
      (total) => total + 1,
      0
    );
  },

  /**
   * Calcula métricas del catálogo usando reduce().
   *
   * @param {Array} datos
   * @returns {{total: number, porCategoria: Object<string, number>, categoriaPrincipal: string|null}}
   */
  calcularMetricasCatalogo(datos = []) {
    if (!Array.isArray(datos)) {
      return {
        total: 0,
        porCategoria: {},
        categoriaPrincipal: null
      };
    }

    const porCategoria = datos.reduce((acumulador, item) => {
      const categoria =
        typeof item?.categoria === 'string' && item.categoria.trim()
          ? item.categoria.trim()
          : 'Sin categoria';

      acumulador[categoria] = (acumulador[categoria] || 0) + 1;
      return acumulador;
    }, {});

    const categoriaPrincipal = Object.entries(porCategoria).reduce(
      (maxima, actual) => (actual[1] > maxima[1] ? actual : maxima),
      ['', 0]
    )[0] || null;

    return {
      total: this.contarResultados(datos),
      porCategoria,
      categoriaPrincipal
    };
  }
};
export default ApiService;
/**
 * Justificacion tecnica de API
 *
 * Se usa The Movie Database (TMDB) porque ofrece un catalogo amplio,
 * documentacion publica estable y un esquema consistente para peliculas.
 * Esta eleccion evita hardcodear datos y permite renovar la cartelera
 * sin cambios de estructura en la aplicacion.
 *
 * Endpoint consumido:
 * - GET https://api.themoviedb.org/3/discover/movie
 *
 * Formato esperado de respuesta:
 * - Objeto JSON con `results` (Array) o directamente un Array de peliculas.
 * - Cada pelicula debe incluir, al menos, datos compatibles con el mapeo interno:
 *   `title`, `overview`, `poster_path`, `genre_ids`, `release_date`, `vote_average`.
 *
 * Si la respuesta no respeta ese contrato, este servicio lanza
 * `FORMATO_API_INVALIDO` para activar el fallback local.
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
        const error = new Error(`HTTP_${response.status}`);
        error.userMessage =
          'El servidor respondió con un error.';
        throw error;
      }

      const json = await response.json();

      if (!Array.isArray(json) && !Array.isArray(json?.results)) {
        const error = new SyntaxError('FORMATO_API_INVALIDO');
        error.userMessage =
          'La API devolvió un formato inesperado. Se usará la cartelera almacenada o local.';
        throw error;
      }

      const datosSanitizados =
        this.sanitizarDatos(json);

      if (datosSanitizados.length === 0) {
        const error = new Error('API_SIN_RESULTADOS');
        error.userMessage =
          'TheMovieDB no devolvió películas. Se usará la cartelera almacenada o local.';
        throw error;
      }

      return datosSanitizados;
    } catch (error) {
      if (!error.userMessage) {
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
      }

      throw error;
    }
  },

  /**
   * Obtiene datos con una cantidad acotada de intentos.
   * Permite inyectar el fetcher y notificar reintentos sin depender del DOM.
   *
   * @param {string} endpoint
   * @param {{maxIntentos?: number, onRetry?: Function|null, fetcher?: Function}} opciones
   * @returns {Promise<Array|Object>}
   * @throws {*} Último error recibido al agotar los intentos.
   */
  async fetchDataConReintento(endpoint, opciones = {}) {
    const {
      maxIntentos = 2,
      onRetry = null,
      fetcher = this.fetchData.bind(this)
    } = opciones;
    const cantidadIntentos =
      Number.isInteger(maxIntentos) && maxIntentos > 0
        ? maxIntentos
        : 1;

    let ultimoError = null;

    for (let intento = 1; intento <= cantidadIntentos; intento += 1) {
      try {
        return await fetcher(endpoint);
      } catch (error) {
        ultimoError = error;

        if (intento < cantidadIntentos && typeof onRetry === 'function') {
          onRetry({
            intentoActual: intento,
            proximoIntento: intento + 1,
            maxIntentos: cantidadIntentos,
            error
          });
        }
      }
    }

    throw ultimoError;
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
      .filter(
        (item) =>
          item &&
          Boolean(this.sanitizarTexto(item.id))
      )
      .map((item) => {
        const imagenTmdb = item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : item.imagen;

        return {
          id: this.sanitizarTexto(item.id),
          title: this.sanitizarTexto(
            item.title || item.name,
            'Sin título'
          ),
          titulo: this.sanitizarTexto(
            item.titulo || item.title || item.name,
            'Sin título'
          ),
          categoria: this.sanitizarTexto(
            this.obtenerCategoriaCompatible(item),
            'Drama'
          ),
          clasificacion: this.sanitizarTexto(
            item.clasificacion,
            'ATP'
          ),
          fechaEstreno: this.obtenerFechaEstrenoSegura(item),
          imagen: this.validarUrlImagen(imagenTmdb),
          funciones: Array.isArray(item.funciones)
            ? item.funciones
                .map((funcion) => ({
                  id: this.sanitizarTexto(funcion?.id),
                  cine: this.sanitizarTexto(funcion?.cine),
                  idioma: this.sanitizarTexto(funcion?.idioma),
                  horario: this.sanitizarTexto(funcion?.horario),
                  asientosDisponibles:
                    Number(funcion?.asientosDisponibles) || 0,
                  precio: Number(funcion?.precio) || 0
                }))
                .filter(
                  (funcion) =>
                    funcion.id &&
                    funcion.cine &&
                    funcion.idioma &&
                    funcion.horario &&
                    funcion.asientosDisponibles > 0 &&
                    funcion.precio > 0
                )
            : []
        };
      });
  },

  /**
   * Normaliza texto externo antes de incorporarlo al modelo interno.
   *
   * @param {*} valor
   * @param {string} fallback
   * @returns {string}
   */
  sanitizarTexto(valor, fallback = '') {
    return String(valor || fallback)
      .trim()
      .replace(/[<>"'`]/g, '');
  },

  /**
   * Acepta imágenes locales controladas o recursos HTTPS de TMDB.
   *
   * @param {*} valor
   * @returns {string}
   */
  validarUrlImagen(valor) {
    const url = String(valor || '').trim();

    if (!url) {
      return '';
    }

    if (/^assets\/images\/[a-zA-Z0-9._-]+$/.test(url)) {
      return url;
    }

    try {
      const urlNormalizada = new URL(url);
      const protocoloSeguro = urlNormalizada.protocol === 'https:';
      const dominioPermitido =
        urlNormalizada.hostname === 'image.tmdb.org';

      return protocoloSeguro && dominioPermitido
        ? urlNormalizada.href
        : '';
    } catch (error) {
      return '';
    }
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
   * Cuenta elementos del arreglo de resultados.
   *
   * @param {Array} datos
   * @returns {number}
   */
  contarResultados(datos = []) {
    if (!Array.isArray(datos)) {
      return 0;
    }

    return datos.length;
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

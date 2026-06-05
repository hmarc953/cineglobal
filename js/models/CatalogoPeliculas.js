/**
 * Clase CatalogoPeliculas
 * Representa el catálogo general de películas disponibles.
 */
class CatalogoPeliculas {
  /**
   * Crea una nueva instancia de CatalogoPeliculas.
   * @param {Array<Pelicula>} [peliculas=[]] - Películas iniciales del catálogo.
   */
  constructor(peliculas = []) {
    this.peliculas = Array.isArray(peliculas) ? peliculas : [];
  }

  /**
   * Busca películas que coincidan con los filtros especificados.
   * @param {{titulo?: string, categoria?: string, clasificacion?: string}} filtros - Criterios de búsqueda.
   * @returns {Array<Pelicula>} Array de películas que coinciden con los filtros.
   */
  buscarPorFiltros(filtros) {
    if (!filtros || typeof filtros !== "object") {
      return this.peliculas;
    }

    return this.peliculas.filter((pelicula) => pelicula.coincideConFiltros(filtros));
  }

  /**
   * Retorna todas las películas del catálogo.
   * @returns {Array<Pelicula>} Array con todas las películas.
   */
  listarPeliculas() {
    return this.peliculas;
  }

  /**
   * Obtiene una película por su identificador único.
   * @param {string} id - ID de la película a buscar.
   * @returns {Pelicula|null} La película si existe, null en caso contrario.
   */
  obtenerPeliculaPorId(id) {
    if (!id || String(id).trim() === "") {
      return null;
    }

    const idBuscado = String(id).trim();
    return this.peliculas.find((pelicula) => pelicula.id === idBuscado) || null;
  }

  /**
   * Obtiene una película por su índice en el array.
   * @param {number} indice - Índice de la película.
   * @returns {Pelicula|null} La película encontrada o null si el índice es inválido.
   */
  obtenerPeliculaPorIndice(indice) {
    if (!Number.isInteger(indice) || indice < 0 || indice >= this.peliculas.length) {
      return null;
    }

    return this.peliculas[indice];
  }

  /**
   * Convierte la instancia en un objeto plano serializable.
   * @returns {{peliculas: Array<object>}} Representación serializable del catálogo.
   */
  toJSON() {
    return {
      peliculas: this.peliculas.map((pelicula) => pelicula.toJSON()),
    };
  }

  /**
   * Crea una instancia de CatalogoPeliculas a partir de un objeto plano.
   * @param {{peliculas?: Array<object>}} json - Objeto de origen.
   * @returns {CatalogoPeliculas|null} Nueva instancia de CatalogoPeliculas o null si el JSON es inválido.
   */
  static fromJSON(json) {
    if (!json || typeof json !== "object") {
      return null;
    }

    const peliculas = Array.isArray(json.peliculas)
      ? json.peliculas
          .map((pJson) => Pelicula.fromJSON(pJson))
          .filter((pelicula) => pelicula !== null)
      : [];

    return new CatalogoPeliculas(peliculas);
  }
}
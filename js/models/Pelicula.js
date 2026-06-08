/**
 * Clase Pelicula
 * Representa una película disponible en cartelera.
 */
class Pelicula {
  /**
   * Crea una nueva instancia de Pelicula.
   * @param {string} id - Identificador único de la película.
   * @param {string} titulo - Título de la película.
   * @param {string} categoria - Categoría o género.
   * @param {string} clasificacion - Clasificación de edad.
   * @param {Date|string} fechaEstreno - Fecha de estreno.
   * @param {string} imagen - Ruta o referencia de la imagen.
   * @param {Array<Funcion>} [funciones=[]] - Funciones asociadas a la película.
   */
  constructor(id, titulo, categoria, clasificacion, fechaEstreno, imagen, funciones = []) {
    this.id = id ? String(id).trim() : "";
    this.titulo = titulo ? String(titulo).trim() : "";
    this.categoria = categoria ? String(categoria).trim() : "";
    this.clasificacion = clasificacion ? String(clasificacion).trim() : "";
    this.fechaEstreno = fechaEstreno instanceof Date ? fechaEstreno : new Date(fechaEstreno);
    this.imagen = imagen ? String(imagen).trim() : "";
    this.funciones = Array.isArray(funciones) ? funciones : [];
  }

  /**
   * Verifica si la película coincide con criterios de filtrado especificados.
   * @param {{titulo?: string, categoria?: string, clasificacion?: string}} filtros - Criterios de búsqueda.
   * @returns {boolean} true si la película cumple con los criterios proporcionados.
   */
  coincideConFiltros(filtros) {
    if (!filtros || typeof filtros !== "object") {
      return true;
    }

    if (
      typeof filtros.titulo === "string" &&
      filtros.titulo.trim() !== "" &&
      !this.titulo.toLowerCase().includes(filtros.titulo.trim().toLowerCase())
    ) {
      return false;
    }

    if (
      typeof filtros.categoria === "string" &&
      filtros.categoria.trim() !== "" &&
      this.categoria.toLowerCase() !== filtros.categoria.trim().toLowerCase()
    ) {
      return false;
    }

    if (
      typeof filtros.clasificacion === "string" &&
      filtros.clasificacion.trim() !== "" &&
      this.clasificacion.toLowerCase() !== filtros.clasificacion.trim().toLowerCase()
    ) {
      return false;
    }

    return true;
  }

  /**
   * Agrega una nueva función a la película.
   * @param {Funcion} funcion - Función a agregar.
   * @returns {boolean} true si se agregó correctamente, false en caso contrario.
   */
  agregarFuncion(funcion) {
    if (!funcion || !funcion.id) {
      return false;
    }

    const yaExiste = this.funciones.some((f) => f.id === funcion.id);
    if (yaExiste) {
      return false;
    }

    this.funciones.push(funcion);
    return true;
  }

  /**
   * Obtiene las funciones asociadas a la película.
   * @returns {Array<Funcion>} Array de funciones.
   */
  obtenerFuncionesDisponibles() {
    return this.funciones;
  }

  /**
   * Convierte la instancia en un objeto plano serializable.
   * @returns {{id: string, titulo: string, categoria: string, clasificacion: string, fechaEstreno: string, imagen: string, funciones: Array<object>}}
   */
  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      categoria: this.categoria,
      clasificacion: this.clasificacion,
      fechaEstreno: this.fechaEstreno.toISOString(),
      imagen: this.imagen,
      funciones: this.funciones.map((funcion) => funcion.toJSON()),
    };
  }

  /**
   * Crea una instancia de Pelicula a partir de un objeto plano.
   * @param {{id: string, titulo: string, categoria: string, clasificacion: string, fechaEstreno: string, imagen: string, funciones?: Array<object>}} json - Objeto de origen.
   * @returns {Pelicula|null} Nueva instancia de Pelicula o null si el JSON es inválido.
   */
  static fromJSON(json) {
    if (!json || typeof json !== "object") {
      return null;
    }

    const funciones = Array.isArray(json.funciones)
      ? json.funciones
          .map((fJson) => Funcion.fromJSON(fJson))
          .filter((funcion) => funcion !== null)
      : [];

    return new Pelicula(
      json.id,
      json.titulo,
      json.categoria,
      json.clasificacion,
      json.fechaEstreno,
      json.imagen,
      funciones
    );
  }
}
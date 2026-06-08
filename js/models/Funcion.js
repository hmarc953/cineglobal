/**
 * Clase Funcion
 * Representa una función específica de una película en un cine determinado.
 */
class Funcion {
  /**
   * Crea una nueva instancia de Funcion.
   * @param {string} id - Identificador único de la función.
   * @param {string} cine - Nombre o identificador del cine.
   * @param {string} idioma - Idioma de la proyección.
   * @param {string} horario - Horario de la función.
   * @param {number} asientosDisponibles - Cantidad de asientos disponibles.
   * @param {number} precio - Precio unitario de la entrada.
   */
  constructor(id, cine, idioma, horario, asientosDisponibles, precio) {
    this.id = id ? String(id).trim() : "";
    this.cine = cine ? String(cine).trim() : "";
    this.idioma = idioma ? String(idioma).trim() : "";
    this.horario = horario ? String(horario).trim() : "";
    this.asientosDisponibles = Number(asientosDisponibles);
    this.precio = Number(precio);
  }

  /**
   * Verifica si la función coincide con criterios de selección especificados.
   * @param {{cine?: string, idioma?: string, horario?: string}} datos - Criterios de comparación.
   * @returns {boolean} true si la función coincide con los criterios proporcionados.
   */
  coincideConSeleccion(datos) {
    if (!datos || typeof datos !== "object") {
      return true;
    }

    if (
      typeof datos.cine === "string" &&
      datos.cine.trim() !== "" &&
      this.cine.toLowerCase() !== datos.cine.trim().toLowerCase()
    ) {
      return false;
    }

    if (
      typeof datos.idioma === "string" &&
      datos.idioma.trim() !== "" &&
      this.idioma.toLowerCase() !== datos.idioma.trim().toLowerCase()
    ) {
      return false;
    }

    if (
      typeof datos.horario === "string" &&
      datos.horario.trim() !== "" &&
      this.horario !== datos.horario.trim()
    ) {
      return false;
    }

    return true;
  }

  /**
   * Comprueba si hay suficientes asientos disponibles.
   * @param {number} cantidad - Cantidad de asientos solicitados.
   * @returns {boolean} true si hay disponibilidad suficiente.
   */
  hayDisponibilidad(cantidad) {
    return Number.isInteger(cantidad) && cantidad > 0 && this.asientosDisponibles >= cantidad;
  }

  /**
   * Reserva una cantidad de asientos y actualiza la disponibilidad.
   * @param {number} cantidad - Cantidad de asientos a reservar.
   * @returns {boolean} true si la reserva fue exitosa, false en caso contrario.
   */
  reservarAsientos(cantidad) {
    if (!this.hayDisponibilidad(cantidad)) {
      return false;
    }

    this.asientosDisponibles -= cantidad;
    return true;
  }

  /**
   * Convierte la instancia en un objeto plano serializable.
   * @returns {{id: string, cine: string, idioma: string, horario: string, asientosDisponibles: number, precio: number}}
   */
  toJSON() {
    return {
      id: this.id,
      cine: this.cine,
      idioma: this.idioma,
      horario: this.horario,
      asientosDisponibles: this.asientosDisponibles,
      precio: this.precio,
    };
  }

  /**
   * Crea una instancia de Funcion a partir de un objeto plano.
   * @param {{id: string, cine: string, idioma: string, horario: string, asientosDisponibles: number, precio: number}} json - Objeto de origen.
   * @returns {Funcion|null} Nueva instancia de Funcion o null si el JSON es inválido.
   */
  static fromJSON(json) {
    if (!json || typeof json !== "object") {
      return null;
    }

    return new Funcion(
      json.id,
      json.cine,
      json.idioma,
      json.horario,
      json.asientosDisponibles,
      json.precio
    );
  }
}
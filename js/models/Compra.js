/**
 * Clase Compra
 * Representa una operación de compra de entradas para una función específica.
 */
class Compra {
  /**
   * Crea una nueva instancia de Compra.
   * @param {string} id - Identificador único de la compra.
   * @param {Funcion} funcion - Función para la cual se compran entradas.
   * @param {number} cantidadEntradas - Cantidad de entradas a comprar.
   * @param {string} emailComprador - Email del comprador.
   * @param {number} [total=0] - Total de la compra.
   * @param {string} [codigoConfirmacion=""] - Código de confirmación.
   */
  constructor(id, funcion, cantidadEntradas, emailComprador, total = 0, codigoConfirmacion = "") {
    this.id = id ? String(id).trim() : "";
    this.funcion = funcion || null;
    this.cantidadEntradas = Number(cantidadEntradas);
    this.emailComprador = emailComprador ? String(emailComprador).trim().toLowerCase() : "";
    this.total = Number(total);
    this.codigoConfirmacion = codigoConfirmacion ? String(codigoConfirmacion).trim() : "";
  }

  /**
   * Valida que la compra tenga datos coherentes.
   * @returns {boolean} true si la compra es válida, false en caso contrario.
   */
  esValida() {
    if (this.id === "") {
      return false;
    }

    if (!this.funcion || !this.funcion.id) {
      return false;
    }

    if (!Number.isInteger(this.cantidadEntradas) || this.cantidadEntradas <= 0) {
      return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.emailComprador === "" || !regexEmail.test(this.emailComprador)) {
      return false;
    }

    if (!this.funcion.hayDisponibilidad(this.cantidadEntradas)) {
      return false;
    }

    return true;
  }

  /**
   * Calcula el total a pagar.
   * @returns {number} Total calculado.
   */
  calcularTotal() {
    if (!this.funcion || typeof this.funcion.precio !== "number") {
      this.total = 0;
      return this.total;
    }

    this.total = this.cantidadEntradas * this.funcion.precio;
    return this.total;
  }

  /**
   * Confirma la compra: valida, calcula total, reserva asientos y genera código.
   * @returns {boolean} true si la compra fue confirmada, false en caso contrario.
   */
  confirmarCompra() {
    if (!this.esValida()) {
      return false;
    }

    this.calcularTotal();

    const reservaExitosa = this.funcion.reservarAsientos(this.cantidadEntradas);
    if (!reservaExitosa) {
      return false;
    }

    this.codigoConfirmacion = `CONF-${Date.now()}`;
    return true;
  }

  /**
   * Convierte la instancia en un objeto plano serializable.
   * @returns {{id: string, funcion: object|null, cantidadEntradas: number, emailComprador: string, total: number, codigoConfirmacion: string}}
   */
  toJSON() {
    return {
      id: this.id,
      funcion: this.funcion ? this.funcion.toJSON() : null,
      cantidadEntradas: this.cantidadEntradas,
      emailComprador: this.emailComprador,
      total: this.total,
      codigoConfirmacion: this.codigoConfirmacion,
    };
  }

  /**
   * Crea una instancia de Compra a partir de un objeto plano.
   * @param {{id: string, funcion: object|null, cantidadEntradas: number, emailComprador: string, total?: number, codigoConfirmacion?: string}} json - Objeto de origen.
   * @returns {Compra|null} Nueva instancia de Compra o null si el JSON es inválido.
   */
  static fromJSON(json) {
    if (!json || typeof json !== "object") {
      return null;
    }

    const funcion = json.funcion ? Funcion.fromJSON(json.funcion) : null;

    return new Compra(
      json.id,
      funcion,
      json.cantidadEntradas,
      json.emailComprador,
      json.total,
      json.codigoConfirmacion
    );
  }
}
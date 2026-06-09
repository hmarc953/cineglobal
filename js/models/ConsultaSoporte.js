/**
 * Clase ConsultaSoporte
 * Representa una consulta o solicitud de soporte técnico.
 */
export class ConsultaSoporte {
  /**
   * Estados posibles de una consulta.
   */
  static ESTADOS = {
    ABIERTO: "Abierto",
    EN_PROGRESO: "En progreso",
    RESUELTO: "Resuelto",
    CERRADO: "Cerrado",
  };

  /**
   * Crea una nueva instancia de ConsultaSoporte.
   * @param {string} idTicket - Identificador único del ticket.
   * @param {string} email - Email del usuario que realiza la consulta.
   * @param {string} titulo - Título de la consulta.
   * @param {string} descripcion - Descripción del problema o consulta.
   * @param {string} [estado=ConsultaSoporte.ESTADOS.ABIERTO] - Estado actual de la consulta.
   * @param {Date|string} [fechaCreacion=new Date()] - Fecha de creación.
   */
  constructor(
    idTicket,
    email,
    titulo,
    descripcion,
    estado = ConsultaSoporte.ESTADOS.ABIERTO,
    fechaCreacion = new Date()
  ) {
    this.idTicket = idTicket ? String(idTicket).trim() : "";
    this.email = email ? String(email).trim().toLowerCase() : "";
    this.titulo = titulo ? String(titulo).trim() : "";
    this.descripcion = descripcion ? String(descripcion).trim() : "";
    this.estado = estado ? String(estado).trim() : ConsultaSoporte.ESTADOS.ABIERTO;
    this.fechaCreacion = fechaCreacion instanceof Date ? fechaCreacion : new Date(fechaCreacion);
  }

  /**
   * Valida que los datos principales de la consulta sean correctos.
   * @returns {boolean} true si la consulta es válida, false en caso contrario.
   */
  validar() {
    if (this.email === "" || this.titulo === "" || this.descripcion === "") {
      return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(this.email);
  }

  /**
   * Genera un identificador único de ticket y lo asigna a la consulta.
   * @returns {string} ID de ticket generado.
   */
  generarTicket() {
    this.idTicket = `TKT-${Date.now()}`;
    return this.idTicket;
  }

  /**
   * Cambia el estado actual de la consulta.
   * @param {string} nuevoEstado - Nuevo estado de la consulta.
   * @returns {boolean} true si el cambio fue exitoso, false en caso contrario.
   */
  cambiarEstado(nuevoEstado) {
    if (!nuevoEstado || String(nuevoEstado).trim() === "") {
      return false;
    }

    const estadoNormalizado = String(nuevoEstado).trim();
    const estadosValidos = Object.values(ConsultaSoporte.ESTADOS);

    if (!estadosValidos.includes(estadoNormalizado)) {
      return false;
    }

    this.estado = estadoNormalizado;
    return true;
  }

  /**
   * Convierte la instancia en un objeto plano serializable.
   * @returns {{idTicket: string, email: string, titulo: string, descripcion: string, estado: string, fechaCreacion: string}}
   */
  toJSON() {
    const fechaCreacion = this.fechaCreacion instanceof Date && !Number.isNaN(this.fechaCreacion) ? this.fechaCreacion.toISOString() : null;
    return {
      idTicket: this.idTicket,
      email: this.email,
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado,
      fechaCreacion: fechaCreacion,
    };
  }

  /**
   * Crea una instancia de ConsultaSoporte a partir de un objeto plano.
   * @param {{idTicket: string, email: string, titulo: string, descripcion: string, estado?: string, fechaCreacion?: string}} json - Objeto de origen.
   * @returns {ConsultaSoporte|null} Nueva instancia de ConsultaSoporte o null si el JSON es inválido.
   */
  static fromJSON(json) {
    if (!json || typeof json !== "object") {
      return null;
    }

    return new ConsultaSoporte(
      json.idTicket,
      json.email,
      json.titulo,
      json.descripcion,
      json.estado,
      json.fechaCreacion
    );
  }
}
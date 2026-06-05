/**
 * Clase Usuario
 * Representa a un usuario registrado en el sistema CineGlobal.
 */
class Usuario {
  /**
   * Crea una nueva instancia de Usuario.
   * @param {string} id - Identificador único del usuario.
   * @param {string} nombre - Nombre completo del usuario.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   */
  constructor(id, nombre, email, password) {
    this.id = id ? String(id).trim() : "";
    this.nombre = nombre ? String(nombre).trim() : "";
    this.email = email ? String(email).trim().toLowerCase() : "";
    this.password = password ? String(password).trim() : "";
  }

  /**
   * Valida si la contraseña proporcionada coincide con la del usuario.
   * @param {string} passwordIngresada - Contraseña a validar.
   * @returns {boolean} true si coincide, false en caso contrario.
   */
  validarPassword(passwordIngresada) {
    if (!passwordIngresada || String(passwordIngresada).trim() === "") {
      return false;
    }

    return this.password === String(passwordIngresada).trim();
  }

  /**
   * Comprueba si el email del usuario coincide con el proporcionado.
   * @param {string} emailAComprobar - Email a comparar.
   * @returns {boolean} true si coincide, false en caso contrario.
   */
  coincideConEmail(emailAComprobar) {
    if (!emailAComprobar || String(emailAComprobar).trim() === "") {
      return false;
    }

    return this.email === String(emailAComprobar).trim().toLowerCase();
  }

  /**
   * Actualiza los datos del usuario con los valores proporcionados.
   * Solo modifica los campos válidos presentes en el objeto recibido.
   *
   * @param {{nombre?: string, email?: string, password?: string}} datos - Datos a actualizar.
   * @returns {boolean} true si se actualizó al menos un campo.
   */
  actualizarDatos(datos) {
    if (!datos || typeof datos !== "object") {
      return false;
    }

    let actualizado = false;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof datos.nombre === "string" && datos.nombre.trim() !== "") {
      this.nombre = datos.nombre.trim();
      actualizado = true;
    }

    if (
      typeof datos.email === "string" &&
      datos.email.trim() !== "" &&
      regexEmail.test(datos.email.trim())
    ) {
      this.email = datos.email.trim().toLowerCase();
      actualizado = true;
    }

    if (typeof datos.password === "string" && datos.password.trim() !== "") {
      this.password = datos.password.trim();
      actualizado = true;
    }

    return actualizado;
  }

  /**
   * Convierte la instancia en un objeto plano serializable.
   * @returns {{id: string, nombre: string, email: string, password: string}}
   */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      password: this.password,
    };
  }

  /**
   * Crea una instancia de Usuario a partir de un objeto plano.
   * @param {{id: string, nombre: string, email: string, password: string}} json - Objeto de origen.
   * @returns {Usuario|null} Nueva instancia de Usuario o null si no hay datos válidos.
   */
  static fromJSON(json) {
    if (!json || typeof json !== "object") {
      return null;
    }

    return new Usuario(
      json.id,
      json.nombre,
      json.email,
      json.password
    );
  }
}
/**
 * Clase GestorUsuarios
 * Administra la colección de usuarios del sistema.
 */
class GestorUsuarios {
  /**
   * Crea una nueva instancia de GestorUsuarios.
   * @param {Array<Usuario>} [usuarios=[]] - Usuarios iniciales del sistema.
   */
  constructor(usuarios = []) {
    this.usuarios = Array.isArray(usuarios) ? usuarios : [];
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * Valida que los datos estén completos, que el email tenga formato válido,
   * que no exista previamente y que la contraseña tenga al menos 6 caracteres.
   *
   * @param {{nombre: string, email: string, password: string}} datos - Datos del nuevo usuario.
   * @returns {Usuario|null} El usuario creado o null si no se pudo registrar.
   */
  registrarUsuario(datos) {
    if (
      !datos ||
      typeof datos !== "object" ||
      !datos.nombre ||
      !datos.email ||
      !datos.password
    ) {
      return null;
    }

    const nombre = String(datos.nombre).trim();
    const email = String(datos.email).trim().toLowerCase();
    const password = String(datos.password).trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre === "" || email === "" || password === "") {
      return null;
    }

    if (!regexEmail.test(email)) {
      return null;
    }

    if (password.length < 6) {
      return null;
    }

    if (this.emailExiste(email)) {
      return null;
    }

    const id = `user_${Date.now()}`;
    const nuevoUsuario = new Usuario(id, nombre, email, password);

    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  /**
   * Autentica un usuario a partir de email y contraseña.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Usuario|null} El usuario autenticado o null si las credenciales son inválidas.
   */
  autenticar(email, password) {
    if (!email || !password) {
      return null;
    }

    const usuario = this.buscarPorEmail(email);
    if (!usuario) {
      return null;
    }

    return usuario.validarPassword(password) ? usuario : null;
  }

  /**
   * Busca un usuario por su email.
   * @param {string} email - Email a buscar.
   * @returns {Usuario|null} El usuario encontrado o null si no existe.
   */
  buscarPorEmail(email) {
    if (!email || String(email).trim() === "") {
      return null;
    }

    const emailBuscado = String(email).trim().toLowerCase();

    return this.usuarios.find((usuario) => usuario.coincideConEmail(emailBuscado)) || null;
  }

  /**
   * Verifica si un email ya está registrado.
   * @param {string} email - Email a verificar.
   * @returns {boolean} true si el email existe, false en caso contrario.
   */
  emailExiste(email) {
    return this.buscarPorEmail(email) !== null;
  }

  /**
   * Convierte la instancia en un objeto plano serializable.
   * @returns {{usuarios: Array<object>}} Representación serializable del gestor.
   */
  toJSON() {
    return {
      usuarios: this.usuarios.map((usuario) => usuario.toJSON()),
    };
  }

  /**
   * Crea una instancia de GestorUsuarios a partir de un objeto plano.
   * @param {{usuarios?: Array<object>}} json - Objeto de origen.
   * @returns {GestorUsuarios|null} Nueva instancia de GestorUsuarios o null si el JSON es inválido.
   */
  static fromJSON(json) {
    if (!json || typeof json !== "object") {
      return null;
    }

    const usuarios = Array.isArray(json.usuarios)
      ? json.usuarios
          .map((uJson) => Usuario.fromJSON(uJson))
          .filter((usuario) => usuario !== null)
      : [];

    return new GestorUsuarios(usuarios);
  }
}
/**
 * Módulo de utilidades para Storage (localStorage y sessionStorage)
 */
const StorageUtil = {
  /**
   * Guarda un valor en storage
   * @param {string} clave - Clave del dato
   * @param {any} valor - Valor a guardar (se serializará a JSON si es objeto)
   * @param {string} tipo - 'local' para localStorage, 'session' para sessionStorage
   * @returns {boolean} true si se guardó correctamente
   */
  guardar(clave, valor, tipo = 'local') {
    return this._setItem(clave, valor, tipo);
  },

  /**
   * Obtiene un valor de storage
   * @param {string} clave - Clave del dato
   * @param {string} tipo - 'local' o 'session'
   * @returns {any|null} Valor deserializado o null si no existe
   */
  obtener(clave, tipo = 'local') {
    return this._getItem(clave, tipo);
  },

  /**
   * Actualiza un valor existente (alias de guardar)
   */
  actualizar(clave, valor, tipo = 'local') {
    return this.guardar(clave, valor, tipo);
  },

  /**
   * Elimina un valor de storage
   */
  eliminar(clave, tipo = 'local') {
    return this._removeItem(clave, tipo);
  },

  /**
   * Lista todas las claves que coinciden con un prefijo
   * @param {string} prefijo
   * @param {string} tipo
   * @returns {string[]}
   */
  listar(prefijo = '', tipo = 'local') {
    return this._listKeys(prefijo, tipo);
  },

  /**
   * Limpia todo el storage
   */
  limpiar(tipo = 'local') {
    return this._clear(tipo);
  },

  /**
   * @private
   * @param {string} tipo
   * @returns {Storage}
   */
  _getStorage(tipo = 'local') {
    const t = this._normalizeTipo(tipo);
    if (t === 'local') return localStorage;
    if (t === 'session') return sessionStorage;
    throw new Error(`Tipo de storage inválido: "${tipo}". Use 'local' o 'session'.`);
  },

  /**
   * Normaliza posibles valores aceptados para tipo
   * @private
   */
  _normalizeTipo(tipo) {
    if (!tipo) return 'local';
    const t = String(tipo).toLowerCase();
    if (t === 'local' || t === 'localstorage') return 'local';
    if (t === 'session' || t === 'sessionstorage') return 'session';
    return t;
  },

  /**
   * @private
   * @param {any} valor
   * @returns {string}
   */
  _serialize(valor) {
    if (typeof valor === 'string') return valor;
    try {
      return JSON.stringify(valor);
    } catch (error) {
      throw new Error(`No se pudo serializar el valor: ${error.message}`);
    }
  },

  /**
   * @private
   * @param {string|null} valor
   * @returns {any|null}
   */
  _deserialize(valor) {
    if (valor === null) return null;
    if (typeof valor !== 'string') return valor;

    const texto = valor.trim();
    if (!texto.startsWith('{') && !texto.startsWith('[')) {
      return valor;
    }

    try {
      return JSON.parse(valor);
    } catch (error) {
      console.warn(`[StorageUtil] JSON corrupto en storage: ${error.message}`);
      return null;
    }
  },

  /**
   * @private
   */
  _setItem(clave, valor, tipo) {
    try {
      const storage = this._getStorage(tipo);
      storage.setItem(clave, this._serialize(valor));
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        console.error(`[StorageUtil] Storage lleno al guardar '${clave}'.`);
      } else {
        console.error(`[StorageUtil] Error al guardar '${clave}': ${error.message}`);
      }
      return false;
    }
  },

  /**
   * @private
   */
  _getItem(clave, tipo) {
    try {
      const storage = this._getStorage(tipo);
      const rawValue = storage.getItem(clave);
      return this._deserialize(rawValue);
    } catch (error) {
      console.error(`[StorageUtil] Error al obtener '${clave}': ${error.message}`);
      return null;
    }
  },

  /**
   * @private
   */
  _removeItem(clave, tipo) {
    try {
      const storage = this._getStorage(tipo);
      if (storage.getItem(clave) === null) {
        console.warn(`[StorageUtil] La clave '${clave}' no existe en ${tipo}.`);
        return false;
      }
      storage.removeItem(clave);
      return true;
    } catch (error) {
      console.error(`[StorageUtil] Error al eliminar '${clave}': ${error.message}`);
      return false;
    }
  },

  /**
   * @private
   */
  _listKeys(prefijo, tipo) {
    try {
      const storage = this._getStorage(tipo);
      const claves = [];
      for (let i = 0; i < storage.length; i += 1) {
        const clave = storage.key(i);
        if (clave && clave.startsWith(prefijo)) {
          claves.push(clave);
        }
      }
      return claves;
    } catch (error) {
      console.error(`[StorageUtil] Error al listar claves con prefijo '${prefijo}': ${error.message}`);
      return [];
    }
  },

  /**
   * @private
   */
  _clear(tipo) {
    try {
      this._getStorage(tipo).clear();
      return true;
    } catch (error) {
      console.error(`[StorageUtil] Error al limpiar '${tipo}': ${error.message}`);
      return false;
    }
  }
};

// Helpers para integración con POO: serializar/recuperar instancias
StorageUtil.guardarInstancia = function (clave, instancia, tipo = 'local') {
  if (!instancia) return false;
  let payload = instancia;
  if (typeof instancia.toJSON === 'function') {
    payload = instancia.toJSON();
  } else if (typeof instancia === 'object') {
    payload = { ...instancia };
  }
  return this._setItem(clave, payload, tipo);
};

StorageUtil.cargarInstancia = function (clave, Constructor, tipo = 'local') {
  const data = this._getItem(clave, tipo);
  if (data === null) return null;
  if (typeof Constructor === 'function') {
    try {
      return new Constructor(data);
    } catch (e) {
      console.warn(`[StorageUtil] No se pudo instanciar ${Constructor.name}: ${e.message}`);
      return null;
    }
  }
  return data;
};

// Exponer en window para compatibilidad con scripts no modularizados
if (typeof window !== 'undefined') {
  window.StorageUtil = StorageUtil;
}

export { StorageUtil };

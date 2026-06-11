# Especificación Desarrollador JS Local y Session Storage - Actividad Obligatoria 4

## Objetivo

Definir la estrategia de almacenamiento y documentar la implementación final del módulo `js/utils/storage.js`, junto con la documentación asociada en `docs/06-storage/storage-doc.md`.

## 1. Estrategia de almacenamiento

### localStorage — Datos persistentes entre sesiones

| Clave | Descripción | Justificación |
|-------|-------------|---------------|
| `cine:usuario:preferencias` | Preferencias del usuario (idioma, asiento preferido, notificaciones) | El usuario espera que sus preferencias se recuerden en futuras visitas. |
| `cine:historial:compras` | Historial de compras de entradas | Registro de compras y comprobantes que deben persistir más allá de la sesión actual. |
| `cine:peliculas:favoritas` | Películas marcadas como favoritas | Información de largo plazo que el usuario quiere conservar. |
| `cine:usuario:datos` | Datos básicos del usuario (nombre, email no sensible, ciudad) | Facilita la experiencia y evita reingresar datos al volver a la app. |

**Justificación general de localStorage:**
Se usa para datos que deben permanecer entre sesiones, no se pierden al cerrar el navegador y no contienen información sensible.

### sessionStorage — Datos temporales de la sesión

| Clave | Descripción | Justificación |
|-------|-------------|---------------|
| `cine:sesion:carrito` | Entradas seleccionadas en el carrito actual | El carrito es temporal y debe desaparecer si la pestaña se cierra. |
| `cine:sesion:pelicula-activa` | Película y función seleccionada actualmente | Estado de navegación temporal de la selección. |
| `cine:sesion:asientos-reservados` | Asientos reservados antes de pago | Reserva temporal de la sesión de compra. |
| `cine:sesion:paso-actual` | Paso actual del flujo de compra | Mantener el paso de navegación en la pestaña activa. |

**Justificación general de sessionStorage:**
Se usa para datos que solo tienen sentido durante la sesión de la pestaña y se eliminan al cerrarla.

## 2. Convención de nombres de claves

Formato: `[dominio]:[entidad]:[descripción]`

Reglas:
- Separador `:`.
- Todo en minúsculas.
- Palabras compuestas con `-`.
- Prefijo `cine:` para evitar colisiones.
- `sesion` para datos temporales, `usuario` / `historial` / `peliculas` para datos persistentes.

Ejemplos:

```
cine:usuario:preferencias
cine:usuario:datos
cine:historial:compras
cine:peliculas:favoritas
cine:sesion:carrito
cine:sesion:pelicula-activa
cine:sesion:asientos-reservados
cine:sesion:paso-actual
```

## 3. Estructura de datos — JSON Schemas

### `cine:historial:compras`
```json
[
  {
    "id": "compra-1748901234",
    "fecha": "2026-06-04T15:30:00",
    "usuario": {
      "id": "u123",
      "nombre": "María Pérez",
      "email": "maria@example.com"
    },
    "pelicula": {
      "id": "p001",
      "titulo": "Avengers: Secret Wars",
      "sala": "Sala 3 - IMAX"
    },
    "funcion": {
      "fecha": "2026-06-05",
      "horario": "21:00",
      "idioma": "subtitulada"
    },
    "entradas": [
      { "asiento": "F7", "tipo": "general", "precio": 3500 },
      { "asiento": "F8", "tipo": "general", "precio": 3500 }
    ],
    "total": 7000,
    "medioPago": "tarjeta"
  }
]
```

### `cine:sesion:carrito`
```json
{
  "peliculaId": "p001",
  "funcionId": "f003",
  "asientos": ["F7", "F8"],
  "subtotal": 7000,
  "timestamp": "2026-06-04T15:00:00"
}
```

### `cine:usuario:preferencias`
```json
{
  "idiomaPreferido": "subtitulada",
  "tipoAsientoPreferido": "preferencial",
  "recibirNotificaciones": true,
  "ultimaCiudad": "Buenos Aires"
}
```

### `cine:sesion:asientos-reservados`
```json
{
  "funcionId": "f003",
  "asientos": ["F7", "F8"],
  "expira": "2026-06-04T15:15:00"
}
```

## 4. Implementación final en `js/utils/storage.js`

### API pública del módulo

- `guardar(clave, valor, tipo = 'local')`
- `obtener(clave, tipo = 'local')`
- `actualizar(clave, valor, tipo = 'local')`
- `eliminar(clave, tipo = 'local')`
- `listar(prefijo = '', tipo = 'local')`
- `limpiar(tipo = 'local')`

### Funcionalidad aplicada

- Se admiten los valores `tipo = 'local'` y `tipo = 'session'`.
- Se agregó serialización automática de objetos a JSON.
- `obtener` deserializa JSON y devuelve `null` si la clave no existe.
- `actualizar` funciona como alias de `guardar`.
- `eliminar` devuelve `false` si la clave no existe.
- `listar` devuelve claves que coinciden con el prefijo.
- Se maneja storage lleno con mensajes de error.

### Helpers internos del módulo

- `_getStorage(tipo)` — devuelve `localStorage` o `sessionStorage`.
- `_serialize(valor)` — convierte objetos a JSON.
- `_deserialize(valor)` — convierte JSON de vuelta a objeto.
- `_setItem(clave, valor, tipo)` — guarda y maneja errores.
- `_getItem(clave, tipo)` — lee y deserializa.
- `_removeItem(clave, tipo)` — elimina con validación.
- `_listKeys(prefijo, tipo)` — lista claves por prefijo.
- `_clear(tipo)` — limpia el storage.

### Exportación

El archivo exporta el módulo con ES6:

```js
export { StorageUtil };
```

## 5. Documentación asociada

Se creó `docs/06-storage/storage-doc.md` con:

- descripción de los datos almacenados.
- convención de claves.
- formatos JSON.
- diferencia entre `localStorage` y `sessionStorage`.
- ejemplos de uso de `StorageUtil`.

## 6. Criterios de aceptación final

- [x] Definir la estrategia de almacenamiento.
- [x] Documentar qué datos van a `localStorage` y `sessionStorage`.
- [x] Justificar cada decisión de almacenamiento.
- [x] Diseñar la convención de claves.
- [x] Definir la estructura JSON para los datos clave.
- [x] Implementar funciones CRUD en `js/utils/storage.js`.
- [x] Manejar errores con `try-catch`.
- [x] Serializar/deserializar JSON automáticamente.
- [x] Detectar y manejar JSON inválido.
- [x] Manejar storage lleno (`QuotaExceededError`).
- [x] Crear documentación en `docs/06-storage/storage-doc.md`.
- [x] Mantener `spec-dev-storage.md` commiteado antes de `js/utils/storage.js`.

## 7. Uso recomendado de claves

Ejemplos con prefijo de aplicación:

```
app:usuario:preferencias
app:simulador:datos-sesion
app:cache:resultados
```

## 8. Sección al cerrar

### Prompt exacto utilizado en Copilot Agent

Chat actua como un Desarrollador JS Local y Session Storaje y generame el siguiente archivo /js/utils/storage.js. El archivo el storage,js debe cumplir con la siguiente estructura (adjunte estructura enviada por el profesor)

### Fragmento de código generado por Copilot

```js
const StorageUtil = {
  guardar(clave, valor, tipo = 'local') {
    return this._setItem(clave, valor, tipo);
  },

  obtener(clave, tipo = 'local') {
    return this._getItem(clave, tipo);
  },

  actualizar(clave, valor, tipo = 'local') {
    return this.guardar(clave, valor, tipo);
  },

  eliminar(clave, tipo = 'local') {
    return this._removeItem(clave, tipo);
  },

  listar(prefijo = '', tipo = 'local') {
    return this._listKeys(prefijo, tipo);
  },

  limpiar(tipo = 'local') {
    return this._clear(tipo);
  },

  _getStorage(tipo) {
    return tipo === 'session' ? sessionStorage : localStorage;
  },

  _serialize(valor) {
    return JSON.stringify(valor);
  },

  _deserialize(valor) {
    try {
      return JSON.parse(valor);
    } catch (error) {
      return valor;
    }
  },

  _setItem(clave, valor, tipo) {
    try {
      const storage = this._getStorage(tipo);
      const stringValue = this._serialize(valor);
      storage.setItem(clave, stringValue);
      return true;
    } catch (error) {
      return false;
    }
  },

  _getItem(clave, tipo) {
    const storage = this._getStorage(tipo);
    const rawValue = storage.getItem(clave);
    if (rawValue === null) return null;
    return this._deserialize(rawValue);
  },

  _removeItem(clave, tipo) {
    const storage = this._getStorage(tipo);
    if (storage.getItem(clave) === null) return false;
    storage.removeItem(clave);
    return true;
  },

  _listKeys(prefijo = '', tipo = 'local') {
    const storage = this._getStorage(tipo);
    const keys = [];
    for (let i = 0; i < storage.length; i += 1) {
      const key = storage.key(i);
      if (key && key.startsWith(prefijo)) {
        keys.push(key);
      }
    }
    return keys;
  },

  _clear(tipo = 'local') {
    const storage = this._getStorage(tipo);
    storage.clear();
    return true;
  }
};

export { StorageUtil };
```

### Ajustes manuales realizados y justificación
- Se adaptó la API para usar `'local'` / `'session'`.
- Se añadió la exportación ES6 solicitada.
- Se incluyeron helpers internos para mantener el módulo limpio.

### Decisiones finales sobre estrategia de storage
- `localStorage` para datos persistentes.
- `sessionStorage` para datos temporales de sesión.
- Claves con convención `dominio:entidad:descripcion`.

### Coordinación con Desarrollador JS POO
- El módulo está alineado con la estructura de datos de la aplicación y puede integrarse con los modelos de dominio.
- Se utiliza para persistir preferencias de filtros de cartelera en la UI, lo cual demuestra integración real con el flujo de la app.

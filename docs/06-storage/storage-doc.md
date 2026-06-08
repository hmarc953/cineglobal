# Documentación de Storage

## 1. Datos almacenados

Se guarda información de dos tipos principales:

- `localStorage`: datos persistentes entre sesiones del navegador.
- `sessionStorage`: datos temporales de la pestaña/sesión activa.

### Datos en `localStorage`

- `cine:usuario:preferencias`: configuración del usuario, idioma preferido, tipo de asiento preferido, notificaciones y ciudad.
- `cine:historial:compras`: lista de compras realizadas por el usuario.
- `cine:peliculas:favoritas`: películas marcadas como favoritas.
- `cine:usuario:datos`: información básica del usuario (nombre, email no sensible, ciudad).

### Datos en `sessionStorage`

- `cine:sesion:carrito`: entradas seleccionadas en el carrito actual.
- `cine:sesion:pelicula-activa`: película y función seleccionada durante la sesión.
- `cine:sesion:asientos-reservados`: asientos reservados temporalmente antes del pago.
- `cine:sesion:paso-actual`: paso actual del flujo de compra.

## 2. Estructura de claves

Se utiliza el formato:

```
[dómino]:[entidad]:[descripción]
```

Reglas de la convención:

- Separador `:`.
- Todas las claves en minúsculas.
- Palabras compuestas con guiones (`-`).
- Prefijo `cine:` para evitar colisiones con otros datos almacenados.
- `sesion` identifica datos temporales, mientras que `usuario`, `historial` y `peliculas` identifican datos persistentes.

Ejemplos de claves:

- `cine:usuario:preferencias`
- `cine:usuario:datos`
- `cine:historial:compras`
- `cine:peliculas:favoritas`
- `cine:sesion:carrito`
- `cine:sesion:pelicula-activa`
- `cine:sesion:asientos-reservados`
- `cine:sesion:paso-actual`

## 3. Formato de datos (schemas JSON)

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

## 4. Diferencia entre `localStorage` y `sessionStorage` 

### `localStorage`

- Persiste incluso si el usuario cierra y vuelve a abrir el navegador.
- Se usa para datos que deben permanecer entre sesiones.
- Ideal para preferencias, historial y favoritos.
- No debe contener datos sensibles ni información privada.

### `sessionStorage`

- Persiste solo durante la sesión de la pestaña actual.
- Se borra al cerrar la pestaña o el navegador.
- Se usa para datos temporales del flujo de compra.
- Ideal para estado de carrito, selección de película, asientos reservados y paso actual.

## 5. Ejemplos de uso

El módulo `js/utils/storage.js` exporta `StorageUtil` (ES6) y además lo asigna a `window.StorageUtil` para compatibilidad con scripts no modularizados. Expone las siguientes funciones:

- `guardar(clave, valor, tipo)`
- `obtener(clave, tipo)`
- `actualizar(clave, valor, tipo)`
- `eliminar(clave, tipo)`
- `listar(prefijo, tipo)`
- `limpiar(tipo)`

### Guardar preferencias en `localStorage`

```javascript
StorageUtil.guardar('cine:usuario:preferencias', {
  idiomaPreferido: 'subtitulada',
  tipoAsientoPreferido: 'preferencial',
  recibirNotificaciones: true,
  ultimaCiudad: 'Buenos Aires'
}, 'local');
```

### Recuperar preferencias

```javascript
const preferencias = StorageUtil.obtener('cine:usuario:preferencias', 'local');
console.log(preferencias);
```

### Guardar carrito de sesión

```javascript
StorageUtil.guardar('cine:sesion:carrito', {
  peliculaId: 'p001',
  funcionId: 'f003',
  asientos: ['F7', 'F8'],
  subtotal: 7000,
  timestamp: '2026-06-04T15:00:00'
}, 'session');
```

### Actualizar el paso actual del flujo de compra

```javascript
StorageUtil.actualizar('cine:sesion:paso-actual', 'pago', 'session');
```

### Listar todas las claves de sesión

```javascript
const clavesSesion = StorageUtil.listar('cine:sesion:', 'session');
console.log(clavesSesion);
```

### Eliminar un dato temporal

```javascript
StorageUtil.eliminar('cine:sesion:carrito', 'session');
```

### Limpiar todo el `localStorage`

```javascript
StorageUtil.limpiar('local');
```

## 6. Buenas prácticas

- Usar siempre claves con prefijos claros y coherentes.
- No guardar datos sensibles en `localStorage` ni en `sessionStorage`.
- Manejar posibles datos corruptos o JSON inválido mediante el módulo `StorageUtil`.
- Preferir `sessionStorage` para estado temporal de compra y `localStorage` para datos que el usuario debe conservar.

# Especificacion Desarrollador JS Local y Session Storage - Actividad Obligatoria 4


## BEFORE


---

### 1. Estrategia de Almacenamiento

#### localStorage — Datos persistentes entre sesiones

| Clave | Descripción | Justificación |
|-------|-------------|---------------|
| `cine:usuario:preferencias` | Preferencias del usuario (idioma, asiento preferido, notificaciones) | El usuario espera que sus preferencias se recuerden en futuras visitas. |
| `cine:historial:compras` | Historial de compras de entradas | Registro de compras y comprobantes que deben persistir más allá de la sesión actual. |
| `cine:peliculas:favoritas` | Películas marcadas como favoritas | Información de largo plazo que el usuario quiere conservar. |
| `cine:usuario:datos` | Datos básicos del usuario (nombre, email no sensible, ciudad) | Facilita la experiencia y evita reingresar datos al volver a la app. |

**Justificación general de localStorage:** Se usa para datos que deben estar disponibles entre sesiones y después de cerrar el navegador. Estos datos aportan continuidad de experiencia y no son sensibles.

---

#### sessionStorage — Datos temporales de la sesión actual

| Clave | Descripción | Justificación |
|-------|-------------|---------------|
| `cine:sesion:carrito` | Entradas seleccionadas en el carrito actual | Carrito inacabado que debe desaparecer si se cierra la pestaña. |
| `cine:sesion:pelicula-activa` | Película y función seleccionada actualmente | Contexto de navegación temporal de la sesión. |
| `cine:sesion:asientos-reservados` | Asientos seleccionados antes de pago | Reserva temporal que no debe persistir fuera de la sesión. |
| `cine:sesion:paso-actual` | Paso actual del flujo de compra | Estado de navegación del proceso de compra en la pestaña activa. |

**Justificación general de sessionStorage:** Se usa para datos que solo tienen sentido durante la sesión activa y deben perderse cuando la pestaña se cierra o recarga.

---

### 2. Convención de nombres de claves (Key Naming Convention)

Formato: `[dominio]:[entidad]:[descripción]`

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

Reglas:
- Separador: `:`
- Todo en minúsculas
- Palabras compuestas con `-`
- Prefijo `cine:` para evitar colisiones con otras aplicaciones
- `sesion` para almacenamiento temporal, `usuario` / `historial` / `peliculas` para almacenamiento persistente

---

### 3. Estructura de datos — JSON Schemas

#### Schema: `cine:historial:compras`
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

#### Schema: `cine:sesion:carrito`
```json
{
  "peliculaId": "p001",
  "funcionId": "f003",
  "asientos": ["F7", "F8"],
  "subtotal": 7000,
  "timestamp": "2026-06-04T15:00:00"
}
```

#### Schema: `cine:usuario:preferencias`
```json
{
  "idiomaPreferido": "subtitulada",
  "tipoAsientoPreferido": "preferencial",
  "recibirNotificaciones": true,
  "ultimaCiudad": "Buenos Aires"
}
```

#### Schema: `cine:sesion:asientos-reservados`
```json
{
  "funcionId": "f003",
  "asientos": ["F7", "F8"],
  "expira": "2026-06-04T15:15:00"
}
```

---

### 4. Criterios de aceptación — Checklist

- [ ] Definir la estrategia de almacenamiento antes de iniciar la implementación.
- [ ] Describir qué datos van a `localStorage` y qué datos van a `sessionStorage`.
- [ ] Justificar cada decisión de almacenamiento.
- [ ] Diseñar la convención de nombres de claves.
- [ ] Definir la estructura JSON para los datos clave.
- [ ] Implementar funciones CRUD completas en `js/utils/storage.js`:
- [ ] `guardar(clave, valor, tipo)`
- [ ] `obtener(clave, tipo)`
- [ ] `actualizar(clave, valor, tipo)`
- [ ] `eliminar(clave, tipo)`
- [ ] `listar(prefijo, tipo)`
- [ ] `limpiar(tipo)`
- [ ] Manejo de errores con `try-catch` en todas las operaciones.
- [ ] Serialización/deserialización automática de JSON.
- [ ] Detección y manejo de JSON inválido.
- [ ] Manejo de storage lleno (`QuotaExceededError`).
- [ ] Documentación completa en `docs/06-storage/storage-doc.md`.
- [ ] Mantener `spec-dev-storage.md` commiteado antes de `js/utils/storage.js`.

---

## SECCIÓN AT CLOSE
*(Completar al finalizar la implementación)*

### Prompt exacto utilizado en Copilot Agent
```
[Completar al cerrar la tarea]
```

### Fragmento de código generado por Copilot
```javascript
// [Completar al cerrar la tarea]
```

### Ajustes manuales realizados y justificación
- [Completar al cerrar la tarea]

### Decisiones finales sobre estrategia de storage
- [Completar al cerrar la tarea]

### Coordinación con Desarrollador JS POO
- [Completar al cerrar la tarea]
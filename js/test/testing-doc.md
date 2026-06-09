# Documentación de Testing - Suite Jasmine

## Índice
1. [Resumen de Ejecución](#resumen-de-ejecución)
2. [Suites Ejecutadas](#suites-ejecutadas)
3. [Resultados de Tests](#resultados-de-tests)
4. [Fallos Detectados](#fallos-detectados)
5. [Limitaciones](#limitaciones)

---

## Resumen de Ejecución

- **Archivo de tests:** `js/test/models.spec.js`
- **Runner:** `js/test/test-runner.html`
- **Biblioteca:** Jasmine 5.10.0
- **Total de specs:** 37
- **Tests pasados:** 34 ✅
- **Tests fallando:** 3 ❌
- **Porcentaje de éxito:** 91.9%

---

## Suites Ejecutadas

### Suite: Usuario
- `Usuario()` normaliza email, valida password y maneja actualización de datos.
- Serialización/deserialización JSON.

### Suite: Película
- `Pelicula()` crea y filtra películas.
- Maneja filtros parciales e insensibles a mayúsculas.
- Serialización/deserialización JSON.

### Suite: Función
- `Funcion()` valida disponibilidad y reservas.
- Rechaza reservas inválidas.
- Soporta serialización/deserialización.

### Suite: Compra
- `Compra()` valida datos, calcula total y confirma compras.
- Rechaza compras inválidas.
- Genera códigos de confirmación.

### Suite: Catálogo de Películas
- `CatalogoPeliculas` busca por filtros.
- Obtiene película por id e índice.
- Maneja casos de catálogo vacío.

### Suite: Gestor de Usuarios
- `GestorUsuarios` registra usuarios y evita duplicados.
- Autentica credenciales válidas.
- Rechaza datos inválidos.

### Suite: Sistema y Soporte
- `searchMovies()`, `selectMovieByIndex()` y `createSupportTicket()`.
- Uso de constantes globales `MOVIES` y `SUPPORT_TICKETS`.

---

## Resultados de Tests

### Resumen general
| Métrica | Valor |
|---------|-------|
| Total de specs | 37 |
| Especificaciones exitosas | 34 |
| Especificaciones fallidas | 3 |
| Estado general | Parcialmente estable |

### Observaciones
- Los modelos de dominio (`Usuario`, `Pelicula`, `Funcion`, `Compra`) pasan correctamente.
- `CatalogoPeliculas` y `GestorUsuarios` también pasan.
- Las fallas se concentran en funciones de sistema global y manejo de datos compartidos.

---

## Fallos Detectados

### Fallo 1: `searchMovies()`
- **Suite:** Funciones de Sistema Existentes
- **Error:** `TypeError: Cannot read properties of undefined (reading 'filter')`
- **Causa probable:** `searchMovies()` recibe `catalog` indefinido o `MOVIES` no está expuesto.
- **Test implicado:** Busca películas con `{ title: 'La La', minRating: 8 }`.

### Fallo 2: `createSupportTicket()`
- **Suite:** Consulta de Soporte y Manejo de Tickets
- **Error:** `TypeError: Cannot set properties of undefined (setting 'length')`
- **Causa probable:** `SUPPORT_TICKETS` no está definido en el contexto global.
- **Test implicado:** Intenta reiniciar `SUPPORT_TICKETS.length = 0` y luego crea ticket.

### Fallo 3: `selectMovieByIndex()`
- **Suite:** Funciones de Sistema Existentes
- **Error:** `TypeError: Cannot read properties of undefined (reading 'length')`
- **Causa probable:** `MOVIES` no está disponible o el parámetro `movies` es indefinido.
- **Test implicado:** Selección por índice con `selectMovieByIndex('1', MOVIES)`.

---

## Recomendaciones

1. Exponer `MOVIES` y `SUPPORT_TICKETS` como variables globales en `js/script.js`.
2. Confirmar que `js/test/test-runner.html` carga `js/script.js` antes de `models.spec.js`.
3. Ajustar `searchMovies()` para validar `catalog` antes de aplicar `.filter()`.
4. Agregar tests que verifiquen la existencia de las constantes globales usadas por la suite.

---

## Limitaciones

- Dependencia de Jasmine desde CDN.
- No se ejecutaron tests de UI o integración con DOM.
- No se evaluaron mocks `prompt()`/`alert()` en este documento.
- La cobertura de código es estimada y no medida automáticamente.

---

**Última actualización:** 2026-06-09
**Archivo:** `js/test/testing-doc.md`

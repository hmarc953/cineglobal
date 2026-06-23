# Especificación Tester QA/JS - Testing Avanzado (Segundo Parcial)

## Rol

**Tester QA/JS - Testing avanzado**

## Objetivo del rol

Garantizar la calidad del Segundo Parcial mediante pruebas funcionales avanzadas y auditorías de rendimiento/accesibilidad. El foco es:

- validar el consumo asíncrono de datos en `api.spec.js`;
- asegurar la integración y comportamiento de la librería externa en `library.spec.js`;
- medir el impacto en performance y accesibilidad con Lighthouse en tres momentos clave;
- reportar y asignar issues por los hallazgos.

## BEFORE - Plan antes de escribir cualquier test o correr Lighthouse

## Plan de testing funcional

### `js/test/api.spec.js`

API/fuente de datos a testear: TheMovieDB (ej. endpoint de películas populares `/movie/popular` o similar, según defina el Dev Async). Requiere API Key — los tests deben mockear `fetch` y no depender de la key real ni de la red.

Se cubrirán los siguientes casos:

- **Caso de éxito**: `fetchData()` devuelve los datos esperados cuando la API responde `ok: true`.
- **Error HTTP**: cuando `response.ok` es `false`, el servicio maneja el error y devuelve o lanza una excepción controlada.
- **Error de red**: la promesa de `fetch` se rechaza y el código debe capturar el fallo sin dejar la app en un estado inconsistente.
- **Procesamiento con map/filter/reduce**: los datos recibidos se filtran, transforman y agregan correctamente según la lógica de negocio.
- **Integración con DOM**: si el servicio renderiza los datos, el contenido esperado se inyecta en el contenedor correcto.

#### Estrategia

- mockear `window.fetch` con `spyOn` para controlar respuestas exitosas y fallidas.
- simular `response.ok`, `response.status`, `response.json()` y rechazo de promesa con `Promise.reject()`.
- usar datasets fijos para validar transformaciones con `map`, `filter` y `reduce`.
- validar el valor retornado y cualquier actualización de DOM asociada.

### `js/test/library.spec.js`


Librería a testear: Toastify (https://github.com/apvarun/toastify-js) —
notificaciones tipo "toast" en pantalla.

Se cubrirán los siguientes casos:

- **Inicialización**: la librería carga y el objeto/función global está disponible.
- **Configuración**: los parámetros de inicialización se aplican según la documentación.
- **Funcionalidad principal**: el caso de uso real de la librería funciona como se espera.
- **Manejo de errores**: la librería responde de forma controlada ante entradas inválidas o fallos internos.
- **Interacción con el sistema**: la librería se integra correctamente con la API o eventos DOM relevantes.

#### Estrategia

- mockear dependencias de la librería y controlar su entorno.
- verificar la transmisión correcta de opciones de configuración.
- forzar errores para validar el manejo interno.
- aislar la librería de variables globales y de la API real.

### Actualización de tests existentes

- revisar `js/test/script.spec.js` y `js/test/models.spec.js` para detectar cambios relevantes.
- mantener la cobertura existente al agregar las nuevas suites.

---

## Plan de auditorías Lighthouse

### Momentos de ejecución

- **Baseline**: sobre `develop` antes de integrar `apiService` y la librería externa.
- **Post-Fetch**: después de mergear `feature/dev-async-fetch-api` a `develop`.
- **Post-Librería**: después de mergear `feature/dev-libreria-externa-[nombre]` a `develop`.

### Umbrales mínimos definidos

- **Performance:** ≥ 80
- **Accessibility:** ≥ 90
- **Best Practices:** ≥ 85
- **SEO:** ≥ 80

### Documentación requerida

Cada informe debe incluir:

- fecha y entorno de ejecución;
- métricas de Performance, Accessibility, Best Practices y SEO;
- hallazgos clave y recomendaciones;
- comparación con el resultado previo.

### Archivos de documentación

COMPLETAR

---

## Herramientas a utilizar

### Copilot Agent

- se utilizará para generar el esqueleto inicial de `api.spec.js` y `library.spec.js`.
- justificación: acelera la creación de estructuras de prueba.
- restricción: la IA solo genera borradores; el Tester QA valida y ajusta manualmente cada test.

### Otras herramientas

- **Jasmine** para ejecutar las pruebas unitarias.
- **Lighthouse** para auditorías de performance y accesibilidad.
- **Chrome DevTools** para inspección del DOM, network y debugging.
- **Git/GitHub** para ramas, PRs e issues.

---

## Criterios de aceptación (checklist)

- [ ] `api.spec.js` completo con casos de éxito, error HTTP, error de red y procesamiento con map/filter/reduce.
- [ ] `library.spec.js` completo con inicialización, configuración, funcionalidad principal y manejo de errores.
- [ ] Los tests son deterministas y no dependen de API real.
- [ ] `test-case-11-lighthouse-baseline.md` documentado.
- [ ] `test-case-12-lighthouse-post-fetch.md` documentado.
- [ ] `test-case-13-lighthouse-post-library.md` documentado.
- [ ] Los tres informes Lighthouse incluyen comparaciones.
- [ ] Issues creadas y asignadas a los roles correspondientes.
- [ ] `js/test/testing-doc.md` y `docs/03-testing/testing-doc.md` actualizados con los nuevos test cases.
- [ ] `changelog.md` actualizado con PR e issues enlazadas.

---

---

## AT CLOSE - Completar como evidencia al cerrar la tarea

> Esta sección se completa una vez finalizado el trabajo, con datos reales.

- **Prompt(s) exacto(s) utilizado(s) en Copilot Agent:** `[pendiente]`
- **Archivos adjuntados como contexto en cada generación:** `[pendiente]`
- **Resumen de resultados de api.spec.js:** `[pendiente - cuántos tests pasaron/fallaron]`
- **Resumen de resultados de library.spec.js:** `[pendiente - cuántos tests pasaron/fallaron]`
- **Resultados Lighthouse - Baseline:** 97 / 96 / 100 / 91 (ver test-case-11)
- **Resultados Lighthouse - Post-Fetch:** `[pendiente]`
- **Resultados Lighthouse - Post-Librería:** `[pendiente]`
- **Cantidad de issues reportadas y su estado:** 2 issues abiertas por hallazgos
  baseline (#208 meta description, #209 contraste) — `[completar a medida
  que surjan más]`
- **Ajustes manuales realizados sobre los tests generados por IA:** `[pendiente]`

---

## Checklist de aceptación del rol Tester QA/JS

- [ ] Issue del rol creada y asociada a la PR (`#XX`).
- [ ] `api.spec.js` creado y completo.
- [ ] `library.spec.js` creado y completo.
- [ ] `test-case-11-lighthouse-baseline.md` documentado.
- [ ] `test-case-12-lighthouse-post-fetch.md` documentado.
- [ ] `test-case-13-lighthouse-post-library.md` documentado.
- [ ] Todas las issues de hallazgos creadas y asignadas correctamente.
- [ ] `testing-doc.md` (js/test y docs/03-testing) actualizados.
- [ ] `changelog.md` actualizado con PR e issues enlazadas.
- [ ] PR `feature/tester-qa-js-testing-suite -> develop` revisada y aprobada.
- [ ] Sección `AT CLOSE` completada con evidencia real.

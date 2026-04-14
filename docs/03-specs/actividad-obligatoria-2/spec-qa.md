# QA Testing Plan – Actividad Obligatoria N°2

## 1. Objetivo
El objetivo de este plan de testing QA es validar la funcionalidad, calidad, accesibilidad, performance y estructura general del proyecto web CineGlobal, asegurando que cumpla con los requisitos definidos para la Actividad Obligatoria N°2.

## 2. Alcance
El testing se realizará sobre una aplicación web estática desarrollada con HTML, CSS y JavaScript.

Las pruebas se ejecutarán en entorno local utilizando VS Code Live Preview, accediendo a la aplicación mediante:

- http://localhost:3000

## 3. Herramientas utilizadas
Las herramientas definidas para el proceso de QA son:

- Playwright MCP: testing automatizado, navegación guiada y validaciones funcionales.
- GitHub MCP: registro, seguimiento y gestión de issues detectados.
- VS Code Live Preview: ejecución local de la aplicación para pruebas manuales y visuales.

## 4. Estrategia de testing
La estrategia se organiza en dos momentos principales y cada uno de estos momentos se documentará mediante casos de prueba definidos en los archivos test-case correspondientes.

### Momento 1: Testing por feature branch
Se realizan pruebas sobre cada feature branch individual antes del merge.

Objetivo:

- Detectar errores de forma temprana.
- Evitar la propagación de defectos a ramas de integración.

### Momento 2: Testing sobre rama develop
Se realizan pruebas integrales sobre la rama develop una vez unificadas las funcionalidades.

Objetivo:

- Validar el comportamiento del sistema completo tras la integración.
- Confirmar estabilidad general antes de entregas o nuevas iteraciones.

## 5. Tipos de pruebas a realizar
Se aplicarán los siguientes tipos de pruebas:

- Compatibilidad en desktop: verificación de visualización y funcionamiento correcto en navegadores de escritorio.
- Diseño responsive (mobile): validación de adaptación de layouts y componentes en tamaños de pantalla móviles.
- Performance (tiempos de carga): evaluación del tiempo de carga inicial de la página y fluidez en la interacción básica.
- Accesibilidad (labels, atributo lang, navegación): revisión de prácticas básicas de accesibilidad para mejorar usabilidad e inclusión.
- Estructura HTML semántica y validación W3C: comprobación de uso semántico de etiquetas y conformidad con estándares de validación.

## 6. Criterios de aceptación
Para considerar una versión aprobada, deben cumplirse como mínimo las siguientes condiciones:

- La página carga correctamente sin errores visibles.
- No hay errores en consola durante la navegación principal.
- Todas las rutas (links e imágenes) funcionan correctamente.
- El HTML es válido según estándares.
- Se cumple accesibilidad básica (atributos y navegación esenciales).
- El diseño responsive funciona correctamente en mobile.

## 7. Gestión de bugs
Todos los errores detectados durante las pruebas deben registrarse como Issues en GitHub y vincularse al Pull Request correspondiente cuando aplique.

Cada issue debe incluir:

- Descripción del problema.
- Pasos para reproducir.
- Evidencia visual (capturas de pantalla).
- Nivel de severidad.

## 8. Evidencia
Se deben guardar capturas de pantalla organizadas por test case y por momento de ejecución (Momento 1 y Momento 2).

Las evidencias se almacenan en:

- docs/04-testing/

## 9. Estructura de documentación
La documentación de testing se organiza de la siguiente manera:

- testing-doc.md: documento central del proceso de QA.
- test-case-1.md a test-case-5.md: casos de prueba individuales.
- Carpetas de screenshots organizadas por momento de testing.

## 10. Notas finales
Este documento guía todo el proceso de QA de la Actividad Obligatoria N°2 en CineGlobal.

El testing se realiza con apoyo de herramientas MCP para asegurar trazabilidad, consistencia y calidad en la validación del proyecto.

---

## 11. Resumen de resultados por momento

### Momento 1 — Feature Branch (`feature/dev-frontend-css-add-styles` + `feature/responsive-design-add-responsive-styles`)

Fecha de ejecución: 13/04/2026

| Test Case | Título | Resultado | Issues creados |
|-----------|--------|-----------|----------------|
| TC1 | Compatibilidad visual desktop | ⚠️ FAIL CON OBSERVACIONES | #34, #35 |
| TC2 | Diseño responsive mobile | ✅ PASS | — |
| TC3 | Performance | ✅ PASS | — |
| TC4 | Accesibilidad (axe-core) | ⚠️ FAIL CON OBSERVACIONES | #36 |
| TC5 | Estructura semántica + W3C | ⚠️ FAIL CON OBSERVACIONES | #37, #38, #39, #40, #41, #42, #43 |

**Total issues Momento 1:** 10 issues abiertos

Principales hallazgos:
- Layout de cards en desktop en columna en lugar de fila (#34)
- Footer sin links funcionales verificables (#35)
- Contenido fuera de landmarks semánticos (#36)
- `<article>` y `<section>` sin headings (#37, #38)
- Atributo `border` obsoleto en `<table>` (#39)
- Tabla sin `<caption>` (#40)
- Archivos CSS faltantes en distintas ramas (#41, #42, #43)

---

### Momento 2 — Rama `develop`

Fecha de ejecución: 13/04/2026

| Test Case | Título | Resultado | Issues creados |
|-----------|--------|-----------|----------------|
| TC1 | Compatibilidad visual desktop | ✅ PASS | — |
| TC2 | Diseño responsive mobile | ⚠️ FAIL CON OBSERVACIONES | #46 |
| TC3 | Performance | ✅ PASS | — |
| TC4 | Accesibilidad (axe-core) | ❌ FAIL | #48, #49, #50 |
| TC5 | Estructura semántica + W3C | ⚠️ FAIL CON OBSERVACIONES | #48, #51 |

**Total issues Momento 2:** 5 issues abiertos

Principales hallazgos:
- Tabla `.tabla-cartelera` con overflow horizontal en móviles — iPhone 14 Pro y Samsung S23 (#46)
- Los 3 `<select>` del filtro sin `<label>` ni `aria-label` — violación axe-core `select-name` (critical) (#48)
- Contraste insuficiente en selects, botón de filtro y botones de compra — violación `color-contrast` (serious) (#49)
- Formulario de filtros fuera de landmark semántico — violación `region` (moderate) (#50)
- `<section class="filters">` sin heading — warning W3C HTML línea 20 (#51)

---

### Comparativa entre momentos

| Criterio | Momento 1 | Momento 2 |
|----------|-----------|-----------|
| Compatibilidad desktop | ⚠️ FAIL CON OBS. | ✅ PASS |
| Responsive mobile | ✅ PASS | ⚠️ FAIL CON OBS. |
| Performance | ✅ PASS | ✅ PASS |
| Accesibilidad | ⚠️ FAIL CON OBS. | ❌ FAIL |
| Semántica + W3C | ⚠️ FAIL CON OBS. | ⚠️ FAIL CON OBS. |
| Total issues | 10 | 5 |

---

## 12. Prompts utilizados

### TC1 — Compatibilidad visual desktop

```
Usando Playwright MCP, necesito testear la compatibilidad visual de mi página
en distintos viewports desktop. La URL es http://localhost:3000

Ejecutá estos pasos en orden:
1. Navegá a la URL y esperá que la página cargue completamente
2. Configurá el viewport en 1920x1080 y tomá una captura de pantalla completa
3. Verificá que en este viewport:
   - El header con la navegación sea visible y no se corte
   - Las secciones principales estén en fila horizontal donde corresponda
   - Las tablas sean legibles sin scroll horizontal
   - El footer muestre el texto y los links correctamente
4. Configurá el viewport en 1440x900 y tomá captura completa
5. Configurá el viewport en 1280x800 (simulando Firefox/Safari) y tomá captura completa
6. Configurá el viewport en 1280x800 (simulando Edge) y tomá captura completa
7. En cada viewport reportá si encontrás algún elemento que se corte,
   desborde o no se vea correctamente
8. Generá un resumen con el estado de cada viewport: OK o con problemas

Guardá las capturas en docs/04-testing/capturas/tc-1/momento-x/

Modifica y completa con el resultado el archivo test-case-1.md
```

### TC2 — Diseño responsive mobile

```
Usando Playwright MCP, necesito testear el diseño responsive de
http://localhost:3000 en distintos dispositivos móviles.

Ejecutá estos pasos en orden:

1. Configurá el viewport en 390x844 (iPhone 14 Pro)
   - Navegá a la página y tomá captura completa
   - Verificá si la navegación se adapta sin desbordarse
   - Verificá si los elementos se apilan verticalmente donde corresponde
   - Verificá si alguna tabla genera scroll horizontal
   - Verificá si el formulario ocupa el ancho completo
   - Verificá si hay scroll horizontal en la página

2. Configurá el viewport en 412x915 (Samsung Galaxy S23) y repetí los mismos pasos

3. Configurá el viewport en 820x1180 (iPad Air) y repetí los mismos pasos

4. Para cada dispositivo reportá qué elementos se ven correctamente
   y cuáles tienen problemas visuales

5. Generá un resumen indicando qué dispositivo presenta más problemas

Guardá las capturas en docs/04-testing/capturas/tc-2/momento-x/

Modifica y completa con el resultado el archivo test-case-2.md
```

### TC3 — Performance

```
Usando Playwright MCP, necesito analizar la performance de http://localhost:3000

Ejecutá estos pasos en orden:

1. Navegá a la URL esperando Network idle
2. Usá evaluate() para ejecutar:
   window.performance.getEntriesByType("navigation")[0]
   y extraé: domContentLoadedEventEnd, loadEventEnd, domInteractive
3. Usá evaluate() para obtener window.performance.getEntriesByType("resource")
   y listá cada recurso con su name, transferSize y duration
4. Tomá una captura de pantalla del estado final cargado
5. Reportá:
   - Tiempo hasta DOMContentLoaded (ms)
   - Tiempo hasta Load completo (ms)
   - Tiempo hasta DOM Interactive (ms)
   - Listado de recursos: nombre, tipo, tamaño (KB) y tiempo de descarga (ms)
   - Total de recursos y tamaño total acumulado
   - ¿Hay recursos que superen 500KB?
   - ¿Hay recursos que tarden más de 500ms en descargar?
6. Generá un resumen con estado OK o con problemas por cada métrica

Guardá las capturas en docs/04-testing/capturas/tc-3/momento-x/

Modifica y completa con el resultado el archivo test-case-3.md
```

### TC4 — Accesibilidad (axe-core)

```
Usando Playwright MCP, necesito hacer un análisis de accesibilidad de
http://localhost:3000 usando axe-core.

Ejecutá estos pasos en orden:

1. Navegá a la URL y esperá que cargue completamente
2. Inyectá axe-core desde CDN:
   await page.addScriptTag({
     url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js'
   })
3. Ejecutá el análisis completo:
   const results = await page.evaluate(() => axe.run())
4. Tomá una captura de pantalla de la página
5. Reportá TODAS las violaciones encontradas con:
   - ID de la regla violada
   - Descripción del problema
   - Impacto (critical / serious / moderate / minor)
   - Selector del elemento HTML afectado
   - Sugerencia de corrección
6. Reportá también los incomplete (necesitan revisión manual)
7. Generá un resumen: total de violaciones agrupadas por nivel de impacto

Guardá las capturas en docs/04-testing/capturas/tc-4/momento-x/

Modifica y completa con el resultado el archivo test-case-4.md
```

### TC5 — Estructura semántica + validación W3C

```
Usando Playwright MCP y herramientas disponibles, necesito analizar la
estructura semántica y validar el código de http://localhost:3000

PARTE 1 — Estructura HTML semántica

1. Navegá a http://localhost:3000 con Playwright MCP y tomá un snapshot
   de accesibilidad completo
2. Del snapshot extraé y listá:
   - Todos los headings (h1-h6) con nivel y texto
   - Todos los landmarks (header, nav, main, footer, section, article)
   - Cualquier <div> donde debería ir un elemento semántico
3. Verificá:
   - ¿Hay un solo h1?
   - ¿La jerarquía de headings no tiene saltos (h1→h2→h3)?
   - ¿Todos los campos del formulario tienen <label> asociado?
   - ¿Las tablas tienen <caption>?
4. Tomá captura de pantalla de la página

PARTE 2 — Validación HTML con W3C

Usá este comando para validar el archivo index.html:

cat index.html | curl -s -F 'uploaded_file=@-' -F 'output=json' \
  https://validator.w3.org/check | jq '.'

Reportá:
- Total de errores y warnings
- Por cada error: número de línea, descripción y fragmento de código afectado

PARTE 3 — Validación CSS con W3C

Para cada archivo CSS ejecutá:

cat css/styles.css | curl -s \
  -F 'file=@-;type=text/css' \
  -F 'output=json' \
  'https://jigsaw.w3.org/css-validator/validator' | jq '.'

Repetí para css/components.css y css/responsive.css

Reportá por cada archivo:
- Total de errores y warnings
- Por cada error: número de línea, propiedad afectada y descripción

RESUMEN FINAL

Generá una tabla consolidada con:
- Estado de estructura semántica
- Total errores HTML
- Total errores CSS por archivo
- Lista de issues a crear

Guardá las capturas en docs/04-testing/capturas/tc-5/momento-x/

Modifica y completa con el resultado el archivo test-case-5.md
```

### Issues en GitHub

```
Crea un issue bug en github por cada error que encontraste. Da un titulo y descripcion descriptiva
```
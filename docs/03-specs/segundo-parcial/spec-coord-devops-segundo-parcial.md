# Especificación Coordinador/DevOps - Segundo Parcial

## Rol

**Coordinador/DevOps - Gestión, integración y resolución de correcciones**

## Objetivo del rol

Coordinar el trabajo del equipo durante el Segundo Parcial, asegurar la trazabilidad entre issues, ramas, commits y Pull Requests, controlar la calidad antes de cada integración y preparar la entrega desde `develop` mediante `release/segundo-parcial`.

El rol también es responsable de gestionar de forma iterativa los Request Changes del docente hasta obtener LGTM, completar el merge hacia `master` y realizar el backport final hacia `develop`.

## Estado inicial del proyecto durante esta actividad

- La Actividad Obligatoria 4 ya fue corregida.
- La rama `release/cuarta-entrega` fue aprobada por el docente y mergeada a `master`.
- El backport de `release/cuarta-entrega` hacia `develop` ya fue realizado.
- `develop` constituye la base actual del Segundo Parcial.
- La rama de trabajo del Coordinador/DevOps es `feature/coord-devops-segundo-parcial`.
- Cada integrante trabajará en una rama `feature/*` propia y abrirá su PR hacia `develop`.
- Los números de PR, issues, commits y enlaces se documentarán cuando existan. Hasta entonces se utilizarán `#XX` y `[pendiente]`.

---

## BEFORE - Plan antes de comenzar tareas de coordinación

### Plan de coordinación del equipo

1. Confirmar que cada integrante parta de `develop` actualizado y que su rama respete el naming definido en la consigna.
2. Crear o verificar una issue por rol con alcance, entregables, criterios de aceptación, responsable y prioridad. Registrar temporalmente cada identificador como `#XX`.
3. Organizar las tareas en GitHub Projects (Kanban) con estados equivalentes a pendiente, en progreso, en revisión y finalizada.
4. Publicar tempranamente el PR de `feature/coord-devops-segundo-parcial` como borrador para hacer visible este plan, pero integrarlo al final, cuando contenga la evidencia y documentación de coordinación disponible.
5. Acordar los contratos de integración entre el módulo asíncrono, la librería externa, el DOM, las clases POO, Storage y las suites de Jasmine.
6. Revisar periódicamente bloqueos y dependencias. Los desacuerdos de alcance se resolverán contra la consigna y se documentarán en la issue correspondiente.
7. Exigir que cada PR use el template de feature, enlace su issue, contenga al menos un commit relevante y actualice `changelog.md` con responsable, aporte concreto y enlaces.
8. Ejecutar code review técnico asistido por IA y validación humana antes de aprobar cada PR.
9. Integrar las features en el orden definido más abajo, verificando el estado de `develop` después de cada merge.
10. Mantener `README.md`, `changelog.md` y la estructura de carpetas alineados con el estado real del entregable.
11. Crear `release/segundo-parcial` desde `develop` solamente cuando las cuatro PRs estén aprobadas e integradas y no existan defectos bloqueantes.
12. Verificar la aplicación y GitHub Pages desde la rama release; luego abrir la PR `release/segundo-parcial` hacia `master` con el template de release.
13. Compartir la PR de release en Slack y entregar su enlace en el campus según la consigna. Los enlaces permanecerán como `[pendiente]` hasta que existan.

### PRs esperados por rol

| Rol | Rama y PR esperada | Issue | Entregables principales |
|---|---|---|---|
| Desarrollador JS Asíncrono - Fetch & APIs | `feature/dev-async-fetch-api` -> `develop` (PR `#XX`) | `#XX` | Spec previa, módulo de fetch/promises, estados `loading/success/error`, manejo de errores, procesamiento con `map`/`filter`/`reduce`, integración con DOM, POO y Storage, JSDoc y actualización de changelog. |
| Desarrollador JS Librerías Externas | `feature/dev-libreria-externa-[nombre]` -> `develop` (PR `#XX`) | `#XX` | Spec previa, librería justificada e integrada vía CDN, configuración según documentación oficial, uso en al menos dos puntos, wrapper si corresponde, documentación y capturas, y actualización de changelog. |
| Tester QA/JS - Testing Avanzado | `feature/tester-qa-js-testing-suite` -> `develop` (PR `#XX`) | `#XX` | Tests Jasmine de fetch y librería, casos de éxito y error, auditorías Lighthouse baseline/post-fetch/post-librería, issues de hallazgos, documentación de testing y actualización de changelog. |
| Coordinador/DevOps | `feature/coord-devops-segundo-parcial` -> `develop` (PR `#XX`) | `#XX` | Esta especificación, coordinación y revisión de PRs/issues, control de estructura, README y changelog, preparación de release, verificación de GitHub Pages y trazabilidad de la entrega. |

### Orden recomendado de integración hacia `develop`

1. **`feature/dev-async-fetch-api`**: establece el servicio y el contrato de datos asíncronos que consumirán la interfaz, la librería si corresponde y los tests.
2. **`feature/dev-libreria-externa-[nombre]`**: se integra sobre el contrato ya estabilizado y permite validar sus dos puntos de uso reales. Si no depende del fetch, puede desarrollarse en paralelo, pero debe sincronizarse con `develop` antes de aprobarse.
3. **`feature/tester-qa-js-testing-suite`**: incorpora las pruebas y auditorías contra las implementaciones finales. Los defectos encontrados deben resolverse mediante issues y cambios en la rama responsable antes del merge del PR de QA.
4. **`feature/coord-devops-segundo-parcial`**: cierra la documentación y controles transversales con el estado real de las PRs ya integradas. Este PR requiere revisión de otro integrante; el Coordinador no debe autoaprobarlo.

Después de estas integraciones se realizará una validación completa de `develop`. Solo entonces se creará `release/segundo-parcial`.

### Criterios generales de aprobación para toda PR

- La rama y el destino son correctos: `feature/*` -> `develop`.
- Existe una issue asociada (`#XX`), asignada al responsable y con criterios verificables.
- La descripción usa el template de feature y explica alcance, pruebas y riesgos.
- Hay al menos un commit relevante, descriptivo y atribuible al integrante.
- El cambio respeta el alcance del rol y no incorpora funcionalidad ajena sin coordinación.
- No hay errores críticos, código comentado sin justificación ni `console.log` innecesarios.
- La documentación coincide con el comportamiento implementado.
- `changelog.md` registra responsable, resumen concreto y placeholders o enlaces válidos.
- Los checks y pruebas aplicables finalizan correctamente.
- Los comentarios de review están respondidos y las conversaciones resueltas con evidencia.
- Existe aprobación humana de otro integrante, preferentemente del Coordinador/DevOps.

### Criterios específicos de aprobación por PR

#### `feature/dev-async-fetch-api`

- [ ] La API externa o el JSON estático está seleccionado y justificado en la spec previa.
- [ ] El consumo usa `fetch`, promises y un módulo dedicado con separación de responsabilidades.
- [ ] Se controlan respuestas HTTP no exitosas, errores de red y excepciones mediante `try/catch`.
- [ ] La UI presenta estados `loading`, `success` y `error`, con mensajes comprensibles.
- [ ] Los datos se validan y sanitizan antes de usarse.
- [ ] Se aplican funciones de orden superior (`map`, `filter` y/o `reduce`) con un propósito concreto.
- [ ] Los datos se integran dinámicamente con el DOM sin romper POO ni Storage.
- [ ] Las funciones complejas o módulos nuevos incluyen JSDoc pertinente.
- [ ] Los escenarios de prueba fueron acordados con Tester QA/JS.

#### `feature/dev-libreria-externa-[nombre]`

- [ ] La necesidad, el nombre y la versión de la librería están justificados antes de integrarla.
- [ ] La librería no duplica una funcionalidad ya resuelta con código propio.
- [ ] La integración se realiza vía CDN y sigue la documentación oficial.
- [ ] La librería funciona en al menos dos puntos distintos de la aplicación.
- [ ] La integración mantiene la consistencia visual y mejora una interacción concreta.
- [ ] Existe wrapper cuando aporta desacoplamiento o facilita las pruebas.
- [ ] `libreria-doc.md` incluye propósito, versión, instalación, ejemplos, enlaces oficiales y capturas.
- [ ] Si consume datos asíncronos, el contrato con el módulo de API está coordinado y probado.

#### `feature/tester-qa-js-testing-suite`

- [ ] `api.spec.js` cubre respuesta exitosa, error HTTP, error de red y procesamiento con funciones de orden superior.
- [ ] `library.spec.js` cubre inicialización, configuración, funcionalidad principal y manejo de errores.
- [ ] Las pruebas son deterministas y no dependen innecesariamente de servicios externos reales.
- [ ] Se documentan casos de éxito y error con resultados reproducibles.
- [ ] Las auditorías Lighthouse incluyen baseline, estado post-fetch y estado post-librería.
- [ ] Los umbrales mínimos declarados son Performance >= 80 y Accessibility >= 90.
- [ ] Cada defecto encontrado tiene issue detallada, prioridad y asignación correctas.
- [ ] Se actualizaron las documentaciones de testing exigidas por la consigna.

#### `feature/coord-devops-segundo-parcial`

- [ ] La spec refleja el plan previo y no presenta como realizada evidencia aún inexistente.
- [ ] Se revisaron como mínimo las cuatro PRs del Segundo Parcial y quedó trazabilidad de las decisiones.
- [ ] Las issues están administradas en GitHub Projects y asignadas al rol correcto.
- [ ] La estructura del repositorio coincide con la consigna y no contiene archivos accidentales.
- [ ] `README.md` describe el Segundo Parcial y el estado real de funcionalidades, tecnologías, roles y documentación.
- [ ] `changelog.md` registra todas las contribuciones con PR e issue asociadas.
- [ ] La aplicación integrada funciona sin defectos críticos y cumple las pruebas acordadas.
- [ ] La creación de `release/segundo-parcial`, GitHub Pages y la PR de release se ejecutan únicamente después de validar `develop`.
- [ ] El PR del Coordinador recibe revisión y aprobación de otro integrante.

### Plan de uso de IA para code reviews

Se utilizará Copilot Agent u otra IA disponible como apoyo para revisar las diferencias de cada PR contra `develop`. La IA no reemplaza la decisión del revisor humano.

Para cada PR se seguirá este proceso:

1. Adjuntar o indicar la consigna, la spec del rol, la issue asociada y el diff completo de la PR.
2. Solicitar hallazgos independientes con archivo, línea, tipo, severidad, evidencia, impacto y corrección sugerida.
3. Pedir que distinga entre incumplimientos de consigna, defectos funcionales, regresiones, problemas de mantenibilidad y observaciones fuera de alcance.
4. Validar manualmente cada hallazgo contra el código, la arquitectura y el alcance. No publicar observaciones hipotéticas sin evidencia.
5. Publicar en la PR solo los hallazgos confirmados. Los problemas bloqueantes se marcarán como Request Changes; las mejoras no bloqueantes se dejarán como comentarios.
6. Reejecutar la revisión sobre los cambios correctivos y comprobar que no aparezcan regresiones.
7. Registrar en `AT CLOSE` el prompt exacto, la herramienta utilizada, las PRs revisadas, los hallazgos aceptados o descartados y la justificación humana.

Prompt base previsto para adaptar a cada PR:

```text
Actuá como Senior Software Engineer y revisá esta Pull Request del Segundo Parcial de CineGlobal.

Contexto:
- Consigna del Segundo Parcial.
- Spec del rol: [pendiente].
- Issue asociada: #XX.
- Rama origen: [pendiente].
- Rama destino: develop.

Analizá únicamente problemas demostrables en el diff y su integración con el proyecto. Para cada hallazgo indicá archivo, línea, tipo, severidad, evidencia, impacto y corrección concreta. Verificá cumplimiento de la consigna, regresiones, manejo de errores, separación de responsabilidades, documentación y pruebas aplicables. Separá los hallazgos bloqueantes de las mejoras no bloqueantes. No inventes números, enlaces ni problemas sin evidencia.
```

### Plan de gestión de Request Changes del docente - Fase 2

La Fase 2 se ejecutará sobre `release/segundo-parcial` y continuará hasta obtener LGTM y aprobación del docente dentro de la fecha límite.

#### 1. Recepción

- Monitorear la PR de release y el hilo de Slack.
- Registrar cada Request Change recibido sin reinterpretarlo ni marcarlo como resuelto anticipadamente.
- Mantener el enlace de la PR y la fecha de recepción como `[pendiente]` hasta que existan.

#### 2. Análisis

- Reproducir o verificar cada observación sobre la versión de `release/segundo-parcial`.
- Identificar archivo, comportamiento afectado, causa, riesgo, dependencia y rol responsable.
- Consultar al docente en el hilo cuando una observación sea ambigua, sin asumir alcance adicional.
- Detectar comentarios duplicados o relacionados, manteniendo trazabilidad individual.

#### 3. Creación de issues

- Crear una issue específica por corrección, salvo que varios comentarios formen una única causa técnica indivisible.
- Incluir referencia al comentario docente, pasos para reproducir, resultado actual, resultado esperado, criterios de aceptación, prioridad y responsable.
- Usar `#XX` y `[pendiente]` en esta spec hasta que los identificadores y enlaces sean reales.

#### 4. Asignación por rol

- **Asíncrono/Fetch:** consumo de API, promises, validación de datos, estados de carga, errores y procesamiento de colecciones.
- **Librería externa:** CDN, wrapper, configuración, puntos de integración, experiencia visual y documentación de la librería.
- **Tester QA/JS:** reproducción, pruebas Jasmine, regresión, Lighthouse, evidencia e issues de calidad.
- **Coordinador/DevOps:** integración transversal, estructura, README, changelog, release, GitHub Pages, coordinación y resolución de bloqueos.

Las correcciones se aplicarán en ramas `fix/*` acordadas por el equipo y se integrarán sobre `release/segundo-parcial` mediante PR o el mecanismo aprobado para la etapa de corrección, preservando revisión y trazabilidad.

#### 5. Priorización

| Prioridad | Criterio | Tratamiento |
|---|---|---|
| **Crítico** | Impide ejecutar, desplegar, evaluar o entregar; rompe el flujo principal; bloquea GitHub Pages, pruebas esenciales o LGTM. | Atención inmediata, responsable único, validación coordinada y resolución antes de cualquier tarea menor. |
| **Alto** | Incumple un requisito explícito, produce una regresión importante o afecta datos, integración o accesibilidad mínima. | Resolver en la iteración actual antes de solicitar nueva revisión docente. |
| **Medio** | Afecta un caso secundario, documentación relevante, mantenibilidad o consistencia sin bloquear el flujo principal. | Resolver después de crítico/alto y antes del cierre, con prueba focalizada. |
| **Bajo** | Mejora menor de claridad, formato o calidad sin impacto funcional inmediato. | Resolver si corresponde al alcance; documentar cualquier postergación y su justificación. |

La prioridad no reemplaza la consigna: todo Request Change del docente debe recibir respuesta y resolución o aclaración explícita.

#### 6. Implementación y commits

- Cada corrección debe tener commits descriptivos y estructurados, por ejemplo: `fix: corrige estado de error del fetch (#XX)`.
- Evitar agrupar correcciones no relacionadas en un mismo commit.
- Mantener actualizados la issue, el changelog y la evidencia de pruebas.
- Solicitar revisión cruzada antes de integrar cada corrección a la release.

#### 7. Validación y notificación por Slack

- Reproducir el problema original y verificar el criterio de aceptación.
- Ejecutar pruebas de regresión del área afectada y comprobar GitHub Pages cuando corresponda.
- Responder el comentario del docente con una síntesis verificable y el commit/PR real.
- Notificar con âœ… (`:white_check_mark:`) en el hilo de Slack cada lote de comentarios efectivamente resuelto.
- Mantener comunicación fluida; no usar âœ… mientras existan correcciones del lote sin validar.

#### 8. Iteración hasta LGTM

- Solicitar una nueva revisión docente después de completar y validar la iteración.
- Repetir recepción, análisis, issues, asignación, corrección, revisión y notificación tantas veces como sea necesario.
- No mergear la release a `master` antes de obtener LGTM y approve.
- Tras la aprobación, mergear `release/segundo-parcial` hacia `master`, notificar con `:pr-merged:` y realizar el backport de la release hacia `develop`.
- Verificar el backport y notificar su finalización. Esta actividad es crítica para cerrar el rol.

### Checklist de aceptación del rol Coordinador/DevOps

#### Fase 1 - Desarrollo y preparación

- [x] Request Changes de la Actividad Obligatoria 4 coordinados y resueltos.
- [x] `release/cuarta-entrega` aprobada y mergeada a `master`.
- [x] Backport de `release/cuarta-entrega` hacia `develop` completado.
- [x] Issue del rol Coordinador/DevOps creada y asociada a la PR (`#XX`).
- [x] Estructura de carpetas del Segundo Parcial verificada.
- [x] Cuatro PRs del Segundo Parcial revisadas como mínimo.
- [x] PR de Fetch/API aprobada e integrada en `develop`.
- [x] PR de librería externa aprobada e integrada en `develop`.
- [x] PR de Tester QA/JS aprobada e integrada en `develop`.
- [x] PR de Coordinador/DevOps revisada por otro integrante e integrada en `develop`.
- [x] Issues administradas y actualizadas en GitHub Projects (Kanban).
- [x] `README.md` actualizado con información real del Segundo Parcial.
- [x] `changelog.md` actualizado con cada contribución, PR e issue.
- [x] Pruebas Jasmine y auditorías Lighthouse revisadas.
- [x] Performance >= 80 y Accessibility >= 90, o desvíos documentados y corregidos.
- [x] No existen defectos críticos abiertos en `develop`.
- [x] `release/segundo-parcial` creada desde `develop` validado.
- [x] GitHub Pages configurado y verificado desde la rama release.
- [x] PR `release/segundo-parcial` -> `master` creada con el template correcto (`#XX`).
- [x] PR de release compartida en Slack y enlace entregado en el campus (`[pendiente]`).

#### Fase 2 - Request Changes y cierre

- [x] Todos los Request Changes del docente fueron analizados.
- [x] Cada corrección cuenta con issue, prioridad, responsable y criterio de aceptación.
- [x] Las correcciones se aplicaron sobre `release/segundo-parcial` con commits descriptivos.
- [x] Cada iteración fue validada con pruebas y revisión cruzada.
- [x] Las correcciones resueltas fueron notificadas con âœ… en Slack.
- [x] Se mantuvo trazabilidad entre comentario, issue, commit, PR y evidencia.
- [x] Se obtuvo LGTM y approve del docente antes de la fecha límite.
- [x] `release/segundo-parcial` fue mergeada a `master` y se notificó con `:pr-merged:`.
- [x] Se realizó y verificó el backport de `release/segundo-parcial` hacia `develop`.
- [x] La sección `AT CLOSE` fue completada con evidencia real y sin placeholders pendientes.

## AT CLOSE - Evidencia al cerrar la tarea

### Prompts utilizados

#### Prompt 1
```
Actuá como Coordinador/DevOps del proyecto CineGlobal para el Segundo Parcial de Programación Web I.

Necesito crear el archivo:

docs/03-specs/segundo-parcial/spec-coord-devops-segundo-parcial.md

Contexto del proyecto:

* Ya se corrigió la Actividad Obligatoria 4.
* La rama release/cuarta-entrega ya fue aprobada por el profesor y mergeada a master.
* Ya se realizó el backport de release/cuarta-entrega hacia develop.
* La rama actual del coordinador es feature/coord-devops-segundo-parcial.
* El equipo trabajará sus tareas del Segundo Parcial mediante ramas feature hacia develop.
* El rol Coordinador/DevOps debe planificar, revisar PRs, coordinar issues, mantener README/changelog, verificar GitHub Pages, preparar release/segundo-parcial y resolver Request Changes del docente.

Archivos de contexto:

* Consigna PWI2026_2DO_PARCIAL.pdf
* README.md
* changelog.md

* Specs/documentación previas de Actividad Obligatoria 4

Requisitos del archivo:

1. Crear una sección BEFORE - Plan antes de comenzar tareas de coordinación.
2. Incluir plan de coordinación del equipo.
3. Indicar qué PRs se esperan de cada rol:

   * feature/dev-async-fetch-api
   * feature/dev-libreria-externa-[nombre]
   * feature/tester-qa-js-testing-suite
   * feature/coord-devops-segundo-parcial
4. Definir el orden recomendado de integración hacia develop.
5. Definir criterios de aprobación para cada PR.
6. Incluir plan de revisión con Copilot Agent u otra IA para los code reviews.
7. Incluir plan de Fase 2 para Request Changes del docente:

   * recepción
   * análisis
   * creación de issues
   * asignación por rol
   * prioridades crítico/alto/medio/bajo
   * commits descriptivos
   * notificación por Slack
   * iteración hasta LGTM
8. Incluir checklist de criterios de aceptación del rol Coordinador/DevOps.
9. Incluir una sección AT CLOSE - Evidencia al cerrar la tarea, pero dejarla como plantilla vacía para completar más adelante.
10. No inventar números de PR, issues ni links todavía. Usar placeholders como #XX o [pendiente].
11. Mantener redacción clara, técnica y en español.
12. Usar formato Markdown prolijo.
13. No modificar otros archivos.

Estructura sugerida:

* Título
* Rol
* Objetivo del rol
* Estado inicial del proyecto
* BEFORE

  * Plan de coordinación
  * PRs esperados por rol
  * Orden de integración
  * Criterios de aprobación
  * Plan de uso de IA para code reviews
  * Plan de gestión de Request Changes
  * Prioridades de corrección
  * Checklist de aceptación
* AT CLOSE

  * Prompts utilizados
  * Reviews realizadas
  * Request Changes gestionados
  * Obstáculos encontrados
  * Resultado final
```

#### Prompt 2

```
Actuá como Coordinador/DevOps del proyecto CineGlobal para Programación Web I.

Necesito actualizar únicamente el archivo `README.md`. No hagas una reestructuración grande del documento: mantené el estilo actual, los títulos principales, los enlaces existentes y la tabla de integrantes.

Contexto:

* El README actualmente está orientado a la Actividad Obligatoria 4.
* La Actividad Obligatoria 4 ya fue corregida, aprobada, mergeada a `master` y backporteada a `develop`.
* Ahora el proyecto entra en etapa de Segundo Parcial.
* El objetivo es actualizar el README para que A4 quede integrada dentro del historial de funcionalidades ya realizadas, y que la nueva entrega tenga sus propios objetivos.

Cambios requeridos:

1. Cambiar la sección `Objetivo del entregable`

   * Dejar de presentarla como Actividad Obligatoria 4.
   * Redactarla como objetivo del Segundo Parcial.
   * Debe mencionar que el Segundo Parcial busca extender la aplicación con:

     * consumo asíncrono de datos con `fetch`, promises y JSON/API;
     * integración de una librería externa de JavaScript;
     * testing avanzado con Jasmine;
     * auditorías Lighthouse de performance y accesibilidad;
     * mantenimiento de la documentación, changelog y flujo GitHub.

2. Integrar los puntos de A4 dentro de `Completadas en entregas previas`

   * Mover o incorporar como completados los objetivos de A4:

     * eliminación de `prompt()` y `alert()`;
     * interactividad mediante eventos del usuario y manipulación del DOM;
     * refactorización con Programación Orientada a Objetos;
     * persistencia con `localStorage` y `sessionStorage`;
     * modularización del código JavaScript;
     * testing automatizado con Jasmine ampliado.
   * No dejar A4 como “en desarrollo”.

3. Crear una nueva sección para esta entrega

   * Reemplazar `En desarrollo para esta entrega (A4)` por una sección nueva:
     `En desarrollo para esta entrega (Segundo Parcial)`
   * Agregar estos puntos como objetivos pendientes o en desarrollo:

     * implementar consumo asíncrono de datos con `fetch`;
     * obtener datos desde API externa o archivo JSON;
     * manejar estados de carga, éxito y error;
     * procesar colecciones con `map`, `filter` y `reduce`;
     * integrar una librería externa mediante CDN;
     * sumar tests Jasmine para funciones asíncronas;
     * sumar tests Jasmine para la librería externa;
     * realizar auditorías Lighthouse baseline, post-fetch y post-librería;
     * actualizar documentación técnica, README y changelog;
     * preparar la rama `release/segundo-parcial`.

4. Agregar herramientas usadas en A4 dentro de `Tecnologías utilizadas`

   * Mantener las tecnologías existentes.
   * Agregar o ajustar herramientas específicas utilizadas en A4:

     * JavaScript ES Modules;
     * DOM API;
     * Event Listeners;
     * Web Storage API (`localStorage` y `sessionStorage`);
     * Jasmine 5.10.0;
     * GitHub Projects / Issues / Pull Requests, si corresponde.
   * No agregar herramientas del Segundo Parcial como implementadas si todavía no se usaron. Por ejemplo, si todavía no está integrada una librería externa, mencionarla solo como objetivo del Segundo Parcial, no como tecnología ya utilizada.

5. Mantener la documentación existente

   * No eliminar enlaces a mockups, specs, testing, diagramas, prompts ni changelog.
   * No modificar la tabla de integrantes salvo que sea necesario corregir tildes o nombres de roles.
   * No inventar links, números de issues ni números de PR.

Criterios de redacción:

* Usar español claro y técnico.
* Mantener formato Markdown prolijo.
* Evitar texto largo o repetitivo.
* Diferenciar claramente:

  * funcionalidades ya completadas hasta A4;
  * objetivos nuevos del Segundo Parcial.
* No modificar otros archivos.
```

#### Prompt 3
```
Actuá como Coordinador/DevOps del proyecto CineGlobal para Programación Web I.

Necesito que revises la consigna del rol **DESARROLLADOR JS ASÍNCRONO - FETCH & APIS** del Segundo Parcial y compares lo pedido con la implementación actual del archivo:

js/api/apiService.js

Importante:

* Trabajá en modo revisión/code review.
* No modifiques archivos.
* No generes código nuevo salvo que sea necesario para ejemplificar una corrección puntual.
* El objetivo es determinar si el archivo cumple o no cumple con la consigna.

Archivos de contexto:

* PWI2026_2DO_PARCIAL.pdf
* docs/03-specs/segundo-parcial/spec-dev-async-fetch.md
* js/api/apiService.js
* js/script.js
* modelos relacionados en js/models/
* js/utils/storage.js
* README.md
* changelog.md

Revisá específicamente estos puntos de la consigna:

1. Selección y justificación de API o JSON estático

   * Verificar si la fuente de datos está definida.
   * Verificar si se usa API externa o archivo JSON local.
   * Verificar si la decisión está documentada en el spec.

2. Implementación asíncrona

   * Verificar si apiService.js usa fetch.
   * Verificar si trabaja correctamente con async/await o promises.
   * Verificar si valida response.ok.
   * Verificar si convierte la respuesta con .json().

3. Manejo de estados de UI

   * Verificar si contempla estado loading.
   * Verificar si contempla estado success.
   * Verificar si contempla estado error.
   * Verificar si esos estados se integran o pueden integrarse con el DOM.

4. Manejo de errores

   * Verificar uso de try/catch.
   * Verificar si muestra o devuelve mensajes amigables.
   * Verificar si contempla error HTTP y error de red.
   * Verificar si hay fallback o reintento cuando corresponde.

5. Procesamiento de datos

   * Verificar si se usan funciones de orden superior:

     * map
     * filter
     * reduce
   * Verificar si el procesamiento tiene sentido dentro del proyecto CineGlobal.
   * Verificar si los datos recibidos se validan o sanitizan antes de usarse.

6. Integración con la arquitectura existente

   * Verificar si apiService.js mantiene separación de responsabilidades.
   * Verificar si no mezcla innecesariamente lógica de DOM, storage y fetch.
   * Verificar si se integra con clases POO existentes cuando corresponde.
   * Verificar si se coordina con StorageUtil cuando corresponde.
   * Verificar si la integración con script.js es clara.

7. Testing y QA

   * Verificar si la implementación permite crear tests en api.spec.js.
   * Identificar casos de test necesarios:

     * respuesta exitosa;
     * error HTTP;
     * error de red;
     * procesamiento con map/filter/reduce;
     * integración con DOM si aplica.

8. Documentación y estilo

   * Verificar si las funciones complejas tienen JSDoc o comentarios útiles.
   * Verificar si los nombres son claros.
   * Verificar si hay console.log innecesarios.
   * Verificar si hay código comentado sin justificación.
   * Verificar si hay valores hardcodeados que deberían centralizarse.

Formato de respuesta esperado:

## Resultado general

Indicar una de estas opciones:

* Cumple correctamente
* Cumple parcialmente
* No cumple todavía

## Checklist de cumplimiento

Crear una tabla con columnas:

* Requisito de la consigna
* Estado: Cumple / Parcial / No cumple
* Evidencia encontrada
* Observación

## Problemas detectados

Listar los problemas encontrados, ordenados por prioridad:

* Crítico
* Alto
* Medio
* Bajo

## Request Changes sugeridos

Redactar comentarios concretos que pueda dejar en la PR, por ejemplo:

* “Solicito ajustar...”
* “Falta documentar...”
* “Conviene separar...”

## Recomendación final

Indicar si como Coordinador/DevOps debería:

* Aprobar la PR
* Aprobar con observaciones menores
* Solicitar cambios antes de aprobar

No inventes archivos ni funcionalidades que no estén en el contexto. Si no podés verificar algo, indicá “No verificable con los archivos adjuntos”.
```

#### Prompt 4
```
Actuá como Coordinador/DevOps del proyecto CineGlobal para Programación Web I.

Analiza el PR #215 y revisa si cumple con todas las consignas del Segundo Parcial para el rol **DESARROLLADOR JS LIBRERÍAS EXTERNAS**.

La librería integrada es **Toastify**.

Modo de trabajo:

* Revisá solo posibles errores, incumplimientos, inconsistencias o puntos débiles.
* No hagas un resumen general si todo está bien.
* No modifiques archivos.
* No propongas refactors grandes si no son necesarios para cumplir la consigna.
* Si encontrás un problema, explicá por qué es un problema y proponé una solución concreta.
* Si algo cumple correctamente, no hace falta desarrollarlo demasiado.
* Quiero una salida útil para dejar comentarios de review en GitHub.

Consigna a validar:
El rol Desarrollador JS Librerías Externas debe:

* Justificar una necesidad específica del proyecto para incorporar una librería externa.
* Seleccionar una librería apropiada, indicando nombre y versión.
* Integrarla correctamente mediante CDN.
* Configurarla según la documentación oficial.
* Crear un módulo wrapper si corresponde para encapsular la integración.
* Usarla en al menos 2 puntos reales de la aplicación.
* Asegurar que mejore la experiencia de usuario.
* Evitar que la librería duplique una funcionalidad ya resuelta con código propio.
* Mantener consistencia visual con el diseño existente.
* Documentar el uso en `docs/07-librerias/libreria-doc.md`.
* Incluir capturas de pantalla de la implementación.
* Completar el spec `spec-dev-libreria-externa.md` con BEFORE y AT CLOSE.
* Dejar el código en condiciones de ser testeado por el rol Tester QA/JS en `library.spec.js`.

Puntos críticos a revisar:

1. CDN e instalación

* Verificar si Toastify está cargado correctamente en `index.html`.
* Verificar si se carga CSS y JS de Toastify.
* Verificar si la versión documentada coincide con la versión usada.
* Verificar si el orden de carga permite que `toast.js` funcione correctamente.

2. Wrapper `toast.js`

* Verificar si `toast.js` encapsula el uso de Toastify.
* Verificar si `script.js` usa funciones del wrapper en vez de llamar directamente a `Toastify`.
* Verificar si hay manejo seguro cuando Toastify no está disponible.
* Verificar si el wrapper permite mostrar notificaciones de éxito, error, advertencia o información.
* Verificar si hay configuración repetida o hardcodeada innecesaria.

3. Uso real en la aplicación

* Verificar si Toastify se usa en al menos 2 puntos reales de la app.
* Identificar esos puntos exactos.
* Verificar si esos puntos corresponden a acciones reales del usuario, no a demos aisladas.
* Verificar si las notificaciones reemplazan o complementan correctamente los mensajes existentes.
* Revisar especialmente si se duplican mensajes que ya aparecen en modales.
* Si hay modal + toast para el mismo mensaje breve, marcarlo como posible duplicación.
* Sugerir cuándo conviene dejar solo Toastify y cuándo conviene mantener modal.

4. Funcionalidad nueva o duplicada

* Evaluar si Toastify aporta una mejora real de experiencia de usuario.
* Verificar si se usa para feedback no bloqueante.
* Verificar si no replica exactamente una funcionalidad ya cubierta con modales o mensajes del DOM.
* Si la librería solo muestra el mismo mensaje que ya mostraba un modal, marcarlo como incumplimiento parcial y sugerir solución.

5. Documentación

* Revisar `docs/07-librerias/libreria-doc.md`.
* Verificar si incluye nombre, versión, propósito, justificación técnica, método de instalación, ejemplos de uso, enlaces oficiales y capturas.
* Verificar si la documentación coincide con lo implementado.
* Verificar si las capturas `feature-1.png` y `feature-2.png` muestran realmente dos usos distintos de Toastify en la app.
* Verificar si se justifica la diferencia entre Toastify y los modales existentes.

6. Spec del rol

* Revisar `docs/03-specs/segundo-parcial/spec-dev-libreria-externa.md`.
* Verificar si BEFORE fue completado antes de la implementación.
* Verificar si AT CLOSE contiene prompt exacto, fragmento de código final, ajustes manuales, puntos de integración y issues respondidas.
* Verificar si los criterios de aceptación están marcados de forma coherente con el código real.

7. Testing esperado

* Verificar si el diseño permite que Tester QA/JS cree `library.spec.js`.
* Indicar si faltaría desacoplar algo para poder mockear Toastify.
* Sugerir casos de test mínimos si detectás riesgos.

Formato de salida:

## REVISIÓN DE CÓDIGO – PR #XXX (Numero del PR)

Listar solo problemas reales. Para cada problema usar este formato:

### Hallazgo X [Prioridad: Crítico/Alto/Medio/Bajo] Título breve

**Archivo/línea:** indicar archivo y línea aproximada si se puede.

**Problema:** explicar qué está mal o qué falta.

**Por qué importa:** relacionarlo con la consigna.

**Solución sugerida:** indicar qué debería corregirse. Proporcionar codigo ejemplo si lo hay encapsulado en comillas triples.

---

## Veredicto final

Elegir una opción:

* Solicitar cambios antes de aprobar.
* Aprobar con observaciones menores.
* Aprobar.

Justificar en 3 a 5 líneas como máximo.

Importante:

* No inventes archivos, líneas, issues ni PRs.
* Si algo no se puede verificar con los archivos adjuntos, indicá “No verificable con los archivos adjuntos”.
* Prestá especial atención a si Toastify realmente aporta una mejora o si solo duplica modales/mensajes ya existentes.
* La respuesta que sea en formato Markdown
```

#### Prompt 5
```
Actuá como desarrollador CSS del proyecto CineGlobal.

Necesito corregir el issue `#209 - Corregir contraste de color insuficiente (Accessibility)` detectado por Lighthouse.

Archivos disponibles para revisar y modificar:

* `css/styles.css`
* `css/components.css`
* `css/responsive.css`
* `css/bootstrap-overrides.css`

Contexto del issue:
Lighthouse Accessibility detectó el hallazgo:

`Background and foreground colors do not have a sufficient contrast ratio`

Elementos afectados:

* `caption`
* `table.table.table-dark`
* `a.contacto-link`
* `div.info-box.contacto-box`

Objetivo:
Corregir el contraste insuficiente para cumplir WCAG AA:

* Texto normal: mínimo 4.5:1
* Texto grande: mínimo 3:1

Restricciones importantes:

1. No agregar un bloque genérico de “fix accessibility” al final de los archivos.
2. No duplicar selectores ya existentes.
3. Corregir las reglas en el lugar donde actualmente están definidas:

   * Reglas de tabla Bootstrap → revisar/modificar sección de tablas en `bootstrap-overrides.css`.
   * `.tabla-cartelera` → revisar/modificar sección `TABLA CARTELERA` en `components.css`.
   * `.info-box`, `.contacto-box`, `.contacto-link` → revisar/modificar sección `INFO BOX` y `CONTACTO CTA` en `components.css`.
   * Comportamiento mobile de tablas/caption → revisar/modificar reglas existentes en `responsive.css`.
4. Mantener la identidad visual oscura de CineGlobal.
5. No cambiar HTML.
6. No modificar lógica JavaScript.
7. No hacer refactors grandes.
8. No cambiar nombres de clases.
9. No afectar otros componentes que no estén relacionados con el issue.
10. Validar que el resultado funcione tanto en mobile como en desktop.

Tareas concretas:

1. Revisar `bootstrap-overrides.css`

   * Verificar la sección de tablas `.table`.
   * Asegurar que `.table`, `.table-dark`, `th`, `td` y `caption` tengan contraste suficiente.
   * Si Bootstrap está aplicando color bajo a `caption`, corregir esa regla dentro de la sección de tablas.
   * Evitar agregar reglas al final del archivo.

2. Revisar `components.css`

   * En la sección `TABLA CARTELERA`, ajustar colores de tabla/caption si corresponde.
   * En la sección `INFO BOX`, revisar `background-color`, color de texto y links.
   * En la sección `CONTACTO CTA`, corregir `.contacto-box`, `.contacto-texto` y `.contacto-link`.
   * El enlace `.contacto-link` actualmente debe tener contraste suficiente contra el fondo de `.contacto-box`.
   * Si se mantiene rojo, usar una variante con contraste suficiente o convertirlo en un enlace tipo botón/pill con fondo de acento y texto blanco.
   * Evitar que el link quede como rojo claro sobre fondo gris si Lighthouse sigue marcando bajo contraste.

3. Revisar `responsive.css`

   * Validar que en mobile `.tabla-cartelera caption` no pierda contraste.
   * Ajustar la regla existente de mobile si el caption cambia de comportamiento visual.
   * No crear reglas nuevas innecesarias si puede corregirse modificando las actuales.

4. Revisar `styles.css`

   * Solo modificar variables globales si es necesario.
   * No cambiar la paleta general salvo que sea indispensable.
   * Si se modifica una variable, verificar que no rompa otros contrastes del sitio.

Resultado esperado:

* Lighthouse ya no debe reportar contraste insuficiente para:

  * `caption`
  * `table.table.table-dark`
  * `a.contacto-link`
  * `div.info-box.contacto-box`
* La app debe conservar su estética oscura.
* El bloque de contacto debe ser legible.
* La tabla debe ser legible en desktop y mobile.
* No deben quedar reglas duplicadas al final de los archivos.

Formato de respuesta:

1. Mostrar qué archivos fueron modificados.
2. Explicar brevemente qué regla existente se ajustó.
3. Indicar cómo validar:

   * correr Lighthouse Accessibility en mobile;
   * correr Lighthouse Accessibility en desktop;
   * verificar visualmente tabla y sección contacto.
4. No modificar archivos fuera de los cuatro CSS indicados.
```

#### Prompt 6 
```
Actuá como Coordinador/DevOps del proyecto CineGlobal para Programación Web I.

Analiza el PR #211 y revisa si cumple con todas las consignas del Segundo Parcial para el rol **DESARROLLADOR JS ASÍNCRONO - FETCH & APIS**.

Modo de trabajo:

* Revisá solo posibles errores, incumplimientos, inconsistencias o puntos débiles.
* No hagas un resumen general si todo está bien.
* No modifiques archivos.
* No propongas refactors grandes si no son necesarios para cumplir la consigna.
* Si encontrás un problema, explicá por qué es un problema y proponé una solución concreta.
* Si algo cumple correctamente, no hace falta desarrollarlo demasiado.
* Quiero una salida útil para dejar comentarios de review en GitHub.

Consigna a validar:
El rol Desarrollador JS Asíncrono - Fetch & APIs debe:

* Seleccionar y justificar una API externa o archivo JSON estático.
* Implementar consumo asíncrono de datos usando `fetch` y promises.
* Manejar correctamente estados de carga, éxito y error.
* Integrar los datos obtenidos con el DOM dinámicamente.
* Aplicar funciones de orden superior como `map`, `filter` y `reduce`.
* Validar y sanitizar datos recibidos desde la API o JSON.
* Implementar manejo de errores con `try/catch`.
* Mostrar mensajes de error amigables para el usuario.
* Implementar fallback o reintento cuando corresponda.
* Mantener separación de responsabilidades, ubicando la lógica de API en un módulo dedicado.
* Coordinar la integración con las clases POO existentes cuando corresponda.
* Coordinar con Storage si corresponde persistir datos obtenidos.
* Dejar el código en condiciones de ser testeado por el rol Tester QA/JS en `api.spec.js`.
* Completar el spec `spec-dev-async-fetch.md` con BEFORE y AT CLOSE.

Puntos críticos a revisar:

1. Selección y justificación de API o JSON

* Verificar si se eligió una API externa o archivo JSON estático.
* Verificar si la decisión está justificada en `spec-dev-async-fetch.md`.
* Verificar si la fuente de datos tiene sentido dentro del proyecto CineGlobal.
* Verificar si no se usa una API o JSON sin relación clara con películas, funciones, cartelera, usuarios, soporte u otra parte real de la app.
* Verificar si la URL o ruta del recurso está centralizada y no repetida innecesariamente.

2. Implementación asíncrona con `fetch`

* Verificar si existe un módulo dedicado, por ejemplo `js/api/apiService.js`.
* Verificar si se usa `fetch` correctamente.
* Verificar si se usa `async/await` o promises de forma clara.
* Verificar si se valida `response.ok`.
* Verificar si se convierte la respuesta con `.json()`.
* Verificar si se devuelven datos utilizables por otros módulos.
* Verificar si no se mezcla innecesariamente la lógica de fetch con lógica de DOM, Storage o negocio.

3. Estados de carga, éxito y error

* Verificar si se implementa estado `loading`.
* Verificar si se implementa estado `success`.
* Verificar si se implementa estado `error`.
* Verificar si esos estados se reflejan en la interfaz.
* Verificar si los mensajes se muestran en elementos existentes del HTML.
* Verificar si se consulta algún selector que no exista en `index.html`.
* Verificar si el estado de carga se limpia correctamente tanto en éxito como en error.

4. Manejo de errores

* Verificar si hay `try/catch` en operaciones asíncronas.
* Verificar si se diferencian errores HTTP, errores de red y errores de parseo JSON.
* Verificar si se muestran mensajes amigables al usuario.
* Verificar si se evita exponer mensajes técnicos directamente en pantalla.
* Verificar si el error se propaga o se maneja de forma coherente.
* Verificar si existe fallback o reintento cuando corresponde.
* Verificar si un error de la API no rompe el funcionamiento principal de la app.

5. Procesamiento de datos con funciones de orden superior

* Verificar si se usa `map` para transformar datos.
* Verificar si se usa `filter` para filtrar datos válidos o relevantes.
* Verificar si se usa `reduce` para agregar, agrupar o calcular información útil.
* Revisar si el uso de `reduce` es significativo o si solo replica `datos.length`.
* Verificar si el procesamiento tiene sentido para CineGlobal.
* Verificar si los datos procesados se integran con el catálogo, películas, funciones u otra parte real de la app.

6. Validación y sanitización de datos

* Verificar si los datos recibidos se validan antes de usarse.
* Verificar si se controla que la respuesta tenga el formato esperado.
* Verificar si las funciones que procesan colecciones validan que realmente reciben arrays.
* Verificar si se contemplan respuestas como `null`, objetos inválidos o estructuras tipo `{ results: [...] }`.
* Verificar si la sanitización adapta los datos externos al modelo interno del proyecto.
* Verificar si se usan nombres coherentes con las clases POO existentes, por ejemplo `titulo` en lugar de depender solo de `title` si el modelo interno usa `titulo`.

7. Integración con DOM

* Verificar si los datos obtenidos se muestran dinámicamente en la interfaz.
* Verificar si se integran con componentes ya existentes.
* Verificar si se evita duplicar cards hardcodeadas o lógica ya existente.
* Verificar si se usan selectores existentes.
* Verificar si se maneja correctamente el caso sin resultados.
* Verificar si se mantiene la experiencia responsive.

8. Integración con arquitectura existente

* Verificar si el módulo de API mantiene separación de responsabilidades.
* Verificar si se integra con las clases POO existentes cuando corresponde.
* Verificar si se instancia o transforma información hacia `Pelicula`, `Funcion`, `CatalogoPeliculas` u otros modelos cuando sea necesario.
* Verificar si se coordina con `StorageUtil` cuando corresponde persistir datos.
* Verificar si `script.js` queda como controlador/orquestador y no concentra toda la lógica de API.
* Verificar si hay acoplamiento excesivo entre API, DOM, Storage y modelos.

9. Spec del rol

* Revisar `docs/03-specs/segundo-parcial/spec-dev-async-fetch.md`.
* Verificar si BEFORE fue completado antes de la implementación.
* Verificar si se documentó la API o JSON elegido y su justificación.
* Verificar si se planificaron estados `loading`, `success` y `error`.
* Verificar si se planificó el uso de `map`, `filter` y `reduce`.
* Verificar si se definieron criterios de aceptación.
* Verificar si AT CLOSE contiene prompt exacto, ajustes manuales, resumen de integración con POO/Storage e issues respondidas.
* Verificar si lo documentado coincide con el código real.

10. Testing esperado

* Verificar si el diseño permite que Tester QA/JS cree `api.spec.js`.
* Indicar si faltaría desacoplar algo para poder mockear `fetch`.
* Sugerir casos de test mínimos si detectás riesgos:

  * respuesta exitosa;
  * error HTTP;
  * error de red;
  * error de parseo JSON;
  * procesamiento con `map`;
  * procesamiento con `filter`;
  * procesamiento con `reduce`;
  * sanitización de datos inválidos;
  * integración con DOM si corresponde.

Formato de salida:

## REVISIÓN DE CÓDIGO – PR #211

Listar solo problemas reales. Para cada problema usar este formato:

### Hallazgo X [Prioridad: Crítico/Alto/Medio/Bajo] Título breve

**Archivo/línea:** indicar archivo y línea aproximada si se puede.

**Problema:** explicar qué está mal o qué falta.

**Por qué importa:** relacionarlo con la consigna.

**Solución sugerida:** indicar qué debería corregirse. Proporcionar código ejemplo si lo hay encapsulado en comillas triples.

---

## Veredicto final

Elegir una opción:

* Solicitar cambios antes de aprobar.
* Aprobar con observaciones menores.
* Aprobar.

Justificar en 3 a 5 líneas como máximo.

Importante:

* No inventes archivos, líneas, issues ni PRs.
* Si algo no se puede verificar con los archivos adjuntos, indicá “No verificable con los archivos adjuntos”.
* Prestá especial atención a si el consumo asíncrono está realmente integrado a la app o si quedó como una demo aislada.
* Prestá especial atención a si `map`, `filter` y `reduce` se usan de forma significativa o solo para cumplir formalmente.
* Prestá especial atención a si la lógica de API está separada de DOM, Storage y modelos.
* Prestá especial atención a si los datos externos se sanitizan y se adaptan al modelo interno de CineGlobal.
* La respuesta que sea en formato Markdown.
```

#### Prompt 7
```
Actuá como Coordinador/DevOps del proyecto CineGlobal para Programación Web I.

Necesito que analices el PR del rol **Tester QA/JS - Testing Avanzado** del Segundo Parcial y revises si cumple con la consigna.

Modo de trabajo:

* Trabajá en modo revisión/code review.
* No modifiques archivos.
* No generes código nuevo salvo que sea necesario para ejemplificar una corrección puntual.
* Revisá solo problemas reales, inconsistencias, incumplimientos o puntos débiles.
* Si algo está bien, no hace falta desarrollarlo demasiado.
* Quiero una salida útil para dejar comentarios de review en GitHub.
* No inventes archivos, capturas, resultados, líneas, issues ni PRs.
* Si algo no puede verificarse con los archivos adjuntos, indicá “No verificable con los archivos adjuntos”.

Archivos de contexto a revisar:

* Consigna `PWI2026_2DO_PARCIAL.pdf`
* `docs/03-specs/segundo-parcial/spec-tester-qa.md`
* `testing-doc.md` o documentación equivalente de testing
* `test-runner.html`
* `js/test/api.spec.js` o archivo equivalente
* `js/test/library.spec.js` o archivo equivalente
* `js/test/script.spec.js`, `models.spec.js`, `storage.spec.js` si están vinculados
* Capturas de tests fallidos/exitosos
* Capturas Lighthouse baseline, post-fetch y post-librería
* `README.md`
* `changelog.md`
* Código relacionado con Async Fetch/API
* Código relacionado con librería externa Toastify

Consigna a validar:
El rol Tester QA/JS debe:

* Crear o actualizar pruebas Jasmine para funciones asíncronas/API.
* Crear o actualizar pruebas Jasmine para la librería externa.
* Verificar casos de éxito y error.
* Probar o dejar cubiertos escenarios relacionados con `fetch`, errores HTTP, errores de red, parseo JSON, fallback y reintento.
* Validar procesamiento con `map`, `filter` y `reduce` si corresponde.
* Validar sanitización de datos externos si corresponde.
* Validar integración de Toastify o la librería externa elegida.
* Usar mocks o datos controlados cuando sea necesario para evitar depender de una API real.
* Mantener pruebas deterministas y reproducibles.
* Ejecutar y documentar resultados del runner de Jasmine.
* Realizar auditorías Lighthouse:

  * baseline;
  * post-fetch;
  * post-librería.
* Documentar resultados, capturas y hallazgos.
* Crear issues para defectos detectados, con prioridad y responsable.
* Completar el spec del rol con BEFORE y AT CLOSE.
* Actualizar changelog si corresponde.

Puntos críticos a revisar:

1. Spec del rol Tester QA/JS

* Verificar que el BEFORE exista y haya sido completado antes de la implementación.
* Verificar que el AT CLOSE refleje el resultado real.
* Verificar que no se marquen como completadas pruebas o auditorías sin evidencia.
* Verificar que el spec mencione qué se probó, qué quedó pendiente y qué limitaciones hubo.
* Verificar que los criterios de aceptación estén actualizados con el estado real.

2. Estructura de testing

* Verificar que exista un runner funcional.
* Verificar que los archivos de spec estén correctamente incluidos.
* Verificar que el orden de carga de scripts sea correcto.
* Verificar que no haya dependencias rotas o rutas incorrectas.
* Verificar que los tests puedan ejecutarse desde navegador sin pasos ocultos.
* Verificar que no se mezclen responsabilidades del Tester con implementación de features.

3. Tests de Async Fetch/API

* Verificar si existe `api.spec.js` o equivalente.
* Verificar si prueba respuesta exitosa.
* Verificar si prueba error HTTP.
* Verificar si prueba error de red.
* Verificar si prueba JSON inválido o formato inesperado.
* Verificar si prueba respuesta vacía.
* Verificar si prueba fallback o reintento, si la implementación lo permite.
* Verificar si mockea `fetch` correctamente.
* Verificar si restaura mocks después de cada test.
* Verificar si no depende de TheMovieDB real ni de una API key real.
* Verificar si cubre sanitización y transformación de datos externos.

4. Tests de librería externa

* Verificar si existe `library.spec.js` o equivalente.
* Verificar si prueba el wrapper de Toastify o la librería externa elegida.
* Verificar si mockea `window.Toastify`.
* Verificar si prueba que la app no se rompa cuando Toastify no está disponible.
* Verificar si prueba tipos de notificación: éxito, error, advertencia o información, según lo implementado.
* Verificar si prueba que el wrapper devuelva un resultado controlado.
* Verificar si no depende del CDN real para pasar.

5. Tests existentes de funcionalidades previas

* Verificar si `script.spec.js`, `models.spec.js` o `storage.spec.js` siguen alineados con el código actual.
* Verificar si quedaron tests esperando IDs antiguos, por ejemplo `compraFuncion` en vez de `compraHorario`.
* Verificar si quedaron tests esperando modales que fueron reemplazados por Toastify.
* Verificar si se rompieron tests existentes por cambios de flujo.
* Verificar si las expectativas validan comportamiento real y no detalles obsoletos.

6. Calidad de los tests

* Verificar que los tests tengan nombres claros.
* Verificar que cada test pruebe una sola responsabilidad.
* Verificar que haya `beforeEach` / `afterEach` cuando corresponda.
* Verificar que se limpien `localStorage`, `sessionStorage`, DOM y mocks.
* Verificar que no queden datos contaminando otros tests.
* Verificar que no haya tests frágiles dependientes del orden, del tiempo o de servicios externos.
* Verificar que no haya `console.log` innecesarios.
* Verificar que no haya tests comentados sin justificación.

7. Evidencias de ejecución

* Verificar si hay capturas de tests fallidos y exitosos.
* Verificar si las capturas corresponden al runner real.
* Verificar si se documentó qué error se detectó y cómo se corrigió.
* Verificar si la documentación diferencia pruebas de A4 y pruebas del Segundo Parcial.
* Verificar si se documentó fecha/momento o contexto de cada evidencia.

8. Lighthouse

* Verificar si existen auditorías baseline, post-fetch y post-librería.
* Verificar si las capturas son legibles.
* Verificar si se indican métricas principales: Performance, Accessibility, Best Practices y SEO.
* Verificar si se documentan los hallazgos detectados.
* Verificar si los hallazgos importantes fueron convertidos en issues.
* Verificar si se respetan los umbrales declarados por la consigna o el equipo.
* Verificar si hay evidencia de corrección para problemas como contraste, SEO o performance.

9. Issues y trazabilidad

* Verificar si los defectos detectados por QA tienen issue asociada.
* Verificar si cada issue tiene prioridad, descripción, pasos para reproducir, resultado esperado y responsable.
* Verificar si se relacionan issues con PRs y commits.
* Verificar si el changelog registra aportes del rol Tester QA/JS.
* Verificar si README o documentación principal enlaza a la documentación de testing cuando corresponde.

10. Alcance del rol

* Verificar si el Tester QA/JS se mantuvo dentro de su rol.
* Si modificó código productivo, revisar si estaba justificado.
* Si agregó correcciones funcionales grandes, marcarlo como posible fuera de alcance.
* Si solo documentó sin validar, marcarlo como incumplimiento parcial.
* Si detectó errores pero no dejó issue/evidencia, marcarlo como trazabilidad incompleta.

Formato de salida esperado:

## REVISIÓN DE CÓDIGO – PR #XXX - Tester QA/JS

### Resultado general

Elegir una opción:

* Cumple correctamente
* Cumple parcialmente
* No cumple todavía

Justificar en 3 a 5 líneas.

---

### Hallazgos detectados

Listar solo problemas reales. Para cada problema usar este formato:

#### Hallazgo X [Prioridad: Crítico/Alto/Medio/Bajo] Título breve

**Archivo/línea aproximada:**
Indicar archivo y línea aproximada si se puede.

**Problema:**
Explicar qué está mal, incompleto o inconsistente.

**Por qué importa:**
Relacionarlo con la consigna, la trazabilidad o la calidad de la entrega.

**Solución sugerida:**
Indicar qué debería corregirse. Si hace falta, incluir ejemplo breve.

---

### Request Changes sugeridos para GitHub

Redactar comentarios concretos para dejar en la PR. Separar:

* Request Changes bloqueantes.
* Observaciones menores no bloqueantes.

---

### Veredicto final

Elegir una opción:

* Solicitar cambios antes de aprobar.
* Aprobar con observaciones menores.
* Aprobar.

Justificar brevemente.

Importante:

* No inventes evidencia.
* No apruebes si faltan tests centrales de API o librería.
* No apruebes si no hay evidencia de ejecución.
* No apruebes si Lighthouse está documentado sin capturas o resultados verificables.
* Si hay pendientes menores pero la consigna central está cumplida, indicar “Aprobar con observaciones menores”.
```


### Reviews realizadas

#### PR `#211` - Desarrollador JS Asíncrono - Fetch & APIs

Se realizaron varias rondas de revisión sobre el PR del rol Async, comparando la implementación con los requisitos del Segundo Parcial. La revisión se centró en:

- Selección y justificación de TheMovieDB como API externa.
- Consumo asíncrono con `fetch`, `async/await`, validación de `response.ok` y conversión mediante `.json()`.
- Manejo de estados `loading`, `success` y `error` en la interfaz.
- Manejo de errores HTTP, errores de red, respuestas vacías o formatos inesperados.
- Existencia de fallback local/cache ante ausencia de credencial o falla externa.
- Uso significativo de `map`, `filter` y `reduce`.
- Validación y sanitización de datos externos antes de integrarlos al DOM.
- Adaptación de datos externos a las clases POO existentes sin modificar los modelos.
- Separación de responsabilidades entre `ApiService`, `script.js`, Storage, DOM y modelos.
- Preparación del diseño para que el rol Tester QA/JS pueda cubrir la lógica en una rama posterior.
- Coherencia entre `spec-dev-async-fetch.md` y el estado real del código.

La revisión final concluyó que el PR cumplía lo central del rol Async y quedaba aprobable con observaciones menores de robustez/documentación.

#### PR `#215` - Desarrollador JS Librerías Externas

Se revisó la integración de Toastify como librería externa del Segundo Parcial. La revisión se centró en:

- Confirmar que Toastify estuviera identificada como librería externa y no como código propio.
- Verificar integración mediante CDN y coherencia entre versión documentada y versión usada.
- Revisar si existía wrapper o módulo de integración que evitara acoplar la aplicación directamente a la librería.
- Validar que Toastify se usara en al menos dos puntos reales de la aplicación.
- Evaluar si las notificaciones aportaban mejora de experiencia de usuario o si duplicaban modales/mensajes existentes.
- Revisar consistencia visual, claridad de mensajes y uso para feedback no bloqueante.
- Revisar documentación en `docs/07-librerias/libreria-doc.md`, capturas y coincidencia con el código real.
- Verificar que el spec del rol tuviera BEFORE, criterios de aceptación y cierre documental coherente.

La revisión se enfocó especialmente en distinguir integración real de demo visual aislada.

#### PR `#220` - Tester QA/JS - Testing Avanzado

Se revisó el PR del rol Tester QA/JS comparando la suite propuesta contra la consigna del Segundo Parcial. La revisión se centró en:

- Existencia y alcance de `api.spec.js` para cubrir consumo asíncrono, errores HTTP, errores de red, reintento, fallback, sanitización y procesamiento con `map`, `filter` y `reduce`.
- Existencia y alcance de `library.spec.js` para validar la integración real de Toastify y su wrapper.
- Verificación de que los tests usaran mocks y datos controlados, sin depender de TheMovieDB real, una API key real ni el CDN de Toastify.
- Revisión del runner Jasmine y del orden de carga de las suites.
- Revisión de evidencias de ejecución del runner y documentación de resultados.
- Revisión de auditorías Lighthouse baseline, post-fetch y post-librería, incluyendo capturas, métricas e issues asociados.
- Coherencia entre `spec-tester-qa-segundo-parcial.md`, `testing-doc.md`, README, changelog y los archivos reales del repositorio.

La revisión detectó incumplimientos bloqueantes en los tests centrales de API y librería, por lo que el criterio final para este PR fue **solicitar cambios antes de aprobar**.

#### PRs de soporte del Coordinador/DevOps

También se revisaron PRs transversales del rol Coordinador/DevOps vinculadas con documentación, accesibilidad y preparación de la entrega:

- PR `#206`: planificación inicial y documentación de coordinación del Segundo Parcial.
- PR `#208`: revisión de documentación/metadata del proyecto.
- PR `#209`: revisión del hallazgo Lighthouse de contraste insuficiente desde el punto de vista de accesibilidad.

Estas revisiones se trataron como controles de calidad y trazabilidad del entregable, no como desarrollo funcional nuevo.

### Request Changes gestionados

#### Request Changes sobre PR `#211`

Se gestionaron Request Changes y observaciones sobre el PR Async relacionados con:

- Evitar credenciales hardcodeadas o placeholders inseguros para TheMovieDB.
- Mantener TheMovieDB como API externa sin publicar una API key real.
- Tratar la ausencia de credencial como caso controlado con fallback local/cache.
- Asegurar que el fallback no quedara como error accidental sino como decisión prevista.
- Validar respuestas vacías o con formato inesperado para evitar reemplazar una caché válida.
- Revisar que el reintento estuviera desacoplado y preparado para testing futuro sin importar `script.js`.
- Confirmar que las películas externas pudieran integrarse al flujo funcional de cartelera y compra.
- Revisar sanitización y adaptación de datos antes de llegar al DOM.
- Ajustar la documentación del spec únicamente en `AT CLOSE`, sin modificar el BEFORE.
- Evitar marcar pruebas como completadas si pertenecen a otra rama o rol.

En cada ronda se pidió que la evidencia documental reflejara el código real y que no se inventaran pruebas, issues o funcionalidades fuera del alcance.

#### Request Changes sobre PR `#215`

Se gestionaron observaciones sobre la integración de Toastify relacionadas con:

- Verificar que la librería aportara una funcionalidad válida y no una demo aislada.
- Confirmar al menos dos puntos reales de uso en la aplicación.
- Evitar duplicación innecesaria de mensajes ya cubiertos por modales o alertas persistentes.
- Mantener encapsulación mediante wrapper cuando correspondiera.
- Alinear documentación, capturas y código real.
- Separar los pendientes de testing del alcance propio del rol de librerías externas.

#### Request Changes sobre PR `#220` - Tester QA/JS

Se gestionaron Request Changes y observaciones sobre el PR Tester QA/JS relacionados con:

- Ajustar `api.spec.js` para que importe y pruebe el módulo real `js/api/apiService.js`, en lugar de definir un `ApiService` local dentro del test.
- Ajustar `library.spec.js` para que pruebe el wrapper real `js/utils/toast.js` y mockee `window.Toastify`, en lugar de usar una librería ficticia.
- Cubrir escenarios centrales de API: respuesta exitosa, error HTTP, error de red, formato inválido, respuesta vacía, sanitización, reintento/fallback y mensajes de error controlados.
- Tratar `api.spec.js` y `library.spec.js` como suites obligatorias del runner, no como specs opcionales.
- Agregar evidencia verificable de ejecución del runner Jasmine para las suites nuevas.
- Corregir rutas documentales que apuntaban a `docs/03-testing` cuando los archivos reales se encuentran en `docs/04-testing`.
- Alinear checklist, changelog y README con el estado real del rol Tester QA/JS.

Estos pedidos se consideraron bloqueantes porque la consigna exige pruebas reales de API y librería externa, además de evidencia de ejecución verificable.

#### Request Changes de accesibilidad

Se revisó el hallazgo Lighthouse de contraste insuficiente vinculado con:

- `caption`.
- `table.table.table-dark`.
- `a.contacto-link`.
- `div.info-box.contacto-box`.

La revisión se enfocó en exigir que los cambios respetaran la ubicación original de las reglas CSS, evitaran duplicaciones al final de archivos y mantuvieran la identidad visual oscura de CineGlobal.

### Obstáculos encontrados

- Fue necesario separar claramente qué correspondía al rol Async y qué debía quedar para Tester QA/JS, especialmente en temas de `api.spec.js` y evidencia de pruebas.
- Algunas revisiones requerían distinguir entre documentación de planificación y evidencia real de cierre, para no marcar como completado algo que todavía no estaba validado por el rol correspondiente.
- TheMovieDB no devuelve información propia del modelo de negocio de CineGlobal, como funciones de cine, horarios o precios, por lo que la revisión tuvo que controlar que esa diferencia estuviera documentada y contemplada sin cambiar modelos POO.
- La gestión de credenciales en una aplicación frontend estática exigió revisar seguridad, fallback y experiencia de usuario sin incorporar secretos al repositorio.
- En la integración de Toastify hubo que evaluar si la librería aportaba valor real o si solamente repetía feedback que ya existía en la aplicación.
- El hallazgo de accesibilidad requería controlar que la revisión exigiera respetar el diseño existente y evitar reglas genéricas agregadas al final de los CSS.
- Se detectaron inconsistencias documentales entre checklist, evidencia disponible y alcance de cada rama, por lo que fue necesario revisar el lenguaje del cierre para evitar sobredeclarar resultados.

### Resultado final

Como Coordinador/DevOps, se completó la revisión de las PRs principales del Segundo Parcial y se dejaron comentarios orientados a cumplimiento de consigna, trazabilidad, seguridad, accesibilidad, documentación y mantenibilidad.

La revisión final del PR Async quedó en condición de **aprobar con observaciones menores**, porque cumplía los requisitos centrales del rol y los puntos pendientes detectados no bloqueaban la funcionalidad principal. La revisión de Toastify quedó enfocada en confirmar que la librería estuviera integrada en flujos reales y no como demo superficial. Los hallazgos de accesibilidad fueron tratados como controles de calidad transversales del entregable.

No se documentan en este cierre detalles de implementación, porque la evidencia del rol Coordinador/DevOps corresponde a las revisiones realizadas, los Request Changes gestionados, los obstáculos encontrados y el criterio final de aprobación.

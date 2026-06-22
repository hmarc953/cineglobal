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
- Notificar con ✅ (`:white_check_mark:`) en el hilo de Slack cada lote de comentarios efectivamente resuelto.
- Mantener comunicación fluida; no usar ✅ mientras existan correcciones del lote sin validar.

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
- [ ] Issue del rol Coordinador/DevOps creada y asociada a la PR (`#XX`).
- [ ] Estructura de carpetas del Segundo Parcial verificada.
- [ ] Cuatro PRs del Segundo Parcial revisadas como mínimo.
- [ ] PR de Fetch/API aprobada e integrada en `develop`.
- [ ] PR de librería externa aprobada e integrada en `develop`.
- [ ] PR de Tester QA/JS aprobada e integrada en `develop`.
- [ ] PR de Coordinador/DevOps revisada por otro integrante e integrada en `develop`.
- [ ] Issues administradas y actualizadas en GitHub Projects (Kanban).
- [ ] `README.md` actualizado con información real del Segundo Parcial.
- [ ] `changelog.md` actualizado con cada contribución, PR e issue.
- [ ] Pruebas Jasmine y auditorías Lighthouse revisadas.
- [ ] Performance >= 80 y Accessibility >= 90, o desvíos documentados y corregidos.
- [ ] No existen defectos críticos abiertos en `develop`.
- [ ] `release/segundo-parcial` creada desde `develop` validado.
- [ ] GitHub Pages configurado y verificado desde la rama release.
- [ ] PR `release/segundo-parcial` -> `master` creada con el template correcto (`#XX`).
- [ ] PR de release compartida en Slack y enlace entregado en el campus (`[pendiente]`).

#### Fase 2 - Request Changes y cierre

- [ ] Todos los Request Changes del docente fueron analizados.
- [ ] Cada corrección cuenta con issue, prioridad, responsable y criterio de aceptación.
- [ ] Las correcciones se aplicaron sobre `release/segundo-parcial` con commits descriptivos.
- [ ] Cada iteración fue validada con pruebas y revisión cruzada.
- [ ] Las correcciones resueltas fueron notificadas con ✅ en Slack.
- [ ] Se mantuvo trazabilidad entre comentario, issue, commit, PR y evidencia.
- [ ] Se obtuvo LGTM y approve del docente antes de la fecha límite.
- [ ] `release/segundo-parcial` fue mergeada a `master` y se notificó con `:pr-merged:`.
- [ ] Se realizó y verificó el backport de `release/segundo-parcial` hacia `develop`.
- [ ] La sección `AT CLOSE` fue completada con evidencia real y sin placeholders pendientes.


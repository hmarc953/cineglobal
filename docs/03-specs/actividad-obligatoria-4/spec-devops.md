# Especificación DevOps - Actividad Obligatoria 4

## Plan de coordinación
- PR 1: Actualización de la rama base con los cambios de la Actividad Obligatoria N°3 y preparación del backport.
- PR 2: Implementación de correcciones específicas de la AO3 en la rama de trabajo.
- PR 3: Configuración de GitHub Pages y revisión del despliegue.
- PR 4: Creación de la release final y documentación de los cambios.
- Orden de integración:
  1. Integrar primero el PR de sincronización/base para garantizar que la rama principal contiene los cambios de AO3 y el backport.
  2. Integrar las correcciones de AO3 con pruebas y validación.
  3. Integrar la configuración de GitHub Pages y validación del sitio desplegado.
  4. Integrar la creación de release y etiquetado final.
- Criterio de aprobación:
  - Cada PR debe recibir al menos una revisión aprobada y al menos cuatro code reviews con CHANGES_REQUESTED documentados.
  - No se aprueba ningún PR hasta que las observaciones de los revisores estén resueltas y los cambios estén validados.
  - La integración final solo se hace cuando GitHub Pages está activo y la release está creada.

## Herramientas a utilizar
- Copilot Agent Mode para code reviews:
  - Justificación: Copilot Agent Mode permite automatizar revisiones de código y detectar inconsistencias con las especificaciones del proyecto, acelerando el feedback.
  - Utilizarlo como apoyo para revisar PRs, proponer mejoras de estructura y confirmar que las correcciones de AO3 y el backport cumplen los requisitos.
  - Complementar con revisiones humanas para garantizar calidad, contexto y decisiones de integración.

## Criterios de aceptación
- [ ] Correcciones de la Actividad Obligatoria N°3 aplicadas al proyecto.
- [ ] Backport realizado correctamente y documentado en el flujo de trabajo.
- [ ] Al menos 4 code reviews con CHANGES_REQUESTED documentados y resueltos.
- [ ] GitHub Pages activo y desplegando el sitio del proyecto.
- [ ] Release creada en GitHub con versión y notas de cambios asociadas.

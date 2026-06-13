# Especificación DevOps - Actividad Obligatoria 4
## BEFORE
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
  - No se aprueba ninguna PR hasta que las observaciones de los revisores estén resueltas y los cambios estén validados.
  - La integración final solo se hace cuando GitHub Pages este activo y la release este creada.

## Herramientas a utilizar
- Copilot Agent Mode para code reviews:
  - Justificación: Copilot Agent Mode permite automatizar revisiones de código y detectar inconsistencias con las especificaciones del proyecto, acelerando el feedback.
  - Utilizarlo como apoyo para revisar PRs, proponer mejoras de estructura y confirmar que las correcciones de AO3 y el backport cumplen los requisitos.
  - Complementar con revisiones humanas para garantizar calidad, contexto y decisiones de integración.

## Criterios de aceptación
- [x] Correcciones de la Actividad Obligatoria N°3 aplicadas al proyecto.
- [x] Backport realizado correctamente y documentado en el flujo de trabajo.
- [x] Al menos 4 code reviews con CHANGES_REQUESTED documentados y resueltos.
- [x] GitHub Pages activo y desplegando el sitio del proyecto.
- [x] Release creada en GitHub con versión y notas de cambios asociadas.
## AT CLOSE
### Prompts (Exacto para todas las revisiones)
```text
Actua como un Senior Software Engineer realizando code review profesional.

Estas analizando los cambios de una Pull Request activa.

INSTRUCCIONES IMPORTANTES:

- Identifica problemas reales del código
- Enumera los hallazgos (1, 2, 3 ... )
- Cada hallazgo debe ser independiente
- Sé claro, técnico y concreto
- No inventes problemas hipotéticos sin evidencia en el código
- No incluyas sugerencias de tests
Para cada hallazgo usa EXACTAMENTE esta estructura:
==========================================================================
HALLAZGO #<numero>
Archivo:
Línea:

Tipo de problema:
(bug | performance | seguridad | legibilidad | diseño | otro)

Severidad:
(baja | media | alta | crítica)

Explicación técnica:
Por qué esto es un problema real.

Sugerencia de mejora:
Cambio concreto recomendado.

Ejemplo de código corregido (si aplica):
*"codigo
ejemplo
DECISIÓN IEL REVISOR HUMANO:

[ ] Aceptar sugerencia
[ ] Rechazar sugerencia

Justificación del revisor humano:
(Completar manualmente si se rechaza)
Al final agrega:

RESUMEN GENERAL DE LA PR
Evaluación global de calidad y riesgos técnicos.

DECISIÓN FINAL SUGERIDA POR IA:

APPROVE

REQUEST CHANGES
COMMENT ONLY No completes la sección "DECISIÓN DEL REVISOR HUMANO".
Debe quedar vacia para edicion manual. Publica comentarios directamente en la Pull
Request en las líneas correspondientes.
No respondas en el chat salvo para el resumen final.
```
### Resumen de cada review: 
Review del pull request 158: En esta pull reques se reviso que la parte de dominío este correcta.Tuve que rechazar algunos descubrimientos porque  algunos descubrimientos eran improcedentes.Tambien decidimos con quien ejercia el rol de Desarrollador JS POO de descartar algunos hasllasgos porque descubrimos mas hallasgos improcedentes.
Review del pull request 160: En esta pull reques se reviso la adaptación de clases de dominio donde quien ejercia el rol de  Desarrollador JS POO adapto lo que ya habia echo en la pull 158 para que el rol Desarrollador js eventos + dom pueda hacer su parte corectamente. En esta pull se realizo una review donde se tomo como justificacion valida el comentario echo por quien ejercia el rol de Desarrollador JS POO que indico porque era improcedente estos hallasgos.
Review del pull request 161: Se reviso la parte de Storage.En esta pull se realizo una primera review donde se encontraron hallasgos que posteriormente quien ejercia el rol de Desarrollador JS Local y Session Storage corrigio.Despues se realizo un segundo review donde se encontraron mas hallasgos y despues fueron solucionados.
Review del pull request 169:En esta pull reques se vio que la parte del DOM y los eventos. Se realizo una primera review donde se encontraron hallasgos que algunos fueron corregidos por el rol de Desarrollador js eventos + dom y otro fueron declarados improcedentes por la justificación sastifactorias del rol de Desarrollador js eventos + dom y entendiendo en ultimo lugar el coordinador que la ia se equivoco en la revision.
Review del pull request 170: En esta pull reques se revisa que se apliquen los filtros de peliculas.Se hizo una revisión y no se encontro nada.

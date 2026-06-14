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
### Ejemplo de los hallasgos:
```text
=================================
HALLAZGO #1
Archivo: Usuario.js
Línea: 13-17, 25-30, 87-93

Tipo de problema: seguridad
Severidad: alta

Explicación técnica:
La clase Usuario almacena contraseñas en texto plano en this.password y el método toJSON() las serializa directamente. Esto expone credenciales sensibles en cualquier persistencia o transmisión JSON y permite comparaciones inseguras de contraseña.

Sugerencia de mejora:
Mantener únicamente hashes seguros de contraseña en el modelo y omitir el campo de contraseña en la serialización JSON. Use una biblioteca de hashing segura y un método de comparación de hashes.

Ejemplo de código corregido (si aplica):
*"codigo
constructor(id, nombre, email, passwordHash) {
this.id = id ? String(id).trim() : "";
this.nombre = nombre ? String(nombre).trim() : "";
this.email = email ? String(email).trim().toLowerCase() : "";
this.passwordHash = passwordHash ? String(passwordHash).trim() : "";
}

validarPassword(passwordIngresada) {
if (!passwordIngresada || String(passwordIngresada).trim() === "") {
return false;
}

return comparePasswordHash(String(passwordIngresada).trim(), this.passwordHash);
}

toJSON() {
return {
id: this.id,
nombre: this.nombre,
email: this.email,
};
}"
DECISIÓN IEL REVISOR HUMANO:

[ ] Aceptar sugerencia
[x] Rechazar sugerencia

Justificación del revisor humano:
" No se solicita en esta actividad una biblioteca hashing
```
.Se puede ver un ajuste manual en la decicion del revisor humano
### Output generado por Copilot Agent

Durante el proceso de revisión, Copilot Agent Mode identificó un total de **26 hallazgos** distribuidos entre las distintas Pull Requests analizadas. Los hallazgos estuvieron relacionados principalmente con:

- Errores lógicos que podían generar excepciones en tiempo de ejecución.
- Problemas de serialización y deserialización de datos.
- Inconsistencias entre la interfaz de usuario y la lógica de negocio.
- Validaciones insuficientes en métodos y modelos del dominio.
- Posibles problemas de mantenimiento y legibilidad del código.
- Riesgos asociados a la migración hacia módulos ES6.
- Comportamientos inesperados en la gestión de almacenamiento local (Storage).

Cada hallazgo fue revisada por el coordinador y analizado junto con el integrante responsable del rol asociado a la Pull Request.Para descubir hallazgo improcedentes (Podian ser porque la ia halla errado en el diagnostico ,Porque podia pedir cosas no cosideradas en la consignas o habia hallazgos que lo tenian que solucionar otro rol ).Siempre se pidio una justificación del porque el hallazgo era improcedente  , quien determinava si correspondía aplicar la corrección o descartar el hallazgo cuando no era aplicable al alcance de la actividad era en ultima intancia el coordinador. Como resultado, la mayoría de los problemas identificados fueron corregidos y validados antes de la integración final.

### Ajustes manuales realizados

Los ajustes manuales realizados después de la salida de Copilot Agent Mode consistieron en:

- Verificación individual de cada hallazgo para determinar su relevancia respecto a los requisitos de la actividad.
- Descarte de observaciones consideradas fuera del alcance del proyecto, como recomendaciones de seguridad avanzadas no solicitadas en la consigna.
- Validación funcional de las correcciones implementadas antes de aprobar cada Pull Request.
- Solicitud de modificaciones adicionales mediante revisiones humanas cuando se detectaron problemas no contemplados por la herramienta.
- Actualización de comentarios y documentación de las Pull Requests para dejar registro de las decisiones tomadas.
- Confirmación de que todas las observaciones marcadas como resueltas efectivamente corregían el comportamiento reportado.

La combinación de revisiones automáticas y validaciones manuales permitió asegurar que las decisiones técnicas estuvieran alineadas con los objetivos de la actividad y con el estado real del proyecto.

### Conclusión

El proceso de code review utilizó Copilot Agent Mode como herramienta de apoyo, combinado con revisiones humanas para garantizar calidad y contexto adecuado.

La herramienta permitió detectar de forma temprana errores lógicos, inconsistencias de implementación y oportunidades de mejora en distintas áreas del sistema. Sin embargo, todas las observaciones fueron evaluadas por revisores humanos, quienes analizaron su pertinencia respecto a los requisitos de la actividad y el contexto del proyecto.

Gracias a este enfoque combinado se logró:

- Resolver los problemas técnicos identificados antes de la integración.
- Documentar adecuadamente los hallazgos y las decisiones tomadas.
- Mantener la trazabilidad de las correcciones realizadas.
- Garantizar el cumplimiento de los criterios de aceptación definidos para la actividad.
- Llegar a la integración final con las funcionalidades validadas, GitHub Pages operativo y la release correspondiente publicada.

En conclusión, el uso conjunto de herramientas de asistencia basadas en IA y revisiones humanas resultó efectivo para mejorar la calidad del código y fortalecer el proceso de aseguramiento de calidad del proyecto. 
### Resumen de cada review

#### Review PR #158: Modelo de Dominio (Usuario, Película, Función, Compra, etc.)
- **Total Hallazgos:** 13
- **Resueltos:** 8
- **Descartados como improcedentes:** 5
- **Ejemplos:**
  - Hallazgo #1:  el método toJSON(), existe error lógico que causa excepción de tiempo de ejecución.  → RESUELTO
  - Hallazgo #2: toJSON() llama this.fechaCreacion.toISOString() sin verificar si fechaCreacion es una fecha válida. Si se crea la instancia con un valor no parseable, toISOString() arrojará un RangeError. → RESUELTO
  - Hallazgo #3: Las contraseñas se almacenan en texto plano y se serializan sin encriptación en toJSON(). Esto viola OWASP A02:2021: → DESCARTADO (No se pedia en esta actividad)

#### Review PR #160: Adaptación Módulos ES6
- **Total Hallazgos:** 2
- **Descartados como improcedentes::** 2 (Por la justificación de quien hizo el rol)
- **Estado:** ✅ 
- **Ejemplos:**
 - Hallazgo #1:El archivo index.html carga js/script.js como un script clásico sin type="module". Las clases en js/models/ usan sintaxis ES Modules (import / export), por lo que el navegador no podrá resolver esas dependencias desde el DOM actual y no se carga ningún módulo ES. -> Descartado 
#### Review PR #161: Storage CRUD
- **Primera Review:**
  - Total Hallazgos: 3
  - Resueltos: 3
 **Ejemplos:**
  - Hallazgo #1:_serialize() devuelve undefined cuando el valor es undefined, porque JSON.stringify(undefined) retorna undefined. Entonces storage.setItem() recibe un valor no válido y puede terminar guardando la cadena "undefined" o fallar de manera inesperada. -> RESUELTO
  - Hallazgo #2: _deserialize() solo intenta parsear valores que comienzan con { o [. Esto rompe los valores primitivos JSON válidos como números, booleanos y strings serializados, y también convierte en null cualquier string que comienza con { } o [ ] pero no es JSON válido.
- **Segunda Review:**
  - Total Hallazgos: 4
  - Resueltos: 4
  **Ejemplos:** 
  - Hallazgo #3:La función _deserialize() analiza cualquier string que comience con { o [ como JSON. Si se almacena intencionalmente una cadena plana que empieza con ese carácter, se devolverá un objeto/array en lugar de la cadena original, lo que rompe la semántica de tipos de storage.
- **Estado:** ✅

#### Review PR #169: Eventos y DOM
- **Total Hallazgos:** 4
- **Resueltos:** 2
- **Descartados:** 2 (justificación válida de quien hizo el rol)
**Ejemplos:**
- Hallazgo #1:El código inicializa el almacenamiento con estadoApp.storage = window.StorageUtil || null;, pero el archivo js/utils/storage.js fue eliminado en esta rama y no existe ninguna otra definición de StorageUtil en el repo. Eso significa que todas las llamadas a persistirDato, obtenerDato y guardarEnListaStorage no harán nada y la app perderá persistencia sin avisar. -> Descartado
- Hallazgo #2: El formulario de filtros incluye selecciones para #cine e #idioma, pero obtenerFiltrosPeliculas() solo construye filtros para título, categoría y clasificación. Eso deja controles de UI visibles que no afectan la búsqueda, generando una experiencia inconsistente para el usuario. -> Resuelto

#### Review PR #170: Filtros de Películas
- **Total Hallazgos:** 0
- **Estado:** ✅ Sin observaciones

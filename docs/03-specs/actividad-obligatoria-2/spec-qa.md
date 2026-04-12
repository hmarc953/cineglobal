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
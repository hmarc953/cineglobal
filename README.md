# CineGlobal

## Datos Académicos

- Carrera: Tecnicatura Universitaria en Programación de Sistemas
- Materia: Programación Web I

## Descripción

### Breve descripción del proyecto
CineGlobal es una aplicación web front-end que permite visualizar películas y 
horarios de funciones de distintos cines a partir de datos estáticos o mock.

Tecnologías utilizadas:
- HTML
- CSS
- Bootstrap 5.3.3 (CDN vía jsDelivr)
- JavaScript (ES6+)
- Jasmine 5.10.0 (testing via CDN)
- PlantUML (diagramas de actividades)

### Objetivo del entregable
Esta entrega corresponde a la Actividad Obligatoria 4, que continúa desde la A3 
eliminando completamente el uso de prompt() y alert() para implementar una 
interfaz web moderna. Se implementa interactividad completa mediante eventos 
del usuario y manipulación del DOM, se refactoriza el código con Programación 
Orientada a Objetos, se agrega persistencia de datos con localStorage y 
sessionStorage, y se extiende la cobertura de testing automatizado usando 
Jasmine.

###  Descripción del trabajo realizado
Actualización de documentación coordinadora (DevOps):
- Incorporación de cambios y correcciones de la Actividad Obligatoria N°3 en `README.md`, `plan.md` y documentación de seguimiento.
- Actualización del `changelog.md` con la nueva release de A4 y backport de correcciones de A3.
- Creación o ajuste del spec DevOps para A4 con plan de coordinación y criterios de aceptación.
- Reorganización de roles del equipo y ajustes en la estructura del proyecto para reflejar nuevas responsabilidades en A4.

### Funcionalidades del Proyecto (Histórico)

#### Completadas en entregas previas (A1, A2, PP, A3)
- [x] Estructura de página con listado de películas
- [x] Vista de detalle de película con información básica y horarios de funciones
- [x] Estilos CSS aplicados para mejorar la apariencia visual y soporte responsive
- [x] Integración de Bootstrap 5 con componentes avanzados (navbar, modal, carousel)
- [x] Diseño responsive validado en desktop, tablet y móvil
- [x] Menú de navegación interactivo mediante `prompt()` con acceso a los 4 flujos
- [x] Flujo 1 - Inicio de sesión: valida credenciales del usuario
- [x] Flujo 2 - Compra de entrada: permite seleccionar película, función y cantidad
- [x] Flujo 3 - Filtros: filtra el catálogo según criterios
- [x] Flujo 4 - Consultar soporte: permite describir problemas
- [x] Validación de entradas en todos los flujos
- [x] Testing automatizado con Jasmine
- [x] Diagramas de actividades en PlantUML

#### En desarrollo para esta entrega (A4)
- [x] Eliminar completamente el uso de prompt() y alert() para migrar a una interfaz web moderna
- [x] Implementar interactividad completa mediante eventos del usuario y manipulación del DOM
- [x] Refactorizar el código aplicando Programación Orientada a Objetos (POO)
- [x] Implementar persistencia de datos usando localStorage y/o sessionStorage
- [x] Mantener y extender la cobertura de testing automatizado

## Documentación

- Mockup A1: [Ver diseño inicial](docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png)
- Mockup A2: [Ver diseño con estilos](docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png) · [Abrir en Figma](https://www.figma.com/design/NfChLFCsX27WSaDCEiaevS/Sin-t%C3%ADtulo?node-id=69-81&m=dev&t=UOqRl9HcyQYB4uCQ-1)
- Mockup PP: [Ver diseño bootstrap](docs/01-mockup/primer-parcial/diseño-bootstrap.png) · [Abrir en Figma](https://www.figma.com/proto/iFkK0k0pcsUrl8ZD1FvE8E/Cineglobal-Primer-Parcial?node-id=83-178&p=f&t=Gy7wEVFcQtWgGqQg-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=83%3A178)
- Mockup A3: [Ver diseño](docs/01-mockup/actividad-obligatoria-3/diseño-con-flujos.png) · [Abrir en Figma](https://www.figma.com/proto/Xk7vwqJNdLzY66x0859tXS/Cineglobal-A3?node-id=83-178&p=f&t=uBPoXwkkepZQlUlm-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=83%3A178)
- Diagramas de Actividades: [Ver índice de diagramas](docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md)
- Especificaciones de Rol (A3): [Arquitecto](docs/03-specs/actividad-obligatoria-3/spec-arq-diagramas.md) · [Desarrollo JS](docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md) · [Testing](docs/03-specs/actividad-obligatoria-3/spec-tester.md) · [DevOps](docs/03-specs/actividad-obligatoria-3/spec-devops.md)
- Documentación JavaScript: [Ver especificación técnica](docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md)
- Testing JS: [Reporte de Jasmine](js/test/testing-doc.md) · [Plan de Pruebas](docs/03-specs/actividad-obligatoria-3/spec-tester.md)
- Testing HTML/CSS: [Índice de test cases](docs/04-testing/testing-doc.md)
- Índice de Prompts: [Índice de prompts](docs/02-prompts/prompts.md)
- Changelog: [Ver changelog](changelog.md)

## Integrantes del Grupo

| Nombre completo          | N° de Matrícula | Usuario GitHub | Rol en esta entrega                        |
|--------------------------|-----------------|----------------|--------------------------------------------|
| Santiago Ariel Samitier  | 148249          | @Santi22-7     | Coordinador / DevOps + Tester QA           |
| Alejandro Bartomioli     | 153041          | @abartomioli   | Desarrollador JS Eventos + DOM             |
| Milagros Magali Araujo   | 148197          | @9919-Mili     | Desarrollador JS Local y Session Storage   |
| Marc Holste              | 160313          | @hmarc953      | Desarrollador JS POO                       |
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
Esta entrega corresponde a la Actividad Obligatoria 3, e integra la lógica de 
negocio fundamental de CineGlobal mediante JavaScript puro. Se implementan 4 
flujos principales del sistema accesibles a través de un menú interactivo con 
prompt(), con testing automatizado usando Jasmine y diagramas de actividades 
en PlantUML que modelan cada flujo antes de su implementación.

### Funcionalidades del Proyecto (Histórico)

#### Completadas en entregas previas (A1, A2, PP)
- [x] Estructura de página con listado de películas
- [x] Vista de detalle de película con información básica y horarios de funciones
- [x] Estilos CSS aplicados para mejorar la apariencia visual y soporte responsive
- [x] Integración de Bootstrap 5 con componentes avanzados (navbar, modal, carousel)
- [x] Diseño responsive validado en desktop, tablet y móvil

#### En desarrollo para esta entrega (A3)
- [ ] Menú de navegación interactivo mediante `prompt()` con acceso a los 4 flujos
- [ ] Flujo 1 - Inicio de sesión: valida credenciales del usuario (nombre de 
      usuario y contraseña) simulando el acceso al sistema
- [ ] Flujo 2 - Compra de entrada: permite seleccionar película, función y 
      cantidad de entradas.
- [ ] Flujo 3 - Filtros: filtra el catálogo de películas según criterios como 
      género, cine o franja horaria
- [ ] Flujo 4 - Consultar soporte: permite al usuario describir su problema y 
      obtener una respuesta o derivación según el tipo de consulta
- [ ] Validación de entradas del usuario en todos los flujos
- [ ] Testing automatizado con Jasmine (4 suites, una por flujo)
- [ ] Diagramas de actividades en PlantUML para cada flujo

## Documentación

- Mockup A1: [Ver diseño inicial](docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png)
- Mockup A2: [Ver diseño con estilos](docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png) · [Abrir en Figma](https://www.figma.com/design/NfChLFCsX27WSaDCEiaevS/Sin-t%C3%ADtulo?node-id=69-81&m=dev&t=UOqRl9HcyQYB4uCQ-1)
- Mockup PP: [Ver diseño bootstrap](docs/01-mockup/primer-parcial/diseño-bootstrap.png) · [Abrir en Figma](https://www.figma.com/proto/iFkK0k0pcsUrl8ZD1FvE8E/Cineglobal-Primer-Parcial?node-id=83-178&p=f&t=Gy7wEVFcQtWgGqQg-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=83%3A178)
- Mockup A3: [Ver diseño](docs/01-mockup/actividad-obligatoria-3/diseño-con-flujos.png) · [Abrir en Figma](https://www.figma.com/proto/Xk7vwqJNdLzY66x0859tXS/Cineglobal-A3?node-id=83-178&p=f&t=uBPoXwkkepZQlUlm-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=83%3A178)
- Diagramas de Actividades: [Ver índice de diagramas](docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md)
- Testing JS: [Ver documentación de testing](js/test/testing-doc.md)
- Testing HTML/CSS: [Índice de test cases](docs/04-testing/testing-doc.md)
- Índice de Prompts: [Índice de prompts](docs/02-prompts/prompts.md)
- Changelog: [Ver changelog](changelog.md)

## Integrantes del Grupo

| Nombre completo          | N° de Matrícula | Usuario GitHub | Rol en esta entrega                        |
|--------------------------|-----------------|----------------|--------------------------------------------|
| Alejandro Bartomioli     | 153041          | @abartomioli   | Coordinador / DevOps                       |
| Marc Holste              | 160313          | @hmarc953      | Arquitecto de Diagramas de Actividades     |
| Santiago Ariel Samitier  | 148249          | @Santi22-7     | Desarrollador JavaScript                   |
| Milagros Magali Araujo   | 148197          | @9919-Mili     | Tester JavaScript / QA Engineer            |
# CineGlobal

## Datos Académicos

- N° de matrícula: 148249
- N° de mesa: 645008
- Carrera: Tecnicatura Universitaria en Programación de Sistemas
- Materia: Programación Web I
- Profesor: Lic. Matías Velasquez
- Año: 2026

## Descripción

### Introducción

CineGlobal es una aplicación web creada para consultar y explorar la cartelera de películas, junto con sus funciones y horarios, mediante una interfaz intuitiva y de fácil utilización. El proyecto fue desarrollado para cumplir con los requerimientos establecidos en la Actividad Obligatoria N.º 1, incluyendo la visualización de películas disponibles, el acceso a la información detallada de cada una, la selección de funciones, la aplicación de filtros de búsqueda y un diseño adaptable tanto a computadoras como a dispositivos móviles.

Durante la Actividad Obligatoria N.º 1 se llevó a cabo un estudio enfocado en la organización de la información, la experiencia de navegación y la representación adecuada de los datos relacionados con el cine. A partir de este análisis se definieron los procesos principales del sistema, como la consulta de películas, la visualización de funciones disponibles y la validación de la compra de entradas. Estos resultados sirvieron como base para estructurar el desarrollo del proyecto, priorizando una experiencia de usuario clara y una presentación ordenada de la información.

### Stack tecnológico

El sistema fue implementado utilizando **HTML**, **CSS** y **JavaScript (ES6+)**, tecnologías responsables de la estructura, el diseño y la lógica de la aplicación. Para facilitar la construcción de una interfaz adaptable y uniforme se incorporó **Bootstrap**, mientras que las APIs nativas del navegador, como **Fetch**, permiten obtener información de manera asíncrona. Asimismo, **localStorage** y **sessionStorage** se utilizan para almacenar información localmente y conservar datos durante el uso de la aplicación.

En cuanto a la documentación y el proceso de desarrollo, se empleó **PlantUML** para la elaboración de diagramas de actividades y **Jasmine** como herramienta para la creación y ejecución de pruebas automatizadas, contribuyendo a verificar el correcto funcionamiento del sistema.

## Anexos

- [Mesa N° 645008 - Matrícula N° 148249 - Anexo "Frameworks & NodeJS"](..//cineglobal/anexos-mesa-645008-matricula-148249/anexos.md)
- [Mesa N° 645005 - Matrícula N° 160313 - Anexo "Frameworks & NodeJS"](//anexos-mesa-645005-matricula-160313/anexos.md)

### Funcionalidades del Proyecto (Histórico)

#### Completadas en entregas previas (A1, A2, PP, A3, A4)
- [x] Estructura de página con listado de películas
- [x] Vista de detalle de película con información básica y horarios de funciones
- [x] Estilos CSS aplicados para mejorar la apariencia visual y soporte responsive
- [x] Integración de Bootstrap 5 con componentes avanzados (navbar, modal, carousel)
- [x] Diseño responsive validado en desktop, tablet y móvil
- [x] Flujo 1 - Inicio de sesión: valida credenciales del usuario
- [x] Flujo 2 - Compra de entrada: permite seleccionar película, función y cantidad
- [x] Flujo 3 - Filtros: filtra el catálogo según criterios
- [x] Flujo 4 - Consultar soporte: permite describir problemas
- [x] Validación de entradas en todos los flujos
- [x] Diagramas de actividades en PlantUML
- [x] Eliminar completamente el uso de prompt() y alert() para migrar a una interfaz web moderna
- [x] Implementar interactividad completa mediante eventos del usuario y manipulación del DOM
- [x] Refactorizar el código aplicando Programación Orientada a Objetos (POO)
- [x] Implementar persistencia de datos usando `localStorage` y `sessionStorage`
- [x] Modularizar el código JavaScript mediante ES Modules
- [x] Ampliar la cobertura de testing automatizado con Jasmine

#### En desarrollo para esta entrega (Segundo Parcial)
- [x] Implementar consumo asíncrono de datos con `fetch`
- [x] Obtener datos desde una API externa o un archivo JSON
- [x] Manejar estados de carga, éxito y error
- [x] Procesar colecciones con `map`, `filter` y `reduce`
- [x] Integrar una librería externa de JavaScript mediante CDN
- [x] Sumar tests Jasmine para funciones asíncronas
- [x] Sumar tests Jasmine para la librería externa
- [x] Realizar auditorías Lighthouse baseline, post-fetch y post-librería
- [x] Actualizar la documentación técnica, el README y el changelog
- [x] Preparar la rama `release/segundo-parcial`

## Documentación

- Mockup A1: [Ver diseño inicial](docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png)
- Mockup A2: [Ver diseño con estilos](docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png) · [Abrir en Figma](https://www.figma.com/design/NfChLFCsX27WSaDCEiaevS/Sin-t%C3%ADtulo?node-id=69-81&m=dev&t=UOqRl9HcyQYB4uCQ-1)
- Mockup PP: [Ver diseño bootstrap](docs/01-mockup/primer-parcial/diseño-bootstrap.png) · [Abrir en Figma](https://www.figma.com/proto/iFkK0k0pcsUrl8ZD1FvE8E/Cineglobal-Primer-Parcial?node-id=83-178&p=f&t=Gy7wEVFcQtWgGqQg-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=83%3A178)
- Mockup A3: [Ver diseño](docs/01-mockup/actividad-obligatoria-3/diseño-con-flujos.png) · [Abrir en Figma](https://www.figma.com/proto/Xk7vwqJNdLzY66x0859tXS/Cineglobal-A3?node-id=83-178&p=f&t=uBPoXwkkepZQlUlm-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=83%3A178)
- Diagramas de Actividades: [Ver índice de diagramas](docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md)
- Documentación JavaScript: [Ver especificación técnica](docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md)
- Documentacion Libreria: [Ver documentacion - Toastify](docs/07-librerias/libreria-doc.md)
- Testing JS: [Reporte de Jasmine](js/test/testing-doc.md) · [Plan de Pruebas](docs/03-specs/actividad-obligatoria-3/spec-tester.md)
- Testing HTML/CSS: [Índice de test cases](docs/04-testing/testing-doc.md)
- Índice de Prompts: [Índice de prompts](docs/02-prompts/prompts.md)
- Changelog: [Ver changelog](changelog.md)

### Especificacion de Roles

#### Actividad Obligatoria 1
- [DevOps](docs/03-specs/actividad-obligatoria-1/spec-devops.md)
- [Desarrollador Frontend](docs/03-specs/actividad-obligatoria-1/spec-frontend.md)  
- [Diseñador UX](docs/03-specs/actividad-obligatoria-1/spec-ux.md) 
- [Especialista en IA](docs/03-specs/actividad-obligatoria-1/spec-ia.md) 

#### Actividad Obligatoria 2
- [DevOps](docs/03-specs/actividad-obligatoria-2/spec-devops.md)
- [Desarrollador Frontend/CSS](docs/03-specs/actividad-obligatoria-2/spec-frontend.md) 
- [Especialista en Responsive Design](docs/03-specs/actividad-obligatoria-2/spec-responsive.md) 
- [QA Tester](docs/03-specs/actividad-obligatoria-2/spec-qa.md) 

#### Primer Parcial
- [DevOps](docs/03-specs/primer-parcial/spec-devops.md)
- [Desarrollador Frontend/Bootstrap](docs/03-specs/primer-parcial/spec-frontend-bootstrap.md) 
- [Especialista en Componentes Bootstrap](docs/03-specs/primer-parcial/spec-componentes-bootstrap.md) 
- [Desarrollador de Componentes HTML Avanzados](docs/03-specs/primer-parcial/spec-html-avanzados.md) 

#### Actividad Obligatoria 3
- [DevOps](docs/03-specs/actividad-obligatoria-3/spec-devops.md)
- [Arquitecto de diagrama de actividades](docs/03-specs/actividad-obligatoria-3/spec-arq-diagramas.md) 
- [Desarrollo JS](docs/03-specs/actividad-obligatoria-3/spec-dev-javascript.md) 
- [Tester JS/QA Engineer](docs/03-specs/actividad-obligatoria-3/spec-tester.md) 

#### Actividad Obligatoria 4
- [DevOps](docs/03-specs/actividad-obligatoria-4/spec-devops.md)
- [Desarrollador JS Eventos + DOM](docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md) 
- [Desarrollador JS POO](docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md) 
- [Desarrollador JS Local y Session Storage](docs/03-specs/actividad-obligatoria-4/spec-dev-storage.md) 
- [Tester QA](docs/03-specs/actividad-obligatoria-4/spec-tester-qa.md) 

#### Segundo Parcial
- [DevOps](docs/03-specs/segundo-parcial/spec-coord-devops-segundo-parcial.md)
- [Desarrollador JS Librerías Externas](docs/03-specs/segundo-parcial/spec-dev-libreria-externa.md)
- [Desarrollador JS Asíncrono - Fetch&APIs](docs/03-specs/segundo-parcial/spec-dev-async-fetch.md)
- [Tester QA/JS - Testing Avanzado](docs/03-specs/segundo-parcial/spec-tester-qa-segundo-parcial.md)



## Integrantes del Grupo

| Nombre completo          | N° de Matrícula | Usuario GitHub | Rol en esta entrega                         |
|--------------------------|-----------------|----------------|---------------------------------------------|
| Santiago Ariel Samitier  | 148249          | @Santi22-7     | Desarrollador JS Asincrono - Fetch & APIs   |
| Alejandro Bartomioli     | 153041          | @abartomioli   | Desarrollador JS Librerias Externas         |
| Milagros Magali Araujo   | 148197          | @9919-Mili     | Tester QA/JS - Testing Avanzado             |
| Marc Holste              | 160313          | @hmarc953      | Coordinador / DevOps - Gestion y Resolucion |



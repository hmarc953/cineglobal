# Anexo - Frameworks & NodeJS

## Datos de la entrega

- **Aplicación:** CineGlobal
- **Estudiante:** Marc Holste
- **Matrícula:** 160313
- **Mesa:** 645005
- **Carrera:** Tecnicatura Universitaria en Programación de Sistemas
- **Materia:** Programación Web I
- **Profesor:** Lic. Matías Velasquez
- **Año:** 2026

## Introducción

CineGlobal es una aplicación web front-end destinada a consultar películas, funciones y cines, aplicar filtros, iniciar sesión, registrar usuarios, realizar una simulación de compra y enviar consultas de soporte. La versión actual fue desarrollada con HTML, CSS, Bootstrap y JavaScript ES6+, utiliza módulos, manipulación directa del DOM, eventos, programación orientada a objetos, almacenamiento web y consumo asíncrono de datos.

Este anexo analiza herramientas que podrían utilizarse en una evolución del proyecto. El objetivo no es migrar la aplicación durante esta entrega, sino estudiar dos alternativas y comparar su posible incorporación con la solución actual en Vanilla JavaScript.

## Frameworks y herramientas de desarrollo con JavaScript

JavaScript puede utilizarse junto con diferentes tipos de herramientas:

- **Frameworks:** proporcionan una estructura general, convenciones y soluciones integradas para desarrollar una aplicación. Angular es un ejemplo de este enfoque.
- **Bibliotecas:** resuelven necesidades específicas y permiten que el equipo decida cómo organizar el resto de la aplicación. React es una biblioteca orientada a la construcción de interfaces de usuario, aunque suele estudiarse junto con los frameworks front-end por el rol central que ocupa dentro de una aplicación.
- **Entornos de ejecución:** permiten ejecutar JavaScript fuera del navegador. Node.js pertenece a esta categoría.
- **Gestores de paquetes y herramientas de construcción:** npm permite instalar dependencias y ejecutar scripts; herramientas como Vite pueden preparar, transformar y servir una aplicación durante el desarrollo.

## Node.js

Node.js es un entorno de ejecución de JavaScript gratuito, de código abierto y multiplataforma. Ejecuta el motor V8 fuera del navegador y permite crear servidores, aplicaciones web, herramientas de línea de comandos y scripts. Su modelo de entrada y salida asíncrona resulta apropiado para operaciones como solicitudes de red, lectura de archivos y acceso a bases de datos.

En CineGlobal, el código de interfaz se ejecuta actualmente en el navegador. El repositorio también contiene un archivo `package.json` y dependencias administradas con npm, por lo que Node.js puede utilizarse como herramienta de desarrollo. En una evolución full stack, Node.js también podría incorporarse para implementar un backend que centralice usuarios, compras, funciones y consultas de soporte, en lugar de depender solamente del almacenamiento del navegador.

## Stack MERN

MERN reúne cuatro tecnologías principales:

| Tecnología | Función dentro del stack |
|---|---|
| **MongoDB** | Base de datos orientada a documentos. |
| **Express.js** | Framework para construir el servidor y las rutas HTTP sobre Node.js. |
| **React** | Biblioteca utilizada para desarrollar la interfaz de usuario. |
| **Node.js** | Entorno de ejecución del backend y de herramientas de desarrollo. |

Una posible versión MERN de CineGlobal podría utilizar React para las tarjetas, filtros y modales; Express y Node.js para exponer una API propia; y MongoDB para persistir usuarios, películas, compras y consultas.

## Stack MEAN

MEAN utiliza la misma base tecnológica para los datos y el backend, pero reemplaza React por Angular:

| Tecnología | Función dentro del stack |
|---|---|
| **MongoDB** | Base de datos orientada a documentos. |
| **Express.js** | Framework para construir el servidor y las rutas HTTP sobre Node.js. |
| **Angular** | Framework utilizado para desarrollar la aplicación front-end. |
| **Node.js** | Entorno de ejecución del backend y de herramientas de desarrollo. |

Una versión MEAN de CineGlobal podría organizar la interfaz en componentes Angular y utilizar servicios para comunicarse con un backend construido con Express y Node.js.

## MERN vs. MEAN

La principal diferencia entre ambos stacks se encuentra en la capa de presentación: MERN utiliza React y MEAN utiliza Angular. MongoDB, Express.js y Node.js se mantienen en ambos casos.

| Criterio | MERN | MEAN |
|---|---|---|
| Herramienta front-end | React | Angular |
| Tipo de herramienta | Biblioteca de interfaces | Framework completo |
| Lenguaje habitual del front-end | JavaScript o TypeScript con JSX/TSX | TypeScript con plantillas HTML |
| Organización | Más flexible; el equipo elige varias herramientas complementarias | Más estructurada; integra convenciones y soluciones oficiales |
| Adaptación estimada para CineGlobal | Permite una migración progresiva por componentes | Requiere una reorganización más amplia desde el comienzo |
| Caso favorable | Equipos que buscan flexibilidad y adopción gradual | Equipos que prefieren una arquitectura integral y homogénea |

No existe una opción universalmente superior. MERN podría facilitar una modernización gradual de la interfaz actual, mientras que MEAN podría resultar conveniente si se decide reconstruir CineGlobal como una aplicación empresarial con una estructura uniforme desde el inicio.

## Frameworks seleccionados

Para el análisis se eligieron las siguientes tecnologías:

1. **[React](framework-react.md):** permite comparar el renderizado manual de las tarjetas de películas con una solución basada en componentes reutilizables.
2. **[Angular](framework-angular.md):** permite analizar cómo el flujo de compra y sus campos dinámicos podrían reorganizarse mediante componentes, plantillas y enlace de datos.

La selección también permite relacionar directamente el proyecto con los stacks MERN y MEAN solicitados en la consigna.

## Alcance del análisis

Los ejemplos incluidos son propuestas ilustrativas de migración. No fueron incorporados al código productivo de CineGlobal y no modifican el funcionamiento actual. Cada documento enlaza el archivo y las líneas de Vanilla JavaScript utilizadas como punto de comparación.

## Fuentes consultadas

- [React - Documentación oficial](https://react.dev/)
- [Angular - Documentación oficial](https://angular.dev/overview)
- [Node.js - Introducción oficial](https://nodejs.org/learn)
- [MongoDB - Explicación del stack MERN](https://www.mongodb.com/es/resources/languages/mern-stack)
- [MongoDB - Explicación del stack MEAN](https://www.mongodb.com/es/resources/languages/mean-stack)

Consulta realizada el 26 de julio de 2026.

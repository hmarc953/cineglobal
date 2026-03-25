# Plan Maestro del Proyecto CineGlobal

## 1. Objetivo del proyecto

CineGlobal es una aplicación web front-end que permite visualizar películas y horarios de funciones de distintos cines a partir de datos estáticos o mock. El objetivo es construir una interfaz usable en HTML/CSS/JavaScript para aprender conceptos de desarrollo web.

## 2. Alcance de esta primera entrega

Esta primera entrega incluye:

- Estructura de página con listado de películas.
- Vista de detalle de película (información básica y horarios de funciones).
- Interfaz web diseñada para visualización en escritorio.
- Documentación del proyecto en `README.md` y `plan.md`.

## 3. Actores o usuarios del sistema

- **Usuario final**: persona que consulta películas y horarios.
- **Desarrollador**: persona que construye y prueba la página.

## 4. Requerimientos funcionales del sistema

- **RF-01**: Mostrar lista de películas con su título, género y sinopsis breve.
- **RF-02**: Permitir filtrar películas por cine y/o género.
- **RF-03**: Mostrar detalles de una película seleccionada (sinopsis, duración, clasificación, horarios).
- **RF-04**: El usuario puede navegar entre la lista de películas y la vista de detalle mediante enlaces o botones.

## 5. Reglas o supuestos del sistema

- No se implementa backend ni base de datos.
- Los horarios y datos de películas serán estáticos (mock) definidos en el front-end.
- El foco es aprender HTML y manipulación del DOM.

## 6. Funcionalidades previstas para futuras iteraciones

- Cargar datos desde un archivo JSON local.
- Mejora de la vista de detalle con carteles y valoraciones.
- Guardar favoritos en localStorage.


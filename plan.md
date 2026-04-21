# Plan Maestro del Proyecto CineGlobal

## 1. Objetivo del proyecto

CineGlobal es una aplicación web front-end que permite visualizar películas y horarios de funciones de distintos cines a partir de datos estáticos o mock. El objetivo es construir una interfaz usable en HTML/CSS/JavaScript para aprender conceptos de desarrollo web.

## 2. Alcance

### 2.1 Primera entrega

- Estructura de página con listado de películas.
- Vista de detalle de película (información básica y horarios de funciones).
- Interfaz web diseñada para visualización en escritorio.
- Documentación del proyecto en `README.md` y `plan.md`.

### 2.2 Segunda entrega

- Actualizacion de mockup 
- Code Reviews en PR de cada rama feature
- Testeo de las ramas
- Adaptación del diseño CSS para responsividad completa en múltiples resoluciones de pantalla
- Documentación del proyecto en `README.md` y `plan.md`.


### 2.3 Primer parcial

- Integración de Bootstrap 5 mediante CDN, manteniendo la identidad visual del proyecto y asegurando compatibilidad con estilos existentes.
- Implementación del sistema de columnas de Bootstrap para optimizar la respuesta del diseño en dispositivos móviles y tablet.
- Creación de `css/bootstrap-overrides.css` con ajustes personalizados para preservar la identidad visual sobre la base de Bootstrap.
- Incorporación de componentes Bootstrap avanzados como navbar, modal, carousel o accordion, asegurando su funcionamiento coherente con el diseño general.
- Personalización de componentes HTML y Bootstrap para una visualización correcta en los tres dispositivos obligatorios (desktop, tablet, móvil).
- Actualización de la documentación del proyecto, incluyendo mockup del primer parcial, especificaciones DevOps y pruebas relacionadas.

## 3. Actores o usuarios del sistema

- **Usuario final**: persona que consulta películas y horarios.
- **Desarrollador**: persona que construye y prueba la página.

## 4. Requerimientos funcionales del sistema

- **RF-01**: Mostrar lista de películas con su título, género y sinopsis breve.
- **RF-02**: El usuario puede navegar entre la lista de películas y la vista de detalle mediante enlaces o botones.
- **RF-03**: El sistema utiliza Bootstrap 5 para mejorar la responsividad y el diseño visual, manteniendo la identidad del proyecto.
- **RF-04**: Los componentes de la interfaz (navbar, modales, carruseles) funcionan correctamente en desktop, tablet y móvil.
- **RF-05**: El usuario puede interactuar con elementos avanzados como filtros, navegación expandida y vistas modales para una mejor experiencia.

## 5. Reglas o supuestos del sistema

- No se implementa backend ni base de datos.
- Los horarios y datos de películas serán estáticos (mock) definidos en el front-end.
- El foco es aprender HTML

## 6. Funcionalidades previstas para futuras iteraciones

- Cargar datos desde un archivo JSON local.
- Mejora de la vista de detalle con carteles y valoraciones.
- Guardar favoritos en localStorage.


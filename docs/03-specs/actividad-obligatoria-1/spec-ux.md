## Que se hará

Basado en el alcance de la primera entrega del Plan Maestro del Proyecto CineGlobal, que incluye la documentación del proyecto en README.md y el diseño de la interfaz web para visualización en escritorio, se realizarán las siguientes actividades:

## Justificativo
- Usando GitHub Copilot en modo Agente, generar el README.md del proyecto, que documentará el título, descripción, objetivos, tecnologías, funcionalidades y enlace al mockup.
- Diseñar el mockup de la interfaz, mostrando la estructura visual clara con secciones como listado de películas, filtros, vista de detalle, jerarquía de contenido y navegación.
- Pedir sugerencias de layout para optimizar la experiencia de usuario, enfocándose en la usabilidad y manipulación del DOM con HTML/CSS/JavaScript.
- Subir la imagen del mockup a la carpeta docs/01-mockup/, específicamente en docs/01-mockup/entrega-1/diseño-inicial.png, y hacer accesible el archivo Figma vía enlace en el README.md.

Esto se justifica porque el proyecto CineGlobal tiene como objetivo construir una interfaz usable para aprender desarrollo web, y la primera entrega requiere documentación y diseño de la interfaz sin backend.

## Criterios de aceptación

### README.md
- [x] Título claro y descripción del proyecto
- [x] Objetivos del proyecto definidos
- [x] Tecnologías utilizadas listadas
- [x] Funcionalidades previstas documentadas
- [x] Enlace al mockup de Figma incluido

### Mockup
- [x] Imagen exportada en docs/01-mockup/entrega-1/diseño-inicial.png
- [x] Mockup muestra estructura visual clara: secciones, jerarquía de contenido y navegación identificables
- [x] Archivo Figma accesible vía link en README.md (necesario para que Frontend Dev use el MCP)

## Documentación de Sugerencias de Layout y Estructura UX

### Qué se pidió a la IA
Se solicitó sugerencias para un layout, estructura de secciones y jerarquía visual para la página web de CineGlobal, basándose en el contenido de plan.md. El enfoque fue en una interfaz usable para escritorio, que permita listar películas, aplicar filtros y ver detalles, utilizando HTML/CSS/JavaScript con manipulación del DOM.

### Qué sugirió la IA
La IA propuso las siguientes sugerencias para el layout y estructura:

1. **Estructura general de la página**:
   - **Header**: Barra superior con el logo "CineGlobal", título del sitio y posible navegación (e.g., enlace a "Inicio" si se expande).
   - **Sección de filtros**: Una barra horizontal o sección dedicada con controles para filtrar por cine y género (usando selectores o checkboxes).
   - **Contenido principal**: Área central con un grid responsivo de tarjetas de películas (3-4 columnas en escritorio).
   - **Footer**: Pie de página con información de copyright o enlaces adicionales.

2. **Estructura de secciones para la vista de listado**:
   - Cada película representada como una tarjeta (card) con:
     - Imagen del poster (thumbnail).
     - Título de la película (fuente grande, negrita).
     - Género (subtítulo).
     - Sinopsis breve (texto truncado).
     - Botón "comprar boletos" para ir a la pagina de compra de boletos.

3. **Vista de detalle**:
   - Implementada como una página separada o modal emergente.
   - Secciones: Poster grande, título, sinopsis completa, duración, clasificación, y lista de horarios por cine (organizados en una tabla o lista).

4. **Jerarquía visual**:
   - **Niveles de encabezados**: H1 para el título principal, H2 para secciones principales (e.g., "Películas Disponibles"), H3 para títulos de películas.
   - **Colores**: Paleta simple con fondo claro, texto oscuro, acentos en azul o rojo para botones y enlaces.
   - **Espaciado y tipografía**: Usar CSS Grid/Flexbox para layout, fuentes sans-serif legibles, márgenes consistentes para separación visual.
   - **Interactividad**: Hover effects en tarjetas, transiciones suaves para filtros y navegación.

5. **Opciones adicionales consideradas**:
   - Sidebar lateral para filtros (en lugar de barra horizontal).
   - Layout de lista en lugar de grid (más simple pero menos visual).
   - Uso de iconos para géneros o cines.

### Qué se decidió usar
- **Layout principal**: Header, barra de filtros horizontal, grid de tarjetas en el contenido principal, footer simple.
- **Estructura de tarjetas**: Con imagen, título, género, sinopsis corta y botón de acción.
- **Vista de detalle**: Página separada para simplicidad en la primera entrega.
- **Jerarquía visual**: Encabezados H1-H3, paleta de colores minimalista, espaciado usando CSS Flexbox/Grid.
- **Enfoque en usabilidad**: Navegación clara, filtros accesibles, contenido scannable.

### Qué se descartó
- Sidebar lateral: Para mantener el layout simple y centrado en el contenido principal, evitando complejidad innecesaria en la primera entrega.
- Layout de lista pura: El grid de tarjetas ofrece mejor visualización de posters y es más engaging para un sitio de cine.
- Iconos complejos: Mantener texto simple para enfocarse en funcionalidad básica.
- Animaciones avanzadas: No necesarias para la entrega inicial; se pueden agregar en iteraciones futuras. 

Estas decisiones se basan en la  priorización de la simplicidad y aprendizaje de HTML/CSS/JS.

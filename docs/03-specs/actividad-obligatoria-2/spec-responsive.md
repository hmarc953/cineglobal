# Especificación de Diseño Responsivo para CineGlobal

## Breakpoints a Implementar

Basándonos en el mockup de Figma y el contenido del sitio web , se implementarán los siguientes breakpoints enfocados en dispositivos comunes para usuarios de cine que acceden desde móviles para consultar horarios y comprar boletos:

- **Mobile**: Hasta 767px. Este breakpoint prioriza la experiencia en smartphones, donde los usuarios navegan rápidamente. Se justifica porque el 60-70% de las consultas de cine se hacen desde móviles según estadísticas de la industria. El header se apila verticalmente, los filtros se convierten en un menú colapsable, y la galería de películas muestra una columna.

- **Tablet**: De 768px a 1023px. Cubre tablets y dispositivos híbridos, permitiendo mostrar más contenido horizontalmente. El mockup sugiere una expansión de la galería a dos columnas, y los filtros se muestran en fila. Se justifica por el uso creciente de tablets para navegación familiar.

- **Desktop**: A partir de 1024px. Para monitores grandes, donde se puede mostrar la galería en múltiples columnas (hasta 4), y todos los elementos del header y nav se expanden completamente, aprovechando el espacio para una experiencia inmersiva similar al mockup original.

Estos breakpoints siguen estándares de la industria del entretenimiento digital y aseguran compatibilidad con dispositivos populares como iPhone, iPad y laptops.

## Enfoque de Layout

Se utilizará una **combinación de Flexbox y CSS Grid** adaptada a la estructura del sitio web de CineGlobal:

- **Flexbox**: Ideal para el header (alinear título y párrafo horizontalmente en desktop, vertical en mobile), el nav con filtros (alinear selects y botón en fila), y las secciones de listas (géneros y cines participantes, que se apilan verticalmente).

- **CSS Grid**: Se aplicará en la galería de imágenes (GALERIA-IMAGENES) para crear una cuadrícula responsiva de películas, cambiando de 1 columna en mobile a 2 en tablet y 3-4 en desktop. También en el main para organizar artículos de películas de manera bidimensional.

Esta combinación permite un layout flexible y eficiente, priorizando mobile-first como se ve en el código HTML actual, y facilitando la adaptación del mockup a diferentes pantallas sin overflow.

## Criterios de Aceptación

- [ ] Breakpoints definidos y documentados (mobile, tablet, desktop).
- [ ] Layout mobile-first implementado.
- [ ] Todas las secciones del mockup se adaptan correctamente en los tres breakpoints.
- [ ] No hay overflow horizontal en ningún dispositivo.
- [ ] Pruebas de integración realizadas con el Desarrollador Frontend en GitHub Pages y localhost.
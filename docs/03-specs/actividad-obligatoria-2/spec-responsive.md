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

- **CSS Grid**: Se aplicará en la galería de imágenes (galeria-imagenes) para crear una cuadrícula responsiva de películas, cambiando de 1 columna en mobile a 2 en tablet y 3-4 en desktop. También en el main para organizar artículos de películas de manera bidimensional.

Esta combinación permite un layout flexible y eficiente, priorizando mobile-first como se ve en el código HTML actual, y facilitando la adaptación del mockup a diferentes pantallas sin overflow.

## Criterios de Aceptación

- [ ] Breakpoints definidos y documentados (mobile, tablet, desktop).
- [ ] Layout mobile-first implementado.
- [ ] Todas las secciones del mockup se adaptan correctamente en los tres breakpoints.
- [ ] No hay overflow horizontal en ningún dispositivo.
- [ ] Pruebas de integración realizadas con el Desarrollador Frontend en GitHub Pages y localhost.

## Promt utilizado para crear resposive.css

User: Hola necesito que crees el archivo responsive.css y utilices como contexto spec-responsive.md , styles.css (Te paso el contenido:

/*
  Archivo: styles.css
  Desarrollador: Frontend/CSS
  Descripción: Variables CSS, reset, tipografías, colores y layout base para CineGlobal.
  Comentarios: Este archivo contiene las variables globales, el reset y la estructura base del layout.
*/

:root {
  /* Variables de color */
  --color-bg-main: #1f1c1c;
  --color-bg-content: #5a5a5a;
  --color-card: #333;
  --color-card-img: #222;
  --color-text-main: #fff;
  --color-text-secondary: #e0e0e0;
  --color-text-muted: #bdbdbd;
  --color-accent: #ff0000;
  --color-footer-bg: #bdbdbd;
  --color-footer-text: #333;
  /* Espaciados */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 40px;
  /* Tipografía */
  --font-main: 'Segoe UI', Arial, sans-serif;
  --font-size-title: 2.2rem;
  --font-size-subtitle: 1.1rem;
  --font-size-card-title: 1.1rem;
  --font-size-card-desc: 1rem;
  --font-size-footer: 1rem;
}

/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--color-bg-main);
  color: var(--color-text-main);
  font-family: var(--font-main);
  min-height: 100vh;
}

.main-container {
  background: var(--color-bg-content);
  max-width: 1100px;
  margin: var(--spacing-xl) auto 0 auto;
  padding: var(--spacing-lg) var(--spacing-md) 0 var(--spacing-md);
  border-radius: 8px;
  box-sizing: border-box;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer {
  background: var(--color-footer-bg);
  color: var(--color-footer-text);
  text-align: center;
  padding: 12px 0;
  font-size: var(--font-size-footer);
  margin-top: var(--spacing-lg);
  border-radius: 0 0 8px 8px;
  width: 100%;
}

/* Responsive */
@media (max-width: 900px) {
  .main-container {
    padding: var(--spacing-md) 2vw 0 2vw;
  }
}

), component.css (Te paso el codigo:

/*
  Archivo: components.css
  Desarrollador: Frontend/CSS
  Descripción: Estilos de componentes: botones, cards, navegación, formularios y estados.
  Comentarios: Este archivo contiene los estilos reutilizables para los componentes principales.
*/

.header {
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.header-title {
  font-size: var(--font-size-title);
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: var(--spacing-xs);
}

.header-subtitle {
  font-size: var(--font-size-subtitle);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.filters {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.filter-select,
.filter-button {
  background: #888;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 1rem;
  cursor: pointer;
  min-width: 120px;
  transition: background 0.2s;
}

.filter-select:after {
  content: "▼";
  margin-left: 8px;
  font-size: 0.8em;
}

.filter-button {
  background: #888;
  font-weight: 500;
}

.filter-button:hover,
.filter-select:hover {
  background: #666;
}

.movies-list {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
  width: 100%;
}

.movie-card {
  background: var(--color-card);
  border-radius: 8px;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 12px 24px 12px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.movie-image {
  background: var(--color-card-img);
  width: 100%;
  height: 180px;
  border-radius: 4px;
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 1.1rem;
}

.movie-title {
  font-size: var(--font-size-card-title);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-main);
  text-align: center;
}

.movie-description {
  font-size: var(--font-size-card-desc);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
  text-align: center;
}

.movie-date {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.buy-button {
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 0;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.buy-button:hover {
  background: #c40000;
}

/* Responsive */
@media (max-width: 900px) {
  .movies-list {
    gap: var(--spacing-md);
  }
  .movie-card {
    width: 220px;
  }
}

@media (max-width: 700px) {
  .movies-list {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }
  .movie-card {
    width: 90vw;
    max-width: 350px;
  }
}

) y el mokup que lo podes ver en mockup.md

## Resultado optenido

Lo que generó Copilot tuvo muchos aciertos pero en la parte mostrar las peliculas tuvo muchos errores en el tema de la estructura pero se pudieron solucionar. Decisiones finales de breakpoints con justificación:

- Se eligió mobile hasta 767px para garantizar legibilidad y navegación sencilla en smartphones, donde se espera la mayor parte del tráfico.
- Se definió tablet de 768px a 1023px para ofrecer un diseño intermedio con dos columnas de películas y filtros visibles sin saturar la pantalla.
- Se estableció desktop desde 1024px para permitir un layout más amplio y estructurado, aprovechando el espacio extra para mostrar múltiples tarjetas de películas y mejorar la experiencia visual.
- Esta decisión se justifica en relación al mockup y al público objetivo: el diseño se adapta de manera progresiva, evitando overflow horizontal y manteniendo la coherencia de la página en todos los dispositivos.
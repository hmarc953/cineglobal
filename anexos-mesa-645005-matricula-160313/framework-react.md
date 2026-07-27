# Framework seleccionado: React

> **Aclaración técnica:** React se define oficialmente como una biblioteca para construir interfaces de usuario. En este anexo se analiza como herramienta de desarrollo front-end dentro del alcance amplio planteado por la consigna y por su utilización en el stack MERN.

## Breve reseña

React permite construir interfaces a partir de componentes: piezas independientes que combinan estructura, comportamiento y presentación. Los componentes pueden recibir información mediante propiedades, mantener estado y volver a renderizar su contenido cuando los datos cambian.

Entre sus características principales se encuentran:

- Desarrollo de interfaces mediante componentes reutilizables.
- Uso de JSX o TSX para expresar la estructura visual junto con la lógica relacionada.
- Renderizado declarativo a partir de propiedades y estado.
- Composición de componentes pequeños para formar pantallas completas.
- Posibilidad de adopción gradual dentro de una aplicación existente.
- Ecosistema amplio de herramientas complementarias para rutas, formularios, testing y manejo de estado.

## Motivación y justificación

React fue elegido porque CineGlobal ya posee varias unidades visuales que podrían convertirse naturalmente en componentes: tarjetas de películas, filtros, formularios, modales, mensajes de estado y resúmenes de compra.

Actualmente, `peliculasView.js` crea elementos, asigna clases, construye HTML mediante una plantilla de texto y agrega el resultado al DOM. Este enfoque funciona para el alcance actual, pero la complejidad aumenta cuando cada tarjeta necesita más estados, eventos o variantes visuales.

Con React, la cartelera podría dividirse al menos en dos componentes:

- `Cartelera`, responsable de recorrer la colección y mostrar el estado sin resultados.
- `PeliculaCard`, responsable de representar una película y comunicar la acción de compra.

Esto beneficiaría al proyecto porque:

- Evitaría concentrar la construcción completa de las tarjetas en una sola función de manipulación del DOM.
- Facilitaría reutilizar una tarjeta en otras vistas, como favoritos, estrenos o resultados de búsqueda.
- Mantendría sincronizada la interfaz con la colección de películas recibida mediante propiedades.
- Simplificaría la asociación entre cada botón y su película mediante eventos declarados en el componente.
- React escapa de forma predeterminada los valores insertados en JSX, reduciendo la necesidad de construir manualmente cadenas HTML con datos variables.

## Nivel de dificultad de adaptación

**Nivel estimado: medio.**

La curva de aprendizaje sería moderada porque el proyecto ya utiliza JavaScript ES6+, módulos, colecciones, eventos y una separación parcial entre modelos, servicios y vistas. Esos conocimientos son transferibles a React.

Una adopción gradual permitiría conservar:

- Las clases del dominio ubicadas en `js/models/`.
- El servicio de API ubicado en `js/api/apiService.js`.
- Las utilidades de almacenamiento que no dependan directamente del DOM.
- Los estilos actuales de Bootstrap y las hojas CSS propias.

Los cambios principales serían:

1. Incorporar un entorno de desarrollo y construcción compatible con JSX, por ejemplo Vite.
2. Crear un punto de montaje para React dentro de `index.html`.
3. Reemplazar progresivamente las funciones que manipulan el DOM por componentes.
4. Trasladar el estado global y los eventos de interfaz a propiedades, estado y hooks.
5. Adaptar las pruebas para renderizar componentes y simular interacciones.

Una migración completa tendría una dificultad mayor, especialmente por la cantidad de formularios y modales existentes. Sin embargo, la cartelera podría utilizarse como prueba de concepto aislada antes de migrar el resto de la aplicación.

## Ejemplo de código: antes y después

### Antes: Vanilla JavaScript

**Ubicación:** [`js/utils/peliculasView.js`, líneas 30 a 62](../js/utils/peliculasView.js#L30-L62)

El código actual crea un fragmento, recorre la colección, construye manualmente cada tarjeta y finalmente la agrega al contenedor:

```js
const fragmento = document.createDocumentFragment();

peliculas.forEach((pelicula, indice) => {
  const tituloSeguro = escaparHTML(pelicula.titulo);
  const categoriaSegura = escaparHTML(pelicula.categoria);
  const clasificacionSegura = escaparHTML(pelicula.clasificacion);
  const idSeguro = escaparHTML(pelicula.id);
  const imagenSegura = escaparHTML(
    pelicula.imagen || 'assets/images/cinema-hall-bg.jpg'
  );
  const fechaIsoSegura = escaparHTML(
    formatearFechaISO(pelicula.fechaEstreno)
  );
  const fechaVisibleSegura = escaparHTML(
    formatearFechaVisible(pelicula.fechaEstreno)
  );
  const columna = document.createElement('div');
  columna.className = 'col-12 col-md-6 col-lg-3';
  columna.innerHTML = `
    <article class="movie-card" data-state="success">
      <img class="movie-image img-fluid" src="${imagenSegura}" alt="${tituloSeguro}" width="300" height="350" loading="lazy" decoding="async" fetchpriority="${indice === 0 ? 'high' : 'low'}">
      <h3 class="movie-title">${tituloSeguro}</h3>
      <data class="movie-date" value="${fechaIsoSegura}">Fecha de estreno: ${fechaVisibleSegura}</data>
      <p class="movie-description">${categoriaSegura} - ${clasificacionSegura}</p>
      <button type="button" class="btn btn-primary buy-button" data-movie-id="${idSeguro}">
        Comprar boletos aqui
      </button>
    </article>
  `;
  fragmento.appendChild(columna);
});

contenedor.appendChild(fragmento);
```

### Después: propuesta con React

Una implementación posible dividiría la responsabilidad entre una tarjeta y la cartelera:

```jsx
function PeliculaCard({ pelicula, destacada, onComprar }) {
  const imagen = pelicula.imagen || 'assets/images/cinema-hall-bg.jpg';
  const fechaIso = pelicula.fechaEstreno?.toISOString().slice(0, 10) || '';
  const fechaVisible = pelicula.fechaEstreno?.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }) || 'Próximamente';

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <article className="movie-card" data-state="success">
        <img
          className="movie-image img-fluid"
          src={imagen}
          alt={pelicula.titulo}
          width="300"
          height="350"
          loading="lazy"
          decoding="async"
          fetchPriority={destacada ? 'high' : 'low'}
        />
        <h3 className="movie-title">{pelicula.titulo}</h3>
        <data className="movie-date" value={fechaIso}>
          Fecha de estreno: {fechaVisible}
        </data>
        <p className="movie-description">
          {pelicula.categoria} - {pelicula.clasificacion}
        </p>
        <button
          type="button"
          className="btn btn-primary buy-button"
          onClick={() => onComprar(pelicula.id)}
        >
          Comprar boletos aquí
        </button>
      </article>
    </div>
  );
}

export function Cartelera({ peliculas, onComprar }) {
  if (peliculas.length === 0) {
    return <p className="alert alert-danger">No hay películas para mostrar.</p>;
  }

  return peliculas.map((pelicula, indice) => (
    <PeliculaCard
      key={pelicula.id}
      pelicula={pelicula}
      destacada={indice === 0}
      onComprar={onComprar}
    />
  ));
}
```

## Análisis del cambio

En la versión actual, la función controla de manera imperativa cómo crear, completar y agregar cada nodo. En la propuesta con React, el código describe qué interfaz corresponde a cada película. Cuando cambia la propiedad `peliculas`, React vuelve a calcular la representación necesaria sin que el desarrollador deba vaciar y reconstruir manualmente el contenedor.

La propuesta no elimina la lógica de negocio existente. Las instancias de `Pelicula`, el catálogo, el consumo de la API y las validaciones podrían mantenerse y entregar sus resultados a los componentes mediante propiedades.

## Conclusión

React sería una alternativa adecuada para modernizar CineGlobal de manera gradual. Su principal aporte sería transformar las vistas basadas en manipulación manual del DOM en componentes reutilizables y declarativos. La adaptación requiere nuevas herramientas y conceptos, pero puede comenzar por sectores concretos sin reescribir inmediatamente toda la aplicación.

## Fuentes consultadas

- [React - Documentación oficial](https://react.dev/)
- [React - Descripción de interfaces mediante componentes](https://react.dev/learn/describing-the-ui)
- [React - Importación y exportación de componentes](https://react.dev/learn/importing-and-exporting-components)

Consulta realizada el 26 de julio de 2026.

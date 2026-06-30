import { consultarElemento } from './dom.js';

export function renderizarPeliculas(peliculas, SELECTORES) {
  performance?.mark?.('render-peliculas-start');

  const contenedor = consultarElemento(SELECTORES.listadoPeliculas);
  if (!contenedor) {
    performance?.mark?.('render-peliculas-end');
    performance?.measure?.(
      'render-peliculas',
      'render-peliculas-start',
      'render-peliculas-end'
    );
    return;
  }

  contenedor.innerHTML = '';

  if (!peliculas.length) {
    contenedor.innerHTML = '<div class="col-12"><p class="cineglobal-ui-message alert alert-danger">No hay peliculas para mostrar.</p></div>';
    performance?.mark?.('render-peliculas-end');
    performance?.measure?.(
      'render-peliculas',
      'render-peliculas-start',
      'render-peliculas-end'
    );
    return;
  }

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

  performance?.mark?.('render-peliculas-end');
  performance?.measure?.(
    'render-peliculas',
    'render-peliculas-start',
    'render-peliculas-end'
  );
}

function escaparHTML(valor) {
  return String(valor || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatearFechaISO(fecha) {
  return fecha instanceof Date ? fecha.toISOString().slice(0, 10) : '';
}

function formatearFechaVisible(fecha) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) {
    return 'Proximamente';
  }

  return fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

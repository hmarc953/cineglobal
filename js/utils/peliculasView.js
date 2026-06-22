import { consultarElemento } from './dom.js';

export function renderizarPeliculas(peliculas, SELECTORES) {
  const contenedor = consultarElemento(SELECTORES.listadoPeliculas);
  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = '';

  if (!peliculas.length) {
    contenedor.innerHTML = '<div class="col-12"><p class="cineglobal-ui-message alert alert-danger">No hay peliculas para mostrar.</p></div>';
    return;
  }

  peliculas.forEach((pelicula) => {
    const columna = document.createElement('div');
    columna.className = 'col-12 col-md-6 col-lg-3';
    columna.innerHTML = `
      <article class="movie-card" data-state="success">
        <img class="movie-image img-fluid" src="${pelicula.imagen}" alt="${pelicula.titulo}" width="300" height="350">
        <h3 class="movie-title">${pelicula.titulo}</h3>
        <data class="movie-date" value="${formatearFechaISO(pelicula.fechaEstreno)}">Fecha de estreno: ${formatearFechaVisible(pelicula.fechaEstreno)}</data>
        <p class="movie-description">${pelicula.categoria} - ${pelicula.clasificacion}</p>
        <button type="button" class="btn btn-primary buy-button" data-movie-id="${pelicula.id}">
          Comprar boletos aqui
        </button>
      </article>
    `;
    contenedor.appendChild(columna);
  });
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
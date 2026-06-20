import {
  consultarElemento,
  actualizarTexto,
  limpiarFormulario,
  limpiarMensaje,
  deshabilitarControl,
} from './dom.js';

export function prepararModalCompra(pelicula, SELECTORES) {
  actualizarTexto('#modalCompraLabel', pelicula.titulo);

  const poster = consultarElemento('.compra-poster');
  if (poster) {
    poster.src = pelicula.imagen;
    poster.alt = `Poster de ${pelicula.titulo}`;
  }

  const formulario = consultarElemento(SELECTORES.formularioCompra);
  limpiarFormulario(formulario);
  limpiarMensaje(consultarElemento(SELECTORES.mensajeCompra));

  // El flujo de selección es progresivo:
  // primero cine, luego idioma y finalmente horario.
  renderizarCinesCompra(pelicula.obtenerFuncionesDisponibles(), SELECTORES);
  renderizarIdiomasCompra([], SELECTORES);
  renderizarHorariosCompra([], SELECTORES);

  deshabilitarControl(consultarElemento(SELECTORES.selectCompraIdioma));
  deshabilitarControl(consultarElemento(SELECTORES.selectCompraFuncion));
  deshabilitarControl(consultarElemento(SELECTORES.selectCompraAsientos));
}

export function renderizarCinesCompra(funciones, SELECTORES) {
  const select = consultarElemento(SELECTORES.selectCompraCine);
  if (!select) {
    return;
  }

  select.innerHTML = '<option value="" selected disabled hidden>Elija un cine</option>';

  const cines = [...new Set(funciones.map((funcion) => funcion.cine))];

  cines.forEach((cine) => {
    const option = document.createElement('option');
    option.value = cine;
    option.textContent = cine;
    select.appendChild(option);
  });
}

export function renderizarIdiomasCompra(funciones, SELECTORES) {
  const select = consultarElemento(SELECTORES.selectCompraIdioma);
  if (!select) {
    return;
  }

  select.innerHTML = '<option value="" selected disabled hidden>Elija un idioma</option>';

  const idiomas = [...new Set(funciones.map((funcion) => funcion.idioma))];

  idiomas.forEach((idioma) => {
    const option = document.createElement('option');
    option.value = idioma;
    option.textContent = idioma;
    select.appendChild(option);
  });
}

export function renderizarHorariosCompra(funciones, SELECTORES) {
  const select = consultarElemento(SELECTORES.selectCompraFuncion);
  if (!select) {
    return;
  }

  select.innerHTML = '<option value="" selected disabled hidden>Elija un horario</option>';

  funciones.forEach((funcion) => {
    const option = document.createElement('option');
    option.value = funcion.id;
    option.textContent = `${funcion.horario} (${funcion.asientosDisponibles} disponibles)`;
    select.appendChild(option);
  });
}
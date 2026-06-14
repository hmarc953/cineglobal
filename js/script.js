import { Usuario } from './models/Usuario.js';
import { GestorUsuarios } from './models/GestorUsuarios.js';
import { Funcion } from './models/Funcion.js';
import { Pelicula } from './models/Pelicula.js';
import { CatalogoPeliculas } from './models/CatalogoPeliculas.js';
import { Compra } from './models/Compra.js';
import { ConsultaSoporte } from './models/ConsultaSoporte.js';
import { StorageUtil } from './utils/storage.js';

const SELECTORES = {
  formularioFiltros: '#formFiltrosPeliculas',
  inputTitulo: '#filtroTitulo',
  selectCine: '#cine',
  selectCategoria: '#cat',
  selectIdioma: '#idioma',
  selectClasificacion: '#clasificacion',
  botonLimpiarFiltros: '#btnLimpiarFiltros',
  listadoPeliculas: '#listaPeliculas',
  estadoFiltros: '#estadoFiltros',
  formularioLogin: '#formLogin',
  formularioRegistro: '#formRegistro',
  formularioCompra: '#formCompra',
  formularioPago: '#formPago',
  formularioConsulta: '#formConsulta',
  mensajeLogin: '#mensajeLogin',
  mensajeRegistro: '#mensajeRegistro',
  mensajeCompra: '#mensajeCompra',
  mensajePago: '#mensajePago',
  mensajeConsulta: '#mensajeConsulta',
  resumenCompra: '#resumenCompra',
  confirmLoginTexto: '#confirmLoginTexto',
  confirmRegistroTexto: '#confirmRegistroTexto',
  confirmCompraTexto: '#confirmCompraTexto',
  confirmConsultaTexto: '#confirmConsultaTexto',
};

const STORAGE_KEYS = {
  usuarioActivo: 'cineglobal.usuarioActivo',
  compras: 'cineglobal.compras',
  tickets: 'cineglobal.tickets',
  filtros: 'cineglobal.filtrosPeliculas',
};

const estadoApp = {
  gestorUsuarios: null,
  catalogoPeliculas: null,
  usuarioActivo: null,
  peliculaSeleccionada: null,
  funcionSeleccionada: null,
  cantidadEntradas: 0,
  storage: null,
};

const usuarioInicial = {
  nombre: 'Admin',
  email: 'admin@cineglobal.com',
  password: 'Admin123',
};

document.addEventListener('DOMContentLoaded', inicializarApp);

function inicializarApp() {
  cargarStorage();
  debugDumpStorage();
  cargarDatosIniciales();
  configurarEventos();
  restaurarFiltros();
  renderizarPeliculas(estadoApp.catalogoPeliculas.listarPeliculas());
  validarFormulariosIniciales();
}

// Helper de depuración: muestra un resumen de localStorage/sessionStorage en consola
function debugDumpStorage() {
  try {
    console.group('DEBUG Storage - localStorage');
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      console.log(key, localStorage.getItem(key));
    }
    console.groupEnd();
  } catch (e) {
    console.warn('localStorage no disponible:', e.message || e);
  }

  try {
    console.group('DEBUG Storage - sessionStorage');
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      console.log(key, sessionStorage.getItem(key));
    }
    console.groupEnd();
  } catch (e) {
    console.warn('sessionStorage no disponible:', e.message || e);
  }
}

function cargarStorage() {
  estadoApp.storage = StorageUtil;
}

function cargarDatosIniciales() {
  // Restaura GestorUsuarios desde storage (clave serializada por GestorUsuarios.guardarEnStorage)
  let gestor = null;
  try {
    gestor = GestorUsuarios.cargarDesdeStorage();
  } catch (e) {
    console.warn('Error al cargar GestorUsuarios desde storage:', e.message || e);
  }

  if (gestor) {
    estadoApp.gestorUsuarios = gestor;
  } else {
    const usuarios = [new Usuario('user_admin', usuarioInicial.nombre, usuarioInicial.email, usuarioInicial.password)];
    estadoApp.gestorUsuarios = new GestorUsuarios(usuarios);
    try { estadoApp.gestorUsuarios.guardarEnStorage(); } catch (e) { /* noop */ }
  }

  // Recuperar usuario activo: preferir local (persistente) y luego session
  const usuarioGuardadoLocal = obtenerDato(STORAGE_KEYS.usuarioActivo, 'local');
  const usuarioGuardadoSession = obtenerDato(STORAGE_KEYS.usuarioActivo, 'session');
  const usuarioJson = usuarioGuardadoLocal || usuarioGuardadoSession || null;
  estadoApp.usuarioActivo = usuarioJson ? Usuario.fromJSON(usuarioJson) : null;

  // Catalogo: restaura desde storage
  let catalogo = null;
  try { catalogo = CatalogoPeliculas.cargarDesdeStorage(); } catch (e) { /* noop */ }
  if (catalogo) {
    estadoApp.catalogoPeliculas = catalogo;
  } else {
    estadoApp.catalogoPeliculas = new CatalogoPeliculas(crearPeliculasIniciales());
    try { estadoApp.catalogoPeliculas.guardarEnStorage(); } catch (e) { /* noop */ }
  }
}

function crearPeliculasIniciales() {
  return [
    new Pelicula(
      'hoppers',
      'Hoppers Operacion Castor',
      'Accion',
      'ATP',
      '2024-03-03',
      'assets/images/hoppers.jpeg',
      [
        new Funcion('hop-pal-es-1800', 'Palermo', 'Espanol', '18:00', 40, 120),
        new Funcion('hop-aba-es-1900', 'Abasto', 'Espanol', '19:00', 35, 120),
        new Funcion('hop-lav-sub-2000', 'Lavalle', 'Subtitulada', '20:00', 30, 120),
        new Funcion('hop-pue-en-2200', 'Puerto Madero', 'Ingles', '22:00', 28, 120),
      ]
    ),
    new Pelicula(
      'scream-7',
      'Scream 7',
      'Accion',
      '+16',
      '2026-10-01',
      'assets/images/scream-7.jpg',
      [
        new Funcion('scr-pal-sub-2130', 'Palermo', 'Subtitulada', '21:30', 25, 140),
        new Funcion('scr-aba-en-2200', 'Abasto', 'Ingles', '22:00', 20, 140),
      ]
    ),
    new Pelicula(
      'el-agente-secreto',
      'El Agente Secreto',
      'Drama',
      '+13',
      '2026-02-26',
      'assets/images/el-agente-secreto.jpg',
      [
        new Funcion('age-pal-es-2100', 'Palermo', 'Espanol', '21:00', 34, 130),
        new Funcion('age-aba-sub-1930', 'Abasto', 'Subtitulada', '19:30', 26, 130),
      ]
    ),
    new Pelicula(
      'mario-galaxy',
      'Super Mario Galaxy: The Movie',
      'Animacion',
      'ATP',
      '2026-04-01',
      'assets/images/mario-galaxy.jpg',
      [
        new Funcion('mar-pal-es-1800', 'Palermo', 'Espanol', '18:00', 45, 125),
        new Funcion('mar-pue-es-2030', 'Puerto Madero', 'Espanol', '20:30', 38, 125),
      ]
    ),
  ];
}

function configurarEventos() {
  escuchar(SELECTORES.formularioFiltros, 'submit', manejarFiltroPeliculas);
  escuchar(SELECTORES.inputTitulo, 'input', manejarFiltroPeliculas);
  escuchar(SELECTORES.selectCine, 'change', manejarFiltroPeliculas);
  escuchar(SELECTORES.selectCategoria, 'change', manejarFiltroPeliculas);
  escuchar(SELECTORES.selectIdioma, 'change', manejarFiltroPeliculas);
  escuchar(SELECTORES.selectClasificacion, 'change', manejarFiltroPeliculas);
  escuchar(SELECTORES.botonLimpiarFiltros, 'click', manejarLimpiarFiltros);
  escuchar(SELECTORES.formularioLogin, 'submit', manejarLogin);
  escuchar(SELECTORES.formularioRegistro, 'submit', manejarRegistro);
  escuchar(SELECTORES.formularioCompra, 'submit', manejarSeleccionCompra);
  escuchar(SELECTORES.formularioPago, 'submit', manejarConfirmacionCompra);
  escuchar(SELECTORES.formularioConsulta, 'submit', manejarConsultaSoporte);

  document.addEventListener('input', manejarValidacionEnTiempoReal);
  document.addEventListener('change', manejarValidacionEnTiempoReal);
  escuchar(SELECTORES.listadoPeliculas, 'click', manejarClickPelicula);
}

function manejarFiltroPeliculas(event) {
  event.preventDefault();

  const filtros = obtenerFiltrosPeliculas();
  const resultados = estadoApp.catalogoPeliculas.buscarPorFiltros(filtros);

  renderizarPeliculas(resultados);
  mostrarMensaje(
    consultarElemento(SELECTORES.estadoFiltros),
    resultados.length ? `${resultados.length} pelicula(s) encontradas.` : 'No se encontraron peliculas con esos filtros.',
    resultados.length ? 'success' : 'error'
  );
  persistirDato(STORAGE_KEYS.filtros, filtros, 'session');
}

function manejarLimpiarFiltros() {
  const formulario = consultarElemento(SELECTORES.formularioFiltros);
  limpiarFormulario(formulario);
  limpiarMensaje(consultarElemento(SELECTORES.estadoFiltros));
  eliminarDato(STORAGE_KEYS.filtros, 'session');
  renderizarPeliculas(estadoApp.catalogoPeliculas.listarPeliculas());
}

function manejarLogin(event) {
  event.preventDefault();

  const formulario = event.currentTarget;
  const datos = obtenerDatosFormulario(formulario);
  const mensaje = consultarElemento(SELECTORES.mensajeLogin);

  if (!validarFormulario(formulario)) {
    mostrarError(mensaje, 'Completá email y contraseña para iniciar sesion.');
    return;
  }

  const usuario = estadoApp.gestorUsuarios.autenticar(datos.email, datos.password);
  if (!usuario) {
    mostrarError(mensaje, 'Credenciales invalidas. Revisá los datos ingresados.');
    return;
  }

  estadoApp.usuarioActivo = usuario;
  persistirDato(STORAGE_KEYS.usuarioActivo, usuario.toJSON(), 'session');
  mostrarExito(mensaje, `Bienvenido/a, ${usuario.nombre}.`);
  actualizarConfirmacion(SELECTORES.confirmLoginTexto, `Inicio de sesion realizado correctamente para ${usuario.email}.`);
  limpiarFormulario(formulario);
  cerrarModal('modalLogin');
  abrirModal('modalConfirmLogin');
}

function manejarRegistro(event) {
  event.preventDefault();

  const formulario = event.currentTarget;
  const datos = obtenerDatosFormulario(formulario);
  const mensaje = consultarElemento(SELECTORES.mensajeRegistro);

  if (!validarFormulario(formulario)) {
    mostrarError(mensaje, 'Completá todos los campos obligatorios.');
    return;
  }

  if (datos.password !== datos.passwordConfirm) {
    mostrarError(mensaje, 'Las contraseñas no coinciden.');
    validarCampoVisual(consultarElemento('#registroPasswordConfirm'), false);
    return;
  }

  const usuario = estadoApp.gestorUsuarios.registrarUsuario({
    nombre: datos.nombre,
    email: datos.email,
    password: datos.password,
  });

  if (!usuario) {
    mostrarError(mensaje, 'No se pudo registrar el usuario. Revisá email, contraseña o usuario existente.');
    return;
  }

  // Persistir GestorUsuarios para que el nuevo usuario quede guardado entre refesh
  try {
    estadoApp.gestorUsuarios.guardarEnStorage();
  } catch (e) {
    console.warn('No se pudo persistir GestorUsuarios:', e.message || e);
  }

  mostrarExito(mensaje, 'Cuenta creada correctamente.');
  actualizarConfirmacion(SELECTORES.confirmRegistroTexto, `La cuenta ${usuario.email} fue creada correctamente.`);
  limpiarFormulario(formulario);
  cerrarModal('modalRegistro');
  abrirModal('modalConfirmRegistro');
}

function manejarClickPelicula(event) {
  const botonCompra = event.target.closest('[data-movie-id]');
  if (!botonCompra) {
    return;
  }

  event.preventDefault();
  const pelicula = estadoApp.catalogoPeliculas.obtenerPeliculaPorId(botonCompra.dataset.movieId);
  if (!pelicula) {
    return;
  }

  estadoApp.peliculaSeleccionada = pelicula;
  estadoApp.funcionSeleccionada = null;
  prepararModalCompra(pelicula);
  abrirModal('modalCompraHoppers');
}

function manejarSeleccionCompra(event) {
  event.preventDefault();

  const formulario = event.currentTarget;
  const mensaje = consultarElemento(SELECTORES.mensajeCompra);

  if (!validarFormulario(formulario)) {
    mostrarError(mensaje, 'Seleccioná cine, idioma, horario y cantidad de asientos.');
    return;
  }

  const datos = obtenerDatosFormulario(formulario);
  const funciones = estadoApp.peliculaSeleccionada.obtenerFuncionesDisponibles();
  const funcion = funciones.find((item) =>
    item.id === datos.funcionId &&
    item.coincideConSeleccion({
      cine: datos.cine,
      idioma: normalizarTextoSeleccion(datos.idioma),
    })
  ) || null;

  if (!funcion) {
    mostrarError(mensaje, 'La funcion seleccionada no coincide con el cine o idioma elegidos.');
    return;
  }

  estadoApp.funcionSeleccionada = funcion;
  estadoApp.cantidadEntradas = Number(datos.cantidadEntradas);
  renderizarResumenCompra(estadoApp.peliculaSeleccionada, funcion, estadoApp.cantidadEntradas);
  mostrarExito(mensaje, 'Funcion seleccionada. Continuá con los datos de pago.');
  cerrarModal('modalCompraHoppers');
  abrirModal('modalPagoHoppers');
}

function manejarConfirmacionCompra(event) {
  event.preventDefault();

  const formulario = event.currentTarget;
  const mensaje = consultarElemento(SELECTORES.mensajePago);

  if (!estadoApp.funcionSeleccionada || !validarFormulario(formulario)) {
    mostrarError(mensaje, 'Completá correctamente los datos de pago y contacto.');
    return;
  }

  const datos = obtenerDatosFormulario(formulario);
  const compra = new Compra(
    `compra_${Date.now()}`,
    estadoApp.funcionSeleccionada,
    estadoApp.cantidadEntradas,
    datos.emailComprador
  );

  const compraConfirmada = compra.confirmarCompra();
  if (!compraConfirmada) {
    mostrarError(mensaje, 'No se pudo confirmar la compra. Revisá disponibilidad, email y cantidad.');
    return;
  }

  guardarEnListaStorage(STORAGE_KEYS.compras, compra.toJSON(), 'local');
  actualizarConfirmacion(
    SELECTORES.confirmCompraTexto,
    `Compra confirmada para ${estadoApp.peliculaSeleccionada.titulo}. Codigo: ${compra.codigoConfirmacion}. Total: $${compra.total}.`
  );
  mostrarExito(mensaje, 'Compra realizada con exito.');
  limpiarFormulario(formulario);
  limpiarMensaje(consultarElemento(SELECTORES.resumenCompra));
  cerrarModal('modalPagoHoppers');
  abrirModal('modalConfirmCompra');
}

function manejarConsultaSoporte(event) {
  event.preventDefault();

  const formulario = event.currentTarget;
  const datos = obtenerDatosFormulario(formulario);
  const mensaje = consultarElemento(SELECTORES.mensajeConsulta);

  if (!validarFormulario(formulario)) {
    mostrarError(mensaje, 'Completá email, titulo y descripcion.');
    return;
  }

  const consulta = new ConsultaSoporte('', datos.email, datos.titulo, datos.descripcion);
  if (!consulta.validar()) {
    mostrarError(mensaje, 'La consulta tiene datos invalidos.');
    return;
  }

  const ticket = consulta.generarTicket();
  guardarEnListaStorage(STORAGE_KEYS.tickets, consulta.toJSON(), 'local');
  actualizarConfirmacion(SELECTORES.confirmConsultaTexto, `Tu consulta fue enviada correctamente. Ticket: ${ticket}.`);
  mostrarExito(mensaje, `Consulta enviada. Ticket: ${ticket}.`);
  limpiarFormulario(formulario);
  cerrarModal('modalConsulta');
  abrirModal('modalConfirmConsulta');
}

function manejarValidacionEnTiempoReal(event) {
  const campo = event.target;
  if (!campo.matches('input, select, textarea')) {
    return;
  }

  validarCampoVisual(campo, validarCampo(campo));

  const formulario = campo.closest('form');
  if (formulario) {
    actualizarEstadoSubmit(formulario);
  }
}

function obtenerFiltrosPeliculas() {
  return {
    titulo: valorCampo(SELECTORES.inputTitulo),
    cine: valorCampo(SELECTORES.selectCine),
    categoria: normalizarFiltroCategoria(valorCampo(SELECTORES.selectCategoria)),
    idioma: normalizarTextoSeleccion(valorCampo(SELECTORES.selectIdioma)),
    clasificacion: normalizarClasificacion(valorCampo(SELECTORES.selectClasificacion)),
  };
}

function restaurarFiltros() {
  const filtros = obtenerDato(STORAGE_KEYS.filtros, 'session');
  if (!filtros) {
    return;
  }

  asignarValor(SELECTORES.inputTitulo, filtros.titulo || '');
  asignarValor(SELECTORES.selectCine, filtros.cine || '');
  asignarValor(SELECTORES.selectCategoria, filtros.categoria || '');
  asignarValor(SELECTORES.selectIdioma, filtros.idioma || '');
  asignarValor(SELECTORES.selectClasificacion, filtros.clasificacion || '');
}

function renderizarPeliculas(peliculas) {
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

function prepararModalCompra(pelicula) {
  actualizarTexto('#modalCompraHoppersLabel', pelicula.titulo);
  const poster = consultarElemento('.compra-poster');
  if (poster) {
    poster.src = pelicula.imagen;
    poster.alt = `Poster de ${pelicula.titulo}`;
  }

  const formulario = consultarElemento(SELECTORES.formularioCompra);
  limpiarFormulario(formulario);
  limpiarMensaje(consultarElemento(SELECTORES.mensajeCompra));
  renderizarFunciones(pelicula.obtenerFuncionesDisponibles());
  actualizarEstadoSubmit(formulario);
}

function renderizarFunciones(funciones) {
  const select = consultarElemento('#compraFuncion');
  if (!select) {
    return;
  }

  select.innerHTML = '<option value="">Funcion</option>';
  funciones.forEach((funcion) => {
    const option = document.createElement('option');
    option.value = funcion.id;
    option.textContent = `${funcion.cine} - ${funcion.idioma} - ${funcion.horario} (${funcion.asientosDisponibles} disponibles)`;
    select.appendChild(option);
  });
}

function renderizarResumenCompra(pelicula, funcion, cantidadEntradas) {
  const resumen = consultarElemento(SELECTORES.resumenCompra);
  if (!resumen) {
    return;
  }

  const total = funcion.precio * cantidadEntradas;
  resumen.innerHTML = `
    <strong>${pelicula.titulo}</strong><br>
    Funcion: ${funcion.cine} - ${funcion.idioma} - ${funcion.horario}<br>
    Entradas: ${cantidadEntradas}<br>
    Total estimado: $${total}
  `;
  resumen.className = 'cineglobal-ui-message alert alert-success';
}

function validarFormulariosIniciales() {
  document.querySelectorAll('form').forEach((formulario) => actualizarEstadoSubmit(formulario));
}

function validarFormulario(formulario) {
  const campos = obtenerCamposValidacion(formulario);
  const valido = campos.every((campo) => {
    const campoValido = validarCampo(campo);
    validarCampoVisual(campo, campoValido);
    return campoValido;
  });
  actualizarEstadoSubmit(formulario);
  return valido;
}

function validarCampo(campo) {
  if (campo.disabled) {
    return true;
  }

  const valor = campo.value.trim();
  const tipo = campo.dataset.validate || inferirTipoValidacion(campo);

  if (tipo === 'required') {
    return valor !== '';
  }

  if (tipo === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  if (tipo === 'password') {
    return valor.length >= 6;
  }

  if (tipo === 'number') {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
  }

  if (tipo === 'card') {
    return /^\d{16}$/.test(valor.replace(/\s+/g, ''));
  }

  if (tipo === 'expiry') {
    return /^\d{2}\/\d{2}$/.test(valor);
  }

  if (tipo === 'cvv') {
    return /^\d{3,4}$/.test(valor);
  }

  return true;
}

function validarCampoVisual(campo, esValido) {
  if (!campo || campo.value.trim() === '') {
    campo.classList.remove('is-valid', 'is-invalid');
    return;
  }

  campo.classList.toggle('is-valid', esValido);
  campo.classList.toggle('is-invalid', !esValido);
}

function actualizarEstadoSubmit(formulario) {
  if (!formulario) {
    return;
  }

  const boton = formulario.querySelector('[type="submit"]');
  if (!boton) {
    return;
  }

  const campos = obtenerCamposValidacion(formulario);
  const completo = campos.every((campo) => campo.value.trim() !== '' && validarCampo(campo));
  if (completo) {
    habilitarControl(boton);
  } else {
    deshabilitarControl(boton);
  }
}

function mostrarMensaje(elemento, mensaje, tipo = 'success') {
  if (!elemento) {
    return;
  }

  const claseEstado = tipo === 'error' ? 'alert-danger' : 'alert-success';
  elemento.textContent = mensaje;
  elemento.className = `cineglobal-ui-message alert ${claseEstado}`;
  elemento.hidden = false;
}

function mostrarError(elemento, mensaje) {
  mostrarMensaje(elemento, mensaje, 'error');
}

function mostrarExito(elemento, mensaje) {
  mostrarMensaje(elemento, mensaje, 'success');
}

function limpiarMensaje(elemento) {
  if (!elemento) {
    return;
  }

  elemento.textContent = '';
  elemento.className = 'cineglobal-ui-message';
  elemento.hidden = true;
}

function mostrarSeccion(elemento) {
  if (elemento) {
    elemento.hidden = false;
  }
}

function ocultarSeccion(elemento) {
  if (elemento) {
    elemento.hidden = true;
  }
}

function habilitarControl(control) {
  if (control) {
    control.disabled = false;
    control.classList.remove('loading');
  }
}

function deshabilitarControl(control) {
  if (control) {
    control.disabled = true;
  }
}

function limpiarFormulario(formulario) {
  if (!formulario) {
    return;
  }

  formulario.reset();
  formulario.querySelectorAll('.is-valid, .is-invalid').forEach((campo) => {
    campo.classList.remove('is-valid', 'is-invalid');
  });
  actualizarEstadoSubmit(formulario);
}

function obtenerDatosFormulario(formulario) {
  const formData = new FormData(formulario);
  const datos = Object.fromEntries(formData.entries());

  if (formulario.id === 'formLogin') {
    return {
      email: valorCampo('#loginEmail'),
      password: valorCampo('#loginPassword'),
    };
  }

  if (formulario.id === 'formRegistro') {
    return {
      nombre: valorCampo('#registroNombre'),
      email: valorCampo('#registroEmail'),
      password: valorCampo('#registroPassword'),
      passwordConfirm: valorCampo('#registroPasswordConfirm'),
    };
  }

  if (formulario.id === 'formPago') {
    return {
      titular: valorCampo('#pagoTitularHoppers'),
      tarjeta: valorCampo('#pagoTarjetaHoppers'),
      vencimiento: valorCampo('#pagoVencimientoHoppers'),
      cvv: valorCampo('#pagoCvvHoppers'),
      emailComprador: valorCampo('#pagoEmailHoppers'),
    };
  }

  if (formulario.id === 'formCompra') {
    return {
      cine: valorCampo('#compraCineHoppers'),
      idioma: valorCampo('#compraIdiomaHoppers'),
      funcionId: valorCampo('#compraFuncion'),
      cantidadEntradas: valorCampo('#compraAsientosHoppers'),
    };
  }

  if (formulario.id === 'formConsulta') {
    return {
      email: valorCampo('#consultaEmail'),
      titulo: valorCampo('#consultaTitulo'),
      descripcion: valorCampo('#consultaDescripcion'),
    };
  }

  return datos;
}

function obtenerCamposValidacion(formulario) {
  if (!formulario) {
    return [];
  }

  return Array.from(formulario.querySelectorAll('input, select, textarea')).filter((campo) => {
    if (campo.type === 'search') {
      return false;
    }

    return campo.id !== 'cine' && campo.id !== 'idioma';
  });
}

function inferirTipoValidacion(campo) {
  const id = campo.id.toLowerCase();

  if (campo.tagName === 'SELECT') {
    return campo.id === 'compraAsientosHoppers' ? 'number' : 'required';
  }

  if (campo.type === 'email' || id.includes('email')) {
    return 'email';
  }

  if (id.includes('password') || id.includes('contraseña')) {
    return campo.id === 'loginPassword' ? 'required' : 'password';
  }

  if (id.includes('tarjeta')) {
    return 'card';
  }

  if (id.includes('vencimiento')) {
    return 'expiry';
  }

  if (id.includes('cvv')) {
    return 'cvv';
  }

  return 'required';
}

function guardarEnListaStorage(clave, item, tipo) {
  const listaActual = obtenerDato(clave, tipo) || [];
  const lista = Array.isArray(listaActual) ? listaActual : [];
  lista.push(item);
  persistirDato(clave, lista, tipo);
}

function persistirDato(clave, valor, tipo = 'local') {
  if (!estadoApp.storage) {
    return false;
  }

  return estadoApp.storage.guardar(clave, valor, tipo);
}

function obtenerDato(clave, tipo = 'local') {
  if (!estadoApp.storage) {
    return null;
  }

  return estadoApp.storage.obtener(clave, tipo);
}

function eliminarDato(clave, tipo = 'local') {
  if (!estadoApp.storage) {
    return false;
  }

  return estadoApp.storage.eliminar(clave, tipo);
}

function abrirModal(idModal) {
  const modal = consultarElemento(`#${idModal}`);
  if (modal && window.bootstrap) {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
  }
}

function cerrarModal(idModal) {
  const modal = consultarElemento(`#${idModal}`);
  if (modal && window.bootstrap) {
    window.bootstrap.Modal.getOrCreateInstance(modal).hide();
  }
}

function escuchar(selector, evento, handler) {
  const elemento = consultarElemento(selector);
  if (elemento) {
    elemento.addEventListener(evento, handler);
  }
}

function consultarElemento(selector) {
  return document.querySelector(selector);
}

function valorCampo(selector) {
  const campo = consultarElemento(selector);
  return campo ? campo.value.trim() : '';
}

function asignarValor(selector, valor) {
  const campo = consultarElemento(selector);
  if (campo) {
    campo.value = valor;
  }
}

function actualizarTexto(selector, texto) {
  const elemento = consultarElemento(selector);
  if (elemento) {
    elemento.textContent = texto;
  }
}

function actualizarConfirmacion(selector, texto) {
  actualizarTexto(selector, texto);
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

function normalizarFiltroCategoria(categoria) {
  const mapaCategorias = {
    cat1: 'Accion',
    cat2: 'Comedia',
  };

  return mapaCategorias[categoria] || categoria;
}

function normalizarTextoSeleccion(valor) {
  const texto = String(valor || '').trim().toLowerCase();
  const sinAcentos = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const mapa = {
    es: 'Espanol',
    espanol: 'Espanol',
    en: 'Ingles',
    ingles: 'Ingles',
    subtitulada: 'Subtitulada',
  };

  return mapa[sinAcentos] || valor;
}

function normalizarClasificacion(clasificacion) {
  const mapaClasificacion = {
    atp: 'ATP',
    '13': '+13',
    '16': '+16',
  };

  return mapaClasificacion[clasificacion] || clasificacion;
}

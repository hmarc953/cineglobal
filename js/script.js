import { Usuario } from './models/Usuario.js';
import { GestorUsuarios } from './models/GestorUsuarios.js';
import { Funcion } from './models/Funcion.js';
import { Pelicula } from './models/Pelicula.js';
import { CatalogoPeliculas } from './models/CatalogoPeliculas.js';
import { Compra } from './models/Compra.js';
import { ConsultaSoporte } from './models/ConsultaSoporte.js';
import { StorageUtil } from './utils/storage.js';

import {
  consultarElemento,
  valorCampo,
  asignarValor,
  actualizarTexto,
  escuchar,
  abrirModal,
  cerrarModal,
  habilitarControl,
  deshabilitarControl,
  limpiarFormulario,
  limpiarMensaje,
  mostrarError,
  mostrarExito,
  mostrarMensaje,
  mostrarLoading,
  ocultarLoading,
} from './utils/dom.js';

import {
  validarFormulariosIniciales,
  validarFormulario,
  validarCampo,
  validarCampoVisual,
  actualizarEstadoSubmit,
} from './utils/validaciones.js';

import { renderizarPeliculas } from './utils/peliculasView.js';

import {
  prepararModalCompra,
  renderizarIdiomasCompra,
  renderizarHorariosCompra
} from './utils/compraView.js';


// ==============================
// Configuración e estado global
// ==============================
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
  selectCompraCine: '#compraCine',
  selectCompraIdioma: '#compraIdioma',
  selectCompraHorario: '#compraHorario',
  selectCompraAsientos: '#compraAsientos',
};

const STORAGE_KEYS = {
  usuarioActivo: 'cine:usuario:activo',
  compras: 'cine:historial:compras',
  tickets: 'cine:soporte:tickets',
  filtros: 'cine:cartelera:filtros',
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

// ==============================
// Inicialización de la aplicación
// ==============================
document.addEventListener('DOMContentLoaded', inicializarApp);

function inicializarApp() {
  cargarStorage();
  cargarDatosIniciales();
  configurarEventos();
  restaurarFiltros();
  renderizarPeliculas(estadoApp.catalogoPeliculas.listarPeliculas(), SELECTORES);
  validarFormulariosIniciales();
}

function cargarStorage() {
  estadoApp.storage = StorageUtil;
}

function cargarDatosIniciales() {
  // Intenta restaurar el gestor de usuarios persistido.
  let gestor = null;
  try {
    gestor = GestorUsuarios.cargarDesdeStorage();
  } catch (e) {
    console.warn('Error al cargar GestorUsuarios desde storage:', e.message || e);
  }

  // Si no hay datos previos, crea el usuario administrador inicial
  // y deja persistida esa estructura base.
  if (gestor) {
    estadoApp.gestorUsuarios = gestor;
  } else {
    const usuarios = [new Usuario('user_admin', usuarioInicial.nombre, usuarioInicial.email, usuarioInicial.password)];
    estadoApp.gestorUsuarios = new GestorUsuarios(usuarios);
    try {
      estadoApp.gestorUsuarios.guardarEnStorage();
    } catch (e) {
      console.warn('No se pudo guardar GestorUsuarios en storage:', e.message || e);
    }
  }

  // Recupera el usuario activo, priorizando datos persistentes.
  const usuarioGuardadoLocal = obtenerDato(STORAGE_KEYS.usuarioActivo, 'local');
  const usuarioGuardadoSession = obtenerDato(STORAGE_KEYS.usuarioActivo, 'session');
  const usuarioJson = usuarioGuardadoLocal || usuarioGuardadoSession || null;
  estadoApp.usuarioActivo = usuarioJson ? Usuario.fromJSON(usuarioJson) : null;

  // Intenta restaurar el catálogo persistido y, si no existe,
  // carga la cartelera inicial de la aplicación.
  let catalogo = null;
  try {
    catalogo = CatalogoPeliculas.cargarDesdeStorage();
  } catch (e) {
    console.warn('Error al cargar CatalogoPeliculas desde storage:', e.message || e);
  }

  if (catalogo) {
    estadoApp.catalogoPeliculas = catalogo;
  } else {
    estadoApp.catalogoPeliculas = new CatalogoPeliculas(crearPeliculasIniciales());
    try {
      estadoApp.catalogoPeliculas.guardarEnStorage();
    } catch (e) {
      console.warn('No se pudo guardar CatalogoPeliculas en storage:', e.message || e);
    }
  }
}

// ==============================
// Datos iniciales de cartelera
// ==============================
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

// ==============================
// Configuración de eventos
// ==============================
function configurarEventos() {
  // Registra los listeners principales de filtros, autenticación,
  // compra, consulta y validación en tiempo real.
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
  escuchar(SELECTORES.selectCompraCine, 'change', manejarCambioCineCompra);
  escuchar(SELECTORES.selectCompraIdioma, 'change', manejarCambioIdiomaCompra);
  escuchar(SELECTORES.selectCompraHorario, 'change', manejarCambioHorarioCompra);

  document.addEventListener('input', manejarValidacionEnTiempoReal);
  document.addEventListener('change', manejarValidacionEnTiempoReal);
  escuchar(SELECTORES.listadoPeliculas, 'click', manejarClickPelicula);
}

// ==============================
// Manejadores de filtros de cartelera
// ==============================
function manejarFiltroPeliculas(event) {
  event.preventDefault();

  const estadoFiltros = consultarElemento(SELECTORES.estadoFiltros);
  mostrarLoading(estadoFiltros, 'Buscando peliculas...');

  const filtros = obtenerFiltrosPeliculas();
  const resultados = estadoApp.catalogoPeliculas.buscarPorFiltros(filtros);

  ocultarLoading(estadoFiltros);

  renderizarPeliculas(resultados, SELECTORES);
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
  actualizarEstadoSubmit(formulario);
  limpiarMensaje(consultarElemento(SELECTORES.estadoFiltros));
  eliminarDato(STORAGE_KEYS.filtros, 'session');
  renderizarPeliculas(estadoApp.catalogoPeliculas.listarPeliculas(), SELECTORES);
}

// ==============================
// Manejadores de autenticación
// ==============================
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
  actualizarEstadoSubmit(formulario);
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
    validarCampoVisual(consultarElemento(SELECTORES.registroPasswordConfirm), false);
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
  actualizarEstadoSubmit(formulario);
  cerrarModal('modalRegistro');
  abrirModal('modalConfirmRegistro');
}

// ==============================
// Manejadores del flujo de compra
// ==============================
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
  prepararModalCompra(pelicula, SELECTORES);
  actualizarEstadoSubmit(consultarElemento(SELECTORES.formularioCompra));
  abrirModal('modalCompra');
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

  // Busca la función exacta elegida y verifica que siga siendo
  // consistente con el cine e idioma seleccionados en el formulario.
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

  // Guarda en estado la función seleccionada para continuar
  // con el flujo de pago y confirmación.
  estadoApp.funcionSeleccionada = funcion;
  estadoApp.cantidadEntradas = Number(datos.cantidadEntradas);
  renderizarResumenCompra(estadoApp.peliculaSeleccionada, funcion, estadoApp.cantidadEntradas);
  mostrarExito(mensaje, 'Funcion seleccionada. Continuá con los datos de pago.');
  cerrarModal('modalCompra');
  abrirModal('modalPago');
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

  // La compra se construye a partir de la función ya validada
  // en el paso anterior y del email ingresado en el pago.
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

  // Una vez confirmada, se persiste en storage como parte del historial.
  guardarEnListaStorage(STORAGE_KEYS.compras, compra.toJSON(), 'local');
  actualizarConfirmacion(
    SELECTORES.confirmCompraTexto,
    `Compra confirmada para ${estadoApp.peliculaSeleccionada.titulo}. Codigo: ${compra.codigoConfirmacion}. Total: $${compra.total}.`
  );
  mostrarExito(mensaje, 'Compra realizada con exito.');
  limpiarFormulario(formulario);
  actualizarEstadoSubmit(formulario);
  limpiarMensaje(consultarElemento(SELECTORES.resumenCompra));
  cerrarModal('modalPago');
  abrirModal('modalConfirmCompra');
}

// ==============================
// Manejador de consultas de soporte
// ==============================
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
  actualizarEstadoSubmit(formulario);
  cerrarModal('modalConsulta');
  abrirModal('modalConfirmConsulta');
}

// ==============================
// Validación en tiempo real y estado de filtros
// ==============================
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

// ==============================
// Manejadores de selección progresiva de compra
// ==============================
function manejarCambioCineCompra() {
  if (!estadoApp.peliculaSeleccionada) {
    return;
  }

  // Al cambiar el cine, se recalculan los idiomas disponibles
  // y se reinician las selecciones dependientes.
  const cineSeleccionado = valorCampo(SELECTORES.selectCompraCine);

  const funcionesFiltradas = estadoApp.peliculaSeleccionada
    .obtenerFuncionesDisponibles()
    .filter((funcion) => {
      if (!cineSeleccionado) {
        return true;
      }

      return funcion.cine.toLowerCase() === cineSeleccionado.toLowerCase();
    });

  renderizarIdiomasCompra(funcionesFiltradas, SELECTORES);
  renderizarHorariosCompra([], SELECTORES);

  asignarValor(SELECTORES.selectCompraIdioma, '');
  asignarValor(SELECTORES.selectCompraHorario, '');
  asignarValor(SELECTORES.selectCompraAsientos, '');

  if (cineSeleccionado) {
    habilitarControl(consultarElemento(SELECTORES.selectCompraIdioma));
  } else {
    deshabilitarControl(consultarElemento(SELECTORES.selectCompraIdioma));
  }

  deshabilitarControl(consultarElemento(SELECTORES.selectCompraHorario));
  deshabilitarControl(consultarElemento(SELECTORES.selectCompraAsientos));
}

function manejarCambioIdiomaCompra() {
  if (!estadoApp.peliculaSeleccionada) {
    return;
  }

  // Al elegir idioma, se filtran los horarios válidos para la combinación
  // actual de cine + idioma.
  const cineSeleccionado = valorCampo(SELECTORES.selectCompraCine);
  const idiomaSeleccionado = valorCampo(SELECTORES.selectCompraIdioma);

  const funcionesFiltradas = estadoApp.peliculaSeleccionada
    .obtenerFuncionesDisponibles()
    .filter((funcion) => {
      const coincideCine = !cineSeleccionado || funcion.cine.toLowerCase() === cineSeleccionado.toLowerCase();
      const coincideIdioma = !idiomaSeleccionado || funcion.idioma.toLowerCase() === idiomaSeleccionado.toLowerCase();
      return coincideCine && coincideIdioma;
    });

  renderizarHorariosCompra(funcionesFiltradas, SELECTORES);

  asignarValor(SELECTORES.selectCompraHorario, '');
  asignarValor(SELECTORES.selectCompraAsientos, '');

  if (idiomaSeleccionado) {
    habilitarControl(consultarElemento(SELECTORES.selectCompraHorario));
  } else {
    deshabilitarControl(consultarElemento(SELECTORES.selectCompraHorario));
  }

  deshabilitarControl(consultarElemento(SELECTORES.selectCompraAsientos));
}

function manejarCambioHorarioCompra() {
  const funcionSeleccionada = valorCampo(SELECTORES.selectCompraHorario);

  asignarValor(SELECTORES.selectCompraAsientos, '');

  if (funcionSeleccionada) {
    habilitarControl(consultarElemento(SELECTORES.selectCompraAsientos));
  } else {
    deshabilitarControl(consultarElemento(SELECTORES.selectCompraAsientos));
  }
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

// ==============================
// Lectura de formularios y helpers de interfaz
// ==============================
function obtenerDatosFormulario(formulario) {
  // Normaliza la lectura de datos según el formulario activo
  // para devolver siempre un objeto simple y consistente.
  const formData = new FormData(formulario);
  const datos = Object.fromEntries(formData.entries());

  if (formulario.id === 'formLogin') {
    return {
      email: valorCampo(SELECTORES.loginEmail),
      password: valorCampo(SELECTORES.loginPassword),
    };
  }

  if (formulario.id === 'formRegistro') {
    return {
      nombre: valorCampo(SELECTORES.registroNombre),
      email: valorCampo(SELECTORES.registroEmail),
      password: valorCampo(SELECTORES.registroPassword),
      passwordConfirm: valorCampo(SELECTORES.registroPasswordConfirm),
    };
  }

  if (formulario.id === 'formPago') {
    return {
      titular: valorCampo(SELECTORES.pagoTitular),
      tarjeta: valorCampo(SELECTORES.pagoTarjeta),
      vencimiento: valorCampo(SELECTORES.pagoVencimiento),
      cvv: valorCampo(SELECTORES.pagoCvv),
      emailComprador: valorCampo(SELECTORES.pagoEmail),
    };
  }

  if (formulario.id === 'formCompra') {
    return {
      cine: valorCampo(SELECTORES.selectCompraCine),
      idioma: valorCampo(SELECTORES.selectCompraIdioma),
      funcionId: valorCampo(SELECTORES.selectCompraHorario),
      cantidadEntradas: valorCampo(SELECTORES.selectCompraAsientos),
    };
  }

  if (formulario.id === 'formConsulta') {
    return {
      email: valorCampo(SELECTORES.consultaEmail),
      titulo: valorCampo(SELECTORES.consultaTitulo),
      descripcion: valorCampo(SELECTORES.consultaDescripcion),
    };
  }

  return datos;
}

// ==============================
// Persistencia en storage
// ==============================
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

// ==============================
// Utilidades generales de DOM y formato
// ==============================
function actualizarConfirmacion(selector, texto) {
  actualizarTexto(selector, texto);
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

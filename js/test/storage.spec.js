import { Usuario } from '../models/Usuario.js';
import { Pelicula } from '../models/Pelicula.js';
import { Funcion } from '../models/Funcion.js';
import { Compra } from '../models/Compra.js';
import { CatalogoPeliculas } from '../models/CatalogoPeliculas.js';
import { GestorUsuarios } from '../models/GestorUsuarios.js';

/**
 * Suite de tests de storage: serialización / deserialización y persistencia simulada.
 */

describe('Storage serialization y deserialización', function() {
  it('serializa y deserializa un Usuario correctamente', function() {
    const usuario = new Usuario('u1', 'Marta', 'MARTA@correo.com', 'Pass123');
    const json = usuario.toJSON();

    expect(json).toEqual({
      id: 'u1',
      nombre: 'Marta',
      email: 'marta@correo.com',
      password: 'Pass123',
    });

    const usuarioDesdeJson = Usuario.fromJSON(json);
    expect(usuarioDesdeJson).toEqual(jasmine.any(Usuario));
    expect(usuarioDesdeJson.email).toBe('marta@correo.com');
    expect(usuarioDesdeJson.validarPassword('Pass123')).toBe(true);
  });

  it('serializa y deserializa un Funcion, incluyendo disponibilidad y precio', function() {
    const funcion = new Funcion('f1', 'CineMax', 'Español', '20:00', 30, 15.5);
    const json = funcion.toJSON();

    expect(json).toEqual({
      id: 'f1',
      cine: 'CineMax',
      idioma: 'Español',
      horario: '20:00',
      asientosDisponibles: 30,
      precio: 15.5,
    });

    const funcionDesdeJson = Funcion.fromJSON(json);
    expect(funcionDesdeJson).toEqual(jasmine.any(Funcion));
    expect(funcionDesdeJson.hayDisponibilidad(5)).toBe(true);
  });

  it('serializa y deserializa una Compra con Funcion embebida', function() {
    const funcion = new Funcion('f2', 'CinePlus', 'Inglés', '18:00', 12, 10);
    const compra = new Compra('c1', funcion, 2, 'comprador@test.com', 20, 'CONF-123');

    const json = compra.toJSON();

    expect(json).toEqual({
      id: 'c1',
      funcion: {
        id: 'f2',
        cine: 'CinePlus',
        idioma: 'Inglés',
        horario: '18:00',
        asientosDisponibles: 12,
        precio: 10,
      },
      cantidadEntradas: 2,
      emailComprador: 'comprador@test.com',
      total: 20,
      codigoConfirmacion: 'CONF-123',
    });

    const compraDesdeJson = Compra.fromJSON(json);
    expect(compraDesdeJson).toEqual(jasmine.any(Compra));
    expect(compraDesdeJson.funcion).toEqual(jasmine.any(Funcion));
    expect(compraDesdeJson.funcion.id).toBe('f2');
  });

  it('serializa y deserializa una Pelicula con funciones', function() {
    const funcion1 = new Funcion('f3', 'CineMax', 'Español', '19:30', 25, 13);
    const pelicula = new Pelicula('p1', 'El Gran Viaje', 'Aventura', 'PG-13', '2025-06-01', 'viaje.jpg', [funcion1]);

    const json = pelicula.toJSON();
    expect(json.id).toBe('p1');
    expect(json.funciones.length).toBe(1);
    expect(json.funciones[0].id).toBe('f3');

    const peliculaDesdeJson = Pelicula.fromJSON(json);
    expect(peliculaDesdeJson).toEqual(jasmine.any(Pelicula));
    expect(peliculaDesdeJson.obtenerFuncionesDisponibles()[0]).toEqual(jasmine.any(Funcion));
    expect(peliculaDesdeJson.obtenerFuncionesDisponibles()[0].cine).toBe('CineMax');
  });

  it('serializa y deserializa un CatalogoPeliculas con múltiples películas', function() {
    const pelicula1 = new Pelicula('p2', 'Cine Aventura', 'Aventura', 'PG', '2025-07-10', 'cine.jpg');
    const pelicula2 = new Pelicula('p3', 'Drama Real', 'Drama', 'R', '2024-11-15', 'drama.jpg');
    const catalogo = new CatalogoPeliculas([pelicula1, pelicula2]);

    const json = catalogo.toJSON();
    expect(json.peliculas.length).toBe(2);
    expect(json.peliculas[0].titulo).toBe('Cine Aventura');

    const catalogoDesdeJson = CatalogoPeliculas.fromJSON(json);
    expect(catalogoDesdeJson).toEqual(jasmine.any(CatalogoPeliculas));
    expect(catalogoDesdeJson.listarPeliculas().length).toBe(2);
    expect(catalogoDesdeJson.obtenerPeliculaPorId('p3').titulo).toBe('Drama Real');
  });

  it('serializa y deserializa un GestorUsuarios con usuarios registrados', function() {
    const gestor = new GestorUsuarios();
    gestor.registrarUsuario({ nombre: 'Lucia', email: 'lucia@test.com', password: 'Secret1' });
    gestor.registrarUsuario({ nombre: 'Pedro', email: 'pedro@test.com', password: 'Secret2' });

    const json = gestor.toJSON();
    expect(json.usuarios.length).toBe(2);
    expect(json.usuarios[1].email).toBe('pedro@test.com');

    const gestorDesdeJson = GestorUsuarios.fromJSON(json);
    expect(gestorDesdeJson).toEqual(jasmine.any(GestorUsuarios));
    expect(gestorDesdeJson.autenticar('lucia@test.com', 'Secret1')).toEqual(jasmine.any(Usuario));
  });

  it('simula persistencia localStorage con JSON y recupera el estado completo', function() {
    const gestor = new GestorUsuarios();
    gestor.registrarUsuario({ nombre: 'Mario', email: 'mario@test.com', password: 'Password1' });
    const catalogo = new CatalogoPeliculas([new Pelicula('p4', 'Misterio', 'Suspenso', 'PG-13', '2025-12-01', 'misterio.jpg')]);

    const storageState = JSON.stringify({
      gestor: gestor.toJSON(),
      catalogo: catalogo.toJSON(),
    });

    const recoveredState = JSON.parse(storageState);
    const gestorRecuperado = GestorUsuarios.fromJSON(recoveredState.gestor);
    const catalogoRecuperado = CatalogoPeliculas.fromJSON(recoveredState.catalogo);

    expect(gestorRecuperado).toEqual(jasmine.any(GestorUsuarios));
    expect(catalogoRecuperado).toEqual(jasmine.any(CatalogoPeliculas));
    expect(gestorRecuperado.buscarPorEmail('mario@test.com')).toEqual(jasmine.any(Usuario));
    expect(catalogoRecuperado.obtenerPeliculaPorId('p4').titulo).toBe('Misterio');
  });
});
it('actualizar funciona como alias de guardar', function () {
  StorageUtil.guardar('contador', 1);

  StorageUtil.actualizar('contador', 2);

  expect(StorageUtil.obtener('contador')).toBe(2);
});

it('retorna null cuando la clave no existe', function () {
  expect(StorageUtil.obtener('claveInexistente')).toBeNull();
});

it('trabaja correctamente con sessionStorage', function () {
  StorageUtil.guardar('sesion', 'activa', 'session');

  expect(StorageUtil.obtener('sesion', 'session')).toBe('activa');
});
import { StorageUtil } from '../utils/storage.js';

describe('StorageUtil', function () {

  beforeEach(function () {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('guarda y obtiene valores simples en localStorage', function () {
    expect(StorageUtil.guardar('nombre', 'Juan')).toBe(true);
    expect(StorageUtil.obtener('nombre')).toBe('Juan');
  });

  it('guarda y obtiene objetos correctamente', function () {
    const usuario = {
      nombre: 'Ana',
      edad: 25
    };

    StorageUtil.guardar('usuario', usuario);

    expect(StorageUtil.obtener('usuario')).toEqual(usuario);
  });

  it('elimina una clave existente', function () {
    StorageUtil.guardar('test', 'valor');

    expect(StorageUtil.eliminar('test')).toBe(true);
    expect(StorageUtil.obtener('test')).toBeNull();
  });

  it('retorna false al eliminar una clave inexistente', function () {
    expect(StorageUtil.eliminar('noExiste')).toBe(false);
  });

  it('lista claves por prefijo', function () {
    StorageUtil.guardar('user_1', {});
    StorageUtil.guardar('user_2', {});
    StorageUtil.guardar('movie_1', {});

    const claves = StorageUtil.listar('user_');

    expect(claves.length).toBe(2);
    expect(claves).toContain('user_1');
    expect(claves).toContain('user_2');
  });

  it('limpia completamente el storage', function () {
    StorageUtil.guardar('a', 1);
    StorageUtil.guardar('b', 2);

    expect(StorageUtil.limpiar()).toBe(true);
    expect(StorageUtil.listar().length).toBe(0);
  });

});
it('guarda y recupera una instancia de Usuario', function () {
  const usuario = new Usuario(
    'u1',
    'Juan',
    'juan@test.com',
    'Pass123'
  );

  StorageUtil.guardarInstancia('usuarioTest', usuario);

  const recuperado = StorageUtil.cargarInstancia(
    'usuarioTest',
    Usuario
  );

  expect(recuperado).toEqual(jasmine.any(Usuario));
  expect(recuperado.email).toBe('juan@test.com');
});

it('retorna null al cargar una instancia inexistente', function () {
  const resultado = StorageUtil.cargarInstancia(
    'noExiste',
    Usuario
  );

  expect(resultado).toBeNull();
});
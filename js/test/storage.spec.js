import { Usuario } from '../models/Usuario.js';
import { Pelicula } from '../models/Pelicula.js';
import { Funcion } from '../models/Funcion.js';
import { CatalogoPeliculas } from '../models/CatalogoPeliculas.js';
import { GestorUsuarios } from '../models/GestorUsuarios.js';
import { StorageUtil } from '../utils/storage.js';

describe('StorageUtil - operaciones CRUD básicas', function() {
  beforeEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('guarda y obtiene valores simples en localStorage', function() {
    expect(StorageUtil.guardar('nombre', 'Juan')).toBe(true);
    expect(StorageUtil.obtener('nombre')).toBe('Juan');
  });

  it('guarda y obtiene objetos correctamente en localStorage', function() {
    const usuario = {
      nombre: 'Ana',
      edad: 25,
    };

    expect(StorageUtil.guardar('usuario', usuario)).toBe(true);
    expect(StorageUtil.obtener('usuario')).toEqual(usuario);
  });

  it('actualizar funciona como alias de guardar', function() {
    StorageUtil.guardar('contador', 1);

    expect(StorageUtil.actualizar('contador', 2)).toBe(true);
    expect(StorageUtil.obtener('contador')).toBe(2);
  });

  it('retorna null cuando la clave no existe', function() {
    expect(StorageUtil.obtener('claveInexistente')).toBeNull();
  });

  it('elimina una clave existente', function() {
    StorageUtil.guardar('test', 'valor');

    expect(StorageUtil.eliminar('test')).toBe(true);
    expect(StorageUtil.obtener('test')).toBeNull();
  });

  it('retorna false al eliminar una clave inexistente', function() {
    expect(StorageUtil.eliminar('noExiste')).toBe(false);
  });

  it('lista claves por prefijo en localStorage', function() {
    StorageUtil.guardar('user_1', {});
    StorageUtil.guardar('user_2', {});
    StorageUtil.guardar('movie_1', {});

    const claves = StorageUtil.listar('user_');

    expect(claves.length).toBe(2);
    expect(claves).toContain('user_1');
    expect(claves).toContain('user_2');
  });

  it('limpia completamente localStorage', function() {
    StorageUtil.guardar('a', 1);
    StorageUtil.guardar('b', 2);

    expect(StorageUtil.limpiar()).toBe(true);
    expect(StorageUtil.listar().length).toBe(0);
  });
});

describe('StorageUtil - sessionStorage', function() {
  beforeEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('guarda y obtiene valores desde sessionStorage', function() {
    expect(StorageUtil.guardar('sesion', 'activa', 'session')).toBe(true);
    expect(StorageUtil.obtener('sesion', 'session')).toBe('activa');
  });

  it('actualiza valores en sessionStorage', function() {
    StorageUtil.guardar('pasoActual', 'compra', 'session');

    expect(StorageUtil.actualizar('pasoActual', 'pago', 'session')).toBe(true);
    expect(StorageUtil.obtener('pasoActual', 'session')).toBe('pago');
  });

  it('elimina claves de sessionStorage sin afectar localStorage', function() {
    StorageUtil.guardar('dato', 'local', 'local');
    StorageUtil.guardar('dato', 'session', 'session');

    expect(StorageUtil.eliminar('dato', 'session')).toBe(true);
    expect(StorageUtil.obtener('dato', 'session')).toBeNull();
    expect(StorageUtil.obtener('dato', 'local')).toBe('local');
  });

  it('lista claves por prefijo en sessionStorage', function() {
    StorageUtil.guardar('cine:filtro:titulo', 'Scream', 'session');
    StorageUtil.guardar('cine:filtro:cine', 'Palermo', 'session');
    StorageUtil.guardar('cine:usuario:activo', 'admin', 'session');

    const claves = StorageUtil.listar('cine:filtro', 'session');

    expect(claves.length).toBe(2);
    expect(claves).toContain('cine:filtro:titulo');
    expect(claves).toContain('cine:filtro:cine');
  });

  it('limpia completamente sessionStorage sin afectar localStorage', function() {
    StorageUtil.guardar('localDato', 'persistente', 'local');
    StorageUtil.guardar('sessionDato', 'temporal', 'session');

    expect(StorageUtil.limpiar('session')).toBe(true);
    expect(StorageUtil.obtener('sessionDato', 'session')).toBeNull();
    expect(StorageUtil.obtener('localDato', 'local')).toBe('persistente');
  });
});

describe('StorageUtil - serialización de instancias', function() {
  beforeEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('guarda y recupera una instancia de Usuario usando fromJSON', function() {
    const usuario = new Usuario('u1', 'Juan', 'juan@test.com', 'Pass123');

    expect(StorageUtil.guardarInstancia('usuarioTest', usuario)).toBe(true);

    const recuperado = StorageUtil.cargarInstancia('usuarioTest', Usuario);

    expect(recuperado).toEqual(jasmine.any(Usuario));
    expect(recuperado.email).toBe('juan@test.com');
    expect(recuperado.validarPassword('Pass123')).toBe(true);
  });

  it('guarda y recupera una instancia de CatalogoPeliculas con películas y funciones', function() {
    const funcion = new Funcion('f1', 'Palermo', 'Espanol', '20:00', 30, 120);
    const pelicula = new Pelicula('p1', 'Hoppers', 'Accion', 'ATP', '2024-03-03', 'hoppers.jpg', [funcion]);
    const catalogo = new CatalogoPeliculas([pelicula]);

    expect(StorageUtil.guardarInstancia('catalogoTest', catalogo)).toBe(true);

    const recuperado = StorageUtil.cargarInstancia('catalogoTest', CatalogoPeliculas);

    expect(recuperado).toEqual(jasmine.any(CatalogoPeliculas));
    expect(recuperado.listarPeliculas().length).toBe(1);
    expect(recuperado.obtenerPeliculaPorId('p1')).toEqual(jasmine.any(Pelicula));
    expect(recuperado.obtenerPeliculaPorId('p1').obtenerFuncionesDisponibles()[0]).toEqual(jasmine.any(Funcion));
  });

  it('guarda y recupera una instancia de GestorUsuarios', function() {
    const gestor = new GestorUsuarios();

    gestor.registrarUsuario({
      nombre: 'Lucia',
      email: 'lucia@test.com',
      password: 'Secret1',
    });

    expect(StorageUtil.guardarInstancia('gestorTest', gestor)).toBe(true);

    const recuperado = StorageUtil.cargarInstancia('gestorTest', GestorUsuarios);

    expect(recuperado).toEqual(jasmine.any(GestorUsuarios));
    expect(recuperado.autenticar('lucia@test.com', 'Secret1')).toEqual(jasmine.any(Usuario));
  });

  it('retorna null al cargar una instancia inexistente', function() {
    const resultado = StorageUtil.cargarInstancia('noExiste', Usuario);

    expect(resultado).toBeNull();
  });
});

describe('StorageUtil - manejo de errores y datos corruptos', function() {
  beforeEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(function() {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('retorna null si el dato almacenado no es JSON válido', function() {
    localStorage.setItem('datoCorrupto', '{ json inválido');

    expect(StorageUtil.obtener('datoCorrupto')).toBeNull();
  });

  it('retorna false si se intenta guardar con una clave inválida', function() {
    expect(StorageUtil.guardar('', 'valor')).toBe(false);
    expect(StorageUtil.guardar(null, 'valor')).toBe(false);
  });

  it('retorna false si se intenta obtener un storage inválido', function() {
    expect(StorageUtil.guardar('dato', 'valor', 'tipo-invalido')).toBe(false);
  });

  it('retorna null al cargar una instancia con JSON inválido', function() {
    localStorage.setItem('usuarioCorrupto', '{ json inválido');

    const resultado = StorageUtil.cargarInstancia('usuarioCorrupto', Usuario);

    expect(resultado).toBeNull();
  });
});


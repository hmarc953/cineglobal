import { Usuario } from '../models/Usuario.js';
import { Pelicula } from '../models/Pelicula.js';
import { Funcion } from '../models/Funcion.js';
import { Compra } from '../models/Compra.js';
import { CatalogoPeliculas } from '../models/CatalogoPeliculas.js';
import { GestorUsuarios } from '../models/GestorUsuarios.js';
import { ConsultaSoporte } from '../models/ConsultaSoporte.js';

describe('Usuario', function() {
  it('crea un usuario con email normalizado y propiedades válidas', function() {
    const usuario = new Usuario('u1', 'Juan Perez', 'JUAN@EMAIL.COM', 'Pass123');
    expect(usuario.id).toBe('u1');
    expect(usuario.nombre).toBe('Juan Perez');
    expect(usuario.email).toBe('juan@email.com');
    expect(usuario.password).toBe('Pass123');
  });

  it('no valida password vacía y valida la contraseña correcta tras trim', function() {
    const usuario = new Usuario('u1', 'Juan', 'juan@email.com', 'Pass123');
    expect(usuario.validarPassword('')).toBe(false);
    expect(usuario.validarPassword('  Pass123  ')).toBe(true);
  });

  it('coincide con el email independientemente de mayúsculas y espacios', function() {
    const usuario = new Usuario('u1', 'Juan', 'juan@email.com', 'Pass123');
    expect(usuario.coincideConEmail(' JUAN@EMAIL.COM ')).toBe(true);
    expect(usuario.coincideConEmail('otro@correo.com')).toBe(false);
  });

  it('actualiza datos parciales y devuelve false para datos inválidos', function() {
    const usuario = new Usuario('u2', 'Ana', 'ana@email.com', 'Secret1');

    expect(usuario.actualizarDatos({ nombre: 'Ana Maria' })).toBe(true);
    expect(usuario.nombre).toBe('Ana Maria');

    expect(usuario.actualizarDatos({ email: 'NUEVO@EMAIL.COM', password: 'NewPass1' })).toBe(true);
    expect(usuario.email).toBe('nuevo@email.com');
    expect(usuario.password).toBe('NewPass1');

    expect(usuario.actualizarDatos({ nombre: '', email: '' })).toBe(false);
  });

  it('serializa y deserializa correctamente a JSON', function() {
    const usuario = new Usuario('u3', 'Luis', 'luis@email.com', 'Pass123');
    const json = usuario.toJSON();
    expect(json).toEqual({ id: 'u3', nombre: 'Luis', email: 'luis@email.com', password: 'Pass123' });

    const usuarioDesdeJson = Usuario.fromJSON(json);
    expect(usuarioDesdeJson).toEqual(jasmine.any(Usuario));
    expect(usuarioDesdeJson.email).toBe('luis@email.com');
  });

  it('devuelve null al deserializar JSON inválido', function() {
    expect(Usuario.fromJSON(null)).toBeNull();
  });
});

describe('Pelicula', function() {
  it('crea una película con fecha de estreno como Date y normaliza los campos', function() {
    const pelicula = new Pelicula('p1', 'Avatar', 'Sci-Fi', 'PG-13', '2024-01-01', 'avatar.jpg', []);
    expect(pelicula.id).toBe('p1');
    expect(pelicula.titulo).toBe('Avatar');
    expect(pelicula.fechaEstreno).toEqual(jasmine.any(Date));
  });

  it('coincide con filtros por título parcial, categoría y clasificación', function() {
    const pelicula = new Pelicula('p2', 'Matrix', 'Accion', 'R', '1999-03-31', 'matrix.jpg');
    expect(pelicula.coincideConFiltros({ titulo: 'mat' })).toBe(true);
    expect(pelicula.coincideConFiltros({ categoria: 'accion' })).toBe(true);
    expect(pelicula.coincideConFiltros({ clasificacion: 'R' })).toBe(true);
    expect(pelicula.coincideConFiltros({ titulo: 'noexiste' })).toBe(false);
  });

  it('trata filtros nulos o vacíos como sin restricción', function() {
    const pelicula = new Pelicula('p3', 'Titanic', 'Drama', 'PG-13', '1997-12-19', 'titanic.jpg');
    expect(pelicula.coincideConFiltros({})).toBe(true);
    expect(pelicula.coincideConFiltros(null)).toBe(true);
  });

  it('serializa y deserializa correctamente a JSON', function() {
    const pelicula = new Pelicula('p4', 'Interstellar', 'Ciencia ficcion', 'PG-13', '2014-11-07', 'interstellar.jpg', []);
    const json = pelicula.toJSON();
    expect(json.titulo).toBe('Interstellar');
    expect(json.fechaEstreno).toContain('2014-11-07');

    const películaDesdeJson = Pelicula.fromJSON(json);
    expect(películaDesdeJson).toEqual(jasmine.any(Pelicula));
    expect(películaDesdeJson.titulo).toBe('Interstellar');
  });
});

describe('Funcion', function() {
  it('crea una función válida y verifica disponibilidad y reservas', function() {
    const funcion = new Funcion('f1', 'CineMax', 'Español', '20:00', 50, 12.5);
    expect(funcion.hayDisponibilidad(5)).toBe(true);
    expect(funcion.reservarAsientos(5)).toBe(true);
    expect(funcion.asientosDisponibles).toBe(45);
  });

  it('rechaza reserva cuando la cantidad es inválida o supera la disponibilidad', function() {
    const funcion = new Funcion('f2', 'CineMax', 'Español', '20:00', 5, 12.5);
    expect(funcion.hayDisponibilidad(6)).toBe(false);
    expect(funcion.reservarAsientos(6)).toBe(false);
    expect(funcion.hayDisponibilidad(0)).toBe(false);
    expect(funcion.hayDisponibilidad(2.5)).toBe(false);
  });

  it('realiza coincidencias de selección case-insensitive y serializa correctamente', function() {
    const funcion = new Funcion('f3', 'CinePlus', 'Inglés', '18:30', 20, 10);
    expect(funcion.coincideConSeleccion({ cine: 'cineplus' })).toBe(true);
    expect(funcion.coincideConSeleccion({ idioma: 'inglés' })).toBe(true);
    expect(funcion.coincideConSeleccion({ horario: '18:30' })).toBe(true);

    const json = funcion.toJSON();
    expect(json.cine).toBe('CinePlus');

    const funcionDesdeJson = Funcion.fromJSON(json);
    expect(funcionDesdeJson).toEqual(jasmine.any(Funcion));
    expect(funcionDesdeJson.cine).toBe('CinePlus');
  });
});

describe('Compra', function() {
  it('valida compra completa y calcula total correctamente', function() {
    const funcion = new Funcion('f5', 'CineMax', 'Español', '19:00', 10, 12.5);
    const compra = new Compra('c1', funcion, 4, 'cliente@test.com');

    expect(compra.esValida()).toBe(true);
    expect(compra.calcularTotal()).toBe(50);
  });

  it('rechaza compra inválida por id vacío, email inválido o falta de disponibilidad', function() {
    const funcion = new Funcion('f6', 'CineMax', 'Español', '19:00', 2, 12.5);
    const compraSinId = new Compra('', funcion, 1, 'cliente@test.com');
    expect(compraSinId.esValida()).toBe(false);

    const compraEmailInvalido = new Compra('c2', funcion, 1, 'no-valido');
    expect(compraEmailInvalido.esValida()).toBe(false);

    const compraSinDisponibilidad = new Compra('c3', funcion, 3, 'cliente@test.com');
    expect(compraSinDisponibilidad.esValida()).toBe(false);
  });

  it('confirma compra exitosa y genera código de confirmación', function() {
    const funcion = new Funcion('f7', 'CinePlus', 'Español', '21:00', 10, 15);
    const compra = new Compra('c4', funcion, 2, 'cliente@test.com');

    expect(compra.confirmarCompra()).toBe(true);
    expect(compra.codigoConfirmacion).toMatch(/^CONF-/);
    expect(compra.funcion.asientosDisponibles).toBe(8);
  });

  it('no confirma compra cuando los datos son inválidos', function() {
    const funcion = new Funcion('f8', 'CinePlus', 'Español', '21:00', 10, 15);
    const compra = new Compra('c5', funcion, 0, 'cliente@test.com');
    expect(compra.confirmarCompra()).toBe(false);
  });

  it('calcula total como 0 cuando la función no tiene precio válido', function() {
    const funcion = new Funcion('f9', 'CineMax', 'Español', '22:00', 10, undefined);
    const compra = new Compra('c6', funcion, 1, 'cliente@test.com');
    expect(compra.calcularTotal()).toBe(0);
  });

  it('serializa y deserializa compra correctamente', function() {
    const funcion = new Funcion('f10', 'CineMax', 'Español', '22:00', 10, 12.5);
    const compra = new Compra('c7', funcion, 2, 'cliente@test.com', 25, 'CONF-ABC');
    const json = compra.toJSON();

    expect(json.id).toBe('c7');
    expect(json.funcion.id).toBe('f10');

    const compraDesdeJson = Compra.fromJSON(json);
    expect(compraDesdeJson).toEqual(jasmine.any(Compra));
    expect(compraDesdeJson.cantidadEntradas).toBe(2);
  });
});

describe('CatalogoPeliculas', function() {
  const pelicula1 = new Pelicula('p1', 'Avatar', 'Sci-Fi', 'PG-13', '2024-01-01', 'avatar.jpg');
  const pelicula2 = new Pelicula('p2', 'Toy Story', 'Animacion', 'G', '1995-11-22', 'toystory.jpg');
  const pelicula3 = new Pelicula('p3', 'Interstellar', 'Ciencia ficcion', 'PG-13', '2014-11-07', 'interstellar.jpg');
  const catalogo = new CatalogoPeliculas([pelicula1, pelicula2, pelicula3]);

  it('obtiene todas las películas cuando no se aplican filtros', function() {
    expect(catalogo.buscarPorFiltros(null)).toEqual([pelicula1, pelicula2, pelicula3]);
  });

  it('filtra películas por categoría y retorna resultados esperados', function() {
    const resultados = catalogo.buscarPorFiltros({ categoria: 'animacion' });
    expect(resultados).toEqual([pelicula2]);
  });

  it('retorna null para IDs vacíos o inexistentes', function() {
    expect(catalogo.obtenerPeliculaPorId('')).toBeNull();
    expect(catalogo.obtenerPeliculaPorId('no-existe')).toBeNull();
  });

  it('obtiene película por índice válido y rechaza índices inválidos', function() {
    expect(catalogo.obtenerPeliculaPorIndice(0)).toBe(pelicula1);
    expect(catalogo.obtenerPeliculaPorIndice(3)).toBeNull();
    expect(catalogo.obtenerPeliculaPorIndice(-1)).toBeNull();
    expect(catalogo.obtenerPeliculaPorIndice(1.5)).toBeNull();
  });

  it('serializa y deserializa catálogo correctamente', function() {
    const json = catalogo.toJSON();
    expect(json.peliculas.length).toBe(3);

    const catalogoDesdeJson = CatalogoPeliculas.fromJSON(json);
    expect(catalogoDesdeJson).toEqual(jasmine.any(CatalogoPeliculas));
    expect(catalogoDesdeJson.listarPeliculas().length).toBe(3);
  });
});

describe('GestorUsuarios', function() {
  let gestor;

  beforeEach(function() {
    gestor = new GestorUsuarios([]);
  });

  it('registra un usuario válido y evita duplicados', function() {
    const usuario = gestor.registrarUsuario({ nombre: 'Juan', email: 'juan@email.com', password: 'Pass123' });
    expect(usuario).toEqual(jasmine.any(Usuario));
    expect(gestor.emailExiste('juan@email.com')).toBe(true);

    const duplicado = gestor.registrarUsuario({ nombre: 'Juan', email: 'juan@email.com', password: 'Pass123' });
    expect(duplicado).toBeNull();
  });

  it('rechaza registros con datos incompletos o inválidos', function() {
    expect(gestor.registrarUsuario(null)).toBeNull();
    expect(gestor.registrarUsuario({ nombre: '', email: 'juan@email.com', password: 'Pass123' })).toBeNull();
    expect(gestor.registrarUsuario({ nombre: 'Ana', email: 'invalido', password: 'Pass123' })).toBeNull();
    expect(gestor.registrarUsuario({ nombre: 'Ana', email: 'ana@email.com', password: '123' })).toBeNull();
  });

  it('autentica usuarios con credenciales válidas y rechaza credenciales inválidas', function() {
    gestor.registrarUsuario({ nombre: 'María', email: 'maria@email.com', password: 'Pass123' });

    expect(gestor.autenticar('maria@email.com', 'Pass123')).toEqual(jasmine.any(Usuario));
    expect(gestor.autenticar('maria@email.com', 'Wrong')).toBeNull();
    expect(gestor.autenticar('noexiste@email.com', 'Pass123')).toBeNull();
  });

  it('busca usuarios por email y maneja emails vacíos', function() {
    gestor.registrarUsuario({ nombre: 'Pepe', email: 'pepe@email.com', password: 'Pass123' });
    expect(gestor.buscarPorEmail('pepe@email.com')).toEqual(jasmine.any(Usuario));
    expect(gestor.buscarPorEmail('')).toBeNull();
  });
});

describe('ConsultaSoporte (Modelo)', function() {
  it('valida ticket correcto y rechaza campos vacíos o email inválido', function() {
    const consulta = new ConsultaSoporte('TKT-1', 'user@test.com', 'Problema', 'No funciona');
    expect(consulta.validar()).toBe(true);

    expect(new ConsultaSoporte('TKT-2', '', 'Titulo', 'Desc').validar()).toBe(false);
    expect(new ConsultaSoporte('TKT-3', 'user@test.com', '', 'Desc').validar()).toBe(false);
    expect(new ConsultaSoporte('TKT-4', 'usuario', 'Titulo', 'Desc').validar()).toBe(false);
  });

  it('genera ticket y permite cambiar el estado a valores válidos', function() {
    const consulta = new ConsultaSoporte('', 'user@test.com', 'Problema', 'No funciona');
    const idGenerado = consulta.generarTicket();
    expect(idGenerado).toMatch(/^TKT-/);
    expect(consulta.idTicket).toBe(idGenerado);

    expect(consulta.cambiarEstado(ConsultaSoporte.ESTADOS.EN_PROGRESO)).toBe(true);
    expect(consulta.estado).toBe(ConsultaSoporte.ESTADOS.EN_PROGRESO);
    expect(consulta.cambiarEstado('Estado Invalido')).toBe(false);
  });

  it('serializa ticket a JSON y preserva fecha de creación', function() {
    const consulta = new ConsultaSoporte('TKT-5', 'user@test.com', 'Problema', 'Error', ConsultaSoporte.ESTADOS.ABIERTO, '2024-01-01T00:00:00.000Z');
    const json = consulta.toJSON();
    expect(json.idTicket).toBe('TKT-5');
    expect(json.fechaCreacion).toBe('2024-01-01T00:00:00.000Z');
  });
});

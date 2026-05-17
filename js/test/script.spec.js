describe('Inicio de Sesión', function() {
  it('autentica credenciales válidas para un usuario registrado', function() {
    const users = [{ name: 'Admin', email: 'admin@cineglobal.com', password: 'Admin123' }];
    expect(authenticateUser('admin@cineglobal.com', 'Admin123', users)).toBe(true);
  });

  it('rechaza credenciales inválidas y mantiene intacto el arreglo de usuarios', function() {
    const users = [{ name: 'Admin', email: 'admin@cineglobal.com', password: 'Admin123' }];
    expect(authenticateUser('admin@cineglobal.com', 'WrongPass', users)).toBe(false);
    expect(users.length).toBe(1);
  });

  it('registra un nuevo usuario válido y agrega el objeto correctamente al arreglo', function() {
    const users = [];
    const result = registerUser({ name: 'Jose', email: 'jose@cineglobal.com', password: 'Test123' }, users);
    expect(result).toEqual({ success: true, message: 'Registro exitoso.' });
    expect(users.length).toBe(1);
    expect(users[0]).toEqual({ name: 'Jose', email: 'jose@cineglobal.com', password: 'Test123' });
  });

  it('no registra usuario con email inválido ni contraseña demasiado corta', function() {
    const users = [];
    const invalidEmail = registerUser({ name: 'Ana', email: 'ana@', password: 'Password1' }, users);
    expect(invalidEmail.success).toBeFalsy();
    expect(invalidEmail.message).toBe('El email no tiene un formato valido.');

    const shortPassword = registerUser({ name: 'Ana', email: 'ana@cineglobal.com', password: '123' }, users);
    expect(shortPassword.success).toBeFalsy();
    expect(shortPassword.message).toBe('La contrasena debe tener al menos 6 caracteres.');
  });
});

describe('Compra de Entrada', function() {
  const movie = { title: 'Avengers: Endgame', genre: 'Accion', year: 2019, rating: 8.4 };

  it('rechaza compra si la película es inválida o no tiene título', function() {
    const paymentData = {
      cardNumber: '4111111111111111',
      expiry: '12/99',
      cvc: '123',
      holder: 'Juan Perez',
    };
    const invalidMovie = comprarEntrada(null, 2, paymentData);
    expect(invalidMovie.success).toBe(false);
    expect(invalidMovie.error).toBe('Pelicula invalida.');

    const emptyMovie = comprarEntrada({}, 2, paymentData);
    expect(emptyMovie.success).toBe(false);
    expect(emptyMovie.error).toBe('Pelicula invalida.');
  });

  it('valida detalles de pago y rechaza tarjeta con formato inválido, fecha expirada o CVC incorrecto', function() {
    const invalidCard = validatePaymentDetails({ cardNumber: '1234', expiry: '12/99', cvc: '123', holder: 'Juan' });
    expect(invalidCard.valid).toBe(false);
    expect(invalidCard.message).toBe('El numero de tarjeta debe tener 16 digitos.');

    const invalidExpiry = validatePaymentDetails({ cardNumber: '4111111111111111', expiry: '99/99', cvc: '123', holder: 'Juan' });
    expect(invalidExpiry.valid).toBe(false);
    expect(invalidExpiry.message).toContain('expiracion');

    const invalidCvc = validatePaymentDetails({ cardNumber: '4111111111111111', expiry: '12/99', cvc: '12', holder: 'Juan' });
    expect(invalidCvc.valid).toBe(false);
    expect(invalidCvc.message).toBe('El CVC debe tener 3 o 4 digitos.');
  });

  it('rechaza compra cuando el pago es inválido', function() {
    const paymentInvalid = {
      cardNumber: '1234',
      expiry: '00/00',
      cvc: '12',
      holder: 'JP',
    };
    const result = comprarEntrada(movie, 2, paymentInvalid);
    expect(result.success).toBe(false);
    expect(result.error).toBe('El numero de tarjeta debe tener 16 digitos.');
  });

  it('rechaza compra cuando la cantidad de entradas no es un número positivo', function() {
    const paymentData = {
      cardNumber: '4111111111111111',
      expiry: '12/99',
      cvc: '123',
      holder: 'Juan Perez',
    };
    const zeroSeats = comprarEntrada(movie, 0, paymentData);
    expect(zeroSeats.success).toBe(false);
    expect(zeroSeats.error).toBe('La cantidad de entradas debe ser un número positivo.');

    const negativeSeats = comprarEntrada(movie, -5, paymentData);
    expect(negativeSeats.success).toBe(false);
    expect(negativeSeats.error).toBe('La cantidad de entradas debe ser un número positivo.');
  });

  it('genera compra exitosa con película válida, pago válido y entradas positivas con código de confirmación inyectado', function() {
    const paymentData = {
      cardNumber: '4111111111111111',
      expiry: '12/99',
      cvc: '123',
      holder: 'Juan Perez',
    };
    const result = comprarEntrada(movie, 2, paymentData, function() {
      return 'CONF-123456';
    });

    expect(result.success).toBe(true);
    expect(result.movie).toBe('Avengers: Endgame');
    expect(result.seats).toBe(2);
    expect(result.totalPrice).toBe(240);
    expect(result.confirmationCode).toBe('CONF-123456');
  });

  it('calcula el precio total correctamente con diferentes cantidades de entradas', function() {
    expect(calculateTotalPrice(1, movie)).toBe(120);
    expect(calculateTotalPrice(2, movie)).toBe(240);
    expect(calculateTotalPrice(5, movie)).toBe(600);
    expect(calculateTotalPrice(0, movie)).toBe(0);
  });

  it('selecciona película por índice válido y retorna null para índices inválidos', function() {
    expect(selectMovieByIndex('1', MOVIES)).toEqual(MOVIES[0]);
    expect(selectMovieByIndex('2', MOVIES)).toEqual(MOVIES[1]);
    expect(selectMovieByIndex('0', MOVIES)).toBeNull();
    expect(selectMovieByIndex('100', MOVIES)).toBeNull();
    expect(selectMovieByIndex('abc', MOVIES)).toBeNull();
  });
});

describe('Filtros de Películas', function() {
  it('filtra películas por género y retorna el arreglo esperado', function() {
    const resultados = filtrarPeliculas({ genre: 'Accion' });
    expect(resultados.length).toBe(1);
    expect(resultados).toContain(MOVIES[0]);
    expect(resultados[0].genre).toBe('Accion');
  });

 it('busca películas por título parcial y rating mínimo en el happy path', function() {
    const resultados = searchMovies({ title: 'La La', minRating: 8 }, MOVIES);
    expect(resultados.length).toBe(1);
    expect(resultados[0].title).toBe('La La Land');
});

  it('devuelve arreglo vacío cuando no hay coincidencias e ignora mayúsculas y espacios en filtros', function() {
    expect(searchMovies({ title: 'no existe' }, MOVIES)).toEqual([]);
    const resultados = searchMovies({ genre: '  animacion ' }, MOVIES);
    expect(resultados.length).toBe(1);
    expect(resultados[0].title).toBe('Toy Story');
  });

  it('formatea el listado de películas y maneja correctamente la lista vacía', function() {
    expect(formatMovieList([])).toBe('No hay peliculas disponibles.');
    const texto = formatMovieList([MOVIES[2]]);
    expect(texto).toContain('Parasite');
    expect(texto).toContain('2019');
  });
});

describe('Consulta de Soporte', function() {
  beforeEach(function() {
    SUPPORT_TICKETS.length = 0;
  });

  it('valida un formulario de contacto válido correctamente', function() {
    const validation = validateContactForm({
      email: 'usuario@test.com',
      title: 'Problema con compra',
      description: 'No puedo completar el pago.',
    });

    expect(validation.valid).toBe(true);
    expect(validation.message).toBe('Formulario valido.');
  });

  it('rechaza formulario con correo inválido o campos vacíos', function() {
    expect(validateContactForm({ email: '', title: 'Test', description: 'Desc' }).valid).toBe(false);
    expect(validateContactForm({ email: 'usuario', title: 'Test', description: 'Desc' }).message).toBe('El email no tiene un formato valido.');
  });

  it('crea ticket de soporte y agrega el objeto generado al arreglo global de tickets', function() {
    const ticket = createSupportTicket({
      email: 'usuario@test.com',
      title: 'Falla de sistema',
      description: 'No se muestra la función deseada.',
    });

    expect(ticket.id).toContain('TKT-');
    expect(ticket.status).toBe('Abierto');
    expect(ticket).toEqual(jasmine.objectContaining({
      email: 'usuario@test.com',
      title: 'Falla de sistema',
      description: 'No se muestra la función deseada.',
    }));
    expect(SUPPORT_TICKETS.length).toBe(1);
    expect(SUPPORT_TICKETS[0]).toEqual(ticket);
  });

  it('arroja error al crear ticket de soporte con datos nulos', function() {
    expect(function() {
      createSupportTicket(null);
    }).toThrow();
  });

  it('no encuentra ticket inexistente en el arreglo de soporte', function() {
    expect(SUPPORT_TICKETS.find(function(ticket) {
      return ticket && ticket.email === 'no@existe.com';
    })).toBeUndefined();
  });
});

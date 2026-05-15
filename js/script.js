const MOVIES = [
  { title: 'Avengers: Endgame', genre: 'Accion', year: 2019, rating: 8.4 },
  { title: 'La La Land', genre: 'Musical', year: 2016, rating: 8.0 },
  { title: 'Parasite', genre: 'Drama', year: 2019, rating: 8.6 },
  { title: 'Interstellar', genre: 'Ciencia ficcion', year: 2014, rating: 8.6 },
  { title: 'Toy Story', genre: 'Animacion', year: 1995, rating: 8.3 },
];


// Mock data para testing. En producción, usar base de datos segura.
const USER_DATABASE = [
  { name: 'Admin', email: 'admin@cineglobal.com', password: 'Admin123' },
];

const SUPPORT_TICKETS = [];

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function parseYesNoResponse(value) {
  const normalized = normalizeText(value);
  return ['si', 's', 'y', 'yes', '1'].includes(normalized);
}

function isValidEmail(email) {
  if (!email) return false;
  const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return simpleEmailRegex.test(email.trim());
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function formatMovieList(movies) {
  if (!movies.length) return 'No hay peliculas disponibles.';
  return movies
    .map((movie, index) => `${index + 1}. ${movie.title} (${movie.year}) - ${movie.genre} - Rating: ${movie.rating}`)
    .join('\n');
}

function promptUntilValid(message, validator, errorMessage) {
  let value = null;
  do {
    value = prompt(message);
    if (value === null) return null;
    if (validator(value)) return value;
    alert(errorMessage);
  } while (true);
}

/**
 * Busca peliculas en el catalogo segun filtros simples de titulo, genero, ano o rating.
 * @param {Object} filters
 * @param {string} [filters.title]
 * @param {string} [filters.genre]
 * @param {number} [filters.year]
 * @param {number} [filters.minRating]
 * @param {Array<Object>} catalog
 * @returns {Array<Object>}
 */
function searchMovies(filters, catalog) {
  return catalog.filter((movie) => {
    if (filters.title) {
      if (!normalizeText(movie.title).includes(normalizeText(filters.title))) {
        return false;
      }
    }
    if (filters.genre) {
      if (normalizeText(movie.genre) !== normalizeText(filters.genre)) {
        return false;
      }
    }
    if (filters.year) {
      if (movie.year !== filters.year) {
        return false;
      }
    }
    if (filters.minRating) {
      if (movie.rating < filters.minRating) {
        return false;
      }
    }
    return true;
  });
}

// Unificado con searchMovies para evitar duplicación
function filtrarPeliculas(filters) {
  return searchMovies(filters, MOVIES);
}

function validarUsuario(email, password) {
  return authenticateUser(email, password, USER_DATABASE);
}

function crearConsultaSoporte(formData) {
  return {
    email: formData.email.trim(),
    title: formData.title.trim(),
    description: formData.description.trim(),
    fecha: new Date().toISOString(),
  };
}

function validarEntradaNumerica(texto) {
  const number = parseInt(texto, 10);
  return isPositiveInteger(number) ? number : null;
}

function solicitarCredenciales() {
  const email = promptUntilValid('Ingrese su email:', (value) => isValidEmail(value), 'Debe ingresar un email valido.');
  if (email === null) return null;
  const password = promptUntilValid('Ingrese su contrasena:', (value) => value.trim().length > 0, 'La contrasena no puede estar vacia.');
  if (password === null) return null;
  return { email, password };
}

function solicitarCriteriosFiltro() {
  return getMovieSearchFilters();
}

function solicitarConsultaSoporte() {
  const email = promptUntilValid('Ingrese su email:', (value) => isValidEmail(value), 'Debe ingresar un email valido.');
  if (email === null) return null;
  const title = promptUntilValid('Ingrese el titulo de su consulta:', (value) => value.trim().length > 0, 'El titulo no puede estar vacio.');
  if (title === null) return null;
  const description = promptUntilValid('Ingrese la descripcion del problema:', (value) => value.trim().length > 0, 'La descripcion no puede estar vacia.');
  if (description === null) return null;
  return { email, title, description };
}

function solicitarCompra() {
  const movieSelection = prompt(`Peliculas disponibles:\n${formatMovieList(MOVIES)}\n\nIngrese el numero de la pelicula que desea seleccionar:`);
  if (movieSelection === null) return null;
  const selectedMovie = selectMovieByIndex(movieSelection, MOVIES);
  const seatsString = prompt('Ingrese la cantidad de entradas que desea comprar:');
  if (seatsString === null) return null;
  const seats = validarEntradaNumerica(seatsString);
  if (!selectedMovie || seats === null || !isPositiveInteger(seats)) {
    return null;
  }
  const cardNumber = prompt('Ingrese el numero de tarjeta (16 digitos):');
  if (cardNumber === null) return null;
  const expiry = prompt('Ingrese la fecha de expiracion MM/AA:');
  if (expiry === null) return null;
  const cvc = prompt('Ingrese el CVC:');
  if (cvc === null) return null;
  const holder = prompt('Ingrese el nombre del titular de la tarjeta:');
  if (holder === null) return null;
  return { selectedMovie, seats, paymentData: { cardNumber, expiry, cvc, holder } };
}

function comprarEntrada(seats, paymentData, generatorFn) {
  const paymentValidation = validatePaymentDetails(paymentData);
  if (!paymentValidation.valid) {
    return { success: false, error: paymentValidation.message };
  }

  if (!isPositiveInteger(seats)) {
    return { success: false, error: 'La cantidad de entradas debe ser un número positivo.' };
  }

  const totalPrice = calculateTotalPrice(seats);
  const confirmationCode = generateConfirmationCode(generatorFn);
  return {
    success: true,
    seats,
    totalPrice,
    confirmationCode,
  };
}

function getMovieSearchFilters() {
  const option = promptUntilValid(
    'Elija un filtro para buscar peliculas:\n1) Titulo\n2) Genero\n3) Ano\n4) Rating minimo',
    (input) => ['1', '2', '3', '4'].includes(input.trim()),
    'Opcion invalida. Por favor ingrese 1, 2, 3 o 4.'
  );
  if (option === null) return null;

  switch (option.trim()) {
    case '1':
      const title = promptUntilValid('Ingrese texto para buscar en el titulo:', (value) => value.trim().length > 0, 'Debe ingresar un texto valido.');
      return title === null ? null : { title };
    case '2':
      const genre = promptUntilValid('Ingrese el genero (por ejemplo, Accion, Drama, Animacion):', (value) => value.trim().length > 0, 'Debe ingresar un genero valido.');
      return genre === null ? null : { genre };
    case '3':
      const yearString = promptUntilValid('Ingrese el ano de la pelicula (por ejemplo, 2019):', (value) => {
        const year = parseInt(value, 10);
        return isPositiveInteger(year);
      }, 'Debe ingresar un ano valido.');
      return yearString === null ? null : { year: parseInt(yearString, 10) };
    case '4':
      const ratingString = promptUntilValid('Ingrese la calificacion minima (0.0 - 10.0):', (value) => {
        const rating = parseFloat(value.replace(',', '.'));
        return !Number.isNaN(rating) && rating >= 0 && rating <= 10;
      }, 'Debe ingresar una calificacion valida entre 0 y 10.');
      return ratingString === null ? null : { minRating: parseFloat(ratingString.replace(',', '.')) };
    default:
      return null;
  }
}

function filtrarPeliculasUI() {
  alert('Flujo 3: Filtros de peliculas');
  let continueSearch = true;

  while (continueSearch) {
    const filters = getMovieSearchFilters();
    if (!filters) {
      alert('Busqueda cancelada. Retornando al menu principal.');
      return;
    }

    const results = searchMovies(filters, MOVIES);
    if (results.length === 0) {
      alert('No se encontraron coincidencias para los filtros seleccionados.');
      console.log('Resultados de busqueda: ningun resultado encontrado');
    } else {
      alert(`Se encontraron ${results.length} pelicula(s). Revisa la consola para detalles.`);
      console.log('Resultados de busqueda:\n' + formatMovieList(results));
    }

    const repeat = prompt('Desea realizar otra busqueda? (Si/No)');
    continueSearch = repeat !== null && parseYesNoResponse(repeat);
  }
}

/**
 * Verifica si las credenciales coinciden con un usuario registrado.
 * @param {string} email
 * @param {string} password
 * @param {Array<Object>} users
 * @returns {boolean}
 */
function authenticateUser(email, password, users) {
  return users.some((user) => user.email === email.trim() && user.password === password);
}

/**
 * Verifica si un email ya existe en la base de usuarios.
 * @param {string} email
 * @param {Array<Object>} users
 * @returns {boolean}
 */
function isEmailRegistered(email, users) {
  return users.some((user) => user.email === email.trim());
}

/**
 * Registra un nuevo usuario en la base de datos.
 * @param {{name:string,email:string,password:string}} newUser
 * @param {Array<Object>} users
 * @returns {{success:boolean,message:string}}
 */
function registerUser(newUser, users) {
  if (!newUser.name || !newUser.email || !newUser.password) {
    return { success: false, message: 'Todos los campos son obligatorios.' };
  }

  if (!isValidEmail(newUser.email)) {
    return { success: false, message: 'El email no tiene un formato valido.' };
  }

  if (newUser.password.length < 6) {
    return { success: false, message: 'La contrasena debe tener al menos 6 caracteres.' };
  }

  if (isEmailRegistered(newUser.email, users)) {
    return { success: false, message: 'El email ya esta registrado.' };
  }

  users.push({ name: newUser.name.trim(), email: newUser.email.trim(), password: newUser.password });
  return { success: true, message: 'Registro exitoso.' };
}

function iniciarSesionUI() {
  alert('Flujo 1: Inicio de sesion / Registro de usuario');
  const hasAccount = prompt('Ya tiene cuenta?\n1) Si - Iniciar sesion\n2) No - Registrarse');
  if (hasAccount === null) {
    alert('Operacion cancelada. Retornando al menu principal.');
    return;
  }

  if (normalizeText(hasAccount) === '1' || normalizeText(hasAccount) === 'si') {
    let retryLogin = true;

    while (retryLogin) {
      const email = promptUntilValid('Ingrese su email:', (value) => isValidEmail(value), 'Debe ingresar un email valido.');
      if (email === null) return;
      const password = promptUntilValid('Ingrese su contrasena:', (value) => value.trim().length > 0, 'La contrasena no puede estar vacia.');
      if (password === null) return;

      if (authenticateUser(email, password, USER_DATABASE)) {
        alert('Inicio de sesion exitoso. Bienvenido!');
        return;
      }

      alert('Credenciales invalidas. Intente nuevamente.');
      const retry = prompt('Desea reintentar el acceso? (Si/No)');
      retryLogin = retry !== null && parseYesNoResponse(retry);
    }
  } else {
    let retryRegister = true;

    while (retryRegister) {
      const name = promptUntilValid('Ingrese su nombre completo:', (value) => value.trim().length > 0, 'El nombre es obligatorio.');
      if (name === null) return;
      const email = promptUntilValid('Ingrese su email:', (value) => isValidEmail(value), 'Debe ingresar un email valido.');
      if (email === null) return;
      const password = promptUntilValid('Ingrese su contrasena (minimo 6 caracteres):', (value) => value.trim().length >= 6, 'La contrasena debe tener al menos 6 caracteres.');
      if (password === null) return;
      const confirmPassword = promptUntilValid('Confirme su contrasena:', (value) => value.trim().length > 0, 'Debe confirmar la contrasena.');
      if (confirmPassword === null) return;

      if (password !== confirmPassword) {
        alert('Las contrasenas no coinciden.');
      } else {
        const registration = registerUser({ name, email, password }, USER_DATABASE);
        alert(registration.message);
        if (registration.success) {
          return;
        }
      }

      const retry = prompt('Desea reintentar? (Si/No)');
      retryRegister = retry !== null && parseYesNoResponse(retry);
    }
  }
}

/**
 * Valida los datos del formulario de contacto.
 * @param {{email:string,title:string,description:string}} formData
 * @returns {{valid:boolean, message:string}}
 */
function validateContactForm(formData) {
  if (!formData.email || !formData.title || !formData.description) {
    return { valid: false, message: 'Todos los campos son obligatorios.' };
  }
  if (!isValidEmail(formData.email)) {
    return { valid: false, message: 'El email no tiene un formato valido.' };
  }
  return { valid: true, message: 'Formulario valido.' };
}

/**
 * Crea un ticket de soporte a partir de los datos del formulario.
 * @param {{email:string,title:string,description:string}} formData
 * @returns {{ticketId:string, status:string}}
 */
function createSupportTicket(formData) {
  const ticketId = `TKT-${Date.now()}`;
  const ticket = {
    id: ticketId,
    email: formData.email.trim(),
    title: formData.title.trim(),
    description: formData.description.trim(),
    status: 'Abierto',
    createdAt: new Date().toISOString(),
  };
  SUPPORT_TICKETS.push(ticket);
  return ticket;
}

function consultarSoporteUI() {
  alert('Flujo 4: Contacto con soporte mediante formulario');
  let continueContact = true;

  while (continueContact) {
    const email = promptUntilValid('Ingrese su email:', (value) => isValidEmail(value), 'Debe ingresar un email valido.');
    if (email === null) return;
    const title = promptUntilValid('Ingrese el titulo de su consulta:', (value) => value.trim().length > 0, 'El titulo no puede estar vacio.');
    if (title === null) return;
    const description = promptUntilValid('Ingrese la descripcion del problema:', (value) => value.trim().length > 0, 'La descripcion no puede estar vacia.');
    if (description === null) return;

    const validation = validateContactForm({ email, title, description });
    if (!validation.valid) {
      alert(validation.message);
    } else {
      const ticket = createSupportTicket({ email, title, description });
      alert(`Consulta enviada con exito. Numero de ticket: ${ticket.id}`);
      console.log('Ticket generado:', ticket);
      break;
    }

    const retry = prompt('Desea reintentar el envio? (Si/No)');
    continueContact = retry !== null && parseYesNoResponse(retry);
  }
}

function selectMovieByIndex(selection, movies) {
  const index = parseInt(selection, 10);
  if (!isPositiveInteger(index) || index < 1 || index > movies.length) {
    return null;
  }
  return movies[index - 1];
}

/**
 * Valida los datos de pago ingresados por el usuario.
 * @param {{cardNumber:string,expiry:string,cvc:string,holder:string}} payment
 * @returns {{valid:boolean,message:string}}
 */
function validatePaymentDetails(payment) {
  if (!payment.cardNumber || !payment.expiry || !payment.cvc || !payment.holder) {
    return { valid: false, message: 'Todos los datos de pago son obligatorios.' };
  }

  const cleanedCard = payment.cardNumber.replace(/\s+/g, '');
  if (!/^\d{16}$/.test(cleanedCard)) {
    return { valid: false, message: 'El numero de tarjeta debe tener 16 digitos.' };
  }

  if (!/^\d{2}\/\d{2}$/.test(payment.expiry.trim())) {
    return { valid: false, message: 'La fecha de expiracion debe tener el formato MM/AA.' };
  }

  const [monthText, yearText] = payment.expiry.split('/');
  const month = parseInt(monthText, 10);
  const year = parseInt(`20${yearText}`, 10);
  if (!isPositiveInteger(month) || month < 1 || month > 12) {
    return { valid: false, message: 'El mes de expiracion no es valido.' };
  }

  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  if (expiryDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
    return { valid: false, message: 'La tarjeta esta vencida.' };
  }

  if (!/^\d{3,4}$/.test(payment.cvc.trim())) {
    return { valid: false, message: 'El CVC debe tener 3 o 4 digitos.' };
  }

  if (payment.holder.trim().length < 3) {
    return { valid: false, message: 'El nombre del titular debe tener al menos 3 caracteres.' };
  }

  return { valid: true, message: 'Datos de pago validos.' };
}

function calculateTotalPrice(seats, generatorFn) {
  const basePrice = 120.0;
  // generatorFn es un parámetro inyectable para testing, permite generar códigos de confirmación predecibles
  return basePrice * seats;
}

function comprarEntradaUI() {
  alert('Flujo 2: Compra de entradas');
  let continuePurchase = true;

  while (continuePurchase) {
    const movieSelection = prompt(`Peliculas disponibles:\n${formatMovieList(MOVIES)}\n\nIngrese el numero de la pelicula que desea seleccionar:`);
    if (movieSelection === null) return;
    const selectedMovie = selectMovieByIndex(movieSelection, MOVIES);

    const seatsString = prompt('Ingrese la cantidad de entradas que desea comprar:');
    if (seatsString === null) return;
    const seats = validarEntradaNumerica(seatsString);

    if (!selectedMovie || seats === null || !isPositiveInteger(seats)) {
      alert('La seleccion de funcion no es valida o la cantidad de entradas no es correcta.');
      const retry = prompt('Desea reintentar la seleccion? (Si/No)');
      continuePurchase = retry !== null && parseYesNoResponse(retry);
      continue;
    }

    alert('Funcion valida. Avanzando al pago.');
    let retryPayment = true;

    while (retryPayment) {
      const cardNumber = prompt('Ingrese el numero de tarjeta (16 digitos):');
      if (cardNumber === null) return;
      const expiry = prompt('Ingrese la fecha de expiracion MM/AA:');
      if (expiry === null) return;
      const cvc = prompt('Ingrese el CVC:');
      if (cvc === null) return;
      const holder = prompt('Ingrese el nombre del titular de la tarjeta:');
      if (holder === null) return;

      const paymentValidation = validatePaymentDetails({ cardNumber, expiry, cvc, holder });
      if (!paymentValidation.valid) {
        alert(paymentValidation.message);
        const retry = prompt('Desea reintentar el pago? (Si/No)');
        retryPayment = retry !== null && parseYesNoResponse(retry);
        continue;
      }

      const totalPrice = calculateTotalPrice(seats);
      // Para testabilidad, usar generador de códigos inyectable en lugar de Math.random()
      const confirmationCode = generateConfirmationCode();
      alert(`Compra exitosa. Pelicula: ${selectedMovie.title}\nEntradas: ${seats}\nTotal: $${totalPrice.toFixed(2)}\nNumero de confirmacion: ${confirmationCode}`);
      console.log('Compra registrada:', {
        movie: selectedMovie.title,
        seats,
        totalPrice,
        confirmationCode,
      });
      retryPayment = false;
      continuePurchase = false;
    }
  }
}

function displayMainMenu() {
  return prompt('Menu principal:\n1) Inicio de sesion / Registro de usuario\n2) Compra de entradas\n3) Busqueda de peliculas con filtros\n4) Contacto con soporte\n5) Salir\n\nIngrese el numero de la opcion que desea ejecutar:');
}

function generateConfirmationCode(generatorFn) {
  // Inyectable para testing. Por defecto, usa Math.random().
  if (generatorFn && typeof generatorFn === 'function') {
    return generatorFn();
  }
  return `CONF-${Math.floor(Math.random() * 900000 + 100000)}`;
}

function runMainMenu() {
  let active = true;
  while (active) {
    const choice = displayMainMenu();
    if (choice === null) {
      alert('Saliendo del sistema.');
      return;
    }

    switch (choice.trim()) {
      case '1':
        iniciarSesionUI();
        break;
      case '2':
        comprarEntradaUI();
        break;
      case '3':
        filtrarPeliculasUI();
        break;
      case '4':
        consultarSoporteUI();
        break;
      case '5':
        alert('Gracias por usar CineGlobal. Hasta pronto!');
        active = false;
        break;
      default:
        alert('Opcion invalida. Por favor ingrese un numero entre 1 y 5.');
    }
  }
}

// No invocar runMainMenu() directamente para permitir testing con Jasmine
if (typeof jasmine === 'undefined') {
  runMainMenu();
}

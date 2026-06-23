describe('Controlador - Eventos y DOM', function() {
  beforeAll(async function() {
    mockearBootstrap();

    // El spec está ubicado en js/test/script.spec.js,
    // por eso el controlador se importa desde ../script.js.
    await import('../script.js');
  });

  beforeEach(function() {
    localStorage.clear();
    sessionStorage.clear();

    mockearBootstrap();
    montarFixture();

    // script.js inicializa la app al escuchar DOMContentLoaded.
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(function() {
    desmontarFixture();
    localStorage.clear();
    sessionStorage.clear();
  });

  // ==============================
  // Helpers de test
  // ==============================
  function montarFixture() {
    desmontarFixture();

    const fixture = document.createElement('div');
    fixture.id = 'fixture';

    fixture.innerHTML =
      ` 
        <section id="cartelera"> <form id="formFiltrosPeliculas" novalidate> <input type="search" id="filtroTitulo" />

          <select id="cine">
            <option value="">Cine</option>
            <option value="Palermo">Palermo</option>
            <option value="Abasto">Abasto</option>
            <option value="Lavalle">Lavalle</option>
            <option value="Puerto Madero">Puerto Madero</option>
          </select>

          <select id="cat">
            <option value="">Categoría</option>
            <option value="Accion">Acción</option>
            <option value="Comedia">Comedia</option>
            <option value="Drama">Drama</option>
            <option value="Animacion">Animación</option>
          </select>

          <select id="idioma">
            <option value="">Idioma</option>
            <option value="Espanol">Español</option>
            <option value="Ingles">Inglés</option>
            <option value="Subtitulada">Subtitulada</option>
          </select>

          <select id="clasificacion">
            <option value="">Clasificación</option>
            <option value="atp">ATP</option>
            <option value="13">+13</option>
            <option value="16">+16</option>
          </select>

          <button id="btnLimpiarFiltros" type="button">Limpiar</button>
        </form>

        <p id="estadoFiltros" class="cineglobal-ui-message" hidden></p>
        <div id="listaPeliculas"></div>
      </section>

      <div id="modalLogin">
        <form id="formLogin" novalidate>
          <input type="email" id="loginEmail" />
          <input type="password" id="loginPassword" />
          <p id="mensajeLogin" class="cineglobal-ui-message" hidden></p>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>

      <div id="modalRegistro">
        <form id="formRegistro" novalidate>
          <input type="text" id="registroNombre" data-validate="required" />
          <input type="email" id="registroEmail" />
          <input type="password" id="registroPassword" />
          <input type="password" id="registroPasswordConfirm" />
          <p id="mensajeRegistro" class="cineglobal-ui-message" hidden></p>
          <button type="submit">Registrarme</button>
        </form>
      </div>

      <div id="modalCompra">
        <h2 id="modalCompraLabel">Pelicula seleccionada</h2>
        <img class="compra-poster" src="" alt="" />

        <form id="formCompra" novalidate>
          <select id="compraCine">
            <option value="" selected disabled hidden>Elija un cine</option>
          </select>

          <select id="compraIdioma" disabled>
            <option value="" selected disabled hidden>Elija un idioma</option>
          </select>

          <select id="compraHorario" name="funcionId" data-validate="required" disabled>
            <option value="" selected disabled hidden>Elija un horario</option>
          </select>

          <select id="compraAsientos" name="cantidadEntradas" data-validate="number" disabled>
            <option value="" selected disabled hidden>Elija una cantidad de asientos</option>
            <option value="1">1 asiento</option>
            <option value="2">2 asientos</option>
            <option value="3">3 asientos</option>
            <option value="4">4 asientos</option>
            <option value="5">5 asientos</option>
            <option value="6">6 asientos</option>
          </select>

          <p id="mensajeCompra" class="cineglobal-ui-message" hidden></p>
          <button type="submit">Comprar entradas</button>
        </form>
      </div>

      <div id="modalPago">
        <form id="formPago" novalidate>
          <input type="text" id="pagoTitular" data-validate="required" />
          <input type="text" id="pagoTarjeta" />
          <input type="text" id="pagoVencimiento" />
          <input type="text" id="pagoCvv" />
          <input type="email" id="pagoEmail" />
          <p id="resumenCompra" class="cineglobal-ui-message" hidden></p>
          <p id="mensajePago" class="cineglobal-ui-message" hidden></p>
          <button type="submit">Comprar</button>
        </form>
      </div>

      <div id="modalConsulta">
        <form id="formConsulta" novalidate>
          <input type="email" id="consultaEmail" />
          <input type="text" id="consultaTitulo" />
          <textarea id="consultaDescripcion"></textarea>
          <p id="mensajeConsulta" class="cineglobal-ui-message" hidden></p>
          <button type="submit">Enviar</button>
        </form>
      </div>

      <div id="modalConfirmLogin">
        <p id="confirmLoginTexto"></p>
      </div>

      <div id="modalConfirmRegistro">
        <p id="confirmRegistroTexto"></p>
      </div>

      <div id="modalConfirmCompra">
        <p id="confirmCompraTexto"></p>
      </div>

      <div id="modalConfirmConsulta">
        <p id="confirmConsultaTexto"></p>
      </div>
    `;

    document.body.appendChild(fixture);
  }

  function desmontarFixture() {
    const fixture = document.getElementById('fixture');

    if (fixture) {
      fixture.remove();
    }
  }

  function mockearBootstrap() {
    window.bootstrap = {
      Modal: {
        getOrCreateInstance: function(elemento) {
          return {
            show: function() {
              elemento.dataset.modalVisible = 'true';
            },

            hide: function() {
              elemento.dataset.modalVisible = 'false';
            },
          };
        },
      },
    };
  }

  function disparar(elemento, tipoEvento) {
    const evento = new Event(tipoEvento, {
      bubbles: true,
      cancelable: true,
    });

    elemento.dispatchEvent(evento);
  }

  function dispararInput(selector, valor) {
    const elemento = document.querySelector(selector);
    elemento.value = valor;
    disparar(elemento, 'input');
    return elemento;
  }

  function dispararChange(selector, valor) {
    const elemento = document.querySelector(selector);
    elemento.value = valor;
    disparar(elemento, 'change');
    return elemento;
  }

  function dispararSubmit(selector) {
    const formulario = document.querySelector(selector);
    disparar(formulario, 'submit');
    return formulario;
  }

  function obtenerPrimerValorSeleccionable(selector) {
    const select = document.querySelector(selector);
    const opcion = Array.from(select.options).find((item) => item.value !== '' && !item.disabled);

    expect(opcion).toBeDefined();
    return opcion.value;
  }

  function abrirCompraDePrimeraPelicula() {
    const botonCompra = document.querySelector('[data-movie-id]');

    expect(botonCompra).not.toBeNull();
    botonCompra.click();
  }

  function completarSeleccionCompra() {
    abrirCompraDePrimeraPelicula();

    const cine = obtenerPrimerValorSeleccionable('#compraCine');
    dispararChange('#compraCine', cine);

    const idioma = obtenerPrimerValorSeleccionable('#compraIdioma');
    dispararChange('#compraIdioma', idioma);

    const funcion = obtenerPrimerValorSeleccionable('#compraHorario');
    dispararChange('#compraHorario', funcion);

    dispararChange('#compraAsientos', '2');
  }

  // ==============================
  // Renderizado de cartelera
  // ==============================
  describe('renderizado de películas', function() {
    it('renderiza una card por cada película inicial', function() {
      const cards = document.querySelectorAll('.movie-card');

      expect(cards.length).toBe(4);
    });

    it('cada card renderizada tiene botón de compra con data-movie-id', function() {
      const botones = document.querySelectorAll('[data-movie-id]');

      expect(botones.length).toBeGreaterThan(0);

      botones.forEach(function(boton) {
        expect(boton.dataset.movieId).toBeTruthy();
      });
    });
  });

  // ==============================
  // Filtros de películas
  // ==============================
  describe('filtros de películas', function() {
    it('muestra mensaje de vacío cuando no hay resultados', function() {
      dispararInput('#filtroTitulo', 'PeliculaQueNoExiste12345');

      const estadoFiltros = document.querySelector('#estadoFiltros');

      expect(estadoFiltros.textContent).toContain('No se encontraron');
      expect(estadoFiltros.classList.contains('alert-danger')).toBeTrue();
    });

    it('muestra cantidad de resultados al filtrar con éxito', function() {
      dispararInput('#filtroTitulo', 'Scream');

      const estadoFiltros = document.querySelector('#estadoFiltros');
      const cards = document.querySelectorAll('.movie-card');

      expect(cards.length).toBe(1);
      expect(estadoFiltros.textContent).toContain('pelicula(s) encontradas');
      expect(estadoFiltros.classList.contains('alert-success')).toBeTrue();
    });

    it('limpia los filtros y vuelve a renderizar el catálogo completo', function() {
      dispararInput('#filtroTitulo', 'Scream');

      document.querySelector('#btnLimpiarFiltros').click();

      const inputTitulo = document.querySelector('#filtroTitulo');
      const cards = document.querySelectorAll('.movie-card');
      const estadoFiltros = document.querySelector('#estadoFiltros');

      expect(inputTitulo.value).toBe('');
      expect(cards.length).toBe(4);
      expect(estadoFiltros.hidden).toBeTrue();
    });
  });

  // ==============================
  // Flujo de compra
  // ==============================
  describe('flujo de compra', function() {
    it('prepara el modal de compra al hacer click en una película', function() {
      abrirCompraDePrimeraPelicula();

      const tituloModal = document.querySelector('#modalCompraLabel');
      const poster = document.querySelector('.compra-poster');
      const selectCine = document.querySelector('#compraCine');
      const modalCompra = document.querySelector('#modalCompra');

      expect(tituloModal.textContent).toContain('Hoppers');
      expect(poster.getAttribute('src')).toContain('hoppers');
      expect(selectCine.options.length).toBeGreaterThan(1);
      expect(modalCompra.dataset.modalVisible).toBe('true');
    });

    it('habilita idioma, horario y asientos de forma progresiva', function() {
      abrirCompraDePrimeraPelicula();

      const cine = obtenerPrimerValorSeleccionable('#compraCine');
      dispararChange('#compraCine', cine);

      const selectIdioma = document.querySelector('#compraIdioma');
      expect(selectIdioma.disabled).toBeFalse();
      expect(selectIdioma.options.length).toBeGreaterThan(1);

      const idioma = obtenerPrimerValorSeleccionable('#compraIdioma');
      dispararChange('#compraIdioma', idioma);

      const selectFuncion = document.querySelector('#compraHorario');
      expect(selectFuncion.disabled).toBeFalse();
      expect(selectFuncion.options.length).toBeGreaterThan(1);

      const funcion = obtenerPrimerValorSeleccionable('#compraHorario');
      dispararChange('#compraHorario', funcion);

      const selectAsientos = document.querySelector('#compraAsientos');
      expect(selectAsientos.disabled).toBeFalse();
    });

    it('muestra error si se intenta comprar sin completar la selección', function() {
      abrirCompraDePrimeraPelicula();

      dispararSubmit('#formCompra');

      const mensajeCompra = document.querySelector('#mensajeCompra');

      expect(mensajeCompra.textContent).toContain('Seleccioná cine');
      expect(mensajeCompra.classList.contains('alert-danger')).toBeTrue();
    });

    it('genera resumen y abre el modal de pago con una selección válida', function() {
      completarSeleccionCompra();

      dispararSubmit('#formCompra');

      const resumenCompra = document.querySelector('#resumenCompra');
      const modalPago = document.querySelector('#modalPago');

      expect(resumenCompra.textContent).toContain('Entradas: 2');
      expect(resumenCompra.textContent).toContain('Total estimado');
      expect(modalPago.dataset.modalVisible).toBe('true');
    });
  });

  // ==============================
  // Login y registro
  // ==============================
  describe('login y registro', function() {
    it('muestra confirmación al iniciar sesión con el usuario administrador inicial', function() {
      dispararInput('#loginEmail', 'admin@cineglobal.com');
      dispararInput('#loginPassword', 'Admin123');
      
      dispararSubmit('#formLogin');

      const confirmacion = document.querySelector('#confirmLoginTexto');
      const modalConfirmLogin = document.querySelector('#modalConfirmLogin');

      expect(confirmacion.textContent).toContain('admin@cineglobal.com');
      expect(modalConfirmLogin.dataset.modalVisible).toBe('true');
    });

    it('muestra error al iniciar sesión con credenciales inválidas', function() {
      dispararInput('#loginEmail', 'admin@cineglobal.com');
      dispararInput('#loginPassword', 'incorrecta');

      dispararSubmit('#formLogin');

      const mensajeLogin = document.querySelector('#mensajeLogin');

      expect(mensajeLogin.textContent).toContain('Credenciales invalidas');
      expect(mensajeLogin.classList.contains('alert-danger')).toBeTrue();
    });

    it('muestra confirmación al registrar un usuario válido', function() {
      dispararInput('#registroNombre', 'Usuario Test');
      dispararInput('#registroEmail', 'usuario@test.com');
      dispararInput('#registroPassword', 'Usuario123');
      dispararInput('#registroPasswordConfirm', 'Usuario123');

      dispararSubmit('#formRegistro');

      const confirmacion = document.querySelector('#confirmRegistroTexto');
      const modalConfirmRegistro = document.querySelector('#modalConfirmRegistro');

      expect(confirmacion.textContent).toContain('usuario@test.com');
      expect(modalConfirmRegistro.dataset.modalVisible).toBe('true');
    });

    it('muestra error cuando las contraseñas de registro no coinciden', function() {
      dispararInput('#registroNombre', 'Usuario Test');
      dispararInput('#registroEmail', 'usuario@test.com');
      dispararInput('#registroPassword', 'Usuario123');
      dispararInput('#registroPasswordConfirm', 'Otra123');

      dispararSubmit('#formRegistro');

      const mensajeRegistro = document.querySelector('#mensajeRegistro');
      const passwordConfirm = document.querySelector('#registroPasswordConfirm');

      expect(mensajeRegistro.textContent).toContain('Las contraseñas no coinciden');
      expect(passwordConfirm.classList.contains('is-invalid')).toBeTrue();
    });
  });

  // ==============================
  // Consulta de soporte
  // ==============================
  describe('consulta de soporte', function() {
    it('muestra confirmación con ticket al enviar una consulta válida', function() {
      dispararInput('#consultaEmail', 'usuario@test.com');
      dispararInput('#consultaTitulo', 'Problema con compra');
      dispararInput('#consultaDescripcion', 'No puedo ver mis entradas.');

      dispararSubmit('#formConsulta');

      const confirmacion = document.querySelector('#confirmConsultaTexto');
      const modalConfirmConsulta = document.querySelector('#modalConfirmConsulta');

      expect(confirmacion.textContent).toContain('Ticket: TKT-');
      expect(modalConfirmConsulta.dataset.modalVisible).toBe('true');
    });

    it('muestra error al enviar soporte con datos incompletos', function() {
      dispararInput('#consultaEmail', 'usuario@test.com');
      dispararInput('#consultaTitulo', '');
      dispararInput('#consultaDescripcion', '');

      dispararSubmit('#formConsulta');

      const mensajeConsulta = document.querySelector('#mensajeConsulta');

      expect(mensajeConsulta.textContent).toContain('Completá email');
      expect(mensajeConsulta.classList.contains('alert-danger')).toBeTrue();
    });
  });

  // ==============================
  // Validación visual
  // ==============================
  describe('validación visual', function() {
    it('marca como inválido un email con formato incorrecto', function() {
      const campoEmail = dispararInput('#consultaEmail', 'email-invalido');

      expect(campoEmail.classList.contains('is-invalid')).toBeTrue();
    });

    it('marca como válido un email con formato correcto', function() {
      const campoEmail = dispararInput('#consultaEmail', 'usuario@test.com');

    expect(campoEmail.classList.contains('is-valid')).toBeTrue();
    });
  });
});

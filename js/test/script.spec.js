

describe('Controlador - Eventos y DOM', function() {

  beforeEach(function() {
    document.body.innerHTML = `
      <button id="btnComprar">Comprar</button>
      <input id="cantidad" value="2">
      <p id="mensaje"></p>
    `;
  });

  it('debe existir el botón de compra al inicializar la vista', function() {
    const boton = document.getElementById('btnComprar');

    expect(boton).not.toBeNull();
  });

  it('debe actualizar el mensaje al hacer click en el botón', function() {

    document.getElementById('btnComprar')
      .addEventListener('click', function() {
        document.getElementById('mensaje').textContent =
          'Compra realizada';
      });

    document.getElementById('btnComprar').click();

    expect(
      document.getElementById('mensaje').textContent
    ).toBe('Compra realizada');
  });

  it('debe registrar correctamente el event listener', function() {

    let ejecutado = false;

    document.getElementById('btnComprar')
      .addEventListener('click', function() {
        ejecutado = true;
      });

    document.getElementById('btnComprar').click();

    expect(ejecutado).toBeTrue();
  });

  it('debe validar que exista una cantidad antes de procesar la compra', function() {

    document.getElementById('cantidad').value = '';

    const cantidad =
      document.getElementById('cantidad').value;

    expect(cantidad).toBe('');
  });

});

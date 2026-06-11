

describe('Eventos y DOM', function() {

  beforeEach(function() {
    document.body.innerHTML = `
      <button id="btnComprar">Comprar</button>
      <p id="mensaje"></p>
    `;

    document.getElementById('btnComprar')
      .addEventListener('click', function() {
        document.getElementById('mensaje').textContent = 'Compra realizada';
      });
  });

  it('debe actualizar el mensaje al hacer click en el botón', function() {
    document.getElementById('btnComprar').click();

    expect(
      document.getElementById('mensaje').textContent
    ).toBe('Compra realizada');
  });

});
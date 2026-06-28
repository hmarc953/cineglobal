import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '../utils/toast.js';

describe('Toast helpers (real)', function() {
  let originalToastify;

  beforeEach(function() {
    originalToastify = window.Toastify;
    window.Toastify = function() {
      return {
        showToast: function() {}
      };
    };
  });

  afterEach(function() {
    window.Toastify = originalToastify;
  });

  it('showSuccessToast debe llamar a Toastify con color success correcto', function() {
    const showToastSpy = jasmine.createSpy('showToast');
    spyOn(window, 'Toastify').and.callFake(function() {
      return { showToast: showToastSpy };
    });

    const resultado = showSuccessToast('Operacion ok');

    expect(resultado).toBe(true);
    expect(window.Toastify).toHaveBeenCalled();
    const opciones = window.Toastify.calls.mostRecent().args[0];
    expect(opciones.text).toBe('Operacion ok');
    expect(opciones.style.background).toBe('#198754');
    expect(showToastSpy).toHaveBeenCalled();
  });

  it('showWarningToast debe usar texto oscuro (#212529)', function() {
    spyOn(window, 'Toastify').and.callFake(function() {
      return { showToast: function() {} };
    });

    showWarningToast('Atencion');

    const opciones = window.Toastify.calls.mostRecent().args[0];
    expect(opciones.style.color).toBe('#212529');
  });

  it('debe retornar false cuando window.Toastify no existe', function() {
    window.Toastify = undefined;

    const resultado = showSuccessToast('Sin libreria');

    expect(resultado).toBe(false);
  });

  it('debe retornar false si Toastify lanza un error interno sin romper el flujo', function() {
    spyOn(window, 'Toastify').and.throwError('Toastify interno');

    let resultado;

    expect(function() {
      resultado = showErrorToast('Error');
    }).not.toThrow();

    expect(resultado).toBe(false);
  });
});

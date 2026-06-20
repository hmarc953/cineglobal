import {
  habilitarControl,
  deshabilitarControl,
} from './dom.js';

export function validarFormulariosIniciales() {
  document.querySelectorAll('form').forEach((formulario) => actualizarEstadoSubmit(formulario));
}

export function validarFormulario(formulario) {
  const campos = obtenerCamposValidacion(formulario);
  const valido = campos.every((campo) => {
    const campoValido = validarCampo(campo);
    validarCampoVisual(campo, campoValido);
    return campoValido;
  });
  actualizarEstadoSubmit(formulario);
  return valido;
}

export function validarCampo(campo) {
  // Aplica una validación según el tipo inferido o configurado
  // para cada control del formulario.
  if (campo.disabled) {
    return true;
  }

  const valor = campo.value.trim();
  const tipo = campo.dataset.validate || inferirTipoValidacion(campo);

  if (tipo === 'required') {
    return valor !== '';
  }

  if (tipo === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  if (tipo === 'password') {
    return valor.length >= 6;
  }

  if (tipo === 'number') {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
  }

  if (tipo === 'card') {
    return /^\d{16}$/.test(valor.replace(/\s+/g, ''));
  }

  if (tipo === 'expiry') {
    return /^\d{2}\/\d{2}$/.test(valor);
  }

  if (tipo === 'cvv') {
    return /^\d{3,4}$/.test(valor);
  }

  return true;
}

export function validarCampoVisual(campo, esValido) {
  if (!campo || campo.value.trim() === '') {
    campo.classList.remove('is-valid', 'is-invalid');
    return;
  }

  campo.classList.toggle('is-valid', esValido);
  campo.classList.toggle('is-invalid', !esValido);
}

export function actualizarEstadoSubmit(formulario) {
  if (!formulario) {
    return;
  }

  const boton = formulario.querySelector('[type="submit"]');
  if (!boton) {
    return;
  }

  const campos = obtenerCamposValidacion(formulario);
  const completo = campos.every((campo) => campo.value.trim() !== '' && validarCampo(campo));
  if (completo) {
    habilitarControl(boton);
  } else {
    deshabilitarControl(boton);
  }
}

export function obtenerCamposValidacion(formulario) {
  if (!formulario) {
    return [];
  }

  return Array.from(formulario.querySelectorAll('input, select, textarea')).filter((campo) => {
    if (campo.type === 'search') {
      return false;
    }

    return campo.id !== 'cine' && campo.id !== 'idioma';
  });
}

export function inferirTipoValidacion(campo) {
  const id = campo.id.toLowerCase();

  if (campo.tagName === 'SELECT') {
    return campo.id === 'compraAsientos' ? 'number' : 'required';
  }

  if (campo.type === 'email' || id.includes('email')) {
    return 'email';
  }

  if (id.includes('password') || id.includes('contraseña')) {
    return campo.id === 'loginPassword' ? 'required' : 'password';
  }

  if (id.includes('tarjeta')) {
    return 'card';
  }

  if (id.includes('vencimiento')) {
    return 'expiry';
  }

  if (id.includes('cvv')) {
    return 'cvv';
  }

  return 'required';
}
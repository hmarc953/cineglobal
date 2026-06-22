export function consultarElemento(selector) {
  return document.querySelector(selector);
}

export function valorCampo(selector) {
  const campo = consultarElemento(selector);
  return campo ? campo.value.trim() : '';
}

export function asignarValor(selector, valor) {
  const campo = consultarElemento(selector);
  if (campo) {
    campo.value = valor;
  }
}

export function actualizarTexto(selector, texto) {
  const elemento = consultarElemento(selector);
  if (elemento) {
    elemento.textContent = texto;
  }
}

export function escuchar(selector, evento, handler) {
  const elemento = consultarElemento(selector);
  if (elemento) {
    elemento.addEventListener(evento, handler);
  }
}

export function abrirModal(idModal) {
  const modal = consultarElemento(`#${idModal}`);
  if (modal && window.bootstrap) {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
  }
}

export function cerrarModal(idModal) {
  const modal = consultarElemento(`#${idModal}`);
  if (modal && window.bootstrap) {
    window.bootstrap.Modal.getOrCreateInstance(modal).hide();
  }
}

export function habilitarControl(control) {
  if (control) {
    control.disabled = false;
    control.classList.remove('loading');
  }
}

export function deshabilitarControl(control) {
  if (control) {
    control.disabled = true;
  }
}

export function limpiarFormulario(formulario) {
  if (!formulario) {
    return;
  }

  formulario.reset();
  formulario.querySelectorAll('.is-valid, .is-invalid').forEach((campo) => {
    campo.classList.remove('is-valid', 'is-invalid');
  });
}

export function limpiarMensaje(elemento) {
  if (!elemento) {
    return;
  }

  elemento.textContent = '';
  elemento.className = 'cineglobal-ui-message';
  elemento.hidden = true;
}

const CLASES_MENSAJE = {
  success: 'alert-success',
  error: 'alert-danger',
  loading: 'alert-info loading',
};

export function mostrarMensaje(elemento, mensaje, tipo = 'success') {
  if (!elemento) {
    return;
  }

  const claseEstado = CLASES_MENSAJE[tipo] || CLASES_MENSAJE.success;
  elemento.textContent = mensaje;
  elemento.className = `cineglobal-ui-message alert ${claseEstado}`;
  elemento.hidden = false;
}

export function mostrarError(elemento, mensaje) {
  mostrarMensaje(elemento, mensaje, 'error');
}

export function mostrarExito(elemento, mensaje) {
  mostrarMensaje(elemento, mensaje, 'success');
}

export function mostrarLoading(elemento, mensaje = 'Cargando...') {
  mostrarMensaje(elemento, mensaje, 'loading');
}

export function ocultarLoading(elemento) {
  if (!elemento) {
    return;
  }

  elemento.classList.remove('loading');
}
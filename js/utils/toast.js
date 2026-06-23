const TOAST_DURATION = 3000;
const POSITION = {
  gravity: 'top',
  position: 'right',
};

const COLORS = {
  success: '#198754',
  info: '#0d6efd',
  warning: '#ffc107',
};

let fallbackWarningShown = false;

function hasToastify() {
  return typeof window !== 'undefined' && typeof window.Toastify === 'function';
}

function warnFallback() {
  if (!fallbackWarningShown) {
    console.warn('Toastify no esta disponible. Se omite la notificacion complementaria.');
    fallbackWarningShown = true;
  }
}

function showToast(message, type = 'info') {
  if (!message) {
    return false;
  }

  if (!hasToastify()) {
    warnFallback();
    return false;
  }

  window.Toastify({
    text: message,
    duration: TOAST_DURATION,
    close: true,
    stopOnFocus: true,
    ...POSITION,
    style: {
      background: COLORS[type] || COLORS.info,
      color: type === 'warning' ? '#212529' : '#ffffff',
      borderRadius: '6px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      fontWeight: '600',
    },
  }).showToast();

  return true;
}

/**
 * Muestra una notificacion breve de exito sin reemplazar mensajes inline ni modales.
 *
 * @param {string} message - Mensaje a mostrar.
 * @returns {boolean} true si Toastify pudo mostrar la notificacion.
 */
export function showSuccessToast(message) {
  return showToast(message, 'success');
}

/**
 * Muestra una notificacion breve informativa sin bloquear el flujo actual.
 *
 * @param {string} message - Mensaje a mostrar.
 * @returns {boolean} true si Toastify pudo mostrar la notificacion.
 */
export function showInfoToast(message) {
  return showToast(message, 'info');
}

/**
 * Muestra una notificacion breve de advertencia leve sin reemplazar validaciones.
 *
 * @param {string} message - Mensaje a mostrar.
 * @returns {boolean} true si Toastify pudo mostrar la notificacion.
 */
export function showWarningToast(message) {
  return showToast(message, 'warning');
}

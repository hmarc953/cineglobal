const TOAST_DURATION = 3000;
const POSITION = {
  gravity: 'top',
  position: 'right',
};

const TOAST_CLASSNAME = 'cineglobal-toast';

// Fallback de colores Bootstrap v5 del proyecto por si no estan expuestas
// las CSS custom properties (por ejemplo, durante tests aislados).
const BOOTSTRAP_COLOR_FALLBACK = {
  success: '#198754',
  info: '#0d6efd',
  warning: '#ffc107',
  error: '#dc3545',
  warningText: '#212529',
  defaultText: '#ffffff',
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

function getCssVar(nombreVariable, fallback) {
  if (typeof window === 'undefined' || !window.getComputedStyle) {
    return fallback;
  }

  const valor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(nombreVariable)
    .trim();

  return valor || fallback;
}

function obtenerColoresToast() {
  return {
    success: getCssVar('--bs-success', BOOTSTRAP_COLOR_FALLBACK.success),
    info: getCssVar('--bs-primary', BOOTSTRAP_COLOR_FALLBACK.info),
    warning: getCssVar('--bs-warning', BOOTSTRAP_COLOR_FALLBACK.warning),
    error: getCssVar('--bs-danger', BOOTSTRAP_COLOR_FALLBACK.error),
    warningText: getCssVar('--bs-dark', BOOTSTRAP_COLOR_FALLBACK.warningText),
    defaultText: getCssVar('--bs-white', BOOTSTRAP_COLOR_FALLBACK.defaultText),
  };
}

function showToast(message, type = 'info') {
  if (!message) {
    return false;
  }

  if (!hasToastify()) {
    warnFallback();
    return false;
  }

  try {
    const colors = obtenerColoresToast();

    window.Toastify({
      text: message,
      duration: TOAST_DURATION,
      close: true,
      stopOnFocus: true,
      className: TOAST_CLASSNAME,
      ...POSITION,
      style: {
        background: colors[type] || colors.info,
        color: type === 'warning' ? colors.warningText : colors.defaultText,
        borderRadius: '6px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        fontWeight: '600',
      },
    }).showToast();

    return true;
  } catch (error) {
    console.warn('No se pudo mostrar la notificacion:', error.message);
    return false;
  }
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

/**
 * Muestra una notificacion breve de error sin reemplazar validaciones inline.
 *
 * @param {string} message - Mensaje a mostrar.
 * @returns {boolean} true si Toastify pudo mostrar la notificacion.
 */
export function showErrorToast(message) {
  return showToast(message, 'error');
}

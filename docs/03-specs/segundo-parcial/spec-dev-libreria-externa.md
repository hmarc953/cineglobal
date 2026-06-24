# Spec - Desarrollador JS Librerias Externas

## Informacion del rol

* Rol: Desarrollador JS Librerias Externas
* Responsable: Alejandro Bartomioli
* Rama local: feature/dev-libreria-externa-toastify
* Libreria seleccionada: Toastify
* Metodo de integracion: CDN
* Proyecto: CineGlobal

## Momento 1: Antes de integrar la libreria

### Necesidad especifica del proyecto

CineGlobal tiene multiples interacciones donde el usuario recibe feedback del sistema: filtros de cartelera, inicio de sesion, registro, seleccion de funcion, compra de entradas y envio de consultas de soporte. Actualmente el sitio ya cuenta con mensajes inline en el DOM y modales Bootstrap de confirmacion para operaciones importantes.

Por ese motivo, la libreria externa no debe reemplazar funcionalidades existentes. La necesidad concreta es sumar una capa complementaria de notificaciones breves, no bloqueantes y consistentes, que refuercen acciones exitosas o estados informativos sin alterar validaciones, modales, mensajes inline ni logica de negocio.

### Decision correctiva sobre la libreria

Durante el analisis previo se descarto la idea de usar una libreria de alertas modales como solucion principal, porque podia superponerse con funcionalidades ya implementadas por el proyecto mediante Bootstrap y helpers propios de DOM. La consigna aclara que no se permiten librerias que ya resuelvan funcionalidades existentes con codigo propio.

Toastify se selecciona como alternativa mas adecuada porque no reemplaza los modales existentes ni las validaciones actuales. Su funcion sera mostrar notificaciones tipo toast para reforzar feedback contextual, sin bloquear la interaccion del usuario y sin duplicar responsabilidades del sistema.

### Justificacion de la libreria seleccionada

Toastify es adecuada para CineGlobal porque:

* agrega notificaciones no bloqueantes y livianas;
* no reemplaza la logica de negocio existente;
* no reemplaza los modales Bootstrap ya implementados;
* no reemplaza los mensajes inline de validacion o estado;
* permite reforzar feedback de acciones exitosas e informativas;
* es facil de integrar por CDN;
* tiene bajo impacto sobre la arquitectura actual;
* permite centralizar estilos y textos mediante un wrapper propio.

### Por que no se resuelve con codigo propio

Implementar un sistema propio de toasts implicaria resolver creacion dinamica de nodos, posicionamiento, tiempos de cierre, animaciones, estilos, accesibilidad visual, limpieza de notificaciones y consistencia entre navegadores. Toastify ya resuelve esa capa de presentacion de forma simple y probada, mientras el proyecto conserva su logica propia para formularios, modales, storage y validaciones.

### Metodo de integracion previsto

La libreria se integrara por CDN en `index.html` mediante su CSS y su script JavaScript:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js@1.12.0"></script>
```

El CSS se ubicara en el `head`, despues de Bootstrap y antes de los estilos propios si se requiere ajustar especificidad visual. El script se ubicara antes de `js/script.js` para que el wrapper pueda acceder a `window.Toastify`.

### Puntos de integracion previstos

Toastify se usara en puntos donde una notificacion breve aporta valor sin duplicar componentes actuales:

1. **Filtros de cartelera**: notificar cantidad de peliculas encontradas o ausencia de resultados.
2. **Login exitoso**: informar el inicio de sesion correcto sin mostrar un modal adicional.
3. **Registro exitoso**: informar que la cuenta fue creada correctamente, manteniendo las validaciones existentes.
4. **Seleccion de funcion**: avisar que la funcion fue seleccionada y que el usuario puede continuar al pago.
5. **Consulta enviada**: reforzar que se genero un ticket de soporte.
6. **Persistencia de compra/ticket**: notificar que la compra o consulta fue guardada correctamente en storage.

No se usara Toastify para confirmaciones criticas ni para reemplazar errores de validacion que ya se muestran inline. Si existe feedback redundante o meramente informativo, se unificara en Toastify.

### Decisiones de arquitectura

Se creara un wrapper en:

```text
js/utils/toast.js
```

El objetivo del wrapper es:

* centralizar el uso de Toastify;
* evitar llamadas directas a `Toastify()` distribuidas por todo el proyecto;
* facilitar testing por parte del rol Tester QA/JS;
* permitir fallback seguro si la libreria no carga;
* mantener duracion, posicion, textos y estilos consistentes;
* asegurar que la libreria no reemplace logica de negocio, validaciones ni confirmaciones criticas.

El wrapper exportara funciones reutilizables para notificaciones de exito, informacion y advertencia leve. No se crearan funciones de confirmacion porque el proyecto ya usa modales Bootstrap para confirmaciones relevantes.

### Consistencia visual

Las notificaciones usaran textos breves, posicion fija no invasiva y colores compatibles con la identidad visual de CineGlobal. La integracion no cambiara el diseno general del sitio ni reemplazara validaciones inline o modales criticos. Los avisos redundantes o informativos se unificaran en Toastify para evitar doble feedback.

### Diagnostico tecnico inicial

Durante el analisis del proyecto se detectaron estos puntos relevantes:

* `index.html` carga Bootstrap por CDN y luego `js/script.js` como ES Module.
* `js/script.js` centraliza los flujos de filtros, login, registro, compra, pago y consulta.
* `js/utils/dom.js` contiene helpers de mensajes inline (`mostrarMensaje`, `mostrarError`, `mostrarExito`).
* El feedback principal ya existe mediante mensajes inline y modales Bootstrap de confirmacion.
* No se detectaron usos directos de `alert()` o `confirm()` en codigo productivo.
* Los mejores puntos para Toastify son acciones exitosas, estados informativos y persistencias secundarias.
* El riesgo principal de integracion con ES Modules es el orden de carga: Toastify debe cargarse antes de `js/script.js`.
* No se requiere npm ni cambios de build, porque la consigna pide integracion por CDN.

### Alcance explicitamente excluido

Toastify no se usara para:

* reemplazar modales Bootstrap criticos o con contenido estructurado;
* reemplazar validaciones de formularios;
* reemplazar mensajes inline de error o validacion;
* implementar confirmaciones criticas;
* modificar logica de negocio;
* modificar Fetch/API;
* crear tests avanzados, porque corresponde al rol Tester QA/JS.

### Criterios de aceptacion

* [x] Toastify integrada por CDN en `index.html`.
* [x] Wrapper `js/utils/toast.js` creado con funciones reutilizables.
* [x] La libreria se usa como minimo en 2 puntos de la aplicacion.
* [x] La libreria se integra en filtros, login/registro exitoso, seleccion de funcion, consulta enviada y persistencia de compra/ticket.
* [x] No se reemplazan modales Bootstrap criticos ni validaciones inline.
* [x] Se reemplazan avisos redundantes o informativos por Toastify.
* [x] La logica de negocio existente no se rompe.
* [x] La integracion mantiene consistencia visual.
* [x] Se documenta la libreria en `docs/07-librerias/libreria-doc.md`.
* [x] Se deja preparada la integracion para pruebas del Tester QA/JS.
* [x] Se actualiza `changelog.md`.

## Momento 2: Al cerrar la tarea

### Prompt exacto utilizado

```text
Actua como un desarrollador JavaScript Senior especializado en arquitectura frontend, ES Modules, integracion de librerias externas por CDN, buenas practicas de Git Flow y documentacion tecnica academica.

Implementar Toastify en CineGlobal como libreria externa por CDN. La libreria debe usarse como capa de notificaciones no bloqueantes, sin reemplazar validaciones, logica de negocio ni confirmaciones criticas existentes.

Integrar Toastify en filtros, login/registro exitoso, seleccion de funcion, consulta enviada y persistencia de compra/ticket. Crear wrapper en js/utils/toast.js, documentar en docs/07-librerias/libreria-doc.md, actualizar changelog.md y completar el cierre del spec.
```

### Fragmento del codigo de integracion final

CDN en `index.html`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js@1.12.0"></script>
```

Wrapper en `js/utils/toast.js`:

```javascript
export function showSuccessToast(message) {
  return showToast(message, 'success');
}

export function showInfoToast(message) {
  return showToast(message, 'info');
}

export function showWarningToast(message) {
  return showToast(message, 'warning');
}
```

Uso real en filtros:

```javascript
if (debeNotificarFiltro(event)) {
  if (resultados.length) {
    showInfoToast(mensajeFiltros);
  } else {
    showWarningToast(mensajeFiltros);
  }
}
```

Uso real en persistencia de compra:

```javascript
guardarEnListaStorage(STORAGE_KEYS.compras, compra.toJSON(), 'local');
showSuccessToast('Compra guardada en el historial.');
```

### Ajustes manuales realizados

* Se agrego Toastify por CDN en `index.html`.
* Se creo `js/utils/toast.js` como wrapper centralizado.
* Se agregaron notificaciones en filtros, login exitoso, registro exitoso, seleccion de funcion, compra guardada y consulta/ticket guardado.
* Se mantuvieron los mensajes inline de validacion y error.
* Se mantuvieron los modales Bootstrap criticos, como la confirmacion de compra.
* Se reemplazo el modal redundante de login exitoso por Toastify.
* Se reemplazo el mensaje inline informativo de filtros por Toastify.
* No se modificaron modelos POO, Storage, Fetch/API ni tests avanzados.
* Se actualizo `changelog.md` con la entrada del rol y el PR asociado.

### Resumen de integracion

Toastify quedo integrado en:

* resultados de filtros de cartelera;
* login exitoso;
* registro exitoso;
* seleccion de funcion antes del pago;
* persistencia de compra en historial;
* consulta enviada y ticket persistido.

### Mejora en experiencia de usuario

La mejora consiste en brindar feedback breve y contextual sin interrumpir la navegacion. Toastify acompana acciones exitosas e informativas, evita dobles avisos en flujos simples y conserva modales criticos, mensajes inline de error y validaciones.

### Coordinacion con Tester QA/JS

El Tester QA/JS deberia validar en `library.spec.js`:

* carga de Toastify por CDN;
* funciones exportadas por `js/utils/toast.js`;
* fallback cuando `window.Toastify` no existe;
* notificacion en filtros;
* notificacion en login y registro exitosos;
* notificacion en seleccion de funcion;
* notificacion de compra guardada;
* notificacion de consulta enviada y ticket guardado;
* que no se hayan reemplazado modales Bootstrap criticos ni mensajes inline de validacion.

### Issues respondidas o pendientes

* Issue asociada: No se reportaron issues sobre la libreria al momento del cierre.
* PR asociada: [#215](https://github.com/hmarc953/cineglobal/pull/215).
* Estado: pendiente de review del Coordinador.
* Changelog: actualizado.

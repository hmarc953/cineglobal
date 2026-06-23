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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
```

El CSS se ubicara en el `head`, despues de Bootstrap y antes de los estilos propios si se requiere ajustar especificidad visual. El script se ubicara antes de `js/script.js` para que el wrapper pueda acceder a `window.Toastify`.

### Puntos de integracion previstos

Toastify se usara como capa complementaria en puntos donde una notificacion breve aporta valor sin reemplazar componentes actuales:

1. **Filtros de cartelera**: notificar cantidad de peliculas encontradas o ausencia de resultados.
2. **Login exitoso**: reforzar el inicio de sesion correcto sin reemplazar el modal o mensaje actual.
3. **Registro exitoso**: informar que la cuenta fue creada correctamente.
4. **Seleccion de funcion**: avisar que la funcion fue seleccionada y que el usuario puede continuar al pago.
5. **Consulta enviada**: reforzar que se genero un ticket de soporte.
6. **Persistencia de compra/ticket**: notificar que la compra o consulta fue guardada correctamente en storage.

No se usara Toastify para confirmaciones criticas ni para reemplazar errores de validacion que ya se muestran inline.

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
* asegurar que la libreria sea complementaria y no reemplace funcionalidades existentes.

El wrapper exportara funciones reutilizables para notificaciones de exito, informacion y advertencia leve. No se crearan funciones de confirmacion porque el proyecto ya usa modales Bootstrap para confirmaciones relevantes.

### Consistencia visual

Las notificaciones usaran textos breves, posicion fija no invasiva y colores compatibles con la identidad visual de CineGlobal. La integracion no cambiara el diseno general del sitio, no eliminara modales Bootstrap y no reemplazara mensajes inline existentes. Toastify funcionara como refuerzo visual secundario.

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

* reemplazar modales Bootstrap existentes;
* reemplazar validaciones de formularios;
* reemplazar mensajes inline de error;
* implementar confirmaciones criticas;
* modificar logica de negocio;
* modificar Fetch/API;
* crear tests avanzados, porque corresponde al rol Tester QA/JS.

### Criterios de aceptacion

* [ ] Toastify integrada por CDN en `index.html`.
* [ ] Wrapper `js/utils/toast.js` creado con funciones reutilizables.
* [ ] La libreria se usa como minimo en 2 puntos de la aplicacion.
* [ ] La libreria se integra en filtros, login/registro exitoso, seleccion de funcion, consulta enviada y persistencia de compra/ticket.
* [ ] No se reemplazan modales Bootstrap existentes.
* [ ] No se reemplazan mensajes inline de validacion.
* [ ] La logica de negocio existente no se rompe.
* [ ] La integracion mantiene consistencia visual.
* [ ] Se documenta la libreria en `docs/07-librerias/libreria-doc.md`.
* [ ] Se deja preparada la integracion para pruebas del Tester QA/JS.
* [ ] Se actualiza `changelog.md`.

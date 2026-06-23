# Spec - Desarrollador JS Librerias Externas

## Informacion del rol

* Rol: Desarrollador JS Librerias Externas
* Responsable: Alejandro Bartomioli
* Rama local: feature/dev-libreria-externa-sweetalert2
* Libreria seleccionada: SweetAlert2
* Metodo de integracion: CDN
* Proyecto: CineGlobal

## Momento 1: Antes de integrar la libreria

### Necesidad especifica del proyecto

CineGlobal tiene multiples interacciones donde el usuario necesita feedback claro y consistente: inicio de sesion, registro de cuenta, seleccion y compra de entradas, envio de consultas de soporte, errores de validacion, confirmaciones de operaciones completadas y avisos informativos durante el uso de filtros o formularios.

Actualmente el sitio combina mensajes inline en el DOM con modales Bootstrap propios para algunas confirmaciones. Esa base funciona, pero la experiencia puede unificarse con una libreria externa especializada para alertas, errores, advertencias, confirmaciones y mensajes de exito sin cambiar la logica de negocio existente.

### Justificacion de la libreria seleccionada

SweetAlert2 es adecuada para CineGlobal porque:

* mejora visualmente alertas y confirmaciones;
* evita depender de `alert()` y `confirm()` nativos;
* permite mensajes consistentes en todo el sitio;
* es liviana y facil de integrar por CDN;
* no reemplaza la logica de negocio;
* mejora la experiencia de usuario y la accesibilidad visual mediante dialogos claros, foco controlado, iconos reconocibles y botones consistentes.

### Por que no se resuelve con codigo propio

Desarrollar un sistema propio de modales implicaria resolver accesibilidad, estilos, estados, botones, overlays, foco, cierre por teclado, compatibilidad entre navegadores y consistencia visual. SweetAlert2 ya resuelve esos aspectos de forma probada, por lo que permite concentrar el desarrollo en la integracion responsable con la arquitectura existente.

### Metodo de integracion previsto

La libreria se integrara por CDN en `index.html`, antes de los scripts propios que utilicen el wrapper:

```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

### Puntos de integracion previstos

SweetAlert2 se usara de forma transversal en los puntos del sitio donde corresponda mostrar feedback relevante, incluyendo como minimo:

1. Confirmacion o exito en compra de entradas.
2. Envio exitoso del formulario de consulta/contacto.
3. Login exitoso o error de credenciales.
4. Registro exitoso o error de validacion.
5. Confirmaciones de acciones importantes, si existen.
6. Mensajes de error o advertencia en validaciones de formularios.

### Decisiones de arquitectura

Se creara un wrapper en:

```text
js/utils/alerts.js
```

El objetivo del wrapper es:

* centralizar el uso de SweetAlert2;
* evitar llamadas directas a `Swal.fire` distribuidas por todo el proyecto;
* facilitar testing;
* permitir fallback si la libreria no carga;
* mantener textos, iconos y estilos consistentes.

El wrapper exportara funciones reutilizables para mensajes de exito, error, advertencia, informacion y confirmacion. Los modulos de la aplicacion importaran esas funciones en lugar de depender directamente del objeto global `window.Swal`.

### Consistencia visual

Se usaran textos breves, iconos estandar de SweetAlert2 y botones compatibles con el estilo Bootstrap/CineGlobal. La integracion no cambiara el diseno general del sitio ni reemplazara la estructura visual existente; solo mejorara la capa de feedback al usuario.

### Diagnostico tecnico inicial

Durante el analisis del proyecto se detectaron estos puntos relevantes:

* `index.html` carga Bootstrap por CDN y luego `js/script.js` como ES Module.
* `js/script.js` centraliza los flujos de filtros, login, registro, compra, pago y consulta.
* `js/utils/dom.js` contiene helpers de mensajes inline (`mostrarMensaje`, `mostrarError`, `mostrarExito`).
* No se detectaron usos directos de `alert()` o `confirm()` en codigo productivo.
* El feedback principal se implementa mediante mensajes inline y modales Bootstrap de confirmacion.
* Los mejores puntos de integracion para SweetAlert2 son login, registro, seleccion de compra, confirmacion de pago, consulta de soporte y errores relevantes de validacion.
* El riesgo principal de integracion con ES Modules es el orden de carga: SweetAlert2 debe cargarse antes de `js/script.js`.
* No se requiere npm ni cambios de build, porque la consigna pide CDN.

### Criterios de aceptacion

* [ ] SweetAlert2 integrada por CDN en index.html.
* [ ] Wrapper js/utils/alerts.js creado con funciones reutilizables.
* [ ] La libreria se usa como minimo en 2 puntos de la aplicacion.
* [ ] Se reemplazan alertas nativas o mensajes simples en todos los lugares razonables del sitio.
* [ ] La logica de negocio existente no se rompe.
* [ ] La integracion mantiene consistencia visual.
* [ ] Se documenta la libreria en docs/07-librerias/libreria-doc.md.
* [ ] Se deja preparada la integracion para pruebas del Tester QA/JS.
* [ ] Se actualiza changelog.md.

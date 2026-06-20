# spec-dev-eventos-dom.md

## Rol

Desarrollador JS Eventos + DOM

## Objetivo del rol

El objetivo de este rol es refactorizar `js/script.js` para que actue solo como controlador principal de la aplicacion CineGlobal. Este archivo no debe contener logica de negocio, sino encargarse de registrar eventos, manipular el DOM, aplicar validaciones visuales y orquestar llamadas a las clases del dominio definidas en `js/models/`.

El controlador principal debera coordinar la interaccion entre la interfaz de usuario, las clases del dominio y la capa de persistencia provista por `js/utils/storage.js`, manteniendo una separacion clara de responsabilidades.

## BEFORE - Plan antes de abrir Copilot Agent o escribir codigo

### Eventos y controles a implementar por flujo

#### Flujo 1 - Login / Registro

El flujo de login y registro debera contemplar los formularios destinados a autenticar usuarios existentes y registrar nuevos usuarios en la aplicacion.

Controles principales a identificar:

* Formulario de login.
* Formulario de registro.
* Input de email para login.
* Input de password para login.
* Inputs de datos personales para registro.
* Input de email para registro.
* Input de password para registro.
* Boton para iniciar sesion.
* Boton para registrar usuario.
* Botones o enlaces para alternar entre vista de login y vista de registro.
* Contenedores de mensajes de error y exito.

Eventos a implementar:

* `submit` en el formulario de login para capturar credenciales, evitar el envio tradicional del formulario y solicitar autenticacion al dominio.
* `submit` en el formulario de registro para capturar los datos ingresados, validar la interfaz y solicitar el alta del usuario.
* `input` en campos obligatorios para aplicar validacion visual en tiempo real.
* `click` en botones o enlaces de cambio de vista para mostrar u ocultar secciones.

Validaciones visuales previstas:

* Verificar que los campos obligatorios no esten vacios.
* Verificar que el email tenga un formato valido desde la perspectiva de la UI.
* Marcar visualmente campos invalidos.
* Limpiar mensajes previos cuando el usuario vuelva a editar un campo.
* Mostrar mensajes de error cuando la autenticacion o el registro no puedan completarse.
* Mostrar mensajes de exito cuando el usuario inicie sesion o se registre correctamente.

La logica de autenticacion y registro no debe implementarse en `js/script.js`; debera delegarse en los metodos publicos de `GestorUsuarios`.

#### Flujo 2 - Compra de entradas

El flujo de compra de entradas debera permitir que el usuario seleccione una pelicula, elija una funcion disponible, indique la cantidad de entradas, ingrese o confirme el email del comprador y visualice un resumen antes de confirmar la operacion.

Controles principales a identificar:

* Selector o listado de peliculas disponibles.
* Selector o listado de funciones asociadas a la pelicula elegida.
* Input numerico para cantidad de entradas.
* Input de email del comprador.
* Contenedor de resumen de compra.
* Boton para confirmar compra.
* Contenedor para mostrar el resultado de la operacion.

Eventos a implementar:

* `change` en la seleccion de pelicula para obtener la pelicula elegida y renderizar sus funciones disponibles.
* `change` en la seleccion de funcion para actualizar el resumen de compra.
* `input` en la cantidad de entradas para validar el valor ingresado y recalcular el resumen.
* `input` en el email del comprador para validar formato y estado visual.
* `submit` en el formulario de compra para confirmar la compra mediante las clases del dominio.

Comportamiento esperado:

* Al seleccionar una pelicula, se deben consultar sus funciones disponibles mediante `Pelicula.obtenerFuncionesDisponibles()`.
* Al modificar cantidad, funcion o email, se debe actualizar el resumen visible de la compra.
* El boton de confirmacion debe habilitarse solo cuando los datos minimos sean validos.
* El resultado de la compra debe renderizarse dinamicamente en el DOM, sin usar `alert()`.
* La compra confirmada debera persistirse mediante la capa Storage cuando corresponda.

La creacion y confirmacion de la compra debera delegarse en la clase `Compra`, sin duplicar reglas de negocio dentro del controlador.

#### Flujo 3 - Filtro de peliculas

El flujo de filtro y busqueda de peliculas debera permitir al usuario encontrar peliculas por titulo, categoria y clasificacion, actualizando los resultados de forma dinamica.

Controles principales a identificar:

* Formulario o contenedor de filtros.
* Input de busqueda por titulo.
* Selector de categoria.
* Selector de clasificacion.
* Boton para aplicar filtros, si el flujo lo requiere.
* Boton para limpiar filtros.
* Contenedor de resultados de peliculas.
* Mensaje para estado sin resultados.

Eventos a implementar:

* `input` en el campo de titulo para filtrar mientras el usuario escribe.
* `change` en el selector de categoria.
* `change` en el selector de clasificacion.
* `submit` en el formulario de filtros si se usa un formulario para aplicar la busqueda.
* `click` en el boton limpiar filtros para restaurar el estado inicial.

Comportamiento esperado:

* Los filtros se deben capturar como un objeto de criterios de busqueda.
* La busqueda debe delegarse en `CatalogoPeliculas.buscarPorFiltros(filtros)`.
* Los resultados deben actualizarse en el DOM mediante una funcion reutilizable de renderizado.
* Si no hay resultados, debe mostrarse un mensaje visual claro.
* Al limpiar filtros, se deben restaurar los controles y renderizar nuevamente el catalogo disponible.
* Si corresponde, la seleccion temporal de filtros puede persistirse mediante Storage.

El controlador no debe implementar reglas internas de filtrado si estas corresponden al catalogo de peliculas.

#### Flujo 4 - Consulta de soporte

El flujo de consulta de soporte debera permitir que el usuario envie una consulta con email, titulo y descripcion, recibiendo una confirmacion visual con el ticket generado.

Controles principales a identificar:

* Formulario de soporte.
* Input de email.
* Input o campo de titulo.
* Textarea de descripcion.
* Boton para enviar consulta.
* Contenedor para errores de validacion.
* Contenedor para mensaje de confirmacion.

Eventos a implementar:

* `input` en email, titulo y descripcion para aplicar validacion en tiempo real.
* `submit` en el formulario de soporte para crear la consulta, validarla y generar el ticket.
* `click` en controles auxiliares si existieran, por ejemplo limpiar formulario o cerrar mensaje.

Comportamiento esperado:

* Validar visualmente que el email tenga formato valido.
* Validar visualmente que el titulo y la descripcion no esten vacios.
* Habilitar el envio solo cuando el formulario tenga datos minimos validos.
* Crear una instancia o estructura de `ConsultaSoporte` usando los datos del formulario.
* Invocar `ConsultaSoporte.validar()` antes de generar el ticket.
* Invocar `ConsultaSoporte.generarTicket()` cuando la consulta sea valida.
* Renderizar el numero o identificador de ticket en el DOM.
* Persistir el ticket mediante la capa Storage cuando corresponda.

No deben usarse `prompt()` ni `alert()` para solicitar datos o comunicar resultados.

### Patron homogeneo para manejo de eventos

El manejo de eventos en `js/script.js` debera seguir un patron comun para todos los flujos:

1. `DOMContentLoaded` llama a `inicializarApp`.
2. `inicializarApp` carga datos iniciales y llama a `configurarEventos`.
3. `configurarEventos` registra todos los listeners.
4. Cada handler:

   * ejecuta `event.preventDefault()` si corresponde;
   * captura datos del formulario;
   * valida entradas de UI;
   * invoca metodos de clases del dominio;
   * actualiza el DOM con funciones reutilizables;
   * persiste datos usando Storage cuando corresponda.
5. Usar delegacion de eventos cuando haya elementos creados dinamicamente.

Este patron busca que el controlador sea predecible, facil de leer y consistente entre los distintos flujos de la aplicacion.

### Decisiones de arquitectura

`js/script.js` no tendra logica de negocio. Su responsabilidad sera coordinar eventos, estado visual de la interfaz y comunicacion con las capas ya definidas del proyecto.

La logica de negocio quedara en `js/models/`, dentro de las clases del dominio. Las reglas relacionadas con usuarios, peliculas, funciones, compras y consultas de soporte deberan resolverse en esas clases.

`js/script.js` invocara metodos publicos de las clases del dominio, sin acceder innecesariamente a detalles internos de implementacion.

La persistencia se delegara a `js/utils/storage.js`, utilizando las funciones CRUD disponibles para `localStorage` y `sessionStorage`.

El controlador usara variables globales minimas. Cuando sea necesario mantener estado de UI, se priorizara un objeto de estado simple y acotado, evitando dispersar variables globales por todo el archivo.

Las funciones DOM reutilizables previstas son:

* `mostrarMensaje`
* `mostrarError`
* `mostrarExito`
* `limpiarMensaje`
* `mostrarSeccion`
* `ocultarSeccion`
* `renderizarPeliculas`
* `renderizarFunciones`
* `renderizarResumenCompra`
* `validarCampoVisual`
* `habilitarControl`
* `deshabilitarControl`
* `limpiarFormulario`

Estas funciones deberan concentrar la manipulacion repetida del DOM, como mostrar mensajes, renderizar listas, modificar clases CSS, limpiar formularios y actualizar estados visuales.

### Coordinacion con otros roles

#### Coordinacion con el rol POO

Con el rol POO se debe confirmar la interfaz publica de las clases del dominio para evitar duplicar logica en `js/script.js` y asegurar que el controlador invoque los metodos correctos.

Metodos a confirmar:

* `GestorUsuarios.registrarUsuario(datos)`
* `GestorUsuarios.autenticar(email, password)`
* `CatalogoPeliculas.buscarPorFiltros(filtros)`
* `CatalogoPeliculas.obtenerPeliculaPorId(id)`
* `Pelicula.obtenerFuncionesDisponibles()`
* `Compra.confirmarCompra()`
* `ConsultaSoporte.validar()`
* `ConsultaSoporte.generarTicket()`

Tambien se debe acordar el formato de datos que cada metodo espera recibir y el tipo de respuesta que devuelve, especialmente para errores de validacion, resultados vacios y operaciones exitosas.

#### Coordinacion con el rol Storage

Con el rol Storage se debe confirmar:

* claves de storage;
* uso de `local` y `session`;
* datos a persistir desde la UI:

  * usuario activo;
  * historial de compras;
  * tickets de soporte;
  * filtros o seleccion temporal de pelicula/funcion.

El controlador debera utilizar la capa Storage sin acceder directamente a `localStorage` o `sessionStorage`, salvo que el equipo acuerde explicitamente otra convencion.

#### Coordinacion con Tester QA

Con Tester QA se debe responder a issues vinculadas a eventos, DOM, validacion visual o flujos incompletos.

Tambien se deberan revisar escenarios de prueba asociados a:

* formularios vacios;
* emails invalidos;
* seleccion incompleta de pelicula o funcion;
* compra con cantidad invalida;
* filtros sin resultados;
* consultas de soporte incompletas;
* mensajes visuales de error y exito;
* habilitacion y deshabilitacion de controles.

### Criterios de aceptacion

* [x] Este archivo fue creado y commiteado antes de modificar `js/script.js`.
* [x] `js/script.js` queda como controlador principal.
* [x] No queda logica de negocio dentro de `js/script.js`.
* [x] No queda ningun `prompt()` en el proyecto.
* [x] No queda ningun `alert()` en el proyecto.
* [x] Hay listeners para login, registro, compra, filtros y soporte.
* [x] Se implementa validacion en tiempo real con feedback visual.
* [x] Se habilitan/deshabilitan controles segun el estado del formulario.
* [x] Se muestran resultados dinamicamente en el DOM.
* [x] Se crean, actualizan o eliminan elementos dinamicamente cuando corresponde.
* [x] Se aplican clases CSS para estados `loading`, `success`, `error` o equivalentes.
* [x] Se muestran/ocultan secciones segun el flujo.
* [x] Se invocan metodos de las clases del dominio sin duplicar logica de negocio.
* [x] Se persisten datos desde la UI usando la capa Storage cuando corresponda.
* [x] El codigo final queda documentado con comentarios claros.

## AT CLOSE - Evidencia al cerrar la tarea

Esta seccion documenta la evidencia de cierre de la tarea de refactorizacion del controlador principal de CineGlobal.

### Prompt exacto utilizado en Copilot Agent

```text
Actua como Desarrollador JS Eventos + DOM del proyecto CineGlobal.

Contexto adjunto:
- js/models/Usuario.js
- js/models/GestorUsuarios.js
- js/models/Pelicula.js
- js/models/Funcion.js
- js/models/CatalogoPeliculas.js
- js/models/Compra.js
- js/models/ConsultaSoporte.js
- docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md
- index.html
- js/script.js

Necesito refactorizar js/script.js para que actue unicamente como controlador principal:
- eliminar toda logica de negocio del archivo;
- eliminar prompt() y alert();
- registrar event listeners para login, registro, compra, filtros y soporte;
- capturar datos desde formularios e inputs;
- validar en tiempo real con feedback visual;
- manipular el DOM para mostrar resultados, errores y confirmaciones;
- crear, actualizar o limpiar elementos dinamicos cuando corresponda;
- aplicar clases CSS para estados success, error, loading o equivalentes;
- invocar metodos publicos de las clases del dominio sin duplicar reglas internas;
- integrar la persistencia usando la capa Storage cuando este disponible.

Mantener el patron:
DOMContentLoaded -> inicializarApp -> cargarDatosIniciales -> configurarEventos.

Revisar tambien index.html y realizar solo los cambios necesarios para conectar formularios, botones, mensajes y el controlador como modulo ES6.
```

### Archivos adjuntados como contexto

* `js/models/*.js`
* `js/utils/storage.js`
* `docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md`
* `index.html`
* `js/script.js`

### Fragmento de codigo generado por Copilot

```js
document.addEventListener('DOMContentLoaded', inicializarApp);

function configurarEventos() {
  escuchar(SELECTORES.formularioFiltros, 'submit', manejarFiltroPeliculas);
  escuchar(SELECTORES.inputTitulo, 'input', manejarFiltroPeliculas);
  escuchar(SELECTORES.selectCategoria, 'change', manejarFiltroPeliculas);
  escuchar(SELECTORES.selectClasificacion, 'change', manejarFiltroPeliculas);
  escuchar(SELECTORES.botonLimpiarFiltros, 'click', manejarLimpiarFiltros);
  escuchar(SELECTORES.formularioLogin, 'submit', manejarLogin);
  escuchar(SELECTORES.formularioRegistro, 'submit', manejarRegistro);
  escuchar(SELECTORES.formularioCompra, 'submit', manejarSeleccionCompra);
  escuchar(SELECTORES.formularioPago, 'submit', manejarConfirmacionCompra);
  escuchar(SELECTORES.formularioConsulta, 'submit', manejarConsultaSoporte);

  document.addEventListener('input', manejarValidacionEnTiempoReal);
  document.addEventListener('change', manejarValidacionEnTiempoReal);
  escuchar(SELECTORES.listadoPeliculas, 'click', manejarClickPelicula);
}
```

### Ajustes manuales realizados

* Se reemplazo el flujo previo basado en `prompt()` y `alert()` por formularios HTML, mensajes en pantalla y modales de confirmacion.
* Se ajusto `index.html` para agregar IDs de formularios, botones `submit`, contenedores de mensajes y carga del controlador mediante `type="module"`.
* Se adapto `js/script.js` para importar las clases del dominio con modulos ES6 desde `js/models/`.
* Se utilizaron clases CSS existentes de Bootstrap para feedback visual de estados `success` y `error`.
* Se adapto el controlador para leer campos por `id` cuando el HTML existente no tenia `name` o `data-validate`.
* Se integro la capa Storage mediante import ES6 de `StorageUtil` desde `js/utils/storage.js`.
* Se verifico con Playwright que la pagina cargue sin errores, renderice 4 peliculas y complete flujos de filtro, login, soporte y compra.

### Decisiones finales sobre la estructura del controlador

* `js/script.js` queda organizado como controlador principal con estado global minimo en `estadoApp`.
* La inicializacion sigue el patron `DOMContentLoaded` -> `inicializarApp` -> `cargarDatosIniciales` -> `configurarEventos`.
* La logica de dominio se delega en `GestorUsuarios`, `CatalogoPeliculas`, `Pelicula`, `Compra` y `ConsultaSoporte`.
* Las funciones DOM reutilizables concentran mensajes, validacion visual, renderizado de peliculas, renderizado de funciones, resumen de compra, limpieza de formularios y habilitacion/deshabilitacion de controles.
* La delegacion de eventos se usa en el listado de peliculas para capturar clicks sobre botones generados dinamicamente.
* La persistencia queda desacoplada del controlador mediante funciones auxiliares que invocan `StorageUtil`.

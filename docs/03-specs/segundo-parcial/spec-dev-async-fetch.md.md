# Integración de Datos Externos mediante API

## Selección y justificación de la API o JSON estático a utilizar

Para la implementación de la funcionalidad de obtención de datos externos se seleccionó una API REST de películas (**TheMovieDB**) debido a su relación directa con la temática del sistema CineGlobal. Esta API permite acceder a información actualizada sobre películas, incluyendo títulos, descripciones, géneros, imágenes y valoraciones.

Como alternativa para pruebas controladas y desarrollo local, se contempla el uso de archivos JSON estáticos que simulan las respuestas de la API. Esta estrategia permite validar la lógica de integración sin depender de la disponibilidad de servicios externos.

La elección de una API externa permite aplicar conceptos de consumo de servicios REST mediante `fetch`, procesamiento de respuestas asíncronas y actualización dinámica de la interfaz de usuario.

---

## Diseño de los estados de carga (loading/success/error)

La solución contempla tres estados principales durante el consumo de datos:

### Loading

Mientras se realiza la solicitud HTTP, la interfaz informa al usuario que la operación se encuentra en proceso.

Funciones utilizadas:

* `mostrarLoading(elemento, mensaje)`
* `deshabilitarControl(control)`

Objetivos:

* Informar que la carga está en curso.
* Evitar acciones repetidas sobre los controles.
* Mejorar la experiencia de usuario.

### Success

Cuando la solicitud finaliza correctamente, los datos son procesados e incorporados al DOM.

Funciones utilizadas:

* `mostrarExito(elemento, mensaje)`
* `actualizarTexto(selector, texto)`
* `consultarElemento(selector)`

Objetivos:

* Mostrar los datos recuperados.
* Confirmar la correcta ejecución de la operación.
* Actualizar dinámicamente la interfaz.

### Error

Si ocurre un problema de red, una respuesta inválida o cualquier excepción durante el proceso, se informa al usuario mediante mensajes descriptivos.

Funciones utilizadas:

* `mostrarError(elemento, mensaje)`

Objetivos:

* Notificar fallos de manera clara.
* Evitar bloqueos de la aplicación.
* Facilitar el diagnóstico de errores durante las pruebas.

---

## Funciones de orden superior a aplicar

Para el procesamiento de los datos obtenidos desde la API se utilizarán funciones de orden superior propias de JavaScript:

### `map()`

Transforma los datos obtenidos para generar estructuras adaptadas a la visualización.

### `filter()`

Permite filtrar películas según criterios como género, clasificación o búsqueda por nombre.

### `find()`

Obtiene un elemento específico dentro de una colección de resultados.

### `forEach()`

Recorre los elementos para renderizarlos en el DOM.

### `sort()`

Ordena las películas según distintos criterios como título, fecha o valoración.

Estas funciones permiten escribir código más declarativo, legible y mantenible.

---

## Criterios de aceptación

### Checklist

* [ ] Solicitud de datos implementada mediante `fetch`.
* [ ] Manejo de errores mediante bloques `try/catch`.
* [ ] Estado de carga visualizado correctamente durante la petición.
* [ ] Estado de éxito mostrado al finalizar la operación.
* [ ] Estado de error mostrado ante fallos de red o respuestas inválidas.
* [ ] Datos obtenidos integrados dinámicamente al DOM.
* [ ] Uso de funciones de orden superior (`map`, `filter`, `find`, `forEach`, `sort`) para procesar los datos.
* [ ] Validación de la respuesta antes de utilizar la información recibida.
* [ ] Casos de prueba definidos en conjunto con el equipo Tester QA.
* [ ] Pruebas realizadas para escenarios exitosos.
* [ ] Pruebas realizadas para escenarios de error.
* [ ] Verificación de la correcta visualización de los datos en la interfaz.

# Integración de Datos Externos mediante API

## BEFORE

## Selección y justificación de la API o JSON estático a utilizar

## Selección y justificación de la API

Para la implementación de la funcionalidad de obtención de datos externos se seleccionó **TheMovieDB (TMDB)** como fuente principal de información, debido a que proporciona datos actualizados sobre películas y se encuentra alineada con la temática del sistema CineGlobal.

La integración se realiza mediante consultas HTTP utilizando `fetch` a los endpoints oficiales de TMDB, obteniendo información como títulos, géneros, fechas de estreno, imágenes y otros datos relevantes para la construcción dinámica del catálogo de películas.

Durante el procesamiento de la respuesta, los datos recibidos son adaptados al modelo interno de la aplicación mediante funciones de transformación y sanitización, permitiendo su integración con las clases POO existentes (`Pelicula`, `Funcion` y `CatalogoPeliculas`).

Para garantizar la disponibilidad del sistema ante posibles fallos externos, se implementó un mecanismo de contingencia que utiliza la cartelera local definida en `crearPeliculasIniciales()` cuando la API no puede ser consumida correctamente. De esta forma, la aplicación continúa funcionando aun cuando el servicio externo no esté disponible.

La elección de TheMovieDB permitió aplicar conceptos de consumo de servicios REST mediante `fetch`, manejo de promesas, procesamiento de respuestas asíncronas, validación y transformación de datos, actualización dinámica de la interfaz y manejo controlado de errores.

### Configuración del endpoint de TheMovieDB

La URL utilizada para el consumo de datos se configuró apuntando al endpoint de películas populares de TheMovieDB. La implementación define una constante denominada `API_PELICULAS_URL`, que referencia el recurso:

`https://api.themoviedb.org/3/movie/popular`

Las solicitudes se realizan mediante `fetch`, incorporando la autenticación requerida por TheMovieDB a través de API Key o Bearer Token según la configuración del entorno.

Posteriormente, los datos obtenidos son sanitizados y transformados para adaptarlos al modelo interno de CineGlobal antes de crear las instancias de las clases `Pelicula`, `Funcion` y `CatalogoPeliculas`.
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

* [x] Solicitud de datos implementada mediante `fetch`.
* [x] Manejo de errores mediante bloques `try/catch`.
* [x] Estado de carga visualizado correctamente durante la petición.
* [x] Estado de éxito mostrado al finalizar la operación.
* [x] Estado de error mostrado ante fallos de red o respuestas inválidas.
* [x] Datos obtenidos integrados dinámicamente al DOM.
* [x] Uso de funciones de orden superior (`map`, `filter`, `find`, `forEach`, `sort`) para procesar los datos.
* [x] Validación de la respuesta antes de utilizar la información recibida.
* [x] Casos de prueba definidos en conjunto con el equipo Tester QA.
* [x] Pruebas realizadas para escenarios exitosos.
* [x] Pruebas realizadas para escenarios de error.
* [x] Verificación de la correcta visualización de los datos en la interfaz.
---

## AT CLOSE
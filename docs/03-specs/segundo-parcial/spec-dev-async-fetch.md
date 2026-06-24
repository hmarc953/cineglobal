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

## Prompt exacto utilizado y ajustes manuales realizados. 
```
modificame esto: /** * Servicio para consumo de API externa */ const ApiService = { /** * Obtiene datos de la API * @param {string} endpoint - Endpoint a consultar * @returns {Promise<Object>} Datos obtenidos */ async fetchData(endpoint) { try { // Mostrar estado de carga this.showLoading(); const response = await fetch(endpoint); if (!response.ok) { throw new Error(HTTP error! status: ${response.status}); } const data = await response.json(); this.hideLoading(); return data; } catch (error) { this.hideLoading(); this.showError(error.message); throw error; } }, showLoading() { // Actualizar UI con estado de carga }, hideLoading() { // Ocultar estado de carga }, showError(message) { // Mostrar error en UI } }; export default ApiService;
```
### ajustes manuales realizados 
Los ajustes manuales fueron muchos Mayoritariamente por erorres entre lo que se pedia y lo que entregaba la ia tambien hubo mucho problemas para la integracion de esta api porque la ia no terminaba de entender que el codigo devia integrar la api que se estaba utilizando y seguia creando codigo no adaptado a la api.

### Resumen de la integración con clases POO y con Storage.
Hubo muchos problemas en la integracion de la api con las clases y el storage .

## Issues respondidas y su resolución.
No hubo como tal una issues pero hubo un monton de correciones en la pull reques que tuvimos que solucionar para entregar esta actividad .Finalmente, se logró una integración funcional mediante la transformación de datos en el servicio API y la estandarización del modelo interno. Agradesco a mis compañeros por ayudarme con las correciones. 

### Aplicación de alguna funcion de orden superior
#### map:
``` java 
datosApi.map(
        (pelicula) =>
          new Pelicula(
           pelicula.id,
           pelicula.titulo,
           pelicula.categoria,
           pelicula.clasificacion,
           pelicula.fechaEstreno,
           pelicula.imagen,
``` 
#### filter:
``` java
.filter(
      (item) =>
        item &&
        item.id &&
        (item.title || item.name)
    )
``` 
#### Reduce:
``` java
return datos.reduce(
    (total, pelicula) =>
      total + (pelicula.funciones?.length || 0),
    0
  );
``` 
#### Validar y sanitizar datos recibidos de la API: 
``` java
sanitizarDatos(datos = []) {
  let lista = [];

  if (Array.isArray(datos)) {
    lista = datos;
  } else if (
    datos &&
    Array.isArray(datos.results)
  ) {
    lista = datos.results;
  }
```
### Manejo de errores: 
#### Implementar try-catch en operaciones asíncronas: 
``` java
catch (error) {
      if (error.message.startsWith('HTTP_')) {
        error.userMessage =
          'El servidor respondió con un error.';
      } else if (error instanceof SyntaxError) {
        error.userMessage =
          'Los datos recibidos tienen un formato inválido.';
      } else if (error instanceof TypeError) {
        error.userMessage =
          'No fue posible establecer conexión con el servidor.';
      } else {
        error.userMessage =
          'Ocurrió un error inesperado.';
      }
```
#### Mostrar mensajes de error amigables al usuario : 
``` java
else {
        error.userMessage =
          'Ocurrió un error inesperado.'
```

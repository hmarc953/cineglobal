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

### Resultado final de la integración asíncrona

Se mantuvo TheMovieDB como API externa principal por su relación directa con la temática de CineGlobal. La integración utiliza `fetch` y `async/await`, valida la respuesta HTTP, convierte los datos recibidos desde JSON y contempla estados visuales de carga, éxito y error.

La credencial de TheMovieDB no se publica en el repositorio. La aplicación intenta leerla desde `window.CINEGLOBAL_CONFIG?.TMDB_API_KEY` o, solo en entorno local, desde `sessionStorage`. Si la clave no está configurada, se informa la situación al usuario y se utiliza la cartelera almacenada o local como fallback. En un entorno productivo, esta credencial debería gestionarse desde un backend o una función serverless.

Se evitó cargar obligatoriamente `config.local.js` desde `index.html`, ya que ese archivo está ignorado y no existe en despliegues públicos como GitHub Pages. La aplicación asume la ausencia de `window.CINEGLOBAL_CONFIG` como un caso esperado y utiliza el fallback local/cache cuando no hay una credencial configurada. `js/config.local.example.js` se conserva únicamente como referencia para entornos que inyecten explícitamente la configuración antes de cargar el módulo principal, sin publicar la clave en el repositorio.

Para evitar 404 en GitHub Pages, `index.html` no carga obligatoriamente `config.local.js`. La aplicación puede leer una credencial desde `window.CINEGLOBAL_CONFIG?.TMDB_API_KEY` si fue definida antes de cargar `script.js`. Para pruebas locales sin publicar credenciales, también se permite configurar temporalmente la API key en `sessionStorage` únicamente en entorno local:

```js
sessionStorage.setItem('cineglobal:tmdb-api-key', 'TU_CLAVE_TMDB');
location.reload();
```

Este mecanismo no se utiliza en GitHub Pages ni reemplaza la recomendación productiva de gestionar credenciales desde un backend o función serverless. Si no hay credencial configurada, la aplicación usa la cartelera almacenada o local como fallback.

### Estrategia de caché y fallback

El catálogo almacenado en Storage se utiliza como caché y fallback, pero no bloquea el intento de carga desde TheMovieDB. En cada inicialización, la aplicación intenta consumir la API externa cuando hay una credencial configurada. Si la API responde correctamente, los datos se transforman al modelo interno, el catálogo actualizado se asigna al estado de la aplicación y se guarda en Storage.

Si la petición falla o la credencial no está disponible, se utiliza el catálogo previamente almacenado o, si tampoco existe esa caché, el catálogo local creado por `crearPeliculasIniciales()`. Este fallback garantiza que `estadoApp.catalogoPeliculas` quede inicializado y evita que la aplicación resulte inutilizable.

### Integración con POO

Los datos recibidos desde TheMovieDB se adaptan al modelo interno mediante instancias de `Pelicula`, `Funcion` y `CatalogoPeliculas`. Como TheMovieDB no provee funciones de cine, horarios ni precios, se generan funciones compatibles cuando una película externa no incluye esa información. Si la fuente ya proporciona funciones válidas, estas se transforman en instancias de `Funcion`.

Esta adaptación mantiene operativo el flujo de compra y permite seleccionar cine, idioma, horario y cantidad de entradas para las películas incorporadas desde la API.

### Estados visuales y manejo de errores

- `loading` informa que la cartelera externa se está cargando.
- `success` confirma que los datos externos fueron procesados correctamente.
- `error` informa si falta la API key o si la petición falla.
- El reintento acotado se gestiona desde `ApiService.fetchDataConReintento()` y notifica visualmente cada nuevo intento mediante un callback provisto por `script.js`.
- El fallback local o almacenado permite continuar utilizando la aplicación después del error.

### Procesamiento de datos

La implementación utiliza funciones de orden superior con los siguientes propósitos:

- `filter()` descarta registros inválidos, por ejemplo elementos que no tienen identificador, y funciones externas incompletas.
- `map()` transforma los datos externos a una lista blanca compatible con CineGlobal y posteriormente crea las instancias del modelo interno.
- `reduce()` calcula métricas del catálogo, incluyendo la cantidad de películas por categoría y la categoría predominante.

### Sanitización y validación

La función `sanitizarDatos()` dejó de conservar el objeto externo completo y devuelve únicamente las propiedades utilizadas por CineGlobal. Los textos, categorías, fechas, imágenes y datos de funciones se validan antes de incorporarse al modelo interno. Las URLs se limitan a recursos locales controlados o imágenes HTTPS del dominio permitido de TMDB.

Como defensa adicional, los valores utilizados por las cards se escapan antes de interpolarse en `innerHTML`.

Se reforzó la validación de respuestas externas para evitar que una respuesta HTTP exitosa pero vacía o con formato inesperado reemplace una caché válida. Si TheMovieDB no devuelve una estructura compatible o no retorna películas, la aplicación trata el caso como un error recuperable y utiliza la cartelera almacenada o local como fallback.

### Preparación para testing

La lógica de reintento se desacopló de `script.js` y se incorporó como método reutilizable dentro de `ApiService`. Esto permite validar el flujo sin importar el controlador principal ni ejecutar `DOMContentLoaded`, la configuración del DOM o la inicialización completa de la aplicación.

Esta rama no incorpora ni modifica `api.spec.js` ni presenta evidencia de pruebas automatizadas específicas para la API. La implementación queda preparada para que el rol Tester QA/JS valide en su rama los escenarios de carga exitosa, error HTTP, error de red, reintento, fallback, sanitización y transformación de datos.

Los criterios de testing incluidos en la planificación inicial no constituyen evidencia de ejecución en esta rama. El estado final verificable es que las pruebas específicas de API quedan pendientes para el rol Tester QA/JS.

### Prompt inicial y ajustes manuales
```
modificame esto: /** * Servicio para consumo de API externa */ const ApiService = { /** * Obtiene datos de la API * @param {string} endpoint - Endpoint a consultar * @returns {Promise<Object>} Datos obtenidos */ async fetchData(endpoint) { try { // Mostrar estado de carga this.showLoading(); const response = await fetch(endpoint); if (!response.ok) { throw new Error(HTTP error! status: ${response.status}); } const data = await response.json(); this.hideLoading(); return data; } catch (error) { this.hideLoading(); this.showError(error.message); throw error; } }, showLoading() { // Actualizar UI con estado de carga }, hideLoading() { // Ocultar estado de carga }, showError(message) { // Mostrar error en UI } }; export default ApiService;
```


El prompt inicial solicitó incorporar `fetch`, validación de `response.ok`, conversión mediante `.json()`, manejo con `try/catch` y estados visuales de carga y error dentro de un servicio de API.

A partir de las revisiones del PR se realizaron ajustes manuales para configurar la credencial sin publicarla, convertir Storage en caché/fallback, adaptar los datos a las clases POO, generar funciones de cine para películas externas, reforzar la sanitización y desacoplar el mecanismo de reintento. Estos cambios conforman la solución final documentada en esta sección.

### Request Changes respondidos

No se crearon issues adicionales para estas correcciones. Se atendieron los Request Changes del PR #211 relacionados con configuración segura de la credencial, estrategia de caché/fallback, funciones de cine para datos externos, sanitización previa al DOM, desacoplamiento del reintento y consistencia documental. Cada punto quedó resuelto mediante los cambios técnicos y documentales descritos en este `AT CLOSE`.

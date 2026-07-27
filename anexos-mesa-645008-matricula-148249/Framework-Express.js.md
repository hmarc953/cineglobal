# Framework Express.js

## Descripción general del framework

Express.js es un framework que permite desarrollar servidores web y APIs REST utilizando JavaScript. Su propósito principal es facilitar la creación de rutas, el procesamiento de solicitudes HTTP y la organización de la lógica del servidor de forma sencilla y escalable.

Entre sus principales características se destacan:

- Creación de APIs REST.
- Gestión de rutas y solicitudes HTTP.
- Integración con servicios y bases de datos.
- Arquitectura ligera y modular.
- Amplia comunidad y documentación.

---

## Motivación y justificación

Express.js fue seleccionado debido a que el proyecto **CineGlobal** actualmente obtiene la información de las películas directamente desde el cliente mediante la API Fetch. Aunque este enfoque es adecuado para aplicaciones pequeñas, en proyectos de mayor tamaño resulta conveniente incorporar un servidor que centralice el acceso a los datos.

La utilización de Express.js permitiría que el servidor se encargue de consumir APIs externas, procesar la información obtenida y enviarla al cliente mediante una API propia. De esta forma se mejora la organización del proyecto, se incrementa la seguridad al evitar exponer claves de acceso en el navegador y se facilita el mantenimiento de la aplicación.

Además, Express.js se integra de manera natural con Node.js y constituye una de las tecnologías principales del stack MERN.

---

## Nivel de dificultad de adaptación

La incorporación de Express.js presenta un **nivel de dificultad medio**.

Gran parte de la lógica de negocio desarrollada en el proyecto puede mantenerse sin modificaciones importantes. Sin embargo, sería necesario trasladar al servidor aquellas funciones encargadas de consumir la API externa y procesar la información antes de enviarla al cliente.

Los principales cambios serían:

- Crear un servidor utilizando Express.js.
- Implementar rutas para exponer los datos de las películas.
- Trasladar el consumo de la API externa desde el navegador hacia el servidor.
- Modificar el frontend para consumir la nueva API desarrollada con Express.js.
- Separar claramente la lógica del cliente y la del servidor.

Estos cambios mejorarían la escalabilidad, la organización del código y facilitarían futuras ampliaciones del sistema.

---

## Ejemplo de código – Antes y después

### Código actual 

**Archivo:** `js/script.js`

**Función utilizada:** `cargarDatosIniciales()`
**lineas de codigo:** 251-273
 Actualmente la aplicación obtiene las películas mediante el servicio ApiService, que encapsula las solicitudes HTTP (utilizando fetch) e implementa una lógica de reintentos automáticos para mejorar la confiabilidad de la carga de datos.


```javascript
const datosApi = await ApiService.fetchDataConReintento(
      API_PELICULAS_URL,
      {
        maxIntentos: 2,
        onRetry: ({ proximoIntento, maxIntentos }) => {
          const mensajeReintento =
            `Reintentando carga de cartelera (${proximoIntento}/${maxIntentos})...`;

          mostrarLoading(
            estadoApi,
            mensajeReintento
          );

          if (mensajeApi) {
            mostrarMensaje(
              mensajeApi,
              mensajeReintento,
              'loading'
            );
          }
        }
      }
    );
```

En esta implementación, el navegador realiza la solicitud a la API externa utilizando `ApiService.fetchDataConReintento()`. Además, administra los reintentos en caso de error y muestra mensajes de carga durante el proceso de obtención de los datos, para que posteriormente puedan ser utilizados por la aplicación.

---

### Implementación utilizando Express.js

```javascript
app.get("/api/peliculas", async (req, res) => {
  try {
    const respuesta = await fetch(API_PELICULAS_URL);

    if (!respuesta.ok) {
      return res.status(respuesta.status).json({
        mensaje: "Error al obtener la cartelera."
      });
    }

    const datosApi = await respuesta.json();

    res.json(datosApi);

  } catch (error) {
    res.status(500).json({
      mensaje: "Error interno del servidor."
    });
  }
});
```

Con esta implementación, el cliente deja de consumir directamente la API externa y realiza una solicitud al servidor desarrollado con Express.js. El servidor se encarga de obtener la información de la API y devolverla al frontend mediante un endpoint propio. Este enfoque mejora la organización del proyecto, facilita el mantenimiento del código y permite incorporar futuras funcionalidades, como el procesamiento de datos, autenticación o validaciones, de forma centralizada.
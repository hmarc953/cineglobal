# Especificación del rol Arquitecto de Diagramas de Actividades - Actividad Obligatoria 3 (A3)

## BEFORE

### 1. Identificación de los 4 flujos principales

Para esta entrega se definieron cuatro flujos principales del proyecto CineGlobal. La selección de estos flujos se realizó tomando como base el mockup actualizado, la implementación visual actual del sitio y las funcionalidades incorporadas para esta actividad. Se buscó que cada flujo representara una acción distinta dentro del sistema, evitando dividir un mismo recorrido en pasos artificiales.

#### Flujo 1: Búsqueda de películas con filtros
Este flujo permite al usuario buscar películas disponibles mediante filtros de cine, categoría, idioma y clasificación.

- **Objetivo del flujo:** ayudar al usuario a encontrar películas según criterios específicos.
- **Actor principal:** Usuario.
- **Respuesta esperada del sistema:** mostrar resultados que coincidan con los filtros aplicados o informar que no se encontraron coincidencias.
- **Decisiones principales:**  
  - si el usuario desea aplicar filtros o salir del flujo,  
  - si los filtros ingresados son válidos,  
  - si existen películas que coincidan con la búsqueda.
- **Ciclos previstos:**  
  - reintento de búsqueda si no hay resultados,  
  - repetición del proceso de selección de filtros,  
  - posibilidad de volver al menú principal.

Este flujo fue seleccionado porque representa la funcionalidad de exploración principal del proyecto y se vincula directamente con la sección de cartelera y sus filtros.

#### Flujo 2: Inicio de sesión / registro de usuario
Este flujo permite al usuario iniciar sesión si ya posee cuenta o registrarse en caso contrario.

- **Objetivo del flujo:** simular el acceso o alta de usuario dentro del sistema.
- **Actor principal:** Usuario.
- **Respuesta esperada del sistema:** validar datos ingresados y mostrar un mensaje de confirmación o error.
- **Decisiones principales:**  
  - si el usuario ya tiene cuenta o necesita registrarse,  
  - si los datos obligatorios fueron ingresados correctamente,  
  - si las contraseñas coinciden en el caso del registro.
- **Ciclos previstos:**  
  - reintento de ingreso de credenciales,  
  - reingreso de datos de registro si hay errores,  
  - retorno al menú principal.

Este flujo fue incorporado porque agrega una funcionalidad distinta a la navegación de cartelera y permite modelar validaciones y bifurcaciones claras entre dos recorridos relacionados: login y registro.

#### Flujo 3: Contacto con soporte mediante formulario
Este flujo permite al usuario enviar una consulta al equipo de soporte a través de un formulario de contacto.

- **Objetivo del flujo:** permitir el envío de una consulta con datos básicos de contacto y descripción del problema o solicitud.
- **Actor principal:** Usuario.
- **Respuesta esperada del sistema:** validar los datos ingresados y mostrar confirmación de envío o mensaje de error.
- **Decisiones principales:**  
  - si el usuario completa todos los campos obligatorios,  
  - si el correo electrónico tiene formato válido,  
  - si desea corregir los datos antes de enviar.
- **Ciclos previstos:**  
  - corrección y reingreso de datos,  
  - nuevo intento de envío,  
  - retorno al menú principal.

Este flujo fue elegido porque representa una acción independiente de la compra y de la exploración del catálogo, y además se relaciona con la nueva funcionalidad agregada en la sección de contacto.

#### Flujo 4: Compra de entradas
Este flujo permite al usuario seleccionar una película, elegir cine, idioma, horario y cantidad de asientos, ingresar datos de pago y confirmar la compra.

- **Objetivo del flujo:** simular la compra completa de entradas de cine.
- **Actor principal:** Usuario.
- **Respuesta esperada del sistema:** validar la selección de función y los datos de pago, y mostrar una confirmación final de compra.
- **Decisiones principales:**  
  - si la película elegida tiene funciones disponibles,  
  - si el usuario completó correctamente cine, idioma, horario y cantidad de asientos,  
  - si los datos de la tarjeta son válidos,  
  - si la compra se confirma o debe corregirse la información.
- **Ciclos previstos:**  
  - reintento de selección de datos de la función,  
  - corrección de datos de pago,  
  - repetición del proceso si la compra no puede completarse,  
  - retorno al menú principal.

Este flujo fue seleccionado porque representa la funcionalidad de mayor peso dentro del dominio del proyecto y concentra varias decisiones, validaciones y pasos encadenados.

---

### 2. Decisión sobre swimlanes

Se decidió utilizar swimlanes en los cuatro diagramas para separar responsabilidades entre **Usuario** y **Sistema**.

La razón es que en todos los flujos analizados existe una interacción clara entre:
- acciones iniciadas por el usuario, como seleccionar opciones, completar formularios o confirmar operaciones,
- y respuestas del sistema, como validar entradas, mostrar resultados, confirmar acciones o informar errores.

La separación mediante swimlanes permitirá representar con mayor claridad qué actividades corresponden al usuario y cuáles corresponden al sistema, mejorando la legibilidad del diagrama y facilitando su posterior traducción a lógica de negocio en JavaScript.

Aplicación de swimlanes por flujo:

- **Flujo 1: Búsqueda de películas con filtros**  
  Se usarán swimlanes porque el usuario selecciona filtros y el sistema procesa esos criterios y devuelve resultados.

- **Flujo 2: Inicio de sesión / registro de usuario**  
  Se usarán swimlanes porque el usuario ingresa datos y el sistema valida credenciales, contraseñas y estado del registro.

- **Flujo 3: Contacto con soporte mediante formulario**  
  Se usarán swimlanes porque el usuario completa el formulario y el sistema valida campos y confirma el envío.

- **Flujo 4: Compra de entradas**  
  Se usarán swimlanes porque el usuario selecciona opciones de compra e ingresa datos de pago, mientras que el sistema valida disponibilidad, procesa la operación y confirma la compra.

---

### 3. Criterios de aceptación

- [ ] Se identificaron claramente los 4 flujos principales del proyecto.
- [ ] Cada diagrama representará un flujo distinto y coherente con el dominio de CineGlobal.
- [ ] Cada diagrama incluirá inicio (`start`) y fin (`stop`).
- [ ] Cada diagrama incluirá actividades expresadas con sintaxis correcta de PlantUML.
- [ ] Cada diagrama incluirá decisiones condicionales con estructuras `if / then / else`.
- [ ] Cada diagrama incluirá ciclos o repeticiones cuando el flujo lo requiera.
- [ ] Se utilizarán swimlanes `Usuario` y `Sistema` para separar responsabilidades.
- [ ] Los flujos modelados serán coherentes con la implementación planificada en `plan.md`, con el `index.html` actualizado y con el mockup del proyecto.
- [ ] Cada diagrama se exportará en formato `.puml` y `.png`.
- [ ] Se creará el archivo `diagramas-doc.md` con índice, descripción de cada flujo, enlaces a los archivos editables e imágenes embebidas.
- [ ] Los diagramas servirán como base para que el Desarrollador JavaScript implemente la lógica del sistema en la siguiente etapa.
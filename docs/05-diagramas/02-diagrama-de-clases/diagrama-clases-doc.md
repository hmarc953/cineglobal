# Documentación del Diagrama de Clases UML - CineGlobal

## 1. Introducción

Este documento presenta el diagrama de clases UML del proyecto **CineGlobal**, elaborado como parte de la **Actividad Obligatoria 4** para el rol **Desarrollador JS POO**.

El objetivo del diagrama es representar la arquitectura orientada a objetos del proyecto, mostrando las principales clases del dominio, sus responsabilidades y las relaciones entre ellas. Esta modelización sirve como base para refactorizar la lógica de negocio existente en `js/script.js` hacia clases reutilizables dentro de `js/models/`, dejando al archivo principal únicamente la responsabilidad de manejar eventos y manipulación del DOM.

### Propósito del diagrama

El diagrama de clases permite:

1. Representar las entidades principales del dominio de CineGlobal.
2. Separar responsabilidades entre entidades del negocio y clases gestoras.
3. Facilitar la integración con los roles de DOM/Eventos, Storage y Testing.
4. Mejorar la organización y testabilidad del código.
5. Preparar la serialización y deserialización de objetos mediante `toJSON()` y `fromJSON()`.

### Relación con la actividad anterior

Este diagrama se construyó tomando como base:

- los 4 flujos de actividades modelados en la Actividad Obligatoria 3,
- la estructura actual del `index.html`,
- la lógica implementada en `js/script.js`,
- y la especificación definida en `spec-dev-poo.md`. :contentReference[oaicite:0]{index=0}

---

## 2. Descripción de cada clase y su responsabilidad

### 2.1. Clase `Pelicula`

**Descripción:**  
Representa una película disponible en la cartelera de CineGlobal.

**Responsabilidad:**  
Encapsular la información general de una película y administrar sus funciones asociadas.

**Atributos principales:**
- `id`: identificador único de la película.
- `titulo`: nombre de la película.
- `categoria`: género o categoría.
- `clasificacion`: restricción de edad.
- `fechaEstreno`: fecha de estreno.
- `imagen`: ruta o referencia visual.
- `funciones`: colección de funciones asociadas.

**Métodos principales:**
- `coincideConFiltros(filtros)`: determina si la película cumple con ciertos criterios de búsqueda.
- `agregarFuncion(funcion)`: incorpora una nueva función a la película.
- `obtenerFuncionesDisponibles()`: devuelve las funciones disponibles.
- `toJSON()` / `fromJSON()`: permiten serializar y reconstruir instancias.

**Justificación:**  
`Pelicula` es una entidad central del dominio, ya que participa tanto en la búsqueda como en la compra de entradas.

---

### 2.2. Clase `Funcion`

**Descripción:**  
Representa una proyección concreta de una película en un cine, idioma y horario determinados.

**Responsabilidad:**  
Modelar una función específica y administrar la disponibilidad de asientos.

**Atributos principales:**
- `id`: identificador único de la función.
- `cine`: cine donde se proyecta.
- `idioma`: idioma de la función.
- `horario`: horario de la proyección.
- `asientosDisponibles`: cantidad de asientos disponibles.
- `precio`: precio unitario de la entrada.

**Métodos principales:**
- `coincideConSeleccion(datos)`: verifica si la función coincide con una selección dada.
- `hayDisponibilidad(cantidad)`: comprueba si existen asientos suficientes.
- `reservarAsientos(cantidad)`: descuenta asientos disponibles al concretar una reserva.
- `toJSON()` / `fromJSON()`: permiten serializar y reconstruir instancias.

**Justificación:**  
Se modela como clase separada porque la compra no se hace sobre una película abstracta, sino sobre una función concreta.

---

### 2.3. Clase `CatalogoPeliculas`

**Descripción:**  
Representa el catálogo general de películas disponibles en el sistema.

**Responsabilidad:**  
Gestionar la colección de películas y encapsular la lógica de búsqueda y consulta del catálogo.

**Atributos principales:**
- `peliculas`: colección de objetos `Pelicula`.

**Métodos principales:**
- `buscarPorFiltros(filtros)`: busca películas según criterios.
- `listarPeliculas()`: devuelve todas las películas del catálogo.
- `obtenerPeliculaPorId(id)`: recupera una película por su identificador.
- `obtenerPeliculaPorIndice(indice)`: recupera una película por posición.
- `toJSON()` / `fromJSON()`: permiten serializar y reconstruir el catálogo.

**Justificación:**  
Permite centralizar la lógica de búsqueda y selección de películas, evitando que esa lógica quede dispersa en funciones sueltas.

---

### 2.4. Clase `Usuario`

**Descripción:**  
Representa a un usuario registrado en el sistema.

**Responsabilidad:**  
Encapsular los datos y comportamientos básicos asociados a un usuario.

**Atributos principales:**
- `id`: identificador único del usuario.
- `nombre`: nombre del usuario.
- `email`: correo electrónico.
- `password`: contraseña.

**Métodos principales:**
- `validarPassword(password)`: verifica si la contraseña coincide.
- `coincideConEmail(email)`: comprueba si el email coincide con el registrado.
- `actualizarDatos(datos)`: actualiza los datos del usuario.
- `toJSON()` / `fromJSON()`: permiten serializar y reconstruir instancias.

**Justificación:**  
`Usuario` es una entidad necesaria para modelar los flujos de inicio de sesión y registro.

---

### 2.5. Clase `GestorUsuarios`

**Descripción:**  
Administra la colección de usuarios registrados en el sistema.

**Responsabilidad:**  
Encapsular las operaciones de autenticación, búsqueda y registro de usuarios.

**Atributos principales:**
- `usuarios`: colección de objetos `Usuario`.

**Métodos principales:**
- `registrarUsuario(datos)`: registra un nuevo usuario.
- `autenticar(email, password)`: valida credenciales de acceso.
- `buscarPorEmail(email)`: busca un usuario por email.
- `emailExiste(email)`: verifica si un email ya está registrado.
- `toJSON()` / `fromJSON()`: permiten serializar y reconstruir el gestor.

**Justificación:**  
Se separa de `Usuario` para diferenciar claramente la entidad individual de la lógica de administración del conjunto de usuarios.

---

### 2.6. Clase `ConsultaSoporte`

**Descripción:**  
Representa una consulta enviada al área de soporte.

**Responsabilidad:**  
Encapsular los datos de una consulta, validar su contenido y gestionar su estado.

**Atributos principales:**
- `idTicket`: identificador único del ticket.
- `email`: correo del usuario que realiza la consulta.
- `titulo`: asunto o título de la consulta.
- `descripcion`: detalle del problema o consulta.
- `estado`: estado actual de la consulta.
- `fechaCreacion`: fecha de creación.

**Métodos principales:**
- `validar()`: verifica que los datos de la consulta sean correctos.
- `generarTicket()`: genera el identificador de ticket.
- `cambiarEstado(nuevoEstado)`: modifica el estado de la consulta.
- `toJSON()` / `fromJSON()`: permiten serializar y reconstruir instancias.

**Justificación:**  
Se modela como entidad independiente porque tiene estructura propia y un ciclo de vida separado del resto de las operaciones del sistema. 

Además, para mantener consistencia en el ciclo de vida de la consulta, se definió un conjunto acotado de estados posibles (`Abierto`, `En progreso`, `Resuelto` y `Cerrado`), implementado en código mediante una constante estática de la clase.

---

### 2.7. Clase `Compra`

**Descripción:**  
Representa una operación de compra de entradas para una función específica.

**Responsabilidad:**  
Encapsular la lógica principal de una compra: validación, cálculo de total y confirmación.

**Atributos principales:**
- `id`: identificador único de la compra.
- `funcion`: función seleccionada.
- `cantidadEntradas`: cantidad de entradas compradas.
- `emailComprador`: correo del comprador.
- `total`: monto total de la compra.
- `codigoConfirmacion`: código de confirmación generado al finalizar la compra.

**Métodos principales:**
- `calcularTotal()`: calcula el importe total.
- `confirmarCompra()`: confirma la compra y genera el código correspondiente.
- `esValida()`: valida que la compra tenga datos consistentes.
- `toJSON()` / `fromJSON()`: permiten serializar y reconstruir instancias.

**Justificación:**  
La compra es uno de los flujos principales del sistema y concentra varias reglas del negocio relacionadas con entradas, montos y confirmaciones.

---

## 3. Explicación de relaciones

### 3.1. `CatalogoPeliculas` contiene `Pelicula`

**Tipo de relación:** Composición.

**Explicación:**  
El catálogo actúa como contenedor de múltiples películas. Esta relación refleja que la búsqueda y la consulta del catálogo se realizan sobre una colección de películas.

---

### 3.2. `Pelicula` contiene `Funcion`

**Tipo de relación:** Composición.

**Explicación:**  
Cada película puede tener múltiples funciones, diferenciadas por cine, idioma, horario y disponibilidad. La función depende conceptualmente de la película a la que pertenece.

---

### 3.3. `GestorUsuarios` gestiona `Usuario`

**Tipo de relación:** Agregación.

**Explicación:**  
El gestor administra un conjunto de usuarios registrados, permitiendo autenticarlos, registrarlos y buscarlos. La relación es de administración y no de dependencia estructural fuerte.

---

### 3.4. `Compra` se asocia con `Funcion`

**Tipo de relación:** Asociación.

**Explicación:**  
Una compra se realiza siempre sobre una función específica. A partir de esa función se obtiene la información necesaria para validar la compra, calcular el total y actualizar la disponibilidad.

---

### 3.5. `ConsultaSoporte` como entidad independiente

**Tipo de relación:** Independencia relativa dentro del dominio.

**Explicación:**  
La consulta de soporte no mantiene relaciones estructurales fuertes con el resto de las clases del modelo. Puede existir y persistirse de manera autónoma, aunque utilice datos como el email del usuario.

---

### Aclaración sobre la clase `Compra`

En la especificación inicial del rol POO, la clase `Compra` había sido pensada con atributos tanto `pelicula` como `funcion`. Sin embargo, al refinar el diseño del diagrama, se decidió conservar solo la asociación con `Funcion`, ya que la película puede inferirse a través de esa función.  

Esta decisión simplifica el modelo y evita redundancia de información, manteniendo la coherencia con el flujo de compra definido para el proyecto.

---

## 4. Justificación de decisiones de diseño

### 4.1. Encapsulación de la lógica de negocio en clases

Se decidió encapsular la lógica de negocio en clases dentro de `js/models/` para organizar mejor el código y separar claramente los datos y comportamientos del dominio de la lógica de interfaz.

Esto permite:
- reutilizar lógica,
- evitar funciones dispersas,
- mejorar el mantenimiento del proyecto,
- y facilitar el testing de métodos individuales.

---

### 4.2. Separación entre `js/script.js` y `js/models/`

Se definió que `js/script.js` quedará reservado para manejar eventos y actualizar el DOM, mientras que las clases del dominio se ubicarán en `js/models/`.

Esta separación permite que:
- la lógica del sistema no dependa directamente de la interfaz,
- el código sea más ordenado,
- y cada parte del proyecto tenga una responsabilidad clara.

---

### 4.3. Separación entre entidades y clases gestoras

Se diferenciaron dos tipos de clases:

- **Entidades del dominio:** `Pelicula`, `Funcion`, `Usuario`, `ConsultaSoporte`, `Compra`
- **Clases gestoras:** `CatalogoPeliculas`, `GestorUsuarios`

Esta decisión ayuda a distinguir:
- los objetos que representan información concreta del negocio,
- de las clases que administran colecciones u operaciones globales sobre esas entidades.

---

### 4.4. Implementación de `toJSON()` y `fromJSON()`

Se decidió incluir estos métodos en las clases para facilitar la persistencia de datos y su futura integración con Storage.

Esto permite:
- convertir instancias a objetos simples,
- reconstruir objetos desde datos serializados,
- y mantener una estructura coherente al guardar y recuperar información.

---

### 4.5. Ausencia de DOM, eventos y Storage dentro de las clases

Las clases del dominio no incluyen manipulación del DOM, listeners de eventos ni acceso directo a `localStorage` o `sessionStorage`.

Esta decisión se tomó para:
- mantener separadas las capas del proyecto,
- hacer que las clases sean reutilizables,
- y permitir que puedan probarse de manera aislada.

---

### 4.6. Coherencia con los diagramas de actividades

La arquitectura de clases se diseñó de forma coherente con los flujos de actividades ya modelados en la actividad anterior:

- búsqueda de películas,
- inicio de sesión / registro,
- contacto con soporte,
- compra de entradas.

De esta forma, el modelo orientado a objetos mantiene continuidad con el análisis funcional ya realizado.

---

### 4.7. Integración con otros roles

La estructura de clases también fue pensada para facilitar la integración con otros roles del equipo:

- **DOM/Eventos:** podrá invocar métodos del dominio desde `js/script.js`
- **Storage:** podrá persistir y reconstruir objetos del modelo
- **Tester QA:** podrá probar métodos de las clases sin depender de la interfaz

Esto mejora la coordinación entre capas y hace más ordenado el desarrollo grupal.

---

## 5. Archivos asociados

### Archivos del diagrama de clases

- **`docs/05-diagramas/02-diagrama-de-clases/diagrama-clases.puml`**  
  Archivo editable del diagrama en PlantUML.

- **`docs/05-diagramas/02-diagrama-de-clases/diagrama-clases.png`**  
  Versión exportada del diagrama para visualización rápida.

### Archivos relacionados

- **`docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`**  
  Especificación del rol con las entidades, relaciones y decisiones iniciales.

- **`docs/05-diagramas/01-diagrama-de-actividades/`**  
  Diagramas de actividades previos utilizados como base para identificar clases y responsabilidades.

---

## 6. Conclusión

El diagrama de clases UML de CineGlobal representa una arquitectura orientada a objetos coherente con los flujos del proyecto y con los objetivos de la Actividad Obligatoria 4.

La estructura propuesta permite:
- organizar mejor la lógica de negocio,
- mantener separadas las responsabilidades,
- facilitar la integración con la interfaz y el almacenamiento,
- y preparar el proyecto para testing y evolución futura.

De este modo, el diagrama funciona como una referencia clara para la implementación de las clases del dominio y para la coordinación con el resto de los roles del equipo.
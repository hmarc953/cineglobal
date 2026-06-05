# Especificación del rol Desarrollador JS POO - Actividad Obligatoria 4

## BEFORE

### 1. Identificación de entidades del dominio

Para esta entrega se definieron las clases del dominio a partir de los 4 flujos principales ya modelados en la actividad anterior, del `index.html` actualizado y de la lógica actual implementada en `js/script.js`.

El objetivo de esta etapa es refactorizar la lógica de negocio existente y encapsularla en clases reutilizables dentro de `js/models/`, dejando a `js/script.js` únicamente como controlador de eventos y manipulación del DOM.

Las entidades del dominio identificadas son las siguientes:

#### Clase `Pelicula`
Representa una película disponible en cartelera.

**Propiedades previstas:**
- `id`
- `titulo`
- `categoria`
- `clasificacion`
- `fechaEstreno`
- `imagen`
- `funciones`

**Métodos previstos:**
- `coincideConFiltros(filtros)`
- `agregarFuncion(funcion)`
- `obtenerFuncionesDisponibles()`
- `toJSON()`
- `static fromJSON(json)`

**Justificación:**  
La película es una entidad central del proyecto. Interviene en la búsqueda, en la cartelera y en la compra de entradas.

---

#### Clase `Funcion`
Representa una función específica de una película en un cine determinado.

**Propiedades previstas:**
- `cine`
- `idioma`
- `horario`
- `asientosDisponibles`
- `precio`

**Métodos previstos:**
- `coincideConSeleccion(datos)`
- `hayDisponibilidad(cantidad)`
- `reservarAsientos(cantidad)`
- `toJSON()`
- `static fromJSON(json)`

**Justificación:**  
Se decidió separar la función de la película porque la compra no se realiza sobre una película genérica, sino sobre una combinación concreta de cine, idioma, horario y cantidad de asientos.

---

#### Clase `CatalogoPeliculas`
Representa el conjunto de películas disponibles y encapsula la lógica de búsqueda.

**Propiedades previstas:**
- `peliculas`

**Métodos previstos:**
- `buscarPorFiltros(filtros)`
- `listarPeliculas()`
- `obtenerPeliculaPorId(id)`
- `obtenerPeliculaPorIndice(indice)`
- `toJSON()`
- `static fromJSON(json)`

**Justificación:**  
La lógica de búsqueda y selección de películas actualmente se encuentra distribuida en funciones sueltas. Esta clase permitirá encapsular esa responsabilidad en un objeto de dominio específico.

---

#### Clase `Usuario`
Representa a un usuario del sistema.

**Propiedades previstas:**
- `nombre`
- `email`
- `password`

**Métodos previstos:**
- `validarPassword(password)`
- `coincideConEmail(email)`
- `actualizarDatos(datos)`
- `toJSON()`
- `static fromJSON(json)`

**Justificación:**  
El usuario participa directamente en el flujo de inicio de sesión y registro. Además, es una entidad que potencialmente será persistida mediante storage.

---

#### Clase `GestorUsuarios`
Administra la colección de usuarios y encapsula las operaciones de autenticación y registro.

**Propiedades previstas:**
- `usuarios`

**Métodos previstos:**
- `registrarUsuario(datos)`
- `autenticar(email, password)`
- `buscarPorEmail(email)`
- `emailExiste(email)`
- `toJSON()`
- `static fromJSON(json)`

**Justificación:**  
Se decidió separar la entidad `Usuario` de la lógica de gestión de usuarios. Esto permite encapsular en una clase distinta la validación de credenciales, el alta de nuevos usuarios y la verificación de emails existentes.

---

#### Clase `ConsultaSoporte`
Representa una consulta enviada al área de soporte.

**Propiedades previstas:**
- `idTicket`
- `email`
- `titulo`
- `descripcion`
- `estado`
- `fechaCreacion`

**Métodos previstos:**
- `validar()`
- `generarTicket()`
- `cambiarEstado(nuevoEstado)`
- `toJSON()`
- `static fromJSON(json)`

**Justificación:**  
La consulta de soporte tiene estructura propia, ciclo de vida y posibilidad de persistencia. Por eso se modela como entidad independiente.

---

#### Clase `Compra`
Representa una operación de compra de entradas.

**Propiedades previstas:**
- `pelicula`
- `funcion`
- `cantidadEntradas`
- `emailComprador`
- `total`
- `codigoConfirmacion`

**Métodos previstos:**
- `calcularTotal()`
- `confirmarCompra()`
- `esValida()`
- `toJSON()`
- `static fromJSON(json)`

**Justificación:**  
La compra constituye uno de los flujos principales del sistema y combina datos de selección, pago y confirmación final. Su modelado como clase permite encapsular correctamente esa lógica.

---

### 2. Relaciones entre clases

Se prevén las siguientes relaciones principales entre clases:

- `CatalogoPeliculas` contiene múltiples objetos `Pelicula`.
- `Pelicula` contiene múltiples objetos `Funcion`.
- `GestorUsuarios` administra múltiples objetos `Usuario`.
- `Compra` se asocia a una `Pelicula` y a una `Funcion`.
- `ConsultaSoporte` se crea a partir de datos ingresados por un usuario, aunque inicialmente no se modelará una relación fuerte con la clase `Usuario`.

Estas relaciones serán documentadas luego en el diagrama de clases UML de PlantUML.

---

### 3. Decisiones de arquitectura

Se definió una arquitectura orientada a objetos basada en separación de responsabilidades:

- `js/script.js` quedará reservado para eventos y manipulación del DOM.
- `js/models/` contendrá las clases del dominio y toda la lógica de negocio.
- La lógica de validación, cálculo y procesamiento dejará de estar implementada como funciones sueltas y pasará a métodos de clase.
- Se implementarán métodos `toJSON()` y `fromJSON()` para facilitar la futura persistencia de datos mediante storage.
- Las clases no incluirán manipulación del DOM, `prompt()`, `alert()` ni listeners de eventos.
- Se priorizará la testabilidad, de modo que los métodos puedan probarse de forma aislada con Jasmine.

---

### 4. Criterios de aceptación

- [ ] Se implementarán al menos 3 clases del dominio dentro de `js/models/`.
- [ ] Cada clase tendrá constructor, propiedades relevantes y métodos de negocio.
- [ ] La lógica de negocio actual será refactorizada desde `js/script.js` hacia las clases del dominio.
- [ ] Las clases no incluirán manipulación del DOM ni manejo de eventos.
- [ ] Se implementarán métodos `toJSON()` y `fromJSON()` donde corresponda.
- [ ] Las clases complejas estarán documentadas con JSDoc.
- [ ] Se creará un diagrama de clases UML en PlantUML.
- [ ] El diagrama de clases se exportará en formato `.puml` y `.png`.
- [ ] Se documentará el diagrama en `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md`.
- [ ] La arquitectura final facilitará la integración con el rol DOM/Eventos, el rol Storage y el rol Tester QA.
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

- [x] Se implementarán al menos 3 clases del dominio dentro de `js/models/`.
- [x] Cada clase tendrá constructor, propiedades relevantes y métodos de negocio.
- [x] La lógica de negocio actual será refactorizada desde `js/script.js` hacia las clases del dominio.
- [x] Las clases no incluirán manipulación del DOM ni manejo de eventos.
- [x] Se implementarán métodos `toJSON()` y `fromJSON()` donde corresponda.
- [x] Las clases complejas estarán documentadas con JSDoc.
- [x] Se creará un diagrama de clases UML en PlantUML.
- [x] El diagrama de clases se exportará en formato `.puml` y `.png`.
- [x] Se documentará el diagrama en `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md`.
- [x] La arquitectura final facilitará la integración con el rol DOM/Eventos, el rol Storage y el rol Tester QA.

## AT CLOSE

### 1. Resumen del trabajo realizado

Durante el cierre del rol **Desarrollador JS POO** se completó el modelado orientado a objetos del dominio de CineGlobal a partir de los flujos definidos previamente, del `index.html` del proyecto y de la lógica existente en `js/script.js`.

El trabajo realizado incluyó:

- diseño del diagrama de clases UML del dominio,
- exportación del diagrama en formato editable `.puml` y en imagen `.png`,
- redacción de la documentación del diagrama de clases,
- implementación de las clases del dominio dentro de `js/models/`,
- revisión y ajuste manual de las clases generadas para alinearlas con el diagrama, el spec y la lógica real del proyecto.

El objetivo de esta etapa fue encapsular la lógica de negocio en clases reutilizables, dejando preparada la base para su futura integración con el rol DOM/Eventos, con la capa de Storage y con los tests automatizados.

---

### 2. Artefactos generados

Como resultado del trabajo del rol se generaron o actualizaron los siguientes artefactos:

- `docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`
- `docs/05-diagramas/02-diagrama-de-clases/diagrama-clases.puml`
- `docs/05-diagramas/02-diagrama-de-clases/diagrama-clases.png`
- `docs/05-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md`
- `js/models/Usuario.js`
- `js/models/GestorUsuarios.js`
- `js/models/Funcion.js`
- `js/models/Pelicula.js`
- `js/models/CatalogoPeliculas.js`
- `js/models/ConsultaSoporte.js`
- `js/models/Compra.js`

---

### 3. Clases implementadas

Se implementaron las siguientes clases del dominio:

#### `Usuario`
Clase destinada a representar un usuario individual del sistema.  
Encapsula datos básicos de autenticación y actualización de perfil.

#### `GestorUsuarios`
Clase gestora encargada de administrar usuarios registrados, realizar búsquedas por email y autenticar credenciales.

#### `Funcion`
Clase que representa una función específica de una película, incluyendo cine, idioma, horario, cantidad de asientos y precio.

#### `Pelicula`
Clase que representa una película del catálogo y administra sus funciones asociadas.

#### `CatalogoPeliculas`
Clase gestora encargada de mantener el conjunto de películas disponibles y aplicar búsquedas por filtros.

#### `ConsultaSoporte`
Clase destinada a modelar una consulta de soporte, incluyendo validación de datos, generación de ticket y gestión de estado.

#### `Compra`
Clase que representa una compra de entradas asociada a una función, con lógica de validación, cálculo de total y confirmación.

---

### 4. Decisiones finales de diseño

Durante la implementación se tomaron las siguientes decisiones finales:

- se mantuvo una separación clara entre **entidades del dominio** y **clases gestoras**,
- se evitó incluir manipulación del DOM, listeners, `prompt()`, `alert()` o acceso directo a storage dentro de las clases,
- se implementaron métodos `toJSON()` y `fromJSON()` en todas las clases principales para facilitar la futura persistencia,
- se decidió que `Compra` mantuviera asociación directa con `Funcion`, eliminando la referencia redundante a `Pelicula`,
- se decidió que algunas operaciones como `actualizarDatos()` o `cambiarEstado()` devolvieran `boolean`, para reflejar de forma explícita si la operación se realizó correctamente,
- se mantuvo la lógica de validación dentro del dominio en un nivel básico y razonable, sin trasladar a las clases responsabilidades propias de la interfaz.

Estas decisiones permitieron mantener coherencia entre el análisis previo, el diagrama de clases y la implementación final.

---

### 5. Ajustes manuales realizados sobre el resultado generado

Luego de generar una primera versión de las clases con apoyo de Copilot, se realizaron ajustes manuales para alinear la implementación con el diagrama UML, el spec y el alcance real del proyecto.

Los principales ajustes fueron los siguientes:

#### a. Eliminación de métodos no definidos previamente
En varias clases se generaron métodos adicionales que no habían sido definidos en el spec ni en el diagrama de clases.  
Estos métodos fueron eliminados para mantener consistencia documental y evitar ampliar innecesariamente el alcance del modelo.

#### b. Corrección de firmas y retornos
Se revisaron métodos cuyo tipo de retorno no coincidía con el modelado inicial.  
En algunos casos se ajustó el código, y en otros se actualizó el diagrama para reflejar mejor el comportamiento definitivo adoptado.

#### c. Simplificación del modelo
Se eliminaron propiedades o relaciones redundantes cuando podían inferirse a partir de otras clases.  
El caso más importante fue el de `Compra`, donde se quitó la referencia directa a `Pelicula` y se conservó únicamente la asociación con `Funcion`.

#### d. Revisión de coherencia entre clases
Se revisó la interacción entre clases para asegurar que:
- `GestorUsuarios` trabajara correctamente con `Usuario`,
- `CatalogoPeliculas` utilizara correctamente `Pelicula`,
- `Pelicula` administrara correctamente objetos `Funcion`,
- `Compra` operara correctamente sobre `Funcion`,
- `ConsultaSoporte` permaneciera como entidad independiente del dominio.

#### e. Ajuste de validaciones
Se mantuvieron validaciones básicas dentro de las clases para proteger la coherencia del dominio, evitando al mismo tiempo trasladar a la capa POO responsabilidades propias de la interfaz visual.

#### f. Mejora de serialización y reconstrucción
Se revisaron los métodos `toJSON()` y `fromJSON()` para asegurar que cada clase pudiera convertirse a un objeto plano y reconstruirse de forma consistente.

---

### 6. Coherencia con el proyecto

La implementación final quedó alineada con:

- los flujos funcionales definidos en la actividad anterior,
- el diagrama de actividades ya modelado,
- la estructura visual del `index.html`,
- y la separación de responsabilidades esperada para esta entrega.

De esta forma, las clases desarrolladas constituyen una base sólida para que otros roles puedan:
- consumir métodos desde `js/script.js`,
- persistir instancias con Storage,
- y probar la lógica de negocio de forma aislada con Jasmine.

---

### 7. Resultado final del rol

Al finalizar esta etapa, el proyecto quedó con una arquitectura POO inicial ya definida e implementada para su dominio principal.

El resultado final del rol incluye:

- un spec completo del rol,
- un diagrama de clases UML documentado,
- una implementación coherente de las clases del dominio,
- y una estructura preparada para integrarse con las siguientes capas del sistema.

Esto permitió transformar una lógica originalmente dispersa en funciones sueltas hacia un modelo orientado a objetos más claro, mantenible y reutilizable.

### 8. Prompts utilizados con Copilot

A continuación se consignan los prompts utilizados durante el desarrollo del rol para generar artefactos y primeras versiones de código, los cuales luego fueron revisados y ajustados manualmente.

#### 8.1.1 Prompt para el diagrama de clases
```
Actuá como Desarrollador JS POO para el proyecto CineGlobal de la Actividad Obligatoria 4.

Tomando como contexto el archivo `docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`, generá el archivo PlantUML del diagrama de clases UML del proyecto en la ruta:

docs/05-diagramas/02-diagrama-de-clases/diagrama-clases.puml

Objetivo:
Crear un diagrama de clases completo y coherente con las entidades del dominio ya definidas en el spec.

Clases a incluir:
- Pelicula
- Funcion
- CatalogoPeliculas
- Usuario
- GestorUsuarios
- ConsultaSoporte
- Compra

Requisitos obligatorios:
- usar sintaxis correcta de PlantUML para diagrama de clases
- incluir cada clase con sus atributos y métodos principales
- reflejar relaciones entre clases
- incluir multiplicidades cuando corresponda
- usar nombres de clases en PascalCase
- usar nombres de atributos y métodos en camelCase
- representar claramente la separación entre entidades del dominio y clases gestoras
- no incluir lógica de DOM, eventos ni storage en este diagrama
- el diagrama debe ser coherente con el dominio de CineGlobal y con la arquitectura definida en el spec

Relaciones esperadas:
- CatalogoPeliculas contiene múltiples Pelicula
- Pelicula contiene múltiples Funcion
- GestorUsuarios administra múltiples Usuario
- Compra se asocia con una Pelicula
- Compra se asocia con una Funcion
- ConsultaSoporte es una entidad independiente del dominio
- Usuario puede quedar desacoplado de Compra si no existe todavía una relación directa obligatoria

Lineamientos de modelado:
- incluir atributos privados o protegidos solo si es coherente con PlantUML y con el nivel de detalle deseado
- incluir métodos `toJSON()` y `fromJSON()` en las clases donde corresponda
- priorizar claridad y legibilidad sobre complejidad innecesaria
- no inventar clases que no estén justificadas por el spec
- no inventar relaciones que no estén justificadas por el dominio

Formato de salida:
1. generá o actualizá directamente el archivo `docs/05-diagramas/02-diagrama-de-clases/diagrama-clases.puml`
2. mostrame el contenido completo del archivo en la respuesta
3. si detectás ambigüedades en el spec, señalalas brevemente antes del código
```

#### 8.1.1 Output recibido
```
✅ Diagrama de clases UML generado correctamente

He creado el archivo diagrama-clases.puml con la representación completa de la arquitectura POO del proyecto CineGlobal.

📋 Características del diagrama:
✅ 7 clases del dominio completas con atributos y métodos
✅ Convenciones aplicadas: PascalCase para clases, camelCase para atributos/métodos
✅ Relaciones modeladas:

Composición: CatalogoPeliculas 1→* Pelicula, Pelicula 1→* Funcion
Agregación: GestorUsuarios 1→* Usuario
Asociación: Compra → Pelicula y Compra → Funcion
✅ Métodos toJSON() y fromJSON() en todas las clases para facilitar persistencia
✅ Separación lógica con notas que distinguen los subdominios (Catálogo, Usuarios, Transacciones)
✅ Sintaxis PlantUML válida lista para exportar a PNG
El diagrama es coherente con el spec y está listo para ser exportado a imagen PNG y documentado.
```

#### 8.2.1 Prompt para la documentación del diagrama de clases
```
Tomando como contexto:
- docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md
- docs/04-diagramas/02-diagrama-de-clases/diagrama-clases.puml

generá el archivo:

docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md

Objetivo:
Documentar el diagrama de clases UML del proyecto de forma clara, académica y coherente con la arquitectura definida para CineGlobal.

IMPORTANTE:
La documentación debe cumplir explícitamente con lo pedido en la consigna para este archivo:
1. descripción de cada clase y su responsabilidad
2. explicación de relaciones
3. justificación de decisiones de diseño

Estructura obligatoria del documento:

# 1. Título
- título principal del documento

# 2. Introducción
- breve explicación del propósito del diagrama de clases dentro de la Actividad Obligatoria 4
- relación del diagrama con la refactorización a POO del proyecto

# 3. Descripción de cada clase y su responsabilidad
Crear una subsección para cada una de estas clases:
- Pelicula
- Funcion
- CatalogoPeliculas
- Usuario
- GestorUsuarios
- ConsultaSoporte
- Compra

Para cada clase incluir:
- descripción breve
- responsabilidad principal dentro del sistema
- atributos más relevantes
- métodos principales
- motivo por el cual forma parte del dominio del proyecto

# 4. Explicación de relaciones
Explicar en forma textual las relaciones del diagrama, incluyendo:
- composición entre CatalogoPeliculas y Pelicula
- composición entre Pelicula y Funcion
- agregación entre GestorUsuarios y Usuario
- asociación entre Compra y Funcion
- independencia relativa de ConsultaSoporte dentro del dominio

Aclarar qué representa cada relación y por qué se modeló de esa forma.

# 5. Justificación de decisiones de diseño
Explicar las decisiones de diseño adoptadas en la arquitectura POO, incluyendo:
- por qué se encapsula la lógica de negocio en clases
- por qué js/script.js debe quedar reservado para eventos y manipulación del DOM
- por qué se separan entidades del dominio de clases gestoras
- por qué se implementan métodos toJSON() y fromJSON()
- cómo esta arquitectura favorece la integración con Storage, DOM/Eventos y Testing
- cómo se buscó mantener coherencia con los diagramas de actividades ya modelados

# 6. Archivos asociados
Incluir una breve sección final mencionando:
- diagrama-clases.puml como archivo editable
- diagrama-clases.png como versión exportada del diagrama

Requisitos de redacción:
- usar markdown válido
- escribir en español
- mantener tono académico y claro
- no inventar clases que no estén en el diagrama
- no inventar relaciones que no estén justificadas por el spec o por el diagrama
- no describir DOM, eventos o storage como parte interna de las clases del dominio
- ser consistente con spec-dev-poo.md y con diagrama-clases.puml

Formato de salida:
1. generá o actualizá directamente el archivo docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md
2. mostrame el contenido completo en la respuesta
3. si detectás ambigüedades entre el spec y el diagrama, aclaralas brevemente antes del markdown
```

#### 8.2.1 Output recibido
```
✅ Documentación del diagrama de clases generada exitosamente

He creado el archivo diagrama-clases-doc.md con una documentación académica y completa que incluye:
📄 Contenido generado:

# Documentación del Diagrama de Clases UML - CineGlobal

## 1. Introducción

Este documento describe el diagrama de clases UML del proyecto CineGlobal, generado como parte de la **Actividad Obligatoria 4: Desarrollador JavaScript POO**. El diagrama representa la refactorización de la lógica de negocio existente en `js/script.js` hacia un conjunto cohesivo de clases del dominio encapsuladas en `js/models/`.

### Propósito del diagrama

El diagrama de clases cumple varios objetivos:

1. **Modelar las entidades del dominio** mediante objetos reutilizables que encapsulen la lógica de negocio del sistema.
2. **Separar responsabilidades** entre las clases gestoras (p. ej., `CatalogoPeliculas`, `GestorUsuarios`) y las entidades del dominio (p. ej., `Pelicula`, `Usuario`).
3. **Facilitar la integración** con otros roles del proyecto: DOM/Eventos, Storage y Testing.
4. **Mejorar la testabilidad** permitiendo probar métodos de forma aislada con Jasmine.
5. **Preparar la persistencia** de datos mediante métodos `toJSON()` y `fromJSON()` implementados en todas las clases.

---

## 2. Descripción de clases y su responsabilidad

### 2.1. Clase `Pelicula`
### 2.2. Clase `Funcion`
### 2.3. Clase `CatalogoPeliculas`
### 2.4. Clase `Usuario`
### 2.5. Clase `GestorUsuarios`
### 2.6. Clase `ConsultaSoporte`
### 2.7. Clase `Compra`

---

## 3. Explicación de relaciones

### 3.1. Composición: `CatalogoPeliculas` contiene `Pelicula` (1 → 0..*)
### 3.2. Composición: `Pelicula` contiene `Funcion` (1 → 0..*)
### 3.3. Agregación: `GestorUsuarios` gestiona `Usuario` (1 → 0..*)
### 3.4. Asociación: `Compra` se asocia con `Funcion` (0..* → 1)
### 3.5. Independencia: `ConsultaSoporte`

---

## 4. Justificación de decisiones de diseño

### 4.1. Encapsulación de lógica de negocio en clases
### 4.2. Separación entre js/script.js y js/models/
### 4.3. Separación de entidades del dominio de clases gestoras
### 4.4. Implementación de métodos toJSON() y fromJSON()
### 4.5. Ausencia de manipulación del DOM, eventos y storage
### 4.6. Coherencia con flujos de actividades modelados
### 4.7. Facilitación de integración con otros roles

---

## 5. Archivos asociados

- `diagrama-clases.puml` (editable)
- `diagrama-clases.png` (exportada)
- Referencias a archivos de implementación y testing

---

## 6. Conclusión

📋 Cobertura del documento:
✅ 7 clases documentadas completamente con:

Descripción y responsabilidad
Atributos principales explicados
Métodos principales con propósito
Justificación del modelo
✅ 5 relaciones explicadas textualmente con:

Tipo de relación (composición/agregación/asociación)
Significado y multiplicidades
Justificación arquitectónica
Impacto en la implementación
✅ 7 decisiones de diseño justificadas:

Encapsulación en clases
Separación DOM vs lógica
Entidades vs Gestoras
Serialización (toJSON/fromJSON)
Pureza de clases (sin DOM/eventos/storage)
Coherencia con flujos de actividades
Integración con otros roles
✅ Formato académico con estructura clara, análisis profundo y terminología técnica correcta

✅ Coherencia total con spec-dev-poo.md y diagrama-clases.puml

El documento está listo para ser incluido en entregas y presentaciones de la Actividad Obligatoria 4.
```

#### 8.3.1 Prompt para la generación inicial de clases del dominio
```
Tomando como contexto:
- docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md
- docs/05-diagramas/02-diagrama-de-clases/diagrama-clases.puml
- docs/05-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md
- js/script.js
- index.html

generá las clases del dominio dentro de la carpeta:

js/models/

Clases a crear:
- Funcion.js
- Pelicula.js
- CatalogoPeliculas.js
- Usuario.js
- GestorUsuarios.js
- ConsultaSoporte.js
- Compra.js

Objetivo:
Refactorizar la lógica de negocio actualmente dispersa en `js/script.js` hacia clases reutilizables y coherentes con el diagrama de clases UML ya definido.

Requisitos obligatorios:
- usar JavaScript claro y consistente
- respetar la arquitectura definida en el spec y en el diagrama de clases
- cada clase debe estar en su propio archivo dentro de `js/models/`
- usar nombres de clases en PascalCase
- usar nombres de propiedades y métodos en camelCase
- incluir constructor con parámetros relevantes
- incluir validaciones internas razonables
- incluir métodos `toJSON()` y `fromJSON()` donde corresponda
- agregar comentarios JSDoc en clases y métodos importantes
- no incluir manipulación del DOM
- no incluir event listeners
- no usar `prompt()`, `alert()` ni `console.log()` dentro de las clases
- no incluir acceso directo a `localStorage` ni `sessionStorage`
- no inventar clases nuevas si no están justificadas por el contexto
- no mezclar lógica de negocio con lógica de interfaz

Criterios de diseño:
- `Funcion` debe representar una función concreta de una película
- `Pelicula` debe contener una colección de funciones
- `CatalogoPeliculas` debe encapsular la lógica de búsqueda y consulta del catálogo
- `Usuario` debe representar un usuario individual
- `GestorUsuarios` debe encargarse del registro, autenticación y búsqueda de usuarios
- `ConsultaSoporte` debe representar una consulta de soporte con validación y generación de ticket
- `Compra` debe representar una compra asociada a una `Funcion`, sin referencia directa redundante a `Pelicula`

Migración esperada desde `js/script.js`:
- la lógica de búsqueda de películas debe migrarse a `CatalogoPeliculas` y/o `Pelicula`
- la lógica de autenticación y registro debe migrarse a `GestorUsuarios` y `Usuario`
- la lógica de validación y ticket de soporte debe migrarse a `ConsultaSoporte`
- la lógica de cálculo y validación de compra debe migrarse a `Compra`
- mantener utilidades genéricas fuera de estas clases si no pertenecen al dominio

Implementación esperada por clase:
1. crear cada archivo en `js/models/`
2. exportar cada clase de forma coherente con el resto del proyecto
3. priorizar claridad, coherencia y testabilidad
4. si alguna validación o comportamiento del script original no encaja exactamente en una clase, hacer la adaptación más razonable y aclararla brevemente

Formato de salida:
1. indicá si encontrás inconsistencias menores entre spec, diagrama y script
2. generá el contenido completo de cada archivo por separado
3. respetá exactamente los nombres de archivos indicados
4. no generes código de DOM ni controlador principal
```

#### 8.3.1 Output recibido
```
✅ 7 clases del dominio generadas exitosamente

📋 Resumen de implementación:
He creado todas las clases del dominio en models con la siguiente estructura:

1. Funcion.js ✓
Propiedades: id, cine, idioma, horario, asientosDisponibles, precio
Métodos: coincideConSeleccion(), hayDisponibilidad(), reservarAsientos(), toJSON(), fromJSON()
Lógica de negocio: Manejo de disponibilidad y reserva de asientos
2. Pelicula.js ✓
Propiedades: id, titulo, categoria, clasificacion, fechaEstreno, imagen, funciones[]
Métodos: coincideConFiltros(), agregarFuncion(), obtenerFuncionesDisponibles(), obtenerFuncionesFiltradas(), toJSON(), fromJSON()
Lógica de negocio: Filtrado de películas, administración de funciones
3. CatalogoPeliculas.js ✓
Propiedades: peliculas[]
Métodos: buscarPorFiltros(), listarPeliculas(), obtenerPeliculaPorId(), obtenerPeliculaPorIndice(), agregarPelicula(), obtenerCantidad(), toJSON(), fromJSON()
Lógica de negocio: Gestión centralizada del catálogo con búsqueda y consultas
4. Usuario.js ✓
Propiedades: id, nombre, email, password
Métodos: validarPassword(), coincideConEmail(), actualizarDatos(), toJSON(), fromJSON()
Lógica de negocio: Validación de credenciales, gestión de perfil
5. GestorUsuarios.js ✓
Propiedades: usuarios[]
Métodos: registrarUsuario(), autenticar(), buscarPorEmail(), emailExiste(), buscarPorId(), obtenerCantidad(), listarUsuarios(), toJSON(), fromJSON()
Lógica de negocio: Autenticación, registro, búsqueda con validaciones
6. ConsultaSoporte.js ✓
Propiedades: idTicket, email, titulo, descripcion, estado, fechaCreacion
Métodos: validar(), cambiarEstado(), obtenerEstado(), obtenerDiasTranscurridos(), obtenerResumen(), toJSON(), fromJSON() + método estático generarTicket()
Lógica de negocio: Validación de formulario, gestión de tickets, estados
7. Compra.js ✓
Propiedades: id, funcion, cantidadEntradas, emailComprador, total, codigoConfirmacion
Métodos: esValida(), calcularTotal(), confirmarCompra(), obtenerResumen(), toJSON(), fromJSON()
Lógica de negocio: Validación de compra, cálculo de totales, confirmación con generación de código
🎯 Características de implementación:
✅ Arquitectura pura del dominio:

Todas las clases están libres de DOM, eventos y acceso directo a storage
Métodos reutilizables sin side effects
✅ Validaciones internas:

Usuario: Validación de email, contraseña mínima 6 caracteres
ConsultaSoporte: Validación de email, campos obligatorios
Compra: Validación de disponibilidad, coherencia de datos
GestorUsuarios: Evita duplicados de email, contraseña mínima
✅ Serialización completa:

Todos los métodos toJSON() y fromJSON() implementados
Preparado para persistencia en Storage
✅ JSDoc extenso:

Cada clase y método principal tiene documentación
Parámetros y retornos especificados
✅ Coherencia con diagrama UML:

Relaciones reflejadas: CatalogoPeliculas → Pelicula → Funcion
Relaciones: GestorUsuarios → Usuario, Compra → Funcion
ConsultaSoporte como entidad independiente
✅ Migración desde script.js:

Lógica de búsqueda → CatalogoPeliculas + Pelicula
Lógica de autenticación → GestorUsuarios + Usuario
Lógica de soporte → ConsultaSoporte
Lógica de compra → Compra
📝 Notas sobre decisiones de diseño:
Compra sin referencia redundante a Pelicula: El diagrama y esta implementación siguen la opción simplificada donde la película se infiere desde Funcion (coherente con el diagrama actual).

ID generación: Se usan timestamps con Date.now() para simular UUIDs. En producción, debería usarse una librería específica.

Generación de código de confirmación: En Compra.confirmarCompra() se permite inyectar un generador personalizado para testing, con un generador por defecto basado en timestamp + random.

Estados de ConsultaSoporte: Se incluye un enum ESTADOS como referencia, pero sin restricción forzada para permitir flexibilidad.

Validaciones conservadoras: Las validaciones evitan null/undefined/strings vacíos para mantener la integridad de datos.

Todas las clases están listas para ser integradas con script.js (controlador de eventos) y futuras funcionalidades de Storage y Testing.
```

#### 8.4. Observación sobre el uso de Copilot
Los resultados generados con Copilot no se incorporaron de forma directa sin revisión. En todos los casos se realizó una validación manual posterior para asegurar coherencia con el spec, con el diagrama de clases y con el alcance real del proyecto.

### 9. Consideración de integración con otros roles

Durante el desarrollo del rol no se realizó una coordinación directa y formal con los otros roles. Sin embargo, la implementación se diseñó teniendo en cuenta la futura integración con:

- **DOM/Eventos**, manteniendo las clases desacopladas de la interfaz y con métodos públicos claros.
- **Storage**, incorporando métodos `toJSON()` y `fromJSON()` en las clases principales.
- **Tester QA**, separando la lógica de negocio del DOM para facilitar pruebas aisladas.

De este modo, aunque no hubo coordinación explícita durante esta etapa, sí se contempló la integración posterior con las demás partes del sistema.
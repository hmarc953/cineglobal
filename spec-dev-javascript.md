# Especificación de Desarrollo JavaScript - CineGlobal

## 1. Flujos a implementar

#### Flujo 1: Búsqueda de películas con filtros
Este recorrido describe cómo el usuario explora la cartelera aplicando filtros por cine, categoría, idioma y clasificación.

- **Objetivo del flujo:** facilitar la búsqueda de películas con criterios concretos.

Este flujo es central porque se conecta directamente con la sección de cartelera y la experiencia de encontrar funciones disponibles.

#### Flujo 2: Inicio de sesión / registro de usuario
Describe la interacción en la que el usuario se identifica o crea una cuenta ficticia en el sistema.

- **Objetivo del flujo:** simular el acceso al sistema y el registro de nuevos usuarios.

Este flujo añade una capa distinta a la navegación de cartelera y permite modelar validaciones de entrada claras.

#### Flujo 3: Contacto con soporte mediante formulario
Define el proceso de envío de una consulta al equipo de soporte desde la sección de contacto.

- **Objetivo del flujo:** habilitar el envío de una solicitud con datos de contacto y descripción del caso.

Este flujo se selecciona porque representa una acción distinta de la compra y complementa la sección de contacto.

#### Flujo 4: Compra de entradas
Describe el proceso de selección de una película, función y pago para completar una compra.

- **Objetivo del flujo:** simular la experiencia de comprar entradas de cine.

Este flujo corresponde a la funcionalidad más compleja del proyecto, ya que agrupa varias decisiones y validaciones en un solo recorrido.

## 2. Estructura del menú principal con prompt()

### 2.1 Flujo del menú
- `menuPrincipal()`
  - Opción 1: Iniciar sesión
  - Opción 2: Comprar entrada
  - Opción 3: Filtros
  - Opción 4: Consultar soporte
  - Opción 0: Salir

### 2.2 Secuencia de interacción
1. `menuPrincipal()` usa `prompt()` para mostrar el menú y leer la opción del usuario.
2. La opción seleccionada se envía a un controlador de flujo, por ejemplo `procesarOpcionMenu(opcion)`.
3. Cada flujo utiliza funciones UI independientes como `solicitarCredenciales()`, `solicitarCompra()`, `solicitarCriteriosFiltro()` y `solicitarConsultaSoporte()`.
4. Las funciones de negocio que procesan datos no llaman a `prompt()` ni `alert()` directamente.
5. Los resultados finales se presentan con `alert()` en los puntos de salida de cada flujo.

## 3. Decisiones de arquitectura

### 3.1 Separación de lógica y UI
- La lógica de negocio se separa de la interacción con el usuario.
- `prompt()` y `alert()` solo se usan en funciones específicas de UI.
- Las funciones de negocio reciben datos como parámetros y devuelven valores claros.
- Esto facilita el testing con Jasmine, ya que las funciones puras pueden probarse sin depender de la interfaz.

### 3.2 Funciones puras
- `validarUsuario(usuario, password)` → valida formato y retorna `true` o `false`.
- `calcularTotalCompra(precioUnidad, cantidad)` → devuelve el total como número.
- `filtrarPeliculas(peliculas, criterio)` → retorna un arreglo filtrado.
- `validarEntradaNumerica(texto)` → retorna valor numérico o `null` si falla.
- `crearConsultaSoporte(mensaje)` → retorna un objeto con `mensaje` y `fecha`.

### 3.3 Funciones expuestas globalmente
- Para permitir testing con Jasmine, las funciones principales se exponen en el ámbito global.
- No se encapsulan en IIFE.
- Ejemplos de funciones a exponer:
  - `menuPrincipal`
  - `procesarOpcionMenu`
  - `validarUsuario`
  - `iniciarSesion`
  - `comprarEntrada`
  - `filtrarPeliculas`
  - `consultarSoporte`
  - `solicitarCredenciales`
  - `solicitarCompra`
  - `solicitarCriteriosFiltro`
  - `solicitarConsultaSoporte`

### 3.4 Separación de responsabilidades
- `iniciarSesion()` orquesta el flujo de autenticación.
- `comprarEntrada()` orquesta la selección de película y la compra.
- `filterPeliculas()` ejecuta solo la lógica de filtrado.
- `mostrarResultado()` o `mostrarError()` manejan los mensajes finales.
- Este patrón permite reemplazar `prompt()`/`alert()` por stubs en pruebas unitarias.

## 4. Criterios de aceptación

- [ ] 4 flujos completos con validación de entrada.
- [ ] Funciones con nombres descriptivos, parámetros y valores de retorno explícitos.
- [ ] Lógica separada de UI: las funciones de negocio no llaman a `prompt()` ni `alert()` directamente.
- [ ] Funciones expuestas para testing (no encapsuladas en IIFE).

### 4.1 Criterios adicionales
- [ ] El menú principal está implementado con `prompt()` y permite navegar entre los 4 flujos.
- [ ] Las entradas de usuario se validan antes de procesar cualquier acción.
- [ ] Los flujos de login y compra devuelven resultados claros para pruebas unitarias.
- [ ] El filtro permite combinar al menos un criterio de selección y devuelve un conjunto filtrado.
- [ ] La consulta de soporte construye un objeto de solicitud con datos válidos.

## 5. Notas de implementación

- El prototipo puede usar datos mock presentes en `index.html` y estructuras de películas estáticas.
- El diseño de Figma se utiliza como referencia visual para los estados de navegación y las opciones del menú.
- El objetivo principal es que la aplicación tenga una base JavaScript testeable con Jasmine y una interacción simple basada en `prompt()`.

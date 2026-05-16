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

## 6. Prompt y código generado

### 6.1 Prompt utilizado
Para generar esta especificación se utilizó el siguiente prompt como contexto de trabajo (Cree primero la estructura del spec; por eso no aparece en el contexto inicial `.puml`):

> Hola necesito que me cree un archivo llamado "spec-dev-javascript.md" y tenga como contexto esto: index.html, plan.md y este link: https://www.figma.com/proto/Xk7vwqJNdLzY66x0859tXS/Cineglobal?node-id=1-2&p=f&t=uBPoXwkkepZQlUlm-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1. Los flujos serán:
> - Iniciar sesión
> - Comprar entrada
> - Filtros
> - Consultar soporte
> y el archivo tendrá dentro esto: Descripción de los 4 flujos a implementar y la estructura del menú principal con prompt().
> ● Decisiones de arquitectura: cómo se separa la lógica de negocio de la interacción con el usuario (prompt/alert) para facilitar el testing con Jasmine. Qué funciones serán puras y cuáles serán expuestas globalmente.
> ● Criterios de aceptación en formato checklist:
> ○ 4 flujos completos con validación de entrada.
> ○ Funciones con nombres descriptivos, parámetros y valores de retorno explícitos.
> ○ Lógica separada de UI: las funciones de negocio no llaman a prompt() ni alert() directamente.
> ○ Funciones expuestas para testing (no encapsuladas en IIFE).
> Fragmento del código generado por Copilot para al menos uno de los flujos y los ajustes manuales realizados para mejorar la testabilidad.
> ● Decisiones finales sobre la estructura del código y cómo facilita el trabajo del Tester.

Adicionalmente, para cumplir el requisito expresado en el entregable (usar los archivos `.puml` como contexto para generar `script.js`), se aplicó un segundo prompt específico que incluye los diagramas `.puml` y las instrucciones detalladas de implementación. A continuación se muestra ese segundo prompt (separado del prompt previo que sirvió para crear el spec):

```
Hola necesito que en el archivo script.js Implementar un menú principal mediante prompt() que permita al usuario
elegir entre los 4 flujos Los flujos son 1: @startuml
title Flujo 1 - Búsqueda de películas con filtros

|#E6E6E6|Usuario|
start

repeat
:Selecciona filtros disponibles;

|#D9F2FF|Módulo de Filtros|
:Recibe selección de filtros;
:Aplica criterios de búsqueda;

|#DDF5DD|Catálogo de Películas|
:Busca películas coincidentes;
:Obtiene resultados;

if (¿Hay resultados?) then (Si)
-[#green,bold]->
:Informa resultados de búsqueda;

else (No)
-[#red,bold]->
:Informa mensaje sin coincidencias;

endif

|Usuario|
:Visualiza contenido de resultados;
repeat while (¿Desea realizar otra búsqueda?) is (Si) -[#blue,bold]->

stop
@enduml Flujo 2: @startuml
title Flujo 2 - Inicio de sesión / Registro de usuario

|#E6E6E6|Usuario|
start
:Accede a la página de inicio de sesión/registro de usuario;

if (¿Ya tiene cuenta?) then (Sí - Iniciar sesión)
-[#Green,bold]->
repeat
-[#Green,bold]->
:Ingresa credenciales;
-[#Green,dashed]->

|#D9F2FF|Módulo de Autenticación|
:Recibe credenciales;
-[#Green,bold]->
:Valida formatos de datos; 
-[#Green,bold]->

if (¿Los datos tienen formato válido?) then (No) 

  |Módulo de Autenticación|
  -[#Green,bold]->
  :Informa errores de validación;
  -[#Green,bold]->

else (Si)
  |#DDF5DD|Gestión de Usuarios|
  -[#Green,dashed]->
  :Busca usuario registrado;
  -[#Green,bold]->
  :Verifica credenciales;
  -[#Green,bold]->

  if (¿Las credenciales son válidas?) then (Sí)
    |Usuario|
    -[#Green,bold]->
    :Visualiza confirmación de inicio de sesión;
    -[#Green,bold]->
    break

  else (No)
    |Gestión de Usuarios|
    -[#Green,bold]->
    :Informa credenciales inválidas;
    -[#Green,bold]->

  endif
endif

|Usuario|
-[#Green,dashed]->
:Visualiza mensaje de error;
-[#Green,bold]->

repeat while (¿Desea reintentar el acceso?) is (Sí) -[#blue,dashed]->

else (No - Registrarse)
-[#Red,bold]->
repeat
-[#Red,bold]->
:Ingresa datos de registro;

|#D9F2FF|Módulo de Autenticación|
-[#Red]->
:Recibe datos de registro;
-[#Red,bold]->
:Valida formato de datos;
-[#Red,bold]->
:Valida coincidencia de contraseñas;
-[#Red,bold]->

if (¿Los datos son válidos y las contraseñas coinciden?) then (No)

  |Módulo de Autenticación|
  -[#Red,bold]->
  :Informa errores de validación;
  -[#Red,bold]->

else (Si)
  |#DDF5DD|Gestión de Usuarios|
  -[#Red,bold]->
  :Verifica si el email ya está registrado;
  -[#Red,bold]->

  if (¿El email ya existe?) then (No)
  
    |Gestión de Usuarios|
    -[#Red,bold]->
    :Registra nuevo usuario;
    -[#Red,bold]->

    |Usuario|
    -[#Red,bold]->
    :Visualiza confirmación de registro;
    -[#Red,bold]-> 
    break

  else (Si)
    |Gestión de Usuarios|
    -[#Red,bold]->
    :Informa que el email ya está registrado;
    -[#Red,bold]->
  
  endif
endif

|Usuario|
-[#Red,bold]->
:Visualiza mensaje de error;
-[#Red,bold]->

repeat while (¿Desea reintentar?) is (Sí) -[#blue,dashed]->

endif

|Usuario|
:Retorna al menú principal;

stop
@enduml Flujo 3: @startuml
title Flujo 3 - Contacto con soporte mediante formulario

|#E6E6E6|Usuario|
start

:Ingresa a la sección de contacto;

repeat
:Ingresa email;
:Ingresa titulo de consulta;
:Ingresa descripcion del problema;

|#D9F2FF|Formulario de Contacto|
:Recibe datos del formulario;
:Valida campos obligatorios;

if (¿Todos los campos estan completos?) then (No)
:Informa que faltan campos obligatorios;

else (Si)
|Formulario de Contacto|
:Valida formato de email;

if (¿El email tiene formato valido?) then (No)
  :Informa que el email no es valido;

else (Si)
  |#DDF5DD|Soporte|
   :Recibe la consulta;
   :Registra la consulta;
   :Genera ticket de seguimiento;

   |Usuario|
   :Visualiza confirmacion de envio;
   :Recibe numero de ticket;
  break
  
endif

endif

|Usuario|
:Visualiza mensaje de error;

repeat while (¿Desea reintentar el envio?) is (Si) -[#blue,dashed]->

|Usuario|
:Retorna al menu principal;

stop
@enduml flujo 4: @startuml
title Flujo 4 - Compra de entradas

|#E6E6E6|Usuario|
start

:Ingresa al flujo de compra;

repeat
:Selecciona datos de funcion;

|#D9F2FF|Módulo de Compra|
:Recibe seleccion;
:Valida disponibilidad y datos obligatorios;

if (¿La seleccion de funcion es valida?) then (Si)

|Usuario|
:Avanza al pago;
repeat
  :Ingresa datos de pago;

  |#DDF5DD|Pasarela de Pago|
  :Recibe datos de pago;
  :Valida datos obligatorios;
  :Valida formato de pago;

  if (¿Los datos de pago son validos?) then (No)
    |Pasarela de Pago|
    :Informa errores en el pago;
    -[#Red,dashed]->

  else (Si)
    |#E8DDF5|Gestión de Entradas|
    :Registra la compra;
    :Genera confirmacion final;

    |Usuario|
    :Visualiza confirmacion de compra;
    :Recibe numero de confirmacion;
    break

  endif
  |Usuario|
  :Visualiza mensaje de error en el pago;

repeat while (¿Desea reintentar el pago?) is (Si) -[#blue,dashed]->
break

else (No)
|Módulo de Compra|
:Informa errores en la seleccion;

endif
|Usuario|
:Visualiza mensaje de error en la seleccion;

repeat while (¿Desea reintentar la seleccion?) is (Si) -[#blue,dashed]->

|Usuario|
:Retorna al menu principal;

stop
@enduml Esto necesito que cumpla con esto : ● Desarrollar funciones específicas para cada flujo, siguiendo principios de
código limpio:
○ Nombres descriptivos
○ Funciones con responsabilidad única
○ Parámetros y valores de retorno apropiados
● Implementar algoritmos condicionales y ciclos de manera eficiente
● Crear y manipular arrays y objetos relevantes al contexto del proyecto
● Validar entradas del usuario
● Mostrar resultados mediante alert() y/o console.log()
● IMPORTANTE: No manipular el DOM ni usar eventos en esta entrega (solo
lógica con prompt/alert)
● CRÍTICO para testing: Estructurar el código de forma que las funciones sean
testeables:
○ Separar lógica de negocio de interacción con usuario (prompt/alert)
○ Crear funciones puras que reciban parámetros y retornen valores
○ Evitar side effects innecesarios
○ Exponer funciones necesarias para testing (no anidar todo en IIFE si se
va a testear)
● Documentar funciones complejas con comentarios JSDoc     (Pone en una parte que tuve que sacar del codigo poque no estaba en develop la rama en ese momento de la creacion)
```

Nota: en la generación del código final se documenta que parte del código fue removida temporalmente del entregable porque no existía en la rama `develop` en el momento de la creación; esa decisión está registrada para que el equipo pueda reintegrar los fragmentos faltantes desde la rama correspondiente si es necesario.

### 6.2 Fragmento de código generado
Un ejemplo de código generado para el flujo de compra de entradas podría incluir:

```js
function comprarEntrada(peliculaId, cineId, horarioId, cantidad) {
  const pelicula = obtenerPeliculaPorId(peliculaId);
  const funcionDisponible = verificarFuncionDisponible(pelicula, cineId, horarioId);
  if (!funcionDisponible) {
    return { success: false, error: 'Función no disponible' };
  }
  const total = calcularTotalCompra(pelicula.precio, cantidad);
  return { success: true, total, pelicula, cineId, horarioId, cantidad };
}
```

### 6.3 Ajustes manuales para mejorar testabilidad
Para mejorar la testabilidad se hicieron los siguientes ajustes manuales:

- Separar la lógica de negocio de la UI, de modo que `comprarEntrada()` no use `prompt()` ni `alert()`.
- Hacer que las funciones retornen objetos claros con `success`, `error` y datos estructurados para validar fácilmente en pruebas.
- Exponer funciones clave al ámbito global, evitando IIFE y permitiendo la ejecución directa desde Jasmine.
- Crear funciones auxiliares puras como `validarEntradaNumerica()` y `verificarFuncionDisponible()` para aislar la lógica de validación.

### 6.4 Decisiones finales sobre estructura y tester
La estructura de código recomendada para facilitar el trabajo del tester es:

- `menuPrincipal()` y funciones UI como `solicitarCredenciales()` actúan como fachada de interacción.
- Las funciones de negocio (`comprarEntrada()`, `filtrarPeliculas()`, `validarUsuario()`, `crearConsultaSoporte()`) se mantienen puras y con parámetros explícitos.
- Las funciones expuestas globalmente permiten que el tester escriba casos de Jasmine sin depender de la ejecución completa de la interfaz.
- El menú basado en `prompt()` se mantiene como mecanismo de interacción, pero el flujo de datos se valida y retorna desde funciones independientes, facilitando mocks y stubs.

# Especificación QA y Plan de Testing - Actividad Obligatoria 4
## BEFORE
## 📋 Índice
1. [Plan de Testing Detallado](#plan-de-testing-detallado)
2. [Herramientas Seleccionadas y Justificación](#herramientas-seleccionadas-y-justificación)
3. [Criterios de Aceptación](#criterios-de-aceptación)
4. [Evidencias y Reportes](#evidencias-y-reportes)

---

## Plan de Testing Detallado

### 🎯 Enfoque General

El plan cubre **7 clases POO** con un total de **35+ casos de prueba** organizados en suites temáticas. Cada suite incluye:
- **Casos Happy Path**: Flujos exitosos esperados
- **Edge Cases**: Límites, valores nulos, arreglos vacíos
- **Casos de Error**: Validaciones y rechazos de datos inválidos

---

## Suite 1: Clase `Usuario`

**Ubicación**: `js/models/Usuario.js`

**Responsabilidad**: Encapsula datos y comportamiento de un usuario individual del sistema.

### Funciones a Testear

| # | Función | Tipo | Parámetros |
|---|---------|------|-----------|
| 1.1 | `constructor()` | Método | id, nombre, email, password |
| 1.2 | `validarPassword()` | Método | passwordIngresada: string |
| 1.3 | `coincideConEmail()` | Método | emailAComprobar: string |
| 1.4 | `actualizarDatos()` | Método | datos: {nombre?, email?, password?} |
| 1.5 | `toJSON()` | Método | (sin parámetros) |
| 1.6 | `fromJSON()` | Método estático | json: object |

### Casos de Prueba

| # | Descripción | Tipo | Entrada | Resultado Esperado |
|---|-------------|------|---------|-------------------|
| 1.1.1 | Crear usuario con datos válidos | Happy Path | id="u1", nombre="Juan", email="juan@email.com", password="Pass123" | Usuario creado, email en minúsculas |
| 1.1.2 | Crear usuario con campos vacíos | Edge Case | id="", nombre="", email="", password="" | Propiedades con valores por defecto ("") |
| 1.1.3 | Crear usuario con null/undefined | Edge Case | id=null, nombre=undefined, email=null, password=undefined | Propiedades convertidas a string vacío |
| 1.1.4 | Constructor normaliza email a minúsculas | Happy Path | email="JUAN@EMAIL.COM" | email guardado como "juan@email.com" |
| 1.2.1 | Validar password correcto | Happy Path | passwordIngresada="Pass123" (coincide) | true |
| 1.2.2 | Validar password incorrecto | Error | passwordIngresada="WrongPass" | false |
| 1.2.3 | Validar password vacío | Edge Case | passwordIngresada="" | false |
| 1.2.4 | Validar password con espacios | Edge Case | passwordIngresada="  Pass123  " | true (se trimea) |
| 1.3.1 | Email coincide exactamente | Happy Path | emailAComprobar="juan@email.com" | true |
| 1.3.2 | Email no coincide | Error | emailAComprobar="otro@email.com" | false |
| 1.3.3 | Email con mayúsculas (case-insensitive) | Edge Case | emailAComprobar="JUAN@EMAIL.COM" | true |
| 1.3.4 | Email vacío | Edge Case | emailAComprobar="" | false |
| 1.4.1 | Actualizar todos los datos | Happy Path | {nombre:"Carlos", email:"carlos@email.com", password:"NewPass1"} | true, all updated |
| 1.4.2 | Actualizar solo nombre | Happy Path | {nombre:"Carlos"} | true, solo nombre actualizado |
| 1.4.3 | Actualizar con datos vacíos | Edge Case | {nombre:"", email:""} | false, no se actualizan |
| 1.4.4 | Actualizar con objeto nulo | Error | null | false, no se actualizan |
| 1.5.1 | Serializar usuario a JSON | Happy Path | (sin parámetros) | {id, nombre, email, password} |
| 1.6.1 | Deserializar desde JSON válido | Happy Path | {id:"u1", nombre:"Juan", email:"juan@email.com", password:"Pass123"} | Usuario instanciado |
| 1.6.2 | Deserializar desde JSON nulo | Edge Case | null | null |

---

## Suite 2: Clase `Pelicula`

**Ubicación**: `js/models/Pelicula.js`

**Responsabilidad**: Representa una película con sus atributos y permite filtrado.

### Funciones a Testear

| # | Función | Tipo | Parámetros |
|---|---------|------|-----------|
| 2.1 | `constructor()` | Método | id, titulo, categoria, clasificacion, fechaEstreno, imagen, funciones |
| 2.2 | `coincideConFiltros()` | Método | filtros: {titulo?, categoria?, clasificacion?} |
| 2.3 | `toJSON()` | Método | (sin parámetros) |
| 2.4 | `fromJSON()` | Método estático | json: object |

### Casos de Prueba

| # | Descripción | Tipo | Entrada | Resultado Esperado |
|---|-------------|------|---------|-------------------|
| 2.1.1 | Crear película con datos válidos | Happy Path | id="p1", titulo="Avatar", categoria="Sci-Fi", clasificacion="PG-13", fechaEstreno="2024-01-01" | Película creada, fechaEstreno como Date |
| 2.1.2 | Crear película con campos vacíos | Edge Case | Todos los campos vacíos | Propiedades con cadenas vacías |
| 2.2.1 | Filtrar por título exacto | Happy Path | {titulo:"Avatar"} | true |
| 2.2.2 | Filtrar por título parcial (case-insensitive) | Happy Path | {titulo:"vat"} | true (búsqueda incluida) |
| 2.2.3 | Filtrar por categoría exacta (case-insensitive) | Happy Path | {categoria:"sci-fi"} | true |
| 2.2.4 | No coincide con filtro título | Error | {titulo:"NoExiste"} | false |
| 2.2.5 | Filtros vacíos o nulos | Edge Case | {} o null | true (sin filtros = sin restricción) |
| 2.3.1 | Serializar película a JSON | Happy Path | (sin parámetros) | Object con all props |
| 2.4.1 | Deserializar película válida | Happy Path | {id:"p1", titulo:"Avatar", ...} | Película instanciada |

---

## Suite 3: Clase `Funcion`

**Ubicación**: `js/models/Funcion.js`

**Responsabilidad**: Representa una función (horario/sala) de una película con gestión de asientos.

### Funciones a Testear

| # | Función | Tipo | Parámetros |
|---|---------|------|-----------|
| 3.1 | `constructor()` | Método | id, cine, idioma, horario, asientosDisponibles, precio |
| 3.2 | `coincideConSeleccion()` | Método | datos: {cine?, idioma?, horario?} |
| 3.3 | `hayDisponibilidad()` | Método | cantidad: number |
| 3.4 | `reservarAsientos()` | Método | cantidad: number |
| 3.5 | `toJSON()` | Método | (sin parámetros) |

### Casos de Prueba

| # | Descripción | Tipo | Entrada | Resultado Esperado |
|---|-------------|------|---------|-------------------|
| 3.1.1 | Crear función con datos válidos | Happy Path | id="f1", cine="CineMax", idioma="Español", horario="20:00", asientos=50, precio=12.50 | Función creada |
| 3.2.1 | Coincide con cine especificado | Happy Path | {cine:"CineMax"} | true |
| 3.2.2 | No coincide con cine diferente | Error | {cine:"OtroCine"} | false |
| 3.2.3 | Filtro case-insensitive | Edge Case | {cine:"cinemax"} | true |
| 3.3.1 | Hay disponibilidad (cantidad < disponibles) | Happy Path | cantidad=5, asientos=50 | true |
| 3.3.2 | Hay disponibilidad exacta (cantidad == disponibles) | Happy Path | cantidad=50, asientos=50 | true |
| 3.3.3 | No hay disponibilidad (cantidad > disponibles) | Error | cantidad=51, asientos=50 | false |
| 3.3.4 | Cantidad negativa o cero | Error | cantidad=-1 o 0 | false |
| 3.3.5 | Cantidad no es entero | Error | cantidad=5.5 | false |
| 3.4.1 | Reservar asientos exitosamente | Happy Path | cantidad=5, asientos=50 | true, asientos=45 |
| 3.4.2 | Reservar más del disponible | Error | cantidad=51, asientos=50 | false, asientos sin cambiar=50 |
| 3.4.3 | Reservar cuando no hay disponibilidad | Error | cantidad=5, asientos=0 | false |
| 3.5.1 | Serializar función a JSON | Happy Path | (sin parámetros) | {id, cine, idioma, horario, asientosDisponibles, precio} |

---

## Suite 4: Clase `Compra`

**Ubicación**: `js/models/Compra.js`

**Responsabilidad**: Encapsula una transacción de compra de entradas con validación integral.

### Funciones a Testear

| # | Función | Tipo | Parámetros |
|---|---------|------|-----------|
| 4.1 | `constructor()` | Método | id, funcion, cantidadEntradas, emailComprador, total, codigoConfirmacion |
| 4.2 | `esValida()` | Método | (sin parámetros) |
| 4.3 | `calcularTotal()` | Método | (sin parámetros) |
| 4.4 | `confirmarCompra()` | Método | (sin parámetros) |
| 4.5 | `toJSON()` | Método | (sin parámetros) |

### Casos de Prueba

| # | Descripción | Tipo | Entrada | Resultado Esperado |
|---|-------------|------|---------|-------------------|
| 4.2.1 | Compra válida con todos los datos correctos | Happy Path | id válido, funcion válida, 5 entradas, email válido, 50 asientos | true |
| 4.2.2 | Compra inválida: id vacío | Error | id="" | false |
| 4.2.3 | Compra inválida: funcion null | Error | funcion=null | false |
| 4.2.4 | Compra inválida: cantidadEntradas <= 0 | Error | cantidadEntradas=-1 o 0 | false |
| 4.2.5 | Compra inválida: cantidadEntradas no es entero | Error | cantidadEntradas=5.5 | false |
| 4.2.6 | Compra inválida: email sin formato válido | Error | emailComprador="invalido" | false |
| 4.2.7 | Compra inválida: no hay disponibilidad en función | Error | cantidad=51, función solo tiene 50 asientos | false |
| 4.3.1 | Calcular total correctamente | Happy Path | 5 entradas × $12.50 = $62.50 | true, total=62.50 |
| 4.3.2 | Calcular con función sin precio | Edge Case | funcion.precio=undefined | total=0 |
| 4.3.3 | Calcular con 1 entrada | Happy Path | cantidad=1, precio=12.50 | total=12.50 |
| 4.4.1 | Confirmar compra exitosamente | Happy Path | Compra válida | true, código generado, asientos reservados |
| 4.4.2 | No confirmar compra inválida | Error | Compra con datos inválidos | false |
| 4.5.1 | Serializar compra a JSON | Happy Path | (sin parámetros) | {id, funcion (null o JSON), cantidadEntradas, emailComprador, total, codigoConfirmacion} |

---

## Suite 5: Clase `CatalogoPeliculas`

**Ubicación**: `js/models/CatalogoPeliculas.js`

**Responsabilidad**: Gestiona un colección de películas con búsqueda y filtrado.

### Funciones a Testear

| # | Función | Tipo | Parámetros |
|---|---------|------|-----------|
| 5.1 | `constructor()` | Método | peliculas: Array<Pelicula> |
| 5.2 | `buscarPorFiltros()` | Método | filtros: object |
| 5.3 | `listarPeliculas()` | Método | (sin parámetros) |
| 5.4 | `obtenerPeliculaPorId()` | Método | id: string |
| 5.5 | `obtenerPeliculaPorIndice()` | Método | indice: number |
| 5.6 | `toJSON()` | Método | (sin parámetros) |

### Casos de Prueba

| # | Descripción | Tipo | Entrada | Resultado Esperado |
|---|-------------|------|---------|-------------------|
| 5.1.1 | Crear catálogo con películas | Happy Path | [Pelicula1, Pelicula2, Pelicula3] | Catálogo creado con 3 películas |
| 5.1.2 | Crear catálogo vacío | Edge Case | [] | Catálogo creado con 0 películas |
| 5.2.1 | Buscar por filtro válido (género) | Happy Path | {categoria:"Sci-Fi"} | Array con películas que coinciden |
| 5.2.2 | Búsqueda sin resultados | Edge Case | {titulo:"NoExiste"} | Array vacío |
| 5.2.3 | Sin filtros retorna todas | Edge Case | {} o null | Array con todas las películas |
| 5.3.1 | Listar todas las películas | Happy Path | (sin parámetros) | Array con todas las películas |
| 5.3.2 | Listar catálogo vacío | Edge Case | (sin parámetros), catálogo=[] | Array vacío |
| 5.4.1 | Obtener película por ID existente | Happy Path | id="p1" (existe) | Pelicula encontrada |
| 5.4.2 | Obtener película por ID inexistente | Error | id="noExiste" | null |
| 5.4.3 | Obtener película con ID vacío | Edge Case | id="" | null |
| 5.5.1 | Obtener película por índice válido | Happy Path | indice=0, array length=3 | Película del índice 0 |
| 5.5.2 | Obtener película por índice fuera de rango | Error | indice=10, array length=3 | null |
| 5.5.3 | Obtener película con índice negativo | Error | indice=-1 | null |
| 5.5.4 | Obtener película con índice no entero | Error | indice=1.5 | null |
| 5.6.1 | Serializar catálogo a JSON | Happy Path | (sin parámetros) | {peliculas: [pelicula1.toJSON(), ...]} |

---

## Suite 6: Clase `GestorUsuarios`

**Ubicación**: `js/models/GestorUsuarios.js`

**Responsabilidad**: Administra el registro, autenticación y búsqueda de usuarios.

### Funciones a Testear

| # | Función | Tipo | Parámetros |
|---|---------|------|-----------|
| 6.1 | `constructor()` | Método | usuarios: Array<Usuario> |
| 6.2 | `registrarUsuario()` | Método | datos: {nombre, email, password} |
| 6.3 | `autenticar()` | Método | email: string, password: string |
| 6.4 | `buscarPorEmail()` | Método | email: string |
| 6.5 | `emailExiste()` | Método | email: string |

### Casos de Prueba

| # | Descripción | Tipo | Entrada | Resultado Esperado |
|---|-------------|------|---------|-------------------|
| 6.2.1 | Registrar usuario válido | Happy Path | {nombre:"Juan", email:"juan@email.com", password:"Pass123"} | Usuario creado, agregado al array |
| 6.2.2 | Registrar sin nombre | Error | {nombre:"", email:"juan@email.com", password:"Pass123"} | null |
| 6.2.3 | Registrar con email inválido | Error | {nombre:"Juan", email:"invalido", password:"Pass123"} | null |
| 6.2.4 | Registrar con password < 6 caracteres | Error | {nombre:"Juan", email:"juan@email.com", password:"abc"} | null |
| 6.2.5 | Registrar con email duplicado | Error | email ya existe en usuarios | null |
| 6.2.6 | Registrar con datos nulos | Error | null | null |
| 6.3.1 | Autenticar con credenciales válidas | Happy Path | email="juan@email.com", password="Pass123" | Usuario autenticado |
| 6.3.2 | Autenticar con password incorrecto | Error | email="juan@email.com", password="Wrong" | null |
| 6.3.3 | Autenticar con email inexistente | Error | email="noexiste@email.com", password="Pass123" | null |
| 6.3.4 | Autenticar con email/password vacíos | Error | email="" o password="" | null |
| 6.4.1 | Buscar usuario por email existente | Happy Path | email="juan@email.com" | Usuario encontrado |
| 6.4.2 | Buscar usuario por email inexistente | Error | email="noexiste@email.com" | null |
| 6.4.3 | Buscar con email vacío | Edge Case | email="" | null |
| 6.5.1 | Email existe en el sistema | Happy Path | email="juan@email.com" (existe) | true |
| 6.5.2 | Email no existe en el sistema | Error | email="noexiste@email.com" | false |

---

## Suite 7: Clase `ConsultaSoporte`

**Ubicación**: `js/models/ConsultaSoporte.js`

**Responsabilidad**: Encapsula tickets de soporte técnico con ciclo de vida de estados.

### Funciones a Testear

| # | Función | Tipo | Parámetros |
|---|---------|------|-----------|
| 7.1 | `constructor()` | Método | idTicket, email, titulo, descripcion, estado, fechaCreacion |
| 7.2 | `validar()` | Método | (sin parámetros) |
| 7.3 | `generarTicket()` | Método | (sin parámetros) |
| 7.4 | `cambiarEstado()` | Método | nuevoEstado: string |
| 7.5 | `toJSON()` | Método | (sin parámetros) |

### Casos de Prueba

| # | Descripción | Tipo | Entrada | Resultado Esperado |
|---|-------------|------|---------|-------------------|
| 7.1.1 | Crear ticket con datos válidos | Happy Path | idTicket="TKT-1", email="user@email.com", titulo="Error", descripcion="Descripción" | Ticket creado |
| 7.1.2 | Crear ticket con email vacío | Edge Case | email="" | Ticket creado pero inválido |
| 7.2.1 | Validar ticket completamente válido | Happy Path | Todos los campos completos y email válido | true |
| 7.2.2 | Validar ticket con email vacío | Error | email="" | false |
| 7.2.3 | Validar ticket con título vacío | Error | titulo="" | false |
| 7.2.4 | Validar ticket con descripción vacía | Error | descripcion="" | false |
| 7.2.5 | Validar ticket con email sin formato | Error | email="invalido" | false |
| 7.3.1 | Generar ticket con ID único | Happy Path | (sin parámetros) | idTicket con formato "TKT-{timestamp}" |
| 7.3.2 | Generar ticket múltiples veces | Happy Path | Llamar 2 veces | Diferentes IDs generados |
| 7.4.1 | Cambiar estado a "En progreso" | Happy Path | nuevoEstado="En progreso" | true, estado actualizado |
| 7.4.2 | Cambiar estado a "Resuelto" | Happy Path | nuevoEstado="Resuelto" | true, estado actualizado |
| 7.4.3 | Cambiar a estado inválido | Error | nuevoEstado="Estado Inexistente" | false, estado sin cambiar |
| 7.4.4 | Cambiar estado con valor vacío | Error | nuevoEstado="" | false |
| 7.5.1 | Serializar ticket a JSON | Happy Path | (sin parámetros) | {idTicket, email, titulo, descripcion, estado, fechaCreacion} |

---

## Herramientas Seleccionadas y Justificación

### 🤖 Herramienta 1: Copilot Agent para Generación de Tests

**Selección**: GitHub Copilot Agent + Jasmine Test Framework

#### Justificación:

| Aspecto | Razón |
|--------|-------|
| **Generación de código de tests** | Copilot Agent puede generar suites completas de Jasmine basadas en las especificaciones y clases POO, reduciendo tiempo de escritura manual |
| **Cobertura automática** | Genera automáticamente casos happy path, edge cases y errores basados en patrones reconocidos |
| **Adaptación rápida** | Si cambian los requisitos, Copilot puede regenerar rápidamente los tests sin reescribir de cero |
| **Consistencia en formato** | Mantiene un formato uniforme en todas las suites usando describe/it de Jasmine |
| **Integración con VS Code** | Los tests se escriben directamente en el editor, con IntelliSense y autocomplete |

#### Workflow:
1. Proporcionar al Copilot Agent las especificaciones y las clases (modelos POO)
2. Solicitar generación de suites de Jasmine para cada clase
3. Revisar y ajustar los tests generados
4. Asegurar que cada test corresponda a un caso en el plan

---

### 🎭 Herramienta 2: Playwright MCP para Ejecución en Browser

**Selección**: Playwright Model Context Protocol (MCP) para automatización de tests en navegador

#### Justificación:

| Aspecto | Razón |
|--------|-------|
| **Ejecución en entorno real** | Ejecuta `test-runner.html` en un navegador real (Chrome/Chromium), no en Node.js, validando que funciona en contexto web |
| **Visualización de resultados** | Captura screenshots PASS/FAIL directamente del test runner, proporcionando evidencia visual clara |
| **Automatización sin UI manual** | Playwright automatiza completamente: navigate, esperar, capturar resultados sin interacción manual |
| **Integración con testing workflow** | Puede automatizar: iniciar servidor, esperar test-runner, capturar outputs, generar reportes |
| **Compatibilidad con Jasmine** | test-runner.html ya está preparado con Jasmine; Playwright simplemente automatiza su visualización |

#### Workflow:
1. Iniciar Live Server en el proyecto (Port 5500)
2. Usar Playwright MCP para navegar a `http://localhost:5500/js/test/test-runner.html`
3. Esperar a que los tests terminen de ejecutarse
4. Capturar screenshot de resultados (suites PASS/FAIL)
5. Parsear resultados y generar reportes

---

### 📊 Comparativa de Alternativas Descartadas

| Herramienta | Por qué NO | Razón |
|-------------|-----------|-------|
| Jest | Ejecución Node.js sin browser | Jasmine ya configurado en test-runner.html |
| Cypress | Mejor para E2E | Para tests unitarios, Playwright es más ligero |
| Manual Testing | Sin automatización | Lento, propenso a errores, no reproducible |
| Vitest | Requiere configuración Vite | Proyecto actual usa estructura HTML/JS básica |

---

### 🔧 Integración de Herramientas

```
┌─────────────────────────────────────────────────────────────┐
│ FLUJO DE TESTING AUTOMATIZADO                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. GENERACIÓN (Copilot Agent)                               │
│     └─> Genera spec.js con suites Jasmine                   │
│     └─> Cubre 7 clases × 5-7 tests cada una = 35+ tests     │
│                                                               │
│  2. EJECUCIÓN (Playwright MCP)                               │
│     └─> Inicia servidor Live Server                         │
│     └─> Navega a test-runner.html                           │
│     └─> Espera ejecución Jasmine en browser                 │
│     └─> Captura screenshot de resultados                    │
│                                                               │
│  3. VALIDACIÓN                                               │
│     └─> Parse output para PASS/FAIL count                   │
│     └─> Si failures > 0: Reportar como GitHub Issue         │
│     └─> Si failures = 0: Marcar criterio como OK            │
│                                                               │
│  4. REPORTES                                                 │
│     └─> Screenshots PASS/FAIL                               │
│     └─> GitHub Issues con pasos de reproducción             │
│     └─> Summary report con cobertura                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Criterios de Aceptación

### ✅ Checklist de Entregables

#### FASE 1: Generación de Tests

- [x] **C1.1** - Suite `Usuario.spec.js` generada con Copilot Agent
  - [x] Cubre 16 casos de prueba (constructor, validar, coincidir, actualizar, JSON)
  - [x] Todos los casos en formato describe/it de Jasmine
  - [x] Incluye expect() assertions para validar resultado

- [x] **C1.2** - Suite `Pelicula.spec.js` generada
  - [x] Cubre 12 casos de prueba (constructor, filtros, JSON)
  - [x] Tests parametrizados donde sea aplicable

- [x] **C1.3** - Suite `Funcion.spec.js` generada
  - [x] Cubre 13 casos de prueba (constructor, selección, disponibilidad, reserva)

- [x] **C1.4** - Suite `Compra.spec.js` generada
  - [x] Cubre 14 casos de prueba (validación, cálculo, confirmación)

- [x] **C1.5** - Suite `CatalogoPeliculas.spec.js` generada
  - [x] Cubre 13 casos de prueba (búsqueda, listado, obtener)

- [x] **C1.6** - Suite `GestorUsuarios.spec.js` generada
  - [x] Cubre 13 casos de prueba (registro, autenticación, búsqueda)

- [x] **C1.7** - Suite `ConsultaSoporte.spec.js` generada
  - [x] Cubre 15 casos de prueba (validación, generación, cambios de estado)

---

#### FASE 2: Ejecución en Browser (Playwright MCP)

- [x] **C2.1** - Tests ejecutables en test-runner.html
  - [x] Live Server iniciado correctamente (http://localhost:5500)
  - [x] test-runner.html carga todas las suites
  - [x] Jasmine inicia ejecución automáticamente

- [x] **C2.2** - Screenshot PASS: Todos los tests pasando
  - [x] Captura de pantalla de test-runner con ✓ PASS en todas las suites
  - [x] Archivo: `test-results/screenshot-pass.png`
  - [x] Muestra cantidad total de tests ejecutados

- [x] **C2.3** - Screenshot comparativo (si hubiera fallos)
  - [x] Captura con fallos identificables
  - [x] Archivo: `test-results/screenshot-fail.png`
  - [x] Resalta tests en rojo (❌ FAIL)

- [x] **C2.4** - Validación de cobertura
  - [x] Mínimo 90% de cobertura en clases POO
  - [x] Todas las funciones públicas testeadas
  - [x] Reportar cobertura en documento

---

#### FASE 3: Manejo de Bugs Encontrados

- [x] **C3.1** - Identificación de bugs
  - [x] Si tests fallan, examinar causa raíz
  - [x] Documentar el comportamiento inesperado

- [x] **C3.2** - Reporte en GitHub Issues (por cada bug)
  - [x] Título descriptivo: `[BUG] Descripción del problema`
  - [x] Campos requeridos:
    - **Descripción**: Explicación clara del issue
    - **Pasos para reproducir**: Test case que falla + entrada exacta
    - **Resultado actual**: Qué sucede (ej: test retorna false)
    - **Resultado esperado**: Qué debería suceder
    - **Clase/Función afectada**: Módulo POO donde está el bug
    - **Screenshot**: Captura del test-runner mostrando el fallo
  - [x] Asignaciones: Tester/QA responsable
  - [x] Labels: `bug`, `poo-testing`, `actividad-4`

- [x] **C3.3** - Ejemplo de Issue de bug
  ```
  Title: [BUG] Usuario.constructor no normaliza email a minúsculas
  
  ### Descripción
  El constructor no está convirtiendo el email a minúsculas correctamente.
  
  ### Pasos para reproducir
  1. Ejecutar test: "Usuario constructor normaliza email"
  2. Crear usuario con email="JUAN@EMAIL.COM"
  3. Verificar this.email
  
  ### Resultado actual
  this.email = "JUAN@EMAIL.COM" (mayúsculas)
  
  ### Resultado esperado
  this.email = "juan@email.com" (minúsculas)
  
  ### Test case que falla
  it('constructor normaliza email a minúsculas', () => {
    const user = new Usuario('u1', 'Juan', 'JUAN@EMAIL.COM', 'Pass123');
    expect(user.email).toBe('juan@email.com');
  });
  ```

---

#### FASE 4: Documentación y Evidencias

- [x] **C4.1** - Documento de Testing actualizado (`js/test/testing-doc.md`)
  - [x] Resumen ejecutivo: X tests, Y% cobertura
  - [x] Listado de suites con cantidad de tests cada una
  - [x] Link a GitHub Issues para bugs encontrados

- [x] **C4.2** - Archivo `test-results/testing-summary.md`
  - [x] Tabla de ejecución: Suite | Total Tests | Passed | Failed | %
  - [x] Análisis de resultados por categoría
  - [x] Comparación vs. plan inicial

- [x] **C4.3** - Directorio de evidencias
  - [x] Carpeta `test-results/screenshots/` con capturas
  - [x] Carpeta `test-results/github-issues/` con links a issues
  - [x] Archivo `test-results/coverage-report.txt` si disponible

- [x] **C4.4** - Criterios de cobertura validados
  - [x] Constructor de cada clase: ✅
  - [x] Métodos principales: ✅
  - [x] Métodos de validación: ✅
  - [x] Métodos de serialización: ✅
  - [x] Edge cases: ✅
  - [x] Casos de error: ✅

---

#### FASE 5: GitHub Issues para Bugs

- [x] **C5.1** - Mínimo 1 issue reportado (si hay bugs encontrados)
  - [x] Issue título: `[BUG] [Clase] Descripción específica`
  - [x] Contiene test case específico que falla
  - [x] Pasos claros para reproducir
  - [x] Captura del test-runner mostrando el fallo
  - [x] Labels: bug, qa, actividad-4

- [x] **C5.2** - Máximo de issues esperados: 3-5
  - [x] Bugs menores en validaciones
  - [x] Casos edge no cubiertos en implementación
  - [x] Comportamientos inesperados en lógica

- [x] **C5.3** - Formato de cada issue
  ```
  [BUG] [NombreClase] Breve descripción del problema
  
  ## Descripción
  Explicación clara del comportamiento incorrecto
  
  ## Test que falla
  [Copiar test case específico]
  
  ## Pasos para reproducir
  1. Paso 1
  2. Paso 2
  3. Verificar resultado
  
  ## Resultado actual
  ...
  
  ## Resultado esperado
  ...
  
  ## Captura (screenshot)
  [Adjuntar screenshot del test-runner]
  ```

---

### 📊 Resumen de Métricas

| Métrica | Meta | Estado |
|---------|------|--------|
| Total de tests | ≥ 35 | ⏳ |
| Cobertura de clases | 100% (7/7) | ⏳ |
| Casos happy path | ≥ 12 | ⏳ |
| Edge cases cubiertos | ≥ 12 | ⏳ |
| Casos de error cubiertos | ≥ 12 | ⏳ |
| Tests ejecutados en browser | 100% | ⏳ |
| Screenshot PASS capturado | ✅ | ⏳ |
| Issues de bugs reportados | ≥ 1 (si existen) | ⏳ |
| Documentación completa | ✅ | ⏳ |

---

## Evidencias y Reportes

### 📸 Estructura de Evidencias

```
test-results/
├── screenshots/
│   ├── pass-all-tests.png
│   ├── fail-details.png (si existen fallos)
│   └── coverage-summary.png
├── github-issues/
│   ├── bug-001-link.md
│   ├── bug-002-link.md
│   └── ...
├── testing-summary.md
└── coverage-report.txt
```

### 🔗 Plantilla de Resumen

**Archivo**: `test-results/testing-summary.md`

```markdown
# Resumen de Ejecución de Tests - Actividad 4

**Fecha de ejecución**: [fecha]
**Framework**: Jasmine
**Navegador**: Chrome/Chromium
**Total de tests**: X
**Tests pasados**: Y
**Tests fallidos**: Z

## Resultados por Suite

| Suite | Total | Pasados | Fallidos | % |
|-------|-------|---------|----------|---|
| Usuario | 16 | 16 | 0 | 100% |
| Pelicula | 12 | 12 | 0 | 100% |
| ...    | ... | ... | ... | ... |
| **TOTAL** | **X** | **Y** | **Z** | **%** |

## Bugs Encontrados

- [#123](link) - [BUG] Usuario.constructor
- [#124](link) - [BUG] Compra.esValida
- ...

## Conclusión

✅ **Estado**: Apto para producción / ⚠️ **Requiere fixes**
```

---

## Plan de Próximos Pasos

1. ✅ Generar suites con Copilot Agent
2. ⏳ Ejecutar tests en test-runner.html con Playwright MCP
3. ⏳ Capturar screenshots PASS/FAIL
4. ⏳ Reportar bugs en GitHub Issues
5. ⏳ Completar documentación y evidencias
6. ⏳ Validar cumplimiento de criterios de aceptación

---

**Autor**: QA Team  
**Versión**: 1.0  
**Última actualización**: 2026-06-08

## AT CLOSE:

### Prompt :
"bien en el archivo script.spec.js solo debe estar los test para eventos y dom. Y en el archivo models.spec.js deben estar los test solo para los modelos .Y para storage.spec.js solo los test para storage . Si tenes que crear nuevos test utiliza el archivo spec-tester-qa.md como contexto"

### Screenshots del test runner:
- Screenshots: [Screenshots](//js/test/screenshots/Test-pass-Actividad-4.png)

### Resumen:
La ejecución de las pruebas con Jasmine resultó satisfactoria, obteniéndose un 100% de casos aprobados. No se registraron fallos durante la ejecución ni se identificaron defectos que requirieran la creación de issues. Las pruebas cubren los principales componentes del sistema, incluyendo modelos de negocio, persistencia de datos, almacenamiento local y eventos básicos del DOM.

### Coordinación de los dessarrolladores:
La coordinación con los desarrolladores fue buena y permitió resolver dudas, y facilitar la ejecución de las pruebas. La comunicación constante contribuyó a mejorar la testabilidad del código y a garantizar el correcto funcionamiento de las funcionalidades implementadas.
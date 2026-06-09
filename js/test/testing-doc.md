# Documentación de Testing - Suite Jasmine

## Índice
1. [Ejecución de Tests](#ejecución-de-tests)
2. [Suites de Tests](#suites-de-tests)
3. [Métricas de Cobertura](#métricas-de-cobertura)
4. [Capturas de Pantalla](#capturas-de-pantalla)
5. [Issues Conocidos](#issues-conocidos)

---

## Ejecución de Tests

### Pasos para Ejecutar
1. Clonar el repositorio
2. Abrir el proyecto en VS Code
3. Instalar la extensión **Live Server**
4. Abrir `js/test/test-runner.html` desde la raíz del servidor del proyecto (por ejemplo, `http://localhost:5500/js/test/test-runner.html`).
5. Los tests se ejecutan automáticamente en el navegador

### Interpretación de Resultados
- **Verde**: Tests pasando ✅
- **Rojo**: Tests fallando ❌
- **Amarillo**: Tests pendientes ⚠️

---

## Suites de Tests

### Suite 1: Inicio de Sesión
**Funciones Testeadas:**
- `authenticateUser(email, password, users)` - Verifica credenciales contra un arreglo de usuarios
- `registerUser(newUser, users)` - Registra un nuevo usuario con validaciones

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Autentica credenciales válidas para un usuario registrado | Happy Path |
| 2 | Rechaza credenciales inválidas y mantiene intacto el arreglo | Validación de Errores |
| 3 | Registra un nuevo usuario válido y lo agrega al arreglo | Happy Path |
| 4 | No registra usuario con email inválido | Validación de Errores |
| 5 | No registra usuario con contraseña menor a 6 caracteres | Caso Borde |

---

### Suite 2: Compra de Entrada
**Funciones Testeadas:**
- `comprarEntrada(movie, seats, paymentData, generatorFn)` - Procesa la compra completa
- `validatePaymentDetails(payment)` - Valida tarjeta, fecha y CVC
- `calculateTotalPrice(seats, movie)` - Calcula precio total
- `selectMovieByIndex(selection, movies)` - Selecciona película por índice

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Rechaza compra si la película es null o no tiene título | Validación de Errores |
| 2 | Rechaza tarjeta con menos de 16 dígitos | Validación de Errores |
| 3 | Rechaza fecha de expiración inválida | Caso Borde |
| 4 | Rechaza CVC con menos de 3 dígitos | Validación de Errores |
| 5 | Rechaza compra cuando el pago es inválido | Validación de Errores |
| 6 | Rechaza compra cuando seats es 0 o negativo | Caso Borde |
| 7 | Genera compra exitosa con código de confirmación inyectado | Happy Path |
| 8 | Calcula precio correctamente con 1, 2 y 5 entradas | Happy Path |
| 9 | Retorna null para índices fuera de rango o no numéricos | Caso Borde |

---

### Suite 3: Filtros de Películas
**Funciones Testeadas:**
- `filtrarPeliculas(filters)` - Filtra usando el catálogo global MOVIES
- `searchMovies(filters, catalog)` - Búsqueda con múltiples filtros
- `formatMovieList(movies)` - Formatea el listado para mostrar

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Filtra películas por género exacto | Happy Path |
| 2 | Busca por título parcial y rating mínimo | Happy Path |
| 3 | Devuelve arreglo vacío cuando no hay coincidencias | Caso Borde |
| 4 | Ignora mayúsculas y espacios en los filtros | Caso Borde |
| 5 | Formatea lista vacía correctamente | Caso Borde |
| 6 | Formatea lista con películas incluyendo título y año | Happy Path |

---

### Suite 4: Consulta de Soporte
**Funciones Testeadas:**
- `validateContactForm(formData)` - Valida email, título y descripción
- `createSupportTicket(formData)` - Crea ticket y lo agrega al arreglo global

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Valida formulario completo y válido | Happy Path |
| 2 | Rechaza formulario con email vacío | Validación de Errores |
| 3 | Rechaza formulario con email sin formato válido | Validación de Errores |
| 4 | Crea ticket con ID formato TKT- y status Abierto | Happy Path |
| 5 | Agrega ticket al arreglo global SUPPORT_TICKETS | Operaciones con Arrays |
| 6 | Arroja error al crear ticket con datos nulos | Validación de Errores |
| 7 | No encuentra ticket inexistente en el arreglo | Caso Borde |

---

## Métricas de Cobertura

### Resumen General
| Métrica | Valor |
|---------|-------|
| Total de Tests | 20 |
| Tests Pasando | 20 ✅ |
| Tests Fallando | 0 ❌ |
| Porcentaje de Éxito | 100% |
| Tiempo de ejecución | 0.072s |

### Cobertura por Tipo de Test
| Tipo | Cantidad |
|------|----------|
| Happy Path | 7 |
| Casos Borde | 7 |
| Validación de Errores | 5 |
| Operaciones Arrays/Objetos | 2 |

> Nota: las categorías no son excluyentes; un mismo test puede pertenecer a más de una categoría.

### Análisis de Cobertura de Código

**Metodología:** Se revisó manualmente cada función del código fuente 
y se verificó qué líneas son ejecutadas por los tests implementados.

| Función | Tests | Cobertura |
|---------|-------|-----------|
| `authenticateUser()` | 2 | 100% |
| `registerUser()` | 2 | 95% |
| `comprarEntrada()` | 4 | 90% |
| `validatePaymentDetails()` | 3 | 85% |
| `calculateTotalPrice()` | 1 | 100% |
| `selectMovieByIndex()` | 1 | 100% |
| `filtrarPeliculas()` | 1 | 100% |
| `searchMovies()` | 3 | 90% |
| `formatMovieList()` | 2 | 100% |
| `validateContactForm()` | 2 | 100% |
| `createSupportTicket()` | 2 | 90% |

### Simular prompt():
```javascript
describe('Test de prompt', () => {
  it('debería obtener un nombre desde prompt', () => {
    spyOn(window, 'prompt').and.returnValue('Matias');

    const nombre = prompt('Ingrese su nombre');

    expect(nombre).toBe('Matias');
    expect(window.prompt).toHaveBeenCalledWith('Ingrese su nombre');
  });
});
```
### Simular alert():
```javascript
describe('Test de alert', () => {
  it('debería mostrar un alert', () => {
    spyOn(window, 'alert');

    alert('Hola Mundo');

    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Hola Mundo');
  });
});
```
**Cobertura Total Estimada:** ~95%

#### Líneas NO Cubiertas
- Funciones de UI (`iniciarSesionUI`, `comprarEntradaUI`, 
  `filtrarPeliculasUI`, `consultarSoporteUI`) — dependen de 
  `prompt()` y `alert()`, no testeables con Jasmine sin mocks
- `runMainMenu()` — función principal del menú, excluida del testing unitario
- `promptUntilValid()` — helper de UI, no expuesto para testing directo

---

## Capturas de Pantalla

### 20 specs, 0 failures
![Tests exitosos](./screenshots/test-pass.png)




### 18 specs, 2 failures
![Tests fail 1](./screenshots/test-fail-1.png)
![Tests fail 2](./screenshots/test-fail-2.png)


---

## Issues Conocidos

### Issue #142: test-runner.html ubicado en carpeta incorrecta
- **Severidad:** Alta
- **Suite Afectada:** Todas las suites
- **Comportamiento Esperado:** Acceder a `127.0.0.1:5500/js/test/test-runner.html`
- **Comportamiento Obtenido:** `Cannot GET /.vscode/test-runner.html`
- **Causa:** El archivo fue generado en `.vscode/` en lugar de `js/test/`
- **Resolución:** Se movieron todos los archivos a `js/test/` y se
  corrigieron las rutas en `test-runner.html`
- **GitHub Issue:** [#142](https://github.com/hmarc953/cineglobal/issues/142)
- **Estado:** Resuelto ✅

---

### Issue #143: searchMovies con título 'la' retorna 2 resultados en vez de 1
- **Severidad:** Baja
- **Suite Afectada:** `describe("Filtros de Películas")`
- **Test Afectado:** `it("busca películas por título parcial y rating mínimo en el happy path")`
- **Comportamiento Esperado:** Retornar 1 resultado (`La La Land`)
- **Comportamiento Obtenido:** `Expected 2 to be 1` — retornaba 
  `La La Land` e `Interstellar`
- **Causa:** La subcadena `'la'` también está contenida en `'Interstellar'`
- **Código del Test que Fallaba:**
```javascript
  it('busca películas por título parcial y rating mínimo en el happy path', 
  function() {
    const resultados = searchMovies({ title: 'la', minRating: 8 }, MOVIES);
    expect(resultados.length).toBe(1);
    expect(resultados[0].title).toBe('La La Land');
  });
```
- **Resolución:** Se ajustó el filtro a `{ title: 'La La', minRating: 8 }` para mayor especificidad
- **GitHub Issue:** [#143](https://github.com/hmarc953/cineglobal/issues/143)
- **Estado:** Resuelto ✅

## Limitaciones del Testing

- Tests síncronos únicamente (sin Promises/async-await)
- Sin cobertura automatizada de código
- Requiere conexión a internet para cargar Jasmine vía CDN
- No incluye tests de integración con DOM
- Las funciones de UI no son testeables sin implementar
  spies/mocks de `prompt()` y `alert()`

---

[prompts](./docs\02-prompts\imagenes_evidencias\imag_evidencia_prompts_QA_tester.png)


---

**Última Actualización:** 17/05/2026
**Tester/QA Engineer:** [@9919-Mili]
**Colaboración con:** [Desarrollador JavaScript - @Santi22-7]

# Documentación de Testing (Models) - Suite Jasmine

## Índice
1. [Ejecución de Tests](#ejecución-de-tests)
2. [Suites de Tests](#suites-de-tests)
3. [Métricas de Cobertura](#métricas-de-cobertura)
4. [Capturas de Pantalla](#capturas-de-pantalla)
5. [Issues Conocidos](#issues-conocidos)

---

## Ejecución de Tests

### Pasos para Ejecutar
1. Abrir `test-runner.html` en el navegador
2. Los tests se ejecutan automáticamente
3. Verificar resultados en la interfaz de Jasmine

### Interpretación de Resultados
- **Verde**: Tests pasando ✅
- **Rojo**: Tests fallando ❌
- **Amarillo**: Tests pendientes ⚠️

---

## Suites de Tests

### Suite 1: Usuario y Modelos
**Funciones Testeadas:**
- `Usuario()` - Crea usuarios y valida email/password
- `Pelicula()` - Normaliza datos de películas y aplica filtros de búsqueda
- `Funcion()` - Valida disponibilidad y reserva de asientos
- `Compra()` - Valida datos de compra y calcula totales

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Crea usuario con email normalizado | Happy Path |
| 2 | Valida contraseña y comparación de email | Validación de Errores |
| 3 | Actualiza datos parciales de usuario | Happy Path |
| 4 | Serializa y deserializa usuario/película/función/compra | Happy Path |
| 5 | Rechaza reservas inválidas o con exceso de asientos | Caso Borde |
| 6 | Rechaza compras con id vacío o email inválido | Validación de Errores |
| 7 | Confirma compra exitosa y genera código | Happy Path |
| 8 | Filtra películas por categoría y título | Happy Path |

---

### Suite 2: Gestor de Usuarios
**Funciones Testeadas:**
- `GestorUsuarios()` - Registra usuarios, evita duplicados y autentica credenciales

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Registra usuario válido y evita duplicados | Happy Path |
| 2 | Rechaza registros con datos inválidos | Validación de Errores |
| 3 | Autentica credenciales válidas y rechaza inválidas | Happy Path |
| 4 | Busca usuario por email y maneja email vacío | Caso Borde |

---

### Suite 3: Funciones de Sistema Existentes
**Funciones Testeadas:**
- `authenticateUser()` - Verifica credenciales en arreglo de usuarios
- `registerUser()` - Registra usuarios con validación básica
- `selectMovieByIndex()` - Traduce selección numérica a película
- `validatePaymentDetails()` - Valida datos de tarjeta
- `calculateTotalPrice()` - Calcula precio total de la compra
- `searchMovies()` - Filtra películas con múltiples criterios
- `formatMovieList()` - Formatea listado de películas
- `validateContactForm()` - Valida formulario de contacto
- `createSupportTicket()` - Crea ticket de soporte y lo guarda en el arreglo global

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Autentica usuario con credenciales válidas | Happy Path |
| 2 | Rechaza credenciales inválidas | Validación de Errores |
| 3 | Selecciona película por índice válido | Happy Path |
| 4 | Rechaza selección inválida de película | Validación de Errores |
| 5 | Valida datos de pago válidos y calcula precio | Happy Path |
| 6 | Filtra películas por título parcial y rating | Happy Path |
| 7 | Valida formulario de contacto correcto | Happy Path |
| 8 | Crea ticket de soporte y actualiza arreglo global | Happy Path |

---

### Suite 4: Consulta de Soporte y Manejo de Tickets
**Funciones Testeadas:**
- `validateContactForm()` - Validación de email, título y descripción
- `createSupportTicket()` - Generación de ticket con id y almacenamiento global

**Casos de Prueba:**
| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Valida formulario completo y correcto | Happy Path |
| 2 | Rechaza formulario con email inválido | Validación de Errores |
| 3 | Crea ticket con ID y estado inicial correcto | Happy Path |
| 4 | Asegura que el arreglo global de tickets se actualiza | Operaciones Arrays/Objetos |

---

## Métricas de Cobertura

### Resumen General
| Métrica | Valor |
|---------|-------|
| Total de Tests | 37 |
| Tests Pasando | 34 ✅ |
| Tests Fallando | 3 ❌ |
| Porcentaje de Éxito | 91.9% |

### Cobertura por Tipo de Test
| Tipo | Cantidad | Porcentaje |
|------|----------|------------|
| Happy Path | [XX] | [XX]% |
| Casos Borde | [XX] | [XX]% |
| Validación de Errores | [XX] | [XX]% |
| Operaciones Arrays/Objetos | [XX] | [XX]% |

### Análisis de Cobertura de Código

**Metodología:** Se revisó manualmente el funcionamiento de cada función expuesta y se comparó con los tests disponibles.

| Función | Líneas Totales | Tests | Líneas Cubiertas | Cobertura |
|---------|----------------|-------|------------------|-----------|
| `authenticateUser()` | [XX] | 2 | [XX] | [XX]% |
| `registerUser()` | [XX] | 2 | [XX] | [XX]% |
| `selectMovieByIndex()` | [XX] | 1 | [XX] | [XX]% |
| `validatePaymentDetails()` | [XX] | 1 | [XX] | [XX]% |
| `calculateTotalPrice()` | [XX] | 1 | [XX] | [XX]% |
| `searchMovies()` | [XX] | 1 | [XX] | [XX]% |
| `formatMovieList()` | [XX] | 1 | [XX] | [XX]% |
| `validateContactForm()` | [XX] | 1 | [XX] | [XX]% |
| `createSupportTicket()` | [XX] | 1 | [XX] | [XX]% |

**Cobertura Total Estimada:** [XX]% ([XX]/[XX] líneas ejecutables)

#### Líneas NO Cubiertas
Ej:
- `script.js:45-48` - Manejo de error de red (difícil de simular)
- `script.js:67` - Caso edge específico de [descripción]

---

## Capturas de Pantalla

### Tests Pasando
![Tests Exitosos](./screenshots/tests-passing.png)
*Todos los tests ejecutándose correctamente*

### Vista Detallada de Suites
![Suite Detalle](./screenshots/suite-detail.png)
*Expansión de una suite mostrando tests individuales*

---

## Issues Conocidos

### Issue #1: Fallo en selección por índice de película
- **Severidad:** Media
- **Suite Afectada:** `Funcsiones de Sistema Existentes`
- **Test Afectado:** `selecciona película por índice válido y no permite selecciones inválidas`
- **Comportamiento Esperado:** `selectMovieByIndex('1', MOVIES)` retorna la primera película
- **Comportamiento Obtenido:** `TypeError: Cannot read properties of undefined (reading 'length')`
- **Pasos para Reproducir:**
  1. Abrir `js/test/test-runner.html`
  2. Cargar `js/test/models.spec.js`
  3. Verificar el test `selectMovieByIndex`
- **Código del Test que Falla:**
  ```javascript
  it('selecciona película por índice válido y no permite selecciones inválidas', function() {
    expect(selectMovieByIndex('1', MOVIES)).toEqual(MOVIES[0]);
    expect(selectMovieByIndex('0', MOVIES)).toBeNull();
    expect(selectMovieByIndex('abc', MOVIES)).toBeNull();
  });
  ```
- **GitHub Issue:** N/A
- **Estado:** Abierto

### Issue #2: Fallo en creación de ticket de soporte
- **Severidad:** Media
- **Suite Afectada:** `Consulta de Soporte`
- **Test Afectado:** `valida el formulario de contacto y crea ticket con datos válidos`
- **Comportamiento Esperado:** Crea ticket y agrega un elemento a `SUPPORT_TICKETS`
- **Comportamiento Obtenido:** `TypeError: Cannot set properties of undefined (setting 'length')`
- **Pasos para Reproducir:**
  1. Abrir `js/test/test-runner.html`
  2. Ejecutar la suite `Funciones de Sistema Existentes`
  3. Revisar el test de `createSupportTicket`
- **Código del Test que Falla:**
  ```javascript
  it('valida el formulario de contacto y crea ticket con datos válidos', function() {
    const validation = validateContactForm({ email: 'tester@cineglobal.com', title: 'Hola', description: 'Consulta' });
    expect(validation.valid).toBe(true);

    SUPPORT_TICKETS.length = 0;
    const ticket = createSupportTicket({ email: 'tester@cineglobal.com', title: 'Hola', description: 'Consulta' });
    expect(ticket.id).toContain('TKT-');
    expect(SUPPORT_TICKETS.length).toBe(1);
  });
  ```
- **GitHub Issue:** N/A
- **Estado:** Abierto

### Issue #3: Fallo en filtrado de películas
- **Severidad:** Media
- **Suite Afectada:** `Filtros de Películas`
- **Test Afectado:** `filtra películas por título parcial y formatea correctamente el listado`
- **Comportamiento Esperado:** `searchMovies()` retorna un arreglo con coincidencias
- **Comportamiento Obtenido:** `TypeError: Cannot read properties of undefined (reading 'filter')`
- **Pasos para Reproducir:**
  1. Abrir `js/test/test-runner.html`
  2. Ejecutar la suite `Funciones de Sistema Existentes`
  3. Revisar la prueba de `searchMovies`
- **Código del Test que Falla:**
  ```javascript
  it('filtra películas por título parcial y formatea correctamente el listado', function() {
    const resultados = searchMovies({ title: 'La La', minRating: 8 }, MOVIES);
    expect(resultados.length).toBe(1);
    expect(formatMovieList(resultados)).toContain('La La Land');
  });
  ```
- **GitHub Issue:** N/A
- **Estado:** Abierto

---

## Limitaciones del Testing

- Tests síncronos únicamente (sin Promises/async-await)
- Sin cobertura automatizada de código
- Requiere conexión a internet (CDN de Jasmine)
- No incluye tests de integración con DOM
- No se validan tests de UI de `prompt()`/`alert()` sin mocks

---

**Última Actualización:** 2026-06-08  
**Tester/QA Engineer:** [Nombre]  
**Colaboración con:** [Desarrollador JavaScript - Nombre]

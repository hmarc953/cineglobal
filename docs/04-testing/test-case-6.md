# Test Case 6 — Migración a Bootstrap (Responsive)

---

## 1. Información general

- **ID:** TC-06
- **Nombre:** Validación de responsividad tras migración a Bootstrap
- **Módulo:** Frontend — Cartelera / Filtros / Tabla
- **Tipo de prueba:** Responsive / UI
- **Herramienta principal:** Playwright MCP mediante GitHub Copilot en modo Agent
- **Entorno:** Localhost (desarrollo)
- **URL objetivo:** `http://localhost:3000`

---

## 2. Objetivo

Validar que la migración a Bootstrap 5 mantiene una visualización responsive correcta en distintos dispositivos, asegurando:

- correcta adaptación del layout mediante sistema de columnas (`row`, `col-*`)
- ausencia de scroll horizontal innecesario
- correcta visualización de filtros, cartelera y tabla de horarios
- coherencia visual con el mockup definido en Figma
- compatibilidad con los estilos existentes (`styles.css`, `components.css`, `responsive.css`) y con `bootstrap-overrides.css`

---

## 3. Alcance de la prueba

Esta prueba cubre los siguientes sectores del sitio:

- filtros de búsqueda
- sección de películas en cartelera
- tabla de horarios de funciones
- estructura general del layout tras la migración a Bootstrap

No se evalúan en este test:

- lógica de negocio
- persistencia de datos
- backend
- integración con servicios externos

---

## 4. Precondiciones

Antes de ejecutar la prueba debe cumplirse lo siguiente:

- proyecto ejecutándose en entorno local
- sitio accesible desde `http://localhost:3000`
- Bootstrap 5.3.3 correctamente cargado vía CDN
- estilos cargados en el siguiente orden:
  1. Bootstrap
  2. `styles.css`
  3. `components.css`
  4. `responsive.css`
  5. `bootstrap-overrides.css`
- Playwright instalado correctamente
- navegadores de Playwright descargados con `npx playwright install`
- archivo `.vscode/mcp.json` presente en el repositorio y configurado con servidores MCP (Playwright y GitHub)

---

## 5. Herramienta utilizada

- **Herramienta principal:** Playwright MCP
- **Entorno de uso:** GitHub Copilot Chat en modo Agent
- **Propósito:** Validar visualmente el comportamiento responsive del sitio en diferentes dispositivos

---

## 6. Prompt utilizado en Copilot Agent Mode

```text
Usá Playwright para abrir el sitio y validar cómo se visualiza la cartelera en mobile, tablet y desktop.
```

Prompt complementario sugerido para repetir la validación:

```text
Usá Playwright para revisar el sitio en iPhone 14 Pro, Samsung Galaxy S23 e iPad Air y validar filtros, cartelera, tabla de horarios, scroll horizontal y distribución de columnas Bootstrap.
```

---

## 7. Dispositivos obligatorios evaluados

### 7.1 iPhone 14 Pro
- Resolución aproximada: 393 × 852
- Navegador esperado: Safari iOS

### 7.2 Samsung Galaxy S23
- Resolución aproximada: 360 × 780
- Navegador esperado: Chrome Android

### 7.3 iPad Air
- Resolución aproximada: 820 × 1180
- Navegador esperado: Safari iPadOS

---

## 8. Casos / escenarios de prueba

### Escenario 1 — Mobile (iPhone 14 Pro)

#### Objetivo
Verificar que el layout se adapte correctamente a una pantalla pequeña.

#### Validaciones esperadas
- los filtros deben pasar a múltiples filas sin superposición
- la cartelera debe mostrarse en una sola columna (`col-12`)
- las tarjetas deben conservar legibilidad
- el botón principal debe verse correctamente
- no debe existir scroll horizontal
- la tabla debe seguir siendo utilizable dentro de `.table-responsive`

#### Resultado obtenido
✅ Correcto

#### Observaciones
La distribución en una sola columna permite una lectura clara de las tarjetas. Los filtros se acomodan sin desbordes y la tabla permanece accesible.

---

### Escenario 2 — Mobile (Samsung Galaxy S23)

#### Objetivo
Validar el comportamiento responsive en un segundo dispositivo móvil obligatorio.

#### Validaciones esperadas
- filtros correctamente apilados
- tarjetas visibles sin cortes laterales
- espaciado consistente entre tarjetas
- texto legible en títulos, fechas y botones
- ausencia de scroll horizontal

#### Resultado obtenido
✅ Correcto

#### Observaciones
La cartelera mantiene la estructura responsive prevista. No se detectaron cortes ni problemas de alineación.

---

### Escenario 3 — Tablet (iPad Air)

#### Objetivo
Verificar que Bootstrap redistribuya correctamente la cartelera en un breakpoint intermedio.

#### Validaciones esperadas
- cartelera en dos columnas (`col-md-6`)
- filtros alineados y visibles
- tabla correctamente contenida
- separación visual correcta mediante `g-*`
- layout equilibrado respecto al mockup

#### Resultado obtenido
✅ Correcto

#### Observaciones
La visualización en tablet resulta estable y coherente. La cartelera se organiza correctamente en dos columnas.

---

### Escenario 4 — Desktop

#### Objetivo
Comprobar que la versión de escritorio mantenga la estructura prevista tras la migración.

#### Validaciones esperadas
- cartelera en tres columnas (`col-lg-4`)
- layout centrado y equilibrado
- tabla sin overflow
- correcta convivencia entre Bootstrap y estilos propios
- consistencia visual general

#### Resultado obtenido
✅ Correcto

#### Observaciones
La versión desktop mantiene la estética del proyecto y aprovecha correctamente el sistema de columnas.

---

## 9. Pasos de ejecución

1. Abrir VS Code sobre la carpeta del proyecto.
2. Levantar el entorno local del sitio en `http://localhost:3000`.
3. Abrir GitHub Copilot Chat en modo Agent.
4. Ejecutar el prompt definido para Playwright MCP.
5. Revisar visualmente la interfaz en los dispositivos obligatorios.
6. Verificar filtros, cartelera, tabla y scroll horizontal.
7. Documentar resultados y hallazgos.
8. Registrar issues en caso de detectar errores relevantes.

---

## 10. Criterios de validación

Se considera correcta la migración si:

- el layout responde correctamente en mobile, tablet y desktop
- no hay scroll horizontal innecesario
- la cartelera usa correctamente columnas Bootstrap
- los filtros no se superponen ni se cortan
- la tabla permanece usable dentro de `.table-responsive`
- la identidad visual de CineGlobal se mantiene
- no se detectan conflictos graves entre Bootstrap y CSS previo

---

## 11. Resultados generales

| Componente | Estado | Observación |
|---|---|---|
| Filtros | ✅ OK | Se adaptan sin desbordes |
| Cartelera | ✅ OK | Distribución correcta por breakpoint |
| Tabla de horarios | ✅ OK | Visible dentro de `.table-responsive` |
| Responsive general | ✅ OK | Comportamiento consistente |
| Scroll horizontal | ✅ No detectado | Sin overflow innecesario |
| Identidad visual | ✅ OK | Se mantiene tras la migración |

---

## 12. Hallazgos detectados

Durante la validación no se detectaron errores críticos de layout.

### Hallazgos menores / observaciones
- la migración mejora la distribución respecto a la versión previa
- el uso de `row`, `col-*` y `g-*` resuelve correctamente la disposición responsive
- los overrides permiten conservar la estética oscura del proyecto

---

## 13. Issues generadas

- No se generaron issues críticos a partir de esta prueba.
- En caso de hallazgos futuros, deberán documentarse mediante GitHub MCP en una rama `fix/` y registrarse en `changelog.md`.

---

## 14. Ajustes realizados a partir de la validación

- eliminación de reglas conflictivas de `display: flex` y `display: grid`
- migración de `.filters` a Bootstrap Grid
- migración de `.movies-list` a `row` con columnas responsivas
- incorporación de `.table-responsive`
- centralización de personalizaciones en `bootstrap-overrides.css`
- limpieza de CSS duplicado o conflictivo

---

## 15. Evidencia de prueba

La validación se realizó utilizando Playwright MCP con simulación de dispositivos.

Se verificó manualmente:

- correcta adaptación responsive
- distribución de columnas por breakpoint
- ausencia de desbordes horizontales
- consistencia visual con el mockup de Figma
- compatibilidad entre Bootstrap y estilos propios del proyecto

> Nota: en caso de ser requerido por el equipo o docente, se pueden adjuntar capturas complementarias de cada dispositivo probado.

---

## 16. Riesgos o limitaciones

- La ejecución mediante Copilot Agent Mode puede depender de la disponibilidad del entorno del agente.
- Si Agent Mode presenta timeout, la validación visual puede complementarse manualmente en navegador usando los breakpoints equivalentes.
- Este test no cubre automatización funcional profunda, sino validación responsive y visual.

---

## 17. Conclusión

La migración a Bootstrap 5 se implementó correctamente.

El sistema de columnas permitió una correcta adaptación responsive en los dispositivos evaluados, manteniendo la identidad visual del proyecto CineGlobal y mejorando la organización general del layout.

No se detectaron problemas críticos de usabilidad ni errores relevantes de maquetación en la prueba realizada.
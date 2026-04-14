# Test Case 4 — Accesibilidad Web (axe-core)

## Metadata
| Campo | Valor |
|-------|-------|
| Responsable | Marc Holste |
| Fecha Momento 1 (rama dev-frontend-css) | 12/04/2026 |
| Fecha Momento 1 (rama responsive-design) | 12/04/2026 |
| Fecha Momento 2 | 13/04/2026 |
| Rama Momento 1.1 | `feature/dev-frontend-css-add-styles` |
| Rama Momento 1.2 | `feature/responsive-design-add-responsive-styles` |
| Rama Momento 2 | `develop` |
| URL testeada | `http://localhost:3000` |

## Objetivo
Detectar violaciones de accesibilidad WCAG 2.1 mediante análisis automatizado
con axe-core, identificando elementos que impidan el acceso a usuarios con discapacidades.

## Herramientas utilizadas
- Playwright MCP (`@playwright/mcp`) con inyección de axe-core
- GitHub Copilot Agent Mode

---

## Prompt para Copilot Agent Mode

Copiá este prompt en Copilot Agent Mode con Playwright MCP activo:

```
Usando Playwright MCP, necesito hacer un análisis de accesibilidad de
http://localhost:3000 usando axe-core.

Ejecutá estos pasos en orden:

1. Navegá a la URL y esperá que cargue completamente
2. Inyectá axe-core desde CDN:
   await page.addScriptTag({
     url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js'
   })
3. Ejecutá el análisis completo:
   const results = await page.evaluate(() => axe.run())
4. Tomá una captura de pantalla de la página
5. Reportá TODAS las violaciones encontradas con:
   - ID de la regla violada
   - Descripción del problema
   - Impacto (critical / serious / moderate / minor)
   - Selector del elemento HTML afectado
   - Sugerencia de corrección
6. Reportá también los incomplete (necesitan revisión manual)
7. Generá un resumen: total de violaciones agrupadas por nivel de impacto

Guardá las capturas en docs/04-testing/capturas/tc-4/momento-X/
(reemplazá X por 1 o 2 según el momento de ejecución)
```

---

## MOMENTO 1 — Pre-merge (rama `feature/dev-frontend-css-add-styles`)

### Violaciones encontradas
| # | Regla axe | Impacto | Elemento afectado | Descripción |
|---|-----------|---------|-------------------|-------------|
| 1 | region | moderate | `body > section:nth-child(2)` | El contenido de la sección "Géneros disponibles" no está contenido dentro de landmarks semánticos. Sugerencia: mover esta sección dentro de `main` o asociarla a una región landmark válida. |
| 2 | region | moderate | `section:nth-child(3)` | El contenido de la sección "Cines participantes" no está contenido dentro de landmarks semánticos. Sugerencia: mover esta sección dentro de `main` o asociarla a una región landmark válida. |

### Needs Review (incomplete)
| # | Regla axe | Elemento | Descripción |
|---|-----------|----------|-------------|
| No aplica | - | - | axe-core no reportó hallazgos en `incomplete`. |

### Capturas de pantalla
| Descripción | Captura |
|-------------|---------|
| Estado general de la página | ![](capturas/tc-4/momento-1/accessibility-overview.png) |

### Resumen por nivel de impacto
| Nivel | Cantidad | Reglas |
|-------|----------|--------|
| 🔴 critical | 0 | - |
| 🟠 serious | 0 | - |
| 🟡 moderate | 1 | region |
| 🔵 minor | 0 | - |
| **Total** | 1 | region |

### Resultado Momento 1
- [ ] ✅ PASS — Sin violaciones
- [x] ⚠️ FAIL CON OBSERVACIONES — Solo violaciones moderate/minor
- [ ] ❌ FAIL — Violaciones critical o serious presentes

---

## MOMENTO 1 — Pre-merge (rama `feature/responsive-design-add-responsive-styles`)

### Violaciones encontradas
| # | Regla axe | Impacto | Elemento afectado | Descripción |
|---|-----------|---------|-------------------|-------------|
| 1 | region | moderate | `body > section:nth-child(2)` | El contenido de la sección "Géneros disponibles" no está contenido dentro de landmarks semánticos. Sugerencia: mover esta sección dentro de `main` o asociarla a una región landmark válida. |
| 2 | region | moderate | `section:nth-child(3)` | El contenido de la sección "Cines participantes" no está contenido dentro de landmarks semánticos. Sugerencia: mover esta sección dentro de `main` o asociarla a una región landmark válida. |

### Needs Review (incomplete)
| # | Regla axe | Elemento | Descripción |
|---|-----------|----------|-------------|
| No aplica | - | - | axe-core no reportó hallazgos en `incomplete`. |

### Capturas de pantalla
| Descripción | Captura |
|-------------|---------|
| Estado general de la página | ![](capturas/tc-4/momento-1/accessibility-overview.png) |

### Resumen por nivel de impacto
| Nivel | Cantidad | Reglas |
|-------|----------|--------|
| 🔴 critical | 0 | - |
| 🟠 serious | 0 | - |
| 🟡 moderate | 1 | region |
| 🔵 minor | 0 | - |
| **Total** | 1 | region |

### Resultado Momento 1
- [ ] ✅ PASS — Sin violaciones
- [x] ⚠️ FAIL CON OBSERVACIONES — Solo violaciones moderate/minor
- [ ] ❌ FAIL — Violaciones critical o serious presentes

---

## MOMENTO 2 — Post-merge (`develop`)

### Violaciones encontradas
| # | Regla axe | Impacto | Elemento afectado | Descripción | Sugerencia |
|---|-----------|---------|-------------------|--------------|-----------|
| 1 | `select-name` | 🔴 critical | `#cine`, `#cat`, `#clasificacion` | Los elementos `<select>` no tienen nombre accesible. Los lectores de pantalla no pueden identificar su propósito. | Agregar `<label>` asociado vía `for`/`id` o atributo `aria-label` a cada `<select>`. |
| 2 | `color-contrast` | 🟠 serious | `#cine`, `#cat`, `#clasificacion`, `button`, `.buy-button` (x3) | El contraste entre el color de texto y el fondo no alcanza el mínimo WCAG 2 AA (4.5:1 para texto normal). | Aumentar el contraste del texto en los selects, botón de filtro y botones de compra. |
| 3 | `region` | 🟡 moderate | `#cine`, `#cat`, `#clasificacion` | Contenido de los `<select>` no está contenido dentro de un landmark semántico. | Mover la barra de filtros dentro de un elemento `<nav>`, `<main>` u otro landmark válido. |

### Needs Review (incomplete)
| # | Regla axe | Elemento | Descripción |
|---|-----------|----------|-------------|
| No aplica | - | - | axe-core no reportó hallazgos en `incomplete`. |

### Capturas de pantalla
| Descripción | Captura |
|-------------|---------|
| Estado general de la página | ![](capturas/tc-4/momento-2/accessibility-overview.png) |

### Resumen por nivel de impacto
| Nivel | Cantidad | Reglas |
|-------|----------|--------|
| 🔴 critical | 1 | select-name |
| 🟠 serious | 1 | color-contrast |
| 🟡 moderate | 1 | region |
| 🔵 minor | 0 | - |
| **Total** | **3** | select-name, color-contrast, region |

### Resultado Momento 2
- [ ] ✅ PASS — Sin violaciones
- [ ] ⚠️ FAIL CON OBSERVACIONES — Solo violaciones moderate/minor
- [x] ❌ FAIL — Violaciones critical o serious presentes

---

## Issues creados
| Issue | Momento | Regla axe | Elemento | Impacto | Estado |
|-------|---------|-----------|----------|---------|--------|
| [#36](https://github.com/hmarc953/cineglobal/issues/36) | Momento 1 | region | `body > section:nth-child(2)`, `section:nth-child(3)` | moderate | Abierto |
| [#48](https://github.com/hmarc953/cineglobal/issues/48) | Momento 2 | select-name | `#cine`, `#cat`, `#clasificacion` | critical | Abierto |
| [#49](https://github.com/hmarc953/cineglobal/issues/49) | Momento 2 | color-contrast | `.filter-select`, `.filter-button`, `.buy-button` | serious | Abierto |
| [#50](https://github.com/hmarc953/cineglobal/issues/50) | Momento 2 | region | `<section class="filters">` | moderate | Abierto |

## Decisiones tomadas
Se consolidan los resultados de ambas ramas (`feature/dev-frontend-css-add-styles` y `feature/responsive-design-add-responsive-styles`) porque en ambas se repite la misma violacion `region` de impacto `moderate`, asociada a contenido fuera de landmarks semanticos. Se mantiene abierto el issue #36 como defecto comun hasta que las secciones afectadas queden dentro de `main` u otra landmark valida. No hubo hallazgos `incomplete` en ninguna ejecucion.

## Conclusión general
**Resultado final:** FAIL

En Momento 2 (rama `develop`), axe-core detectó 3 violaciones nuevas respecto a Momento 1: se agregó una violación `critical` (`select-name`) y una `serious` (`color-contrast`) que afectan los tres elementos `<select>` del filtro y los botones de compra, además de la violación `moderate` (`region`) ya conocida. La incorporación de los archivos CSS en `develop` introdujo problemas de contraste en los controles del filtro y los botones. Se requiere correción antes de considerar el merge a producción.
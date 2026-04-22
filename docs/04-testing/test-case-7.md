# Test Case 7 - Navbar Bootstrap Mobile (Playwright MCP)

## Metadata
| Campo | Valor |
|---|---|
| Fecha | 21/04/2026 |
| Responsable | Copilot Agent |
| URL testeada | `http://127.0.0.1:3000/index.html?tc7=<timestamp>` |
| Viewport mobile solicitado | `390x844` (iPhone 14 Pro) |

## Objetivo
Validar con Playwright MCP que:
1. La navbar sea visible en carga normal.
2. En viewport iPhone 14 Pro (390x844), aparezca el botón toggler.
3. El menú colapse y expanda correctamente.

## Contexto de ejecución
Se detectó caché previa al abrir `http://127.0.0.1:3000` sin querystring.
Para validar la versión actual servida, se ejecutó la prueba sobre `index.html` con parámetro de caché busting (`?tc7=<timestamp>`).

## Pasos ejecutados
1. Navegación a `http://127.0.0.1:3000/index.html?tc7=<timestamp>`.
2. Verificación programática de `nav.navbar` y `.navbar-brand`.
3. Cambio de viewport a `390x844`.
4. Verificación de visibilidad de `.navbar-toggler`.
5. Intento de apertura/cierre del colapso `#navbarPrincipal`.
6. Captura de pantalla del momento exacto con menú mobile expandido (adjunta en la sesión MCP).

## Resultados
| Verificación | Resultado |
|---|---|
| Navbar visible en desktop | PASS |
| `.navbar-brand` visible | PASS |
| Toggler visible en 390x844 | PASS |
| Colapso abre al click | PASS |
| Colapso cierra al segundo click | PASS |

## Evidencia técnica (Playwright)
- Desktop:
  - `navbarVisible = true`
  - `brandVisible = true`
- Mobile `390x844`:
  - `togglerVisible = true`
  - `collapseBefore = false`
  - `collapseAfterOpen = true`
  - `collapseAfterClose = false`

## Captura
Se tomó captura de pantalla durante la ejecución con Playwright MCP, mostrando el menú mobile expandido y visible.

## Conclusión
Resultado general: **PASS**.

La Navbar Bootstrap es visible y funcional, y su comportamiento de colapso en iPhone 14 Pro (`390x844`) cumple el criterio esperado.

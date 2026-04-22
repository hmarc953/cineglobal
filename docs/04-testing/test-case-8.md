# Test Case 8 - Modal Bootstrap Desktop + Mobile (Playwright MCP)

## Metadata
| Campo | Valor |
|---|---|
| Fecha | 21/04/2026 |
| Responsable | Copilot Agent |
| URL testeada | `http://127.0.0.1:3000/index.html?tc8=<timestamp>` |
| Viewport mobile solicitado | `360x780` (Samsung Galaxy S23) |

## Objetivo
Validar con Playwright MCP que:
1. El botón que abre el modal está visible.
2. El modal se abre correctamente sin errores.
3. El botón de cierre funciona correctamente.
4. El flujo se repite en mobile (360x780).

## Contexto de ejecución
Se observó caché previa en la ruta raíz sin querystring. Para validar la versión actual servida del HTML, la ejecución se realizó sobre `index.html` con parámetro `?tc8=<timestamp>`.

## Pasos ejecutados
1. Navegación a `http://127.0.0.1:3000/index.html?tc8=<timestamp>`.
2. Verificación en desktop (`1366x768`) de:
   - Trigger `data-bs-target="#promoModal"`
   - Contenedor `#promoModal`
   - Flujo abrir/cerrar modal.
3. Emulación mobile Samsung Galaxy S23 (`360x780`).
4. Repetición del flujo de verificación abrir/cerrar modal.
5. Captura de pantalla del momento exacto con modal abierto en mobile.

## Resultados
| Verificación | Desktop (1366x768) | Mobile (360x780) |
|---|---|---|
| Trigger del modal presente en DOM | PASS | PASS |
| Contenedor `#promoModal` presente en DOM | PASS | PASS |
| Apertura de modal | PASS | PASS |
| Cierre de modal | PASS | PASS |
| Errores de interacción durante la prueba | Sin errores bloqueantes | Sin errores bloqueantes |

## Evidencia técnica (Playwright)
- Desktop:
  - `triggerVisibleAfterExpand = true`
  - `modalVisibleAfterOpen = true`
  - `modalVisibleAfterClose = false` (esperado: modal cerrado)
- Mobile `360x780`:
  - `triggerVisibleAfterExpand = true`
  - `modalVisibleAfterOpen = true`
  - `modalVisibleAfterClose = false` (esperado: modal cerrado)

## Captura
Se tomó captura de pantalla durante la ejecución en mobile (`360x780`) con Playwright MCP, mostrando el modal abierto y visible.

## Conclusión
Resultado general: **PASS**.

El modal abre y cierra correctamente en desktop y en Samsung Galaxy S23 (`360x780`), cumpliendo el criterio funcional solicitado.

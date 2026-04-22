# Test Case 1 — Compatibilidad Visual en Navegadores Desktop

## Metadata
| Campo | Valor |
|-------|-------|
| Responsable | Santiago ARiel Samitier |
| Fecha Momento 1 (feature/dev-comp-html-avanzados-add-component) | 22/04/2026 |
| Fecha Momento 2 | 22/04/2026 |
| Rama Momento 1.1 | `feature/dev-comp-html-avanzados-add-component` |
| Rama Momento 2 | `feature/dev-comp-html-avanzados-add-component` |
| URL testeada | `http://localhost:3000` |

## Objetivo
Verificar que los componetes se hallan incertado bien en la pagina

## Herramientas utilizadas
- Playwright MCP (`@playwright/mcp`) con viewport emulation
- GitHub Copilot Agent Mode

---

## Prompt para Copilot Agent Mode (Momento 1)

Copiá este prompt en Copilot Agent Mode con Playwright MCP activo:

```
Usando Playwright MCP, necesito testear la compatibilidad visual de mi página
en distintos viewports desktop. La URL es http://localhost:3000

Ejecutá estos pasos en orden:
1.Configurá el viewport en 390x844 (iPhone 14 Pro) y tomá una captura de pantalla completa
3. Verificá que en este viewport:
    - Pruebas de carga: Verificar que los elementos se carguen correctamente en diferentes navegadores (Chrome, Firefox, Safari).
    - Pruebas de funcionalidad: Para <details> + <summary>, asegurar que las secciones se expandan y colapsen correctamente;
   - El iframe mantiene proporciones correctas
2. Configurá el viewport en 412x915 (Samsung Galaxy S23) y repetí los mismos pasos.Y tomá una captura de pantalla completa

3. Configurá el viewport en 820x1180 (iPad Air) y repetí los mismos pasos .Y tomá una captura de pantalla completa

4.  Configurá el viewport en 1280x800 (simulando Firefox) y repetí los mismos pasos .Y tomá una captura de pantalla completa

5. En cada viewport reportá si encontrás algún problema en inframe y su integración

Guardá las capturas en docs/04-testing/capturas/tc-10/momento-1/

```

---

## Resultados momento 1:

### Viewport 390x844 (iPhone 14 Pro)


### Viewport 412x915 (Samsung Galaxy S23)

### Viewport 820x1180 (iPad Air)


### Viewport 1280x800 (Firefox)


## Conclusión


---
### Resultado Momento 1
- [] ✅ PASS — Compatibilidad visual verificada
- [ ] ⚠️ FAIL CON OBSERVACIONES
- [ ] ❌ FAIL


---
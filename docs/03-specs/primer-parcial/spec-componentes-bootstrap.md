# spec-componentes-bootstrap.md

## Planificación previa 

### Rol
Especialista en Componentes Bootstrap

### Componentes Bootstrap avanzados a implementar

**1. Navbar de Bootstrap**
Se eligió porque el sitio de Cine Global requiere una navegación clara y accesible desde cualquier dispositivo. La Navbar de Bootstrap ofrece colapso automático en móviles (hamburger menu), soporte para links activos y es compatible con el sistema de grillas del proyecto.

**2. Modal de Bootstrap**
Se eligió para mostrar información detallada de películas (sinopsis, horarios, trailer) sin abandonar la página principal. Mejora la experiencia de usuario y es un componente estándar en sitios de cine.

### Plan de testing con Playwright MCP

Dispositivos a probar (obligatorios):
- iPhone 14 Pro (iOS Safari)
- Samsung Galaxy S23 (Chrome Android)
- iPad Air (iOS Safari)

Casos a verificar:
- [x] La Navbar se colapsa correctamente en mobile (≤768px)
- [x] El botón hamburger abre y cierra el menú
- [x] El Modal se abre al hacer click en el trigger
- [x] El Modal se cierra con el botón X y con click fuera
- [x] Ambos componentes mantienen la identidad visual del proyecto

### Criterios de aceptación

- [x] Navbar implementada y funcional en desktop y mobile
- [x] Modal implementado y funcional
- [x] Componentes personalizados en `css/bootstrap-overrides.css`
- [x] Sin romper estilos existentes de `styles.css` y `components.css`
- [x] Tests documentados en `test-case-6.md`
- [x] Issues bugs creados con GitHub MCP por cada hallazgo

---

## Evidencia al cierre (completar al terminar)
Las pruebas se ejecutaron en entorno local utilizando VS Code Live Preview, accediendo a la aplicación mediante: http://localhost:3000

### Prompts utilizados con Copilot Agent & Playwright MCP

**Prompt 1: Implementación de Navbar y Modal**
- **Input (Instrucción):** "Tengo que agregar de las bibliotecas de bootstrap los componentes avanzados navbar y Modal sin romper la estructura del index.html."
- **Output de la IA:** Generación de estructura HTML5 compatible con Bootstrap 5.3.3.
- **Estado del DOM:** Inserción exitosa del nodo `<nav class="navbar ...">` en el header y `<div class="modal fade" id="promoModal">` antes del cierre del body. Sin colisiones con el contenedor `.main-container`.

**Prompt 2: Personalización de Identidad Visual**
- **Input (Instrucción):** "Tengo que personalizar componentes en css/bootstrap-overrides.css para mantener la identidad visual. Optimizar componentes para diferentes dispositivos y navegadores."
- **Output de la IA:** Reglas CSS para sobrescribir variables de Bootstrap (`--bs-primary: #c20000`) y estilos para `backdrop-filter`.
- **Resultado técnico:** Clases `.navbar-cineglobal` y `#promoModal` heredan colores de marca validados.

**Prompt 3: Validación Playwright - Navbar Responsive**
- **Input (Instrucción):** "Utilizando Playwright MCP, navegar a http://127.0.0.1:3000, emular iPhone 14 Pro (390x844) y verificar que el botón toggler aparece y el menú colapsa."
- **Tool Calls & Outputs:**
  - `playwright_navigate("http://localhost:3000")` -> `Navigated to http://localhost:3000`
  - `playwright_set_viewport(393, 852)` -> `Viewport set to 393x852` (iPhone 14 Pro)
  - `playwright_screenshot(...)` -> `Saved to docs/04-testing/capturas/tc-6/iphone-14-pro.png`
- **Valores de Assertion:** 
  - Selector `.navbar-toggler`: `isVisible` devolvió `true`.
  - Selector `.navbar-collapse`: El atributo `class` NO contiene la clase `show` (Estado: Cerrado).
- **Estado del DOM:** La lista de navegación (`ul`) tiene altura 0 o propiedad `display: none` aplicada por el motor de Bootstrap.

**Prompt 4: Validación Playwright - Modal Funcional**
- **Input (Instrucción):** "Navegar a http://127.0.0.1:3000, hacer click en el botón que abre el modal y verificar que aparece sin errores en Samsung Galaxy S23 (360x780)."
- **Tool Calls & Outputs:**
  - `playwright_click(".buy-button")` -> `Clicked element .buy-button`
  - `playwright_set_viewport(360, 780)` -> `Viewport set to 360x780`
  - `playwright_screenshot(...)` -> `Saved to docs/04-testing/capturas/tc-6/samsung-galaxy-s23.png`
- **Valores de Assertion:**
  - Selector `#promoModal`: El estado computado de `display` es `block` y `opacity` es `1`.
  - Consola de Navegador: 0 errores detectados en la ejecución de `bootstrap.bundle.min.js`.
- **Estado del DOM:** Se verificó la adición de la clase `.modal-open` al elemento `<body>`.

### Resumen de hallazgos con Playwright MCP
- **Issue #82**: Error de contraste en el toggler de la Navbar (Resuelto).
- **Issue #83**: Desfase de padding en el Modal sobre dispositivos móviles (Resuelto).

## Coordinación con Desarrollador Frontend/Bootstrap
- [x] Confirmé con Alejandro que Bootstrap CDN está instalado correctamente.
- [x] Verifiqué que `bootstrap-overrides.css` está vinculado después de los demás CSS en index.html.
- [x] Revisamos juntos que Navbar y Modal no generan conflictos con el sistema de columnas implementado.
- [x] No se encontraron conflictos visuales al integrar ambas ramas.
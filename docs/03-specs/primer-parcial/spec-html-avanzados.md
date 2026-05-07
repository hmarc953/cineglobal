# Especificación del rol Desarrollador de Componentes HTML Avanzados - Primer Parcial (PP)

---

## 🔹 ANTES DE EMPEZAR (MOMENTO 1 — PLANIFICACIÓN)

---

## 1. Objetivo
El objetivo de esta especificación es planificar la implementación de componentes HTML avanzados que enriquezcan la experiencia de usuario y demuestren el uso de estructuras semánticas y la adaptabilidad del diseño en el proyecto CineGlobal.

## 2. Componentes a implementar

Se planifican implementar los siguientes componentes HTML avanzados:

*   **Componente 1: Paginación Personalizada (`<nav aria-label="Pagination">`)**
    - **Propósito:** Mejorar la navegación entre el listado de películas.
    - **Justificación:** Es un elemento estándar de UX para aplicaciones de contenido extenso.
    - **Criterios de éxito:** Uso de `<nav>` con `aria-label`, diseño responsive y estados visuales claros.

*   **Componente 2: Acordeón para Información Adicional (`<details><summary>`)**
    - **Propósito:** Colapsar los "Términos y condiciones" para optimizar el espacio.
    - **Justificación:** Mejora la jerarquía visual permitiendo lectura bajo demanda.
    - **Criterios de éxito:** Semántica nativa, accesibilidad por teclado y coherencia con el tema oscuro.

*   **Componente 3: Contenido Embebido (`<iframe>`)**
    - **Propósito:** Integrar trailers o mapas externos.
    - **Justificación:** Enriquece la multimedia del sitio sin sobrecarga de assets locales.
    - **Criterios de éxito:** Carga sin errores y responsividad en relación de aspecto (16:9).

## 3. Plan de Testing con Playwright (Planificación Previa)

Utilizaremos Playwright para automatizar las pruebas de los componentes. El plan incluye:
- Pruebas de carga: Verificar que los elementos se carguen correctamente en diferentes navegadores (Chrome, Firefox, Safari).
- Pruebas de funcionalidad: Para `<details>`, asegurar que las secciones se expandan/colapsen correctamente. Para `<iframe>`, verificar carga de contenido externo y su interactividad si aplica.
- Pruebas de accesibilidad: Verificar que los elementos tengan atributos adecuados para lectores de pantalla y navegación por teclado.
- Pruebas de rendimiento: Medir tiempos de carga y uso de recursos.

## 4. Criterios de Aceptación
-   [ ] Los componentes están correctamente integrados en `index.html`.
-   [ ] Se utilizan las etiquetas HTML semánticas adecuadas para cada componente.
-   [ ] Los estilos de los componentes son coherentes con el diseño general de CineGlobal.
-   [ ] Los componentes son completamente responsivos en desktop, tablet y mobile.
-   [ ] Se han realizado pruebas básicas de interacción para verificar su funcionalidad.

---

## 🔹 AL CIERRE (MOMENTO 2 — EVIDENCIA)

---

## 5. Componentes implementados
Se integraron satisfactoriamente las secciones colapsables (`<details>`) y el contenido embebido (`<iframe>`). Se realizó un ciclo de ajuste tras la detección de errores visuales en dispositivos móviles.

## 6. Prompt utilizado para testing (Playwright MCP)

```markdown
Usando Playwright MCP, necesito testear la compatibilidad visual de mi página 
en distintos viewports. La URL es http://localhost:3000

Ejecutá estos pasos en orden:
1. Configurá el viewport en 390x844 (iPhone 14 Pro) y tomá una captura de pantalla completa.
2. Configurá el viewport en 412x915 (Samsung Galaxy S23) y 820x1180 (iPad Air).
3. Reportar carga de componentes, comportamiento de <details> e integración del iframe.

Guardar capturas en: docs/04-testing/capturas/tc-9/momento-2/
```

## 📊 Resultado obtenido (Playwright MCP)
## 7. Hallazgos y Ajustes

- ✔ Iframe responsive en todos los dispositivos
- ❌ Problema inicial detectado: `<details>` no expandía/colapsaba correctamente
- ✔ En ejecución posterior (Momento 2) el comportamiento fue corregido

---

## 🛠️ Ajustes manuales realizados

- Corrección del comportamiento de `<details>` 
- Validación de eventos `<summary>` para asegurar expansión/cierre correcto
- Revalidación del layout responsive sin afectar el iframe


---

## 🔍 Resumen de hallazgos (Playwright MCP)

-  Todos los viewports muestran layout responsive correcto
-  El `<iframe>` mantiene proporción 16:9 sin desbordes
-  `<details>` + `<summary>` presentó fallo inicial en Momento 1
-  El problema fue corregido en Momento 2
-  No se detectan scrolls horizontales ni overflow visual
-  El comportamiento general del layout es consistente en todos los dispositivos
-  La navegación se adapta correctamente sin romper estructura visual

---

**Aclaración de Auditoría de Componentes Avanzados (RC-19):**

**Estado:** Se eliminaron las etiquetas `<details>`, `<summary>` e `<iframe>` por no ser parte del contrato de diseño inicial.

**Justificación:** Se prioriza la fidelidad al mockup entregado por el Coordinador para asegurar la consistencia del producto.
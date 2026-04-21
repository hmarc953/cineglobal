# Spec Frontend - Migración a Bootstrap 5

## 1. Objetivo
Integrar Bootstrap 5 sobre los estilos existentes, manteniendo la identidad visual de CineGlobal y aprovechando el sistema de columnas y utilidades de Bootstrap para mejorar la estructura y responsividad. 

Se utilizará **GitHub Copilot en modo Agente junto con el servidor MCP de Figma** para asistir en la migración y asegurar la fidelidad visual.

> Este documento debe estar commiteado ANTES de modificar cualquier archivo de código.

---

## 2. Versión e instalación de Bootstrap
- **Versión:** Bootstrap 5.3.3
- **Instalación:** CDN jsDelivr

**Snippet para el `<head>`:**
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
```

**Snippet para el cierre de `<body>`:**
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoA6DQD021o6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW" crossorigin="anonymous"></script>
```

**Orden de carga recomendado:**
1. Bootstrap
2. styles.css
3. components.css
4. responsive.css
5. bootstrap-overrides.css

---

## 3. Alcance (archivos a generar o modificar)
- **css/bootstrap-overrides.css** (nuevo)
- **index.html** (modificación)
- **css/components.css** (modificación parcial)
- **css/responsive.css** (modificación parcial)

---

## 4. Secciones que se migran al sistema de columnas
| Sección                | Estado actual         | Migración propuesta                |
|------------------------|----------------------|------------------------------------|
| .movies-list           | Flexbox              | Bootstrap Grid (row/col)           |
| .filters               | Flexbox              | Bootstrap Grid (row/col + forms)   |
| .tabla-cartelera       | Table + CSS propio   | Table con clases Bootstrap         |

---

## 5. Evaluación de conflictos con estilos existentes
- **display: flex/grid** en `.movies-list` y `.filters` puede entrar en conflicto con el grid de Bootstrap. Se eliminarán las reglas de Flexbox/Grid en esas secciones y se migrarán a clases de Bootstrap (`row`, `col`, `g-3`, etc.).
- Se conservarán variables CSS y la paleta de colores para mantener la identidad visual.
- Los componentes que no se migran a Bootstrap seguirán usando el CSS propio.

---

## 6. Criterios de aceptación
- [ ] El código HTML utiliza correctamente las clases de Bootstrap 5.
- [ ] La visualización es fiel al mockup y mantiene la identidad CineGlobal.
- [ ] No hay conflictos visuales entre Bootstrap y los estilos existentes.
- [ ] El archivo bootstrap-overrides.css centraliza los ajustes de branding.
- [ ] El código valida en W3C y pasa las pruebas de QA.

---

## 7. Referencias de diseño
- **Mockup Figma:** https://www.figma.com/proto/Xk7vwqJNdLzY66x0859tXS/Cineglobal?node-id=1-2

---

## 8. Registro de ejecución
- **Herramienta utilizada:** GitHub Copilot en modo Agente + MCP de Figma
- **Prompt utilizado:**
```markdown
Migrar la estructura de index.html y los estilos de CineGlobal a Bootstrap 5.3.3, manteniendo la identidad visual y adaptando .movies-list, .filters y .tabla-cartelera al sistema de columnas de Bootstrap. Usar el siguiente orden de CSS: Bootstrap, styles.css, components.css, responsive.css, bootstrap-overrides.css. Documentar cualquier conflicto y sugerir ajustes en bootstrap-overrides.css.
```
- **Resultado obtenido:** _(Completar tras ejecutar el prompt)_
- **Ajustes manuales realizados:** _(Completar tras revisar el output)_
- **Validaciones realizadas:** _(Completar tras finalizar)_

---

## 9. Integración con el equipo
- Coordinación con: Especialista en Componentes Bootstrap, QA Tester, Coordinador

---

## 10. Trazabilidad
- **Rama:** feature/dev-frontend-bootstrap-migration
- **PR:** _(completar al abrir)_

Repositorio: https://github.com/hmarc953/cineglobal

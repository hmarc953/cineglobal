# Spec Frontend - Migración a Bootstrap 5

---

## 🔹 MOMENTO 1 — ANTES DE IMPLEMENTAR (PLANIFICACIÓN)

## 1. Objetivo

Integrar Bootstrap 5.3.3 sobre los estilos existentes, manteniendo la identidad visual de CineGlobal y aprovechando el sistema de columnas y utilidades de Bootstrap para mejorar la estructura y responsividad.

Se utilizará **GitHub Copilot en modo Agente junto con MCP de Figma** para asistir en la migración y asegurar fidelidad visual.

> Este documento fue commiteado antes de modificar el código.

---

## 2. Versión e instalación de Bootstrap

- **Versión:** Bootstrap 5.3.3  
- **Instalación:** CDN jsDelivr  

### CSS en `<head>`

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/>
```

### JS antes de `</body>`

```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc4s9bIOgUxi8T/jzmVD4WB0b1JxVvl4rSY/4yGiMIHm"
  crossorigin="anonymous"
></script>
```

---

## 3. Orden de carga de estilos

1. Bootstrap  
2. styles.css  
3. components.css  
4. responsive.css  
5. bootstrap-overrides.css  

✔ Bootstrap define la estructura  
✔ CSS propio mantiene la identidad  

---

## 4. Alcance (archivos modificados)

- `index.html`
- `css/components.css`
- `css/responsive.css`
- `css/bootstrap-overrides.css` (nuevo)

---

## 5. Secciones migradas a Bootstrap

| Sección | Estado original | Migración |
|--------|----------------|----------|
| `.filters` | Flexbox | Bootstrap Grid (`row`, `col-auto`) |
| `.movies-list` | Grid | Bootstrap Grid (`row`, `col-*`) |
| `.tabla-cartelera` | CSS propio | `.table` + `.table-responsive` |

---

## 6. Detalle de modificaciones

### index.html
- Filtros migrados a `row g-2 justify-content-center` con `col-auto`
- Cartelera migrada a `row g-4`
- Cards adaptadas a `col-12 col-md-6 col-lg-4`
- Tabla envuelta en `.table-responsive`
- Se mantuvieron clases propias y semántica

### css/bootstrap-overrides.css
- Variables Bootstrap (`--bs-*`) adaptadas al tema CineGlobal
- Personalización de `.btn-primary`, `.form-select`, `.table`
- Compatibilidad con modo oscuro

### css/components.css
- Eliminación/comentado de:
  - `display: flex` en `.filters`
  - `display: grid` en `.movies-list`
- Se mantuvieron estilos visuales

### css/responsive.css
- Eliminación de layouts conflictivos
- Se conservaron breakpoints y ajustes visuales

✔ Todos los cambios documentados inline en código

---

## 7. Decisiones técnicas

✔ Se mantuvo el CSS existente  
✔ Se eliminaron solo conflictos con Bootstrap  
✔ Se centralizó la personalización en `bootstrap-overrides.css`

> No se rehizo el diseño, se integró Bootstrap respetando la identidad visual.

---

## 8. Criterios de aceptación

### Estructura
- [ ] Uso correcto de `row`, `col-*`, `g-*`
- [ ] Filtros migrados
- [ ] Cartelera responsive
- [ ] Tabla responsive

### Visual
- [ ] Identidad CineGlobal intacta
- [ ] Modo oscuro correcto

### Responsive
- [ ] Mobile OK
- [ ] Tablet OK
- [ ] Desktop OK

### Código
- [ ] Sin conflictos CSS
- [ ] Overrides centralizados

---

## 🔹 MOMENTO 2 — AL CERRAR (EVIDENCIA)

## 9. Uso de Copilot + Figma MCP

### Prompt utilizado

```markdown
Migrar la estructura de index.html y los estilos de CineGlobal a Bootstrap 5.3.3, manteniendo la identidad visual y adaptando .movies-list, .filters y .tabla-cartelera al sistema de columnas de Bootstrap.
```

---

## 10. Resultado obtenido

Se logró migrar correctamente:
- Uso de `row` y `col-*`
- Uso de `g-*` para spacing
- Uso de `table-responsive`
- Separación de estilos en `bootstrap-overrides.css`
- La sección de filtros a Bootstrap Grid (`row g-2 justify-content-center`)
- La cartelera a `row g-4` con columnas responsivas (`col-12 col-md-6 col-lg-4`)
- La tabla de horarios a `.table` + `.table-responsive`

La interfaz mantiene la identidad visual original, integrando Bootstrap sin romper estilos previos.

---

## 11. Ajustes manuales realizados

- Ajuste de filtros (`col-auto`)
- Ajuste de grilla de películas
- Limpieza de CSS duplicado
- Eliminación de conflictos en CSS
- Reorganización de overrides
- Ajustes visuales modo oscuro

---

## 12. Validaciones realizadas

- Bootstrap funcionando por CDN
- Orden de CSS correcto
- Layout alineado con mockup
- Sin desbordes horizontales
- Responsive validado en:
  - mobile
  - tablet
  - desktop

---

## 13. Integración con el equipo

- Coordinador / DevOps  
- Especialista Bootstrap  
- QA Tester  

---

## 14. Testing

Documentado en:

`docs/04-testing/test-case-6.md`

Dispositivos:
- iPhone 14 Pro  
- Samsung Galaxy S23  
- iPad Air  

---

## 15. Trazabilidad

- Rama: `feature/dev-frontend-bootstrap-migration`  
- PR: _(completar)_

Repositorio:
https://github.com/hmarc953/cineglobal
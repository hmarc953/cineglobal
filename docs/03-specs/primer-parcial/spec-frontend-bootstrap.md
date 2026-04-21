# 3. Alcance y detalle de modificaciones

**index.html**
- Se migró la estructura de filtros a `<div class="row g-2 justify-content-center">` con controles en `col-auto`.
- Se reemplazó `.movies-list` por `<div class="row g-4">` y cada card por `<div class="col-12 col-md-6 col-lg-4">`.
- Se envolvió la tabla `.tabla-cartelera` en `<div class="table-responsive">`.
- Se conservaron todas las clases propias de componentes y atributos semánticos.

**css/bootstrap-overrides.css**
- Se sobrescribieron variables Bootstrap (`--bs-*`) con los valores del proyecto: fondo, acento, card, fuente.
- Se redefinieron `.btn-primary`, `.form-select` y `.table` para modo oscuro y colores CineGlobal.
- Se agregaron comentarios explicativos por sección.

**css/components.css**
- Se comentaron/eliminaron reglas conflictivas:
	- `display: flex;` en `.filters` (líneas 101, 170, 226) y `display: grid;` en `.movies-list` (línea 201), con comentario `/* Migrado a Bootstrap Grid. */`.
- Se conservaron reglas de color, padding, bordes y tipografía de componentes.

**css/responsive.css**
- Se comentaron reglas de `display: flex;` y `display: grid;` en `.filters` y `.movies-list` para evitar conflicto con Bootstrap Grid.
- Se conservaron breakpoints, márgenes y ajustes de responsividad propios.

Cada cambio está justificado inline en el código fuente para trazabilidad.
# Instalación de Bootstrap 5.3.3

Se utilizó la CDN oficial de jsDelivr con los siguientes enlaces y hashes de integridad (SRI), exactamente como en `index.html`:

```html
<!-- Bootstrap CSS -->
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
	crossorigin="anonymous"
/>

<!-- Bootstrap JS Bundle -->
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-YvpcrYf0tY3lHB60NNkmXc4s9bIOgUxi8T/jzmVD4WB0b1JxVvl4rSY/4yGiMIHm"
	crossorigin="anonymous"
></script>
```

Esto asegura que la referencia de seguridad (SRI) coincida exactamente con la versión cargada en producción.
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
| .movies-list           | display: grid        | Bootstrap Grid (row/col)           |
| .filters               | display: flex        | Bootstrap Grid (row/col + forms)   |
| .tabla-cartelera       | Table + CSS propio   | Table con clases Bootstrap + .table-responsive |

---

## 5. Resolución de conflictos y decisiones sobre estilos existentes

- En `components.css`:
	- Se elimina/comenta `display: grid;` en `.movies-list` y `display: flex;` en `.filters` (líneas 101, 170, 201, 226) para evitar conflicto con Bootstrap Grid. Se justifica inline: `/* Migrado a Bootstrap Grid. */`
	- Se conservan reglas de color, tipografía, bordes y paddings de `.movie-card`, `.header`, `.footer`, etc.
	- Las variables de color y fuente se reutilizan en `bootstrap-overrides.css` para mapear a las variables `--bs-*` de Bootstrap.

- En `responsive.css`:
	- Se elimina/comenta cualquier regla de `display: flex;` o `display: grid;` en `.movies-list` y `.filters`.
	- Se conservan breakpoints, márgenes, paddings y reglas de responsividad específicas de componentes.

- En `bootstrap-overrides.css`:
	- Se migran variables de color, fondo y fuente del proyecto a las variables `--bs-*` de Bootstrap.
	- Se redefinen `.btn-primary`, `.form-select` y `.table` para modo oscuro y colores CineGlobal.

- En `index.html`:
	- Se migran las estructuras de filtros y listado de películas a `row`/`col-*` de Bootstrap, conservando clases propias.
	- Se envuelve la tabla en `.table-responsive` y se mantienen atributos semánticos.

Cada decisión está documentada inline en el código fuente y justificada en este spec.

---


## 6. Criterios de aceptación (Momento 1)

**Estructura y migración**
- [ ] Filtros migrados a Bootstrap Grid (`row`, `col-auto`, `g-2`), sin clases conflictivas.
- [ ] `.movies-list` migrada a `row g-4` y cada card a `col-12 col-md-6 col-lg-4`.
- [ ] `.tabla-cartelera` envuelta en `.table-responsive` y usa clases Bootstrap.

**Visual e identidad**
- [ ] Colores, fondo y tipografía coinciden con la paleta CineGlobal.
- [ ] `.btn-primary`, `.form-select` y `.table` sobrescritos para modo oscuro.

**Responsividad**
- [ ] Layout fluido y correcto en mobile, tablet y desktop.
- [ ] No hay scroll horizontal innecesario ni desbordes.

**Accesibilidad**
- [ ] Se mantienen atributos semánticos (`aria-*`, `data-label`, etc.).
- [ ] Contraste suficiente en textos, botones y fondos.

**Código y documentación**
- [ ] Reglas conflictivas (`display: flex/grid`) eliminadas/comentadas con justificación inline.
- [ ] El spec documenta exactamente los cambios, decisiones y hashes de integridad.

> Todos los checkboxes deben estar sin marcar en Momento 1 (previo a implementación y QA).

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

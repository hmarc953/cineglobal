# Especificación del rol Coordinador / DevOps - CineGlobal (A2)

## 1. Objetivo del rol DevOps dentro del proyecto

En esta segunda entrega, el rol de Coordinador/DevOps se enfoca en mantener el proyecto organizado y asegurar que la entrega A2 sea consistente con la documentación, mockup y pruebas planificadas. También debe garantizar que el equipo siga un flujo de trabajo con ramas feature y Pull Requests bien documentados, y que las revisiones de código cumplan criterios claros.

## 2. Alcance de las tareas DevOps para esta entrega

### 2.1 Configuración del repositorio

- Verificar que el repositorio mantiene la estructura de documentación actualizada:
  - `index.html`
  - `README.md`
  - `plan.md`
  - `docs/01-mockup/actividad-obligatoria-2/`
  - `docs/02-prompts/`
  - `docs/03-specs/actividad-obligatoria-2/`
  - `docs/04-testing/`
- Confirmar que existan los archivos de estilo y documentación necesarios:
  - `css/styles.css`
  - `css/components.css`

### 2.2 Planificación del mockup A2

- Definir y documentar el diseño de la interfaz de la actividad obligatoria 2 en `docs/01-mockup/actividad-obligatoria-2/`.
- Exportar el mockup final en un archivo de imagen `docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png`.
- Incluir en el mockup los siguientes elementos:
  - Navbar responsive y adaptado al branding del proyecto.
  - Sistema de grillas para el listado de películas y la vista detalle.
  - Componentes visuales consistentes con el diseño actual y los requerimientos de A2.
  - Compatibilidad en los tres dispositivos obligatorios (desktop, tablet y móvil).
- Asegurar que el mockup refleje la evolución del proyecto sin perder la identidad visual.

### 2.3 Gestión de estilos y documentación

- Confirmar que los estilos CSS aplicados están documentados y no afectan negativamente la respuesta del diseño.
- Verificar la coherencia entre los archivos de estilo y la interfaz propuesta en el mockup.
- Documentar cualquier ajuste importante en `README.md`, `plan.md` o los test cases correspondientes.

### 2.4 Flujo de trabajo y colaboración

- Mantener `develop` como la rama principal de integración.
- Crear ramas `feature/<descripcion>` para cada cambio funcional o de diseño.
- Usar commits atómicos y mensajes claros, por ejemplo: `feat(layout): agregar grid responsive`.
- Abrir Pull Request hacia `develop` con descripción de los cambios y checklist de revisión.
- Asignar revisores y corregir feedback antes de hacer merge.

## 3. Criterios de aceptación de los code reviews

El proceso de revisión de código debe contemplar los siguientes criterios para ser aprobado:

- [ ] El PR describe claramente qué se cambió, por qué se hizo y qué archivos se afectaron.
- [ ] El diseño implementado coincide con el mockup A2 documentado.
- [ ] La implementación no rompe el diseño existente en desktop, tablet y móvil.
- [ ] Los estilos aplicados están organizados y documentados correctamente.
- [ ] El HTML sigue buenas prácticas semánticas y accesibilidad básica (`alt`, estructuras de título, labels, roles cuando corresponde).
- [ ] No hay errores de sintaxis en HTML ni CSS, y no se producen conflictos visibles entre estilos propios.
- [ ] La documentación del proyecto se actualizó cuando corresponde: `README.md`, `plan.md`, mockup, y test cases.
- [ ] Se verificó la visualización en los tres dispositivos obligatorios y se dejó evidencia en el PR o test case asociado.
- [ ] El PR tiene al menos una aprobación de un compañero y no quedan conversaciones abiertas sin resolver.

## 4. Criterios de aceptación del rol DevOps para A2

El rol DevOps se considera completado cuando se cumplen los siguientes puntos:

- [ ] El repositorio contiene la estructura actualizada con la carpeta `actividad-obligatoria-2` en `docs/03-specs/`.
- [ ] Existe un mockup A2 exportado y documentado en `docs/01-mockup/actividad-obligatoria-2/`.
- [ ] El flujo de trabajo con ramas feature y Pull Requests está documentado y se aplica en la práctica.
- [ ] Se definieron criterios claros de aceptación para los code reviews, incluyendo diseño, responsive, accesibilidad y documentación.
- [ ] Todos los PRs del proyecto tienen al menos 1 revisión aprobada antes del merge
- [ ] Al menos 4 code reviews asistidos con Copilot Agent validando coherencia con el mockup y plan.md actualizado
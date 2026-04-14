# Changelog

## [Unreleased]

## [Release Actividad Obligatoria N°2] - 2026-04-12

### Added
- [feature/responsive-design-add-responsive-styles] Creación del responsive.css y spec-responsive.md.
  PR: [#32](https://github.com/hmarc953/cineglobal/pull/32) - @Santi22-7 (Especialista en Responsive Design)

- [feature/dev-frontend-css-add-styles] Implementación de la capa de estilos CSS del proyecto CineGlobal.
  - Creación de `css/styles.css` con variables en `:root`, reset global, tipografías y layout base.
  - Creación de `css/components.css` con estilos de componentes reutilizables: header, filtros, cards de películas y botones.
  - Incorporación de estados interactivos `:hover` y `:focus-visible` para mejorar la experiencia de usuario y accesibilidad.
  PR: [#44](https://github.com/hmarc953/cineglobal/pull/44) - @abartomioli (Desarrollador Frontend/CSS)

- [feature/dev-frontend-css-add-styles] Documentación del proceso en `spec-frontend.md`.
  - Uso de Figma MCP con Copilot Agent para generación inicial de estilos.
  - Inclusión del prompt utilizado.
  - Registro de resultados obtenidos y ajustes manuales posteriores.
  Archivo: `docs/03-specs/actividad-obligatoria-2/spec-frontend.md`

- [feature/doc-qa-tester-add-test-cases] Ejecucion y documentacion de testing.  
  PR: [#54](https://github.com/hmarc953/cineglobal/pull/54) - @hmarc953 (Documentador / QA Tester)

### Changed
- Mejora de la estructura visual del sitio alineada al mockup de Figma.
- Ajuste de espaciados, tipografías y jerarquía visual en componentes.
- Optimización del layout base para facilitar integración futura con responsive design.


### Fixed
- Corrección de inconsistencias visuales entre componentes generados automáticamente.
- Ajuste manual de estilos para lograr mayor coherencia con el diseño original.
- Resolución de bugs de accesibilidad y semántica reportados por QA:
  - [#34] Layout de cards en desktop: se alineó la estructura HTML con las clases del CSS (.movies-list, .movie-card, etc.) y se eliminó contenido duplicado.
  - [#35] Footer sin links visibles: se agregaron enlaces reales y accesibles en el pie de página.
  - [#36] Contenido fuera de landmarks: todo el contenido principal fue reubicado dentro de <main> y landmarks semánticos.
  - [#37] Articles sin heading: cada <article> de película ahora incluye un <h3> semántico.
  - [#38] Section sin heading: todas las secciones principales tienen su heading correspondiente.
  - [#39] Uso de table border obsoleto: se eliminó el atributo border en la tabla y se aplicó el borde desde CSS.
  - [#40] Tabla de horarios sin caption: se agregó un <caption> descriptivo a la tabla de funciones.
  Realizado por @abartomioli  
- [feature/Correcciones-pedidas-tester] Hacer correciones pedidas por el tester.
  PR: [#55](https://github.com/hmarc953/cineglobal/pull/55) - @Santi22-7 (Especialista en Responsive Design)
### Notes
- Se deja la base preparada para integración con el Especialista en Responsive Design.
- Se recomienda validación visual en distintos dispositivos y navegadores.

---

## [Release Actividad Obligatoria N°1] - 2026-03-25

### Added
- [feature/devops-project-setup] Estructura inicial del proyecto.  
  PR: [#1](https://github.com/hmarc953/cineglobal/pull/1) - @hmarc953 (Coordinador / DevOps)

- [feature/Especialista-en-IA-y-Prompt-Engineering] Implementación del marco metodológico SDD.  
  PR: [#8](https://github.com/hmarc953/cineglobal/pull/8) - @abartomioli (Especialista en IA / Prompt Engineering)

- [feature/Especialista-en-IA-y-Prompt-Engineering] Implementación del sistema de trazabilidad de Inteligencia Artificial.
  PR: [#9](https://github.com/hmarc953/cineglobal/pull/9) - @abartomioli (Especialista en IA / Prompt Engineering)

- [feature/doc-ux-add-readme-and-mockup] Creación del mockup, README.md y spec-ux.md.
  PR: [#6](https://github.com/hmarc953/cineglobal/pull/6) - @Santi22-7 (Documentador / Diseñador UX)

### Changed
- [feature/frontend-add-html-structure] Estructura HTML5 básica.  
  PR: [#16](https://github.com/hmarc953/cineglobal/pull/16#issue-4117167796) - @9919-Mili (Especialista en Desarrollador Frontend)

- [feature/Especialista-en-IA-y-Prompt-Engineering] Se actualizaron los 5 prompts, más el comparativa-modelos.md y el index de prompts.md.
  PR: [#19](https://github.com/hmarc953/cineglobal/pull/19) - @abartomioli (Especialista en IA / Prompt Engineering)

### Fixed
- [feature/devops-fix-project-structure-and-changelog] Corrección de la estructura del proyecto y el changelog.
  PR: [#21](https://github.com/hmarc953/cineglobal/pull/21) - @hmarc953 (Coordinador / DevOps)

- [feature/devops-fix-template] Corrección del release-template.
  PR: [#22](https://github.com/hmarc953/cineglobal/pull/22) - @hmarc953 (Coordinador / DevOps)

- [fix/correcciones-actividad-obligatoria-1] Correccion de release/actividad-obligatoria-1
  PR: [#27](https://github.com/hmarc953/cineglobal/pull/27#issue-4214600472) - @9919-Mili (Coodinador / DevOps)

- [fix/correcciones-parte-dos-actividad-obligatoria-1] Correccion de release/actividad-obligatoria-1
  PR: [#28](https://github.com/hmarc953/cineglobal/pull/28#issue-4219373939) - @9919-Mili (Coodinador / DevOps)

- [release/actividad-obligatoria-1] Corrección de `<form>` duplicado en `index.html`  
  Commit: [e1169e8](https://github.com/hmarc953/cineglobal/commit/e1169e8e04b0e04e0e85571663fa368e1d468d7f) — @9919-Mili (Coordinador / DevOps)

- [release/actividad-obligatoria-1] Corrección de descripciones en índice `prompts.md`  
  Commit: [4609c3a](https://github.com/hmarc953/cineglobal/commit/4609c3a4b0e04e0e85571663fa368e1d468d7f) — @9919-Mili (Coordinador / DevOps)

- [release/actividad-obligatoria-1] Actualización de `prompts-2.md`  
  Commit: [f80b861](https://github.com/hmarc953/cineglobal/commit/f80b861) — @9919-Mili (Coordinador / DevOps)

- [release/actividad-obligatoria-1] Actualización de `prompts-3.md`  
  Commit: [fe024d7](https://github.com/hmarc953/cineglobal/commit/fe024d7) — @9919-Mili (Coordinador / DevOps)

- [release/actividad-obligatoria-1] Actualización de `prompts-4.md`  
  Commit: [9e728f0](https://github.com/hmarc953/cineglobal/commit/9e728f0) — @9919-Mili (Coordinador / DevOps)

- [release/actividad-obligatoria-1] Actualización de `prompts-5.md`  
  Commit: [8798ab5](https://github.com/hmarc953/cineglobal/commit/8798ab5) — @9919-Mili (Coordinador / DevOps)

- [fix/changelog-retroactivo-actividad-obligatoria-1] Actualización de changelog.md y prompts.md
  PR: [#29](https://github.com/hmarc953/cineglobal/pull/29/#issue-4226178866) — @9919-Mili (Coordinador / DevOps)

- [fix/changelog-retroactivo-actividad-obligatoria-1] Correcion PR #27 en archivo changelog.md 
  PR: [#30](https://github.com/hmarc953/cineglobal/pull/30#issue-4228530659) — @9919-Mili (Coordinador / DevOps)

  


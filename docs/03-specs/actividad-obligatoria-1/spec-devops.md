# Especificación del rol Coordinador / DevOps - CineGlobal

## 1. Objetivo del rol DevOps dentro del proyecto

El Coordinador/DevOps garantiza que el proyecto `CineGlobal` tenga una base de trabajo ordenada y reproducible para todo el equipo. En esta primera entrega, el rol se enfoca en estructurar el repositorio, definir el flujo de trabajo con ramas y PR, y proteger la calidad inicial con controles simples.

## 2. Alcance de las tareas DevOps para esta primera entrega

### 2.1 Configuración del repositorio

- Confirmar que el repositorio contiene los archivos básicos del proyecto y la documentación inicial:
  - `index.html`
  - `README.md`
  - `plan.md`
  - `docs/01-mockup/`
  - `docs/02-prompts/`
  - `docs/03-specs/`

### 2.2 Ramas y protección de ramas

- Definir la rama principal de desarrollo (`develop`) y la rama de integración final (`master`).
- Activar protección de ramas en `develop` y `master` para exigir PR y revisión antes de merge.
- Habilitar reglas mínimas como PR aprobado por al menos un revisor 

### 2.3 Invitación de colaboradores

- Invitar a los miembros del equipo como colaboradores con permisos apropiados (push a ramas de feature, PR a develop).

### 2.4 Estructura inicial del proyecto y generación de documentación

- Confirmar que los artefactos iniciales existen y están completos:
  - `plan.md` con objetivo, alcance, actores, RF, reglas y futuras iteraciones.
  - `docs/03-specs/spec-devops.md` como documentación específica de rol.
  - `README.md` con cómo ejecutar el proyecto localmente.
- Validar que `index.html` esté presente para que cualquier persona pueda abrirlo en el navegador.

## 3. Flujo de trabajo basado en ramas feature y Pull Requests

1. Crear rama de feature desde `develop` nombrada `feature/<descripcion>` (por ejemplo, `feature/ui-home`).
2. Implementar cambios en la rama feature.
3. Hacer commits atómicos con mensajes claros (`feat(...)`, `fix(...)`, `docs(...)`).
4. Abrir Pull Request hacia `develop` con descripción de cambios y checklist de revisión.
5. Revisión de al menos un compañero y corrección de feedback.
6. Merge a `develop` cuando PR aprobado.

## 4. Criterios de aceptación de tareas DevOps

El rol DevOps se considera completado en esta primera entrega cuando se cumplen todos los siguientes criterios:

- [x] El repositorio contiene la estructura inicial con `index.html`, `README.md`, `plan.md`, y directorios `docs/01-mockup/`, `docs/02-prompts/`, `docs/03-specs/`.
- [x] Existe `develop` como rama de trabajo.
- [x] Se configuraron protecciones básicas de rama en GitHub para `develop` y `master`.
- [x] Se generó el documento `plan.md` con especificación maestra (objetivo, alcance, RF, reglas, iteraciones).
- [x] Se generó `docs/03-specs/spec-devops.md` con la especificación del rol DevOps.
- [x] Se definió un flujo de trabajo basado en ramas feature + Pull Requests documentado en este mismo archivo.

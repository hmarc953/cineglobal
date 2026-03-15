# Prompts usados para setup inicial de CineGlobal

Este archivo recopila todos los prompts pedidos al asistente para configurar el proyecto.

1. En la rama activa creame los siguientes archivos y carpetas:
   docs/
   docs/01-mockup/
   docs/02-prompts/
   docs/03-specs/
   index.html
   README.md
   plan.md
   changelog.md

2. Hace un commit con el mensaje: feat(setup): Initial project structure. Luego push de la rama feature/devops-project-setup

3. Generá en el archivo plan.md en la raíz del repositorio para el proyecto CineGlobal lo siguiente: 
El proyecto consiste en una aplicación web que permite visualizar películas disponibles en distintos cines, junto con información básica y horarios de funciones, similar a un agregador de cartelera de cine.

Este archivo debe funcionar como la especificación maestra del proyecto y servir como referencia para los code reviews y para los documentos individuales de cada rol en docs/specs/.

El documento debe estar escrito en Markdown claro y estructurado e incluir:

- Objetivo del proyecto
- Alcance de esta primera entrega
- Actores o usuarios del sistema
- Requerimientos funcionales del sistema
- Reglas o supuestos del sistema
- Funcionalidades previstas para futuras iteraciones

Los requerimientos funcionales deben estar enumerados (RF-01, RF-02, etc.) y describir claramente qué debe poder hacer el sistema.

4. Correji todos las palabras con tilde porque no se visualiza la tilde. Guarda el archivo en UTF-8

7. Generá el archivo docs/03-specs/spec-devops.md para el proyecto CineGlobal. Este documento debe describir la especificación del rol Coordinador / DevOps dentro del proyecto.

El proyecto CineGlobal es una aplicación web frontend que permite visualizar películas y horarios de distintos cines utilizando datos estáticos (sin backend ni base de datos).

El objetivo del documento es describir qué tareas realizará el rol DevOps en esta primera entrega del proyecto.

El documento debe incluir:

- Objetivo del rol DevOps dentro del proyecto
- Alcance de las tareas que realizará (configuración del repositorio, ramas, protección de ramas, invitación de colaboradores, estructura inicial del proyecto, generación de plan.md)
- Flujo de trabajo basado en ramas feature y Pull Requests
- Criterios de aceptación que indiquen cuándo la tarea DevOps se considera completada
- El documento debe estar escrito en Markdown claro y profesional, adecuado para un proyecto académico de introducción al desarrollo web.

8. Genera el archivo docs/02-prompts/prompt-spec-devops.md. En este archivo van a ir todos los prompts que utilice para el setup inicial del proyecto. Agrega todos los prompts que utilice.

9. Hace un commit con el mensaje: feat(setup): plan.md, specs-devops.md and prompt-specs-devops.md. Luego push de la rama feature/devops-project-setup

10. Generá dos archivos de plantilla para Pull Requests en el proyecto CineGlobal dentro de la carpeta .github/PULL_REQUEST_TEMPLATE/:

1. feature-template.md
2. release-template.md

El proyecto es académico y utiliza ramas feature hacia develop, y una rama release final hacia master.

La plantilla feature-template.md debe servir para PRs individuales del equipo y debe incluir:
- descripción breve de los cambios
- rol del integrante
- archivos modificados
- referencia al spec correspondiente en docs/03-specs/
- referencia a la actualización en changelog.md
- checklist de validación antes del merge

La plantilla release-template.md debe servir para la entrega final desde release/actividad-obligatoria-1 hacia master e incluir:
- resumen general de la entrega
- features integradas
- documentación incluida
- enlace a GitHub Pages
- checklist final de validación

Ambas plantillas deben estar redactadas en español, en Markdown, con formato claro y profesional para un proyecto universitario.

11. Hace un commit con el mensaje: feat(setup): Update changelog.md. Luego push de la rama feature/devops-project-setup

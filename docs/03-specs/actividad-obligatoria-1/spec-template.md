# Spec [NOMBRE-DEL-ROL]: [NOMBRE-DE-LA-TAREA]

**Proyecto:** CineGlobal  
**Integrante:** [Nombre del Alumno]  
**Rol:** [Ej: Desarrollador Frontend / Diseñador UX / etc.]  

## 1. Relación con el Plan Maestro
*Indica qué puntos del `plan.md` redactado por el coordinador se resuelven con esta especificación.*
- **Requerimientos Funcionales:** [Ej: RF-01 y RF-03]
- **Alcance Relacionado:** [Ej: Estructura de la página de listado y vista de detalle]

## 2. Descripción de la Tarea
*Breve explicación de qué vas a construir o documentar.*
[Ej: Creación de la estructura semántica en HTML5 para la cartelera de cines de Buenos Aires, incluyendo secciones para filtros y tarjetas de películas.]

## 3. Especificaciones Técnicas (Contrato)
*Define las reglas que la IA y tú deben seguir para que el código sea correcto.*
- **Estructura HTML:** [Ej: Uso de <header>, <main> con id="películas", <article> para cada film y <footer>]
- **Tecnologías:** [Ej: HTML5 puro, CSS3 (Flexbox/Grid), JavaScript ES6]
- **Componentes Requeridos:**
  - [Elemento 1: Ej. Selector de Barrios de CABA]
  - [Elemento 2: Ej. Contenedor de horarios con botones]

## 4. Estrategia de IA (Prompting)
*Define cómo vas a pedirle ayuda a la IA para esta tarea específica.*
- **Modelo a utilizar:** [Ej: GitHub Copilot / Claude 3.5 / Gemini]
- **Contexto a incluir:** [Ej: Se adjuntará el contenido de plan.md y esta Spec al prompt inicial]
- **Técnica de Prompting:** [Ej: Chain-of-Thought o Few-shot]

## 5. Criterios de Aceptación (Definición de Hecho)
*¿Cómo validaremos que el trabajo está bien?*
- [ ] El código es semánticamente correcto (valida en W3C).
- [ ] Los nombres de las clases CSS coinciden con el manual de estilo.
- [ ] Los datos de los cines corresponden a los barrios de Buenos Aires definidos.
- [ ] La navegación entre la lista y el detalle funciona según el RF-04.

---
**Validación del Especialista en IA:** [Pendiente / Aprobado]


### Justificación del Diseño del Template:
- **Trazabilidad:** La sección de "Relación con el Plan Maestro" obliga a cada integrante a no desviarse de los objetivos del Coordinador.
- **Enfoque en IA:** Se incluye una sección de "Estrategia de IA" para que el equipo reflexione sobre qué modelo y técnica (Chain-of-thought, etc.) es mejor para su tarea antes de pedir el código.
- **Criterios de Aceptación:** Actúan como una lista de verificación (checklist) para el proceso de Code Review, asegurando que nada se dé por terminado si no cumple los requisitos técnicos.
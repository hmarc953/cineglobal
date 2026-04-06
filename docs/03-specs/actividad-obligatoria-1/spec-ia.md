# Spec Especialista en IA y Prompt Engineering: Gestión de Metodología y Calidad de Prompts

**Proyecto:** CineGlobal  
**Integrante:** Alejandro Bartomioli  
**Rol:** Especialista en IA y Prompt Engineering (3.4)

## 1. Relación con el Plan Maestro
Esta especificación asegura el cumplimiento transversal de todos los **Requerimientos Funcionales (RF-01 a RF-05)** mediante el uso estandarizado de IA y la aplicación de la metodología **SDD** definida para CineGlobal.

## 2. Descripción de la Tarea
Mi tarea consiste en liderar la implementación de la metodología SDD, definir los estándares de interacción con modelos de lenguaje (LLMs) y auditar que el código generado por el equipo sea consistente con el `plan.md`.

## 3. Etapas del Rol (Cronograma de Trabajo)

### Etapa 1: Configuración Inicial (PR de Inicio)
* **Investigación y Definición:** Redacción del documento `sdd-decisions.md` explicando el marco metodológico.
* **Estandarización:** Creación del `spec-template.md` para que todos los integrantes sigan una estructura técnica uniforme.
* **Asesoramiento:** Configuración de las herramientas (GitHub Copilot Agent) para el equipo.

### Etapa 2: Documentación y Evaluación (PR de Cierre)
* **Recopilación:** Centralizar los 5 prompts clave del equipo en `docs/02-prompts/`.
* **Análisis Comparativo:** Realizar una comparativa entre dos modelos (ej. Gemini vs GPT-4) ejecutando la misma tarea de CineGlobal.
* **Validación Final:** Verificación de que el código HTML final respeta las specs iniciales.

## 4. Estrategia de IA
- **Modelos:** Gemini (para arquitectura), Claude/GPT-4 (para comparativas).
- **Técnicas:** *Role Prompting* (actuando como experto en QA) y *Chain-of-Thought* para la investigación de SDD.

## 5. Criterios de Aceptación

### Criterios para el PR Inicial (Hito 1)
- [x] El archivo `sdd-decisions.md` está presente y explica por qué usar SDD en CineGlobal.
- [x] Existe un template de especificación disponible para el resto de los roles.
- [x] Este archivo (`spec-ia.md`) ha sido commiteado antes de la fase de codificación.

### Criterios para el PR Final (Hito 2)
- [x] Se presentan 5 archivos de prompts documentados con capturas de pantalla.
- [x] El archivo `comparativa-modelos.md` incluye un análisis técnico de las diferencias de respuesta entre dos IAs.
- [x] Cada prompt documentado indica claramente el método de prompting utilizado (Few-shot, Zero-shot, etc.).

---
**Firma:** Especialista en IA y Prompt Engineering
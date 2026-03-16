# Metodología SDD: Spec-Driven Development - Proyecto CineGlobal

**Proyecto:** CineGlobal (Cartelera de Cines y Eventos en Buenos Aires)  
**Responsable:** Especialista en IA y Prompt Engineering  
**Fecha:** Marzo 2026  

## 1. ¿Qué es SDD (Spec-Driven Development)?
El Desarrollo Basado en Especificaciones (SDD) es un paradigma de ingeniería de software donde la documentación técnica detallada precede a la implementación del código. En este modelo, las especificaciones (specs) no son solo guías, sino contratos técnicos vinculantes. 

En el ecosistema de **CineGlobal**, donde utilizamos Inteligencia Artificial para acelerar el desarrollo, la metodología SDD transforma las especificaciones en el contexto esencial para que la IA actúe como un desarrollador senior, reduciendo la ambigüedad y asegurando que cada componente sea consistente.

## 2. ¿Por qué usar SDD en CineGlobal?
Implementamos esta metodología por tres razones estratégicas:
* **Precisión Geográfica:** Evitamos que la IA genere datos genéricos ajenos a la cartelera de Buenos Aires.
* **Alineación de Roles:** El Frontend utiliza la semántica exacta definida previamente.
* **Validación Estricta:** Es más eficiente corregir la lógica en Markdown que en código final.

## 3. Implementación en esta Entrega
Para la Actividad Obligatoria N°1, el flujo de SDD se estructura en:
1. **Definición:** `plan.md` establece el alcance.
2. **Especificación:** Cada integrante redacta su `spec-[rol].md`.
3. **Refinado:** Crítica técnica con IA.
4. **Generación:** Código basado estrictamente en la Spec.

## 4. Template de spec-[rol].md adoptado
Para estandarizar el trabajo, el equipo utilizará el siguiente formato ubicado en `spec-template.md`.

### Estructura del Template:
1. **Relación con el Plan Maestro:** Referencia a los RF del coordinador.
2. **Descripción de la Tarea:** Alcance técnico.
3. **Especificaciones Técnicas (Contrato):** Etiquetas HTML5, clases y lógica.
4. **Estrategia de IA (Prompting):** Modelo y técnica a utilizar.
5. **Criterios de Aceptación:** Checklist de validación.

**Justificación:**
1. **Mapeo de Requerimientos:** Evita funciones fuera de alcance.
2. **Contratos Técnicos:** La IA genera código compatible entre roles.
3. **Control de Calidad:** Facilita la auditoría de prompts.

### Justificación del Diseño:
- **Trazabilidad:** Asegura que nadie programe algo que no esté en el `plan.md`.
- **Contexto para IA:** Obliga al integrante a definir el "cómo" antes de pedir el código, mejorando la calidad de la respuesta de la IA.
- **Uniformidad:** Facilita la revisión del Especialista en IA (Rol 3.4).

La presente metodología SDD se integra con el plan.md (RF-01 al RF-05) asegurando que cada componente generado por IA mantenga trazabilidad con los requerimientos definidos por el rol de DevOps.


## 5. Decisiones Técnicas del Especialista en IA
- **Decisión 1: Uso de "System Prompts" basados en el plan.md**
    - **Motivación:** Garantiza que la IA mantenga el contexto de "CineGlobal Buenos Aires" en cada interacción.
- **Decisión 2: Validación Cruzada entre Modelos**
    - **Motivación:** Comparar respuestas de GPT-4o y Claude 3.5 para obtener mejores prácticas en accesibilidad.
- **Decisión 3: Estandarización de Archivos en Markdown**
    - **Motivación:** Facilita la trazabilidad en los Pull Requests de GitHub.

## 6. Verificación de Entorno de Desarrollo
Como Especialista en IA, he auditado y confirmado que todos los integrantes del equipo CineGlobal tienen instaladas y operativas las siguientes extensiones en VS Code:
- [x] **GitHub Copilot / Copilot Chat** (para asistencia en generación de código).
- [x] **GitHub Pull Requests and Issues** (para la gestión de revisiones de código).

---
*Este documento constituye la base metodológica para el desarrollo de CineGlobal.*
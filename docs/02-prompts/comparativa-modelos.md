# Comparativa de Modelos de IA — CineGlobal

## 1. Contexto de la Tarea

Se realizó una comparativa técnica entre los modelos de IA utilizados por el equipo durante el desarrollo de CineGlobal, evaluando su desempeño en tareas reales del proyecto: generación de estructura semántica HTML5, redacción de specs y documentación técnica, y depuración de errores. La tarea base para la comparación fue la **generación de la estructura HTML5** del `index.html` a partir del `plan.md`.

---

## 2. Matriz Comparativa (Experiencia real del equipo)

| Criterio Técnico | GitHub Copilot (Claude 3.5) | Gemini 1.5 Pro | ChatGPT (GPT-4o) |
| :--- | :--- | :--- | :--- |
| **Integración IDE** | Nativa en VS Code (Excelente) | N/A (Manual) | N/A (Manual) |
| **Contexto del proyecto** | Alto — lee todos los archivos del repo | Medio — requiere copiar/pegar | Medio — requiere copiar/pegar |
| **Precisión HTML semántico** | Buena | Muy alta | Excelente |
| **Documentación Markdown** | Excelente | Buena | Buena |
| **Fidelidad a instrucciones** | Muy alta (respeta restricciones del prompt) | Alta con few-shot | Alta con zero-shot estructurado |
| **Velocidad** | Instantánea (inline) | Rápida | Rápida |
| **Correcciones manuales necesarias** | Pocas (ajustes de redacción) | Pocas (semántica, accesibilidad) | Mínimas en code review |

---

## 3. Análisis de Resultados (Basado en nuestra implementación)

### GitHub Copilot — claude-3.5-sonnet (Anthropic)

Fue la herramienta más utilizada para el trabajo del día a día. Su gran ventaja es que ya "conoce" la estructura de archivos del repositorio, por lo que genera código y documentación que encajan perfectamente sin configuración extra. Al pasarle el `plan.md` como contexto, produjo specs y documentación técnica alineadas con los requerimientos funcionales reales del proyecto, respetando restricciones explícitas del prompt como "no justifiques con lo que se hará".

**Limitación:** Requiere más iteraciones para ajustar detalles de documentación. Menos fluido para generar HTML puro que para tareas de redacción técnica.

### Gemini 1.5 Pro (Google)

Se utilizó principalmente en la **etapa de diseño y planificación**. Su ventana de contexto extendida permitió subir el `plan.md` completo y pedirle sugerencias de layout, estructura de secciones y jerarquía visual. También generó la estructura HTML5 del `index.html` en una sola respuesta con buena comprensión del tema. Sin embargo, omitió el atributo `lang="es"` y los `<label>` del formulario no quedaron correctamente vinculados con `for` en el primer intento.

**Limitación:** Al no estar integrado en el IDE, requiere copiar y pegar el contexto manualmente en cada sesión, lo que ralentiza el flujo de trabajo.

### ChatGPT — GPT-4o (OpenAI)

Se utilizó principalmente para **code reviews y depuración de errores**. Su capacidad para seguir plantillas de output estructuradas con precisión lo hizo ideal para el prompt de code review de la PR #16 (ver `prompts-4.md`). Cuando el código presentaba errores, pegar el fragmento en ChatGPT devolvió soluciones rápidas con explicaciones paso a paso, lo que facilitó el aprendizaje del equipo.

**Limitación:** Sin integración nativa al IDE, el flujo de copiar/pegar código puede generar pérdida de contexto en archivos grandes.

---

## 4. Conclusión Fundada

**¿Cuál fue más útil?** **GitHub Copilot** por su integración directa en el flujo de trabajo dentro de VS Code, que elimina la fricción de copiar contexto manualmente.

**Recomendación por tipo de tarea:**

- **Generación de código en contexto del proyecto:** **GitHub Copilot**. Es imbatible al escribir código que debe respetar variables, estructura de archivos y estilos ya existentes en CineGlobal.
- **Redacción de specs, documentación y planificación:** **Gemini 1.5 Pro**. Su ventana de contexto extendida es ideal para procesar el `plan.md` completo y convertir ideas en texto técnico estructurado.
- **Code review y resolución de bugs críticos:** **ChatGPT (GPT-4o)**. Su capacidad para seguir plantillas de output y explicar *por qué* falla algo lo hace el más valioso para revisión de código y depuración.

---

*Elaborado por: Alejandro Bartomioli — Especialista en IA y Prompt Engineering*
*Fecha: Marzo 2026*
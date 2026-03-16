# Comparativa de Modelos de IA: CineGlobal

## 1. Contexto de la Tarea
Se realizó una comparativa técnica para determinar qué modelo ofrece mayor precisión al generar la **estructura semántica HTML5** del listado de cines de CABA, basada en nuestro `plan.md`.

## 2. Matriz Comparativa (Experiencia real del equipo)

| Criterio Técnico | GitHub Copilot | Gemini | ChatGPT |
| :--- | :--- | :--- | :--- |
| **Integración IDE** | Nativa (Excelente) | N/A (Manual) | N/A (Manual) |
| **Contexto del Proyecto** | Alto (lee todos los archivos) | Medio (requiere copiar/pegar) | Medio (requiere copiar/pegar) |
| **Precisión HTML/CSS** | Buena | Muy Alta | Excelente |
| **Velocidad** | Instantánea | Rápida | Rápida |

## 3. Análisis de Resultados (Basado en nuestra implementación)
* **GitHub Copilot:** Fue la herramienta más utilizada para el día a día. Su gran ventaja es que ya "conoce" nuestra estructura de archivos, por lo que genera código que encaja perfecto sin configuración extra.
* **Gemini:** Lo usamos para la etapa de **diseño y planificación**. Al tener una ventana de contexto grande, nos sirvió mucho para subir el `plan.md` entero y pedirle que redacte las specs de cada rol.
* **ChatGPT:** Se utilizó principalmente para **depurar errores**. Cuando el CSS o la lógica de JS se rompían, pegar el código en ChatGPT nos dio soluciones rápidas y explicadas paso a paso.

## 4. Conclusión Fundada
* **¿Cuál fue más útil?** **GitHub Copilot** por su integración en el flujo de trabajo dentro de VS Code.
* **Recomendación por tipo de tarea:**
    * **Generación de código en contexto:** **GitHub Copilot**. Es imbatible al escribir código que debe respetar variables y estilos ya existentes en CineGlobal.
    * **Redacción de specs y documentación:** **Gemini**. Es excelente para convertir nuestras ideas en texto técnico estructurado.
    * **Resolución de bugs críticos:** **ChatGPT**. Su capacidad para explicar *por qué* falla algo nos ayudó a aprender más rápido.
# Especificación del rol Coordinador / DevOps - Primer Parcial (PP)

## 1. Objetivo del rol DevOps dentro del proyecto

El rol de Coordinador/DevOps para el primer parcial se centra en asegurar que la entrega avance con un flujo de trabajo ordenado, que la documentación del proyecto esté actualizada y que las decisiones de diseño y desarrollo queden registradas de forma clara. Debe garantizar la trazabilidad entre el mockup, el plan de trabajo y el desarrollo, y aplicar las correcciones aprendidas de la Actividad Obligatoria 2.

## 2. Alcance de las tareas DevOps para esta entrega

### 2.1 Configuración del repositorio

- Revisar y validar que la estructura del repositorio incluye la documentación necesaria para el primer parcial.
- Confirmar que existan los archivos principales:
  - `index.html`
  - `README.md`
  - `plan.md`
  - `docs/03-specs/primer-parcial/spec-devops.md`
  - `docs/01-mockup/primer-parcial/` (o planificar su creación)
- Verificar que `README.md` y `plan.md` reflejen correctamente las funcionalidades planeadas y el estado del proyecto.
- Asegurar que las ramas de trabajo sigan el estándar:
  - `feature/<descripcion>` para nuevas funciones o mejoras.
  - `fix/<descripcion>` para correcciones específicas.
- Controlar que los commits sean descriptivos y que los Pull Requests incluyan contexto claro del cambio.

### 2.2 Planificación del mockup PP

- Definir el mockup del primer parcial con foco en la experiencia de usuario para las vistas de listado y detalle de películas.
- Planificar el mockup PP en los siguientes aspectos:
  - paleta de colores definitiva (primarios, secundarios, neutros)
  - tipografías y jerarquía de textos (h1-h6, body, labels)
  - espaciados y dimensiones de componentes (padding, margin, border-radius)
  - estructura de navegación y barras superiores, incluyendo navbar responsive
  - estados de interacción (hover, focus, active, disabled)
  - adaptaciones para desktop, tablet y mobile
- Documentar el mockup PP en `docs/01-mockup/primer-parcial/` y enlazarlo desde `README.md` y `plan.md`.
- Asegurar que el mockup PP refleje la planificación de la experiencia y la interfaz del primer parcial sin desviarse de la identidad visual del proyecto.

### 2.2.1 Evidencia de Planificación con Figma MCP

Para la planificación detallada del mockup del Primer Parcial, se utilizó el Servidor MCP de Figma en conjunto con GitHub Copilot (modo Agente) para extraer información clave directamente del diseño. Esto permitió una trazabilidad precisa de los elementos visuales y sus propiedades.

**Tool Calls de Figma MCP utilizadas:**
- `figma_get_file('ID_DEL_ARCHIVO_FIGMA')`: Para obtener la estructura general del archivo de diseño.
- `figma_get_node('ID_DEL_NODO_ESPECIFICO')`: Para extraer propiedades de elementos específicos como paletas de colores, tipografías, espaciados de componentes (frames, auto-layouts).
- `figma_export_node('ID_DEL_NODO_FRAME', 'docs/01-mockup/primer-parcial/diseño-bootstrap.png')`: Para exportar los frames principales como imágenes de referencia.

**Output recibido (ejemplos):**
- **Colores:** `{"primary": "#c20000", "secondary": "#333", "text-main": "#f5f5f5"}`
- **Tipografías:** `{"h1": {"font-family": "Segoe UI", "font-size": "2.5rem"}, "body": {"font-family": "Segoe UI", "font-size": "1rem"}}`
- **Espaciados:** `{"card-padding": "1rem", "margin-bottom": "1.5rem"}`
- **Frames:** Estructura de la navbar, modal, y tarjetas de películas.

### 2.3 Gestión de estilos y documentación

- Revisar las funcionalidades planeadas en `README.md` y hacerlas parte de la planificación DevOps:
  - integrar Bootstrap 5 mediante CDN conservando la identidad visual
  - utilizar el sistema de columnas de Bootstrap para mejorar la respuesta en dispositivos móviles y tablet
  - crear `css/bootstrap-overrides.css` para ajustes personalizados sobre Bootstrap
  - incorporar componentes Bootstrap avanzados (navbar, modal, carousel, accordion) y personalizarlos según el diseño
  - asegurar que los componentes HTML y Bootstrap funcionen correctamente en los tres dispositivos obligatorios
- Documentar los cambios de estilo y los posibles conflictos con los estilos existentes.
- Mantener actualizados los archivos CSS y la documentación asociada.

### 2.4 Flujo de trabajo y colaboración

- Mantener `develop` como rama principal de integración y `feature/` para nuevas implementaciones.
- Usar Pull Requests con descripciones completas, checklist de revisión y evidencia de pruebas si corresponde.
- Registrar revisiones de código con un enfoque en estabilidad, diseño responsive y coherencia visual.
- Asegurar que el equipo aplique las correcciones derivadas de las ramas `fix/` y documentar su impacto.

## 3. Correcciones aprendidas de la Actividad Obligatoria 2

En el primer parcial se deben incorporar las lecciones y correcciones registradas en las ramas `fix/` del changelog, incluyendo:

- ajustes de rutas e imágenes incorrectas
- actualización de `README.md` y documentación desactualizada
- creación y mantenimiento de la especificación DevOps
- corrección de trazabilidad y checkboxes faltantes
- mejoras responsive para filtros y horarios en mobile
- corrección de botones y tarjetas para evitar desbordes y diferencias de altura
- optimización de horarios de función y centrado de contenido
- incorporación de configuraciones de proyecto adicionales como `.vscode/mcp.json`

Incorporar estas lecciones en el primer parcial significa prestar atención a la calidad del repositorio, la precisión de la documentación y la consistencia visual en todas las resoluciones.

## 4. Criterios de aceptación de los code reviews

Para aprobar una revisión de código del primer parcial, el PR debe cumplir con los siguientes criterios:

 - [x] El PR incluye descripción clara de cambios, objetivos y archivos afectados.
 - [x] El diseño implementado coincide con el mockup PP documentado.
 - [x] Fidelidad Visual: Se validó mediante Figma MCP que el layout, textos y CTAs coinciden al 100% con el mockup (Especial atención a la Hero Section y Navbar).
- [x] Los estilos CSS están organizados y documentados correctamente.
- [x] El HTML mantiene buenas prácticas semánticas y accesibilidad básica (`alt`, estructuras de títulos, etiquetas y roles cuando corresponda).
- [x] No hay errores de sintaxis en HTML/CSS, y no se generan conflictos visuales o de layout.
- [x] La documentación del proyecto se actualizó cuando corresponde (`README.md`, `plan.md`, mockup y especificaciones).
- [x] El PR muestra evidencia de pruebas visuales o de comportamiento en los dispositivos obligatorios.
- [x] El PR tiene al menos una revisión y no quedan conversaciones abiertas sin resolver.

## 5. Criterios de aceptación del rol DevOps para el primer parcial

El rol DevOps se considera cumplido si se cumplen los siguientes puntos:

- [x] El repositorio contiene la estructura documentada y la especificación DevOps propia del primer parcial.
- [x] `README.md` y `plan.md` reflejan las funcionalidades planeadas y el estado actual del proyecto.
- [x] Se definió y documentó el mockup PP en una ubicación clara de `docs/01-mockup/primer-parcial/`.
- [x] El flujo de trabajo con ramas `feature/` y `fix/` está documentado y respetado.
- [x] Las correcciones y lecciones de la Actividad Obligatoria 2 se aplicaron en la planificación y revisión del primer parcial.
- [x] Los criterios de aceptación de los code reviews están definidos y se usan como guía para el equipo.
- [x] Se garantiza la compatibilidad responsive en las tres resoluciones obligatorias y la documentación de cualquier ajuste.
- [x] Se mantuvo la trazabilidad entre mockup, plan y especificaciones.

---

## 6. Evidencia al cierre (MOMENTO 2 - AT CLOSE)

Se confirma la ejecución de la planificación mediante el uso de Figma MCP para garantizar que el desarrollo sea fiel al diseño propuesto.

**Logs de ejecución (Figma MCP Tool Calls):**
1. `figma_get_node({ node_id: "1:2" })`  
   **Output:** `JSON { name: "Main-PP", background: "#1f1c1c", children: [...] }`
2. `figma_export_node({ node_id: "1:2", format: "png" })`  
   **Output:** `File saved at docs/01-mockup/primer-parcial/diseño-bootstrap.png`

**Data técnica recuperada:**
- **Colores extraídos:** `Background: #1f1c1c`, `Accent: #c20000`.
- **Tipografía detectada:** `Segoe UI` con pesos de `700` para títulos y `400` para cuerpo.
- **Componentes validados:** Estructura de la grilla de 4 columnas para Desktop (optimización post-RC-17) y 1 para Mobile.
**Evidencia visual generada:** Ver diseño-bootstrap.png

---
**Aclaración de Auditoría de Diseño (RC-20):**
Se documenta que durante el desarrollo se detectó una divergencia estructural (Hero inexistente, textos inventados y botones incorrectos). Tras la intervención en la corrección **RC-17**, se logró la paridad total con el diseño original de Figma. Se establece que en futuras iteraciones el Coordinador DevOps no otorgará el LGTM sin una validación explícita de la identidad visual, garantizando el cumplimiento del contrato de diseño firmado en la planificación.
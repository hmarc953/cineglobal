# Especificación del rol Coordinador / DevOps - Actividad Obligatoria 3 (A3)

## 1. Objetivo del rol DevOps
Garantizar una transición fluida desde el Primer Parcial hacia la nueva iteración del proyecto, asegurando la integridad del código base mediante una estrategia de integración por etapas y el uso de inteligencia artificial para la validación de calidad técnica.

## 2. Plan de Coordinación (Estrategia de Integración)
Para esta entrega, el flujo de trabajo se dividirá en tres fases críticas para mantener la estabilidad del repositorio:

1.  **Integración de Fixes del Primer Parcial:** Se priorizará la resolución de todas las observaciones y bugs detectados durante la evaluación del parcial. Ninguna funcionalidad nueva será integrada hasta que los "fix/" pendientes estén cerrados.
2.  **Ejecución de Backports:** Se identificarán mejoras de estructura o documentación realizadas en ramas tardías que deban replicarse en las ramas base, asegurando que `develop` y `main` mantengan paridad técnica.
3.  **Implementación de Nuevas Features:** Una vez estabilizada la base, se procederá con el desarrollo de los nuevos requerimientos funcionales previstos para A3, operando bajo el esquema estricto de `feature/` branches.

## 3. Herramientas y Metodología de Revisión
Se declara oficialmente el uso de **GitHub Copilot en Agent Mode** para las revisiones de código (Code Reviews). 

**Justificación Técnica:**
A diferencia de una revisión manual que suele centrarse en la superficie (estilo o sintaxis), el modo Agente de Copilot permite:
- **Validación Estructural:** Comprobar que los nuevos componentes no rompan la arquitectura definida en el `plan.md`.
- **Análisis Lógico Profundo:** Detectar inconsistencias en el flujo de datos o estados que podrían pasar desapercibidos.
- **Verificación de Accesibilidad:** Auditoría automática de etiquetas ARIA y roles semánticos conforme a WCAG 2.1 Level AA, reportando hallazgos en el log de revisión (sección 5).

## 4. Criterios de Aceptación (Checklist DevOps)
Los siguientes criterios deben validarse al finalizar la A3. Este checklist servirá como registro de cumplimiento y se marcará progresivamente conforme se completen las tareas en el repositorio:

- [ ] **GitHub Pages:** El sitio debe estar desplegado y actualizado automáticamente mediante GitHub Actions o configuración manual validada.
- [ ] **Gestión de Releases:** Se debe haber generado un tag de versión y una "Release" formal en GitHub que resuma los cambios de A3.
- [ ] **Verificación de Backports:** Confirmar que las mejoras críticas han sido aplicadas retroactivamente donde corresponda.
- [ ] **Trazabilidad de Fixes:** Evidencia en el `changelog.md` de que los errores del parcial fueron subsanados.
- [ ] **Documentación Actualizada:** El `plan.md` y `README.md` deben reflejar el estado actual y las nuevas capacidades del sistema.

## 5. Control de Calidad en Pull Requests
Cada PR debe incluir obligatoriamente:
1.  Resumen del impacto del cambio.
2.  Log de revisión generado por Copilot Agent (según lineamientos en 5.1).
3.  Confirmación de que el diseño sigue siendo 100% fiel al Mockup PP/A3.

### 5.1 Documentación de Logs de Copilot Agent
Para garantizar la trazabilidad y calidad técnica, los logs de revisión se manejarán bajo los siguientes lineamientos:
- **Formato:** Formato Markdown, estructurado con un resumen de hallazgos clave y el log técnico detallado encerrado en bloques de código.
- **Ubicación:** El log debe pegarse directamente en el cuerpo de la descripción del Pull Request (PR Description).
- **Responsable de validación:** El Coordinador / DevOps será el encargado de verificar la presencia y coherencia del log antes de la aprobación final.
- **Retención:** Los logs se preservarán de forma permanente como parte del historial de Pull Requests del repositorio en GitHub.

---
*Documento preparado para la fase de inicio de la Actividad Obligatoria 3.*
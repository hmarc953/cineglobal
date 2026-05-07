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
- **Verificación de Accesibilidad:** Auditoría automática de etiquetas ARIA y roles semánticos en tiempo real durante el PR.

## 4. Criterios de Aceptación (Checklist DevOps)
Para considerar finalizada la gestión de DevOps en esta etapa, se deben cumplir los siguientes puntos:

- [ ] **GitHub Pages:** El sitio debe estar desplegado y actualizado automáticamente mediante GitHub Actions o configuración manual validada.
- [ ] **Gestión de Releases:** Se debe haber generado un tag de versión y una "Release" formal en GitHub que resuma los cambios de A3.
- [ ] **Verificación de Backports:** Confirmar que las mejoras críticas han sido aplicadas retroactivamente donde corresponda.
- [ ] **Trazabilidad de Fixes:** Evidencia en el `changelog.md` de que los errores del parcial fueron subsanados.
- [ ] **Documentación Actualizada:** El `plan.md` y `README.md` deben reflejar el estado actual y las nuevas capacidades del sistema.

## 5. Control de Calidad en Pull Requests
Cada PR debe incluir obligatoriamente:
1.  Resumen del impacto del cambio.
2.  Log de revisión generado por Copilot Agent.
3.  Confirmación de que el diseño sigue siendo 100% fiel al Mockup PP/A3.

---
*Documento preparado para la fase de inicio de la Actividad Obligatoria 3.*
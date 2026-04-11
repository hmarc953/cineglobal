# Spec Frontend - Estilos CSS CineGlobal

## 1. Objetivo
Implementar la capa visual del proyecto CineGlobal transformando el mockup de Figma en estilos CSS modernos y mantenibles. Se utilizará el **servidor MCP de Figma** con **GitHub Copilot en modo Agente** para extraer con precisión la identidad visual definida por el Coordinador.

## 2. Alcance (Archivos a generar)
- **css/styles.css**: Contendrá las variables CSS en `:root`, el reset global, tipografías, colores oficiales y el layout base (estructura).
- **css/components.css**: Estilizado modular de botones, cards de películas, menús de navegación, formularios y sus respectivos estados interactivos (`:hover`, `:focus`).

## 3. Justificación y Requisitos Técnicos
Para cumplir con los estándares de la cátedra, la implementación seguirá estas reglas:
- **Metodología SDD**: La especificación actúa como contrato previo a la generación de código.
- **Box Model**: Control explícito de `padding`, `margin` y `border` en todos los contenedores para asegurar fidelidad con el mockup.
- **Diferenciación de Elementos**: Se aplicarán estilos específicos para diferenciar elementos en línea (`inline`) y en bloque (`block`) mediante propiedades `display`.
- **Variables CSS**: Centralización de la paleta de colores y fuentes en `:root` para garantizar consistencia.
- **Herencia y Especificidad**: Uso de selectores limpios para aprovechar la cascada de CSS de forma eficiente.

## 4. Criterios de Aceptación
- [ ] El código CSS valida sin errores sintácticos.
- [ ] Los archivos están correctamente vinculados al `index.html`.
- [ ] Se incluyen comentarios explicativos sobre las decisiones de estilo y especificidad.
- [ ] Los componentes visuales (cards, botones) reflejan fielmente el diseño del mockup de Figma.

## 5. Referencias de Diseño
- **Mockup Figma actualizado:** [https://www.figma.com/design/NfChLFCsX27WSaDCEiaevS/Sin-t%C3%ADtulo?node-id=0-1]

## 6. Registro de Ejecución (Evidencia del Rol 3.1.2)
*Esta sección se completará tras la generación del código con el Agente.*

- **Prompt utilizado:** > [Pendiente de completar]
- **Resultado obtenido:** > [Pendiente de completar]
- **Ajustes manuales realizados:** > [Describir al menos 2 correcciones post-generación]
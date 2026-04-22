# Especificaciones HTML Avanzados

## Componentes HTML Avanzados Implementados

Se implementaron los siguientes dos componentes HTML avanzados:

1. **<details> + <summary>**: Para crear secciones colapsables en "Cines participantes", mejorando la experiencia del usuario al permitir expandir o colapsar la información sin sobrecargar la página inicialmente.

2. **<iframe>**: Para integrar contenido externo, como mapas interactivos de ubicaciones de cines o embeds de videos de plataformas como YouTube, permitiendo una experiencia multimedia rica sin necesidad de alojar todo el contenido localmente.

## Plan de Testing con Playwright

Utilizaremos Playwright para automatizar las pruebas de los componentes. El plan incluye:

- Pruebas de carga: Verificar que los elementos se carguen correctamente en diferentes navegadores (Chrome, Firefox, Safari).
- Pruebas de funcionalidad: Para <details> + <summary>, asegurar que las secciones se expandan y colapsen correctamente; para <iframe>, verificar que el contenido externo se cargue y sea interactivo si corresponde.
- Pruebas de accesibilidad: Verificar que los elementos tengan atributos adecuados para lectores de pantalla y navegación por teclado.
- Pruebas de rendimiento: Medir tiempos de carga y uso de recursos.

## Criterios de Aceptación

- Los elementos `<details>`, `<summary>` e `<iframe>` deben renderizarse correctamente en navegadores modernos.
- Los controles de expansión/colapso deben ser funcionales y accesibles.
- El contenido del iframe debe cargarse sin errores y ser funcional.
- Compatibilidad con fuentes externas seguras para iframes.

## Prompt utilizado (Varia por componete)
Usando Playwright MCP, necesito testear la compatibilidad visual de mi página 
en distintos viewports. La URL es http://localhost:3000

Ejecutá estos pasos en orden:

1. Configurá el viewport en 390x844 (iPhone 14 Pro) y tomá una captura de pantalla completa
   - Pruebas de carga: verificar que los elementos se carguen correctamente
   - Pruebas de funcionalidad: <details> + <summary> deben expandir/colapsar correctamente
   - Verificar que el iframe mantiene proporciones correctas

2. Configurá el viewport en 412x915 (Samsung Galaxy S23) y repetí los mismos pasos

3. Configurá el viewport en 820x1180 (iPad Air) y repetí los mismos pasos

4. Configurá el viewport en 1280x800 (Firefox desktop) y repetí los mismos pasos

5. Reportar en cada viewport:
   - Carga de componentes
   - Comportamiento de <details>
   - Integración del iframe

Guardar capturas en:
docs/04-testing/capturas/tc-9/momento-2/

## 📊 Resultado obtenido (Playwright MCP)

- ✔ Iframe responsive en todos los dispositivos
- ❌ Problema inicial detectado: `<details>` no expandía/colapsaba correctamente
- ✔ En ejecución posterior (Momento 2) el comportamiento fue corregido

---

## 🛠️ Ajustes manuales realizados

- Corrección del comportamiento de `<details>` 
- Validación de eventos `<summary>` para asegurar expansión/cierre correcto
- Revalidación del layout responsive sin afectar el iframe


---

## 🔍 Resumen de hallazgos (Playwright MCP)

-  Todos los viewports muestran layout responsive correcto
-  El `<iframe>` mantiene proporción 16:9 sin desbordes
-  `<details>` + `<summary>` presentó fallo inicial en Momento 1
-  El problema fue corregido en Momento 2
-  No se detectan scrolls horizontales ni overflow visual
-  El comportamiento general del layout es consistente en todos los dispositivos
-  La navegación se adapta correctamente sin romper estructura visual
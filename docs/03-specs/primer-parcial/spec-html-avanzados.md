# Especificaciones HTML Avanzados

## Componentes HTML Avanzados Implementados

Se implementarón los siguientes dos componentes HTML avanzados:

1. **<details> + <summary>**: Para crear secciones colapsables con trailers de películas, mejorando la experiencia del usuario al permitir expandir o colapsar el contenido multimedia sin sobrecargar la página inicialmente.

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

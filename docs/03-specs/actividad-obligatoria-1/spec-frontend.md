# Spec Frontend - Proyecto CineGlobal

**Proyecto:** CineGlobal: Cartelera de Cines y Eventos en Buenos Aires  
**Integrante:** Milagros Magali Araujo  
**Rol:** Desarrollador Frontend  

---

## 1. Relación con el Plan Maestro

*Esta especificación resuelve los siguientes puntos del plan.md del coordinador:*

- **Requerimientos Funcionales:** RF-01 (Estructura básica del sitio), RF-02 (Cartelera de películas), RF-03 (Filtros por cine y categoría), RF-04 (Horarios y enlaces de compra)

- **Alcance Relacionado:** 
  - [✅] Desarrollo de la estructura HTML5 semántica para la página principal
  - [✅] Implementación de secciones para filtros, listado de películas y horarios
  - [✅] Validación de etiquetas semánticas correctas
  - [✅] Integración con diseño disponible en mockup de Figma

---

## 2. Descripción de la Tarea

Desarrollar la estructura HTML5 de la página web de CineGlobal que permita visualizar la cartelera de películas de distintos cines de Buenos Aires, incluyendo:

- **Encabezado** con título y descripción del sitio
- **Navegación** con filtros por ubicación (barrios de CABA) y categoría
- **Sección principal** con cartelera de películas en formato grid
- **Tarjetas de película** con información: título, género, sinopsis, imagen, fecha y horarios
- **Pie de página** con información informativa
- **Estructura semántica** que mejore accesibilidad, SEO y mantenibilidad del código

---

## 3. Especificaciones Técnicas (Contrato)

### Estructura HTML y Componentes Requeridos

#### Header
- Etiqueta `<header>` que contenga:
  - `<h1>` con logo/título "CINEGLOBAL"
  - Párrafo descriptivo del sitio
  - Etiquetas semánticas correctas para accesibilidad

#### Navegación
- Etiqueta `<nav>` que contenga:
  - Selectores/inputs para filtrar por barrio (CABA)
  - Selectores/inputs para filtrar por categoría de película
  - Debe permitir múltiples selecciones

#### Sección Principal
- Etiqueta `<main>` con `id="películas"`
- `<section>` como contenedor de la cartelera
- Un `<article>` por cada película con los siguientes elementos:
  - Imagen del poster (etiqueta `<img>` con atributos semánticos)
  - Título (etiqueta `<h2>` o `<h3>`)
  - Género (etiqueta `<p>` con clase específica)
  - Sinopsis breve (etiqueta `<p>`)
  - Información de cine y horarios:
    - Etiqueta `<data>` para fechas
    - Etiqueta `<time>` para horarios (formato: HH:MM)
  - Botón "Comprar entradas" con atributo `href` apropiado

#### Footer
- Etiqueta `<footer>` que contenga:
  - Información de copyright
  - Enlaces adicionales o información del sitio

### Tecnologías y Herramientas
- **HTML5:** Etiquetas semánticas (header, nav, main, section, article, time, data, footer)
- **Atributos de accesibilidad:** `alt`, `title`, `aria-label` donde corresponda
- **Validación:** El código debe validar sin errores en [W3C HTML Validator](https://validator.w3.org/)

### Datos de Referencia
- **Cartelera:** Basada en el mockup disponible en [Figma](hmarc953/cineglobal/docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png)

- **Barrios de CABA:** Palermo, Abasto, Lavalle, Puerto Madero. 

- **Géneros de ejemplo:** Acción, Comedia, Drama, Terror. 

---

## 4. Estrategia de IA (Prompting)

### 4.1 Configuración General

- **Modelo IA a utilizar:** GitHub Copilot (usando MCP)
- **Contexto a incluir:** plan.md, esta especificación (spec-frontend.md), y mockup de Figma
- **Técnica de Prompting:** Few-shot (proporcionando ejemplos HTML semánticos)

### 4.2 Servidor MCP de Figma para Consulta de Diseño

**¿Por qué usar MCP de Figma?**

El servidor MCP (Model Context Protocol) de Figma permite a GitHub Copilot acceder directamente al mockup del proyecto sin necesidad de capturas de pantalla. Esto mejora la precisión del código generado porque la IA puede:
- Verificar dimensiones, colores y tipografía exactos del diseño
- Consultar la estructura de componentes del mockup
- Identificar automáticamente diferentes estados de la interfaz (hover, active, etc.)
- Mantener consistencia visual entre el diseño y la implementación

   (hmarc953/cineglobal/docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png)



#### Prompt de Ejemplo para Usar MCP de Figma

```
@figma Observa el mockup de CineGlobal en Figma. 
Necesito generar código HTML5 semántico para la página principal que:

1. Respete la estructura visual mostrada en el mockup (header, navegación, cartelera de películas)
2. Use etiquetas semánticas correctas: <header>, <nav>, <main>, <section>, <article>, <time>, <data>, <footer>
3. Incluye:
   - [✅] Header con título "CINEGLOBAL" y descripción
   - [✅] Nav con filtros por barrio y género
   - [✅] Main con id="películas"
   - [✅] Grid de artículos, cada uno con:
     * Imagen del poster
     * Título del film
     * Género
     * Sinopsis breve
     * Elemento <time> para horarios (formato 14:30)
     * Elemento <data> para fecha (formato YYYY-MM-DD)
     * Botón "Comprar entradas"
   - Footer simple con copyright


Proporciona primero la estructura general, luego un ejemplo de una tarjeta de película completa.


#### Resultado Esperado

Se espera recibir de Copilot:
- Código HTML5 completamente estructurado y semántico
- Comentarios que expliquen por qué se usó cada etiqueta
- Estructura correcta siguiendo el prototipo visual del mockup
- Código que valide sin errores en W3C
- Alternativas de cómo implementar ciertos componentes (ej: filtros con fieldset o con formulario)

#### Resultado Obtenido (Referencia para Ejecución)

Cuando se ejecute este prompt con MCP de Figma habilitado, GitHub Copilot debería generar:
- Un archivo HTML5 completo con estructura de página
- Comentarios explicativos de la semántica utilizada
- Una estructura de grid para tarjetas de películas
- Etiquetas `<time>` y `<data>` correctamente implementadas
- Atributos semánticos y de accesibilidad incorporados
- Código listo para pasar validación W3C

**Ejemplo de fragmento esperado:**
```html
<article data-cinema="Palermo" data-genre="Acción">
  <img src="poster.jpg" alt="Póster de la película">
  <h3>Título de la Película</h3>
  <p class="genre">Acción</p>
  <time datetime="14:30">14:30</time>
  <data value="2026-04-06">06/04/2026</data>
  <button>Comprar entradas</button>
</article>
```

#### Ajustes Manuales Requeridos

Después de recibir la respuesta de Copilot con MCP, es posible que requiera ajustes:

- [ ] **Verificar IDs únicos:** Asegurar que cada película/cine tenga ID único para scripting posterior
- [ ] **Atributos data-* consistentes:** Verificar que los atributos data- sigan nomenclatura coherente
- [ ] **Accesibilidad:** Revisar que todos los `<img>` tengan `alt` descriptivo
- [ ] **Validación W3C:** Ejecutar validador W3C y corregir cualquier error de sintaxis
- [ ] **Estructura de formulario:** Si se usa `<form>` para filtros, asegurar etiquetas `<label>` asociadas correctamente
- [ ] **Jerarquía de encabezados:** Verificar que H1→H2→H3 sean descendentes y lógicos

### 4.3 Refinamiento del Código tras Validación MCP

Si el código de Copilot requiere ajustes:

1. **Describir el issue específico:** "El validador W3C reporta error en línea X porque..."
2. **Proporcionar contexto:** Compartir el código problemático
3. **Nuevo prompt:** "Refactoriza esta sección para..."
4. **Reiterar validación:** Hasta que el código pase validación W3C sin errores

---

## 5. Criterios de Aceptación (Definición de Hecho)

El desarrollo será considerado correcto si:

- [✅] El HTML valida sin errores en [W3C HTML Validator](https://validator.w3.org/)
- [✅] Se utilizan etiquetas semánticas correctamente
- [✅] Cada película está dentro de un article
- [✅] Existe navegación con filtros
- [✅] Se incluyen fechas con data
- [✅] Se incluyen horarios con time
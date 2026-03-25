# Registro de Prompt #2

## Datos Generales

- **Integrante:** Santiago Ariel Samitier
- **Rol:** Documentador / Diseñador UX
- **Archivo aplicado:** `README.md`
- **Relación con Plan Maestro:** RF-DOC-01 — Documentación general del proyecto visible en el repositorio

## Configuración de IA

- **Modelo IA utilizado:** GitHub Copilot (claude-3.5-sonnet)
- **Método de Prompting:** Few-shot prompting (se proporcionó la estructura base como ejemplo)

## Ejecución

### Prompt exacto:

```
Hola necesito que en el archivo README.md escribas este contenido en markdown
utilizando el archivo plan.md como contexto. Y utilizar como base estructural esto:

Nombre de mi proyecto

Datos Académicos
· Carrera: Tecnicatura Universitaria en Programación de Sistemas
· Materia: Programación Web I

Descripción
Breve descripción del proyecto:
(Indicar en uno o dos párrafos qué hace el proyecto, su propósito y alcance).

Objetivo del entregable
(Explicar qué se busca lograr con esta entrega, por ejemplo: estructura HTML5 inicial,
documentación y mockup de referencia, registro de prompts de IA, etc.)

Documentación:
Mockup (créame un espacio para ingresar un link a otra parte del proyecto)
Índice de Prompts (créame un espacio para ingresar un link a otra...)

agrega el link del apartado changelog que está en el proyecto al link

cambiame en la sección del objetivo del entregable la parte de "primera entrega"
por el objetivo global del proyecto

Hola necesito que utilices como contexto plan.md para sacar las tecnologías
utilizadas en este proyecto. Colocar en la sección breve descripción del
proyecto en forma de lista. Y necesito que en la fila modifique el
n° de matrícula: 44556 por 153041

En la parte del README.md la parte del link de mockup pone este link:
https://www.figma.com/design/NfChLFCsX27WSaDCEiaevS/Sin-título?node-id=0-1&m=dev&t=h8AO4rUf5W6hzUwA-1
Y también pone los otros links de changelog y prompts uniéndolo con el archivo
prompts.md (Utilizando esta forma de unión: ../)
```

### Resultado esperado:

Generar el `README.md` completo del proyecto CineGlobal con: título, datos académicos, descripción con tecnologías, objetivo del proyecto global, sección de documentación con links al mockup de Figma, índice de prompts y changelog. Con los datos de los integrantes correctos (matrícula 153041 para Alejandro Bartomioli).

### Resultado obtenido:

GitHub Copilot generó el `README.md` con la estructura solicitada. Incluyó la descripción del proyecto tomada del `plan.md`, las tecnologías (HTML, CSS, JavaScript), y los links con rutas relativas usando `../`. El archivo quedó completo y bien formateado.

### Evidencia:

> El `README.md` resultante está visible en la rama `develop` del repositorio: https://github.com/hmarc953/cineglobal/blob/develop/README.md

![Evidencia Prompt #2](./imagenes_evidencias/img_evidencia_prompt2.jpg)

## Refinamiento Humano

- Se realizaron múltiples iteraciones en la misma conversación para ir refinando el archivo (se usó "volvé atrás" para corregir la sección de objetivo).
- Se corrigió el número de matrícula manualmente (44556 → 153041).
- Se verificó que los links relativos con `../` apuntaran correctamente a los archivos del repositorio.
- Se ajustó el objetivo del entregable para que refleje el objetivo global del proyecto y no solo la primera entrega.

---

**Archivo o sección del proyecto donde se aplicó:** `README.md` (raíz del repositorio)

*Validado por el Especialista en IA: Alejandro Bartomioli*

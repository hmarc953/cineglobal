# spec-componentes-bootstrap.md

## Planificación previa 

### Rol
Especialista en Componentes Bootstrap

### Componentes Bootstrap avanzados a implementar

**1. Navbar de Bootstrap**
Se eligió porque el sitio de Cine Global requiere una navegación clara y accesible
desde cualquier dispositivo. La Navbar de Bootstrap ofrece colapso automático en
móviles (hamburger menu), soporte para links activos y es compatible con el sistema
de grillas del proyecto.

**2. Modal de Bootstrap**
Se eligió para mostrar información detallada de películas (sinopsis, horarios, trailer)
sin abandonar la página principal. Mejora la experiencia de usuario y es un componente
estándar en sitios de cine.


### Plan de testing con Playwright MCP

Dispositivos a probar (obligatorios):
- iPhone 14 Pro (iOS Safari)
- Samsung Galaxy S23 (Chrome Android)
- iPad Air (iOS Safari)

Casos a verificar:
- [ ] La Navbar se colapsa correctamente en mobile (≤768px)
- [ ] El botón hamburger abre y cierra el menú
- [ ] El Modal se abre al hacer click en el trigger
- [ ] El Modal se cierra con el botón X y con click fuera
- [ ] Ambos componentes mantienen la identidad visual del proyecto

### Criterios de aceptación

- [ ] Navbar implementada y funcional en desktop y mobile
- [ ] Modal implementado y funcional
- [ ] Componentes personalizados en `css/bootstrap-overrides.css`
- [ ] Sin romper estilos existentes de `styles.css` y `components.css`
- [ ] Tests documentados en `test-case-7.md` y `test-case-8.md`
- [ ] Issues bugs creados con GitHub MCP por cada hallazgo


## Evidencia al cierre (completar al terminar)
Las pruebas se ejecutarán en entorno local utilizando VS Code Live Preview, accediendo a la aplicación mediante:

http://localhost:3000

### Prompts utilizados con Copilot Agent

PROMPTS 1- 
Tengo que agregar de las bibliotecas de bootstrap los componentes avanzados navbar y Modal sin romper la estrucura del index.html. 


PROMPTS 2-
Tengo que personalizar componentes en css/bootstrap-overrides.css para
mantener la identidad visual. Optimizar componentes para diferentes
dispositivos y navegadores, de acuerdo a lo que ya tengo cargador, corregime en caso de ser necesario 

PROMPTS 3- 
Utilizando Playwright MCP, navegar a http://127.0.0.1:3000 y verificar que la navbar es visible. Luego emular viewport de iPhone 14 Pro (390x844) y verificar que el botón toggler aparece y el menú colapsa correctamente. 
Tomar captura de pantalla y documentar resultados.


PROMPTS 4- 
Utilizando Playwright MCP, navegar a http://127.0.0.1:3000, hacer click en 
el botón que abre el modal y verificar que aparece correctamente, sin errores. 
Verificar que el botón de cierre funciona correctamente, Emular Samsung Galaxy S23 (360x780) y repetir la prueba. Tomar captura de pantalla del momento exacto y plasmarlo.


### Resumen de hallazgos con Playwright MCP
Issues #82 con bug encotrados y resueltos
Issues #83 con bug encontrados y resultos

## Coordinación con Desarrollador Frontend/Bootstrap
- [x] Confirmé con Alejadro que Bootstrap CDN está instalado correctamente
- [x] Verifiqué que bootstrap-overrides.css está vinculado después de los demás CSS en index.html
- [x] Revisamos juntos que Navbar y Modal no generan conflictos con el sistema de columnas implementado
- [x] No se encontraron conflictos visuales al integrar ambas ramas

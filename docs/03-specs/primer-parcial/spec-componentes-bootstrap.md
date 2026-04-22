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


### Prompts utilizados con Copilot Agent
*[Completar al cerrar la tarea]*

### Resultado obtenido
*[Completar al cerrar la tarea]*

### Ajustes manuales realizados
*[Completar al cerrar la tarea]*

### Resumen de hallazgos con Playwright MCP
*[Completar al cerrar la tarea]*

## Coordinación con Desarrollador Frontend/Bootstrap
- [x] Confirmé con Alejadro que Bootstrap CDN está instalado correctamente
- [x] Verifiqué que bootstrap-overrides.css está vinculado después de los demás CSS en index.html
- [x] Revisamos juntos que Navbar y Modal no generan conflictos con el sistema de columnas implementado
- [x] No se encontraron conflictos visuales al integrar ambas ramas

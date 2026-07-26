# Framework seleccionado: Angular

## Breve reseña

Angular es un framework de desarrollo web que proporciona una estructura integral para construir aplicaciones. Utiliza TypeScript como lenguaje principal y organiza la interfaz mediante componentes que relacionan una clase, una plantilla y sus estilos.

Entre sus características principales se encuentran:

- Arquitectura basada en componentes.
- Plantillas con interpolación, propiedades, eventos y control de flujo.
- Enlace de datos entre la clase del componente y su plantilla.
- Inyección de dependencias para compartir servicios.
- Herramientas oficiales para formularios, navegación y comunicación HTTP.
- Angular CLI para crear, ejecutar, probar y compilar el proyecto.
- Uso de TypeScript para aplicar tipos estáticos y mejorar el soporte del editor.

## Motivación y justificación

Angular fue elegido porque CineGlobal reúne varios flujos que necesitan coordinar datos, validaciones, eventos y estados visuales. El proceso de compra es un ejemplo claro: al seleccionar un cine se habilitan determinados idiomas; luego se habilitan horarios y finalmente la cantidad de asientos.

En la implementación actual, este comportamiento se distribuye entre:

- Selectores declarados en `script.js`.
- Registro manual de eventos.
- Manejadores que filtran funciones.
- Funciones de `compraView.js` que vacían y reconstruyen cada `select`.
- Utilidades adicionales para habilitar y deshabilitar controles.

Angular permitiría reunir esta responsabilidad en un componente de compra. La clase conservaría los datos y la plantilla mostraría automáticamente las opciones disponibles. Además, un servicio podría encargarse del catálogo, otro de la persistencia y otro de las solicitudes a la API.

Esto beneficiaría a CineGlobal porque:

- Reduciría la dependencia de selectores globales y consultas manuales al DOM.
- Haría explícita la relación entre los datos disponibles y lo que se muestra en cada campo.
- Facilitaría dividir la aplicación en componentes de cartelera, filtros, autenticación, compra y soporte.
- Permitiría utilizar formularios de Angular para centralizar validaciones y estados de los controles.
- Favorecería una estructura uniforme si el proyecto creciera y fuera mantenido por un equipo más grande.

## Nivel de dificultad de adaptación

**Nivel estimado: alto.**

Aunque los conceptos de clases, módulos, eventos y asincronismo ya están presentes en CineGlobal, Angular introduce una arquitectura más amplia y varias herramientas nuevas. La curva de aprendizaje sería media-alta por el uso de TypeScript, decoradores, componentes, servicios, inyección de dependencias, formularios y ciclo de vida.

Los cambios principales serían:

1. Crear un proyecto Angular y trasladar la aplicación a su estructura de carpetas.
2. Convertir la interfaz actual en componentes y plantillas.
3. Reemplazar los listeners y las consultas directas al DOM por bindings y métodos de componentes.
4. Convertir el estado global en propiedades de componentes o servicios compartidos.
5. Adaptar `ApiService`, `StorageUtil` y parte de los modelos para aprovechar TypeScript e inyección de dependencias.
6. Replantear la integración de los modales de Bootstrap dentro del ciclo de vida de Angular.
7. Migrar las pruebas actuales a herramientas compatibles con componentes Angular.

Los estilos CSS y varias reglas de negocio podrían reutilizarse, pero una migración real sería más cercana a una reorganización integral que a la incorporación de una biblioteca aislada.

## Ejemplo de código: antes y después

### Antes: Vanilla JavaScript

**Ubicación:** [`js/utils/compraView.js`, líneas 51 a 67](../js/utils/compraView.js#L51-L67)

El código actual obtiene el `select`, elimina sus opciones, calcula los idiomas únicos y crea cada elemento de forma manual:

```js
export function renderizarIdiomasCompra(funciones, SELECTORES) {
  const select = consultarElemento(SELECTORES.selectCompraIdioma);
  if (!select) {
    return;
  }

  select.innerHTML = '<option value="" selected disabled hidden>Elija un idioma</option>';

  const idiomas = [...new Set(funciones.map((funcion) => funcion.idioma))];

  idiomas.forEach((idioma) => {
    const option = document.createElement('option');
    option.value = idioma;
    option.textContent = idioma;
    select.appendChild(option);
  });
}
```

### Después: propuesta con Angular

Una implementación posible trasladaría los idiomas a la clase del componente y utilizaría la plantilla para generar las opciones:

```ts
import { Component, Input } from '@angular/core';

interface Funcion {
  idioma: string;
}

@Component({
  selector: 'app-selector-idioma',
  standalone: true,
  template: `
    <select
      id="compraIdioma"
      name="idioma"
      class="form-select"
      [disabled]="idiomas.length === 0"
    >
      <option value="" selected disabled hidden>Elija un idioma</option>

      @for (idioma of idiomas; track idioma) {
        <option [value]="idioma">{{ idioma }}</option>
      }
    </select>
  `,
})
export class SelectorIdiomaComponent {
  idiomas: string[] = [];

  @Input() set funciones(funciones: Funcion[]) {
    this.idiomas = [
      ...new Set(funciones.map((funcion) => funcion.idioma)),
    ];
  }
}
```

El componente padre podría utilizarlo de la siguiente manera:

```html
<app-selector-idioma [funciones]="funcionesDisponibles" />
```

## Análisis del cambio

En Vanilla JavaScript, la función conoce el selector del elemento, modifica su contenido y crea cada opción. En Angular, la clase mantiene la colección `idiomas` y la plantilla declara cómo representarla. Cuando cambia la entrada `funciones`, el setter recalcula los idiomas y Angular actualiza el `select`.

Este patrón podría ampliarse al resto del flujo: el componente de compra mantendría `cineSeleccionado`, `idiomaSeleccionado`, `funcionesDisponibles` y `horariosDisponibles`. De esta forma, la habilitación de cada campo dependería de propiedades visibles y comprobables en el componente, en lugar de quedar distribuida entre diferentes consultas y utilidades del DOM.

## Conclusión

Angular sería apropiado si CineGlobal evolucionara hacia una aplicación de mayor tamaño que necesitara una arquitectura integral, convenciones homogéneas y herramientas oficiales para formularios, servicios y navegación. Su principal desventaja para el proyecto actual es el costo inicial de migración, ya que implicaría reorganizar gran parte de la interfaz y adoptar TypeScript y el ecosistema de Angular.

## Fuentes consultadas

- [Angular - Descripción general oficial](https://angular.dev/overview)
- [Angular - Anatomía de los componentes](https://angular.dev/guide/components)
- [Angular - Guía de componentes](https://angular.dev/essentials/components)

Consulta realizada el 26 de julio de 2026.

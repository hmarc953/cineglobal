# framework react

## Descripción general del framework

**React** es una biblioteca de JavaScript desarrollada por Meta (Facebook) para la creación de interfaces de usuario interactivas. Su principal objetivo es facilitar el desarrollo de aplicaciones web mediante una arquitectura basada en componentes reutilizables, permitiendo dividir la interfaz en pequeñas partes independientes que pueden reutilizarse en diferentes secciones del proyecto.

Entre sus principales características se destacan:

- Desarrollo basado en componentes reutilizables.
- Actualización eficiente de la interfaz mediante el Virtual DOM.
- Gestión sencilla del estado de la aplicación con Hooks como `useState` y `useEffect`.
- Mayor facilidad para mantener y escalar proyectos de gran tamaño.
- Amplio ecosistema y comunidad de desarrolladores.

---

## Motivación y justificación

React fue seleccionado debido a que el proyecto **CineGlobal** posee una interfaz dinámica donde constantemente se renderizan películas, funciones y resultados de filtros. Actualmente estas tareas se realizan manipulando directamente el DOM mediante funciones en JavaScript.

La incorporación de React permitiría organizar la aplicación en componentes independientes, por ejemplo un componente para cada película, otro para el listado de películas y otro para los filtros de búsqueda. Esto reduciría la cantidad de código repetido, facilitaría el mantenimiento y haría que futuras modificaciones fueran más sencillas de implementar.

Además, React ofrece una mejor organización del proyecto al separar la lógica de negocio de la representación visual, favoreciendo la reutilización de componentes y la escalabilidad del sistema.

---

## Nivel de dificultad de adaptación

La adaptación del proyecto a React presenta un **nivel de dificultad medio**.

Gran parte de la lógica de negocio desarrollada en JavaScript puede reutilizarse sin modificaciones importantes, ya que las clases del proyecto (como `Pelicula`, `Funcion`, `Compra` y `CatalogoPeliculas`) continuarían funcionando de la misma manera.

Sin embargo, sería necesario reemplazar la manipulación manual del DOM por componentes React y utilizar estados (`useState`) para almacenar la información de la aplicación, junto con efectos (`useEffect`) para realizar operaciones como la carga inicial de datos.

Los principales cambios serían:

- Reemplazar `document.querySelector()` por JSX.
- Sustituir los eventos registrados manualmente por eventos propios de React.
- Utilizar componentes reutilizables para mostrar las películas.
- Administrar el estado mediante Hooks.
- Centralizar el renderizado de la interfaz en React.

Debido a estos cambios, la curva de aprendizaje puede considerarse intermedia para desarrolladores que ya poseen conocimientos de JavaScript moderno.

---

## Ejemplo de código – Antes y después

### Código actual 

**Archivo:** `js/script.js`

**Función utilizada:** `manejarFiltroPeliculas()`
**lineas de codigo:** 537-548
- [Link a lineas de codigo ](..//js/script.js#L537-L548)
Actualmente, luego de aplicar los filtros, la aplicación vuelve a renderizar manualmente la lista de películas.

```javascript
function manejarFiltroPeliculas(event) {
  event.preventDefault();

  const estadoFiltros = consultarElemento(SELECTORES.estadoFiltros);
  mostrarLoading(estadoFiltros, 'Buscando peliculas...');

  const filtros = obtenerFiltrosPeliculas();
  const resultados = estadoApp.catalogoPeliculas.buscarPorFiltros(filtros);

  ocultarLoading(estadoFiltros);

  renderizarPeliculas(resultados, SELECTORES);
  const mensajeFiltros = resultados.length
    ? `${resultados.length} pelicula(s) encontradas.`
    : 'No se encontraron peliculas con esos filtros.';

  limpiarMensaje(estadoFiltros);

  if (debeNotificarFiltro(event)) {
    if (resultados.length) {
      showInfoToast(mensajeFiltros);
    } else {
      showWarningToast(mensajeFiltros);
    }
  }

  persistirDato(STORAGE_KEYS.filtros, filtros, 'session');
}
```

En este enfoque, el desarrollador debe actualizar manualmente la interfaz cada vez que cambian los datos.

---

### Implementación utilizando React

Con React el listado se actualizaría automáticamente cuando cambie el estado de las películas.

```jsx
import { useState } from "react";

function ListaPeliculas({ catalogo }) {
  const [peliculas, setPeliculas] = useState(
    catalogo.listarPeliculas()
  );
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  function manejarFiltroPeliculas(filtros) {
    setCargando(true);

    const resultados = catalogo.buscarPorFiltros(filtros);

    setPeliculas(resultados);

    const mensajeFiltros =
      resultados.length > 0
        ? `${resultados.length} pelicula(s) encontradas.`
        : "No se encontraron peliculas con esos filtros.";

    setMensaje(mensajeFiltros);
    setCargando(false);
  }

  return (
    <>
      <FiltroPeliculas
        onFiltrar={manejarFiltroPeliculas}
      />

      {cargando && <p>Buscando películas...</p>}

      <p>{mensaje}</p>

      {peliculas.map((pelicula) => (
        <MovieCard
          key={pelicula.id}
          pelicula={pelicula}
        />
      ))}
    </>
  );
}
```

En esta implementación ya no es necesario manipular el DOM manualmente para actualizar la lista de películas, mostrar el estado de carga o informar el resultado del filtrado. React administra estos cambios mediante los estados `peliculas`, `cargando` y `mensaje`. Cada vez que alguno de ellos se modifica mediante `setPeliculas()`, `setCargando()` o `setMensaje()`, la interfaz se vuelve a renderizar automáticamente, mostrando la información actualizada sin necesidad de invocar funciones específicas para modificar el DOM. Este enfoque simplifica el código, mejora su mantenimiento y favorece la reutilización de componentes.

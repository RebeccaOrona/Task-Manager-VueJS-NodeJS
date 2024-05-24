# Componente StatusHistory

Este componente muestra el historial de estados de las tareas en forma de tabla.

## Plantilla

El componente consta de una tabla (`v-data-table`) que muestra el historial de estados de las tareas. Cada fila de la tabla representa un registro del historial de estados, mostrando la tarea asociada, la fecha de cambio y un comentario opcional.

## Datos

- **statusHistory:** Un array de objetos que representan el historial de estados de las tareas.
- **headers:** Define las columnas de la tabla, incluyendo el título y el valor asociado a cada columna.
- **itemsPerPageText:** Texto que indica el número de elementos por página.
- **footerProps:** Propiedades para configurar la paginación de la tabla.

## Funcionalidades

- **fetchHistory():** Método para recuperar el historial de estados de las tareas desde el backend.
- **paginationText(pageStart, pageStop, itemsLength):** Método para generar el texto que indica el rango de elementos mostrados en la tabla.
- **formatDate(dateString):** Método para formatear la fecha en el formato "DD/MM/YYYY, h:mm:ss a".

## Estilos

- **.status-history-container:** Estilo para el contenedor del componente, que incluye un fondo blanco, bordes redondeados y una sombra sutil.
- **.title:** Estilo para el título del componente, con texto centrado, color oscuro y tamaño de fuente grande.
- **.v-data-table-header th:** Estilo para los encabezados de la tabla, con fondo gris claro y texto oscuro.
- **.v-data-table:** Estilo para la tabla, con fondo blanco y bordes redondeados.
- **.v-data-table-footer**items-per-page, .v-data-table-footer**pagination:** Estilo para los controles de paginación, alineados al centro.
- **.v-select:** Estilo para el selector de elementos por página, con ancho máximo de 100px.
- **.ml-2:** Estilo para el margen izquierdo de 8px.
- **.elevation-1:** Estilo para aplicar una sombra sutil a la tabla.

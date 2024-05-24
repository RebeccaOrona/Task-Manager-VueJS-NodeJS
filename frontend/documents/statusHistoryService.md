# Status History Service

Este archivo contiene funciones para interactuar con el backend y realizar operaciones relacionadas con el historial de estados.

## Importaciones

- **instance:** Una instancia de Axios configurada para comunicarse con el backend.

## Funciones

### `fetchStatusHistory()`

- **Descripción:** Obtiene el historial completo de estados del backend.
- **Retorno:** Devuelve un array de objetos que representan el historial de estados.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

### `deleteStatusHistory(id)`

- **Descripción:** Elimina un registro específico del historial de estados en el backend.
- **Parámetros:** `id` - El ID del registro de historial que se eliminará.
- **Retorno:** Devuelve la respuesta del backend.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

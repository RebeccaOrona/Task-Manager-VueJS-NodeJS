# Task Service

Este archivo contiene funciones para interactuar con el backend y realizar operaciones relacionadas con las tareas.

## Importaciones

- **instance:** Una instancia de Axios configurada para comunicarse con el backend.
- **moment:** Una biblioteca para manejar fechas y horas.

## Funciones

### `fetchTasks()`

- **Descripción:** Obtiene la lista de tareas del backend.
- **Retorno:** Devuelve un array de objetos que representan las tareas.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

### `createTask(taskData)`

- **Descripción:** Crea una nueva tarea en el backend con los datos proporcionados.
- **Parámetros:** `taskData` - Un objeto que contiene los datos de la nueva tarea.
- **Retorno:** Devuelve la respuesta del backend.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

### `updateStatus(taskId, status, comment)`

- **Descripción:** Actualiza el estado de una tarea en el backend.
- **Parámetros:**
  - `taskId` - El ID de la tarea que se actualizará.
  - `status` - El nuevo estado de la tarea.
  - `comment` - Comentario opcional sobre el cambio de estado.
- **Retorno:** Devuelve la respuesta del backend.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

### `modifyTask(taskId, taskData)`

- **Descripción:** Modifica una tarea existente en el backend.
- **Parámetros:**
  - `taskId` - El ID de la tarea que se modificará.
  - `taskData` - Un objeto que contiene los nuevos datos de la tarea.
- **Retorno:** Devuelve la respuesta del backend.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

### `deleteTask(taskId)`

- **Descripción:** Elimina una tarea del backend.
- **Parámetros:** `taskId` - El ID de la tarea que se eliminará.
- **Retorno:** Devuelve la respuesta del backend.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

### `fetchStatusHistory(taskId)`

- **Descripción:** Obtiene el historial de estados de una tarea del backend.
- **Parámetros:** `taskId` - El ID de la tarea cuyo historial se solicitará.
- **Retorno:** Devuelve un array de objetos que representan el historial de estados de la tarea.
- **Manejo de Errores:** Registra y relanza cualquier error ocurrido durante la solicitud.

# taskListScript.vue

Este archivo contiene la lógica de la interfaz de usuario para gestionar tareas.

## Importaciones

- **moment:** Una biblioteca para manejar fechas y horas.
- **Servicios:** Se importan funciones de servicios para interactuar con el backend, como `fetchTasks`, `updateStatus`, `createTask`, `modifyTask`, `deleteTask`, `fetchStatusHistory`.

## Datos y Variables

- **tasks:** Almacena la lista de tareas.
- **headers:** Define las columnas de la tabla de datos.
- **selectedTaskToEditStatus:** Almacena la tarea seleccionada para editar su estado.
- **selectedTaskToEdit:** Almacena la tarea seleccionada para editar.
- **selectedStatus:** Almacena el estado seleccionado para la tarea.
- **comment:** Almacena el comentario ingresado por el usuario.
- **statusOptions:** Opciones disponibles para el estado de la tarea.
- **itemsPerPageText:** Texto para la paginación.
- **footerProps:** Propiedades del pie de página de la tabla.
- **createTaskDialog, modifyTaskDialog, confirmDeleteDialog, historyDialog:** Controlan la visibilidad de los diálogos modales.
- **newTask, editTask:** Almacenan los datos de una nueva tarea y de una tarea editada, respectivamente.
- **datePicker, editDatePicker:** Controlan la visibilidad de los selectores de fecha.
- **confirmedTaskId, selectedTaskToEditId:** Almacenan los ID de las tareas confirmadas y seleccionadas para editar, respectivamente.
- **selectedDate:** Almacena la fecha seleccionada.
- **statusHistory:** Almacena el historial de estados de una tarea.
- **historyHeaders:** Define las columnas de la tabla de historial de estados.

## Métodos

- **loadTasks:** Carga las tareas al iniciar el componente.
- **paginationText:** Genera el texto de paginación.
- **shuffleArray:** Baraja un array aleatoriamente.
- **updateDateDiff:** Actualiza la diferencia de tiempo entre fechas.
- **getTimeDifference:** Calcula la diferencia de tiempo entre dos fechas.
- **getDateClass:** Devuelve una clase CSS según la fecha.
- **getStatusClass:** Devuelve una clase CSS según el estado.
- **selectTask, selectTaskForEdit:** Selecciona una tarea para editar o modificar su estado.
- **closeDialog:** Cierra el diálogo de selección de estado.
- **updateStatus:** Actualiza el estado de una tarea.
- **openCreateTaskForm, closeCreateTaskForm:** Abre y cierra el diálogo para crear una nueva tarea.
- **showDatePicker, closeDatePicker, setFechaVencimiento:** Muestra, oculta y establece la fecha de vencimiento.
- **createTask:** Crea una nueva tarea.
- **closeModifyTaskForm, setEditFechaVencimiento, modifyTask:** Cierra el formulario de modificación, establece la fecha de vencimiento y modifica una tarea existente.
- **confirmDeleteTask, closeConfirmDeleteDialog, deleteTask:** Solicita confirmación, cierra el diálogo y elimina una tarea.
- **fetchStatusHistory:** Obtiene el historial de estados de una tarea.
- **formatDate:** Formatea una fecha en un formato legible.

## Ciclo de Vida

- **created:** Carga las tareas al iniciar el componente.

## Computados

- **taskColors:** Calcula los colores de fondo de las filas de la tabla de tareas.

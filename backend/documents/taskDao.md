# Archivo task.dao.js

Este archivo contiene la definición de la clase `taskDao`, que se encarga de interactuar con la base de datos para realizar operaciones relacionadas con las tareas, como recuperar tareas, crear, editar, actualizar estados, eliminar tareas y obtener el historial de estados de una tarea.

## Dependencias

- **Task:** Modelo de Sequelize que representa la tabla de tareas en la base de datos.
- **Status:** Modelo de Sequelize que representa la tabla de estados en la base de datos.
- **StatusHistory:** Modelo de Sequelize que representa la tabla de historial de estados en la base de datos.
- **moment-timezone:** Librería para manipular, analizar y mostrar fechas y horas en JavaScript.

## Métodos

- **findAllTasks():** Recupera todas las tareas de la base de datos junto con sus estados correspondientes.
- **createTask(taskData):** Crea una nueva tarea en la base de datos.
- **editTaskById(taskId, taskData):** Modifica el contenido de una tarea existente en la base de datos.
- **editTaskStatusById(taskId, status, comment):** Modifica el estado de una tarea existente en la base de datos y crea una nueva entrada en el historial de estados.
- **deleteTaskById(taskId):** Elimina una tarea de la base de datos.
- **getTaskStatusHistory(taskId):** Obtiene el historial de estados de una tarea específica.

## Flujo de trabajo

- **Transformación de tareas:** Las tareas recuperadas de la base de datos se transforman para incluir el nombre del estado directamente en el objeto de tarea.
- **Gestión de fechas:** Se ajusta la zona horaria de las fechas y horas antes de guardarlas en la base de datos para asegurar la consistencia en la aplicación.

## Manejo de errores

- Se implementa un manejo de errores para capturar y gestionar los errores que puedan ocurrir durante la ejecución de las operaciones de base de datos.
- Los errores se registran en la consola para facilitar la depuración y el seguimiento.

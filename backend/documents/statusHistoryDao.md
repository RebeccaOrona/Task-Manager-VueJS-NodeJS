# Archivo statusHistory.dao.js

Este archivo contiene la definición de la clase `statusHistoryDao`, que se encarga de interactuar con la base de datos para realizar operaciones relacionadas con el historial de estados, como recuperar todos los registros de historial y eliminar un registro de historial por su ID.

## Dependencias

- **StatusHistory:** Modelo de Sequelize que representa la tabla de historial de estados en la base de datos.

## Métodos

- **findAllLogs():** Recupera todos los registros de historial de la base de datos.
- **deleteStatusLogById(lid):** Elimina un registro de historial de la base de datos por su ID.

## Flujo de trabajo

- **Recuperación de registros:** Los registros de historial se recuperan de la base de datos y se devuelven como un arreglo de objetos.
- **Eliminación de registros:** Se elimina un registro de historial de la base de datos según su ID.

## Manejo de errores

- Se implementa un manejo de errores para capturar y gestionar los errores que puedan ocurrir durante la ejecución de las operaciones de base de datos.
- Los errores se registran en la consola para facilitar la depuración y el seguimiento.

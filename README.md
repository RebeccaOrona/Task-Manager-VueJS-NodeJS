# Sistema de Gestión de Tareas con Historial de Estados

## Resumen

Desarrollamos una aplicación web para gestionar tareas que permite a los usuarios crear, listar, modificar, eliminar y seguir el historial de estados de cada tarea. Cada tarea tiene un título, descripción, fecha de creación, fecha de vencimiento y estado.

## Requisitos Técnicos

### Backend

- Utilizamos Node.js y Express para crear el servidor.
- Implementamos una API REST para gestionar las tareas, incluyendo operaciones CRUD y el manejo del historial de estados.
- Utilizamos MSSQL (SQL Server) para interactuar con la base de datos.

### Frontend

- Utilizamos Vue.js y Vuetify para el desarrollo del frontend.
- La interfaz permite realizar todas las operaciones de CRUD en las tareas, así como visualizar y registrar cambios en el historial de estados.

### Documentación

- Documentamos el diseño de la base de datos.
- Documentamos los endpoints de la API.

## Configuración y Ejecución del Proyecto

1. Clona el repositorio desde GitHub:

   ```bash
   git clone https://github.com/tu_usuario/tu_proyecto.git

   ```

2. Configura el entorno de desarrollo:
   cd tu_proyecto
   npm install / yarn install

3. Configura y ejecuta el backend:
   cd backend
   npm start / yarn serve

4. Configura y ejecuta el frontend:
   cd frontend
   npm install / yarn install
   npm run serve / yarn serve

## Diseño de la Base de Datos

### Tabla Tareas

- **Id:** Clave primaria
- **Titulo**
- **Descripción**
- **Fecha de Creación**
- **Fecha de Vencimiento**
- **EstadoId:** Clave foránea

### Tabla Estados

- **Id:** Clave primaria
- **Nombre:** (por ejemplo, pendiente, en progreso, completada)

### Tabla HistorialEstados

- **Id:** Clave primaria
- **TareaId:** Clave foránea relacionada con la Tabla Tareas
- **EstadoId:** Clave foránea relacionada con la Tabla Estados
- **Fecha de Cambio**
- **Comentario:** (opcional)

## Funcionalidad de la API REST

- Endpoints para manejar tareas (CRUD)
  - `GET /api/tareas/{id}/historial`: para obtener el historial de estados.
  - `POST /api/tareas/{id}/cambiar_estado`: para actualizar el estado de una tarea, incluyendo la creación de un registro en el historial.

## Interfaz de Usuario

- Funcionalidad completa para gestionar tareas.
- Sección para visualizar el historial de estados de cada tarea.

## Formulario para Cambiar el Estado de las Tareas

- Con opción para añadir un comentario.

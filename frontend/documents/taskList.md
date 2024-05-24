# Tasklist.vue

Este archivo contiene la implementación de la interfaz de usuario para gestionar tareas. Utiliza Vue.js y Vuetify para el desarrollo del frontend.

## Estructura del Archivo

- **Template:** Contiene la estructura HTML de la interfaz de usuario.
- **Script:** Importa el script `taskListScript.vue`, que contiene la lógica de la funcionalidad de la tarea.
- **Estilos:** Importa los estilos específicos de la tarea.

## Componentes Principales

### Botón para Crear Nueva Tarea

Un botón que permite al usuario crear una nueva tarea.

### Tabla de Datos

Utiliza el componente `v-data-table` de Vuetify para mostrar una lista de tareas con funcionalidades de paginación y selección.

### Diálogos

- **Historial de Estados:** Muestra el historial de estados de una tarea en un diálogo modal.
- **Crear Tarea:** Permite al usuario crear una nueva tarea en un diálogo modal.
- **Modificar Tarea:** Permite al usuario modificar una tarea existente en un diálogo modal.
- **Confirmar Eliminación:** Solicita al usuario confirmación antes de eliminar una tarea.
- **Seleccionar Estado:** Permite al usuario seleccionar un estado y agregar un comentario en un diálogo modal.

## Script

Importa el script `taskListScript.vue`, que contiene la lógica para manejar eventos y funcionalidades de la interfaz de usuario.

## Estilos

Aplica estilos específicos para la interfaz de usuario de la tarea.

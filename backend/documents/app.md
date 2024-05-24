# Archivo app.js

Este archivo es el punto de entrada principal de la aplicación. Configura y arranca el servidor Express, sincroniza la base de datos utilizando Sequelize, y establece las rutas para los endpoints de la API.

## Dependencias

- **express:** Framework web para Node.js que se utiliza para construir el servidor HTTP.
- **http:** Módulo nativo de Node.js que proporciona funcionalidades para crear un servidor HTTP.
- **cors:** Middleware de Express que permite el intercambio de recursos entre diferentes dominios.
- **path:** Módulo nativo de Node.js para trabajar con rutas de archivos y directorios.
- **cookie-parser:** Middleware de Express para analizar las cookies de las solicitudes HTTP.
- **sequelize:** ORM para Node.js que se utiliza para interactuar con la base de datos SQL.
- **passport:** Middleware de autenticación para Express.

## Configuración del Servidor

- **app:** Instancia de Express que representa la aplicación web.
- **PORT:** Puerto en el que se ejecutará el servidor, obtenido de la variable de entorno `process.env.PORT` o 8080 por defecto.
- **httpServer:** Servidor HTTP creado con el módulo `http`.

## Inicialización de Sequelize

- Se verifica la conexión con la base de datos utilizando `sequelize.authenticate()`.
- Se sincronizan los modelos con la base de datos utilizando `sequelize.sync()`.

## Middlewares y Rutas

- Se configuran los middlewares de Express, como `express.json()` para analizar las solicitudes JSON y `cors()` para permitir solicitudes desde diferentes dominios.
- Se establecen rutas para los endpoints de la API, como `/api/users`, `/api/tasks` y `/api/statusHistory`, utilizando los routers `userRouter`, `taskRouter` y `statusHistoryRouter` respectivamente.
- Se sirven archivos estáticos desde el directorio `public` utilizando `express.static()`.

## Inicio del Servidor

- Se inicia el servidor HTTP en el puerto especificado con `httpServer.listen()`.

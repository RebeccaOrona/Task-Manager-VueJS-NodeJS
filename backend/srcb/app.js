import e from "express";
import http from "http";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.config.js";
import { serverLogger } from "./middlewares/logger.js";
import sequelize from "./config/sequelize.config.js";
import __dirname from "./utils/utils.js";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";
import statusHistoryRouter from "./routes/statusHistory.router.js";

const app = e();
const PORT = process.env.PORT || 8080;
// Inicializacion de Express
const httpServer = http.createServer(app);
// Inicializacion de Sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to SQL Server");
  } catch (error) {
    console.error("Connection failed:", error);
  }
})();
// Sincronizar todos los modelos a la base de datos
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });

// Configurar el json para manejar los datos JSON
app.use(e.json());
// Configurar el cors para permitir el acceso a la API desde cualquier parte del mundo
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Configurar el static para el directorio public
app.use(
  e.static(path.join(__dirname, "public"), {
    setHeaders: (res) => {
      res.set("Content-Type", "application/javascript");
    },
  })
);

// Aplicar el cookie-parser para manejar las cookies
app.use(cookieParser());
// Inicializar el Passport
initializePassport();

// Configurar el router para /api/users
app.use("/api/users", userRouter);
// Configurar el router para /api/tasks
app.use("/api/tasks", taskRouter);
// Configurar el router para /api/statusHistory
app.use("/api/statusHistory", statusHistoryRouter);

// Verificacion de inicializacion de la aplicacion
httpServer.listen(PORT, () => {
  serverLogger.info(`Server is running on port ${PORT}`);
});

export default app;

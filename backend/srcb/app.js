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

app.use(e.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(
  e.static(path.join(__dirname, "public"), {
    setHeaders: (res) => {
      res.set("Content-Type", "application/javascript");
    },
  })
);

app.use(cookieParser());
initializePassport();

// app.use(passport.initialize());

// Configurar el router para /api/users
app.use("/api/users", userRouter);
// Configurar el router para /api/tasks
app.use("/api/tasks", taskRouter);
// Configurar el router para /api/statusHistory
app.use("/api/statusHistory", statusHistoryRouter);

httpServer.listen(PORT, () => {
  serverLogger.info(`Server is running on port ${PORT}`);
});

export default app;

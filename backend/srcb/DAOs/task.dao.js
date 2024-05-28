import Task from "../models/tasks.model.js";
import Status from "../models/status.model.js";
import StatusHistory from "../models/statusHistory.model.js";
import moment from "moment-timezone";

class taskDao {
  // Get de todas las tareas
  async findAllTasks() {
    try {
      const tasks = await Task.findAll({
        attributes: [
          "id",
          "Titulo",
          "Descripcion",
          "FechaCreacion",
          "FechaVencimiento",
        ],
        include: {
          model: Status,
          attributes: ["Nombre"],
        },
        order: [["FechaCreacion", "ASC"]],
      });
      // Transform tasks to assign Estado.Nombre directly to Estado
      const transformedTasks = tasks.map((task) => {
        const taskJson = task.toJSON(); // Convert the Sequelize instance to a plain object
        return {
          ...taskJson,
          Estado: taskJson.Estado.Nombre, // Assign Estado.Nombre to Estado
        };
      });
      console.log(transformedTasks);
      return transformedTasks;
    } catch (error) {
      console.error("Error finding tasks: ", error);
    }
  }

  // Crear una tarea
  async createTask(taskData) {
    try {
      let estadoId;
      console.log(taskData);
      // Establece el valor de EstadoId segun el status recibido
      if (taskData.Estado == "Pendiente") {
        estadoId = 1;
      } else if (taskData.Estado == "En progreso") {
        estadoId = 2;
      } else if (taskData.Estado == "Completada") {
        estadoId = 3;
      } else {
        throw new Error("Invalid status value");
      }
      // Obtener la fecha y hora actual
      let currentDate = new Date();

      // Adjustar la zona horaria a UTC-3:00
      let offsetInMilliseconds = 3 * 60 * 60 * 1000; // 3 horas en milisegundos
      let dateWithOffset = new Date(
        currentDate.getTime() - offsetInMilliseconds
      );
      console.log(dateWithOffset);

      // Formatear la fecha de vencimiento si es una cadena
      let formattedDeadline = taskData.FechaVencimiento;
      if (typeof formattedDeadline === "string") {
        formattedDeadline = new Date(taskData.FechaVencimiento);
      }

      const createdTask = await Task.create({
        Titulo: taskData.Titulo,
        Descripcion: taskData.Descripcion,
        FechaCreacion: dateWithOffset,
        FechaVencimiento: formattedDeadline,
        EstadoId: estadoId,
      });
      console.log("createdTask: " + createdTask);
      return { message: "Task created successfully", task: createdTask };
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  }

  // Modificar el contenido de una tarea
  async editTaskById(taskId, taskData) {
    try {
      let response = await Task.update(
        {
          Titulo: taskData.Titulo,
          Descripcion: taskData.Descripcion,
          FechaVencimiento: taskData.FechaVencimiento,
        },
        {
          where: { id: taskId },
        }
      );
      return {
        message: "Task updated successfully",
        status: 201,
        response: response,
      };
    } catch (error) {
      console.error("Error updating task: ", error);
      throw error;
    }
  }

  // Modificar el estado de una tarea
  async editTaskStatusById(taskId, status, comment) {
    try {
      // Mapeo el string del estado a statusId
      let statusId;
      switch (status) {
        case "Pendiente":
          statusId = 1;
          break;
        case "En progreso":
          statusId = 2;
          break;
        case "Completada":
          statusId = 3;
          break;
        default:
          throw new Error("Invalid status");
      }
      // Update the task status
      const [updatedRowsCount] = await Task.update(
        { EstadoId: statusId },
        {
          where: { id: taskId },
        }
      );

      if (updatedRowsCount === 0) {
        console.log("No task found with the given ID.");
        return null;
      }
      // Obtener la fecha y hora actual
      let currentDate = new Date();

      // Adjustar la zona horaria a UTC-3:00
      let offsetInMilliseconds = 3 * 60 * 60 * 1000; // 3 horas en milisegundos
      let dateWithOffset = new Date(
        currentDate.getTime() - offsetInMilliseconds
      );
      console.log(dateWithOffset);

      // Crear una nueva entrada de historial de estado
      const newStatusHistory = await StatusHistory.create({
        TareaId: taskId,
        EstadoId: statusId,
        FechaCambio: dateWithOffset,
        Comentario: comment,
      });

      console.log(
        "Task status updated and status history entry created:",
        newStatusHistory
      );
      return newStatusHistory;
    } catch (error) {
      console.error("Error updating task's status: ", error);
    }
  }

  // Eliminar una tarea
  async deleteTaskById(taskId) {
    try {
      const deletedTask = await Task.destroy({
        where: { id: taskId },
      });

      if (deletedTask === 0) {
        throw new Error("Task not found or already deleted");
      }

      console.log("Task deleted successfully");
      return { message: "Task deleted successfully" };
    } catch (error) {
      console.error("Error deleting task: ", error);
      throw error;
    }
  }

  async getTaskStatusHistory(taskId) {
    try {
      const history = await StatusHistory.findAll({
        where: { TareaId: taskId },
      });

      if (history.length === 0) {
        return {
          message: "No history found for the specified task.",
          status: 404,
        };
      }
      return history;
    } catch (error) {
      console.error("Error fetching history for task: ", error);
      throw error;
    }
  }
}
export default taskDao;

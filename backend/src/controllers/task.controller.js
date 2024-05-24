import { taskService } from "../repositories/index.js";
// import { authorization } from "@/middlewares/authorization";

// authorization("usuario")

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.findAllTasks();
    res.send(tasks);
  } catch (error) {
    // req.logger.error("Cannot get products with sequelize: "+error)
    res.status(500).json({ error: "Failed to get tasks" });
  }
};

// Crear una tarea
export const createTask = async (req, res) => {
  try {
    const newTask = req.body;
    console.log("Received taskData:", newTask);

    // Crear la tarea
    const createdTask = await taskService.createTask(newTask);

    console.log("createdTask taskcontroller: ", createdTask);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const editTaskById = async (req, res) => {
  try {
    const taskData = req.body.taskData;
    const taskId = req.params.tid;
    console.log("Received taskData:", taskData);
    console.log("taskId: " + taskId);
    const response = await taskService.editTaskById(taskId, taskData);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error modifying task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const editTaskStatusById = async (req, res) => {
  try {
    let comment;
    if (req.body.comment != "") {
      comment = req.body.comment || "";
    }
    const status = req.body.status;
    const taskId = req.params.tid;
    console.log("status: " + JSON.stringify(status));
    console.log("taskId: " + taskId);
    console.log("comment: " + comment);
    const updatedTask = await taskService.editTaskStatusById(
      taskId,
      status,
      comment
    );
    res.send(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task's status" });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.tid;
    console.log("Task ID to delete:", taskId);
    const deletedTask = await taskService.deleteTaskById(taskId);
    res.send(deletedTask);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.sendStatus(500).json({ error: "Failed to delete task" });
  }
};

export const getTaskStatusHistory = async (req, res) => {
  try {
    const taskId = req.params.tid;
    console.log("Task ID to get history:", taskId);
    const history = await taskService.getTaskStatusHistory(taskId);
    res.json(history);
  } catch (error) {
    // req.logger.error("Cannot get products with sequelize: "+error)
    res.status(500).json({ error: "Failed to get task's history" });
  }
};

import instance from "srcf/plugins/axios";
import moment from "moment";

export const fetchTasks = async () => {
  try {
    const response = await instance.get("tasks/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    console.log("taskData", taskData);
    const formattedTaskData = {
      ...taskData,
      FechaVencimiento: moment(taskData.FechaVencimiento).format(),
    };
    const response = await instance.post(
      "tasks/crear_tarea",
      formattedTaskData
    );
    console.log("response taskservice: ", response);
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateStatus = async (taskId, status, comment) => {
  try {
    const response = await instance.post(`tasks/${taskId}/cambiar_estado`, {
      status,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const modifyTask = async (taskId, taskData) => {
  try {
    console.log("taskId:", taskId);
    console.log("taskData:", taskData);
    const response = await instance.put(`tasks/${taskId}/editar_tarea`, {
      taskData,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await instance.delete(`tasks/${taskId}/eliminar_tarea`);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const fetchStatusHistory = async (taskId) => {
  try {
    const response = await instance.get(`tasks/${taskId}/historial`);
    console.log("response status history: ", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching status history:", error);
    throw error;
  }
};

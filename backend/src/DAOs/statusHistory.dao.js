import StatusHistory from "../models/statusHistory.model.js";

class statusHistoryDao {
  // Get de todas las tareas
  async findAllLogs() {
    try {
      const history = await StatusHistory.findAll();

      console.log(history);
      return history;
    } catch (error) {
      console.error("Error finding history: ", error);
    }
  }

  // // Eliminar un registro de estado
  async deleteStatusLogById(lid) {
    try {
      const deletedLog = StatusHistory.destroy({ where: { id: lid } });
      if (deletedLog === 0) {
        throw new Error("Log not found or already deleted");
      }
      console.log("Log deleted successfully");
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  }
}

export default statusHistoryDao;

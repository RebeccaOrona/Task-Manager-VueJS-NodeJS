import { statusHistoryService } from "../repositories/index.js";

export const getAllLogs = async (req, res) => {
  try {
    const tasks = await statusHistoryService.findAllLogs();
    console.log("statusHistoryService.findAllLogs", tasks);
    res.send(tasks);
  } catch (error) {
    // req.logger.error("Cannot get products with sequelize: "+error)
    res.status(500).json({ error: "Failed to get tasks" });
  }
};

export const deleteStatusLogById = async (req, res) => {
  try {
    const { lid } = req.params;
    await statusHistoryService.deleteStatusLogById(lid);
    res.send({ message: "Status log deleted" });
  } catch (error) {
    // req.logger.error("Cannot delete product with sequelize: "+error)
    res.status(500).json({ error: "Failed to delete status log" });
  }
};

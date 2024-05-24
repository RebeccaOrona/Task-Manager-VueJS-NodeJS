import statusHistoryDao from "../DAOs/statusHistory.dao.js";

export default class statusHistoryRepository {
  constructor() {
    this.dao = new statusHistoryDao();
  }

  findAllLogs = async () => {
    return await this.dao.findAllLogs();
  };

  deleteStatusLogById = async (sid) => {
    return await this.dao.deleteStatusLogById(sid);
  };
}

import statusDao from "../DAOs/status.dao.js"
import statusHistoryDao from "../DAOs/statusHistory.dao.js"
import taskDao from "../DAOs/task.dao.js"
import userDao from "../DAOs/user.dao.js"
import taskRepository from "./task.repository.js"
import statusRepository from "./status.repository.js"
import userRepository from "./user.repository.js"
import statusHistoryRepository from "./statusHistory.repository.js"

export const taskService = new taskRepository(taskDao)
export const statusService = new statusRepository(statusDao)
export const userService = new userRepository(userDao)
export const statusHistoryService = new statusHistoryRepository(statusHistoryDao)

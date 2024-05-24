import taskDao from "../DAOs/task.dao.js";


export default class taskRepository{
    constructor(){
        this.dao = new taskDao()
    }

    findAllTasks = async() => {
        return await this.dao.findAllTasks();
    }
    
    createTask = async(taskData) => {
        return await this.dao.createTask(taskData);
    }

    editTaskById = async(taskId, taskData) => {
        return await this.dao.editTaskById(taskId , taskData);
    }

    deleteTaskById = async(taskId) => {
        return await this.dao.deleteTaskById(taskId);
    }

    editTaskStatusById = async(taskId, status, comment) => {
        return await this.dao.editTaskStatusById(taskId, status, comment);
    }

    getTaskStatusHistory = async(taskId) => {
        return await this.dao.getTaskStatusHistory(taskId);
    }
}
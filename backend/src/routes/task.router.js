import { Router } from 'express';
import { createTask, deleteTaskById, getAllTasks, editTaskById, editTaskStatusById, getTaskStatusHistory  } from '../controllers/task.controller.js';


const taskRouter = Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:tid/historial', getTaskStatusHistory)
taskRouter.post('/crear_tarea', createTask);
taskRouter.put('/:tid/editar_tarea', editTaskById);
taskRouter.post('/:tid/cambiar_estado', editTaskStatusById);
taskRouter.delete('/:tid/eliminar_tarea', deleteTaskById);

// passportCall('jwt')
// taskRouter




export default taskRouter;
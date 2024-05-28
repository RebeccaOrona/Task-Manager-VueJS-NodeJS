<script>
import moment from 'moment';
import { fetchTasks, updateStatus, createTask, modifyTask, deleteTask, fetchStatusHistory } from '../services/taskService.js';

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      headers: [
        { title: 'ID', value: 'id' },
        { title: 'Título', value: 'Titulo' },
        { title: 'Descripción', value: 'Descripcion' },
        { title: 'Estado', value: 'Estado' },
        { title: 'Fecha de Creación', value: 'FechaCreacion' },
        { title: 'Fecha de Vencimiento', value: 'FechaVencimiento' },
        { text: 'Modificar', value: 'Modify', sortable: false },
        { text: 'Eliminar', value: 'Delete', sortable: false }, 
      ],
      dialog: false,
      selectedTaskToEditStatus: null,
      selectedTaskToEdit: null,
      selectedStatus: '',
      comment: '',
      statusOptions: ["Pendiente", "En progreso", "Completada"],
      itemsPerPageText: 'Elementos por página',
      footerProps: {
        'items-per-page-options': [10, 25, 50, -1],
        'items-per-page-text': 'Elementos por página',
      }, 
      createTaskDialog: false,
      modifyTaskDialog: false,
      confirmDeleteDialog: false,
      newTask: {
        Titulo: '',
        Descripcion: '',
        Estado: '',
        FechaCreacion: moment().format('DD/MM/YYYY'),
        FechaVencimiento: new Date(), 
      },
      datePicker: false,
      editTask: {
        Titulo: '',
        Descripcion: '',
        Estado: '',
        FechaCreacion: moment().format('DD/MM/YYYY'),
        FechaVencimiento: new Date(),
      },
      confirmedTaskId: null,
      selectedDate: null,
      editDatePicker: false,
      selectedTaskToEditId: null,
      historyDialog: false,
      statusHistory: [],
      historyHeaders: [
        { title: 'Fecha de Cambio', value: 'FechaCambio' },
        { title: 'Comentario', value: 'Comentario' },
      ],
    };
  },
  async created() {
    try {
      const tasks = await fetchTasks();
    
      this.tasks = tasks;

      this.updateDateDiff();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  },
  computed: {
    taskColors() {
      const shades = ['fbf0f0','fbeaea', 'fbe4e4', 'fadddd'];
      // Check if tasks array is empty or not an array
      if (!Array.isArray(this.tasks) || this.tasks.length === 0) {
        return [];
      }
      const palindromicShades = [...shades, ...shades.slice(0, -1).reverse()];
      return Array.from({ length: this.tasks.length }, (_, index) => {
        const shadeIndex = index % palindromicShades.length;
        return `#${palindromicShades[shadeIndex]}`;
      });
      // return this.tasks.map((task, index) => {
      //   const shadeIndex = index % palindromicShades.length;
      //   return `#${palindromicShades[shadeIndex]}`;
      // });
    },
  },
  methods: {
    async loadTasks() {
      this.tasks = await fetchTasks();
    },
    paginationText(pageStart, pageStop, itemsLength) {
      return `${pageStart} - ${pageStop} de ${itemsLength}`;
    },
    shuffleArray(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    },
    updateDateDiff() {
      this.tasks.forEach(task => {
        const created = moment(task.FechaCreacion);
        const deadline = moment(task.FechaVencimiento);
        const now = moment();

        // Actualizar FechaCreacion
        task.FechaCreacion = `Hace ${this.getTimeDifference(created, now)}`;

          // Actualizar FechaVencimiento
          const timeLeft = deadline.isAfter(now) ? this.getTimeDifference(now, deadline) : this.getTimeDifference(deadline, now);
          task.FechaVencimiento = deadline.isAfter(now) ? `En ${timeLeft}` : `Expiró hace ${timeLeft}`;
        
      });
    },
    getTimeDifference(start, end) {
      const diffMinutes = end.diff(start, 'minutes');
      if (diffMinutes < 60) {
        return `${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`;
      }
      const diffHours = end.diff(start, 'hours');
      if (diffHours < 24) {
        return `${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
      }
      const diffDays = end.diff(start, 'days');
      if (diffDays < 30) {
        return `${diffDays} día${diffDays !== 1 ? 's' : ''}`;
      }
      const diffMonths = end.diff(start, 'months');
      if (diffMonths < 12) {
        return `${diffMonths} mes${diffMonths !== 1 ? 'es' : ''}`;
      }
      const diffYears = end.diff(start, 'years');
      return `${diffYears} año${diffYears !== 1 ? 's' : ''}`;
    },
    getDateClass(dateString) {
      if (dateString.includes('Expiró hace')) {
        return 'expired';
      } else if (dateString.includes('En')) {
        return 'upcoming';
      } else {
        return 'recent';
      }
    },
    getStatusClass(status) {
      switch(status) {
        case 'Completada':
          return 'status-completada';
        case 'Pendiente':
          return 'status-pendiente';
        case 'En progreso':
          return 'status-en-progreso';
        default:
          return '';
      }
    },
    selectTask(task) {
      this.selectedTaskToEditStatus = task;
      this.selectedStatus = task.Estado;
      this.dialog = true;
    },
    selectTaskForEdit(task) {
      this.selectedTaskToEdit = task;
      this.selectedTaskToEditId = task.id;
      this.modifyTaskDialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.selectedTaskToEditStatus = null;
      this.selectedStatus = '';
    },
    async updateStatus() {
      if (!this.selectedTaskToEditStatus) return;

      try {
        const updatedTask = await updateStatus(this.selectedTaskToEditStatus.id, this.selectedStatus, this.comment);
        const taskIndex = this.tasks.findIndex(task => task.id === this.selectedTaskToEditStatus.id);
        if (taskIndex !== -1) {
          let status;
          switch (updatedTask.EstadoId) {
            case 1:
              status = "Pendiente";
              break;
            case 2:
              status = "En progreso";
              break;
            case 3:
              status = "Completada";
              break;
            default:
              throw new Error("Invalid status");
          }
          this.tasks[taskIndex].Estado = status;
        }
        this.closeDialog();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    },
    openCreateTaskForm() {
      this.createTaskDialog = true;
    },
    closeCreateTaskForm() {
      this.createTaskDialog = false;
      // Reset newTask object
      this.newTask = {
        Titulo: '',
        Descripcion: '',
        Estado: '',
        FechaCreacion: moment().format('DD/MM/YYYY'),
        FechaVencimiento: new Date(),
      };
    },
    showDatePicker() {
      this.datePicker = true;
    },
    closeDatePicker() {
      this.datePicker = false;
    },
    setFechaVencimiento(date) {
      this.newTask.FechaVencimiento = moment(date).format('DD/MM/YYYY');
      this.datePicker = false;
    },
    async createTask() {
      try {
        this.newTask.FechaVencimiento = moment(this.newTask.FechaVencimiento).toISOString();
        console.log('newTask: ', this.newTask);
        // Call createTask service method with newTask data
        let response = await createTask(this.newTask);
        console.log('response: ', response);
        if (response.status == '201') {
          this.tasks = await fetchTasks();
        } else {
          console.error('Error: Task not created successfully');
        }
        // Close the create task dialog
        this.closeCreateTaskForm();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    closeModifyTaskForm() {
      this.modifyTaskDialog = false;
      this.editTask = {
        Titulo: '',
        Descripcion: '',
        Estado: '',
        FechaCreacion: moment().format('DD/MM/YYYY'),
        FechaVencimiento: new Date(),
      };
    },
    setEditFechaVencimiento(date) {
      this.editTask.FechaVencimiento = moment(date).format('DD/MM/YYYY');
      this.editDatePicker = false;
    },
    async modifyTask() {
      try {
        console.log('editTask id: ', this.selectedTaskToEditId);
        const formattedTask = { 
          Titulo: this.editTask.Titulo,
          Descripcion: this.editTask.Descripcion,
          FechaVencimiento: this.editTask.FechaVencimiento,
        };
        console.log('formattedTask:', formattedTask);
        let response = await modifyTask(this.selectedTaskToEditId, formattedTask);
        console.log('response: ', response);
        if (response.status == '201') {
          this.tasks = await fetchTasks();
          this.closeModifyTaskForm();
        } else {
          console.error('Error: Task not created successfully');
        }
        this.updateDateDiff();
      } catch (error) {
        console.error('Error modifying task:', error);
      }
    },
    confirmDeleteTask(taskId) { 
      this.confirmedTaskId = taskId;
      this.confirmDeleteDialog = true;
    },
    closeConfirmDeleteDialog() {
      this.confirmDeleteDialog = false;
      this.confirmedTaskId = null;
    },
    async deleteTask(taskId) {
      try {
        const response = await deleteTask(taskId);
        if (response.message === "Task deleted successfully") {
          // Only fetch tasks if deleteTask was successful
          this.tasks = await fetchTasks();
          this.closeConfirmDeleteDialog();
          this.updateDateDiff();
        } else {
          console.error('Error: Task not deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    async fetchStatusHistory(taskId) {
      try {
        const response = await fetchStatusHistory(taskId);
        this.statusHistory = response;
        console.log('statusHistory: ', this.statusHistory); 
        this.historyDialog = true;
        
      } catch (error) {
        console.error('Error fetching status history:', error);
      }
    },
    formatDate(dateString) {
      let date = moment(dateString);
      return date.format("DD MMMM YYYY, h:mm:ss a");
    },
  }
};
</script>

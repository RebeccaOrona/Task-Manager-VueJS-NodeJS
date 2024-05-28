<template>
  <v-container>
    <v-btn color="success" @click="openCreateTaskForm">
      <v-icon left>mdi-plus</v-icon>
      Crear nueva tarea
    </v-btn>
    <v-data-table 
      :headers="headers" 
      :items="tasks" 
      item-value="id" 
      class="elevation-1"
      :items-per-page="10"
      :footer-props="footerProps"
    >
    <template v-slot:footer="{ props }">
        <div class="v-data-table-footer__items-per-page">
          <span>{{ itemsPerPageText }}</span>
          <v-select
            v-model="props.itemsPerPage"
            :items="props.rowsPerPageItems"
            class="ml-2"
            dense
            hide-details
          ></v-select>
        </div>
        <div class="v-data-table-footer__pagination">
          <span>{{ paginationText(props.pageStart, props.pageStop, props.itemsLength) }}</span>
          <v-pagination
            v-model="props.page"
            :length="props.pages"
            class="ml-2"
            total-visible="7"
          ></v-pagination>
        </div>
      </template>
      <template v-slot:item="{ item, index }">
        <tr :style="{ backgroundColor: taskColors[index] }">
          <td>{{ item.id }}</td>
          <td>{{ item.Titulo }}</td>
          <td>{{ item.Descripcion }}</td>
          <td>
              <div
                :class="['status-circle', getStatusClass(item.Estado)]"
                class="hover-brighten"
                @click="selectTask(item)"
              >
                {{ item.Estado }}
              </div>
          </td>
          <td :class="getDateClass(item.FechaCreacion)">{{ item.FechaCreacion }}</td>
          <td :class="getDateClass(item.FechaVencimiento)">{{ item.FechaVencimiento }}</td>
          <td>
            <v-icon size="large" @click="selectTaskForEdit(item)">mdi-file-document-edit-outline</v-icon>
          </td>
          <td>
            <v-icon size="large" color="error" @click="confirmDeleteTask(item.id)">mdi-delete</v-icon>
          </td>
          <td>
            <v-btn color="primary" @click="fetchStatusHistory(item.id)">
              <v-icon left>mdi-history</v-icon>
              Ver Historial
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- Status History Dialog -->
    <v-dialog v-model="historyDialog" max-width="600px">
      <v-card>
        <v-card-title>Historial de Estados</v-card-title>
        <v-card-text v-if="statusHistory.length > 0">
          <v-data-table :headers="historyHeaders" :items="statusHistory" class="elevation-1">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ formatDate(item.FechaCambio) }}</td>
                <td>{{ item.Comentario || 'Sin comentarios' }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-text v-else>
          <p>No se encontró historial.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="historyDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Create Task Dialog -->
    <v-dialog v-model="createTaskDialog" max-width="500px">
      <v-card>
        <v-card-title>Nueva tarea</v-card-title>
        <v-card-text>
          <v-form ref="createTaskForm">
            <v-text-field v-model="newTask.Titulo" label="Título"></v-text-field>
            <v-text-field v-model="newTask.Descripcion" label="Descripción"></v-text-field>
            <v-select v-model="newTask.Estado" :items="statusOptions" label="Estado"></v-select>
            <v-text-field v-model="newTask.FechaCreacion" label="Fecha de Creación" readonly></v-text-field>
            <v-menu
              v-model="datePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="newTask.FechaVencimiento"
                  label="Fecha de Vencimiento"
                  readonly
                  @click="datePicker = !datePicker"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newTask.FechaVencimiento"
                @input="setFechaVencimiento"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="createTask">Crear</v-btn>
          <v-btn color="grey darken-1" @click="closeCreateTaskForm">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modify Task Dialog -->
    <v-dialog v-model="modifyTaskDialog" max-width="500px">
      <v-card>
        <v-card-title>Modificar tarea</v-card-title>
        <v-card-text>
          <v-form ref="modifyTaskForm">
            <v-text-field v-model="editTask.Titulo" label="Título"></v-text-field>
            <v-text-field v-model="editTask.Descripcion" label="Descripción"></v-text-field>
            <v-text-field v-model="selectedTaskToEdit.Estado" label="Estado" readonly></v-text-field>
            <v-text-field v-model="editTask.FechaCreacion" label="Fecha de Creación" readonly></v-text-field>
            <v-menu
              v-model="editDatePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="editTask.FechaVencimiento"
                  label="Fecha de Vencimiento"
                  readonly
                  @click="editDatePicker = !editDatePicker"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editTask.FechaVencimiento"
                @input="setEditFechaVencimiento"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="modifyTask()">Modificar</v-btn>
          <v-btn color="grey darken-1" @click="closeModifyTaskForm">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirm Delete Dialog -->
    <v-dialog v-model="confirmDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirmar Eliminación</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar esta tarea?</v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click="deleteTask(confirmedTaskId)">Eliminar</v-btn>
          <v-btn color="grey darken-1" @click="closeConfirmDeleteDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Select Status Dialog --> 
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Seleccionar estado</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedStatus"
            :items="statusOptions"
            label="Estado"
          ></v-select>
          <v-text-field
            v-model="comment"
            label="Comentario (opcional)"
            hint="Ingrese un comentario opcional"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" title @click="updateStatus">Guardar</v-btn>
          <v-btn color="grey darken-1" title @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import taskListScript from '@/script/taskListScript.vue';

export default {
  ...taskListScript
};
</script>


<style scoped>
@import '../css/taskListStyle.vue';
</style>


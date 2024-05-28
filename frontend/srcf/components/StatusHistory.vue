<template>
    <v-container class="status-history-container">
      <h2 class="title">Historial de Estados</h2>
      <v-data-table 
        :headers="headers" 
        :items="statusHistory" 
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
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.TareaId }}</td>
            <td>{{ formatDate(item.FechaCambio) }}</td>
            <td>{{ item.Comentario || 'Sin comentarios'}}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import moment from 'moment';
  import { fetchStatusHistory } from 'srcf/services/statusHistoryService.js';
  
  export default {
    data() {
      return {
        statusHistory: [],
        headers: [
            { title: 'ID', value: 'TareaId', sortable: false },
            { title: 'Fecha de Cambio', value: 'FechaCambio' },
            { title: 'Comentario', value: 'Comentario' },
        ],
        itemsPerPageText: 'Elementos por página',
        footerProps: {
            'items-per-page-options': [10, 25, 50, -1],
            'items-per-page-text': 'Elementos por página',
        },
      };
    },
    created() {
        moment.locale('es');
        this.fetchHistory();
      
    },
    methods: {
      async fetchHistory() {
        try {
          const history = await fetchStatusHistory();
          console.log(history);
          this.statusHistory = history;
        } catch (error) {
          console.error('Error fetching status history:', error);
        }
      },
      paginationText(pageStart, pageStop, itemsLength) {
        return `${pageStart} - ${pageStop} de ${itemsLength}`;
      },
      formatDate(dateString) {
        let date = moment(dateString);
        return date.format("DD/MM/YYYY, h:mm:ss a");
        // let localeDate = new Date(dateString);
        // let offsetInMilliseconds = 3 * 60 * 60 * 1000; // 3 horas en milisegundos
        // let dateWithOffset = new Date(localeDate.getTime() - offsetInMilliseconds);
        // return dateWithOffset
      },
    },
  };
  </script>
  
  <style scoped>
  .status-history-container {
    background-color: #fbf0f0; /* Match the drawer background color */
    padding: 20px;
    border-radius: 10px; /* Rounded corners for the container */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for the container */
  }
  
  .title {
    text-align: center;
    color: #313131; /* Dark text color */
    margin-bottom: 20px;
    font-size: 2em;
    font-weight: bold;
  }
  
  .v-data-table-header th {
    background-color: #e0e0e0; /* Light grey background for table headers */
    color: #313131; /* Dark text color for table headers */
  }
  
  .v-data-table {
    background-color: #fff; /* White background for the table */
    border-radius: 10px; /* Rounded corners for the table */
  }
  
  .v-data-table-footer__items-per-page,
  .v-data-table-footer__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .v-select {
    max-width: 100px;
  }
  
  .ml-2 {
    margin-left: 8px;
  }
  
  .elevation-1 {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for the table */
  }
  </style>
  
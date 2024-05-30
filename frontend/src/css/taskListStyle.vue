
.v-data-table-footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-circle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 30px;
  padding: 0 10px;
  border-radius: 15px; 
  background-color: var(--status-color);
  color: white;
  font-weight: bold;
  white-space: nowrap;
}
.status-completada {
  --status-color: rgba(0, 128, 0, 0.656);
}
.status-pendiente {
  --status-color: rgba(255, 166, 0, 0.674);
}
.status-en-progreso {
  --status-color: rgba(0, 0, 255, 0.678);
}
.hover-brighten:hover {
  filter: brightness(1.2);
}
.expired {
  color: red;
}
.upcoming {
  color: green;
}
.recent {
  color: rgb(17, 139, 253);
}
.v-data-table-footer__items-per-page {
  display: flex;
  align-items: center;
}
.v-data-table-footer__pagination {
  display: flex;
  align-items: center;
}

import Status from "../models/status.model.js";

class statusDao {

// Crear un estado
async createStatus(name) { 
  Status.create({ Nombre: name})
  .then(status => {
    console.log('Created status:', status);
  })
  .catch(error => {
    console.error('Error creating status:', error);
  });
}

// Actualizar un estado
async updateStatus(statusData, sid) {
    Status.update({ Nombre: statusData.name }, { where: { id: sid } }).then(() => {
      console.log('Status updated successfully');
  }).catch(error => {
      console.error('Error updating status:', error);
  });
}

// Eliminar un estado
async deleteStatus(sid) {  
Status.destroy({ where: { id: sid } }).then(() => {
  console.log('Status deleted successfully');
}).catch(error => {
  console.error('Error deleting status:', error);
});
}

}


export default statusDao;


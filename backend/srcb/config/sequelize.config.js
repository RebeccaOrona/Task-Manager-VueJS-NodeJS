import Sequelize from 'sequelize'
import env from '../middlewares/enviroment.js';

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: 'localhost',
    database:'Prueba-tecnica_Tareas',
    username: 'seq',
    password: "123", 
    dialectOptions: {
        options: {
            encrypt: false
        }
    }
})
export default sequelize;
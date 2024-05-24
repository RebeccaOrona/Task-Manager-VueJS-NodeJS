import sequelize from "../config/sequelize.config.js";
import { DataTypes } from "sequelize";
import Status from "./status.model.js";

const Task = sequelize.define('Tarea', {
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    FechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps: false
});

Task.belongsTo(Status, { foreignKey: 'EstadoId' });


export default Task;

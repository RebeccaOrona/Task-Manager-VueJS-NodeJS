import sequelize from "../config/sequelize.config.js";
import { DataTypes } from "sequelize";
import Task from "./tasks.model.js";
import Status from "./status.model.js";

const StatusHistory = sequelize.define('HistorialEstados', {
    FechaCambio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Comentario: {
        type: DataTypes.STRING
    }
},{
    timestamps: false
});

StatusHistory.belongsTo(Task, { foreignKey: 'TareaId' });
StatusHistory.belongsTo(Status, { foreignKey: 'EstadoId' });

export default StatusHistory;
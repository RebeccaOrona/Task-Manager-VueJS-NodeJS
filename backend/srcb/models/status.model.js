import sequelize from "../config/sequelize.config.js";  
import { DataTypes } from "sequelize";

const Status = sequelize.define('Estado', {
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

export default Status;
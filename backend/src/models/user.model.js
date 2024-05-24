import sequelize from "../config/sequelize.config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('Usuario', {
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'usuario' 
    }
},{
    timestamps: false 
})

export default User;
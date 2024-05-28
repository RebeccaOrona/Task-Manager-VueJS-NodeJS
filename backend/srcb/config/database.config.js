import env from "../middlewares/enviroment.js";

const dbConfig = {
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    server: 'localhost',
    database: 'Prueba-tecnica_Tareas',
    options: {
        encrypt: false
    }
};

export default dbConfig;
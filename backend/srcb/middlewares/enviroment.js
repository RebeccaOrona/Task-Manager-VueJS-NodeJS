import dotenv from 'dotenv';

dotenv.config()

const env = {
    PORT: process.env.PORT,
    environment: process.env.NODE_ENV,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
}

export default env;

import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../middlewares/enviroment.js';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // hash

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password); // true/false

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRIVATE_KEY = env.PRIVATE_KEY;

export const generateToken = (user, res) =>{
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn:'24h'});
    res.cookie('cookieToken', token,{
        maxAge:60*60*1000,
        httpOnly:false
    })
    return token;
}


export default __dirname;
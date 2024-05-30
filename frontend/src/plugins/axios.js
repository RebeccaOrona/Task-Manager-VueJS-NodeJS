import axios from 'axios';
const API_URL = 'http://localhost:8080/api/';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {'Content-Type': 'application/json'}
});

export default instance;

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hora-do-servico-backend.herokuapp.com',
});
/*
const api = axios.create({
    baseURL: 'http://192.168.1.91:3333',
});
*/

export default api;
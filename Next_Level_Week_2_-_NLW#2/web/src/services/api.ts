import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' //endereço base que se repete em todas as rotas 
})

export default api;
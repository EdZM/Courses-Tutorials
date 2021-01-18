import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.16:3333' // ip que esta na pagina do expo logo acima do QR code
});

export default api;
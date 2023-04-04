import { default as axiosLib } from 'axios';

const axios = axiosLib.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

axios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config;
});

export default axios;

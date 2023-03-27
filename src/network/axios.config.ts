import { default as axiosLib } from 'axios';
import { token } from '../private';

const axios = axiosLib.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

axios.interceptors.request.use((config) => {
    config.headers.Authorization = token
    return config;
});

export default axios;

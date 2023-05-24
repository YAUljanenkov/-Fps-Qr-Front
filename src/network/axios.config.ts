import { default as axiosLib } from 'axios';
import { getCookie } from 'typescript-cookie'

const axios = axiosLib.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

axios.interceptors.request.use((config) => {
    if(!getCookie('access_token')) {
        window.location.href = '/login';
    }
    config.headers.Authorization = 'Bearer ' + getCookie('access_token')
    return config;
});

export default axios;

import { default as axiosLib } from 'axios';
import { getCookie } from 'typescript-cookie'

export const axios = axiosLib.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

export const axiosProtected = axiosLib.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

axiosProtected.interceptors.request.use((config) => {
    if(!getCookie('access_token')) {
        window.location.href = '/login';
    }
    config.headers.Authorization = 'Bearer ' + getCookie('access_token')
    return config;
});



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getAccessToken, refreshAccessToken, removeAccessToken, setAccessToken} from "./Auth";

const BASE_URL = 'http://localhost:8000';

class API {
    constructor(authenticated=false) {
        const token = localStorage.getItem('access_token');
        const headers = authenticated ? {
            'Authorization' : `Bearer ${token}`
        } : {};
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: headers
        });

        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    // If token expired, try to refresh the access token
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (!refreshToken) {
                        return Promise.reject(error);
                    }
                    return this.refreshAccessToken(refreshToken)
                        .then(() => {
                            // Retry the failed request
                            const config = error.config;
                            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
                            return this.axiosInstance.request(config);
                        })
                        .catch(refreshError => {
                            console.error('Failed to refresh access token: ', refreshError);
                            // If refresh token also expired or refresh failed, log out the user
                            // or redirect to login page
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            // You can use window.location.replace to redirect to the login page
                            // window.location.replace('/login');
                            return Promise.reject(refreshError);
                        });
                }
                return Promise.reject(error);
            }
        );
    }

    async login(username, password) {
        const response = await this.axiosInstance.post('/api/token/', {username, password});
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    }

    async refreshAccessToken(refreshToken) {
        const response = await this.axiosInstance.post('/api/token/refresh/', {refresh: refreshToken});
        const { access } = response.data;
        localStorage.setItem('access_token', access);
    }

    async getData(endpoint) {
        const response = await this.axiosInstance.get(endpoint);
        return response.data;
    }

    async postData(data, endpoint) {
        const response = await this.axiosInstance.post(endpoint, data);
        return response.data;
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
    }

    setAccessToken(token) {
        localStorage.setItem('access_token', token);
    }

    removeAccessToken() {
        localStorage.removeItem('access_token');
    }
}

const SecureAPI = new API(true);
const PublicAPI = new API(false);

export { SecureAPI, PublicAPI }



// class SecureAPI {
//     constructor() {
//         const token = localStorage.getItem('access_token');
//         this.axiosInstance = axios.create({
//             baseURL: BASE_URL,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//     }
//
//     async getData(api_url) {
//         const response = await this.axiosInstance.get(api_url);
//         return response.data;
//     }
//
//     async postData(data, api_url) {
//         const response = await this.axiosInstance.post(api_url, data);
//         return response.data;
//     }
// }
//
// class PublicAPI {
//     constructor() {
//         this.axiosInstance = axios.create({
//             baseURL: BASE_URL
//         });
//     }
//
//     async login(username, password) {
//         const response = await this.axiosInstance.post('/api/')
//     }
// }
//
// const authenticated_api = axios.create({
//     baseURL: 'http://localhost:8000',
// });
//
// authenticated_api.interceptors.request.use(
//     (config) => {
//         const token = getAccessToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error),
// );
//
// authenticated_api.interceptors.response.use(
//     (response) => response,
//         async (error) => {
//             const originalRequest = error.config;
//             if (error.response.status === 401 && !originalRequest._retry) {
//                 originalRequest._retry = true;
//                 try {
//                     const token = await refreshAccessToken();
//                     setAccessToken(token.access);
//                     return api(originalRequest);
//                 } catch (err) {
//                     removeAccessToken();
//                     window.location.replace('/login');
//                 }
//             }
//             return Promise.reject(error);
//         }
// )
//
// function authenticated_api(method, endpoint, data={}) {
//     const headers = {};
//     const token = localStorage.getItem('access_token')
// }
// export {authenticated_api, unauthenticated_api}

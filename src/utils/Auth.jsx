import axios from "axios";

const BASE_URL = "http://localhost:8000";

export function login(username, password) {
    return axios.post(`${BASE_URL}/api/token/`, {
        username, password, csrfmiddlewaretoken: getCSRFToken()
        }, {withCredentials: true})
        .then(response => {
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
        })
        .catch(error => {
            console.log(error.response.data);
        });
}

export function getCSRFToken() {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

export function refreshAccessToken(refreshToken) {
    return axios.post(`${BASE_URL}/api/token/refresh/`, {refresh: refreshToken});
}

export function getAccessToken() {
    return axios.defaults.headers.common.Authorization;
}

export function setAccessToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeAccessToken() {
    delete axios.defaults.headers.common.Authorization;
}
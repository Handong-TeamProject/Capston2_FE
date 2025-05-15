// libs/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // 여기!
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // 🔥 추가!
});

const api_access = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken ? `Bearer ${accessToken}` : undefined
        },
        withCredentials: true
    });
};

export { api_access };

export default api;

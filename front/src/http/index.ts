import axios, { AxiosInstance } from 'axios'
import { toast } from "react-toastify";

export const API_URL = 'http://127.0.0.1:5000/api'
const refreshToken = localStorage.getItem('refreshToken')

const $host: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$host.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$host.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/user/refresh/${refreshToken}`, { withCredentials: true })
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            return $host.request(originalRequest);
        } catch (e) {
            toast.warning('Not authorized!')
        }
    }
    throw error;
})

export default $host;
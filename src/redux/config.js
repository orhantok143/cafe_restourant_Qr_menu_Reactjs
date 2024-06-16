import axios from 'axios';
import { baseUrl } from './baseUrl';

// Axios instance oluşturarak global olarak kullanılacak axios yapılandırması
const axiosInstance = axios.create({
    baseURL: baseUrl // API base URL'nizi burada belirtin
    // İstek süresi aşımı (opsiyonel)
});

// Axios istekleri öncesinde interceptor kullanarak token'i header'a eklemek
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") // Token'i alın (Redux veya benzer bir yöntemle)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization header'ına token'i ekleyin
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

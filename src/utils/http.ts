import axios, { type AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:3000/';
axios.interceptors.request.use((config: AxiosRequestConfig | any) => {
    let timestamp = new Date().getTime();
    config.withCredentials = true;
    let params = config.params;
    config.params = Object.assign(params, { timestamp })
    return config;
});
axios.interceptors.response.use(res => {
    return res;
}, err => {
    return Promise.reject(err);
});
interface IHTTP {
    get<T>(url: string, params?: unknown): Promise<T>;
}

const http: IHTTP = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default http
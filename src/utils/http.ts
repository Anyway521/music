import axios, { type AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'https://netease-cloud-music-api-cyan-iota.vercel.app/';
axios.interceptors.request.use((config: AxiosRequestConfig | any) => {
    let timestamp = new Date().getTime();
    config = Object.assign(config, { withCredentials: true, timestamp });
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
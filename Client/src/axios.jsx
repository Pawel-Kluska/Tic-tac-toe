import axios from "axios";
import {API_BASE_URL} from "./constants/index.js";


const axiosHttp = axios.create({
    baseURL: `${API_BASE_URL}`,
});

axiosHttp.interceptors.request.use(
    (config) => {
        const token =  localStorage.getItem("access_token")
        return {
            ...config,
            headers: {
                ...(token !== null && { Authorization: `${token}` }),
                ...config.headers,
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosHttp.interceptors.response.use(
    (response) => {
        //const url = response.config.url;

        //setLocalStorageToken(token);
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            //(`unauthorized :)`);
            //localStorage.removeItem("persist:root");
            //removeLocalStorageToken
            //window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosHttp;
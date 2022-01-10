import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ApiCommunicationError} from "../../errors/api/ApiCommunicationError";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common['Content-Type'] = 'application/json';

export interface CustomInstance extends AxiosInstance {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export const customAxios: CustomInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

customAxios.interceptors.response.use((response: AxiosResponse) => {
    if (response.status !== 200) {
        throw ApiCommunicationError()
    }
    return response.data;
})

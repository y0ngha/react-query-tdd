import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ApiCommunicationError} from "../../errors/api/ApiCommunicationError";

// global axios default setting
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// @ts-ignore
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

import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ServicesURLs } from "./ServicesURLs";
import { TokenUtil } from "../utils/TokenUtil";

class ApiClient {
    private static headers(): Record<string, string> {
        const headers: Record<string, string> = {
            Accept: "*/*",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Abp.TenantId": "1",
        };

        // Load auth token if exist
        const token = TokenUtil.getTokenFromMemory();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        return headers;
    }

    static async getRequest(
        endPoint: string,
        queryParams: Record<string, unknown> = {}
    ): Promise<AxiosResponse> {
        const url = `${ServicesURLs.BASE_URL}${endPoint}`;
        return axios.get(url, { params: queryParams, headers: this.headers() });
    }

    static async postRequest(
        endPoint: string,
        requestBody: Record<string, unknown>,
        isMultipart: boolean = false
    ): Promise<AxiosResponse> {
        const url = `${ServicesURLs.BASE_URL}${endPoint}`;
        const config: AxiosRequestConfig = {
            headers: this.headers(),
        };

        if (isMultipart) {
            config.headers = config.headers || {};
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return axios.post(url, requestBody, config);
    }

    static async putRequest(
        endPoint: string,
        requestBody: Record<string, unknown>,
        isMultipart: boolean = false
    ): Promise<AxiosResponse> {
        const url = `${ServicesURLs.BASE_URL}${endPoint}`;
        const config: AxiosRequestConfig = {
            headers: this.headers(),
        };

        if (isMultipart) {
            config.headers = config.headers || {};
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return axios.put(url, requestBody, config);
    }

    static async deleteRequest(
        endPoint: string,
        queryParams: Record<string, unknown> = {}
    ): Promise<AxiosResponse> {
        const url = `${ServicesURLs.BASE_URL}${endPoint}`;
        return axios.delete(url, { params: queryParams, headers: this.headers() });
    }
}

export default ApiClient;
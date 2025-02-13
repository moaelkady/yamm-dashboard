import ApiClient from "./ApiClient";
import { HttpMethod } from "../utils/enums";
import { NetworkStatusCodes } from "../utils/enums";
import axios, { AxiosResponse } from "axios";

export class NetworkCall {
    static async makeCall<T>({
        endPoint,
        method,
        requestBody,
        queryParams,
        isMultipart = false,
    }: {
        endPoint: string;
        method: HttpMethod;
        requestBody?: Record<string, unknown>;
        queryParams?: Record<string, unknown>;
        isMultipart?: boolean;
    }): Promise<{ success: true; data: T } | { success: false; error: { message: string } }> {
        try {
            let response: AxiosResponse<T>;

            switch (method) {
                case HttpMethod.GET:
                    response = await ApiClient.getRequest(endPoint, queryParams);
                    break;
                case HttpMethod.POST:
                    response = await ApiClient.postRequest(endPoint, requestBody || {}, isMultipart);
                    break;
                case HttpMethod.PUT:
                    response = await ApiClient.putRequest(endPoint, requestBody || {}, isMultipart);
                    break;
                case HttpMethod.DELETE:
                    response = await ApiClient.deleteRequest(endPoint, queryParams);
                    break;
                default:
                    throw new Error("Invalid HTTP method");
            }

            if (
                response.status >= NetworkStatusCodes.OK_200 &&
                response.status <= NetworkStatusCodes.OK_299
            ) {
                return { success: true, data: response.data };
            } else {
                console.error(`API Error: ${response.status} - ${response.statusText}`, response.data);
                return { success: false, error: { message: response.statusText } };
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios Error:", error.message);
                return { success: false, error: { message: error.message } };
            }
            return { success: false, error: { message: "Unexpected error occurred" } };
        }
    }
}

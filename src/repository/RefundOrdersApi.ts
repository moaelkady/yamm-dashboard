import { ServicesURLs } from "../network/ServicesURLs";
import { NetworkCall } from "../network/NetworkCall";
import { HttpMethod } from "../utils/enums";
import { OrderRecord } from "../types/order_record";

export const RefundOrdersApi = {
    fetchOrders: async (page: number = 1, limit: number = 15): Promise<{ data: OrderRecord[], pages: number, page: number }> => {
        return NetworkCall.makeCall({
            endPoint: `${ServicesURLs.ORDERS}?_page=${page}&_per_page=${limit}`,
            method: HttpMethod.GET,
        }) as Promise<{ data: OrderRecord[], pages: number, page: number }>;
    },

    updateOrderDecision: async (orderId: string, newBody: object) => {
        return NetworkCall.makeCall({
            endPoint: `${ServicesURLs.ORDERS}/${orderId}`,
            method: HttpMethod.PUT,
            requestBody: { ...newBody },
        });
    },

    toggleOrderStatus: async (orderId: string, newBody: object) => {
        return NetworkCall.makeCall({
            endPoint: `${ServicesURLs.ORDERS}/${orderId}`,
            method: HttpMethod.PUT,
            requestBody: { ...newBody },
        });
    }
};

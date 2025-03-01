import { ServicesURLs } from "../network/ServicesURLs";
import { NetworkCall } from "../network/NetworkCall";
import { HttpMethod } from "../utils/enums";
import { OrderRecord } from "../types/order_record";

export const RefundOrdersApi = {
    fetchOrders: async (page: number = 1, limit: number = 15): Promise<{ data: OrderRecord[], pages: number, page: number }> => {
        const response = await NetworkCall.makeCall<{ data: OrderRecord[], pages: number, page: number }>({
            endPoint: `${ServicesURLs.ORDERS}?_page=${page}&_per_page=${limit}`,
            method: HttpMethod.GET,
        });

        if (!response.success) {
            throw new Error(response.error.message);
        }

        return response.data;
    },

    fetchOrderWithId: async (id: string): Promise<OrderRecord> => {
        const response = await NetworkCall.makeCall<OrderRecord>({
            endPoint: `${ServicesURLs.ORDERS}/${id}`,
            method: HttpMethod.GET,
        });

        if (!response.success) {
            throw new Error(response.error.message);
        }

        return response.data;
    },

    updateOrderDecision: async ({ orderId, newBody }: { orderId: string, newBody: OrderRecord }): Promise<OrderRecord> => {
        const response = await NetworkCall.makeCall<OrderRecord>({
            endPoint: `${ServicesURLs.ORDERS}/${orderId}`,
            method: HttpMethod.PUT,
            requestBody: { ...newBody },
        });

        if (!response.success) {
            throw new Error(response.error.message);
        }

        return response.data;
    },

    toggleOrderStatus: async ({ orderId, newBody }: { orderId: string, newBody: OrderRecord }): Promise<OrderRecord> => {
        const response = await NetworkCall.makeCall<OrderRecord>({
            endPoint: `${ServicesURLs.ORDERS}/${orderId}`,
            method: HttpMethod.PUT,
            requestBody: { ...newBody },
        });

        if (!response.success) {
            throw new Error(response.error.message);
        }

        return response.data;
    }
};

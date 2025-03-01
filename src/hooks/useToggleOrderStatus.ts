import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
    useMutation,
    UseMutationResult,
} from "@tanstack/react-query";
import { RefundOrdersApi } from "../repository/RefundOrdersApi";
import { OrderRecord, OrderStatusToggleProps } from "../types/order_record";
import { OrdersActionTypes } from "../utils/enums";
import { OrdersAction } from "../types/order_action";


const useToggleOrderStatus = (
    dispatch: React.Dispatch<OrdersAction>
): UseMutationResult<
    OrderRecord,
    AxiosError,
    OrderStatusToggleProps
> => {
    return useMutation({
        mutationFn: RefundOrdersApi.toggleOrderStatus,
        onSuccess: (_, variables) => {
            console.log("variables", variables)
            dispatch({
                type: OrdersActionTypes.TOGGLE_ORDER_STATUS,
                payload: { orderId: variables.orderId, newBody: variables.newBody },
            });
            toast.success("Order status updated successfully!");
        },
        onError: (error) => {
            console.error("Failed to toggle order status", error);
            toast.error("Failed to update order status.");
        }
    });
};

export default useToggleOrderStatus;

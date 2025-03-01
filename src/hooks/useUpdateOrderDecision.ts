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


const useUpdateOrderDecision = (
    dispatch: React.Dispatch<OrdersAction>
): UseMutationResult<
    OrderRecord,
    AxiosError,
    OrderStatusToggleProps
> => {
    return useMutation({
        mutationFn: RefundOrdersApi.toggleOrderStatus,
        onSuccess: (_, variables) => {
            dispatch({
                type: OrdersActionTypes.UPDATE_ORDER_DECISION,
                payload: { orderId: variables.orderId, newBody: variables.newBody, decision: variables.newBody.decision },
            });
            toast.success(`Order decision changed to ${variables.newBody.decision === null ? "Pending" : variables.newBody.decision.length > 0 ? variables.newBody.decision : "Pending"}`);
        },
        onError: (error) => {
            console.error("Failed to update order decision", error);
            toast.error("Failed to update decision.");
        }
    });
};

export default useUpdateOrderDecision;

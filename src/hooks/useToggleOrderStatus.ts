import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import { RefundOrdersApi } from "../repository/RefundOrdersApi";
import { OrderRecord, OrderStatusToggleProps } from "../types/order_record";
import { OrdersActionTypes } from "../utils/enums";
import { OrdersAction } from "../types/order_action";
import { OrdersState } from "../types/order_record";


const useToggleOrderStatus = (
    dispatch: React.Dispatch<OrdersAction>,
    state: OrdersState
): UseMutationResult<
    OrderRecord,
    AxiosError,
    OrderStatusToggleProps
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: RefundOrdersApi.toggleOrderStatus,
        onMutate: (variables) => {
            const oldData = queryClient.getQueryData(["refundOrders", state.page]);
            dispatch({
                type: OrdersActionTypes.TOGGLE_ORDER_STATUS,
                payload: { orderId: variables.orderId, newBody: variables.newBody },
            });
            return { oldData, variables };
        },
        onSuccess: () => {
            toast.success("Order status updated successfully!");
        },
        onError: (error, _, rollBack) => {
            toast.error("Failed to update order status.");
            console.error("Error:", error);
            console.log("rollBack", rollBack);
            if (rollBack?.oldData) {
                queryClient.setQueryData(["refundOrders", state.page], rollBack.oldData);
                console.log("Rollback applied:", rollBack.oldData);
                dispatch({
                    type: OrdersActionTypes.TOGGLE_ORDER_STATUS,
                    payload: { orderId: rollBack.variables.orderId, newBody: { ...rollBack.variables.newBody, active: !rollBack.variables.newBody.active } },
                });
            }
        },
    });
};

export default useToggleOrderStatus;

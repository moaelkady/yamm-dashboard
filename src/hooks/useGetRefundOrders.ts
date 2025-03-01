import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RefundOrdersApi } from "../repository/RefundOrdersApi";
import { OrdersState, getRefundOrdersProps } from './../types/order_record';

const useGetRefundOrders = (state: OrdersState): UseQueryResult<getRefundOrdersProps> => {
    return useQuery({
        queryKey: ["refundOrders", state.page],
        queryFn: () => RefundOrdersApi.fetchOrders(state.page, 15),
        staleTime: 1000 * 60 * 5,
    });
};

export default useGetRefundOrders;

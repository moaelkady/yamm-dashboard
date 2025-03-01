import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RefundOrdersApi } from "../repository/RefundOrdersApi";
import { OrderRecord, OrdersState } from './../types/order_record';


const useGetComments = (state: OrdersState): UseQueryResult<{ data: OrderRecord[], pages: number, page: number }> => {
    return useQuery({
        queryKey: ["refundOrders", state.page],
        queryFn: () => RefundOrdersApi.fetchOrders(state.page, 15),
        staleTime: 1000 * 60 * 5,
    });
};

export default useGetComments;

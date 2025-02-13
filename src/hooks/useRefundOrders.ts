import { useContext } from "react";
import { RefundOrdersContext } from '../context/RefundOrdersContext';

export const useRefundOrders = () => {
    const context = useContext(RefundOrdersContext);
    if (!context) {
        throw new Error("useRefundOrders must be used within a RefundOrdersProvider");
    }
    return context;
};
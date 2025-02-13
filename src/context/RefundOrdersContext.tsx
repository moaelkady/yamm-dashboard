import { createContext } from "react";
import { OrdersState } from "../types/order_record";

interface OrdersContextProps {
    state: OrdersState;
    isFetching: boolean;
    setPage: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    toggleOrderStatus: (orderId: string, newBody: object) => Promise<void>;
    updateOrderDecision: (orderId: string, newBody: object, decision: "reject" | "accept" | "escalate" | null) => Promise<void>;
}

export const RefundOrdersContext = createContext<OrdersContextProps | undefined>(undefined);

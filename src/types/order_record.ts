import { OrdersAction } from "./order_action";

export interface OrderItem {
    name: string;
    id: string;
    price: number;
    quantity: number;
}

export type OrderDecision = "reject" | "accept" | "escalate" | null;

export interface OrderRecord {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number | string;
    active: boolean;
    decision: OrderDecision;
    items: OrderItem[];
}

export interface OrdersState {
    data: OrderRecord[];
    pages: number;
    error: string | null;
    page: number;
}

export interface RefundOrdersTableProps {
    orders: OrderRecord[];
    page: number,
    pages: number,
    goToNextPage: () => void;
    goToPrevPage: () => void;
    updateOrderDecision: (orderId: string, newBody: OrderRecord, decesion: OrderDecision) => Promise<OrderRecord>;
}

export interface OrdersContextProps {
    state: OrdersState;
    isFetching: boolean;
    setPage: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    updateOrderDecision: (orderId: string, newBody: OrderRecord, decision: OrderDecision) => Promise<OrderRecord>;
    dispatch: React.Dispatch<OrdersAction>;
}

export interface OrdersTableProps {
    orders: OrderRecord[];
    handleUpdateOrderDecision: (orderId: string, order: OrderRecord, decision: OrderDecision) => OrderRecord;
}

export interface OrderRowProps {
    order: OrderRecord;
    handleUpdateOrderDecision: (orderId: string, order: OrderRecord, decision: OrderDecision) => OrderRecord;
}

export interface PaginationControlsProps {
    page: number;
    pages: number;
    goToNextPage: () => void;
    goToPrevPage: () => void;
}

export interface OrderStatusToggleProps {
    orderId: string;
    newBody: OrderRecord;
}
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
    toggleOrderStatus: (orderId: string, newBody: object) => Promise<void>;
    updateOrderDecision: (orderId: string, newBody: object, decesion: OrderDecision) => Promise<void>;
}

export interface OrdersContextProps {
    state: OrdersState;
    isFetching: boolean;
    setPage: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    toggleOrderStatus: (orderId: string, newBody: object) => Promise<void>;
    updateOrderDecision: (orderId: string, newBody: object, decision: OrderDecision) => Promise<void>;
}

export interface OrdersTableProps {
    orders: OrderRecord[];
    handleToggleOrderStatus: (orderId: string, order: OrderRecord) => void;
    handleUpdateOrderDecision: (orderId: string, order: OrderRecord, decision: OrderDecision) => void;
}

export interface OrderRowProps {
    order: OrderRecord;
    handleToggleOrderStatus: (orderId: string, order: OrderRecord) => void;
    handleUpdateOrderDecision: (orderId: string, order: OrderRecord, decision: OrderDecision) => void;
}

export interface PaginationControlsProps {
    page: number;
    pages: number;
    goToNextPage: () => void;
    goToPrevPage: () => void;
}
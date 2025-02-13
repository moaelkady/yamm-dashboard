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
import React, { createContext, useReducer, useContext, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { RefundOrdersApi } from "../repository/RefundOrdersApi";
import { OrderRecord } from "../types/order_record";
import { OrdersActionTypes } from "../utils/enums";
import "react-toastify/dist/ReactToastify.css";

interface OrdersState {
    data: OrderRecord[];
    pages: number;
    error: string | null;
    page: number;
}

type OrdersAction =
    | { type: OrdersActionTypes.FETCH_SUCCESS; payload: { data: OrderRecord[]; pages: number, page: number } }
    | { type: OrdersActionTypes.TOGGLE_ORDER_STATUS; payload: { orderId: string; newBody: object } }
    | { type: OrdersActionTypes.UPDATE_ORDER_DECISION; payload: { orderId: string; newBody: object; decision: "reject" | "accept" | "escalate" | null } }
    | { type: OrdersActionTypes.FETCH_FAILURE; payload: string }
    | { type: OrdersActionTypes.SET_PAGE; payload: number }
    | { type: OrdersActionTypes.NEXT_PAGE }
    | { type: OrdersActionTypes.PREV_PAGE };

const getInitialState = (): OrdersState => {
    const storedPage = localStorage.getItem("pageNumber");
    return {
        data: [],
        pages: 0,
        error: null,
        page: storedPage ? JSON.parse(storedPage) : 1, // just to get last page stored
    };
};

const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
    switch (action.type) {
        case OrdersActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                pages: action.payload.pages,
            };
        case OrdersActionTypes.FETCH_FAILURE:
            return { ...state, error: action.payload };
        case OrdersActionTypes.SET_PAGE:
            return { ...state, page: action.payload };
        case OrdersActionTypes.NEXT_PAGE:
            return { ...state, page: Math.min(state.page + 1, state.pages) };
        case OrdersActionTypes.PREV_PAGE:
            return { ...state, page: Math.max(state.page - 1, 1) };
        case OrdersActionTypes.TOGGLE_ORDER_STATUS:
            return {
                ...state,
                data: state.data.map(order =>
                    order.id === action.payload.orderId
                        ? { ...order, active: !order.active }
                        : order
                ),
            };
        case OrdersActionTypes.UPDATE_ORDER_DECISION:
            return {
                ...state,
                data: state.data.map(order =>
                    order.id === action.payload.orderId
                        ? { ...order, decision: action.payload.decision }
                        : order
                ),
            };


        default:
            return state;
    }
};

interface OrdersContextProps {
    state: OrdersState;
    isFetching: boolean;
    setPage: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    toggleOrderStatus: (orderId: string, newBody: object) => Promise<void>;
    updateOrderDecision: (orderId: string, newBody: object, decision: "reject" | "accept" | "escalate" | null) => Promise<void>;
}

const RefundOrdersContext = createContext<OrdersContextProps | undefined>(undefined);

export const RefundOrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(ordersReducer, getInitialState());

    const { data, error, isFetching } = useQuery<{ data: OrderRecord[], pages: number, page: number }, Error>({
        queryKey: ["refundOrders", state.page],
        queryFn: () => RefundOrdersApi.fetchOrders(state.page, 15),
    });


    useEffect(() => {
        if (data) {
            dispatch({
                type: OrdersActionTypes.FETCH_SUCCESS,
                payload: { data: data.data, pages: data.pages, page: data.page },
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            dispatch({ type: OrdersActionTypes.FETCH_FAILURE, payload: error.message });
        }
    }, [error]);

    const setPage = (page: number) => {
        if (page >= 1 && page <= state.pages) {
            dispatch({ type: OrdersActionTypes.SET_PAGE, payload: page });
        }
    };

    const goToNextPage = () => {
        dispatch({ type: OrdersActionTypes.NEXT_PAGE });
    };

    const goToPrevPage = () => {
        dispatch({ type: OrdersActionTypes.PREV_PAGE });
    };

    const toggleOrderStatus = async (orderId: string, newBody: object) => {
        try {
            await RefundOrdersApi.toggleOrderStatus(orderId, newBody);
            dispatch({
                type: OrdersActionTypes.TOGGLE_ORDER_STATUS,
                payload: { orderId, newBody },
            });
            toast.success("Order status updated successfully!");
        } catch (error) {
            console.error("Failed to toggle order status", error);
            toast.error("Failed to update order status.");
        }
    };

    const updateOrderDecision = async (orderId: string, newBody: object, decision: "reject" | "accept" | "escalate" | null) => {
        try {
            await RefundOrdersApi.updateOrderDecision(orderId, newBody);
            dispatch({
                type: OrdersActionTypes.UPDATE_ORDER_DECISION,
                payload: { orderId, newBody, decision },
            });
            toast.success(`Order decision changed to ${decision === null ? "Pending" : decision.length > 0 ? decision : "Pending"}`);
        } catch (error) {
            console.error("Failed to update order decision", error);
            toast.error("Failed to update decision.");
        }
    };


    useEffect(() => {
        localStorage.setItem("pageNumber", JSON.stringify(state.page))
    }, [state.page])

    useEffect(() => {
        const storedPage = localStorage.getItem("pageNumber");
        if (storedPage) {
            const parsedPage = JSON.parse(storedPage);
            if (parsedPage >= 1) {
                dispatch({ type: OrdersActionTypes.SET_PAGE, payload: parsedPage });
            }
        }
    }, []);

    return (
        <RefundOrdersContext.Provider value={{ state, isFetching, setPage, goToNextPage, goToPrevPage, toggleOrderStatus, updateOrderDecision }}>
            {children}
        </RefundOrdersContext.Provider>
    );
};

export const useRefundOrders = () => {
    const context = useContext(RefundOrdersContext);
    if (!context) {
        throw new Error("useRefundOrders must be used within a RefundOrdersProvider");
    }
    return context;
};

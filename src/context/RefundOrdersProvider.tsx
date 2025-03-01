import React, { useReducer, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useGetComments from "../hooks/useGetRefundOrders";
import { RefundOrdersApi } from "../repository/RefundOrdersApi";
import { OrderRecord, OrdersState } from "../types/order_record";
import { OrdersActionTypes } from "../utils/enums";
import { OrdersAction } from "../types/order_action";
import { RefundOrdersContext } from "./RefundOrdersContext";
import "react-toastify/dist/ReactToastify.css";



const storedPage = localStorage.getItem("pageNumber");
const getInitialState = (): OrdersState => {
    return {
        data: [],
        pages: 0,
        error: null,
        page: storedPage ? JSON.parse(storedPage) : 1,
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

export const RefundOrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();
    const [state, dispatch] = useReducer(ordersReducer, getInitialState());
    const { data, error, isFetching } = useGetComments(state);




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

    const updateOrderDecision = async (orderId: string, newBody: OrderRecord, decision: "reject" | "accept" | "escalate" | null) => {
        try {
            const updatedOrder = await RefundOrdersApi.updateOrderDecision(orderId, newBody);
            dispatch({
                type: OrdersActionTypes.UPDATE_ORDER_DECISION,
                payload: { orderId, newBody, decision },
            });
            toast.success(`Order decision changed to ${decision === null ? "Pending" : decision.length > 0 ? decision : "Pending"}`);
            return updatedOrder;
        } catch (error) {
            console.error("Failed to update order decision", error);
            toast.error("Failed to update decision.");
            throw new Error("Failed to update order decision");
        }
    };

    // Update state when data is fetched
    useEffect(() => {
        if (data) {
            dispatch({
                type: OrdersActionTypes.FETCH_SUCCESS,
                payload: { data: data.data, pages: data.pages, page: data.page },
            });
        }
    }, [data]);

    // Update state when error occurs
    useEffect(() => {
        if (error) {
            dispatch({ type: OrdersActionTypes.FETCH_FAILURE, payload: error.message });
        }
    }, [error]);

    // Save page to local storage
    useEffect(() => {
        localStorage.setItem("pageNumber", JSON.stringify(state.page))
    }, [state.page])

    // Set page from local storage
    useEffect(() => {
        const storedPage = localStorage.getItem("pageNumber");
        if (storedPage) {
            const parsedPage = JSON.parse(storedPage);
            if (parsedPage >= 1) {
                dispatch({ type: OrdersActionTypes.SET_PAGE, payload: parsedPage });
            }
        }
    }, []);

    // Prefetch next and previous pages
    useEffect(() => {
        const nextPage = state.page + 1;
        const prevPage = state.page - 1;

        // Prefetch next page if within limits
        if (nextPage <= state.pages) {
            queryClient.prefetchQuery({
                queryKey: ["refundOrders", nextPage],
                queryFn: () => RefundOrdersApi.fetchOrders(nextPage, 15),
                staleTime: 1000 * 60 * 5,
            });
        }

        // Prefetch previous page if within limits
        if (prevPage >= 1) {
            queryClient.prefetchQuery({
                queryKey: ["refundOrders", prevPage],
                queryFn: () => RefundOrdersApi.fetchOrders(prevPage, 15),
                staleTime: 1000 * 60 * 5,
            });
        }
    }, [state.page, state.pages, queryClient]);


    return (
        <RefundOrdersContext.Provider value={{ state, isFetching, setPage, goToNextPage, goToPrevPage, updateOrderDecision, dispatch }}>
            {children}
        </RefundOrdersContext.Provider>
    );
};
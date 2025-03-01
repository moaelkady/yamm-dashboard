import { OrdersActionTypes } from "../utils/enums";
import { OrderRecord } from "./order_record";

export type OrdersAction =
    | { type: OrdersActionTypes.FETCH_SUCCESS; payload: { data: OrderRecord[]; pages: number, page: number } }
    | { type: OrdersActionTypes.TOGGLE_ORDER_STATUS; payload: { orderId: string; newBody: OrderRecord } }
    | { type: OrdersActionTypes.UPDATE_ORDER_DECISION; payload: { orderId: string; newBody: OrderRecord; decision: "reject" | "accept" | "escalate" | null } }
    | { type: OrdersActionTypes.FETCH_FAILURE; payload: string }
    | { type: OrdersActionTypes.SET_PAGE; payload: number }
    | { type: OrdersActionTypes.NEXT_PAGE }
    | { type: OrdersActionTypes.PREV_PAGE };
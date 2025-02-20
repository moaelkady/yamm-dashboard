import { createContext } from "react";
import { OrdersContextProps } from "../types/order_record";
export const RefundOrdersContext = createContext<OrdersContextProps | undefined>(undefined);

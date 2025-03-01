import { memo, useCallback } from 'react';
import { RefundOrdersTableProps, OrderDecision, OrderRecord } from "../types/order_record";
import OrdersTable from './orders_table';
import PaginationControls from './pagination_controls';

const RefundOrdersTable: React.FC<RefundOrdersTableProps> = ({ orders = [], page, pages, goToNextPage, goToPrevPage, updateOrderDecision }) => {
    const handleUpdateOrderDecision = useCallback((orderId: string, order: OrderRecord, decision: OrderDecision): OrderRecord => {
        const updatedOrder = { ...order, decision };
        updateOrderDecision(orderId, updatedOrder, decision);
        return updatedOrder;
    }, [updateOrderDecision]);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-auto">
            <OrdersTable
                orders={orders}
                handleUpdateOrderDecision={handleUpdateOrderDecision}
            />
            <PaginationControls
                page={page}
                pages={pages}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
            />
        </div>
    );
};



export default memo(RefundOrdersTable);
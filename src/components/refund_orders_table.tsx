import { memo } from 'react';
import { RefundOrdersTableProps } from "../types/order_record";
import OrdersTable from './orders_table';
import PaginationControls from './pagination_controls';

const RefundOrdersTable: React.FC<RefundOrdersTableProps> = ({ orders = [], page, pages, goToNextPage, goToPrevPage }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-auto">
            <OrdersTable
                orders={orders}
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
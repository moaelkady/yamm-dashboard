import OrderRow from './order_row';
import { OrdersTableProps } from "../types/order_record";
import { tableHeaders } from '../data/table_headers';

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, handleToggleOrderStatus, handleUpdateOrderDecision }) => (
    <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-gray-700">
            <tr>
                {tableHeaders.map((header) => (
                    <th key={header} className="p-3 border">{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
                <OrderRow
                    key={order.id}
                    order={order}
                    handleToggleOrderStatus={handleToggleOrderStatus}
                    handleUpdateOrderDecision={handleUpdateOrderDecision}
                />
            ))}
        </tbody>
    </table>
);

export default OrdersTable;
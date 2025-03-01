import OrderRow from './order_row';
import { tableHeaders } from '../data/table_headers';
import { OrdersTableProps } from "../types/order_record";

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => (
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
                />
            ))}
        </tbody>
    </table>
);

export default OrdersTable;
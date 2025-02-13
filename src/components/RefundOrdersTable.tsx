import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { OrderRecord, OrderDecision } from "../types/order_record";

interface RefundOrdersTableProps {
    orders: OrderRecord[];
    page: number,
    pages: number,
    goToNextPage: () => void;
    goToPrevPage: () => void;
    toggleOrderStatus: (orderId: string, newBody: object) => Promise<void>;
    updateOrderDecision: (orderId: string, newBody: object, decesion: OrderDecision) => Promise<void>;
}

const RefundOrdersTable: React.FC<RefundOrdersTableProps> = ({ orders = [], page, pages, goToNextPage, goToPrevPage, toggleOrderStatus, updateOrderDecision }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-auto">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Reason</th>
                        <th className="p-3 border">Store name</th>
                        <th className="p-3 border">Store logo</th>
                        <th className="p-3 border">Store url</th>
                        <th className="p-3 border">Amount</th>
                        <th className="p-3 border">Active</th>
                        <th className="p-3 border">Decision</th>
                        <th className="p-3 border">Items</th>
                        <th className="p-3 border">View Items</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                            <td className="p-3 border text-center">{order.id}</td>
                            <td className="p-3 border text-center">{order.reason}</td>
                            <td className="p-3 border text-center">{order.store_name}</td>
                            <td className="p-3 text-center flex justify-center">
                                <img src={order.store_logo} alt={order.store_name} className="w-8 h-8 rounded-full" />
                            </td>
                            <td className="p-3 border text-center">
                                <a href={order.store_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 text-blue-800">
                                    {order.store_url}
                                </a>
                            </td>
                            <td className="p-3 border text-center">${order.amount}</td>
                            <td className="p-3 border text-center">
                                <div
                                    className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${order.active ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                    onClick={() => toggleOrderStatus(order.id, { ...order, active: !order.active })}
                                >
                                    <div
                                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${order.active ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    />
                                </div>
                            </td>
                            <td className="p-3 border text-center">
                                <select
                                    className="p-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={order.decision || ""}
                                    onChange={(e) => updateOrderDecision(order.id, { ...order, decision: e.target.value as OrderDecision }, e.target.value as OrderDecision)}
                                >
                                    <option value="">Select Decision</option>
                                    <option value="accept">Accept</option>
                                    <option value="reject">Reject</option>
                                    <option value="escalate">Escalate</option>
                                </select>
                            </td>
                            <td className="p-3 border text-center">{order.items.length}</td>
                            <td className="p-3 border text-center">
                                <Link to={`/${order.id}`}>
                                    <IconButton>
                                        <ArrowOutwardIcon />
                                    </IconButton>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <button
                    onClick={goToPrevPage}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Previous
                </button>
                <span className="text-gray-700">Page {page} of {pages}</span>
                <button
                    onClick={goToNextPage}
                    disabled={page >= pages}
                    className={`px-4 py-2 rounded ${page >= pages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RefundOrdersTable;

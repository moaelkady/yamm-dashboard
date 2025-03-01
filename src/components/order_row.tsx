import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import useToggleOrderStatus from "../hooks/useToggleOrderStatus";
import { OrderDecision, OrderRowProps } from "../types/order_record";
import { useRefundOrders } from "../hooks/useRefundOrders";

const OrderRow: React.FC<OrderRowProps> = ({ order, handleUpdateOrderDecision }) => {
    const handleDecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => handleUpdateOrderDecision(order.id, order, e.target.value as OrderDecision);
    const { dispatch } = useRefundOrders();
    const toggler = useToggleOrderStatus(dispatch);
    const handleStatusToggle = () => {
        toggler.mutate({ orderId: order.id, newBody: { ...order, active: !order.active } })
    };

    const tableData = [
        { content: order.id, className: "text-center" },
        { content: order.reason, className: "text-center" },
        { content: order.store_name, className: "text-center" },
        {
            content: <img src={order.store_logo} alt={order.store_name} className="w-8 h-8 rounded-full" />,
            className: "text-center flex justify-center"
        },
        {
            content: (
                <a href={order.store_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 text-blue-800">
                    {order.store_url}
                </a>
            ),
            className: "text-center"
        },
        { content: `$${order.amount}`, className: "text-center" },
        {
            content: (
                <div
                    className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${order.active ? "bg-green-500" : "bg-gray-300"}`}
                    onClick={handleStatusToggle}
                >
                    <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${order.active ? "translate-x-6" : "translate-x-0"}`}
                    />
                </div>
            ),
            className: "text-center"
        },
        {
            content: (
                <select
                    className="p-2 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={order.decision || ""}
                    onChange={handleDecisionChange}
                >
                    {["", "accept", "reject", "escalate"].map((decision) => (
                        <option key={decision} value={decision}>
                            {decision ? decision.charAt(0).toUpperCase() + decision.slice(1) : "Select Decision"}
                        </option>
                    ))}
                </select>
            ),
            className: "text-center"
        },
        { content: order.items.length, className: "text-center" },
        {
            content: (
                <Link to={`/${order.id}`}>
                    <IconButton>
                        <ArrowOutwardIcon />
                    </IconButton>
                </Link>
            ),
            className: "text-center"
        }
    ];

    return (
        <tr className="border-b hover:bg-gray-50 transition">
            {tableData.map((data, index) => (
                <td key={index} className={`p-3 border ${data.className}`}>
                    {data.content}
                </td>
            ))}
        </tr>
    );
};

export default OrderRow;
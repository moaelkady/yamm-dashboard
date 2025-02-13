import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RefundOrdersApi } from "../../../repository/RefundOrdersApi";
import { OrderRecord } from "../../../types/order_record";
import axios from "axios";

const OrderItems = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await RefundOrdersApi.fetchOrderWithId(id);
                setOrder(response);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        setOrder(null); // No order found
                    } else {
                        setError(err.response?.data?.message || "Something went wrong");
                    }
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
    }
    if (!order) {
        return <div className="text-center text-gray-500">No order found.</div>;
    }
    if (error) {
        return <div className="flex justify-center items-center h-screen text-lg text-red-500">{error}</div>;
    }


    return (
        <div className="w-full mx-auto p-6">
            {order ? (
                <div className="bg-white w-full">
                    <div className="flex items-center space-x-4">
                        <img src={order.store_logo} alt="Store Logo" className="w-16 h-16 rounded-full" />
                        <div>
                            <h1 className="text-2xl font-semibold">{order.store_name}</h1>
                            <a href={order.store_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {order.store_url}
                            </a>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
                        <p className="text-gray-600"><span className="font-medium">Order ID:</span> {order.id}</p>
                        <p className="text-gray-600"><span className="font-medium">Amount:</span> ${order.amount}</p>
                        <p className="text-gray-600"><span className="font-medium">Status:</span>
                            <span className={`ml-2 px-2 py-1 text-sm rounded-md 
                                ${order.decision === "accept" ? "bg-green-100 text-green-600" :
                                    order.decision === "reject" ? "bg-red-100 text-red-600" :
                                        "bg-yellow-100 text-yellow-600"}`}>
                                {order.decision || "Pending"}
                            </span>
                        </p>
                        <p className="text-gray-600"><span className="font-medium">Reason:</span> {order.reason}</p>
                    </div>

                    <h2 className="mt-6 text-xl font-semibold">Order Items</h2>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full bg-white border rounded-md shadow-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left border">Item Name</th>
                                    <th className="px-4 py-2 text-center border">Quantity</th>
                                    <th className="px-4 py-2 text-center border">Price</th>
                                    <th className="px-4 py-2 text-center border">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="px-4 py-2 border">{item.name}</td>
                                        <td className="px-4 py-2 text-center border">{item.quantity}</td>
                                        <td className="px-4 py-2 text-center border">${item.price}</td>
                                        <td className="px-4 py-2 text-center border font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">No order found.</div>
            )}
        </div>
    );
};

export default OrderItems;

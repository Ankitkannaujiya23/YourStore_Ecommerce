import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useGetOrdersMutation } from "../orders/orderApi";
import { toast } from "react-toastify";
import { statusFilterOptions } from "../../../utilityFunction/constant";

const OrdersTab = () => {
    const [status, setStatus] = useState('ALL');
    const [orders, setOrders] = useState([]);
    const [getOrders, { isLoading }] = useGetOrdersMutation();
    const getOrdersData = async () => {
        try {
            const res = await getOrders({ status });
            const data = res.data.response;
            setOrders(data ?? []);
            console.log({ data });

        } catch (error) {
            console.log({ error });
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getOrdersData();
    }, [status]);
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Order History</h3>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => setStatus(e.target.value)}>
                    {statusFilterOptions.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}

                </select>
            </div>

            <div className="space-y-4">
                {orders?.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default OrdersTab;

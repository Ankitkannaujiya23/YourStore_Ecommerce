import React from "react";

const getStatusColor = (status) => {
    switch (status) {
        case "delivered":
            return "bg-green-100 text-green-800";
        case "shipped":
            return "bg-blue-100 text-blue-800";
        case "processing":
            return "bg-yellow-100 text-yellow-800";
        case "cancelled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case "delivered":
            return "fas fa-check-circle";
        case "shipped":
            return "fas fa-truck";
        case "processing":
            return "fas fa-clock";
        case "cancelled":
            return "fas fa-times-circle";
        default:
            return "fas fa-question-circle";
    }
};

const OrderCard = ({ order }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                    <h4 className="font-semibold text-gray-900">Order Id: {order.id}</h4>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                        )}`}
                    >
                        <i className={`${getStatusIcon(order.status)} mr-1`}></i>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="font-medium">Date:</span>
                        <p>{order.created_at}</p>
                    </div>
                    <div>
                        <span className="font-medium">Items:</span>
                        <p>{order.products_count} items</p>
                    </div>
                    <div>
                        <span className="font-medium">Total:</span>
                        <p className="font-semibold text-gray-900">₹{order.total_amount}</p>
                    </div>
                    <div>
                        <span className="font-medium">Tracking:</span>
                        <p className="text-blue-600">{order.trackingNumber}</p>
                    </div>
                </div>
            </div>
            <div className="flex space-x-3">
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                    Track Order
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
                </button>
            </div>
        </div>
    </div>
);

export default OrderCard;

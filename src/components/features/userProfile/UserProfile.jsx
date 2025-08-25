import React, { useEffect, useState } from "react";
import OrdersTab from "./OrdersTab";
import ProfileTab from "./ProfileTab";
import AddressesTab from "./AddressesTab";
import WishlistTab from "./WishlistTab";
import Sidebar from "./SideBar";
import { useGetOrdersQuery } from "../orders/orderApi";
import { useGetUserDetailsQuery } from "../../../services/usersApi";


const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("orders");
    const { data, isLoading } = useGetUserDetailsQuery();
    console.log({ data });
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        avatar: "",
        memberSince: "January 2025",
        totalOrders: 24,
        totalSpent: 2847.5,
    });



    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            name: "Sarah Johnson",
            address: "123 Main Street, Apt 4B",
            city: "New York, NY 10001",
            isDefault: true,
        },
        {
            id: 2,
            type: "Work",
            name: "Sarah Johnson",
            address: "456 Business Ave, Suite 200",
            city: "New York, NY 10002",
            isDefault: false,
        },
    ]);


    const renderTabContent = () => {
        switch (activeTab) {
            case "orders":
                return <OrdersTab />;
            case "profile":
                return <ProfileTab user={user} setUser={setUser} />;
            case "addresses":
                return <AddressesTab addresses={addresses} setAddresses={setAddresses} />;
            case "wishlist":
                return <WishlistTab />;
            default:
                return <OrdersTab />;
        }
    };

    useEffect(() => {
        const response = data?.response;
        if (response) {
            setUser({ ...user, name: response.name, email: response.email, mobile: '6677889900', avatar: response.name.split(" ").map(item => item.charAt(0)[0]) });
        }
    }, [data?.response]);
    console.log({ user });
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                        <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">{renderTabContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
